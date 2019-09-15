import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';

import { SparkDataSource } from '../../../../common/partials/general/spark-datatable/core/spark.datasource';
import { ProjectSample } from './project.sample';

import { Project } from '../core/project.model';

@Injectable()
export class ProjectsDataSource extends SparkDataSource {

  dataKey: 'projects';

  constructor(
    private apollo: Apollo
  ) { super(); }

  getData(queryMutator): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql`
        query getProjects {
          projects {
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
      query getProjects($id: integer) {
        project(id: $id) {
          data {
            id,
            name
          }
        }
      }
    `;

  }

  getTestProject(): Observable<Project> {
    return of(ProjectSample);
  }

}
