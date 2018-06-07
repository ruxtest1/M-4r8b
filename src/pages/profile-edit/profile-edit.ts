import {Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {SharedService} from "../../providers/shared.service";
import {Service} from "../../providers/service";
import {DEFAULT} from "../../app/app.constant";
import {HomePage} from "../home/home";

/**
 * Generated class for the VendorRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-profile-edit',
    templateUrl: 'profile-edit.html',
    // directives: [FORM_DIRECTIVES]
})
export class ProfileEditPage {
    api = DEFAULT.config;
    public lang = 'th';

    registerData: FormGroup;
    registerDataEN: FormGroup;
    formErrors = {
        'name_th': '',
        'name_en': '',
        'email': '',
        'password': '',
        'phone': '',
        'image_card_no_path': '',
        'image_front_store_path': '',
    };
    validationMessages = {
        'name_th': {
            'required': 'กรุณากรอก ชื่อ-นามสกุล',
            'minlength': 'ชื่อต้องมีความยาวมากกว่า 3 ตัวอักษร',
        },
        'email': {
            'required': 'กรุณากรอก อีเมล',
            'email': 'รูปแบบอีเมลไม่ถูกต้อง'
        },
        'password': {
            'required': 'กรุณากรอก รหัสผ่าน',
            'minlength': 'รหัสผ่านต้องมีความยาวมากกว่า 3 ตัว',
        },
        'phone': {
            'required': 'กรุณากรอกเบอร์โทร'
        },
        'image_card_no_path': {
            'required': 'กรุณาเลือกรูปบัตรประชาชน'
        },
        'image_front_store_path': {
            'required': 'กรุณาเลือกรูปหน้าร้าน'
        }
    };
    userData = null;
    vendor_id = null;
    profile_image = '';
    image_card_no_path = '';
    image_front_store_path = [];
    file_certificate = [];
    urlUpload: any = '';
    urlUploadFile: any = '';
    disableBtn = false;
    startValidate = false;
    arr_delete_file = [];


    powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

    hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

    heroForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public shareService: SharedService,
                public events: Events,
                public sv: Service,
                public formBuilder: FormBuilder) {
        this.lang = this.shareService.lang;
        if (this.lang !== 'th') {
            this.validationMessages = {
                'name_th': {
                    'required': 'Name is required.',
                    'minlength': 'Name must be at least 3 characters long.',
                },
                'email': {
                    'required': 'Email is required.',
                    'email': 'Email is not valid'
                },
                'password': {
                    'required': 'Password is required.',
                    'minlength': 'Password must be at least 3 characters long.',
                },
                'phone': {
                    'required': 'Phone is required.'
                },
                'image_card_no_path': {
                    'required': 'Please select image card id no.'
                },
                'image_front_store_path': {
                    'required': 'Please select image front store.'
                },
            };
        }

        (async () => {
            this.urlUpload = await this.sv.fnBuildAPIUrl(this.api.vendor.image.upload);
            this.urlUploadFile = await this.sv.fnBuildAPIUrl(this.api.vendor.file.upload);
        })();
    }

    async ngOnInit() {
        this.buildForm(this.lang);
        this.fnSetData(this.lang);
    }

    async fnSetData(lang) {
        const userData = await this.sv.getUserData();
        const vendorData = userData.vendor;
        this.userData = userData;
        console.log(userData)
        this.profile_image = vendorData.profile_image;
        this.image_card_no_path = vendorData.image_card_no_path;
        this.file_certificate = this.fnCheckJson(vendorData.file_certificate);
        this.image_front_store_path = this.fnCheckJson(vendorData.image_front_store_path);
        this.vendor_id = vendorData.id;
        this.registerData.setValue({
            profile_image: vendorData.profile_image,
            company_name_th: vendorData.company_name_th,
            company_name_en: vendorData.company_name_en,
            name_th: vendorData.name_th,
            name_en: vendorData.name_en,
            line_id: vendorData.line_id,
            phone: vendorData.phone,
            email: vendorData.email,
            address_th: vendorData.address_th,
            address_en: vendorData.address_en,
            city_th: vendorData.city_th,
            city_en: vendorData.city_en,
            file_certificate: this.file_certificate,
            image_card_no_path: vendorData.image_card_no_path,
            image_front_store_path: this.image_front_store_path,
        });
    }

    buildForm(lang: any): void {
        this.registerData = this.formBuilder.group({
            'profile_image': [''],
            'company_name_th': [''],
            'company_name_en': [''],
            'name_th': lang === 'th' ? ['', [Validators.required, Validators.minLength(4)]] : [''],
            'name_en': lang === 'th' ? [''] : ['', [Validators.required, Validators.minLength(4)]],
            'phone': ['', [Validators.required]],
            'line_id': [''],
            'email': ['', [Validators.required, Validators.email]],
            // 'password': ['', [Validators.required]],
            'address_th': [''],
            'address_en': [''],
            'city_th': [''],
            'city_en': [''],
            'file_certificate': [''],
            'image_card_no_path': [''],
            'image_front_store_path': [''],
        });
        this.registerData.valueChanges.subscribe(data => this.onValueChanged(this.registerData.controls));
        // this.onValueChanged();
        // } else {
        //     this.registerDataEN = this.formBuilder.group({
        //         'profile_image': [''],
        //         'company_name_en': [''],
        //         'name_en': ['', [Validators.required, Validators.minLength(4)]],
        //         'phone': ['', [Validators.required]],
        //         'line_id': [''],
        //         'email': ['', [Validators.required, Validators.email]],
        //         // 'password': ['', [Validators.required]],
        //         'address_en': [''],
        //         'city_en': [''],
        //         'file_certificate': [''],
        //         'image_card_no_path': [''],
        //         'image_front_store_path': [''],
        //     });
        //     this.registerDataEN.valueChanges.subscribe(data => this.onValueChanged(this.registerDataEN.controls));
        //     // this.onValueChanged();
        // }
        // this.registerData = new FormGroup({
        //     'name': new FormControl(this.hero.name, [
        //         Validators.required,
        //         Validators.minLength(4),
        //         forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //     ]),
        //     'alterEgo': new FormControl(this.hero.alterEgo),
        //     'power': new FormControl(this.hero.power, Validators.required)
        // });
        const c = this;
        setTimeout(() => {
            c.startValidate = true;
        }, 100);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VendorRegisterPage');
    }

    fnCheckJson(data) {
        if (!this.sv.checkData(data)) {
            return [];
        }
        if (typeof data === 'object') {
            return data;
        }
        return this.sv.fnStr2Json(data);
    }

    async fnSaveData(data) {
        try {
            data.id = this.vendor_id;
            data.delete_file = this.arr_delete_file;

            let res = await this.sv.put(this.api.vendor.edit_profile, data);
            console.log('res:', res);
            this.userData.vendor = res;

            await this.sv.setUserData(this.userData);

            this.sv.showSuccessTranslate('SAVE_DATA_SUCCESS');
            return true;
        } catch (err) {
            console.log(err);
            this.sv.showErrorTranslate('SAVE_DATA_FAIL');
            return false;
        }
    }

    fnValidateImg() {
        let inValid = false;
        const cardIDNo = this.image_card_no_path;
        const imgFront = this.image_front_store_path.length;
        if (!cardIDNo) {
            this.formErrors.image_card_no_path = this.validationMessages.image_card_no_path.required;
            inValid = true;
        } else {
            this.formErrors.image_card_no_path = '';
        }
        if (!imgFront) {
            this.formErrors.image_front_store_path = this.validationMessages.image_front_store_path.required;
            inValid = true;
        } else {
            this.formErrors.image_front_store_path = '';
        }
        return inValid;
    }

    async fnSendData(form: any) {
        this.onValueChanged(form.control.controls);
        console.log(form.control)
        const invalidImg = this.fnValidateImg();
        if (form.invalid || invalidImg) {
            this.sv.showErrorTranslate('PLEASE_CHECK_INPUT');
        } else {
            let data = form.control.value;
            let res = await this.fnSaveData(data);
            if (res) {
                this.events.publish('reloadDetails');
                this.navCtrl.pop();
            }
        }
    }

    // isValid(field: string) {
    //   let formField = this.registerData.find(field);
    //   return formField.valid || formField.pristine;
    // }

    onValueChanged(data?: any) {
        console.log('data:', data)
        // const form = this.lang === 'th' ? this.registerData: this.registerDataEN;
        //   console.log('form:', form)
        console.log('startValidate:', this.startValidate)
        if (!data || !this.startValidate) {
            return;
        }
        // if (!form) {
        //   return;
        // }
        // if (form.pristine) {
        //   return;
        // }
        // if (!form.dirty) {
        //   return;
        // }
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = data[field];
            if (control /*&& form.dirty && !form.valid*/) {
                const messages = this.validationMessages[field];
                let err = [];
                for (const key in control.errors) {
                    err.push(messages[key]);
                }
                this.formErrors[field] = err.join(', ')
            }
        }
    }

    nameValidator(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
            return {invalidName: true};
        }
    }

    phoneValidator(control: FormControl): { [s: string]: boolean } {
        if (control.value !== '') {
            if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
                return {invalidPhone: true};
            }
        }
    }

    emailValidator(control: FormControl): { [s: string]: boolean } {
        if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
            return {invalidEmail: true};
        }
    }

    get name() {
        return this.heroForm.get('name');
    }

    get power() {
        return this.heroForm.get('power');
    }

    fnDisableBtn(e) {
        console.log('start upload:', e)
        this.disableBtn = true;
    }

    uploadImgError(e) {
        console.log('upload err:', e)
        this.disableBtn = false;
        console.log(e);
    }

    fnUploadProfileImg(e) {
        const res = JSON.parse(e.request.response).google;
        console.log('upload success:', e)
        this.disableBtn = false;
        // const img = this.sv.fnGetImgUrl(e, this.api.vendor.image.view);
        if (this.profile_image) {
            this.arr_delete_file.push(this.profile_image);
        }
        this.profile_image = res.path;
        this.sv.showSuccessTranslate('UPLOAD_IMAGE_SUCCESS');
        // this.fnValidateImg();
    }

    fnUploadCardNo(e) {
        const res = JSON.parse(e.request.response).google;
        console.log('upload success:', e)
        this.disableBtn = false;
        // const img = this.sv.fnGetImgUrl(e, this.api.vendor.image.view);
        this.image_card_no_path = res.path;
        this.sv.showSuccessTranslate('UPLOAD_IMAGE_SUCCESS');
        this.fnValidateImg();
    }

    async uploadFileCertificate(e) {
        const res = JSON.parse(e.request.response).google;
        this.disableBtn = false;
        // const img = this.sv.fnGetImgUrl(e, this.api.vendor.file.view);
        this.file_certificate.push({
            name: res.name,
            path: res.path,
            order: 999,
        });
        this.sv.showSuccessTranslate('UPLOAD_FILE_SUCCESS');
    }

    async uploadFileFrontStore(e) {
        const res = JSON.parse(e.request.response).google;
        this.disableBtn = false;
        // const img = this.sv.fnGetImgUrl(e, this.api.vendor.file.view);
        this.image_front_store_path.push({
            name: res.name,
            path: res.path,
            order: 999,
        });
        this.sv.showSuccessTranslate('UPLOAD_FILE_SUCCESS');
        this.fnValidateImg();
    }
}
