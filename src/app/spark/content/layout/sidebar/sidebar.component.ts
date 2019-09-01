import { Component, OnInit, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'spk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() fullSidebar: BehaviorSubject<boolean>;

  constructor() { }

  ngOnInit() {
  }

  onSidebarToggle() {
    this.fullSidebar.next(!this.fullSidebar.value);
  }

}
