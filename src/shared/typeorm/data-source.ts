import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.USER,
  password: process.env.DB_PASS,
  database: process.env.NAME,
  migrations: ['./src/shared/migrations/*.*'],
  entities: ['./src/shared/entities/*.ts']
});
