import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from '../../providers/service';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT} from "../../app/app.constant";

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
    api = DEFAULT.config;

    public banks = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public translate: TranslateService,) {
    }

    async ngOnInit() {

        // this.banks.push({
        //     bank_name: "kbank",
        //     bank_name_th: "กรุงเทพ",
        //     bank_name_en: "กรุงเทพ",
        //     bank_no: "238-4-44793-0",
        //     name: "คุณ สุจินดา โรจน์รัตนชัย",
        //     branch: "เดอะมอลล์บางแค",
        //     type: "ออมทรัพย์"
        // });
        // this.banks.push({
        //     bank_name: "kbank",
        //     bank_name_th: "กรุงเทพ",
        //     bank_name_en: "กรุงเทพ",
        //     bank_no: "238-4-44793-0",
        //     name: "คุณ สุจินดา โรจน์รัตนชัย",
        //     branch: "เดอะมอลล์บางแค",
        //     type: "ออมทรัพย์"
        // });
        let data = await this.fnGetList();
        this.banks = data.rows;
    }

    async fnGetList() {
        try {
            return this.apiService.get(this.api.bank.list, false);
        } catch (err) {
            return false;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BankPage');
    }

    fnGetBankLogo(name: any) {
        let path = "assets/img/bank-logo/", logo = "";
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
        this.apiService.fnCopyClipboard(str);
    }

}
