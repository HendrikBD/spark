import { Service } from 'typedi';

@Service()
export default class ErrorService {

  count: number;

  constructor() {
    console.log('hello from error');
    this.count = 0;
  }

  log(err) {
    console.log('logging from error service');
    console.log(err);
  }

  respond(res, err) {
    this.log(err);
    res.json({
      message: err.message,
      success: false
    });
  }

  get() {
    this.count++;
    console.log('get error');
    console.log(this.count);
  }

}
