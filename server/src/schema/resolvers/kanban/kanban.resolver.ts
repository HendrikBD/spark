import { ObjectType, Query, Mutation, Arg, Ctx, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import { Kanban, KanbanInputBody } from '../../types/kanban/kanban.type';
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
    // Depth parameter can be used to specify the number of kanbans to include
    @Arg('depth', { nullable: true }) depth: number = 1,
    @Arg('root', { nullable: true }) root: boolean = true,
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
        }]] : []),
        ...(root ? [[{
          column: 'kanbans_root_view.is_root',
          op: '=',
          value: true
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

  @Query(returns => Kanban, { name: 'kanban' })
  async getKanban(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Kanban> {
    const queryMutator: QueryMutator = {
      filters: [
        [{
          raw: `kanbans_authorized_users_view.authorized_users && '{${ctx.user.id}}'::Int[]`
        }],
        [{
          column: 'kanbans.id',
          op: '=',
          value: id
        }]
      ]
    };
    const kanban = await this.kanbanService.getOne(id, ctx.user.id);

    return kanban;
  }

  @Mutation(returns => Kanban, { name: 'addKanban' })
  async addKanban(@Arg('kanbanInputBody') newKanban: KanbanInputBody, @Ctx() ctx: Context): Promise<Kanban> {

    newKanban.users = [ctx.user];

    const kanban = await this.kanbanService.create(newKanban);

    return kanban as Promise<Kanban>;
  }
}
