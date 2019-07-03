import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { LogoModule } from '../common/logo/logo.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    LogoModule
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
