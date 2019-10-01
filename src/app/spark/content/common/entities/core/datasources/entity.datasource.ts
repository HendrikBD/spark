import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import gql from 'graphql-tag';
import { SubscriptionClient } from 'subscriptions-transport-ws';

// import { SparkDataSource } from '../../partials/general/spark-datatable/core/spark.datasource';
import { entitySample } from '../samples/entity.sample';

import { Entity } from '../types/entity.type';

import { QueryMutator } from '../../../../../core/types/common/query-mutator.type';

@Injectable()
export class EntityDataSource {

  dataKey: 'entities';

  constructor() {}


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

  subscribeById(id) {
    console.log(id);
  }

  subscribeToSet(queryMutator) {
  }

}
