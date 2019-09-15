import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../../core/project.model';

@Component({
  selector: 'spk-dashboard-entities',
  templateUrl: './dashboard-entities.component.html',
  styleUrls: ['./dashboard-entities.component.scss']
})
export class DashboardEntitiesComponent implements OnInit {

  @Input() project: Project;

  portlet = {
    name: 'Project Tracking',
    icon: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
