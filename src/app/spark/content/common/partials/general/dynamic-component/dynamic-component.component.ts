import { NgModule, Component, ComponentRef, OnInit, Input, ViewChild, ViewContainerRef, Compiler } from '@angular/core';

@Component({
  selector: 'spk-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {

  @Input() template: string;
  @Input() ctx: any;

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  ref: ComponentRef<any>;

  constructor(
    private compiler: Compiler
  ) { }

  ngOnInit() {
    this.createDynamicComponent();
  }

  createDynamicComponent() {
    const tmpCtx = this.ctx;
    const tmpCmp = Component({ template: this.template, styles: [] })(
      class {
        ctx = tmpCtx;
        ngOnInit() {}
      }
    );
    const tmpModule = NgModule({ declarations: [tmpCmp] })(class {});

    this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then(factories => {
        const f = factories.componentFactories[0];
        this.ref = this.vc.createComponent(f);
      });
  }

}
