import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Subscription } from 'rxjs';

import gql from 'graphql-tag';

@Component({
  selector: 'spk-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  projects = new BehaviorSubject(null);

  subscriptions: {
    projectsUpdate?: Subscription;
  } = {};

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.getProjects();
    this.subscriptions.projectsUpdate = this.projects.subscribe(this.updateDataSource.bind(this));
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
