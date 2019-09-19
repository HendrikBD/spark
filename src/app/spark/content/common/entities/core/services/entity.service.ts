import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {

  containerEntitySelectors = [
    'spk-kanban-board'
  ];

  constructor() {}

  getClosestParentEntity(element: Element) {
    const isEntity = this.containerEntitySelectors.find(sel => sel === element.localName);
    if (isEntity) return element;
    else return (element.parentElement) ? this.getClosestParentEntity(element.parentElement) : null;
  }

}
