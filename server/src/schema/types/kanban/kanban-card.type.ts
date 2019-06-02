import { ObjectType, InputType, Field, Int, Authorized } from 'type-graphql';
import { MaxLength } from 'class-validator';

@ObjectType()
export class KanbanCard {

  @Field()
  id: number;

  @Field()
  label: string;

  @Field({ nullable: true })
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
