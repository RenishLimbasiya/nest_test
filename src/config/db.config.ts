import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
});

export const dbConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...typeOrmConfig,
      type: 'postgres' as const,
      host: configService.getOrThrow<string>('DB_HOST'),
      port: configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow<string>('DB_USER'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      database: configService.getOrThrow<string>('DB_NAME'),
      extra: {
        connectionTimeoutMillis: 3000,
      },
    };
  },
  dataSourceFactory: async (options) => {
    const { DataSource } = await import('typeorm');
    const dataSource = new DataSource(options as DataSourceOptions);
    await dataSource
      .initialize()
      .then(() => {
        Logger.log('Database connection established');
      })
      .catch((error) => {
        Logger.error(`Database connection failed: ${error}`);
        throw error;
      });
    return dataSource;
  },
});
