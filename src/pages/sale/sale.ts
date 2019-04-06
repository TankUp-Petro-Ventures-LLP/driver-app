import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DispenseFormComponent } from '../../components/dispense-form/dispense-form';
import { PaymentPage } from '../payment/payment';


@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController) {
  }

  ionViewDidLoad() {
  }

  addFilling(){
    let add = this.mdlCtrl.create(DispenseFormComponent)
    add.present()
  }

  payment(){
    this.navCtrl.push(PaymentPage)
  }

}
