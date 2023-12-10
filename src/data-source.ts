import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'ml-controle',
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  subscribers: [],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
