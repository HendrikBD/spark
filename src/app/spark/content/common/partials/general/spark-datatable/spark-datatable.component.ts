import {
  NgModule,
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'spk-datatable',
  templateUrl: './spark-datatable.component.html',
  styleUrls: ['./spark-datatable.component.scss']
})
export class SparkDatatableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() portlet: {
    name: string;
    icon: string;
  };
  @Input() dataSource;
  @Input() displayedColumns;
  @Input() tableTemplate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscriptions: {
    matPagination?: Subscription;
  } = {};

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dataSource.startPagination();
  }

  ngAfterViewInit() {
    this.subscriptions = {
      matPagination: this.paginator.page.subscribe(this.onPageUpdate.bind(this))
    };
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
