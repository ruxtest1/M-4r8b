import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CategoryPage} from '../category/category';
import {VipLoginPage} from '../vip-login/vip-login';
import {VideoPage} from '../video/video';
import {VendorRegisterPage} from '../vendor-register/vendor-register';
import {BankPage} from '../bank/bank';
import {ContactUsPage} from '../contact-us/contact-us';
import {MapPage} from '../map/map';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {VendorProfilePage} from "../vendor-profile/vendor-profile";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSearchPage} from "../product-search/product-search";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    isLogin = false;
    userData;

    constructor(public navCtrl: NavController,
                public apiService: Service,
                public shareService: SharedService) {

    }

    async ngOnInit() {
        this.userData = await this.apiService.getUserData();
        if (this.apiService.checkData(this.userData)) {
            this.isLogin = this.userData.is_vendor;
        }
        const carts = await this.apiService.fnGetCart();
        this.shareService.count_product = carts.length
    }

    fnGoCategory() {
        this.navCtrl.push(CategoryPage);
    }

    fnGoVIPLogin() {
        if (this.isLogin) {
            this.navCtrl.push(VendorProfilePage);
        } else {
            this.navCtrl.push(VipLoginPage);
        }
    }

    fnGoVideo() {
        this.navCtrl.push(VideoPage);
    }

    fnGoVendorRegister() {
        this.navCtrl.push(VendorRegisterPage);
    }

    fnGoContactLine() {
        // this.navCtrl.push(CategoryPage);
        window.open('https://line.me/R/ti/p/%40marukyo', '_system', 'location=yes');
        return false;
    }

    fnGoBank() {
        this.navCtrl.push(BankPage);
    }

    fnGoContact() {
        this.navCtrl.push(ContactUsPage);
    }

    fnGoMap() {
        this.navCtrl.push(MapPage);
    }

    fnGoWebSite() {
        // this.navCtrl.push(WebsitePage);
        window.open('http://www.marukyo.co.th', '_system', 'location=yes');
        return false;
    }

    fnGOToCart() {
        this.navCtrl.push(ProductCartPage);
    }

    fnGoToSearch() {
        this.navCtrl.push(ProductSearchPage);
    }
}
