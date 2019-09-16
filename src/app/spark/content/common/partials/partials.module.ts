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

// Components
import { SparkPortletComponent } from './general/spark-portlet/spark-portlet.component';

// Datatable
import { SparkDatatableComponent } from './general/spark-datatable/spark-datatable.component';
import { SparkPaginatorIntl } from './general/spark-datatable/core/spark.paginator';
import { DynamicComponentComponent } from './general/dynamic-component/dynamic-component.component';

// Directives
import { DraggableDirective } from './directives/draggable.directive';

@NgModule({
  declarations: [
    SparkPortletComponent,
    SparkDatatableComponent,
    DynamicComponentComponent,
    DraggableDirective
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  exports: [
    SparkPortletComponent,
    SparkDatatableComponent,
    DraggableDirective
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: SparkPaginatorIntl}
  ]
})
export class PartialsModule { }
