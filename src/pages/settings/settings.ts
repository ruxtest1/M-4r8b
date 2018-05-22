import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {TranslateService} from "@ngx-translate/core";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    lang = true;

    constructor(public nav: NavController,
                public apiService: Service,
                public translate: TranslateService,
                public shareService: SharedService) {
        if (this.shareService.lang === 'en') {
            this.lang = false;
        }
    }

    async fnSetLang(e) {
        let setLang = 'th';
        if (!e.value) {
            setLang = 'en';
        }
        this.shareService.lang = setLang;
        this.translate.use(setLang);
        await this.apiService.setStorage(this.apiService.langKey, setLang);
    }
}
