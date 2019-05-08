import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export default class KanbanCard {

  @Field()
  id: number;

  @Field()
  label: string;

  @Field()
  description?: string;

}
