import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-tab-filter',
  templateUrl: 'tab-filter.html'
})
export class TabFilterPage {
  // set filter value
  public filter = {
    shipTo: ''
  }

  constructor(public nav: NavController, public viewCtrl: ViewController) {
  }

  // close modal
  closeModal() {
    // this.nav.pop();
    // this.viewCtrl.dismiss(true);
  }
}
