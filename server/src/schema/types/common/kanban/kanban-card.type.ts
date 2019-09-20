import { ObjectType, InputType, Field, Int, Authorized } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { Kanban } from './kanban.type';

@ObjectType()
export class KanbanCard {

  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => Kanban, { nullable: true })
  kanban?: Kanban;

}

@InputType()
export class KanbanCardInputBody {

  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field()
  parentBoardId: number;

}
