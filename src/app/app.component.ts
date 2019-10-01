import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { AuthService } from './core/auth/auth.service';

import { KanbanCard, KanbanCardQuery } from './core/types/kanbans/kanban-card.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spark';

  constructor(private apollo: Apollo, private authService: AuthService) {}

  kanbanCardsQuery: Observable<KanbanCard[]>;
  kanbanCards: BehaviorSubject<KanbanCard[]> = new BehaviorSubject([]);

  ngOnInit() {}

  testApollo() {
    this.apollo
      .subscribe({
        query: gql`
          subscription subscribeToEntities {
            subscribeToEntities {
              id
              name
            }
          }
        `,
      })
      .subscribe(res => {
        console.log('Component successfully got subscritption data');
        console.log(res);
      });

    this.apollo
      .watchQuery({
        query: gql`
          query AllEntities {
            getEntities {
              id
              name
              type
            }
          }
        `,
      })
      .valueChanges.subscribe(
        res => {
          console.log('Component successfully got static data');
          console.log(res);
        },
        err => {
          console.error(err);
        }
      );

    setTimeout(() => {
      console.log('updating an entity...');
      this.apollo
        .mutate({
          mutation: gql`
            mutation updateEntity {
              updateEntity(entityUpdate: { id: 1, name: "new name", type: "does it even matter?" })
            }
          `,
        })
        .subscribe(res => {
          console.log('Component successfully updated an entity');
          console.log(res);
        });
    }, 10000);
  }
}
