import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {OrderConfirmPage} from "../order-confirm/order-confirm";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public cart: any;

  constructor(public nav: NavController, public cartService: CartService) {
    // set cart data
    this.cart = cartService.getAll();
  }

  // remove item
  remove(itemIndex, sellerIndex) {
    this.cart.sellers[sellerIndex].items.splice(itemIndex, 1);
  }

  // place order
  buy() {
    this.nav.setRoot(OrderConfirmPage);
  }
}
