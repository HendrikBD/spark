import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spk-portlet',
  templateUrl: './spark-portlet.component.html',
  styleUrls: ['./spark-portlet.component.scss']
})
export class SparkPortletComponent implements OnInit {

  @Input() portletName;
  @Input() portletIcon;

  constructor() { }

  ngOnInit() {
  }

}
