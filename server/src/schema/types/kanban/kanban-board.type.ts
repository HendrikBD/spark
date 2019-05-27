import { ObjectType, Field, Int } from 'type-graphql';
import { KanbanCard } from './kanban-card.type';

@ObjectType()
export class KanbanBoard {

  @Field()
  id: number;

  @Field()
  label: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [KanbanCard])
  cards: KanbanCard[];

}
