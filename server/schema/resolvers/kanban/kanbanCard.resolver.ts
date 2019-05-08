import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginatedResponse.type';
import KanbanCard from '../../types/kanban/kanbanCard.type';
import createSampleKanbanCards from '../../samples/kanban/kanbanCard.samples';

@ObjectType()
class KanbaCardResponse extends PaginatedResponse(KanbanCard) {
}

@Resolver()
export default class KanbanCardResolver {
  private readonly kanbanCards = createSampleKanbanCards();

  @Query({ name: 'kanbanCards' })
  getKanbanCards(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): KanbaCardResponse {
    const total = this.kanbanCards.length;
    return {
      items: this.kanbanCards.slice(0, first),
      hasMore: total > first,
      total
    };
  }

  @Mutation()
  addSampleKanbanCard(): KanbanCard {
    const kanbanCard: KanbanCard = {
      id: 4,
      label: 'testing',
      description: 'a descript'
    };

    return kanbanCard;
  }
}
