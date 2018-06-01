import {Component} from '@angular/core';
import {Nav, Platform, Config, ToastController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TranslateService} from '@ngx-translate/core';

import {SharedService} from "../providers/shared.service";
import {Service} from "../providers/service";

// import pages
import {HomePage} from '../pages/home/home';
// import {LoginPage} from '../pages/login/login';
// import {WelcomePage} from '../pages/welcome/welcome';
// import {MyAccountPage} from '../pages/my-account/my-account';
// import {CartPage} from '../pages/cart/cart';
import {SettingsPage} from '../pages/settings/settings';
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from "../pages/category/category";
import {LoginPage} from "../pages/login/login";
import {VendorRegisterPage} from "../pages/vendor-register/vendor-register";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {DEFAULT} from "./app.constant";
// import {WishListPage} from '../pages/wish-list/wish-list';
// import {MyOrderPage} from '../pages/my-order/my-order';

// end import pages

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    api = DEFAULT.config;
    public loadingVisible = false;

    public rootPage: any;

    // public nav: any;

    public pages = [];
    public counter = 0;
    isLogin = false;
    userData = {
        user: {
            name_th: '',
            name_en: '',
        }
    };

    constructor(private translate: TranslateService,
                public platform: Platform,
                public statusBar: StatusBar,
                private config: Config,
                public apiService: Service,
                public splashScreen: SplashScreen,
                public service: SharedService,
                public toastCtrl: ToastController,
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
                set_root: true,
                msg: ''
            },

            {
                title: 'CATEGORY',
                icon: 'ios-list-box-outline',
                count: 0,
                component: CategoriesPage,
                set_root: false,
                msg: ''
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
                set_root: false,
                msg: this.service.lang === 'th' ? "TH" : "EN"
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
        this.platform.ready().then((p) => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (p !== 'dom') {// run on mobile
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            } else {// run on web

            }
            // this.platform.registerBackButtonAction(() => {
            //     if (this.counter == 0) {
            //         this.counter++;
            //         this.presentToast();
            //         setTimeout(() => {
            //             this.counter = 0
            //         }, 3000)
            //     } else {
            //         // console.log("exitapp");
            //         this.platform.exitApp();
            //     }
            // }, 0)
        });

        this.service.userData = await this.apiService.getUserData();
        this.service.isLogin = await this.apiService.isLogin();
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
        if (page.set_root) {
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

    goHome() {
        this.nav.setRoot(HomePage);
    }

    goCategory() {
        this.nav.push(CategoriesPage);
    }

    goLogin() {
        this.nav.push(LoginPage);
    }

    goProfile() {
        this.nav.push(LoginPage);
    }

    goVendorRegister() {
        this.nav.push(VendorRegisterPage);
    }

    goSetting() {
        this.nav.push(SettingsPage);
    }

    goContractUs() {
        this.nav.push(ContactUsPage);
    }

    async goLogout() {
        const t = this;
        const fnConfirm = () => {
            t.apiService.post(t.api.userApi.logout, {})
                .then(async (response) => {
                    await t.apiService.fnLogout();
                    t.nav.setRoot(HomePage);
                }, async (err) => { // when failed
                    await t.apiService.fnLogout();
                    t.nav.setRoot(HomePage);
                });
        };
        const title = await this.apiService.fnGetTranslate('CONFIRM_LOGOUT');
        const text = await this.apiService.fnGetTranslate('DO_YOU_WANT_TO_LOGOUT_APP');
        await this.apiService.fnConfirm(fnConfirm, title, text);

        this.isLogin = await this.apiService.isLogin();
        this.userData = await this.apiService.getUserData();
    }

    // presentToast() {
    //     this.apiService.fnGetTranslate('CONFIRM_TO_EXIT').then((msg:any)=>{
    //         let toast = this.toastCtrl.create({
    //             message: msg,
    //             duration: 3000,
    //             position: "bottom"
    //         });
    //         toast.present();
    //     });
    // }
}


