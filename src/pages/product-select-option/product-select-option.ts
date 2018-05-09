import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
// import {CategoryProductPage} from "../category-product/category-product";
// import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ProductSelectOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-select-option',
  templateUrl: 'product-select-option.html',
})
export class ProductSelectOptionPage implements OnInit {
  api = DEFAULT.config;
  list_category;
  public lang = 'th';
  product_id;
  userData;
  title;
  public attrType = {
    color: 'Color',
    radio_button: 'Radio button',
    drop_down: 'Drop down list',
  };
  productData = {
    name_th: '',
    name_en: '',
    detail_th: '',
    detail_en: '',
    detail_short_th: '',
    detail_short_en: '',
    quantity: null,
    price1: null,
    price_star1: null,
    price_star2: null,
    price_star3: null,
    price_star4: null,
    price_star5: null,
    logo_path: null,
    image_gallery_path: [],
    category_id: null,
  };
  product = {
    logo_path_thumbnail: '',
    name_th: '',
    name_en: '',
    detail_th: '',
    detail_en: '',
    price1: '',
    attributes: [],
    attribute_group: [],
  };
  buyProduct = {
    quantity: 1,
    shipping_method: '',
    select_attribute: [],
  };
  shippingMethod = [];
  selectAttribute = [];
  countSelectAttribute = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,) {
  }

  async ngOnInit() {
  }

  async fnGetShippingMethod() {
    try {
      const api = DEFAULT.config;
      let res = await this.apiService.get(api.buyProduct.shippingMethodList);
      res.rows.forEach((val) => {
        this.shippingMethod.push(this.fnLang(val.name_th, val.name_en));
      })
    } catch (err) {
      console.log(err);
    }
    // console.log(this.productData);
    // let newArrImg = [];
    // if (this.productData.logo_path) {
    //   newArrImg.push(this.fnBuildImageUrl(this.productData.logo_path));
    // }
    // this.productData.image_gallery_path.forEach((val) => {
    //   newArrImg.push(this.fnBuildImageUrl(val.path));
    // });
    // if (!this.productData.image_gallery_path.length) {
    //   newArrImg.push(this.fnBuildImageUrl(null));
    // }
    // this.productData.image_gallery_path = newArrImg;
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSelectOptionPage');
    this.userData = await this.apiService.getUserData();
    this.lang = this.shareService.lang;
    this.product = this.navParams.data;
    console.log(this.product)
    this.fnGetShippingMethod();
    this.fnSetAttribute(0);
  }

  fnSetAttribute(key) {
    if (this.product.attributes.length && key < this.product.attribute_group.length) {
      let checkAdd = true, newSelectAttr = [];
      this.selectAttribute.forEach((val) => {
        if (val.attribute_group_id === this.product.attribute_group[key].attribute_group_id) {
          checkAdd = false;
          newSelectAttr.push(val);
        }
        if (checkAdd) {
          newSelectAttr.push(val);
        }
      });
      if (checkAdd) {
        this.selectAttribute.push(this.product.attribute_group[key]);
      } else {
        this.selectAttribute = newSelectAttr;
      }
    }
      console.log(this.selectAttribute);
    this.buyProduct.select_attribute = [];
    this.selectAttribute.forEach((val) => {
      val.attribute.forEach((val2) => {
        if (val2.is_select) {
          this.buyProduct.select_attribute.push(val2)
        }
      });
    });
    console.log(this.buyProduct.select_attribute);
  }

  goToSelectOption(cate: any) {
    // this.navCtrl.push(CategoryProductPage, {
    //   id: cate.id,
    //   name: this.lang == 'th' ? cate.name_th : (cate.name_en || cate.name_en),
    // });
  }

  fnGetPrice() {
    if (this.apiService.checkData(this.userData)) {
      return this.product.price1;
    }
    return this.product.price1;
  }

  fnLang(th, en) {
    return this.lang == 'th' ? th : (en || th);
  }

  fnAddQuantity() {
    this.buyProduct.quantity++;
  }

  fnDownQuantity() {
    if (this.buyProduct.quantity > 1) {
      this.buyProduct.quantity--;
    }
  }

  fnSelectNextAttr(key, attribute_id) {
    console.log(attribute_id);
    this.product.attribute_group[key].attribute.forEach((val) => {
      if (val.attribute_id == attribute_id) {
        val.is_select = true;
      } else {
        val.is_select = false;
      }
    });
    this.fnSetAttribute(key + 1)
    // this.selectAttribute = [];
    // for (let i = 0; i < key + 1; i++) {
    //   this.fnSetAttribute(i)
    // }
  }

  fnGetValueSelect(attr, valueSelect, idx) {
    let valReturn = null,
      attribute = attr.attribute;
    attribute.forEach((val) => {
      if (val.attribute_id === valueSelect) {
        valReturn = this.lang === 'th' ? val.attribute_name_th : val.attribute_name_en;
      }
    });
    attr.select_value = valReturn;
    this.fnSelectNextAttr(idx, valueSelect);
    return attr;
  }

  fnBuyProduct() {

  }
}
