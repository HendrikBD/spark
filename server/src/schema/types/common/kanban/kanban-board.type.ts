import { ObjectType, InputType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { KanbanCard } from './kanban-card.type';

@ObjectType()
export class KanbanBoard {

  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [KanbanCard])
  cards: KanbanCard[];

}

@InputType()
export class KanbanBoardInputBody {

  @Field()
  parentKanbanId: number;

  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

}
