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

  ngOnInit() {
    console.log('menu item');
    console.log(this.menuItem);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onItemClick() {
    if (this.menuItem.submenu) this.toggleMenu();
    else if (this.menuItem.path) this.router.navigateByUrl(this.menuItem.path);
  }

}
