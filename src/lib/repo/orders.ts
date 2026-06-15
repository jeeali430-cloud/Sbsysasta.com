import { getAdminClient } from "@/lib/supabase/client";
import type { OrderInsert } from "@/lib/supabase/types";

export type CreateOrderResult =
  | { ok: true; id: string; persisted: true }
  | { ok: true; id: string; persisted: false; reason: "no-supabase" }
  | { ok: false; error: string };

export async function createOrder(input: OrderInsert): Promise<CreateOrderResult> {
  const supabase = getAdminClient();
  if (!supabase) {
    return { ok: true, id: input.id, persisted: false, reason: "no-supabase" };
  }

  const { error } = await supabase.from("orders").insert(input);
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, id: input.id, persisted: true };
}
