import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Database {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
