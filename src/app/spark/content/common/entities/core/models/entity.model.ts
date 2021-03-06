import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Entity, AnyEntity } from '../types/entity.type';
import { EntityDataSource } from '../datasources/entity.datasource';
import { KanbanModel } from './kanban/kanban.model';
import { QueryMutator } from '../../../../../core/types/common/query-mutator.type';

// Imports child/related models
// Can be subscribed to via observer?
// Can provide single item or set of items incl pagination
// Can also provide simple version of child entities
//
//  Should connect with subscription on backend
//
// May be worthwhile to allow building a set of realted object
// allowing multiple related models to be combined in a way that automatically
// supplies a full object
//  - may be overkill
//  - may be usefull for specific things


@Injectable()
export class EntityModel {

  dataSource;
  constructor(
    private kanbanModel: KanbanModel
  ) {
    this.dataSource = new EntityDataSource();
  }

  buildFormControl(): FormGroup {
    return new FormGroup({});
    // if reired, build object from connected submodels
    // self assembling form
  }

  buildForm() {}

  startPagination() {}

  queryById(id: number): BehaviorSubject<Entity> {
    const queryMutator: QueryMutator = {
      filter: { property: 'id', op: '=', value: id },
      options: { singleton: true }
    };

    return this.dataSource.watchQuery(queryMutator);
  }

  // A general purpose function to get an entity subscription tailored for that type of entity
  getEntitySubscriptionById(entity: Entity): BehaviorSubject<AnyEntity> {
    switch (entity.kind.name) {
      case 'kanban':
        return this.kanbanModel.subscribeById(entity.id);
        break;
      default:
        return new BehaviorSubject(null);
    }
    console.log(entity);
  }

  subscribeById(id: number): BehaviorSubject<Entity> {
    return new BehaviorSubject(null);
  }

  subscribeToSet(queryMutator) {
  }

}
