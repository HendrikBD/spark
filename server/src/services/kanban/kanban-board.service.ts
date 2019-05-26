import { Service, Inject } from 'typedi';
import PgService from '../pgService';

@Service()
export default class KanbanBoardService extends PgService {

  counter: number;

  constructor(container) {
    super();

    this.counter = 0;
  }

  async getAll() {
    this.counter++;
    return ['stuff', this.counter];
  }

}
