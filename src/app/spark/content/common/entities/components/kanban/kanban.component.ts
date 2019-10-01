import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() kanbanControl;
  @Input() kanbanStatic;
  @Input() scanRequest$;

  get kanban() {
    return this.kanbanControl ? this.kanbanControl.value : (this.kanbanStatic || null);
  }

  constructor() { }

  ngOnInit() {}

}
