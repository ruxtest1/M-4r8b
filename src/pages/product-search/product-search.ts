import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
// import {CategoryProductPage} from "../category-product/category-product";
// import {TranslateService} from "@ngx-translate/core";
import {ProductDetailPage} from "../product-detail/product-detail";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage implements OnInit {
  api = DEFAULT.config;
  list_category;
  lang = 'th';
  product_id;
  userData;
  title;
  inputSearch;
  timeSearch = null;
  countProduct = 0;
  public list_product;
  buyProduct = {
    quantity: 1,
  };
  scrollAmount = 0;
  isMax = false;
  isProductNotFound = true;
  hideMsg = true;
  limit = 10;
  page = 0;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,
              public zone: NgZone) {
  }

  async ngOnInit() {
    this.userData = await this.apiService.getUserData();
    this.lang = this.shareService.lang;
    this.product_id = this.navParams.get('id');
    this.fnGetCard();
  }

  async fnGetCard() {
    try {
      // this.list_product = await this.apiService.get(this.api.product.view, {id: this.product_id});
      // console.log(this.list_product);
    } catch (err) {
      console.log(err);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
  }

  goToSearch(cate: any) {
    // this.navCtrl.push(CategoryProductPage, {
    //   id: cate.id,
    //   name: this.lang == 'th' ? cate.name_th : (cate.name_en || cate.name_en),
    // });
  }

  fnGetPrice(product) {
    if (this.apiService.checkData(this.userData)) {
      return product.price1;
    }
    return product.price1;
  }

  fnLang(th, en) {
    return this.lang == 'th' ? th : (en || th);
  }

  fnGoHome() {
    this.navCtrl.setRoot(HomePage);
  }

  async fnGetList(page, limit) {
    try {
      return this.apiService.get(this.api.product.search, {search: this.inputSearch, take: limit, skip: page * limit});
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

  onInputSearch(e) {
    this.hideMsg = true;
    if (this.inputSearch) {
      if (this.timeSearch) {
        clearTimeout(this.timeSearch);
      }
      this.timeSearch = setTimeout(async () => {
        this.scrollToTop();
        this.page = 0;
        this.isMax = false;
        let res = await this.fnGetList(this.page, this.limit);
        this.isProductNotFound = res.totalCount > 0 ? false : true;
        this.list_product = res.rows;
        this.countProduct = this.list_product.length;
        if (this.countProduct < this.limit) {
          this.isMax = true;
        }
        this.hideMsg = false;
      }, 1500);
    }
  }

  scrollHandler(event) {
    // console.log(event.scrollTop)
    // if (event.scrollTop <= 100) {
    // } else {
    //   this.scrollAmount++;
    // }
    this.zone.run(() => {
      if (this.timeSearch) {
        clearTimeout(this.timeSearch);
      }
      this.timeSearch = setTimeout(() => {
        this.scrollAmount = event.scrollTop;
      }, 100);
    });
  }

  scrollToTop() {
    this.content.scrollTo(0, 0, 1000);
  }

  onCancel(e) {
    if (this.timeSearch) {
      clearTimeout(this.timeSearch);
    }
  }

  goToDetail(product: any) {
    this.navCtrl.push(ProductDetailPage, {id: product.id});
  }
}
