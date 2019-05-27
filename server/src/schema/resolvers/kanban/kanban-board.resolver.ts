import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';

import { KanbanBoard } from '../../types/kanban/kanban-board.type';
import KanbanBoardService from '../../../services/kanban/kanban-board.service';

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

    const boards = await this.kanbanBoardService.getAll(),
      total = boards.length;

    return {
      items: boards,
      hasMore: total > first,
      total
    };
  }

  @Mutation()
  addSampleKanbanBoard(): KanbanBoard {
    const kanbanBoard: KanbanBoard = {
      id: 4,
      label: 'testing',
      description: 'a descript',
      cards: []
    };

    return kanbanBoard;
  }
}
