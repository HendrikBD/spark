import { Service, Inject } from 'typedi';

import PgService from '../pg.service';
import KanbanService from './kanban.service';

import { KanbanBoard, KanbanBoardInputBody } from '../../../schema/types/kanban/kanban-board.type';
import { QueryMutator } from '../../../schema/types/common/query-mutator.type';

@Service()
export default class KanbanBoardService extends PgService {

  constructor(
    container,
    private readonly kanbanService: KanbanService
  ) {
    super();
  }

  getAll(): Promise<KanbanBoard[]> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'kanban_boards_view.id',
        'label': 'kanban_boards_view.label',
        'description': 'kanban_boards_view.description',
        'cards': 'kanban_boards_view.cards'
      }).from('kanban_boards_view')
        .then(resolve);
    });
  }

  getOne(id): Promise<KanbanBoard> {
    return new Promise((resolve, reject) => {

      const queryMutator: QueryMutator = {
          filters: [
            [{
              column: 'kanban_boards.id',
              op: '=',
              value: id
            }]
          ]
      };

      const query = this.knex('kanban_boards')
        .select({
          'id': 'kanban_boards.id',
          'label': 'kanban_boards_view.label',
          'description': 'kanban_boards_view.description',
          'cards': 'kanban_boards_view.cards'
        })
        .innerJoin('kanban_boards_view', 'kanban_boards_view.id', 'kanban_boards.id');

      this.mutateQuery(query, queryMutator).then(queryResponse => {
        const kanbanBoardResponse: KanbanBoard = queryResponse[0];
        resolve(kanbanBoardResponse);
      });

    });
  }

  create(newKanbanBoard: KanbanBoardInputBody): Promise<KanbanBoard> {
    return new Promise((resolve, reject) => {
      let kanbanBoard: KanbanBoard;

      this.knex.insert({
        label: newKanbanBoard.label,
        description: newKanbanBoard.description,
        kanban_id: newKanbanBoard.parentKanbanId
      }).into('kanban_boards').returning('*').then(res => {

        kanbanBoard = res[0];
        resolve(this.getOne(kanbanBoard.id));

      }).catch(this.error.log);

    });
  }

}
