import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    private http: HttpClient,
    private router: Router
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
    if (this.forms.login.valid) {
      (this.http.post('/api/login', this.forms.login.value) as any).subscribe(res => {
        if (res.success) {
          this.saveToken(res.jwt, res.expiration);
        }
      });
    } else console.log('Invalid information! No request sent.');
    event.preventDefault();
  }

  onSignUp(event) {
    console.log(this.forms.signup.value);
    if (this.forms.signup.valid) {
      const signUpBody = {
        email: this.forms.signup.get('email').value,
        password: this.forms.signup.get('password').value
      };
      (this.http.post('/api/create-account', this.forms.signup.value) as Observable<any>).subscribe(res => {
        if (res.success) {
          this.saveToken(res.jwt, res.expiration);
        }
      });
    } else console.log('Invalid information! No request sent.');
    event.preventDefault();
  }

  saveToken(jwt, expiration) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('jwtExpiration', expiration);
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('jwtExpiration');
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
