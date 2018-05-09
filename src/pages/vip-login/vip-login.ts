import {Component, ViewChild} from '@angular/core';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";
import {SharedService} from "../../providers/shared.service";
import {VipForgetPassPage} from "../vip-forgetpass/vip-forgetpass";

/**
 * Generated class for the VipLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-vip-login',
    templateUrl: 'vip-login.html',
})
export class VipLoginPage {
    api = DEFAULT.config;
    loginData = {
        id: '',
        password: ''
    };

    @ViewChild('val1') validationGroup1: DxValidationGroupComponent;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public shareService: SharedService,) {
    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad VipLoginPage');
    }

    async fnLogin() {
        const result: any = this.validationGroup1.instance.validate();
        if (result.isValid) {
            try {
                const res = await this.apiService.fnLogin(this.api.userApi.login, this.loginData);
                let data = res.data;
                console.log(data);
                if (data.is_vendor) {
                    await this.apiService.setStorage(this.apiService.userDataKey, data);
                    this.shareService.userData = data;
                    this.apiService.showSuccessTranslate('LOGIN_SUCCESS');
                } else {
                    this.apiService.showSuccessTranslate('YOU_NOT_HAVE_A_PERMISSION');
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            this.apiService.showErrorTranslate('PLEASE_CHECK_INPUT');
        }
    }

    fnGoForgetPass() {
        this.navCtrl.push(VipForgetPassPage, {});
    }
}
