import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { EntityModel } from '../../../../../../common/entities/core/models/entity.model';
import { Entity } from '../../../../../../common/entities/core/types/entity.type';
import { Project } from '../../../core/project.model';

// import entities module (+ types & other junk)
// use entities model to get data to use wiht components
//    - start subscription & subscribe to behaviorsubject containing the most recent version of entity currently being watched
//    - as we navigate throughout entities, we can end subscriptions & observables as we no longer need them
//    - all done through model (model then talks to datasource & services to prepare data/data objects)

@Component({
  selector: 'spk-dashboard-entities',
  templateUrl: './dashboard-entities.component.html',
  styleUrls: ['./dashboard-entities.component.scss']
})
export class DashboardEntitiesComponent implements OnInit {

  @Input() project: Project;

  entityModel: EntityModel;
  entity$: BehaviorSubject<Entity>;

  portlet = {
    name: 'Project Tracking',
    icon: ''
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const entityId = parseInt(this.route.snapshot.paramMap.get('enitityId'), 10);
    this.entityModel = new EntityModel();
    this.entity$ = this.entityModel.queryById(entityId);
  }

}
