import {Component, NgZone, OnInit} from '@angular/core';
import {NavController, Platform, ToastController} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';
import {ItemService} from '../../services/item-service';
import {CategoriesPage} from "../categories/categories";
import {CategoryPage} from "../category/category";
import {ItemPage} from "../item/item";
import {SearchPage} from "../search/search";
import {CartPage} from "../cart/cart";

import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {LoginPage} from "../login/login";
import {VideoPage} from "../video/video";
import {ContactUsPage} from "../contact-us/contact-us";
import {BankPage} from "../bank/bank";
import {MapPage} from "../map/map";
import {VendorRegisterPage} from "../vendor-register/vendor-register";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    api = DEFAULT.config;
    // list slides for slider
    public slides = [
        {
            src: 'assets/img/Marukyo-app-bg-750.png'
        },
    ];
    showMenu = false;

    // list categories
    public categories: any;

    // list of items
    public items: any;

    public list_product;
    timeSearch = null;
    scrollAmount = 0;
    isMax = false;
    isProductNotFound = true;
    hideMsg = true;
    limit = 10;
    page = 0;
    counter = 0;
    // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
    public unregisterBackButtonAction: any;

    constructor(public nav: NavController,
                public categoryService: CategoryService,
                public zone: NgZone,
                public platform: Platform,
                public sv: Service,
                public shareService: SharedService,
                public toastCtrl: ToastController,
                public itemService: ItemService) {
        this.categories = categoryService.getAll();

        this.items = itemService.getAll();
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.initializeBackButtonCustomHandler();
    }

    ionViewWillLeave() {
        // Unregister the custom back button action for this page
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    public initializeBackButtonCustomHandler(): void {
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.customHandleBackButton();
        }, 10);
    }

    private customHandleBackButton(): void {
        let view = this.nav.getActive();
        if (view.instance instanceof HomePage) {
            if (this.counter == 0) {
                this.counter++;
                this.presentToast();
                setTimeout(() => {
                    this.counter = 0
                }, 2000)
            } else {
                // console.log("exitapp");
                this.platform.exitApp();
            }
        } else {
            this.nav.pop();
        }
    }

    presentToast() {
        this.sv.fnGetTranslate('CONFIRM_TO_EXIT').then((msg: any) => {
            let toast = this.toastCtrl.create({
                message: msg,
                duration: 3000,
                position: "bottom"
            });
            toast.present();
        });
    }

    async ngOnInit() {
        // this.userData = await this.sv.getUserData();
        // this.lang = this.shareService.lang;
        // this.product_id = this.navParams.get('id');
        const products = await this.fnGetList(1, this.limit)
        this.list_product = products.rows;
    }

    // view categories
    viewCategories() {
        this.nav.push(CategoriesPage);
    }

    // view a category
    viewCategory(catId) {
        this.nav.push(CategoryPage, {id: catId});
    }

    // view a item
    viewItem(itemId) {
        this.nav.push(ItemPage, {id: itemId})
    }

    // go to search page
    goToSearch() {
        this.nav.push(SearchPage);
    }

    // view cart
    goToCart() {
        this.nav.push(CartPage);
    }

    scrollHandler(event) {
        this.zone.run(() => {
            if (this.timeSearch) {
                clearTimeout(this.timeSearch);
            }
            this.timeSearch = setTimeout(() => {
                this.scrollAmount = event.scrollTop;
            }, 100);
        });
    }

    async fnGetList(page, limit) {
        try {
            const filter = {search: '', take: limit, skip: page * limit};
            return this.sv.get(this.api.product.search, filter);
        } catch (err) {
            return false;
        }
    }

    async doInfinite(infiniteScroll) {
        if (!this.isMax) {
            this.page++;
            let newItems = await this.fnGetList(this.page, this.limit);
            if (newItems != false) {
                this.isMax = newItems.rows.length > 0 ? false : true;
                this.isProductNotFound = newItems.totalCount > 0 ? false : true;
            }
            setTimeout(() => {
                if (newItems != false) {
                    for (let i in newItems.rows) {
                        this.list_product.push(newItems.rows[i]);
                    }
                }
                infiniteScroll.complete();
            }, 500);
        } else {
            infiniteScroll.complete();
        }
    }

    fnProductPrice(data: any) {
        return this.sv.fnProductPrice(data);
    }

    fnGoCategory() {
        this.nav.push(CategoriesPage);
    }

    fnGoVIPLogin() {
        this.nav.push(LoginPage);
    }

    fnGoVendorRegister() {
        this.nav.push(VendorRegisterPage);
    }

    fnGoVideo() {
        this.nav.push(VideoPage);
    }

    fnGoContactLine() {
        window.open('https://line.me/R/ti/p/%40marukyo', '_system', 'location=yes');
    }

    fnGoBank() {
        this.nav.push(BankPage);
    }

    fnGoContact() {
        this.nav.push(ContactUsPage);
    }

    fnGoMap() {
        this.nav.push(MapPage);
    }
}
