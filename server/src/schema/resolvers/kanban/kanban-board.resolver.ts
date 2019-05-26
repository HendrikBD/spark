import { ObjectType, Query, Mutation, Arg, Int, Resolver } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';
import KanbanBoard from '../../types/kanban/kanban-board.type';
import createSampleKanbanBoards from '../../samples/kanban/kanban-board.samples';

import KanbanBoardService from '../../../services/kanban/kanban-board.service';

@ObjectType()
class KanbaBoardResponse extends PaginatedResponse(KanbanBoard) {
}

@Resolver()
export default class KanbanBoardsResolver {

  constructor(
    private readonly kanbanBoardService: KanbanBoardService
  ) {
    console.log('hello from a resolver');
  }

  private readonly kanbanBoards = createSampleKanbanBoards();

  @Query({ name: 'kanbanBoards' })
  getKanbanBoards(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): KanbaBoardResponse {
    const total = this.kanbanBoards.length;
    this.kanbanBoardService.error.get();
    return {
      items: this.kanbanBoards.slice(0, first),
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
