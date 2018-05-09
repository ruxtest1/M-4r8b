import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
// import {CategoryProductPage} from "../category-product/category-product";
// import {TranslateService} from "@ngx-translate/core";
import {ProductCartPage} from "../product-cart/product-cart";
import {ProductSelectOptionPage} from "../product-select-option/product-select-option";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-product-confirm',
    templateUrl: 'product-confirm.html',
})
export class ProductConfirmPage implements OnInit {
    api = DEFAULT.config;
    list_category;
    lang = 'th';
    product_id;
    userData;
    title;
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
    buyProduct = {
        quantity: 1,
        shipping_method: 1,
        name: '1234 /5252355',
        phone: '1234 /5252355',
        address: '1234 /5252355',
    };
    listProductCart = [];
    selectProduct = [];
    selectAll = true;
    someSelect = true;
    countSelectProduct = 0;
    total = 0;
    shippingMethod = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public shareService: SharedService,) {
    }

    async ngOnInit() {
        this.userData = await this.apiService.getUserData();
        this.lang = this.shareService.lang;
        this.product_id = this.navParams.get('id');
        this.fnGetCard();
    }

    async fnGetCard() {
        try {
            // this.productData = await this.apiService.get(this.api.product.view, {id: this.product_id});
            // console.log(this.productData);
        } catch (err) {
            console.log(err);
        }
    }

    async ionViewDidLoad() {
        console.log('ionViewDidLoad ProductCartPage');
        this.selectProduct = await this.shareService.list_select_buy_product;
        console.log(this.shareService.list_select_buy_product)
        this.fnCalTotal();
        this.fnGetShippingMethod();
    }

    async fnGetShippingMethod() {
        try {
            const api = DEFAULT.config;
            let res = await this.apiService.get(api.buyProduct.shippingMethodList);
            // res.rows.forEach((val) => {
            //     this.shippingMethod.push(this.fnLang(val.name_th, val.name_en));
            // })
            this.shippingMethod = res.rows;
        } catch (err) {
            console.log(err);
        }
    }

    goToCart(cate: any) {
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

    fnGoHome() {
        this.navCtrl.setRoot(HomePage);
    }

    async fnDeleteProduct() {
        const fnDel = async() => {
            let listDel = [];
            for(let i in this.listProductCart) {
                let rowI = this.listProductCart[i];
                if (rowI.is_select) {
                    listDel.push(+i);
                }
            }
            this.listProductCart = await this.apiService.fnRemoveFromCart(listDel);
            console.log('new listProductCart', this.listProductCart);
            this.fnCalTotal();
            this.someSelect = this.listProductCart.length > 0 ? true : false;
        };
        this.apiService.fnConfirmDelete(fnDel, await this.apiService.fnGetTranslate('CONFIRM_DELETE_PRODUCT'))
    }

    fnAddQuantity(qty) {
        qty++;
        return qty;
    }

    fnDownQuantity(qty) {
        if (qty > 1) {
            qty--;
        }
        return qty
    }

    fnSelectProduct() {
        setTimeout(() => {
            let ck = true;
            this.someSelect = false;
            this.listProductCart.forEach((val) => {
                if (!val.is_select) {
                    ck = false;
                } else {
                    this.someSelect = true;
                    this.countSelectProduct++;
                }

            });
            this.selectAll = ck;
            this.fnCalTotal();
        }, 100);
    }

    fnSetCheckAll() {
        setTimeout(() => {
            this.countSelectProduct = this.selectAll ? this.listProductCart.length : 0;
            this.listProductCart.forEach((val) => {
                val.is_select = this.selectAll;
            });
            this.someSelect = this.selectAll;
            this.fnCalTotal();
        }, 100);
    }

    fnBuildCatStr(selectAttr) {
        let arrAttr = [];
        selectAttr.forEach((val)=>{
            let str = this.fnLang(val.group_name_th, val.group_name_en) + ':' + val.select_value;
            arrAttr.push(str)
        });
        return arrAttr.join(', ');
    }

    fnCalTotal() {
        // this.selectProduct =  this.listProductCart.filter(val => val.is_select);
        // console.log(this.selectProduct)
        let total = 0;
        this.selectProduct.forEach((val) => {
            total += val.quantity * val.data.price1;
        });
        this.total = total;
    }

    fnConfirmBuy() {
    }
}
