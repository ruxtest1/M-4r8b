import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {DEFAULT} from '../app/app.constant';
import notify from 'devextreme/ui/notify';
import * as moment from 'moment';
import * as $ from 'jquery';
import {Storage} from '@ionic/storage';
import {AlertController, ToastController} from 'ionic-angular';
import {Clipboard} from '@ionic-native/clipboard';
import {TranslateService} from '@ngx-translate/core';

// import {App} from "ionic-angular/index";
// import {CryptoJS} from "crypto-js";
import * as CryptoJS from 'crypto-js';
import {SharedService} from "./shared.service";
// import {CryptoJS} from '../../node_modules/crypto-js';
// import {LoginPage} from '../pages/login/login';

// import {globAll} from "@ionic/app-scripts/dist/util/glob-util";
import swal from 'sweetalert2';

/*
 Generated class for the AppProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Service {
    private headers = new Headers({'Content-type': 'application/json'});
    dateStart = moment().format('MM/DD/YYYY');
    public userDataKey = 'userData';
    public langKey = 'lang_key';
    public cartKey = 'cart_key';
    public searchHistoryKey = 'search_history_key';
    public rememberKey = 'remember_data';
    public loading;
    public password: string = null;
    public config = DEFAULT.config;
    timeOutLoading = null;

    // private this.cryptoJS: any = null;
    private SK_afaeasdfs: string = 'gikiyddyo';


    constructor(public http: Http,
                private storage: Storage,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                // public loadingCtrl: LoadingController,
                // private app: App,
                private clipboard: Clipboard,
                public translate: TranslateService,
                private sharedService: SharedService,
                // private CryptoJS : CryptoJS
    ) {
        // console.log('Hello AppProvider Provider');
    }

    async handleError(error: any, app: any): Promise<any> {
        this.closeLoading();
        // console.error('An error occurred', error); // for demo purposes only
        // try {
        //   let objErr = error.json();
        //   console.log(objErr);
        //   if (objErr.error) {
        //     if (objErr.error.statusCode == '401') {
        //       // await this.userLogOut();
        //       this.fnGoLogin();
        //       this.showError('ขออภัยกรุณา Login ใหม่');
        //       // return 'AUTHORIZATION_REQUIRED'
        //     }
        //   }
        // } catch (err) {
        //   console.log(error); // for demo purposes only
        // }
        // return Promise.reject(error.message || error);

        try {
            const errJ = error.json();
            if (errJ.error.code === 'AUTHORIZATION_REQUIRED') {
                // this.logoutUser();
                // this.router.navigate(['/login']);
                this.showErrorTranslate('AUTHORIZATION_REQUIRED');
                return Promise.reject(error.message || error);
            } else {
            }
        } catch (err) {

        }
        console.error('An error occurred: ', error); // for demo purposes only
        console.log(typeof error);
        if (typeof error === 'string') {
            // this.showError(error);
            this.showErrorTranslate(error);
        } else {
            // this.showError(error.message || '');
            if (error.code) {
                this.showErrorTranslate(error.code, error);
            } else {
                this.showErrorTranslate(error.message || '');
            }
        }
        return Promise.reject(error);
    }

    async fnConfirmDelete(fnCall, msg?) {
        let cancel: any,
            yes: any,
            title: any,
            text: any;
        const fnGetMsg = async () => {
            cancel = await this.fnGetTranslate('CANCEL') + '';
            yes = await this.fnGetTranslate('YES') + '';
            title = await this.fnGetTranslate('CONFIRM_DELETE') + '';
            text = await this.fnGetTranslate('DO_YOU_WANT_DELETE_DATA') + '';
        };
        await fnGetMsg();
        swal({
            title: msg || text,
            text: title,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false,
            confirmButtonText: yes,
            cancelButtonText: cancel
        }).then(function (res) {
            if (res.value) {
                fnCall();
            }
        })
    }

    showLoading() {
        // this.loading = this.loadingCtrl.create({
        //   content: 'กำลังโหลด...'
        // });
        // this.loading.present();

        // setTimeout(() => {
        //   this.loading.dismiss();
        // }, 10000);
        if (this.timeOutLoading) {
            clearTimeout(this.timeOutLoading);
        }
        this.sharedService.showLoading()();
        this.timeOutLoading = setTimeout(() => {
            this.closeLoading();
        }, 30000);
    }

    closeLoading() {
        if (this.timeOutLoading) {
            clearTimeout(this.timeOutLoading);
        }
        // this.loading.dismiss();
        this.sharedService.hideLoading()();
    }


    errMsg(text, title?) {
        title = title || 'เกิดข้อผิดพลาด';
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['ตกลง']
        });
        alert.present();
    }

    async showErrorTranslate(t, value?: any) {
        let msg = t;
        if (t.indexOf('_') > -1) {
            msg = await this.fnGetTranslate(t, value);
        }
        this.showError(msg);
    }

    showError(validateOrMsg) {
        console.log(validateOrMsg);
        let msg = 'เกิดข้อผิดพลาด';
        if (this.checkData(validateOrMsg)) {
            if (typeof validateOrMsg === 'object') {
                const arrMsg = [];
                // for (let i in validateOrMsg.brokenRules) {
                //   const m = validateOrMsg.brokenRules[i].message;
                //
                //   if (!arrMsg.includes(m)) {
                //     arrMsg.push(m);
                //   }
                // }
                msg = arrMsg.join(', ');
            } else {
                msg = validateOrMsg;
            }
        }
        notify(msg, 'error', 6000);
    }

    async showSuccessTranslate(t) {
        const msg = await this.fnGetTranslate(t);
        this.showSuccess(msg);
    }

    showSuccess(validateOrMsg) {
        console.log(validateOrMsg);
        let msg = 'success';
        if (this.checkData(validateOrMsg)) {
            if (typeof validateOrMsg === 'object') {
                // const arrMsg = [];
                // for (let i in validateOrMsg.brokenRules) {
                //   const m = validateOrMsg.brokenRules[i].message;
                //
                //   if (!arrMsg.includes(m)) {
                //     arrMsg.push(m);
                //   }
                // }
                // msg = arrMsg.join(', ');
            } else {
                msg = validateOrMsg;
            }
        }
        notify(msg, 'success', 4000);
    }

    async fnBuildAPIUrl(url: string, objQuery?: any, token?) {
        if (typeof objQuery !== 'object') {
            objQuery = {};
        }
        if (token !== false) {
            const userData = await this.getUserData();
            if (this.checkData(userData)) {
                objQuery.access_token = userData['access_token'];
            }
        }
        return this.config.protocol + this.config.host + ':' + this.config.port + url +
            (this.checkData(objQuery) ? '?' + $.param(objQuery) : '');
    }

    fnGetPathImgThumb (path:any) {
        const parts = path.split('.'),
            extension = parts[parts.length - 1];
        const origName = parts[parts.length - 2];
        return origName + '-thumbnail.' + extension;
    };

    fnBuildImg(data: object, name: string, full?:any) {
        let path = data[name];
        // if (this.checkData(data[name + '_thumbnail'])) {
        //     path = data[name + '_thumbnail'];
        // }
        // return this.fnBuildImgUrl(path);

        if (path) {
            const gUrl = 'https://storage.googleapis.com/marukyo-api/';
            let url = path.replace(gUrl, '');
            if (full !== true) {
                url = this.fnGetPathImgThumb(url);
            }
            return gUrl + url;
        } else {
            return 'assets/img/icon-no-image.png';
        }
    }

    fnBuildImgUrl(path) {
        if (this.checkData(path)) {
            return this.config.protocol + this.config.host + ':' + this.config.port + path;
        } else {
            return 'assets/img/icon-no-image.png';
        }
    }

    showInfo(msg) {
        notify(msg, 'info', 2500);
    }

    // get
    async get(url: string, objQuery?, loading?) {
        // const config = DEFAULT.config;
        if (typeof objQuery != 'object') {
            objQuery = {};
        }
        if (this.checkData(objQuery.id)) {
            url = url.replace(':id', objQuery.id + '');
        }
        url = await this.fnGetUrlAPI(url, objQuery);
        console.log('url get:', url);
        let app = this;
        if (loading !== false) {
            this.showLoading();
        }
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return app.fnCheckResponse(response.json());
            })
            .catch(function (err) {
                return app.handleError(err, app);
            });
    }

    async fnGetUrlAPI(url?, objQuery?: any) {
        // const config = DEFAULT.config;
        const userData = await this.getUserData();
        if (!objQuery || typeof objQuery != 'object') {
            objQuery = {};
        }
        objQuery.lang = this.sharedService.lang;
        if (this.checkData(userData)) {
            if (this.checkData(userData['access_token'])) {
                objQuery.access_token = userData['access_token'];
                // objQuery.user_name = userData.user_name;
                // objQuery.user_id = userData.id;
            }
        }
        url = url ? this.config.protocol + this.config.host + ':' + this.config.port + url :
            this.config.protocol + this.config.host + ':' + this.config.port;
        console.log(url)
        if (this.checkData(objQuery)) {
            url += "?" + $.param(objQuery);
        }
        return url;
    }

    async post(url, data, objQuery?) {
        url = await this.fnGetUrlAPI(url, objQuery);
        if (this.checkData(data)) {
            try {
                delete data.id;
                delete data.created_at;
                delete data.updated_at;
                delete data.deleted_at;
            } catch (err) {
                console.log('err:');
                console.log(err);
            }
        }
        console.log('POST url:', url);
        console.log('POST DATA : ' + JSON.stringify(data));
        const api = this;
        this.showLoading();
        return this.http.post(url, data, {headers: this.headers})
            .toPromise()
            .then(response => {
                this.closeLoading();
                const res = response.json();
                return api.checkResponse(res);
            })
            .catch(err => {
                this.closeLoading();
                return api.handleError(err, api);
            });
    }

    async put(url: string, data: any) {
        const config = DEFAULT.config;
        const userData = await this.getUserData();
        const access_token = '?access_token=' + userData.id;//'?access_token=zfXQFlQ6EYlgJulTzcvXNGrQwcsNduZefvWGNmfp7YnMcOqrs3n073MfNC3nUfrO';
        // data.account_id = userData.user.account_id; // TODO: แก้ให้ดึงจาก Cookie
        const strData = JSON.stringify(data);
        url = config.protocol + config.host + ':' + config.port + url + access_token;
        url = url.replace(':id', data.id);
        // url = url.replace(':account_id', userData.user.account_id);
        console.log('PUT ' + url);
        console.log('PUT DATA : ' + strData);
        let app = this;
        this.showLoading();
        return this.http.put(url, strData, {headers: this.headers})
            .toPromise()
            .then(response => {
                console.log(response);
                return app.fnCheckResponse(response.json(), 'edit');
            })
            .catch(function (err) {
                return app.handleError(err, app);
            });
    }

    async delete(url, id, objQuery?) {
        const config = DEFAULT.config;
        const userData = await this.getUserData();
        if (typeof objQuery != 'object') {
            objQuery = {};
        }
        objQuery.access_token = userData.id;
        url = config.protocol + config.host + ':' + config.port + url + '?' + $.param(objQuery);
        url = url.replace(':id', id);
        url = url.replace(':announce_id', id);
        url = url.replace(':property_type_id', id);
        // url = url.replace(':account_id', userData.user.account_id);
        console.log('Delete url:' + url);
        let app = this;
        this.showLoading();
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(response => {
                console.log(response);
                return app.fnCheckResponse(response.json(), 'delete');
            })
            .catch(function (err) {
                return app.handleError(err, app);
            });
    }


    async fnLogin(url, data, objQuery?) {
        url = await this.fnGetUrlAPI(url, objQuery);
        console.log('POST ' + url);
        console.log('POST DATA : ' + JSON.stringify(data));
        const api = this;
        this.showLoading();
        return this.http.post(url, data, {headers: this.headers})
            .toPromise()
            .then(response => {
                this.closeLoading();
                const res = response.json();
                console.log(res);
                return api.checkResponse(res);
            })
            .catch(err => {
                this.closeLoading();
                return api.handleError(err, api);
            });
    }

    checkResponse(res: any) {
        if (this.checkData(res)) {
            if (this.checkData(res.resultCode)) {
                switch (res.resultCode) {
                    case '40401':
                    case '50000':
                        throw res.resultDescription;
                    case '20000':
                        return res;
                }
            }
        }
        return res;
    }

    async fnCheckResponse(data, type?) {
        this.closeLoading();
        try {
            let resultCode = data.resultCode;
            switch (resultCode) {
                case '20000':
                    if (type === 'add' || type === 'edit' || type === 'delete') {
                        this.presentToast();
                    }
                    return data.data;
                default:
                    this.showError(data.resultDescription);
                    return null;
            }
        } catch (err) {
            this.showError(err.message);
            return null;
        }
    }

    dateNow(date?) {
        if (this.checkData(date)) {
            return moment(date);
        } else {
            return moment();
        }
    }

    postWithOutAccountId(url, data) {
        const config = DEFAULT.config;
        url = config.protocol + config.host + ':' + config.port + url;
        console.log('POST ' + url);
        console.log('POST DATA : ' + JSON.stringify(data));
        let app = this;
        this.showLoading();
        return this.http.post(url, data, {headers: this.headers})
            .toPromise()
            .then(response => {
                console.log(response);
                app.closeLoading();
                return response.json();
            })
            .catch(function (err) {
                return app.handleError(err, app);
            });
        // .then(function (res) {
        // return typeof res.data.data === 'undefined' ? res : $.extend(res, res.data);
    }

    async userLogOut() {
        await this.storage.remove(this.userDataKey);
    }

    async getStorage(key: string) {
        return this.storage.get(key);
    }

    async setStorage(key: string, value: any) {
        await this.storage.set(key, value);
    }

    async deleteStorage(key: string) {
        await this.storage.remove(key);
    }

    async getUserData() {
        // let userData = localStorage.getItem(this.userDataKey);
        try {
            let userData = await this.getStorage(this.userDataKey);
            // console.log('getUserData : ' + JSON.stringify(userData));
            if (this.checkData(userData)) {
                return userData;
            } else {
                return {};
            }
        } catch (e) {
            return {};
        }
    }

    async isLogin() {
        let user = await this.getUserData();
        return this.checkData(user);
    }

    async fnGoLogin() {
        // await this.userLogOut();
        // this.app.getActiveNav().setRoot(LoginPage);
    }

    async getAccountID() {
        let userData = await this.getUserData();
        if (this.checkData(userData)) {
            return userData.user.account_id;
        } else {
            return null;
        }
    };

    checkData(data) {
        //console.log(data);
        // console.log(typeof data);
        let haveData = false;
        const type = typeof data;
        switch (type) {
            case 'object':
                if (data == null || !data) {
                    haveData = false;
                } else if (typeof data[0] !== 'undefined') {
                    haveData = data.length !== 0;
                } else {
                    haveData = Object.keys(data).length ? true : false;
                }
                break;
            case 'string':
                if (data) {
                    haveData = true;
                }
                break;
            case 'number':
                haveData = true;
                break;
            default:
                haveData = false;
                break;
        }
        return haveData;
    }

    convertMonthThaiText(inc) {
        // ปี/เดือนวัน หรือ เดือน/วัน/ปี ก็ได้
        if (inc) {
            let thaiMonth = [
                '',
                'ม.ค.',
                'ก.พ.',
                'มี.ค.',
                'เม.ย.',
                'พ.ค.',
                'มิ.ย.',
                'ก.ค.',
                'ส.ค.',
                'ก.ย.',
                'ต.ค.',
                'พ.ย.',
                'ธ.ค.',

            ];
            let month = moment(inc).format('MM');
            // let year = moment(inc).format('YYYY') + 543;
            let year = moment(inc).format('YYYY');
            return moment(inc).format('DD') + ' ' + thaiMonth[parseInt(month)] + ' ' + year;
        } else {
            return ""
        }

    }

    async returnCode(inc) {
        let resCode = typeof inc.resultCode != 'string' ? inc.resultCode.toString() : inc.resultCode;
        if (resCode == '20000') {
            return true;
        } else {
            this.showError(inc.resultDescription);
            return false;
            // throw new Error(inc.resultDescription);
        }
    }

    presentToast(msg?) {
        msg = msg || "Successfully"
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2500,
            position: 'top',
            cssClass: "success"
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    public fnPasswordDecrypted(ciphertext: any) {
        // Decrypt
        let bytes = CryptoJS.AES.decrypt(ciphertext, this.SK_afaeasdfs);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    public fnPasswordEncrypted(txt: string) {
        // Encrypt
        let ciphertext = CryptoJS.AES.encrypt(txt, this.SK_afaeasdfs);
        return ciphertext.toString();
    }

    fnCopyClipboard(str: any) {
        this.clipboard.copy(str);
        this.translate.get('COPY_CLIPBOARD', {}).subscribe((res: string) => {
            this.showInfo(res);
        });
    }

    fnGetTranslate(key: string, param?: any) {
        param = param || {};
        return new Promise((resolve, reject) => {
            this.translate.get(key, param).subscribe((res: string) => {
                resolve(res);
            });
        })
    }

    async fnAddSearchHistory(data: any) {
        let lists = await this.getStorage(this.searchHistoryKey);
        lists = lists ? lists : [];
        lists = lists.filter(val=>val!=data);
        lists.unshift(data);
        await this.setStorage(this.searchHistoryKey, lists);
        return lists;
    }
    async fnGetSearchHistory() {
        let lists = await this.getStorage(this.searchHistoryKey);
        lists = lists ? lists : [];
        return lists;
    }
    async fnRemoveSearchHistory(idx: any) {
        const lists = await this.getStorage(this.searchHistoryKey);
        let newList = [];
        if (typeof idx === 'number') {
            newList = lists.filter((val, key) => {
                return key !== idx;
            });
        } else {
            newList = lists.filter((val, key) => {
                return idx.indexOf(key) < 0;
            });
        }
        await this.setStorage(this.searchHistoryKey, newList);
        return newList;
    }
    async fnRemoveAllSearch() {
        await this.setStorage(this.searchHistoryKey, []);
        return [];
    }

    async fnAddToCart(product: any) {
        let carts = await this.getStorage(this.cartKey);
        carts = carts ? carts : [];
        carts.push(product);
        await this.setStorage(this.cartKey, carts);
        this.sharedService.count_product = carts.length;
        return carts;
    }

    async fnGetCart() {
        let carts = await this.getStorage(this.cartKey);
        carts = carts ? carts : [];
        return carts;
    }

    async fnRemoveFromCart(idx: any) {
        const carts = await this.getStorage(this.cartKey);
        let newCarts = [];
        if (typeof idx === 'number') {
            newCarts = carts.filter((val, key) => {
                return key !== idx;
            });
        } else {
            newCarts = carts.filter((val, key) => {
                return idx.indexOf(key) < 0;
            });
        }
        await this.setStorage(this.cartKey, newCarts);
        this.sharedService.count_product = newCarts.length;
        return newCarts;
    }

    fnLang(data: object, key: string) {
        let th = data[key + "_th"], en = data[key + "_en"];
        return this.sharedService.lang == 'th' ? th : (en || th);
    }

    fnProductPrice(data: any) {
        const userData = this.sharedService.userData;
        const fnLoopCheckPrice = (star) => {
            for (let i = star; i > 0; i--) {
                if (data['price_star' + star] > 0) {
                    return data['price_star' + star];
                }
            }
            return data.price1;
        };
        if (this.checkData(userData.vendor)) {
            switch (userData.vendor.star) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    return fnLoopCheckPrice(userData.vendor.star);
                default:
                    return data.price1;
            }
        } else {
            return data.price1;
        }
    }

    fnGoWebSite(url: string) {
        window.open(url, '_system', 'location=yes');
    }

    fnGetImgUrl(e: any, path: string) {
         const res = JSON.parse(e.request.response).result.files['files[]'];
        const newFileName = res[0].name || '';
        return {
            url: newFileName ? path.replace(':file_name', newFileName): '',
            name: newFileName
        };
    }

}
