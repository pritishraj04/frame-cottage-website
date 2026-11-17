import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Connecting to Supabase at:", supabaseUrl);

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runVerification() {
  const testSessionId = `probe_session_${Date.now()}`;
  const testId = `probe_item_${Date.now()}`;

  console.log("1. Performing test SELECT query on cart_items...");
  const { data: initialSelect, error: selectErr } = await supabase
    .from("cart_items")
    .select("*")
    .limit(5);

  if (selectErr) {
    console.error("SELECT cart_items error:", selectErr);
    process.exit(1);
  }
  console.log(`✓ SELECT successful! Rows retrieved: ${initialSelect?.length || 0}`);

  console.log("2. Inserting probe record into cart_items...");
  const probeRecord = {
    id: testId,
    session_id: testSessionId,
    title: "Live Probe Atelier Floater Frame",
    category: "Bespoke Framing",
    dimensions: "24x36 in",
    specs: "Burmese Teakwood • Tru Vue Optium",
    unit_price: 4999,
    quantity: 1,
    vertical: "Retail & Standard Framing",
    metadata: { probe: true, timestamp: new Date().toISOString() },
  };

  const { data: inserted, error: insertErr } = await supabase
    .from("cart_items")
    .insert(probeRecord)
    .select();

  if (insertErr) {
    console.error("INSERT probe record error:", insertErr);
    process.exit(1);
  }
  console.log("✓ INSERT successful! Inserted record id:", inserted?.[0]?.id || testId);

  console.log("3. Querying probe record by session_id...");
  const { data: queried, error: queryErr } = await supabase
    .from("cart_items")
    .select("*")
    .eq("session_id", testSessionId);

  if (queryErr) {
    console.error("QUERY probe record error:", queryErr);
    process.exit(1);
  }
  console.log(`✓ QUERY successful! Found ${queried?.length} record(s). Title: ${queried?.[0]?.title}`);

  console.log("4. Deleting probe record...");
  const { error: deleteErr } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", testId);

  if (deleteErr) {
    console.error("DELETE probe record error:", deleteErr);
    process.exit(1);
  }
  console.log("✓ DELETE successful! Cleaned up probe record.");

  console.log("\nALL LIVE CONNECTIVITY CHECKS PASSED SUCCESSFULLY!");
}

runVerification().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
