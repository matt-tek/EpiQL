import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseResolver } from './database.resolver';

@Module({
  providers: [DatabaseResolver, DatabaseService],
})
export class DatabaseModule {}
