import { ObjectType, InputType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { KanbanBoard } from './kanban-board.type';
import { UserSimple } from '../management/user.type';

@ObjectType()
export class Kanban {

  @Field()
  id: number;

  @Field()
  label: string;

  @Field(type => [KanbanBoard])
  boards: KanbanBoard[];

  authorizedUsers?: number[];

}

@InputType({ description: 'New kanban data'})
export class KanbanInputBody {

  @Field()
  @MaxLength(30)
  label: string;

  @Field({ nullable: true })
  parentCardId?: number;

  users?: UserSimple[];
}
