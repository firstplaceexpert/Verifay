import { LeadSubmission } from "../types";
import { saveLeadToSqlite, getLeadsFromSqlite } from "./sqlite";
import { saveLeadToSupabase, getLeadsFromSupabase } from "./supabase";

/**
 * Data Access Abstraction Layer.
 * Determines storage destination dynamically based on process.env.DB_PROVIDER:
 * - 'sqlite' (default for local development)
 * - 'supabase' (for production with Postgres)
 */
export async function saveLead(lead: LeadSubmission): Promise<{ success: boolean; id: string | number; provider: string }> {
  const provider = (process.env.DB_PROVIDER || "sqlite").toLowerCase();

  if (provider === "supabase") {
    try {
      const res = await saveLeadToSupabase(lead);
      return { ...res, provider: "supabase" };
    } catch (err) {
      console.warn("Supabase insert failed, falling back to SQLite:", err);
      const res = await saveLeadToSqlite(lead);
      return { ...res, provider: "sqlite-fallback" };
    }
  }

  // Default: SQLite
  const res = await saveLeadToSqlite(lead);
  return { ...res, provider: "sqlite" };
}

export async function getLeads(): Promise<{ leads: LeadSubmission[]; provider: string }> {
  const provider = (process.env.DB_PROVIDER || "sqlite").toLowerCase();

  if (provider === "supabase") {
    try {
      const leads = await getLeadsFromSupabase();
      return { leads, provider: "supabase" };
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to SQLite:", err);
      const leads = await getLeadsFromSqlite();
      return { leads, provider: "sqlite-fallback" };
    }
  }

  const leads = await getLeadsFromSqlite();
  return { leads, provider: "sqlite" };
}
