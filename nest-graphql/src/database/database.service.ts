import { Injectable } from '@nestjs/common';
import { CreateDatabaseInput } from './dto/create-database.input';
import { UpdateDatabaseInput } from './dto/update-database.input';

@Injectable()
export class DatabaseService {
  create(createDatabaseInput: CreateDatabaseInput) {
    return 'This action adds a new database';
  }

  findAll() {
    return `This action returns all database`;
  }

  findOne(id: number) {
    return `This action returns a #${id} database`;
  }

  update(id: number, updateDatabaseInput: UpdateDatabaseInput) {
    return `This action updates a #${id} database`;
  }

  remove(id: number) {
    return `This action removes a #${id} database`;
  }
}
