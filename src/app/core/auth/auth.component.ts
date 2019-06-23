import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  formMode = 'logIn';

  styles: any = {
    formGridAnimation: {
      'animation-duration.s': 0.6,
      'animation-fill-mode': 'forwards',
      'animation-timing-function': 'ease-in-out'
    }
  };

  exists = {
    logIn: true,
    createAcc: false
  };

  constructor() { }

  ngOnInit() {}

  onSignIn(event) {
    event.preventDefault();
  }

  onCreateAccount(event) {
    event.preventDefault();
  }

  updateFormMode(newFormMode) {
    switch (this.formMode) {
      case 'logIn':
        switch (newFormMode) {
          case 'createAcc':
            this.exists.createAcc = true;
            this.styles.formGridAnimation['animation-name'] = 'toLeft';
            setTimeout(() => {
              this.exists.logIn = false;
              delete this.styles.formGridAnimation['animation-name'];
            }, this.styles.formGridAnimation['animation-duration.s'] * 1000);
            break;
        }
        break;
      case 'createAcc':
        switch (newFormMode) {
          case 'logIn':
            this.exists.logIn = true;
            this.styles.formGridAnimation['animation-name'] = 'toRight';

            setTimeout(() => {
              this.exists.createAcc = false;
              delete this.styles.formGridAnimation['animation-name'];
            }, this.styles.formGridAnimation['animation-duration.s'] * 1000);
            break;
        }
        break;
    }
    this.formMode = newFormMode;
  }

}
