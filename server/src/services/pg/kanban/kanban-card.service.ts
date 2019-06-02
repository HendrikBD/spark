import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { KanbanCard } from '../../../schema/types/kanban/kanban-card.type';

@Service()
export default class KanbanCardService extends PgService {

  constructor(container) {
    super();
  }

  getAll(): Promise<KanbanCard[]> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'kanban_cards.id',
        'label': 'kanban_cards.label',
        'description': 'kanban_cards.description'
      }).from('kanban_cards')
        .then(resolve);
    });
  }

}
