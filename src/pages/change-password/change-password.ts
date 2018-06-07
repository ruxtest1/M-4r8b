import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {SharedService} from "../../providers/shared.service";
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-change-password',
    templateUrl: 'change-password.html'
})
export class ChangePasswordPage implements OnInit {
    api = DEFAULT.config;
    userData: any;
    formErrors: any = {
        new_password: '',
        old_password: ''
    };

    formData = {
        old_password: '',
        new_password: ''

    };

    constructor(public nav: NavController,
                public sv: Service,
                public translate: TranslateService,
                public shareService: SharedService) {
    }

    async ngOnInit() {
        this.userData = await this.sv.getUserData();
    }

    async fnValidate() {
        console.log(this.formData)
        const oldPass = this.formData.old_password;
        const newPass = this.formData.new_password;
        if (!oldPass) {
            this.formErrors.old_password = await this.sv.fnGetTranslate('OLD_PASSWORD_REQUIRE');
            return false;
        }
        if (oldPass !== this.userData.vendor.password) {
            this.formErrors.old_password = await this.sv.fnGetTranslate('OLD_PASSWORD_INVALID');
            return false;
        }
        this.formErrors.old_password = '';

        if (!newPass) {
            this.formErrors.new_password = await this.sv.fnGetTranslate('NEW_PASSWORD_REQUIRE');
            return false;
        }
        if (newPass.length < 4) {
            this.formErrors.new_password = await this.sv.fnGetTranslate('PASSWORD_3_CHARACTER');
            return false;
        }
        this.formErrors.new_password = '';

        return true;
    }

    async fnSaveNewPass() {
        if (await this.fnValidate()) {
            try {
                const id = this.userData.vendor.id;
                let res = await this.sv.put(this.api.vendor.edit_password.replace(':id', id), this.formData);
                console.log(res);
                this.sv.showSuccessTranslate('SAVE_DATA_SUCCESS');

                this.userData.vendor = res;
                await this.sv.setUserData(this.userData);

                this.nav.pop();
            } catch (err) {
                console.log(err);
            }
        }
    }
}
