import { Component, OnInit, OnDestroy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spk-datatable',
  templateUrl: './spark-datatable.component.html',
  styleUrls: ['./spark-datatable.component.scss']
})
export class SparkDatatableComponent implements OnInit, OnDestroy {

  @Input() portlet: {
    name: string;
    icon: string;
  };
  @Input() dataSource;
  @Input() displayedColumns;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscriptions: {
    matPagination?: Subscription;
  } = {}

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscriptions = {
      matPagination: this.paginator.page.subscribe(this.onPageUpdate.bind(this))
    };
    this.dataSource.startPagination();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    Object.values(this.subscriptions).forEach(ele => ele.unsubscribe());
  }

  onPageUpdate(page) {
    this.dataSource.updateMatPagination({ pageIndex: page.pageIndex, pageSize: page.pageSize });
  }

}
