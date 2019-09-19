import {
  Directive,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  Input,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, Subscription, Subject, fromEvent, pipe, of } from 'rxjs';
import { map, switchMap, takeUntil, tap, catchError, finalize, takeLast } from 'rxjs/operators';

import { EntityService } from '../services/entity.service';

@Directive({
  selector: '[spkEntityDraggable]'
})
export class EntityDraggableDirective implements AfterViewInit {
  @HostBinding('style.cursor') get cursor() {
    return this.dragging ? 'grabbing' : 'grab';
  }

  @Input() onDropFcn;

  start = { x: 0, y: 0 };
  delta = { x: 0, y: 0 };

  target: HTMLElement;

  destroy$ = new Subject();
  mousedrag$: Subscription;

  private dragging = false;

  @HostListener('mousedown', ['$event'])
  onPointerDown(event: PointerEvent): void {

    if (!this.mousedrag$) {

      this.start = { x: event.clientX, y: event.clientY };
      this.delta = { x: 0, y: 0 };
      if (this.dragging) {
        return;
      }
      this.dragging = true;

      const mousemove$ = fromEvent(document, 'mousemove');
      const mouseup$ = fromEvent(document, 'mouseup').pipe(
        finalize(() => {
          if (this.dragging) {
            const dropPos = {
              x: this.start.x + this.delta.x,
              y: this.start.y + this.delta.y
            };
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                if (this.onDropFcn) this.onDropFcn(dropPos);
              });
            });
            this.delta = { x: 0, y: 0 };
            this.translate();
          }
          this.mousedrag$.unsubscribe();
          delete this.mousedrag$;
          this.dragging = false;
        })
      );

      this.mousedrag$ = mousemove$.pipe(
        takeUntil(mouseup$)
      ).subscribe((innerEvent: MouseEvent) => {
        event.preventDefault();
        this.delta = {
          x: innerEvent.clientX - this.start.x,
          y: innerEvent.clientY - this.start.y
        };
        this.translate();
      });

      this.start = { x: event.clientX, y: event.clientY };

    }

  }


  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private entityService: EntityService
  ) {}

  ngAfterViewInit() {
    this.target = this.elementRef.nativeElement;
  }


  private translate() {
    window.requestAnimationFrame(() => {
      this.target.style.transform = `
        translate(${this.delta.x}px, ${this.delta.y}px)
      `;
    });
  }

}
