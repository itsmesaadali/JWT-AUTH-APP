import { createPool, Pool } from "mysql2/promise";

let pool: Pool;

const connectToDatabase = async () => {
  try {
    pool = createPool({
      port: +process!.env!.MYSQL_PORT!,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
       database: process.env.MYSQL_DB,
    });

    await pool.getConnection();
    console.log('Connected to MYSQL')
  } catch (error) {
    console.log('Error Connected', error);
    throw error;
  }
};

export { connectToDatabase, pool}