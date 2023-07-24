import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { DatabaseResolver } from './database.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root-password',
      database: 'db',
      entities: [],
      synchronize: true,
    }),
  ],
  providers: [DatabaseResolver, DatabaseService],
})
export class DatabaseModule {}
