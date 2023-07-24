import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DatabaseService } from './database.service';
import { Database } from './entities/database.entity';
import { CreateDatabaseInput } from './dto/create-database.input';
import { UpdateDatabaseInput } from './dto/update-database.input';

@Resolver(() => Database)
export class DatabaseResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Mutation(() => Database)
  createDatabase(
    @Args('createDatabaseInput') createDatabaseInput: CreateDatabaseInput,
  ) {
    console.log(createDatabaseInput);
    return this.databaseService.create(createDatabaseInput);
  }

  @Query(() => [Database], { name: 'database' })
  findAll() {
    return this.databaseService.findAll();
  }

  @Query(() => Database, { name: 'database' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.databaseService.findOne(id);
  }

  @Mutation(() => Database)
  updateDatabase(
    @Args('updateDatabaseInput') updateDatabaseInput: UpdateDatabaseInput,
  ) {
    return this.databaseService.update(
      updateDatabaseInput.id,
      updateDatabaseInput,
    );
  }

  @Mutation(() => Database)
  removeDatabase(@Args('id', { type: () => Int }) id: number) {
    return this.databaseService.remove(id);
  }
}
