import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';

// Définissez une interface pour la structure de votre base de données
export type DB = {
  users: {
    id: number;
    username: string;
    // Ajoutez d'autres colonnes si nécessaire
  };
  // Ajoutez d'autres tables si nécessaire
};

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
  throw new Error('Database configuration is missing');
}

const dialect = new MysqlDialect({
  pool: createPool({
    database: DB_NAME,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: +DB_PORT,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});

// Vérifiez la connexion à la base de données
(async () => {
  try {
    await db.selectFrom('users').select('id').execute();
    console.log('Connected to db!');
  } catch (error) {
    console.error('Failed to connect to database', error);
  }
})();
