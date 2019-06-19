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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spark';

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  kanbanCardsQuery: Observable<KanbanCard[]>;
  kanbanCards: BehaviorSubject<KanbanCard[]> = new BehaviorSubject([]);

  ngOnInit() {
    // this.kanbanCardsQuery = this.apollo.watchQuery<any>({
    //   query: gql`
    //     query getKanbanCards {
    //       kanbanCards {
    //         items {
    //           id,
    //           label
    //         }
    //       }
    //     }
    //   `
    // }).valueChanges.pipe(
    //   map(res => res.data.kanbanCards.items)
    // );
    //
    // this.kanbanCardsQuery.subscribe(res => {
    //   this.kanbanCards.next(res);
    // });
  }


}
