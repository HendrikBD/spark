import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BehaviorSubject, Subscription, Observer, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { EntityControlService } from './core/entity-control.service';

import { Entity } from './core/entity.model';

@Component({
  selector: 'spk-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit, OnChanges {

  @Input() rootEntity: Entity;

  currentEntityControl: FormGroup;
  currentEntity: Entity;
  previousEntity: Entity;
  // entityObserver: Observer<Entity> = {
  //   next: this.onEntityUpdate.bind(this),
  //   error: console.error,
  //   complete: () => {}
  // };

  entityUpdate: BehaviorSubject<{ isChild: boolean; entity: Entity }> = new BehaviorSubject(null);

  subscriptions: {
    entityUpdate?: Subscription;
  } = {};

  constructor(
    private controlService: EntityControlService
  ) { }

  ngOnInit() {
    // of({{ id: 1, name: 'a', kind: '' }}).subscribe(this.entityObserver);
    // this.subscriptions = {
    //   entityUpdate: this.entityUpdate.subscribe(this.onEntityUpdate.bind(this))
    // }
  }

  ngOnChanges() {
    if (!this.currentEntityControl && this.rootEntity) {
      this.currentEntityControl = this.controlService.buildEntityControl(this.rootEntity);
    }
  }

  /**
   * onEntityUpdate
   *
   * Control flow of updating the entity being displayed.
   */
  onEntityUpdate(entityUpdate: { isChild: boolean; entity: Entity }) {

    if (!this.currentEntity) {

      this.currentEntity = entityUpdate.entity;

    } else {

      this.previousEntity = this.currentEntity;
      this.currentEntity = entityUpdate.entity;

      if (entityUpdate.isChild) window.requestAnimationFrame(this.initChildAnimation.bind(this));
      else window.requestAnimationFrame(this.initParentAnimation.bind(this));

    }
  }

  initChildAnimation() {
    console.log('initChildAnimation');
  }

  initParentAnimation() {
    console.log('initParentAnimation');
  }

}