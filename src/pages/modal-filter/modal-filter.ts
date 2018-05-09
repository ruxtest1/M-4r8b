import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TabFilterPage} from "../tab-filter/tab-filter";
import {TabAttributePage} from "../tab-attribute/tab-attribute";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter.html'
})

export class ModalFilterPage {
  // tabs
  public tabFilter = TabFilterPage;
  public tabAttribute = TabAttributePage;
  public selectedIndex = 0;

  constructor(public nav: NavController, public navParams: NavParams) {
    if (navParams.get('tabName') == 'attribute') {
      this.selectedIndex = 1
    }
  }
}
