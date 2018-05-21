import {Component, OnInit} from '@angular/core';
import {NavController, ModalController, NavParams} from 'ionic-angular';
import {ItemService} from '../../services/item-service';
import {ModalItemOptionPage} from "../modal-item-option/modal-item-option";
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {GalleryModal} from 'ionic-gallery-modal';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-item',
    templateUrl: 'item.html'
})
export class ItemPage implements OnInit {
    api = DEFAULT.config;
    // item info
    public item: any;
    lang = 'th';
    product_id;
    userData;
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
    slides = [];

    constructor(public nav: NavController,
                public itemService: ItemService,
                public sv: Service,
                public navParams: NavParams,
                public shareService: SharedService,
                public modalCtrl: ModalController) {
        // get the first item as sample data
        this.item = itemService.getItem(1);
    }

    async ngOnInit() {
        console.log('ini')
        this.userData = await this.sv.getUserData();
        this.lang = this.shareService.lang;
        this.product_id = this.navParams.get('id');
        await this.fnGetProduct();
        this.buyProduct.quantity = 1;
        this.selectAttribute = [];

        this.productData.attribute_group.forEach((val, key) => {
            this.fnSetAttribute(key);
        })
    }

    async fnGetProduct() {
        try {
            this.productData = await this.sv.get(this.api.product.view_buy, {id: this.product_id});
            // let newArrImg = [];
            if (!this.productData.image_gallery_path.length) {
                this.productData.image_gallery_path.push({
                    path: this.productData.logo_path,
                    path_thumbnail: this.productData.logo_path_thumbnail
                });
            }
            // this.productData.image_gallery_path.forEach((val) => {
            //     newArrImg.push({
            //         path: this.sv.fnBuildImgUrl(val.path),
            //         path_thumbnail: this.sv.fnBuildImgUrl(val.path_thumbnail)
            //     });
            // });
            // if (!newArrImg.length) {
            // this.productData.image_gallery_path.push({
            //         path: null,
            //         path_thumbnail: this.sv.fnBuildImgUrl(null)
            //     });
            // }
            // this.productData.image_gallery_path = newArrImg;
            // this.slides = [];
            // this.productData.image_gallery_path.forEach((val)=>{
            //
            // });

            console.log(this.productData)
        } catch (err) {
            console.log(err);
        }
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

    // add or remove item on wish list
    toggleWishList(item) {
        item.on_wish_list = !item.on_wish_list;
    }

    // get item options group name
    getOptionGroupsName(item) {
        let optionGroups = [];
        for (let i = 0; i < item.option_groups.length; i++) {
            optionGroups.push(item.option_groups[i].name);
        }

        return optionGroups.join(',');
    }

    // make array with range is n
    range(n) {
        return new Array(n);
    }

    // open item option modal
    showOptions(item) {
        // show modal
        let modal = this.modalCtrl.create(ModalItemOptionPage, {item: item});

        // listen for modal close
        modal.onDidDismiss(confirm => {
            if (confirm) {
                // apply filter here
            } else {
                // do nothing
            }
        });

        modal.present();
    }

    fnShowModalImg(idx: any) {
        let gallery = [];
        this.productData.image_gallery_path.forEach((val) => {
            gallery.push({url: this.sv.fnBuildImgUrl(val.path)});
        });
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: gallery,
            initialSlide: idx
        });
        modal.present();
    }
}
