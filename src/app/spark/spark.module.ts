import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SparkComponent } from './spark.component';
import { LayoutModule } from './content/layout/layout.module';
import { PagesModule } from './content/pages/pages.module';

const routes: Routes = [
  {
    path: '',
    component: SparkComponent,
    children: [
      {
        path: '',
        loadChildren: './content/pages/pages.module#PagesModule'
      }
    ]
  },
];

@NgModule({
  declarations: [
    SparkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule
  ]
})
export class SparkModule { }
