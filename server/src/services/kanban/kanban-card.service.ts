import { Service, Inject } from 'typedi';
import PgService from '../pgService';
import { KanbanCard } from '../../schema/types/kanban/kanban-card.type';

@Service()
export default class KanbanCardService extends PgService {

  counter: number;
  testCard: KanbanCard;

  constructor(container) {
    super();

    this.testCard = {
      id: 1,
      label: 'test'
    };

    console.log('hello from kanban card service');
    this.counter = 0;
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
