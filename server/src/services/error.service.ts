import { Service } from 'typedi';

@Service()
export default class ErrorService {

  count: number;

  constructor() {
    console.log('hello from error');
    this.count = 0;
  }

  get() {
    this.count++;
    console.log('get error');
    console.log(this.count);
  }

}
