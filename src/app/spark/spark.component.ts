import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spk-spark',
  templateUrl: './spark.component.html',
  styleUrls: ['./spark.component.scss']
})
export class SparkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('spark');
  }

}
