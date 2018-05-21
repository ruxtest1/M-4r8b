import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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
    selector: 'page-vendor-register',
    templateUrl: 'vendor-register.html',
    // directives: [FORM_DIRECTIVES]
})
export class VendorRegisterPage {
    api = DEFAULT.config;
    public lang = 'th';

    registerData: FormGroup;
    registerDataEN: FormGroup;
    formErrors = {
        'name_th': '',
        'name_en': '',
        'email': '',
        'phone': '',
    };
    validationMessages = {
        'name_th': {
            'required': 'กรุณากรอก ชื่อ-นามสกุล',
            'minlength': 'ชื่อต้องมีความยาวมากกว่า 4 ตัวอักษร',
        },
        'email': {
            'required': 'กรุณากรอก อีเมล',
            'email': 'รูปแบบอีเมลไม่ถูกต้อง'
        },
        'phone': {
            'required': 'กรุณากรอกเบอร์โทร'
        }
    };
    file_certificate = [];
    image_card_no_path = '';
    image_front_store_path = [];
    urlUpload: any = '';
    urlUploadFile: any = '';
    disableBtn = false;


    powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

    hero = {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};

    heroForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public shareService: SharedService,
                public apiService: Service,
                public formBuilder: FormBuilder) {
        this.lang = this.shareService.lang;
        if (this.lang !== 'th') {
            this.validationMessages = {
                'name_th': {
                    'required': 'Name is required.',
                    'minlength': 'Name must be at least 4 characters long.',
                },
                'email': {
                    'required': 'Email is required.',
                    'email': 'Email is not valid'
                },
                'phone': {
                    'required': 'Phone is required.'
                },
            };
        }

        (async () => {
            this.urlUpload = await this.apiService.fnBuildAPIUrl(this.api.vendor.image.upload);
            this.urlUploadFile = await this.apiService.fnBuildAPIUrl(this.api.vendor.file.upload);
        })();
    }

    ngOnInit() {
        this.buildForm(this.lang);
    }

    buildForm(lang: any): void {

        if (lang === 'th') {
            this.registerData = this.formBuilder.group({
                'company_name_th': [''],
                'name_th': ['', [Validators.required, Validators.minLength(4)]],
                'phone': ['', [Validators.required]],
                'line_id': [''],
                'email': ['', [Validators.required, Validators.email]],
                'address_th': [''],
                'city_th': [''],
                'file_certificate': [''],
                'image_card_no_path': [''],
                'image_front_store_path': [''],
            });
            this.registerData.valueChanges.subscribe(data => this.onValueChanged(this.registerData.controls));
            // this.onValueChanged();
        } else {
            this.registerDataEN = this.formBuilder.group({
                'company_name_en': [''],
                'name_en': ['', [Validators.required, Validators.minLength(4)]],
                'phone': ['', [Validators.required]],
                'line_id': [''],
                'email': ['', [Validators.required, Validators.email]],
                'address_en': [''],
                'city_en': [''],
                'file_certificate': [''],
                'image_card_no_path': [''],
                'image_front_store_path': [''],
            });
            this.registerDataEN.valueChanges.subscribe(data => this.onValueChanged(this.registerData.controls));
            this.onValueChanged();
        }
        // this.registerData = new FormGroup({
        //     'name': new FormControl(this.hero.name, [
        //         Validators.required,
        //         Validators.minLength(4),
        //         forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //     ]),
        //     'alterEgo': new FormControl(this.hero.alterEgo),
        //     'power': new FormControl(this.hero.power, Validators.required)
        // });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VendorRegisterPage');
    }

    async fnPostData(data) {
        try {
            let res = await this.apiService.post(this.api.vendor.create, data);
            console.log('res:', res);
            this.apiService.showSuccessTranslate('THANK_YOU_FOR_REGISTER');
            return true;

        } catch (err) {
            this.apiService.showErrorTranslate('SAVE_DATA_FAIL');
            return false;
        }
    }

    async fnSendData(form: any) {
        this.onValueChanged(form.control.controls);
        console.log(form.control)
        if (form.invalid) {
            this.apiService.showErrorTranslate('PLEASE_CHECK_INPUT');
        } else {
            let data = form.control.value;
            let res = await this.fnPostData(data);
            if (res) {
                this.navCtrl.setRoot(HomePage);
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
        if (!data) {
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
            if (control /*&& control.dirty && !control.valid*/) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
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

    fnUploadCardNo(e) {
        console.log('upload success:', e)
        this.disableBtn = false;
        const img = this.apiService.fnGetImgUrl(e, this.api.vendor.image.view);
        this.image_card_no_path = img.url;
        this.apiService.showSuccessTranslate('UPLOAD_IMAGE_SUCCESS');
    }

    async uploadFileCertificate(e) {
        this.disableBtn = false;
        const img = this.apiService.fnGetImgUrl(e, this.api.vendor.file.view);
        this.file_certificate.push({
            name: img.name,
            path: img.url,
            order: 999,
        });
        this.apiService.showSuccessTranslate('UPLOAD_FILE_SUCCESS');
    }

    async uploadFileFrontStore(e) {
        this.disableBtn = false;
        const img = this.apiService.fnGetImgUrl(e, this.api.vendor.file.view);
        this.image_front_store_path.push({
            name: img.name,
            path: img.url,
            order: 999,
        });
        this.apiService.showSuccessTranslate('UPLOAD_FILE_SUCCESS');
    }
}
