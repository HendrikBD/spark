import { ObjectType, Query, Mutation, Arg, Int, Resolver, Ctx } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';

import { QueryMutator } from '../../types/common/query-mutator.type';
import { Context } from '../../types/common/context.type';
import { KanbanBoard, KanbanBoardInputBody } from '../../types/kanban/kanban-board.type';
import KanbanBoardService from '../../../services/pg/kanban/kanban-board.service';

@ObjectType()
class KanbanBoardResponse extends PaginatedResponse(KanbanBoard) {}

@Resolver(of => KanbanBoard)
export default class KanbanBoardsResolver {

  constructor(
    private readonly kanbanBoardService: KanbanBoardService
  ) {}

  @Query(returns => KanbanBoardResponse, { name: 'kanbanBoards' })
  async getKanbanBoards(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): Promise<KanbanBoardResponse> {

    const boards = await this.kanbanBoardService.getAll();
    const total = boards.length;

    return {
      items: boards,
      hasMore: total > first,
      total
    };
  }

  @Mutation(returns => KanbanBoard, { name: 'addKanbanBoard' })
  async addKanbanBoard(
    @Arg('KanbanBoardInputBody') newKanbanBoard: KanbanBoardInputBody,
    @Ctx() ctx: Context
  ): Promise<KanbanBoard> {
    const kanbanBoard = await this.kanbanBoardService.create(newKanbanBoard);

    return kanbanBoard;
  }
}
