import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

import { SparkDataSource } from '../../../../common/partials/general/spark-datatable/core/spark-data-source';

export class ProjectsDataSource extends SparkDataSource {

  private apollo: Apollo;
  dataKey: 'projects';

  constructor(apollo: Apollo) {
    super();
    this.apollo = apollo;
  }

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

}
