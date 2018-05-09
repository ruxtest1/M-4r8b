import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html'
})
export class OrderConfirmPage {
  public cart: any;


  constructor(public nav: NavController, public cartService: CartService) {
    // set cart data
    this.cart = cartService.getAll();
  }

  // place order
  buy() {

    // back to home page
    this.nav.setRoot(HomePage);
  }
}
