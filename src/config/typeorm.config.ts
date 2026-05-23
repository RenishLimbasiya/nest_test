import { config } from 'dotenv';
import { join } from 'path';
import { LogLevel } from 'typeorm';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const typeOrmConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
  migrations: [join(process.cwd(), 'src/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  logging:
    process.env.NODE_ENV === 'development'
      ? (['error', 'warn', 'migration', 'query'] as LogLevel[])
      : (['error', 'warn', 'migration'] as LogLevel[]),
};
