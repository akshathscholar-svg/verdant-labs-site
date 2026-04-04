import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

const url = process.env.POSTGRES_URL_NON_POOLING;
if (!url) {
  console.error('POSTGRES_URL_NON_POOLING not set');
  process.exit(1);
}

const sql = postgres(url, { ssl: 'require' });

async function migrate() {
  console.log('Creating sensor_readings table...');
  await sql`
    CREATE TABLE IF NOT EXISTS sensor_readings (
      id BIGSERIAL PRIMARY KEY,
      device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
      temperature REAL,
      humidity REAL,
      moisture REAL,
      light REAL,
      plant_status VARCHAR(60),
      recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log('Creating index on device_id + recorded_at...');
  await sql`
    CREATE INDEX IF NOT EXISTS idx_readings_device_time
    ON sensor_readings (device_id, recorded_at DESC)
  `;

  console.log('Enabling RLS...');
  await sql`ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY`;

  // Service-role inserts bypass RLS, so we only need a SELECT policy
  // that lets users read their own device's readings via a join.
  await sql`DROP POLICY IF EXISTS "Users can view own readings" ON sensor_readings`;
  await sql`
    CREATE POLICY "Users can view own readings" ON sensor_readings
      FOR SELECT
      USING (
        device_id IN (
          SELECT id FROM devices WHERE user_id = auth.uid()
        )
      )
  `;

  console.log('Done! sensor_readings table created.');
  await sql.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
