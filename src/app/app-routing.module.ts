import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './core/auth/auth.component';
import { SparkGuard } from './spark/spark.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    loadChildren: './spark/spark.module#SparkModule',
    canLoad: [SparkGuard]
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
