import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import gql from 'graphql-tag';

// import { SparkDataSource } from '../../partials/general/spark-datatable/core/spark.datasource';
import { entitySample } from '../samples/entity.sample';

import { Entity } from '../types/entity.type';

import { QueryMutator } from '../../../../../core/types/common/query-mutator.type';

@Injectable()
export class EntityDataSource {

  dataKey: 'entities';

  constructor() {
    // this.apollo = new Apollo(1);
  }

  // getData(queryMutator): Observable<any> {
  //   return this.apollo.watchQuery<any>({
  //     query: gql`
  //       query getEntities {
  //         entities {
  //           data {
  //             id,
  //             name
  //           }
  //         }
  //       }
  //     `
  //   }).valueChanges;
  // }

  // testPagination() {
  //   console.log('testPagination');
  //   const query = gql`
  //     query getEntities($id: integer) {
  //       entity(id: $id) {
  //         data {
  //           id,
  //           name
  //         }
  //       }
  //     }
  //   `;
  //
  // }

  getTestEntity(): Observable<Entity> {
    return of(entitySample);
  }

  // Watch/Subscribe to a query for an entity
  //  - subscribe to backend via apollo including queryMutator
  //  - setup query to update behavior subject
  //  - save query to object to ensure we can unsubscribe
  //
  watchQuery(queryMutator: QueryMutator): BehaviorSubject<Entity[] | Entity> {
    return new BehaviorSubject(null);
  }

}
