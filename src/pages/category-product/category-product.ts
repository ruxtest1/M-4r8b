import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {CategorySubPage} from "../category-sub/category-sub";
import {ProductDetailPage} from "../product-detail/product-detail";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSearchPage} from "../product-search/product-search";

/**
 * Generated class for the CategoryProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-product',
  templateUrl: 'category-product.html',
})
export class CategoryProductPage implements OnInit {
  api = DEFAULT.config;
  public list_product;
  public countProduct = 0;
  isProductNotFound = true;
  lang = 'th';
  urlUpload;
  userData;
  sub_id;
  title;
  page = 0;
  limit = 10;
  public isMax = false;
  public scrollAmount = 0;
  timeScroll = null;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,
              public zone: NgZone) {
    // this.urlUpload = this.apiService.fnBuildAPIUrl(this.api.product.image.upload);
  }

  ngOnInit() {
    this.sub_id = this.navParams.get('id');
    this.title = this.navParams.get('name');
    this.fnGetCatGroup();
  }

  async fnGetCatGroup() {
    this.list_product = await this.fnGetList(this.page, this.limit);
    this.isProductNotFound = this.list_product.length ? false : true;
    this.countProduct = this.list_product.length;
    console.log(this.countProduct)
    if (this.countProduct < this.limit) {
      this.isMax = true;
    }
  }

  async fnGetList(page, limit) {
    try {
      return this.apiService.get(this.api.category.getProduct, {id: this.sub_id, limit: limit, page: page}, false);
    } catch (err) {
      return false;
    }
  }

  async doInfinite(infiniteScroll) {
    if (!this.isMax) {
      this.page++;
      let newItems = await this.fnGetList(this.page, this.limit);
      if (newItems != false) {
        this.isMax = newItems.length > 0 ? false : true;
        this.isProductNotFound = newItems.length ? false : true;
      }
      setTimeout(() => {
        if (newItems != false) {
          for (let i in newItems) {
            this.list_product.push(newItems[i]);
          }
          this.countProduct = this.list_product.length;
        }
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryProductPage');
  }

  fnGetPrice(product) {
    if (this.apiService.checkData(this.userData)) {
      return product.price1;
    }
    return product.price1;
  }

  goToDetail(product: any) {
    this.navCtrl.push(ProductDetailPage, {id: product.id});
  }

  scrollToTop() {
    this.content.scrollTo(0, 0, 1000);
  }

  scrollHandler(event) {
    this.zone.run(() => {
      clearTimeout(this.timeScroll);
      this.timeScroll = setTimeout(() => {
        this.scrollAmount = event.scrollTop;
      }, 100);
    });
  }

  fnGOToCart() {
    this.navCtrl.push(ProductCartPage);
  }

  fnGoToSearch() {
    this.navCtrl.push(ProductSearchPage);
  }

}
