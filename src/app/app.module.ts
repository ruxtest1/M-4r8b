import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// import services
import {CategoryService} from '../services/category-service';
import {ItemService} from '../services/item-service';
import {UserService} from '../services/user-service';
import {StoreService} from '../services/store-service';
import {CartService} from '../services/cart-service';
import {OrderService} from '../services/order-service';
import {NewsService} from '../services/news-service';
import {GoogleMaps} from '@ionic-native/google-maps';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Clipboard} from '@ionic-native/clipboard';
import {Service} from '../providers/service';
import {SharedService} from "../providers/shared.service";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import {DxFileUploaderModule} from 'devextreme-angular/ui/file-uploader';
import {DxSwitchModule} from 'devextreme-angular/ui/switch';
import {DxNumberBoxModule} from 'devextreme-angular/ui/number-box';
import {DxValidationGroupModule} from 'devextreme-angular/ui/validation-group';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
// end import services
// end import services

// import pages
import {CartPage} from '../pages/cart/cart';
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from '../pages/category/category';
import {ChangePasswordPage} from '../pages/change-password/change-password';
import {CurrencyConverterPage} from '../pages/currency-converter/currency-converter';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {HomePage} from '../pages/home/home';
import {ItemPage} from '../pages/item/item';
import {LoginPage} from '../pages/login/login';
import {ModalFilterPage} from '../pages/modal-filter/modal-filter';
import {ModalItemOptionPage} from '../pages/modal-item-option/modal-item-option';
import {MyAccountPage} from '../pages/my-account/my-account';
import {MyOrderPage} from '../pages/my-order/my-order';
import {OrderConfirmPage} from '../pages/order-confirm/order-confirm';
import {RegisterPage} from '../pages/register/register';
import {SearchPage} from '../pages/search/search';
import {SettingsPage} from '../pages/settings/settings';
import {StorePage} from '../pages/store/store';
import {TabAttributePage} from '../pages/tab-attribute/tab-attribute';
import {TabFilterPage} from '../pages/tab-filter/tab-filter';
import {WelcomePage} from '../pages/welcome/welcome';
import {WishListPage} from '../pages/wish-list/wish-list';
import {CategoryProductPage} from "../pages/category-product/category-product";
import {SearchResultPage} from "../pages/search-result/search-result";
import {VideoPage} from "../pages/video/video";
import {VideoDetailPage} from "../pages/video-detail/video-detail";
import {ContactUsPage} from "../pages/contact-us/contact-us";
import {BankPage} from "../pages/bank/bank";
import {MapPage} from "../pages/map/map";
import {MapDetailPage} from "../pages/map-detail/map-detail";
import {VendorRegisterPage} from "../pages/vendor-register/vendor-register";
import {ProfilePage} from "../pages/profile/profile";
import {ProfileEditPage} from "../pages/profile-edit/profile-edit";
// end import pages

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        CartPage,
        CategoriesPage,
        CategoryPage,
        CategoryProductPage,
        ChangePasswordPage,
        CurrencyConverterPage,
        ForgotPasswordPage,
        HomePage,
        ItemPage,
        LoginPage,
        ModalFilterPage,
        ModalItemOptionPage,
        MyAccountPage,
        MyOrderPage,
        OrderConfirmPage,
        RegisterPage,
        SearchPage,
        SearchResultPage,
        SettingsPage,
        StorePage,
        TabAttributePage,
        TabFilterPage,
        WelcomePage,
        WishListPage,
        VideoPage,
        VideoDetailPage,
        ContactUsPage,
        MapPage,
        MapDetailPage,
        VendorRegisterPage,
        BankPage,
        ProfilePage,
        ProfileEditPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        DxFileUploaderModule,
        DxSwitchModule,
        DxNumberBoxModule,
        DxValidationGroupModule,
        DxPopupModule,
        ionicGalleryModal.GalleryModalModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CartPage,
        CategoriesPage,
        CategoryPage,
        CategoryProductPage,
        ChangePasswordPage,
        CurrencyConverterPage,
        ForgotPasswordPage,
        HomePage,
        ItemPage,
        LoginPage,
        ModalFilterPage,
        ModalItemOptionPage,
        MyAccountPage,
        MyOrderPage,
        OrderConfirmPage,
        RegisterPage,
        SearchPage,
        SearchResultPage,
        SettingsPage,
        StorePage,
        TabAttributePage,
        TabFilterPage,
        WelcomePage,
        WishListPage,
        VideoPage,
        VideoDetailPage,
        ContactUsPage,
        MapPage,
        MapDetailPage,
        VendorRegisterPage,
        BankPage,
        ProfilePage,
        ProfileEditPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CategoryService,
        ItemService,
        UserService,
        StoreService,
        CartService,
        OrderService,
        NewsService,
        Service,
        SharedService,
        Clipboard,
        GoogleMaps,
        YoutubeVideoPlayer,
        ScreenOrientation,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: ionicGalleryModal.GalleryModalHammerConfig,
        },
        {provide: ErrorHandler, useClass: IonicErrorHandler}
        /* import services */
    ]
})
export class AppModule {
}
