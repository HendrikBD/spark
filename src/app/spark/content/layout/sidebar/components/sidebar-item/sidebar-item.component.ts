import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'spk-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() menuItem: any;
  menuOpen = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onItemClick(event) {
    if (this.menuItem.submenu) this.toggleMenu();
    else if (this.menuItem.path) {
      if (event.ctrlKey) window.open(this.menuItem.path);
      else this.router.navigateByUrl(this.menuItem.path);
    }
  }

}
