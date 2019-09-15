import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../core/entity.model';

@Component({
  selector: 'spk-dynamic-entity',
  templateUrl: './dynamic-entity.component.html',
  styleUrls: ['./dynamic-entity.component.scss']
})
export class DynamicEntityComponent implements OnInit {

  @Input() entityStatic;
  @Input() entityForm;

  get entity(): Entity {
    return (this.entityForm) ? this.entityForm.getRawValue() : (this.entityStatic || null);
  }

  constructor() { }

  ngOnInit() {
    console.log(this.entityForm);
    console.log(this.entityStatic);
  }

}
