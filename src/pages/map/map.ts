import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MapDetailPage} from "../map-detail/map-detail";
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    api = DEFAULT.config;
    list_data = [];


    constructor(public navCtrl: NavController,
                public apiService: Service,
                public navParams: NavParams) {
    }

    async ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        let data = await this.fnGetList();
        this.list_data = data.rows;
    }
    async fnGetList() {
        try {
            return this.apiService.get(this.api.map.list, false);
        } catch (err) {
            return false;
        }
    }

    fnGoWeb(str: string) {
        window.open(str, '_system', 'location=yes');
    }

    fnGoToDetail(data: any) {
        console.log(data)
        this.navCtrl.push(MapDetailPage, data);
    }
}
