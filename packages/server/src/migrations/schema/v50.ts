/*
 * Generated by @medplum/generator
 * Do not edit manually.
 */

import { PoolClient } from 'pg';

export async function run(client: PoolClient): Promise<void> {
  const tables = ['CommunicationRequest', 'MedicationRequest', 'RequestGroup', 'ServiceRequest', 'Task'];
  for (const table of tables) {
    await client.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "priorityOrder" INTEGER`);
    await client.query(`UPDATE "${table}"
    SET "priorityOrder" = 
    CASE 
        WHEN "priority" = 'stat' THEN 50
        WHEN "priority" = 'asap' THEN 40
        WHEN "priority" = 'urgent' THEN 30
        WHEN "priority" = 'routine' THEN 20
        ELSE 10
    END`);
  }
}
