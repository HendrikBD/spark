import { EntityModel } from '../entity.model';
import { Entity } from '../../types/entity.type';
import { KanbanBoard } from '../../types/kanban/kanban.type';
import { FormGroup } from '@angular/forms';

export class KanbanBoardModel extends EntityModel {

  dataSource;
  form: FormGroup;
  entities: Entity[];
  parent: EntityModel;

  get value(): Entity | Entity[] {
    return this.form.value;
    // return { id: 1, name: 'test', kind: { id: 1, name: 'ds' } }
  }

  constructor(id: number, name: string, entities?: Entity[]) {
    super();
    if (!entities) this.getEntitiesSimple();
    else this.entities = entities;
  }

  // Could get data (even filtered...) including a single subscription (for this object)
  //
  //  Subscribed data would include:
  //    - properties
  //    - simple enums
  //    - simple objects
  //  Can get more 'resolution' for either simple enums/objects
  //    - do this by attaching another model in place of that object/list
  //    - model could be attached to represent a set of data as well (incl pagination)
  //
  //  Result:
  //    A set of models subscribed to specific queries on the backend. Does require some
  //    front end complexity, but certainly worth having individual subscriptions in the
  //    place the data will need to be. Dealing with live data will be significantly
  //    easier.
  //
  getData() {}

  // Get a subscription for simple array of entities
  getEntitiesSimple() {}

  // Paginate entities
  startPagination() {}

  getParent() {
    this.parent = new EntityModel();
    // parent could then
  }

}
