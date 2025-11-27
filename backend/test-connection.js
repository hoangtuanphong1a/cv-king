// Simple test to verify MySQL connection
import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'TUANPHONG',
      password: '123321',
      database: 'JOB_DB',
      connectTimeout: 30000,
      acquireTimeout: 60000,
      timeout: 60000,
    });

    console.log('✅ MySQL connection established successfully');

    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query executed successfully:', rows);

    await connection.end();
    console.log('✅ Connection closed successfully');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
