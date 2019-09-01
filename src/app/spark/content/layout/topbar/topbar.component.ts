import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { navMenu } from '../core/menu.config';

@Component({
  selector: 'spk-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {

  menuItems = navMenu;

  constructor() { }

  ngOnInit() {
  }

}
