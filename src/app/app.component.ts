import {Component, ViewChild, OnInit} from '@angular/core';
import {Nav, Platform, Config} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {TranslateService} from '@ngx-translate/core'
import {SharedService} from "../providers/shared.service";
import {Service} from "../providers/service";
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  public loadingVisible = false;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(private translate: TranslateService,
              public platform: Platform,
              public statusBar: StatusBar,
              private config: Config,
              public apiService: Service,
              public splashScreen: SplashScreen,
              public service: SharedService,
              private screenOrientation: ScreenOrientation,
  ) {
    this.service.setCallbackShowLoading(this.fnShowLoading.bind(this));
    this.service.setCallbackHideLoading(this.fnHideLoading.bind(this));

    this.initializeApp();
    this.initTranslate();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage}
    ];

  }

  async ngOnInit() {
    // this.service.userData = await this.apiService.getUserData();
  }

  initializeApp() {
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public fnShowLoading() {
    this.loadingVisible = true;
  }

  public fnHideLoading() {
    this.loadingVisible = false;
  }
}
