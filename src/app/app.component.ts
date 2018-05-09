import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

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
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },

    {
      title: 'Categories',
      icon: 'ios-list-box-outline',
      count: 0,
      component: CategoriesPage
    },

    {
      title: 'WishList',
      icon: 'md-heart-outline',
      count: 2,
      component: WishListPage
    },

    {
      title: 'My Order',
      icon: 'ios-timer-outline',
      count: 0,
      component: MyOrderPage
    },

    {
      title: 'My Account',
      icon: 'ios-contact-outline',
      count: 0,
      component: MyAccountPage
    },

    {
      title: 'Cart',
      icon: 'ios-cart-outline',
      count: 1,
      component: CartPage
    },

    {
      title: 'Settings',
      icon: 'ios-settings-outline',
      count: 0,
      component: SettingsPage
    },

    {
      title: 'Logout',
      icon: 'log-out',
      count: 0,
      component: LoginPage
    },
    // import menu
  ];

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = WelcomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


