import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home2Page } from '../home2/home2';
import { ComponentsProvider } from '../../providers/components/components';

/**
 * Generated class for the OrderSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html',
})
export class OrderSummaryPage {
public supplyData
public paymentData
public obj
public showAmount
  constructor(public navCtrl: NavController, public navParams: NavParams,public cp:ComponentsProvider) {
    this.supplyData = navParams.get('supplyData'); 
    this.paymentData = navParams.get('paymentData');
    this.showAmount = navParams.get('showAmount');
    this.obj = navParams.get('obj'); 
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSummaryPage');
  }
  goToNextOrder(){
    this.cp.presentLoadingText()
    this.navCtrl.setRoot(Home2Page)
    this.cp.dismisLoading()
  }
}
