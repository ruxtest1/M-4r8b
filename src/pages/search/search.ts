import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SearchResultPage} from "../search-result/search-result";
import {Service} from "../../providers/service";
// import { Keyboard } from 'ionic-native';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage implements OnInit {
    @ViewChild('input') myInput;
    textSearch = '';
    searchHistoryList = [];

    constructor(public nav: NavController,
                public sv: Service) {
    }

    async ngOnInit() {
        this.searchHistoryList = await this.sv.fnGetSearchHistory();
    }

    ionViewDidLoad() {
        console.log("I'm alive!");
        setTimeout(() => {
            // Keyboard.show() // for android
            this.myInput.setFocus();
        }, 500); //a least 150ms.
    }

    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

    async goToSearchResult(e) {
        if (!this.textSearch) {
            return true;
        }
        this.searchHistoryList = await this.sv.fnAddSearchHistory(this.textSearch);
        this.nav.push(SearchResultPage, {
            search_text: this.textSearch,
        });
    }

    fnSelectOldSearch(str: string) {
        this.textSearch = str;
        this.myInput.setFocus();
    }

    async fnRemoveSearch(idx: any) {
        this.searchHistoryList = await this.sv.fnRemoveSearchHistory(idx);
    }

    async fnRemoveAllSearch() {
        await this.sv.fnRemoveAllSearch();
        this.searchHistoryList = []
    }


}
