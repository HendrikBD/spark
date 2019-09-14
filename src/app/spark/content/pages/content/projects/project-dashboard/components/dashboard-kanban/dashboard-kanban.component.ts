import { Component, OnInit, Input } from '@angular/core';

import { KanbanDataSource } from '../../../../../../common/kanban/core/kanban.datasource';

@Component({
  selector: 'spk-dashboard-kanban',
  templateUrl: './dashboard-kanban.component.html',
  styleUrls: ['./dashboard-kanban.component.scss']
})
export class DashboardKanbanComponent implements OnInit {

  @Input() project;

  constructor(
    private dataSource: KanbanDataSource
  ) { }

  ngOnInit() {
    this.dataSource.getTestKanban().subscribe(res => {
      console.log(res);
    });
  }

}
