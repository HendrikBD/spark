import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './core/auth/auth.component';
import { SparkGuard } from './core/spark/spark.guard';

const routes: Routes = [
  {
    path: 'spark',
    loadChildren: './core/spark/spark.module#SparkModule',
    canLoad: [SparkGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
