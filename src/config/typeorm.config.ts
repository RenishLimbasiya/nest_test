import { config } from 'dotenv';
import { join } from 'path';
import { LogLevel } from 'typeorm/browser';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const typeOrmConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(process.cwd(), 'src/**/*.entity.js')],
  autoLoadEntities: true,
  // migrations: [join(process.cwd(), 'src/migrations/**/*{.ts,.js}')],
  migrations: [],
  synchronize: false,
  migrationsRun: false,
  logging:
    process.env.NODE_ENV === 'development'
      ? (['error', 'warn', 'migration', 'query'] as LogLevel[])
      : (['error', 'warn', 'migration'] as LogLevel[]),
};
