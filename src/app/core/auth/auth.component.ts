import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { passwordConfirmValidator, passwordPattern } from './auth.validators';

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
      'animation-duration.s': 0.3,
      'animation-fill-mode': 'forwards',
      'animation-timing-function': 'ease-in-out'
    }
  };

  exists = {
    logIn: true,
    createAcc: false
  };

  forms = {
    login: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    }),
    signup: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordPattern)
      ]),
      passwordConfirm: new FormControl('')
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.setValidators();
  }

  // Sets validators that require other form controls to be initialized
  setValidators() {
    this.forms.signup.get('passwordConfirm').setValidators(
      passwordConfirmValidator(this.forms.signup.get('password'))
    );
  }

  onLogIn(event) {
    if (this.forms.login.valid) this.http.post('/api/login', this.forms.login.value).subscribe(res => {
      console.log('successfully logged in!');
      console.log(res);
    });
    else console.log('Invalid information! No request sent.');
    event.preventDefault();
  }

  onSignUp(event) {
    console.log(this.forms.signup.value);
    if (this.forms.signup.valid) {
      const signUpBody = {
        email: this.forms.signup.get('email').value,
        password: this.forms.signup.get('password').value
      };
      this.http.post('/api/create-account', this.forms.signup.value).subscribe(res => {
        console.log('successfully created account!');
        console.log(res);
      });
    } else console.log('Invalid information! No request sent.');
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
