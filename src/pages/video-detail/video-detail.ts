import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {DomSanitizer} from '@angular/platform-browser';
import {Service} from "../../providers/service";
import {SharedService} from "../../providers/shared.service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,
              private sanitizer: DomSanitizer) {
    this.title = this.shareService.lang == 'th' ? this.navParams.get('title_th'):this.navParams.get('title_en');
    this.description = this.shareService.lang == 'th' ? this.navParams.get('detail_th'):this.navParams.get('detail_en');
    this.v_id = this.navParams.get('video_id');
    let url = 'http://www.youtube.com/embed/' + this.v_id;
    // let url = 'http://www.youtube.com/embed/' + this.navParams.get('url');
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
