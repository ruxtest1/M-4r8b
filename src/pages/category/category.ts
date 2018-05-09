import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {VideoPage} from "../video/video";
import {CategorySubPage} from "../category-sub/category-sub";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage implements OnInit {
  api = DEFAULT.config;
  list_category;
  //   [
  //   {
  //     title: "รอก",
  //     id: "1",
  //     image_icon: "http://www.marukyo.co.th/c/7-large_default/%E0%B8%A3%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%9B%E0%B8%B4%E0%B8%99.jpg",
  //   },
  //   {
  //     title: "สายเอ็น/สายลีด",
  //     image_icon: "http://www.marukyo.co.th/c/16-large_default/%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%9E%E0%B8%B5%E0%B8%AD%E0%B8%B5-%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B9%84%E0%B8%94%E0%B8%99%E0%B8%B5%E0%B8%A1%E0%B9%88%E0%B8%B2.jpg",
  //   },
  // ];

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

  goToDetail(cate: any) {
    this.navCtrl.push(CategorySubPage, {
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
