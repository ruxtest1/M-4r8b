import {Component, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {TranslateService} from "@ngx-translate/core";
// import {HomePage} from "../home/home";
import {DEFAULT} from "../../app/app.constant";
import {ChangePasswordPage} from "../change-password/change-password";
import {ProfileEditPage} from "../profile-edit/profile-edit";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
    api = DEFAULT.config;
    lang = true;
    userData: any = {
        vendor: {}
    };

    constructor(public nav: NavController,
                public sv: Service,
                public translate: TranslateService,
                public events: Events,
                public shareService: SharedService) {
        if (this.shareService.lang === 'en') {
            this.lang = false;
        }
        this.listenEvents();
    }

    async ngOnInit() {
        this.userData = await this.sv.getUserData();
    }

    async ionViewDidLoad() {
        console.log('ionViewDidLoad');
    }
    async goLogout() {
        this.shareService.callLogout()();
    }

    changePassword() {
        this.nav.push(ChangePasswordPage);
    }

    goEditProfile() {
        this.nav.push(ProfileEditPage);
    }

    listenEvents(){
        const app = this;
        this.events.subscribe('reloadDetails',() => {
            app.ngOnInit();
        });
    }
}
