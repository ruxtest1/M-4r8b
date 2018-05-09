import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule, Http} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';
import {Clipboard} from '@ionic-native/clipboard';
import {GoogleMaps} from '@ionic-native/google-maps';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {Service} from '../providers/service';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {CategoryPage} from '../pages/category/category';
import {VipLoginPage} from '../pages/vip-login/vip-login';
import {VideoPage} from '../pages/video/video';
import {VideoDetailPage} from '../pages/video-detail/video-detail';
import {VendorRegisterPage} from '../pages/vendor-register/vendor-register';
import {BankPage} from '../pages/bank/bank';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {MapPage} from '../pages/map/map';

import {DxTextBoxModule} from 'devextreme-angular/ui/text-box';
import {DxValidatorModule} from 'devextreme-angular/ui/validator';
import {DxValidationGroupModule} from 'devextreme-angular/ui/validation-group';
import {DxNumberBoxModule} from 'devextreme-angular/ui/number-box';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {DxRadioGroupModule} from 'devextreme-angular/ui/radio-group';
import {DxPopupModule} from 'devextreme-angular/ui/popup';
import {DxCheckBoxModule} from 'devextreme-angular/ui/check-box';

import {IonicImageViewerModule} from 'ionic-img-viewer';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SharedService} from "../providers/shared.service";
import {VendorProfilePage} from "../pages/vendor-profile/vendor-profile";
import {CategorySubPage} from "../pages/category-sub/category-sub";
import {CategoryProductPage} from "../pages/category-product/category-product";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {ProductConfirmPage} from "../pages/product-confirm/product-confirm";
import {ProductCartPage} from "../pages/product-cart/product-cart";
import {ProductSelectOptionPage} from "../pages/product-select-option/product-select-option";
import {ProductSearchPage} from "../pages/product-search/product-search";
import {VipForgetPassPage} from "../pages/vip-forgetpass/vip-forgetpass";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        CategoryPage,
        CategorySubPage,
        CategoryProductPage,
        ProductDetailPage,
        ProductConfirmPage,
        ProductCartPage,
        ProductSelectOptionPage,
        ProductSearchPage,
        VipLoginPage,
        VipForgetPassPage,
        VendorProfilePage,
        VideoPage,
        VideoDetailPage,
        VendorRegisterPage,
        BankPage,
        ContactUsPage,
        MapPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,

        // Import DX
        DxTextBoxModule,
        DxValidatorModule,
        DxValidationGroupModule,
        IonicImageViewerModule,
        DxNumberBoxModule,
        DxSelectBoxModule,
        DxRadioGroupModule,
        DxPopupModule,
        DxCheckBoxModule,

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
        HomePage,
        ListPage,
        CategoryPage,
        CategorySubPage,
        CategoryProductPage,
        ProductDetailPage,
        ProductConfirmPage,
        ProductCartPage,
        ProductSelectOptionPage,
        ProductSearchPage,
        VipLoginPage,
        VipForgetPassPage,
        VendorProfilePage,
        VideoPage,
        VideoDetailPage,
        VendorRegisterPage,
        BankPage,
        ContactUsPage,
        MapPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Service,
        SharedService,
        Clipboard,
        GoogleMaps,
        YoutubeVideoPlayer,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
