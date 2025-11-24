import { Options, defineConfig } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { MsSqlDriver } from '@mikro-orm/mssql'; // Thay đổi từ MySqlDriver
import * as dotenv from 'dotenv';

dotenv.config();

export const mikroOrmConfig = (configService: ConfigService): Options => ({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MsSqlDriver, // Thay đổi từ MySqlDriver
  dbName: configService.get<string>('DB_NAME'),
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: parseInt(configService.get<string>('DB_PORT'), 10) || 1433, // Thay đổi cổng từ 3306 thành 1433
  user: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
});

// Cấu hình tĩnh cho CLI
export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MsSqlDriver, // Thay đổi từ MySqlDriver
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 1433, // Thay đổi cổng từ 3306 thành 1433
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
});
