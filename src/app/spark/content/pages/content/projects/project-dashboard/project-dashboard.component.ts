import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsDataSource } from '../core/projects.datasource';

import { Project } from '../core/project.model';

@Component({
  selector: 'spk-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  project: Project;

  constructor(
    private route: ActivatedRoute,
    private dataSource: ProjectsDataSource
  ) { }

  ngOnInit() {
    const projectId = parseInt(this.route.snapshot.paramMap.get('projectId'), 10);
    const sub = this.dataSource.getTestProject().subscribe(res => {
      this.project = res;
      console.log(res);
    });
  }

}
