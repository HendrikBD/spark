import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import gql from 'graphql-tag';

import { SparkDataSource } from '../../../../common/partials/general/spark-datatable/core/spark.datasource';
import { ProjectsDataSource } from '../core/projects.datasource';

@Component({
  selector: 'spk-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  portlet = {
    name: 'All Projects',
    icon: 'fa fa-cog'
  };

  table = {
    displayedColumns: ['name', 'description'],
    dataSource: new ProjectsDataSource(this.apollo),
    template: {
      displayedColumns: ['name', 'description'],
      columns: [
        {
          name: 'name',
          header: {
            template: `<div>Name</div>`
          },
          row: {
            template: `<div>{{ ctx.name }}</div>`
          },
        },
        {
          name: 'description',
          header: {
            template: `<div>Description</div>`
          },
          row: {
            template: `<div>{{ ctx.description }}</div>`
          },
        }
      ]
    }
  };

  projects = new BehaviorSubject(null);

  subscriptions: {
    projectsUpdate?: Subscription;
  } = {};

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.table.dataSource.startPagination();
  }

  updateDataSource() {
    console.log('updating data source');
  }

  getProjects() {
    this.apollo.watchQuery<any>({
      query: gql`
        query getProjects {
          projects {
            items {
              id
            }
          }
        }
      `
    }).valueChanges.subscribe(res => {
      this.projects.next(res.data.projects.items);
    });
  }

  testKanban() {
    this.apollo.watchQuery<any>({
      query: gql`
        query getKanbanCards {
          kanbanCards {
            items {
              id,
              label
            }
          }
        }
      `
    }).valueChanges.subscribe(res => {
      console.log(res);
    });
  }

}
