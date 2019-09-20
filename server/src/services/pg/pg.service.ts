import ErrorService from '../error.service';
import { Container } from 'typedi';
import Knex from 'knex';

import { QueryMutator, QueryMutatorFilter, QueryMutatorRawFilter } from '../../schema/types/common/query-mutator.type';

export default class PgService {

  error: ErrorService;
  knex: Knex;
  table: string;

  constructor(table) {
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
    this.table = table;
  }

  mutateQuery(query, queryMutator: QueryMutator) {
    console.log('this.table');
    console.log(this.table);
    console.log('mutating query');
    if (!queryMutator.pagination) queryMutator.pagination = { page: 1, pageSize: 50 };
    if (!queryMutator.order) queryMutator.order = { column: `${this.table}.id`, dir: 'asc' };
    if (!queryMutator.filters) queryMutator.filters = [];
    console.log('queryMutator');
    console.log(queryMutator);
    return query.where(this.whereBuilder(queryMutator));
  }

  whereBuilder(queryMutator: QueryMutator) {
    return (builder) => {
      let whereBuilder = builder;
      queryMutator.filters.forEach((filterArr, ind) => {
        if (ind === 1) whereBuilder = builder.where(this.buildInnerWhereClause(filterArr));
        else whereBuilder = builder.andWhere(this.buildInnerWhereClause(filterArr));
      });
    };
  }

  buildInnerWhereClause(filterArr) {
    return (builder) => {
      let whereBuilder = builder;
      filterArr.forEach((filter, ind) => {
        whereBuilder = this.buildFilterWhereClause(filter, whereBuilder, ind);
      });
    };
  }

  buildFilterWhereClause(filter, builder, ind) {
    if (filter.raw) {
      if (ind === 0) return builder.whereRaw(filter.raw);
      else return builder.orWhereRaw(filter.raw);
    } else if (filter.column && filter.op) {
      if (ind === 0) return builder.where(filter.column, filter.op, filter.value);
      else return builder.orWhere(filter.column, filter.op, filter.value);
    } else {
      console.error('Invalid filter: ' + JSON.stringify(filter));
      return builder;
    }
  }

}
