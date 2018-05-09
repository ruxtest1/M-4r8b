import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {OrderService} from "../../services/order-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html'
})
export class MyOrderPage {
  // sample data
  public orders: any;

  constructor(public nav: NavController, public orderService: OrderService) {
    // set sample data
    this.orders = orderService.getAll();
  }
}
