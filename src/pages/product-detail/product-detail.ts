import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
// import {CategoryProductPage} from "../category-product/category-product";
// import {TranslateService} from "@ngx-translate/core";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSelectOptionPage} from "../product-select-option/product-select-option";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit {
    api = DEFAULT.config;
    list_category;
    lang = 'th';
    product_id;
    userData;
    public title;
    public attrType = {
        color: 'Color',
        radio_button: 'Radio button',
        drop_down: 'Drop down list',
    };
    public productData = {
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
        logo_path_thumbnail: null,
        image_gallery_path: [],
        image_gallery_path_thumbnail: [],
        category_id: null,
        attributes: [],
        attribute_group: [],
    };
    public buyProduct = {
        data: {},
        quantity: 1,
        select_attribute: [],
    };
    public selectProductOptionVisible = false;
    public selectAttribute = [];
    public shippingMethod = [];
    showBtnBuy = false;

    @ViewChild('val1') validationGroup1: DxValidationGroupComponent;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public shareService: SharedService,) {
    }

    async ngOnInit() {
        this.userData = await this.apiService.getUserData();
        this.lang = this.shareService.lang;
        this.product_id = this.navParams.get('id');
        await this.fnGetProduct();
        this.buyProduct.quantity = 1;
        this.selectAttribute = [];

        this.productData.attribute_group.forEach((val, key)=>{
            this.fnSetAttribute(key);
        })
    }

    async fnGetProduct() {
        try {
            this.productData = await this.apiService.get(this.api.product.view, {id: this.product_id});
            let newArrImg = [];
            if (this.productData.logo_path) {
                newArrImg.push({
                    path: this.apiService.fnBuildImgUrl(this.productData.logo_path),
                    path_thumbnail: this.apiService.fnBuildImgUrl(this.productData.logo_path_thumbnail)
                });
            }
            this.productData.image_gallery_path.forEach((val) => {
                newArrImg.push({
                    path: this.apiService.fnBuildImgUrl(val.path),
                    path_thumbnail: this.apiService.fnBuildImgUrl(val.path_thumbnail)
                });
            });
            if (!newArrImg.length) {
                newArrImg.push({
                    path: null,
                    path_thumbnail: this.apiService.fnBuildImgUrl(null)
                });
            }
            this.productData.image_gallery_path = newArrImg;
            console.log(this.productData)
        } catch (err) {
            console.log(err);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductDetailPage');
    }

    goToDetail(cate: any) {
        // this.navCtrl.push(CategoryProductPage, {
        //   id: cate.id,
        //   name: this.lang == 'th' ? cate.name_th : (cate.name_en || cate.name_en),
        // });
    }

    fnGetPrice() {
        if (this.apiService.checkData(this.userData)) {
            return this.productData.price1;
        }
        return this.productData.price1;
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

    fnBuyProduct() {

    }

    public fnGoToCart() {
        this.navCtrl.push(ProductCartPage);
    }

    fnGoToProductOption() {
        // this.navCtrl.push(ProductSelectOptionPage, this.productData);
        this.selectProductOptionVisible = true;
        console.log(this.selectAttribute)
    }

    fnSetAttribute(key) {
        console.log('key', key)
        console.log('select_attribute', this.buyProduct.select_attribute.length)
        console.log('attribute_group', this.productData.attribute_group.length)
        console.log('attributes', this.productData.attributes.length)
        this.showBtnBuy = true;
        if (this.productData.attributes.length && key < this.productData.attribute_group.length) {
            if (this.buyProduct.select_attribute.length <= key) {
                this.buyProduct.select_attribute.push(this.productData.attribute_group[key]);
            }
            // this.showBtnBuy = false;
        }
    }

    fnSelectNextAttr(key, attr) {
        console.log(attr)
        const attribute_id = attr.attribute_id;
        this.buyProduct.select_attribute[key].select_value = this.fnLang(attr.attribute_name_th, attr.attribute_name_en);
        this.buyProduct.select_attribute[key].attribute.forEach((val) => {
            if (val.attribute_id == attribute_id) {
                val.is_select = true;
            } else {
                val.is_select = false;
            }
        });
        if (this.buyProduct.select_attribute.length == key + 1) {
            // this.fnSetAttribute(key + 1);
        }
    }

    fnGetValueSelect(attributes, attribute_id, idx) {
        attributes.forEach((val) => {
            if (val.attribute_id === attribute_id) {
                this.fnSelectNextAttr(idx, val);
            }
        });
    }

    fnValidateSelectCate() {
        return true;
    }

    async fnAddToCart(goToCart?:any) {
        const validate1: any = this.validationGroup1.instance.validate();
        if (!validate1.isValid) {
            this.apiService.showErrorTranslate('PLEASE_PRODUCT_OPTION');
            return false;
        }
        this.buyProduct.select_attribute.forEach((val) => {
            let filterCheck = val.attribute.filter(val2 => val2.is_select);
            if (!filterCheck.length) {
                this.apiService.showErrorTranslate('PLEASE_PRODUCT_OPTION');
                return false;
            }
        });
        // return false;
        this.buyProduct.data = this.productData;
        let resAddCart = await this.apiService.fnAddToCart(this.buyProduct);
        console.log(resAddCart);

        //clear option product
        this.selectProductOptionVisible = false;
        this.buyProduct = {
            data: {},
            quantity: 1,
            select_attribute: [],
        };
        // this.selectAttribute = [];
        this.fnSetAttribute(0);

        this.apiService.showSuccessTranslate('ADD_PRODUCT_TO_CART_SUCCESS');

        if (goToCart === true) {
            setTimeout(() => {
                this.fnGoToCart();
            }, 200);
        }
    }
}
