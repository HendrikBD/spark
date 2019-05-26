import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import { KanbanCard, KanbanCardBody } from '../../types/kanban/kanban-card.type';
import createSampleKanbanCards from '../../samples/kanban/kanban-card.samples';

import KanbanCardService from '../../../services/kanban/kanban-card.service';

@ObjectType()
class KanbaCardResponse extends PaginatedResponse(KanbanCard) {}

@Resolver(of => KanbanCard)
export default class KanbanCardResolver {

  constructor(
    private readonly kanbanCardService: KanbanCardService
  ) {
    console.log('hello from a resolver');
  }

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

  @Mutation(returns => KanbanCard)
  async addKanbanCard(@Arg('Input') kanbanCardBody: KanbanCardBody): Promise<KanbanCard> {
    console.assert(kanbanCardBody.label.length <= 30);
    console.assert(kanbanCardBody.label.length <= 255);
    console.log('looking to add:');
    console.log(kanbanCardBody);

    const kanbanCard: KanbanCard = {
      id: 4,
      label: 'testing',
      description: 'a descript'
    };

    return kanbanCard;
  }
}
