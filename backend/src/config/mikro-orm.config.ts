import { defineConfig, type Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { MySqlDriver } from '@mikro-orm/mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export const mikroOrmConfig = (configService: ConfigService): Options => ({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MySqlDriver,
  dbName: configService.get<string>('DB_NAME'),
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: parseInt(configService.get<string>('DB_PORT'), 10) || 3306,
  user: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  allowGlobalContext: true,

  // Connection pooling for stability
  pool: {
    min: 2,
    max: 10,
  },

  // MySQL driver options for stability
  driverOptions: {
    connection: {
      connectTimeout: 30000, // 30 seconds
      acquireTimeout: 60000, // 60 seconds
      timeout: 60000, // 60 seconds
    },
  },

  // Debug in development
  debug: configService.get<string>('NODE_ENV') === 'development',
});

// Cấu hình tĩnh cho CLI
export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MySqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  allowGlobalContext: true,
});
