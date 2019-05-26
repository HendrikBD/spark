import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import { KanbanCard, KanbanCardBody } from '../../types/kanban/kanban-card.type';
import createSampleKanbanCards from '../../samples/kanban/kanban-card.samples';

import KanbanCardService from '../../../services/kanban/kanban-card.service';

@ObjectType()
class KanbanCardResponse extends PaginatedResponse(KanbanCard) {}

@Resolver(of => KanbanCard)
export default class KanbanCardResolver {

  constructor(
    private readonly kanbanCardService: KanbanCardService
  ) {}

  private readonly kanbanCards = createSampleKanbanCards();

  @Query(returns => KanbanCardResponse, { name: 'kanbanCards' })
  async getKanbanCards(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): Promise<KanbanCardResponse> {
    const cards = await this.kanbanCardService.getAll(),
      total = cards.length;

    return {
      items: cards,
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
