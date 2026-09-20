import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { LeadSubmission } from "../types";

let dbInstance: DatabaseSync | null = null;

function getSqliteDb(): DatabaseSync {
  if (!dbInstance) {
    const dbDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.join(dbDir, "leads.db");
    dbInstance = new DatabaseSync(dbPath);

    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        email TEXT DEFAULT '',
        brandName TEXT NOT NULL,
        productScale TEXT NOT NULL,
        notes TEXT DEFAULT '',
        createdAt TEXT NOT NULL
      );
    `);
  }
  return dbInstance;
}

export async function saveLeadToSqlite(lead: LeadSubmission): Promise<{ success: boolean; id: number | string }> {
  const db = getSqliteDb();
  const createdAt = lead.createdAt || new Date().toISOString();

  const insertStmt = db.prepare(`
    INSERT INTO leads (fullName, whatsapp, email, brandName, productScale, notes, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertStmt.run(
    lead.fullName.trim(),
    lead.whatsapp.trim(),
    (lead.email || "").trim(),
    lead.brandName.trim(),
    lead.productScale.trim(),
    (lead.notes || "").trim(),
    createdAt
  );

  return { success: true, id: Number(result.lastInsertRowid) };
}

export async function getLeadsFromSqlite(): Promise<LeadSubmission[]> {
  const db = getSqliteDb();
  const query = db.prepare("SELECT * FROM leads ORDER BY id DESC");
  return query.all() as unknown as LeadSubmission[];
}
