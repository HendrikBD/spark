import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { Kanban } from '../../../schema/types/kanban/kanban.type';

@Service()
export default class KanbanService extends PgService {

  constructor(container) {
    super();
  }

  getAll(): Promise<Kanban[]> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'kanbans_view.id',
        'label': 'kanbans_view.label',
        'boards': 'kanbans_view.boards'
      }).from('kanbans_view')
        .then(resolve);
    });
  }

}
