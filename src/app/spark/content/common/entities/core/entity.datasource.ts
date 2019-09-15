import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';

import { SparkDataSource } from '../../partials/general/spark-datatable/core/spark.datasource';
import { entitySample } from './entity.sample';

import { Entity } from '../core/entity.model';

@Injectable()
export class EntitiesDataSource extends SparkDataSource {

  dataKey: 'entities';

  constructor(
    private apollo: Apollo
  ) { super(); }

  getData(queryMutator): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getEntities {
          entities {
            data {
              id,
              name
            }
          }
        }
      `
    }).valueChanges;
  }

  testPagination() {
    console.log('testPagination');
    const query = gql`
      query getEntities($id: integer) {
        entity(id: $id) {
          data {
            id,
            name
          }
        }
      }
    `;

  }

  getTestEntity(): Observable<Entity> {
    return of(entitySample);
  }

}
