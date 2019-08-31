import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'spk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  grid = {
    style: {
      'grid-template-columns': '400px 1fr'
    },
    current: {
      sidebar: 400
    },
    template: {
      sidebar: 400
    }
  };

  gridAnimation = {
    inProgress: false,
    start: null,
    previousTime: null,
    rate: {
      sidebar: 400
    }
  };

  fullSidebar = new BehaviorSubject(true);

  subscriptions: {
    fullSidebar?: Subscription
  } = {};

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscriptions.fullSidebar = this.fullSidebar.subscribe(() => {
      this.startGridAnimation();
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      if (this.subscriptions.fullSidebar) this.subscriptions.fullSidebar.unsubscribe();
    }
  }

  startGridAnimation() {
    if (this.fullSidebar.value) this.grid.template = { sidebar: 400 };
    else this.grid.template = { sidebar: 0 };

    this.gridAnimation.start = (new Date()).valueOf();
    this.gridAnimation.previousTime = this.gridAnimation.start;

    this.updateGridTemplate();
  }

  updateGridTemplate() {
    const newSidebar = this.grid.current.sidebar +
      Math.sign(this.grid.template.sidebar - this.grid.current.sidebar)
      * (
          ((new Date()).valueOf() - this.gridAnimation.previousTime)
          * this.gridAnimation.rate.sidebar / 1000
      );

    this.grid.current.sidebar = (newSidebar > 400) ? 400 : (newSidebar < 0 ? 0 : newSidebar);
    this.updateGridStyle();

    if (this.grid.template.sidebar === this.grid.current.sidebar) this.gridAnimation.inProgress = false;
    else window.requestAnimationFrame(this.updateGridTemplate.bind(this));

    this.cdRef.detectChanges();
  }

  updateGridStyle() {
    this.grid.style = {
      'grid-template-columns': `${this.grid.current.sidebar}px 1fr`
    };
  }

}
