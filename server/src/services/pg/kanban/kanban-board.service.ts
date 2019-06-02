import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { KanbanBoard } from '../../../schema/types/kanban/kanban-board.type';

@Service()
export default class KanbanBoardService extends PgService {

  constructor(container) {
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

}
