import { ObjectType, Field, Int } from 'type-graphql';
import { KanbanBoard } from './kanban-board.type';

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
