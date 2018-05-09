import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {StoreService} from '../../services/store-service';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {

  constructor(public nav: NavController, public storeService: StoreService) {
  }
}
