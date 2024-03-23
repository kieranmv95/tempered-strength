import mysql from 'mysql2/promise';

export async function query<T>(query: string) {
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL as string,
  );

  try {
    const [rows] = await connection.query(query);
    return rows as T;
  } finally {
    await connection.end();
  }
}
