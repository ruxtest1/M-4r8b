import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  constructor(public nav: NavController) {
  }

  // submit email
  send() {
    // enter your code here
    // back to login page
    this.nav.setRoot(LoginPage);
  }
}
