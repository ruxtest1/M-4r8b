import {Injectable} from '@angular/core';
// import {Http} from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SharedService {
  // loadingVisible = false;
  public lang = 'th';
  public open_add_cart = false;
  public userData = {
    vendor: {
        star: 0
    }
  };
  public list_category_main = null;
  public list_category_sub = [];
  public count_product = 0;
  public list_select_buy_product = [];
  public cart_data = {
    count_product: 0,
  };
  isLogin = false;
  // mok property
  roomsData;
  roomData;
  floorsData;
  numFloors;
  propertyTypes;
  properties;
  roomTypesData;
  typesData;
  // data property
  propertyWizardData;
  rooms;
  facility;
  building;
  room_type;
  // data building
  roomDataDetail;
  propertyTypeList;
  propertiesList;
  numCount;
  roomSettingType;

  bookingData;
  routerLink;
  rentYear;
  rentMonth;
  rentFloor;
  delete_data;
  routerData;
  batchData;
  confirmRent;
  waiting_id;
  invoice_id;
  attr_group_id;

  // propertyName$ = this.propertyName.asObservable();

  private callback: any = null;
  private callbackShowLoading: any = null;
  private callbackHideLoading: any = null;

  public getCallback() {
    return this.callback;
  }

  public setCallback(call) {
    this.callback = call;
  }

  public showLoading() {
    return this.callbackShowLoading;
  }

  public setCallbackShowLoading(call) {
    this.callbackShowLoading = call;
  }

  public hideLoading() {
    return this.callbackHideLoading;
  }

  public setCallbackHideLoading(call) {
    this.callbackHideLoading = call;
  }

  // constructor(private http: Http) {
  //   this.roomsData = {};
  //   this.floorsData = [];
  //   this.numFloors = [];
  //   this.propertyTypes = {};
  //   this.properties = {};
  //   this.rooms = [];
  //   this.facility = [];
  //   this.building = {};
  //   this.roomDataDetail = {};
  //   this.propertyWizardData = {};
  //   this.roomTypesData = {};
  //   this.typesData = [];
  //   this.room_type = [];
  //   this.propertyTypeList = [];
  //   this.propertiesList = [];
  //   this.numCount = 1;
  //   this.roomSettingType = {};
  //   this.bookingData = {};
  //   this.rentYear = null;
  //   this.rentMonth = null;
  //   this.rentFloor = null;
  //   this.batchData = {};
  //   this.delete_data = {};
  //   this.routerLink = {};
  //   this.routerData = {};
  //   this.waiting_id = null;
  //   this.loadingVisible = false;
  // }

  changedTitle() {
    // this.propertyName.next(this.routerData.property_name);
  }

  clearWizardData() {
    this.roomsData = {};
    this.floorsData = [];
    this.numFloors = [];
    this.propertyTypes = {};
    this.properties = {};
    this.rooms = [];
    this.facility = [];
    this.building = {};
    this.roomDataDetail = {};
    this.propertyWizardData = {};
    this.roomTypesData = {};
    this.typesData = [];
    this.room_type = [];
    this.propertyTypeList = [];
    this.propertiesList = [];
    this.numCount = 1;
  }
}
