import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subscription, Observer, of } from 'rxjs';

import { EntityFormService } from './core/entity-form.service';

import { Entity, EntitySimple, EntityObserver } from './core/entity.model';

@Component({
  selector: 'spk-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  @Input() rootEntity: Entity;

  currentEntity: Entity;
  previousEntity: Entity;
  entityObserver: Observer<Entity> = {
    next: this.onEntityUpdate.bind(this),
    error: console.error,
    complete: () => {}
  };

  entityUpdate: BehaviorSubject<{ isChild: boolean; entity: Entity }> = new BehaviorSubject(null);

  subscriptions: {
    entityUpdate?: Subscription;
  } = {};

  constructor(
    private formService: EntityFormService
  ) { }

  ngOnInit() {
    of({ id: 1, name: 'a', kind: '' }).subscribe(this.entityObserver);
    this.subscriptions = {
      entityUpdate: this.entityUpdate.subscribe(this.onEntityUpdate.bind(this))
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
