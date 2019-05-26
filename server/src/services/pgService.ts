import ErrorHandler from '../../errorHandler';
import { Container } from 'typedi';

export default class PgService {

  error: ErrorHandler;

  constructor() {
    console.log('hello from pgService');
    console.log(this);
    this.error = Container.get('ErrorHandler');
  }

}
