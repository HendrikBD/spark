import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSignIn(event) {
    event.preventDefault();
  }

  onCreateAccount(event) {
    event.preventDefault();
  }

}
