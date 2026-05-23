import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { configModule, dbConfig } from './config/db.config';

@Module({
  imports: [configModule, dbConfig, DomainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
