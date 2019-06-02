import ErrorService from '../error.service';
import { Container } from 'typedi';
import Knex from 'knex';

export default class PgService {

  error: ErrorService;
  knex: Knex;

  constructor() {
    this.error = Container.get('ErrorHandler');
    this.knex = require('knex')({
      client: 'pg',
      connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE
      }
    });
  }

}
