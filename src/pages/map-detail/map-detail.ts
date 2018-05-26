import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {
    // GoogleMaps,
    GoogleMap,
    // GoogleMapsEvent,
    // GoogleMapOptions,
    // CameraPosition,
    // MarkerOptions,
    // Marker
} from '@ionic-native/google-maps';
import {SharedService} from "../../providers/shared.service";
import {Service} from "../../providers/service";

declare var google: any;

/**
 * Generated class for the MapDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-map-detail',
    templateUrl: 'map-detail.html',
})
export class MapDetailPage {

    @ViewChild('mapCanvas') mapElement: ElementRef;
    map: GoogleMap;
    title = '';
    url = '';
    lat = 0;
    lng = 0;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public shareService: SharedService,
                public apiService: Service,
                // private googleMaps: GoogleMaps
    ) {
        this.title = this.shareService.lang == 'th' ? this.navParams.get('title_th'):this.navParams.get('title_en');
        this.url = this.navParams.get('url');
        this.lat = +this.navParams.get('lat');
        this.lng = +this.navParams.get('long');
        setTimeout(()=>{
            this.loadMap2();
        }, 200);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapDetailPage');
        // this.loadMap();
        // this.loadMap2();

    }

    loadMap2() {
        let c = this;
        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 15,
            language: 'th',
            center: {lat: c.lat, lng: c.lng}
        });

        let beachMarker = new google.maps.Marker({
            position: {lat: c.lat, lng: c.lng},
            map: c.map,
            animation: 'DROP',
            icon: 'assets/ico/gmap-place-50x75.png'
        });
        beachMarker.addListener('click', function() {

            console.log('click map')
            c.apiService.fnGoWebSite(c.url)
        });
    }

    loadMap() {
/*
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas');

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');

                // Now you can use all methods safely.
                // this.map.addMarker({
                //     title: 'Ionic',
                //     icon: 'blue',
                //     animation: 'DROP',
                //     position: {
                //         lat: 43.0741904,
                //         lng: -89.3809802
                //     }
                // })
                //     .then(marker => {
                //         marker.on(GoogleMapsEvent.MARKER_CLICK)
                //             .subscribe(() => {
                //                 alert('clicked');
                //             });
                //     });

            });*/
    }
}
