import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('CV king API')
  .setDescription('API documentation for NestJS with MikroORM and SQL Server')
  .setVersion('1.0 ')
  .addBearerAuth()
  .build();
