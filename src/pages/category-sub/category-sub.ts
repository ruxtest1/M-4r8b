import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {CategoryProductPage} from "../category-product/category-product";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the CategorySubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-sub',
  templateUrl: 'category-sub.html',
})
export class CategorySubPage implements OnInit {
  api = DEFAULT.config;
  list_category;
  lang = 'th';
  main_id;
  title;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,) {
  }

  ngOnInit() {
    this.main_id = this.navParams.get('id');
    this.title = this.navParams.get('name');
    this.fnGetCatGroup();
  }

  async fnGetCatGroup() {
    // if (this.apiService.checkData(this.shareService.list_category_sub[this.main_id])) {
    //   this.list_category = this.shareService.list_category_sub[this.main_id];
    // } else {
      this.list_category = await this.apiService.get(this.api.category.catSub, {main_id: this.main_id});
    //   this.shareService.list_category_sub[this.main_id] = this.list_category;
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorySubPage');
  }

  goToDetail(cate: any) {
    this.navCtrl.push(CategoryProductPage, {
      id: cate.id,
      name: this.lang == 'th' ? cate.name_th : (cate.name_en || cate.name_en),
    });
  }

  fnGOToCart() {
    this.navCtrl.push(ProductCartPage);
  }

  fnGoToSearch() {
    this.navCtrl.push(ProductSearchPage);
  }

}
