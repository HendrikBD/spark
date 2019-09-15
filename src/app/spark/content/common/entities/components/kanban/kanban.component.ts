import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() kanbanControl;
  @Input() kanbanStatic;

  get kanban() {
    return this.kanbanControl ? this.kanbanControl.getRawValue() : (this.kanbanStatic || null);
  }

  constructor() { }

  ngOnInit() {
    console.log('this.kanbanControl');
    console.log(this.kanbanControl);
  }

}
