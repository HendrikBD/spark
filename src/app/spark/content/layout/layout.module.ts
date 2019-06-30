import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    TopbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
