import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorIntl
} from '@angular/material';

import { SparkPortletComponent } from './general/spark-portlet/spark-portlet.component';
import { SparkDatatableComponent } from './general/spark-datatable/spark-datatable.component';
import { SparkPaginatorIntl } from './general/spark-datatable/core/spark.paginator';

@NgModule({
  declarations: [
    SparkPortletComponent,
    SparkDatatableComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    SparkPortletComponent,
    SparkDatatableComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: SparkPaginatorIntl}
  ]
})
export class PartialsModule { }
