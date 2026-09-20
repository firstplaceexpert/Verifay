import { createClient } from "@supabase/supabase-js";
import { LeadSubmission } from "../types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or switch to DB_PROVIDER=sqlite.");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function saveLeadToSupabase(lead: LeadSubmission): Promise<{ success: boolean; id: string | number }> {
  const supabase = getSupabaseClient();
  const createdAt = lead.createdAt || new Date().toISOString();

  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        full_name: lead.fullName.trim(),
        whatsapp: lead.whatsapp.trim(),
        email: (lead.email || "").trim(),
        brand_name: lead.brandName.trim(),
        product_scale: lead.productScale.trim(),
        notes: (lead.notes || "").trim(),
        created_at: createdAt,
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  return { success: true, id: data?.id || "supabase-id" };
}

export async function getLeadsFromSupabase(): Promise<LeadSubmission[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((row: any) => ({
    id: row.id,
    fullName: row.full_name,
    whatsapp: row.whatsapp,
    email: row.email,
    brandName: row.brand_name,
    productScale: row.product_scale,
    notes: row.notes,
    createdAt: row.created_at,
  }));
}
