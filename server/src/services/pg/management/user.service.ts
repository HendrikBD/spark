import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { User, NewUserBody, UserLoginBody } from '../../../schema/types/management/user.type';
import { QueryMutator } from '../../../schema/types/common/query-mutator.type';

@Service()
export default class UserService extends PgService {

  constructor(container) {
    super();
  }

  getAll(queryMutator: QueryMutator): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'users.id',
        'name': 'users.name',
        'email': 'users.email'
      }).from('users')
        .then(resolve);
    });
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const queryMutator = {
        filters: [[{ column: 'users.id', op: '=', value: id }]]
      };

      this.getAll(queryMutator).then(modelResponse => {
        resolve(modelResponse[0]);
      });
    });
  }

  getForLogin(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'users.id',
        'email': 'users.email',
        'passHash': 'users.pass_hash'
      }).from('users')
        .where({ email })
        .then(dbResponse => {
          resolve(dbResponse[0]);
        })
        .catch(reject);
    });
  }

  create(newUser): Promise<User> {
    return new Promise((resolve, reject) => {
      this.knex('users').insert({
        email: newUser.email,
        name: newUser.name,
        pass_hash: newUser.passHash
      }).returning('id').then(res => {
        resolve(res);
      }).catch(reject);
    });
  }

}
