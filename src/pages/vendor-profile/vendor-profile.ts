import {Component, OnInit, ViewChild} from '@angular/core';
import {DxValidationGroupComponent} from 'devextreme-angular/ui/validation-group';
import {NavController, NavParams} from 'ionic-angular';
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";
import {SharedService} from "../../providers/shared.service";

/**
 * Generated class for the VendorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-profile',
  templateUrl: 'vendor-profile.html',
})
export class VendorProfilePage implements OnInit {
  api = DEFAULT.config;
  profileData = {
    id: '',
    password: ''
  };

  isEdit = false;

  @ViewChild('val1') validationGroup1: DxValidationGroupComponent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiService: Service,
              public shareService: SharedService,) {
  }

  async ngOnInit() {
    const userData = await this.apiService.getUserData();
    console.log(userData)
    // this.profileData = userData;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VendorProfilePage');
  }

  async fnLogin() {
    // const result: any = this.validationGroup1.instance.validate();
    // if (result.isValid) {
    //   try {
    //     const res = await this.apiService.fnLogin(this.api.userApi.login, this.loginData);
    //     let data = res.data;
    //     console.log(data);
    //     if (data.is_vendor) {
    //       await this.apiService.setStorage(this.apiService.userDataKey, data);
    //       this.shareService.userData = data;
    //       this.apiService.showSuccess('เข้าสู่ระบบสำเร็จ');
    //     } else {
    //       this.apiService.showSuccess('คุณไม่ได้รับสิทธ์ในการเข้าใข้งาน');
    //     }
    //
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   this.apiService.showError('กรุณากรอกข้อมูลให้ถูกต้อง');
    // }
  }

  fnLogout() {

  }
}
