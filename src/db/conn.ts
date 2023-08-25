import pg from 'pg';
import fs from 'fs';

export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

const executeSQLFile = async (filePath: string) => {
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    await client.query(sql);
    console.log('SQL script executed successfully');
  } catch (err: any) {
    console.error('Error executing SQL script:', err?.message);
  }
};

export const setUpDatabase = async () => {
  await client.connect();
  await executeSQLFile('src/db/schema.sql');
  //await executeSQLFile('src/db/seed.sql');
};