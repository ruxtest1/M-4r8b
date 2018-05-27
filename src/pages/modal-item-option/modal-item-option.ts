import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';

import {ItemService} from '../../services/item-service';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-modal-item-option',
    templateUrl: 'modal-item-option.html'
})
export class ModalItemOptionPage implements OnInit {
    // current item
    public item: any;
    public userData: any;

    public attrType = {
        color: 'Color',
        radio_button: 'Radio button',
        drop_down: 'Drop down list',
    };
    public buyProduct = {
        data: {},
        quantity: 1,
        select_attribute: [],
        option_price: 0
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
    public selectProductOptionVisible = false;
    public selectAttribute = [];
    public shippingMethod = [];
    showBtnBuy = false;

    constructor(public nav: NavController,
                public itemService: ItemService,
                public navParams: NavParams,
                public sv: Service,
                public shareService: SharedService,
                public viewCtrl: ViewController, public toastCtrl: ToastController) {
        this.productData = navParams.get('item');
        // this.item.option_price = 0;

        this.productData.attribute_group.forEach((val, key) => {
            this.fnSetAttribute(key);
        });
        console.log(this.buyProduct)
    }

    async ngOnInit() {
        this.userData = await this.sv.getUserData();
        this.buyProduct.quantity = 1;
        this.selectAttribute = [];
    }

    // choose a option
    chooseOption(optionGroup, option) {
        for (let i = 0; i < optionGroup.options.length; i++) {
            optionGroup.options[i].active = false;
        }

        option.active = true;
        optionGroup.currentOption = option;

        // recalculate price
        this.calculatePrice();
    }

    fnSetAttribute(key) {
        // console.log('key', key)
        // console.log('select_attribute', this.buyProduct.select_attribute.length)
        // console.log('attribute_group', this.productData.attribute_group.length)
        // console.log('attributes', this.productData.attributes.length)
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
        this.buyProduct.select_attribute[key].select_value = this.sv.fnLang(attr, 'attribute_name');
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

    // calculate item price
    calculatePrice() {
        this.item.option_price = 0;
        for (let i = 0; i < this.item.option_groups.length; i++) {
            if (this.item.option_groups[i].currentOption)
                this.item.option_price += this.item.option_groups[i].currentOption.price;
        }
    }

    // add to card
    addCart(item) {
        // let toast = this.toastCtrl.create({
        //   message: 'Item added to card',
        //   duration: 500,
        //   position: 'middle'
        // });
        //
        // toast.present();

        this.sv.showSuccessTranslate('ADD_PRODUCT_TO_CART_SUCCESS');
        this.viewCtrl.dismiss(true);
    }

    // buy now
    buy(item) {

    }

    // close modal
    closeModal() {
        this.viewCtrl.dismiss(true);
    }

    fnAddQuantity() {
        this.buyProduct.quantity++;
    }

    fnDownQuantity() {
        if (this.buyProduct.quantity > 1) {
            this.buyProduct.quantity--;
        }
    }
}
