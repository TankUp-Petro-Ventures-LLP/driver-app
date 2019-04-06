import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { PaymentCollectionComponent } from '../../components/payment-collection/payment-collection';
import { PaymentNotCollectedComponent } from '../../components/payment-not-collected/payment-not-collected';
import { PaymentFinalStatusComponent } from '../../components/payment-final-status/payment-final-status';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  async completePayment(){
    let isCollectionPayment = true
    if(isCollectionPayment){
      this.collectPayment()
    }
    else{
      this.complete()
    }
  }

  collectPayment(){
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
        this.done(false, data)
      }
    })
  }

  done(status, data){
    let paymentFinal = this.mdlCtrl.create(PaymentFinalStatusComponent, {data : {status : status, data : data}})
    paymentFinal.present()

    paymentFinal.onDidDismiss(data => {
     
    })
  }

  complete(){

  }

}
