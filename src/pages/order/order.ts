import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { SalePage } from '../sale/sale';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController) {
  }

  ionViewDidLoad() {
    
  }

  startDelivery(){
    let permission = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.startDelivery})
    permission.present()

    permission.onDidDismiss(data => {
      if(data){
        this.navCtrl.push(SalePage)
      }
    })
  }

}
