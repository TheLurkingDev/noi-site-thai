import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createDatabase = async () => {
  // Connect to postgres database to create our app database
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: 'postgres' // Connect to default postgres database first
  });

  try {
    // Create the database if it doesn't exist
    await pool.query(`
      SELECT FROM pg_database WHERE datname = '${process.env.DB_NAME}'
    `).then(async (result) => {
      if (result.rowCount === 0) {
        await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created successfully`);
      } else {
        console.log(`Database ${process.env.DB_NAME} already exists`);
      }
    });
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

const initializeDatabase = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabase();

    // Connect to our app database
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '5432'),
    });

    // Read and execute schema.sql
    const schemaPath = join(__dirname, 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');

    await pool.query(schemaSql);
    console.log('Database schema initialized successfully');

    // Insert some default interests
    const defaultInterests = [
      ['Movies', 'Entertainment'],
      ['Reading', 'Entertainment'],
      ['Hiking', 'Outdoor'],
      ['Cooking', 'Lifestyle'],
      ['Travel', 'Lifestyle'],
      ['Photography', 'Arts'],
      ['Music', 'Entertainment'],
      ['Sports', 'Activities'],
      ['Gaming', 'Entertainment'],
      ['Fitness', 'Health'],
    ];

    for (const [name, category] of defaultInterests) {
      await pool.query(
        'INSERT INTO interests (name, category) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING',
        [name, category]
      );
    }
    console.log('Default interests inserted successfully');

    await pool.end();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };
