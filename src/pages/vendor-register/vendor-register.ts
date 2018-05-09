import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

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

  registerData: FormGroup;
  formErrors = {
    'name': '',
    'phone': '',
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'emailPattern': 'Email is not valid'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'passwordMatch': {
      'required': 'Retype password',
      'match':'Passwords do not match'
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {

    this.registerData = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
      'phone': ['', this.phoneValidator.bind(this)],
      // 'email': ['', [Validators.required, this.emailValidator.bind(this)]]
    });

    this.registerData.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorRegisterPage');
  }

  fnSendData(form: any) {

    console.log(form)
  }
  // isValid(field: string) {
  //   let formField = this.registerData.find(field);
  //   return formField.valid || formField.pristine;
  // }

  onValueChanged(data?: any) {
    if (!this.registerData) {
      return;
    }
    const form = this.registerData;
    if (form.pristine) {
      return;
    }
    if (!form.dirty) {
      return;
    }
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.controls[field];
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value !== '') {
      if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
        return {invalidPhone: true};
      }
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
      return {invalidEmail: true};
    }
  }
}
