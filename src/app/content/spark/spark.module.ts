import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SparkComponent } from './spark.component';
import { LayoutModule } from './core/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: SparkComponent
  }
];

@NgModule({
  declarations: [SparkComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ]
})
export class SparkModule { }
