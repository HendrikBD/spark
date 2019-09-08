import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, pipe, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export class SparkDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public filters = new BehaviorSubject([]);
  public pagination = new BehaviorSubject({
    page: 1,
    length: 50
  });
  public order = new BehaviorSubject({});

  dataKey;

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  resetPagination() {
    this.pagination.next(
      Object.assign(this.pagination.value, { page: 0 })
    );
    this.dataSubject.next([]);
    this.getNextPage();
  }

  startPagination() {
    this.resetPagination();
  }

  getNextPage() {
    this.pagination.next(
      Object.assign(this.pagination.value, { page: this.pagination.value.page + 1})
    );
    this.getData(this.buildQueryMutator())
      .pipe(catchError(() => of([])))
      .subscribe(res => {
        const dataKey = this.dataKey || Object.keys(res.data)[0];
        this.dataSubject.next(res.data[dataKey].data);
        this.loadingSubject.next(false);
        this.checkNextPage();
      });
  }

  buildQueryMutator() {
    return {
      filters: this.filters.value,
      pagination: this.pagination.value,
      order: this.order.value
    };
  }

  getData(queryMutator): any {
    return of([]);
  }

  checkNextPage() {
    console.log('checking next page');
  }

}
