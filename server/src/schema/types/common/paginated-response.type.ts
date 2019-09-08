import { ClassType, Field, ObjectType, Int } from 'type-graphql';

export default function PaginatedResponse<Item>(ItemClass: ClassType<Item>) {
  @ObjectType({ isAbstract: true })

  abstract class PaginatedResponseClass {
    @Field(type => [ItemClass])
    data: Item[];

    @Field(type => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }

  return PaginatedResponseClass;
}
