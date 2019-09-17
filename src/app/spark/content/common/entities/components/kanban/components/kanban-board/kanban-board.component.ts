import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';

import { EntityService } from '../../../../core/entity.service';
import { EntityControlService } from '../../../../core/entity-control.service';

import { Entity, ScanRequest } from '../../../../core/entity.model';

@Component({
  selector: 'spk-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy, OnChanges {
  @HostBinding('attr.isEntity') isEntity = true;
  @HostBinding('attr.kind') get entityKind(): string {
    return this.board.kind;
  }
  @HostBinding('attr.id') get entityId(): number {
    return this.board.id;
  }
  @HostBinding('attr.name') get entityName(): string {
    return this.board.name;
  }

  @Input() boardControl;
  @Input() boardStatic;
  @Input() scanRequest$;

  @Output() entityMove = new EventEmitter();

  @ViewChild('boardContainerElement') boardContainerElement: ElementRef;

  subscriptions: {
    moveRequests: Subscription[];
    scanRequest?: Subscription;
  } = { moveRequests: [] };

  get board() {
    return this.boardControl ? this.boardControl.value : (this.boardStatic || null);
  }

  constructor(
    private entityService: EntityService,
    private entityControlService: EntityControlService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  ngOnChanges() {
    if (!this.subscriptions.scanRequest && this.scanRequest$) {
      this.subscriptions.scanRequest = this.scanRequest$.subscribe(this.onScanRequest.bind(this));
    }
  }

  unsubscribeAll() {
    Object.values(this.subscriptions).forEach(sub => {
      if (sub instanceof Array) {
        sub.forEach(ele => ele.unsubscribe());
      } else (sub as any).unsubscribe();
    });
  }

  onScanRequest(scanRequest: ScanRequest) {
    const rect = this.boardContainerElement.nativeElement.getBoundingClientRect();
    if (
      scanRequest.position.x > rect.left &&
      scanRequest.position.x < rect.right &&
      scanRequest.position.y < rect.bottom &&
      scanRequest.position.y > rect.top &&
      !this.board.entities.find(ele => ele.id === scanRequest.moveRequest.entity.id)
    ) {
      this.addChildEntity(scanRequest.moveRequest.entity);
      scanRequest.moveRequest.accept$.next(true);
    }
  }

  buildDropFcn(entity: Entity) {
    return event => {
      const accept$ = new Subject();
      this.subscriptions.moveRequests.push(
        accept$.subscribe(accepted => {
          if (accepted) this.removeChildEntity(entity.id);
        })
      );

      this.scanRequest$.next({
        position: event.position,
        moveRequest: { accept$, entity }
      });

    };
  }

  addChildEntity(entity: Entity) {
    if (this.boardControl) {
      this.boardControl.get('entities').push(
        this.entityControlService.buildEntityControl(entity)
      );
      this.cdRef.markForCheck();
    }
  }

  removeChildEntity(id: number) {
    const childInd = this.boardControl.value.entities.findIndex(ele => ele.id === id);
    if (childInd >= 0) this.boardControl.get('entities').removeAt(childInd);
  }

}
