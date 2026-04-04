import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

const url = process.env.POSTGRES_URL_NON_POOLING;
if (!url) {
  console.error('POSTGRES_URL_NON_POOLING not set');
  process.exit(1);
}

const sql = postgres(url, { ssl: 'require' });

async function setup() {
  console.log('Creating devices table...');
  await sql`
    CREATE TABLE IF NOT EXISTS devices (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      pairing_code VARCHAR(20) UNIQUE NOT NULL,
      thing_id VARCHAR(100) NOT NULL,
      user_id UUID,
      plant_species VARCHAR(200),
      plant_nickname VARCHAR(100),
      plant_image_url TEXT,
      care_profile JSONB,
      setup_complete BOOLEAN DEFAULT false,
      questionnaire_answers JSONB,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  console.log('Enabling RLS...');
  await sql`ALTER TABLE devices ENABLE ROW LEVEL SECURITY`;

  // Drop existing policies if they exist (idempotent)
  await sql`DROP POLICY IF EXISTS "Users can view own devices" ON devices`;
  await sql`DROP POLICY IF EXISTS "Users can update own devices" ON devices`;

  await sql`
    CREATE POLICY "Users can view own devices" ON devices
      FOR SELECT USING (auth.uid() = user_id)
  `;
  await sql`
    CREATE POLICY "Users can update own devices" ON devices
      FOR UPDATE USING (auth.uid() = user_id)
  `;

  console.log('Seeding prototype device...');
  await sql`
    INSERT INTO devices (pairing_code, thing_id)
    VALUES ('CANOPY-001', '87155c06-f8a0-412b-8ea1-783b7818c53c')
    ON CONFLICT (pairing_code) DO NOTHING
  `;

  console.log('Done! Prototype device seeded with pairing code: CANOPY-001');
  await sql.end();
}

setup().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
