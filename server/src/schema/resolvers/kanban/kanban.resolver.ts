import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import Kanban from '../../types/kanban/kanban.type';
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

  @Query({ name: 'kanbans' })
  getKanban(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): KanbansResponse {
    const total = this.kanbans.length;
    return {
      items: this.kanbans.slice(0, first),
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
