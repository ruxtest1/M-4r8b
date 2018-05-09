import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UserService} from '../../services/user-service';
import {ChangePasswordPage} from "../change-password/change-password";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

  constructor(public nav: NavController, public userService: UserService) {
  }

  // go to changing password page
  changePassword() {
    this.nav.push(ChangePasswordPage);
  }
}
