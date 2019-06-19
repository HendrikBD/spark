import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../user/user.type';

@Injectable()
export class  UserService {

  user: BehaviorSubject<User>;

  constructor() {}

  setUser(user: User) {
    this.user.next(user);
  }

}
