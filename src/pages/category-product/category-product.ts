import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, Content, ActionSheetController, ModalController} from 'ionic-angular';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";
import {DEFAULT} from "../../app/app.constant";
import {ModalFilterPage} from "../modal-filter/modal-filter";
import {ItemPage} from "../item/item";
import {SearchPage} from "../search/search";
// import {CategorySubPage} from "../category-sub/category-sub";
// import {ProductDetailPage} from "../product-detail/product-detail";
// import {ProductCartPage} from "../product-cart/product-cart";
// import {ProductSearchPage} from "../product-search/product-search";

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
    public temp_list_product;
    public countProduct = 0;
    isProductNotFound = true;
    hideMsg = true;
    lang = 'th';
    urlUpload;
    userData;
    sub_id;
    title;
    page = 0;
    limit = 10;
    public isMax = false;
    public isGetList = false;
    public scrollAmount = 0;
    timeScroll = null;
    // sort by
    public sortBy = 'Best Match';

    // view type
    public viewType = 'list';

    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public apiService: Service,
                public shareService: SharedService,
                public zone: NgZone,
                public modalCtrl: ModalController,
                public actionSheetCtrl: ActionSheetController) {
        // this.urlUpload = this.apiService.fnBuildAPIUrl(this.api.product.image.upload);
    }

    ngOnInit() {
        this.sub_id = this.navParams.get('id');
        this.title = this.navParams.get('name');
        this.fnGetCatGroup();
    }

    async fnGetCatGroup() {
        const t = this;
        let data = await this.fnGetList(this.page, this.limit);
        this.list_product = data.rows;
        this.countProduct = this.list_product.length;
        // console.log(this.countProduct)
        if (this.countProduct > 0 && this.countProduct < this.limit) {
            this.isProductNotFound = false;
            this.isMax = true;
        } else if (this.countProduct > 0) {
            this.isProductNotFound = false;
            setTimeout(async()=> {
                t.temp_list_product = await t.fnGetList(t.page+1, t.limit);
            }, 500);
        }
        this.hideMsg = false;
    }

    async fnGetList(page, limit) {
        try {
            const filter = {id: this.sub_id, search: '', take: limit, skip: page * limit};
            return this.apiService.get(this.api.category.getProduct, filter, false);
        } catch (err) {
            return false;
        }
    }

    async doInfinite(infiniteScroll) {
        if (!this.isMax && !this.isGetList) {
            this.isGetList = true;
            this.page++;
            let newItems = this.temp_list_product;
            if (newItems != false) {
                this.isMax = +newItems.rows.length < +this.limit ? true : false;
                // this.isProductNotFound = newItems.length ? false : true;
                for (let i in newItems.rows) {
                    this.list_product.push(newItems.rows[i]);
                }
            }
            this.countProduct = this.list_product.length;
            infiniteScroll.complete();
            this.isGetList = false;
            if (!this.isMax) {
                this.temp_list_product = await this.fnGetList(this.page + 1, this.limit);
            }
        } else {
            infiniteScroll.complete();
        }
    }

    // choose sort by
    chooseSortBy() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Best Match',
                    handler: () => {
                        this.sortBy = 'Best Match';
                    }
                },
                {
                    text: 'Lowest Price First',
                    handler: () => {
                        this.sortBy = 'Lowest Price First';
                    }
                },
                {
                    text: 'Highest Price First',
                    handler: () => {
                        this.sortBy = 'Highest Price First';
                    }
                },
                {
                    text: 'No. of orders',
                    handler: () => {
                        this.sortBy = 'No. of orders';
                    }
                },
                {
                    text: 'Seller Rating',
                    handler: () => {
                        this.sortBy = 'Seller Rating';
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }


    // switch to list view
    viewList() {
        this.viewType = 'list';
    }

    // swith to grid view
    viewGrid() {
        this.viewType = 'grid';
    }

    viewItem(itemId) {

        this.navCtrl.push(ItemPage, {id: itemId})
    }

    // show filter modal
    openFilter(tabName) {
        // show modal
        let modal = this.modalCtrl.create(ModalFilterPage, {tabName: tabName});

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
        // this.navCtrl.push(ProductDetailPage, {id: product.id});
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
        // this.navCtrl.push(ProductCartPage);
    }

    // go to search page
    goToSearch() {
        this.navCtrl.push(SearchPage);
    }

}
