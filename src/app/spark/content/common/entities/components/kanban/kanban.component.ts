import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() kanbanForm;

  get kanban() {
    return this.kanbanForm ? this.kanbanForm.getRawValue() : null;
  }

  constructor() { }

  ngOnInit() {
  }

}
