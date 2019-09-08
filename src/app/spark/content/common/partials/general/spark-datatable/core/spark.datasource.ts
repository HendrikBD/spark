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
    return this.dataArchive.value.length;
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

  resetPagination() {
    this.sourcePagination.next(
      Object.assign(this.sourcePagination.value, { page: 0 })
    );
    this.dataArchive.next([]);
    this.dataSubject.next([]);
    this.checkNextSourcePage();
  }

  startPagination() {
    this.resetPagination();
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
        this.dataArchive.next(
          // this.dataArchive.value.concat(res.data[dataKey].data)
          [
            {
              name: 'Spark1',
              description: 'athing'
            },
            {
              name: 'Spark2',
              description: 'athing'
            },
            {
              name: 'Spark3',
              description: 'athing'
            },
            {
              name: 'Spark4',
              description: 'athing'
            },
            {
              name: 'Spark5',
              description: 'athing'
            },
            {
              name: 'Spark6',
              description: 'athing'
            },
            {
              name: 'Spark7',
              description: 'athing'
            },
            {
              name: 'Spark8',
              description: 'athing'
            },
            {
              name: 'Spark9',
              description: 'athing'
            }
          ]
        );

        this.updateDataSubject();
        this.loadingSubject.next(false);
        this.init = false;

        this.num++;
        if (this.num < 10) this.checkNextSourcePage();
      });
  }

  // Will update the output data subject if required
  //  - if all data out of range
  //    - set loading screen/no data
  //  - check if 1st dataSub obj = expected from archive
  //    - if so check dataSub length, see if full page
  //    - if not full page, check if can get fuller page
  //      - if so, update

  updateDataSubject() {
    const startInd = this.matPagination.value.pageIndex * this.matPagination.value.pageSize;
    const endInd = (this.matPagination.value.pageIndex + 1) * this.matPagination.value.pageSize - 1;
    console.log(startInd);
    console.log(endInd);

    if (startInd > this.dataArchive.value.length - 1) this.dataSubject.next([]);
    else if (
      this.dataSubject.value[0] !== this.dataArchive.value[startInd] ||
      this.dataSubject.value.length !== this.matPagination.value.pageSize
    ) {
      this.dataSubject.next(this.dataArchive.value.slice(startInd, endInd + 1));
    }

    // const archiveInd = this.matPagination.value.pageIndex * this.matPagination.value.pageSize - 1;
    // const finalSubjectDatum = this.dataSubject.value[this.matPagination.value.pageSize - 1];
    // const finalArchiveDatum = this.dataSubject.value[archiveInd];
    // if (!finalSubjectDatum || finalSubjectDatum !== finalArchiveDatum) {
    //   const startInd = (this.matPagination.value.pageIndex - 1) * this.matPagination.value.pageSize;
    //   const endInd = (this.matPagination.value.pageIndex) * this.matPagination.value.pageSize;
    //
    //   this.dataSubject.next(this.dataArchive.value.slice(startInd, endInd));
    // }
  }

  updateMatPagination(matPagination) {
    console.log('updating')
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

  checkNextSourcePage() {
    console.log('checking next page');
    console.log(this.loadingSubject.value)
    console.log(this.dataArchive.value.length)
    const minArchived = this.matPagination.value.pageIndex * this.matPagination.value.pageSize + 50;
    if (
      !this.loadingSubject.value &&
      this.dataArchive.value.length < minArchived &&
      (this.dataArchive.value.length < this.count || this.init)
    ) {
      console.log('if');
      this.getNextSourcePage();
    }
  }

}
