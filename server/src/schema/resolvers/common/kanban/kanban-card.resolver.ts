import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../../types/common/paginated-response.type';
import { KanbanCard, KanbanCardInputBody } from '../../../types/common/kanban/kanban-card.type';
import createSampleKanbanCards from '../../../samples/kanban/kanban-card.samples';

import KanbanCardService from '../../../../services/pg/kanban/kanban-card.service';

@ObjectType()
class KanbanCardResponse extends PaginatedResponse(KanbanCard) {}

@Resolver(of => KanbanCard)
export default class KanbanCardResolver {

  constructor(
    private readonly kanbanCardService: KanbanCardService
  ) {}

  @Query(returns => KanbanCardResponse, { name: 'kanbanCards' })
  async getKanbanCards(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): Promise<KanbanCardResponse> {
    const cards = await this.kanbanCardService.getAll();
    const total = cards.length;

    return {
      items: cards,
      hasMore: total > first,
      total
    };
  }

  @Mutation(returns => KanbanCard)
  async addKanbanCard(@Arg('kanbanCardInputBody') newKanbanCard: KanbanCardInputBody): Promise<KanbanCard> {
    console.assert(newKanbanCard.label.length <= 30);
    console.assert(newKanbanCard.label.length <= 255);

    const kanbanCard = await this.kanbanCardService.create(newKanbanCard);

    return kanbanCard;
  }
}
