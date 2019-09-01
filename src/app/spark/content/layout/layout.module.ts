import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { LogoModule } from '../common/logo/logo.module';
import { SidebarItemComponent } from './sidebar/components/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    TopbarComponent,
    LayoutComponent,
    SidebarComponent,
    SidebarItemComponent
  ],
  imports: [
    CommonModule,
    LogoModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
