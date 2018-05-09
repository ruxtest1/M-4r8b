import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {YoutubeVideoPlayer} from '@ionic-native/youtube-video-player';

import {VideoDetailPage} from '../video-detail/video-detail';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers: [YoutubeVideoPlayer]
})
export class VideoPage {
  youtube_list = [
    {
      title: "test Youtube1",
      url: "http://www.youtube.com/embed/a6KGPBflhiM",
      v_id: "a6KGPBflhiM",
      thumbnail_id: "1",
      description: "asdf efe d1121141",
    },
    {
      title: "test Youtube2",
      url: "http://www.youtube.com/embed/a6KGPBflhiM",
      v_id: "a6KGPBflhiM",
      thumbnail_id: "2",
      description: "2 asfa asfd asfd",
    }
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private youtube: YoutubeVideoPlayer,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');

  }

  fnGetThumbnailUrl(v_id: string, idx: any) {
    let url = "https://img.youtube.com/vi/" + v_id + "/" + idx + ".jpg";
    return url;
  }

  openVideo1() {
    console.log('play')
    this.youtube.openVideo('Ur9jjfrWLdw');
  }

  goToDetail(data: any) {
    this.navCtrl.push(VideoDetailPage, data);
  }
}
