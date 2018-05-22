import {Component} from '@angular/core';
import {Nav, Platform, Config} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TranslateService} from '@ngx-translate/core';

import {SharedService} from "../providers/shared.service";
import {Service} from "../providers/service";

// import pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
import {MyAccountPage} from '../pages/my-account/my-account';
import {CartPage} from '../pages/cart/cart';
import {SettingsPage} from '../pages/settings/settings';
import {CategoriesPage} from '../pages/categories/categories';
import {WishListPage} from '../pages/wish-list/wish-list';
import {MyOrderPage} from '../pages/my-order/my-order';

// end import pages

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    public loadingVisible = false;

    public rootPage: any;

    // public nav: any;

    public pages = [];

    constructor(private translate: TranslateService,
                public platform: Platform,
                public statusBar: StatusBar,
                private config: Config,
                public apiService: Service,
                public splashScreen: SplashScreen,
                public service: SharedService,
                public screenOrientation: ScreenOrientation) {

        this.service.setCallbackShowLoading(this.fnShowLoading.bind(this));
        this.service.setCallbackHideLoading(this.fnHideLoading.bind(this));

        this.initializeApp();
        this.initTranslate();
        this.fnInitMenu();
        this.fnCheckRootPage();
    }

    async fnInitMenu() {
        this.pages = [
            {
                title: 'HOME',
                icon: 'ios-home-outline',
                count: 0,
                component: HomePage,
                set_root: true
            },

            {
                title: 'CATEGORY',
                icon: 'ios-list-box-outline',
                count: 0,
                component: CategoriesPage,
                set_root: false
            },

            // {
            //     title: 'WishList',
            //     icon: 'md-heart-outline',
            //     count: 2,
            //     component: WishListPage
            // },
            //
            // {
            //     title: 'My Order',
            //     icon: 'ios-timer-outline',
            //     count: 0,
            //     component: MyOrderPage
            // },
            //
            // {
            //     title: 'My Account',
            //     icon: 'ios-contact-outline',
            //     count: 0,
            //     component: MyAccountPage
            // },

            // {
            //     title: 'Cart',
            //     icon: 'ios-cart-outline',
            //     count: 1,
            //     component: CartPage
            // },

            {
                title: 'SETTINGS_TITLE',
                icon: 'ios-settings-outline',
                count: 0,
                component: SettingsPage,
                set_root: false
            },

            // {
            //     title: 'Logout',
            //     icon: 'log-out',
            //     count: 0,
            //     component: LoginPage
            // },
            // import menu
        ];
    }

    async initializeApp() {
        this.service.userData = await this.apiService.getUserData();
        this.platform.ready().then((p) => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (p !== 'dom') {// run on mobile
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            } else {// run on web

            }
        });
    }

    async initTranslate() {
        let curLang = await this.apiService.getStorage(this.apiService.langKey) || 'th';
        // let curLang = 'th';
        this.service.lang = curLang;
        // Set the default language for translation strings, and the current language.
        // this.translate.setDefaultLang('en');

        this.translate.use(curLang);
        await this.apiService.setStorage(this.apiService.langKey, curLang);

        // if (this.translate.getBrowserLang() !== undefined) {
        //   // this.translate.use(this.translate.getBrowserLang());
        //   this.translate.use('th');
        // } else {
        //   this.translate.use('th'); // Set your language here
        // }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    async fnCheckRootPage() {
        this.rootPage = HomePage;
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.set_root){
            this.nav.setRoot(page.component);
        } else {
            this.nav.push(page.component);
        }
    }

    public fnShowLoading() {
        this.loadingVisible = true;
    }

    public fnHideLoading() {
        this.loadingVisible = false;
    }
}


