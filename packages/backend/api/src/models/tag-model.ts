import type { QueryError } from '@app/backend-shared';
import { db } from '@app/backend-shared';

export default {
  async create(name: string) {
    try {
      await db.insertInto('tag').values({ name }).execute();
      return await this.getByName(name);
    } catch (error) {
      if ((error as QueryError).errno === 1062) {
        return await this.getByName(name);
      }
    }
  },

  async getById(id: number) {
    return await db
      .selectFrom('tag')
      .selectAll()
      .where('tag.id', '=', id)
      .executeTakeFirst();
  },

  async getByName(name: string) {
    return await db
      .selectFrom('tag')
      .selectAll()
      .where('tag.name', '=', name)
      .executeTakeFirst();
  },
};
