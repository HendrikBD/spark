import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, pipe, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export class SparkDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private dataArchive = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public filters = new BehaviorSubject([]);
  public sourcePagination = new BehaviorSubject({ page: 1, pageSize: 50 });
  public order = new BehaviorSubject({});

  public matPagination = new BehaviorSubject({ pageIndex: 0, pageSize: 5 });

  dataKey;

  get count() {
    return 1;
    // return this.dataArchive.value.length;
  }
  num = 0;
  init = true;

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  startPagination() {
    this.resetPagination();
  }

  resetPagination() {
    this.sourcePagination.next(
      Object.assign(this.sourcePagination.value, { page: 0 })
    );
    this.dataArchive.next([]);
    this.dataSubject.next([]);
    this.checkForNextSourcePage();
  }

  getNextSourcePage() {
    this.sourcePagination.next(
      Object.assign(this.sourcePagination.value, { page: this.sourcePagination.value.page + 1})
    );
    this.loadingSubject.next(true);

    this.getData(this.buildQueryMutator())
      .pipe(catchError(() => of([])))
      .subscribe(res => {

        const dataKey = this.dataKey || Object.keys(res.data)[0];
        this.dataArchive.next(this.dataArchive.value.concat(res.data[dataKey].data));

        this.updateDataSubject();
        this.loadingSubject.next(false);
        this.init = false;

        this.num++;
        if (this.num < 10) this.checkForNextSourcePage();
      });
  }


  updateDataSubject() {
    const startInd = this.matPagination.value.pageIndex * this.matPagination.value.pageSize;
    const endInd = (this.matPagination.value.pageIndex + 1) * this.matPagination.value.pageSize - 1;

    if (startInd > this.dataArchive.value.length - 1) this.dataSubject.next([]);
    else if (
      this.dataSubject.value[0] !== this.dataArchive.value[startInd] ||
      this.dataSubject.value.length !== this.matPagination.value.pageSize
    ) {
      this.dataSubject.next(this.dataArchive.value.slice(startInd, endInd + 1));
    }
  }

  updateMatPagination(matPagination) {
    this.matPagination.next(matPagination);
    this.updateDataSubject();
  }

  buildQueryMutator() {
    return {
      filters: this.filters.value,
      pagination: this.sourcePagination.value,
      order: this.order.value
    };
  }

  getData(queryMutator): any {
    return of([]);
  }

  checkForNextSourcePage() {
    const minArchived = this.matPagination.value.pageIndex * this.matPagination.value.pageSize + 50;
    if (
      !this.loadingSubject.value &&
      (this.dataArchive.value.length < this.count || this.init) &&
      this.dataArchive.value.length < minArchived
    ) {
      this.getNextSourcePage();
    }
  }

}
