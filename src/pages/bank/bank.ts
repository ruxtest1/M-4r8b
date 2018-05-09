import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from '../../providers/service';
import {TranslateService} from '@ngx-translate/core';

/**
 * Generated class for the BankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bank',
  templateUrl: 'bank.html',
})
export class BankPage {

  public banks = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service: Service,
              public translate: TranslateService,
  ) {
  }

  ngOnInit() {

    this.banks.push({
      bank_name: "kbank",
      bank_name_th: "กรุงเทพ",
      bank_name_en: "กรุงเทพ",
      bank_no: "238-4-44793-0",
      name: "คุณ สุจินดา โรจน์รัตนชัย",
      branch: "เดอะมอลล์บางแค",
      type: "ออมทรัพย์"
    });
    this.banks.push({
      bank_name: "kbank",
      bank_name_th: "กรุงเทพ",
      bank_name_en: "กรุงเทพ",
      bank_no: "238-4-44793-0",
      name: "คุณ สุจินดา โรจน์รัตนชัย",
      branch: "เดอะมอลล์บางแค",
      type: "ออมทรัพย์"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankPage');
  }

  fnGetBankLogo(name: any) {
    let path = "../assets/imgs/bank-logo/", logo = "";
    switch (name) {
      case "bkk"://กรุงเทพ
        logo = "bangkok-bank-logo.png";
        break;
      case "scb"://ไทยพาณิขย์
        logo = "logo_scb.png";
        break;
      case "ktb"://กรุงไทย
        logo = "KTB.png";
        break;
      case "kbank"://กสิกร
        logo = "kasikornbank.png";
        break;
    }
    return path + logo;
  }

  fnCopy(str: string) {
    this.service.fnCopyClipboard(str);
  }

}
