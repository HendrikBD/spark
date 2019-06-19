import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparkComponent } from './spark.component';




import { Routes, RouterModule } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class SparkModule { }
