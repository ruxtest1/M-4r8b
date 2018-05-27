import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from '../../providers/service';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-contact-us',
    templateUrl: 'contact-us.html',
})
export class ContactUsPage {
    openPopupPhone = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public service: Service,) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ContactUsPage');
    }

    fnCopy(str: string) {
        this.service.fnCopyClipboard(str);
    }

    fnGoWeb(str: string) {
        window.open(str, '_system', 'location=yes');
    }

    fnCall(str: string) {
        window.open('tel:' + str, '_system', 'location=yes');
    }
}
