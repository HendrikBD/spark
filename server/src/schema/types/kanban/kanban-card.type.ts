import { ObjectType, InputType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';

@ObjectType()
export class KanbanCard {

  @Field()
  id: number;

  @Field()
  label: string;

  @Field()
  description?: string;

}

@InputType()
export class KanbanCardBody {

  @Field()
  @MaxLength(30)
  label: string;

  @Field()
  @MaxLength(255)
  description?: string;

}
