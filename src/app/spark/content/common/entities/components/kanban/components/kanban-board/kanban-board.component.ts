import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  @Input() boardControl;
  @Input() boardStatic;

  get board() {
    return this.boardControl ? this.boardControl.value : (this.boardStatic || null);
  }

  constructor() { }

  ngOnInit() {
    console.log('board');
    console.log(this.board);
  }

  onDragEntity() {
    console.log('onDragEntity');
  }

  onDropEntity() {
    console.log('onDropEntity');
  }

}
