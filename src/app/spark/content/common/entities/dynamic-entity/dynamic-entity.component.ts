import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../core/types/entity.type';

@Component({
  selector: 'spk-dynamic-entity',
  templateUrl: './dynamic-entity.component.html',
  styleUrls: ['./dynamic-entity.component.scss']
})
export class DynamicEntityComponent implements OnInit {

  @Input() entityStatic;
  @Input() entityControl;
  @Input() scanRequest$;

  get entity(): Entity {
    return (this.entityControl) ? this.entityControl.getRawValue() : (this.entityStatic || null);
  }

  constructor() { }

  ngOnInit() {}

}
