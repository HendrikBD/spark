import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

import { EntityService } from '../../../../core/entity.service';

@Component({
  selector: 'spk-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  @HostBinding('attr.isEntity') isEntity = true;
  @HostBinding('attr.entityId') entityId: number;
  @HostBinding('attr.entityKind') entityKind = 'kanbanBoard';

  @Input() boardControl;
  @Input() boardStatic;

  @Output() entityMove = new EventEmitter();

  get board() {
    return this.boardControl ? this.boardControl.value : (this.boardStatic || null);
  }

  constructor(
    private entityService: EntityService
  ) { }

  ngOnInit() {
    this.entityId = this.board.id;
  }

  buildDropFcn(entity) {
    return event => {
      this.onMoveEntity(event, entity);
    };
  }

  onMoveEntity(event, entity) {
    const containerEntity = this.entityService.getClosestParentEntity(
      document.elementFromPoint(event.x, event.y)
    );
    if (containerEntity) {
      this.removeChildEntity(entity.id);
      this.entityMove.emit({
        entityFrom: this.board,
        entityTo: {
          entityId: parseInt(containerEntity.attributes.entityid.value, 10),
          kind: containerEntity.attributes.entitykind.value
        }
      });
    }
  }

  removeChildEntity(id: number) {
    const childInd = this.boardControl.value.entities.findIndex(ele => ele.id === id);
    if (childInd >= 0) this.boardControl.get('entities').removeAt(childInd);
  }

}
