import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
// import {RegisterPage} from "../register/register";
import {HomePage} from '../home/home';
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {VendorRegisterPage} from "../vendor-register/vendor-register";
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    api = DEFAULT.config;

    public loginData: {
        username: '',
        password: ''
    };
    username:any= '';
    password:any= '';

    constructor(public nav: NavController,
                public apiService: Service
    ) {
    }

    // go to register page
    register() {
        // this.nav.push(RegisterPage);
        this.nav.push(VendorRegisterPage);
    }

    // go to home page
    login() {
        this.nav.setRoot(HomePage);
    }

    fnGoToHome() {
        this.nav.setRoot(HomePage);
    }

    // go to forgot password page
    forgotPwd() {
        this.nav.push(ForgotPasswordPage);
    }

    async onSubmit(event: any) {
        console.log('submit', this.loginData)
        // if (event.keyCode === 13) {
        try {
            const res = await this.apiService.post(this.api.userApi.login, {
                username: this.username,
                password: this.password
            });
            console.log(res);
            if (res.data.is_vendor) {//ถ้าเป็น vendor
                res.data.access_token = res.data.id;
                await this.apiService.setStorage(this.apiService.userDataKey, res.data);

                // let str = await this.apiService.getStorage(this.apiService.userDataKey);
                // console.log('getStorage:', str)
                // localStorage.setItem('userData', JSON.stringify(res.data));

                this.apiService.showSuccessTranslate('WELCOME_USER_VENDOR');
                // this.nav.setRoot(HomePage);
            } else {
                this.apiService.showErrorTranslate('USER_IS_NOT_VENDOR');
            }
        } catch (err) {

        }
        // }
    }
}
