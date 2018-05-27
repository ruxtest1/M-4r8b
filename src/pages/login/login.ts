import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {HomePage} from '../home/home';
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {VendorRegisterPage} from "../vendor-register/vendor-register";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public nav: NavController) {
  }

  // go to register page
  register() {
    // this.nav.push(RegisterPage);
    this.nav.push(VendorRegisterPage);
  }

  // go to home page
  login() {
    this.nav.setRoot(HomePage);
  }

  fnGoToHome() {
    this.nav.setRoot(HomePage);
  }

  // go to forgot password page
  forgotPwd() {
    this.nav.push(ForgotPasswordPage);
  }
}
