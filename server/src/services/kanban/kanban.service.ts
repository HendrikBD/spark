import { Service, Inject } from 'typedi';
import PgService from '../pgService';

@Service()
export default class KanbanService extends PgService {

  counter: number;

  constructor(container) {
    super();

    console.log('hello from kanban service');
    this.counter = 0;
  }

  async getAll() {
    this.counter++;
    return ['stuff', this.counter];
  }

}
