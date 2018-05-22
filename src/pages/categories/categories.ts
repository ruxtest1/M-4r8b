import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {CategoryPage} from "../category/category";
import {SearchPage} from "../search/search";
// import {VideoPage} from "../video/video";
// import {CategorySubPage} from "../category-sub/category-sub";
// import {ProductCartPage} from "../product-cart/product-cart";
// import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html',
})
export class CategoriesPage implements OnInit {
    api = DEFAULT.config;
    list_category;

    lang = 'th';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public shareService: SharedService,) {
    }

    ngOnInit() {
        this.fnGetCatGroup();
    }

    async fnGetCatGroup() {
        console.log('get cat')
        // if (this.shareService.list_category_main !== null) {
        //   this.list_category = this.shareService.list_category_main;
        // } else {
        this.list_category = await this.apiService.get(this.api.category.catMain);
        // this.shareService.list_category_main = this.list_category;
        // }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CategoryPage');
    }

    fnGOToCart() {
        // this.navCtrl.push(ProductCartPage);
    }

    // go to search page
    goToSearch() {
        this.navCtrl.push(SearchPage);
    }

    fnGoToCate(cate: any) {
        this.navCtrl.push(CategoryPage, {
            id: cate.id,
            name: this.apiService.fnLang(cate, 'name'),
        });
    }
}
