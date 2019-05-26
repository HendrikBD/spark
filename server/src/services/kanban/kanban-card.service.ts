import { Service, Inject } from 'typedi';
import PgService from '../pgService';
import { KanbanCard } from '../../types/kanban/kanban-card.type';

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

  async getAll() {
    this.counter++;
    return ['stuff', this.counter];
  }

}
