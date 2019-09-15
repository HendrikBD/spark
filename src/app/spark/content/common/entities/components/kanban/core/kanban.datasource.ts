import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';

import { SparkDataSource } from '../../partials/general/spark-datatable/core/spark.datasource';
import { KanbanSample } from './kanban.sample';

@Injectable()
export class KanbanDataSource extends SparkDataSource {

  dataKey: 'kanbans';

  constructor(
    private apollo: Apollo
  ) { super(); }

  getData(queryMutator): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getKanbans {
          kanbans {
            data {
              id,
              name
            }
          }
        }
      `
    }).valueChanges;
  }

  getTestKanban(): Observable<any> {
    return of(KanbanSample);
  }

}
