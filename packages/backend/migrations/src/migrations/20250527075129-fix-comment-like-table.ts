import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE comment_like
      DROP CONSTRAINT fk_comment_like_comment_id;
    `.execute(trx);

    await sql`
      ALTER TABLE comment_like
      ADD CONSTRAINT fk_comment_like_comment_id FOREIGN KEY (comment_id) REFERENCES comment(id);
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE comment_like
      DROP CONSTRAINT fk_comment_like_comment_id;
    `.execute(trx);

    await sql`
      ALTER TABLE comment_like
      ADD CONSTRAINT fk_comment_like_comment_id FOREIGN KEY (comment_id) REFERENCES post(id);
    `.execute(trx);
  });
}
