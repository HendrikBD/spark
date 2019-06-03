import { ObjectType, Query, Mutation, Arg, Ctx, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import { Kanban } from '../../types/kanban/kanban.type';
import { Context } from '../../types/common/context.type';
import { QueryMutator } from '../../types/common/query-mutator.type';

import createSampleKanbans from '../../samples/kanban/kanban.samples';
import KanbanService from '../../../services/pg/kanban/kanban.service';

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
  async getKanbans(
    @Arg('id', { nullable: true }) id: number,
    @Ctx() ctx: Context
  ): Promise<KanbansResponse> {
    const queryMutator: QueryMutator = {
      filters: [
        [{
          raw: `kanbans_authorized_users_view.authorized_users && '{${ctx.user.id}}'::Int[]`
        }],
        ...(id ? [[{
          column: 'kanbans.id',
          op: '=',
          value: id
        }]] : [])
      ]
    };
    const kanbans = await this.kanbanService.getAll(queryMutator);
    const total = kanbans.length;

    return {
      items: kanbans,
      hasMore: false,
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
