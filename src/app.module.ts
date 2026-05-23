import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ✅ Fixed: ConfigMoodule → ConfigModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const logger = new Logger('Database');
        // ✅ Fixed: return type syntax
        return {
          type: 'postgres',
          host: configService.getOrThrow<string>('DB_HOST'), // ✅ Fixed: ConfigService → configService (instance, not class)
          port: configService.getOrThrow<number>('DB_PORT'), // ✅ Fixed: same
          username: configService.getOrThrow<string>('DB_USER'), // ✅ Fixed: same
          password: configService.getOrThrow<string>('DB_PASSWORD'), // ✅ Fixed: same
          database: configService.getOrThrow<string>('DB_NAME'), // ✅ Fixed: same
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          subscribers: [],
          logger: {
            logQuery: () => {},
            logQueryError: (error) => logger.error(`Query Error: ${error}`),
            logQuerySlow: (time, query) =>
              logger.warn(`Slow Query (${time}ms): ${query}`),
            logSchemaBuild: (message) => logger.log(message),
            logMigration: (message) => logger.log(message),
            log: (level, message) => {
              if (level === 'info') logger.log(message);
              if (level === 'warn') logger.warn(message);
            },
          },
          // ✅ This fires when connection is established
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
