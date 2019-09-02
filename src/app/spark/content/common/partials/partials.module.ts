import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparkPortletComponent } from './general/spark-portlet/spark-portlet.component';

@NgModule({
  declarations: [
    SparkPortletComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SparkPortletComponent
  ]
})
export class PartialsModule { }
