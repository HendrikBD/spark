import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'spk-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() menuItem: any;
  @Output() selectedItem = new EventEmitter();

  menuOpen = new BehaviorSubject(false);


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.hasSelected(this.menuItem)) {
      this.menuOpen.next(true);
    }
  }

  toggleMenu() {
    this.menuOpen.next(!this.menuOpen.value);
  }

  onItemClick(event) {
    if (this.menuItem.submenu) this.toggleMenu();
    else if (this.menuItem.path) {
      if (event.ctrlKey) window.open(this.menuItem.path);
      else this.router.navigateByUrl(this.menuItem.path);
    }
  }

  // Checks current and child items to see if menu should be open.
  hasSelected(menuItem) {
    if (
      menuItem.path === this.router.url ||
      menuItem.submenu && menuItem.submenu.reduce((acc, subItem) => {
        return acc || this.hasSelected(subItem);
      }, false)
    ) {
      return true;
    } else {
      return false;
    }
  }


}
