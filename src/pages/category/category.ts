import {Component, OnInit} from '@angular/core';
import {NavController,NavParams, ActionSheetController, ModalController} from 'ionic-angular';

import {ItemService} from '../../services/item-service';
import {CategoryService} from '../../services/category-service';
import {ModalFilterPage} from "../modal-filter/modal-filter";
import {ItemPage} from "../item/item";
import {CartPage} from "../cart/cart";
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {CategoryProductPage} from "../category-product/category-product";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage implements OnInit{
    api = DEFAULT.config;
    public list_product;
    public countProduct = 0;
    isProductNotFound = true;
    lang = 'th';
    urlUpload;
    userData;
    main_id;
    title;
    page = 0;
    limit = 10;
    public isMax = false;
    public scrollAmount = 0;
    timeScroll = null;
    list_category = [];

  // list items of this category
  public items: any;

  // category info
  public category: any;


  // sort by
  public sortBy = 'Best Match';

  constructor(public nav: NavController,
              public itemService: ItemService,
              public categoryService: CategoryService,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,
              public actionSheetCtrl: ActionSheetController) {
    // get list items of a category as sample
    this.items = itemService.getByCategory(1);

    // set category info
    this.category = categoryService.getItem(1);
  }

    ngOnInit() {
        this.main_id = this.navParams.get('id');
        this.title = this.navParams.get('name');
        this.fnGetCatGroup();
    }

    async fnGetCatGroup() {
        this.list_category = await this.apiService.get(this.api.category.catSub, {main_id: this.main_id});
    }

  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }

  // view a item
  viewItem(itemId) {
    this.nav.push(ItemPage, {id: itemId})
  }

  // view cart
  goToCart() {
    this.nav.setRoot(CartPage);
  }

    goToDetail(cate: any) {
        this.nav.push(CategoryProductPage, {
            id: cate.id,
            name: this.apiService.fnLang(cate, 'name'),
        });
    }
}
