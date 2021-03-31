import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ConfigToken, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config } from '../../configuration/config';
import { eTankUpOperation } from '../../factory/operations.factory';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { ComponentsProvider } from '../../providers/components/components';
import { OrderSummaryPage } from '../order-summary/order-summary';
import { OtpByPassComponent } from '../../components/otp-by-pass/otp-by-pass';
import { Home2Page } from '../home2/home2';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  public user :FormGroup
  public logo = Config.tankUpLogo
  public data
  public paymentData
  public obj
  public filling_id
  public vendor_id
  public showSummary
  public supplyData
  public number
  public vehicle_id
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder :FormBuilder,public apiTalk:ApiTalkProvider,
    public cp:ComponentsProvider,public mdlCtrl:ModalController) {
    this.user = this.formBuilder.group({
      otp: ['',Validators.compose([ Validators.required,Validators.min(0), Validators.maxLength(6), Validators.pattern('^(0|[1-9][0-9]*)$')])],
    });
    this.data = navParams.get('data'); 
    this.paymentData = navParams.get('paymentData'); 
    this.filling_id = navParams.get('filling_id'); 
    this.vendor_id = navParams.get('vendor_id'); 
    this.obj = navParams.get('obj'); 
    this.showSummary = navParams.get('showSummary'); 
  }

  async ionViewDidLoad() {
    this.vehicle_id = await this.cp.storageGet('vehicle_id')
   let detail= await this.fetchData();
   console.log(detail['json'])

    if(detail['json'].contact_number){
      this.number = detail['json'].contact_number;
    }
    if(this.data.contact_person_number){
      this.number = this.data.contact_person_number;
    }
    else{
      this.number=this.data.customer_number
    }
  }
  async fetchData(){
    let res = await this.apiTalk.getData(Config.API_URL + Config.driver + '/operation?vehicle_id='+this.vehicle_id)
    return res
  }
  verifyOtp(){
    if(!this.filling_id){
      let obj = {}
      obj['otp'] = this.user.value['otp']
      obj['order_supply_id'] = this.data.order_supply_id
      obj['type'] = eTankUpOperation.supply
      this.cp.presentLoadingText()
      return this.apiTalk.postData(Config.API_URL + '/otp/verify',obj)
      .then(r=>{
        if(r['status']==200){
          this.cp.dismisLoading()
          this.cp.presentAlert(r['json'].msg)
          if(!this.showSummary){
            this.navCtrl.setRoot(Home2Page)
          }
          else{
            this.navCtrl.setRoot(OrderSummaryPage,{supplyData:this.data,paymentData:this.paymentData,showAmount:false,obj:this.obj})
          }
        }
        else{
          this.cp.dismisLoading()
          this.cp.presentAlert(r['json'].msg)
        }
      })
    }
    else{
      let obj = {}
      obj['otp'] = this.user.value['otp']
      obj['filling_id'] = this.filling_id
      obj['vendor_id'] = this.vendor_id
      obj['type'] = eTankUpOperation.filling
      this.cp.presentLoadingText()
      return this.apiTalk.postData(Config.API_URL + '/otp/verify',obj)
      .then(r=>{
        if(r['status']==200){
          this.cp.dismisLoading()
          this.cp.presentAlert(r['json'].msg)
          this.navCtrl.setRoot(Home2Page)
        }
        else{
          this.cp.dismisLoading()
          this.cp.presentAlert(r['json'].msg)
        }
      })
    }
  }

  resendOtp(){
    if(!this.filling_id){
      let obj = {}
      obj['order_supply_id'] = this.data.order_supply_id
      obj['type'] = eTankUpOperation.supply
      obj['resend'] = true

      this.cp.presentLoadingText()
      return this.apiTalk.postData('http://15.206.67.208:3000/api-v3' + '/otp/generate',obj)
      .then(r =>{
        this.cp.dismisLoading()
      })
    }
    else{
      let obj = {}
      obj['filling_id'] = this.filling_id
      obj['vendor_id'] = this.vendor_id
      obj['type'] = eTankUpOperation.filling
      obj['resend'] = true

      this.cp.presentLoadingText()
      return this.apiTalk.postData('http://15.206.67.208:3000/api-v3' + '/otp/generate',obj)
      .then(r =>{
        this.cp.dismisLoading()
      })
    }
  }

  editNumber(){
    let add = this.mdlCtrl.create(OtpByPassComponent)
    add.present()
    add.onDidDismiss(data => {
      if(data){
        if(!this.filling_id){
          let obj = {}
          obj['order_supply_id'] = this.data.order_supply_id
          obj['name'] = data.name
          obj['type'] = eTankUpOperation.supply
          obj['phone_number'] = data.phone_number
          obj['resend'] = true

          return this.apiTalk.postData('http://15.206.67.208:3000/api-v3' + '/otp/generate?bypass='+true,obj)
          .then(result => {
            this.cp.presentAlert(result['json'].msg)
          })
        }
        else{
          let obj = {}
          obj['filling_id'] = this.filling_id
          obj['vendor_id'] = this.vendor_id
          obj['name'] = data.name
          obj['type'] = eTankUpOperation.filling
          obj['phone_number'] = data.phone_number
          obj['resend'] = true

          return this.apiTalk.postData('http://15.206.67.208:3000/api-v3' + '/otp/generate?bypass='+true,obj)
          .then(result => {
            this.cp.presentAlert(result['json'].msg)
          })
        }
      }
    })
  }
}
