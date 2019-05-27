import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import { Kanban } from '../../types/kanban/kanban.type';
import createSampleKanbans from '../../samples/kanban/kanban.samples';

import KanbanService from '../../../services/kanban/kanban.service';

@ObjectType()
class KanbansResponse extends PaginatedResponse(Kanban) {
}

@Resolver()
export default class KanbanResolver {

  constructor(
    private readonly kanbanService: KanbanService
  ) {}

  private readonly kanbans = createSampleKanbans();

  @Query(returns => KanbansResponse, { name: 'kanbans' })
  async getKanban(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): Promise<KanbansResponse> {
    const kanbans = await this.kanbanService.getAll(),
      total = kanbans.length;

    return {
      items: kanbans,
      hasMore: total > first,
      total
    };
  }

  @Mutation()
  addSampleKanbanBoard(): Kanban {
    const kanban: Kanban = {
      id: 4,
      label: 'testing',
      boards: []
    };

    return kanban;
  }
}
