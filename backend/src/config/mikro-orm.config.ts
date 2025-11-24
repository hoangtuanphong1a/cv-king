import { Options, defineConfig } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { MsSqlDriver } from '@mikro-orm/mssql'; // Thay đổi từ MySqlDriver
import * as dotenv from 'dotenv';

dotenv.config();

// Helper function to parse SQL Server connection string
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export const parseConnectionString = (connectionString: string): DatabaseConfig => {
  const params: { [key: string]: string } = {};

  // Parse connection string format: Server=host,port;Database=name;User Id=user;Password=pass;
  const pairs = connectionString.split(';').filter(pair => pair.trim());

  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      params[key.trim().toLowerCase()] = value.trim();
    }
  });

  // Parse Server parameter (format: host,port)
  let host = 'localhost';
  let port = 1433;

  if (params['server']) {
    const serverParts = params['server'].split(',');
    host = serverParts[0];
    if (serverParts[1]) {
      port = parseInt(serverParts[1], 10);
    }
  }

  return {
    host,
    port,
    database: params['database'] || params['initial catalog'] || 'cv_king_db',
    username: params['user id'] || params['userid'] || 'sa',
    password: params['password'] || ''
  };
};

export const mikroOrmConfig = (configService: ConfigService): Options => {
  // Check if using connection string
  const connectionString = configService.get<string>('DB_CONNECTION_STRING');

  let dbConfig: DatabaseConfig;

  if (connectionString) {
    // Parse connection string
    dbConfig = parseConnectionString(connectionString);
  } else {
    // Fallback to individual environment variables (for backward compatibility)
    dbConfig = {
      host: configService.get<string>('DB_HOST') || 'localhost',
      port: parseInt(configService.get<string>('DB_PORT'), 10) || 1433,
      database: configService.get<string>('DB_NAME'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
    };
  }

  return {
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    driver: MsSqlDriver,
    dbName: dbConfig.database,
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
    migrations: {
      path: 'dist/migrations',
      pathTs: 'src/databases/migrations',
    },
  };
};

// Cấu hình tĩnh cho CLI
export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MsSqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
});
