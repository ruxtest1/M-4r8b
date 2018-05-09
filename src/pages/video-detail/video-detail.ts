import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the VideoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {

  urlVideo;
  title;
  v_id;
  description;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private sanitizer: DomSanitizer) {
    this.title = this.navParams.get('title');
    this.description = this.navParams.get('description');
    this.v_id = this.navParams.get('v_id');
    let url = this.navParams.get('url');
    this.fnSetUrlVideo(url);

    console.log(this.description);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoDetailPage');
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  fnSetUrlVideo(url) {
    this.urlVideo = this.transform(url);
  }

}
