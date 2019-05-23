import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { PaymentCollectionComponent } from '../../components/payment-collection/payment-collection';
import { PaymentNotCollectedComponent } from '../../components/payment-not-collected/payment-not-collected';
import { PaymentFinalStatusComponent } from '../../components/payment-final-status/payment-final-status';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ComponentsProvider } from '../../providers/components/components';
import { HomePage } from '../home/home';
import { Home2Page } from '../home2/home2';
import { OrderSummaryPage } from '../order-summary/order-summary';
import { OtpPage } from '../otp/otp';
import { eTankUpOperation } from '../../factory/operations.factory';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
public data
public paymentData
public selected_payment_method
public amount
public approved_by

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController,public apiTalk:ApiTalkProvider,
    public cp:ComponentsProvider) {
    this.data = navParams.get('supplyDetails'); 
    console.log(this.data)
  }

  ionViewDidLoad() {
    this.getPaymentDetails()
  }

  doRefresh(refresher) { 
    this.ionViewDidLoad()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  async completePayment(){
    let isCollectionPayment = true
    if(isCollectionPayment){
      this.collectPayment()
    }
    else{
      this.complete({})
    }
  }

  collectPayment(){
    if(this.data.payment_mode == 1 || this.data.payment_mode == 2 || this.data.payment_mode == 4){
      let ask = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.askPaymentModal})
      ask.present()
  
      ask.onDidDismiss(data => {
        if(data){
          this.fillPayment()
        }
        else{
          this.completeWithoutPayment()
        }
      })
    }
    else{
      let ask = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.completeOrder})
      ask.present()
  
      ask.onDidDismiss(async data => {
        if(data){
          this.cp.presentLoadingText()
          await  this.completeSupply()
          await this.generateOtp()
          this.cp.dismisLoading()
          this.navCtrl.setRoot(OtpPage,{data:this.data,paymentData:this.data,showAmount:false})
        }
      })
    }
  }

  generateOtp(){
    let obj = {}
    obj['order_supply_id'] = this.data.order_supply_id
    obj['type'] = eTankUpOperation.supply
    return this.apiTalk.postData(Config.API_URL + '/otp/generate',obj)
  }

  fillPayment(){
    let paymentCollect = this.mdlCtrl.create(PaymentCollectionComponent)
    paymentCollect.present()

    paymentCollect.onDidDismiss(data => {
      if(data){
        this.done(true, data)
      }
    })
  }

  completeWithoutPayment(){
    let paymentNotCollect = this.mdlCtrl.create(PaymentNotCollectedComponent)
    paymentNotCollect.present()

    paymentNotCollect.onDidDismiss(data => {
      if(data){
        this.approved_by = data.approved_by
        this.done(false, data)
      }
    })
  }

  done(status, data){
    let paymentFinal = this.mdlCtrl.create(PaymentFinalStatusComponent, {data : {status : status, data : data}})
    paymentFinal.present()

    paymentFinal.onDidDismiss(async data => {
      if(data){
        this.amount = data
        let obj = {}
        let by = await this.cp.storageGet('user')
        obj['customer_id'] = this.data.customer_id
        obj['amount'] = this.amount
        obj['by'] = by.username
        if(this.selected_payment_method){
          obj['payment_option_id'] = this.selected_payment_method
        }
        else{
          obj['payment_option_id'] = this.data.payment_mode
        }
        this.complete(obj)
      }
      else{
        let obj = {}
        obj['approved_by'] = this.approved_by
        this.complete(obj)
      }
    })
  }

 async complete(obj){
   await this.completeSupply()
   await this.generateOtp()
   this.cp.presentLoadingText()
    return this.apiTalk.postData(Config.API_URL + '/payment?order_id='+this.data.order_id,obj)
    .then(result =>{
      this.cp.dismisLoading()
      this.navCtrl.setRoot(OtpPage,{data:this.data,paymentData:this.data,showAmount:true,obj:obj})
      // this.navCtrl.setRoot(OrderSummaryPage,{supplyData:this.data,paymentData:this.paymentData,obj:obj,showAmount:true})
    })
  }

 async completeSupply(){
    let user = await this.cp.storageGet('user')
    let obj = {}
    obj['end_time'] = Date()
    obj['order_status_id'] = Config.order_status_id_for_complete
    obj['driver_id']= user.id
    return this.apiTalk.putData(Config.API_URL + '/supply?id='+ this.data.order_supply_id,obj)
  }

  getPaymentDetails(){
    return this.apiTalk.getData(Config.API_URL + Config.driver+'/payment?order_supply_id='+this.data.order_supply_id)
    .then(result => {
      this.paymentData = result['json']
    })
  }

  emittedPaymentMethod(event){
    this.selected_payment_method = event.id
  }

}
