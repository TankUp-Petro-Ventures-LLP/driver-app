import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { PaymentPage } from '../payment/payment';
import { createPipeInstance } from '@angular/core/src/view/provider';
import { ComponentsProvider } from '../../providers/components/components';

/**
 * Generated class for the VerifyFillingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-filling',
  templateUrl: 'verify-filling.html',
})
export class VerifyFillingPage {
public supplyDetails
public supplyData
public total_changed_quantity
public total_filled_quantity
public edit =true
  constructor(public navCtrl: NavController,public cp:ComponentsProvider, public navParams: NavParams,public apiTalk:ApiTalkProvider) {
    this.supplyDetails = navParams.get('supplyDetails');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyFillingPage');
    this.getData()
  }
  doRefresh(refresher) { 
    this.ionViewDidLoad()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  getData(){
    return this.apiTalk.getData(Config.API_URL + '/customer-tank?order_supply_id='+this.supplyDetails.order_supply_id)
    .then(res =>{
      this.total_changed_quantity = res['json'].total_changed_quantity
      this.total_filled_quantity = res['json'].total_filled_quantity
      this.supplyData = res['json'].data
      console.log(res['json'])
    })
  }
  payment(){
    this.cp.presentLoadingText()
    this.navCtrl.push(PaymentPage,{supplyDetails:this.supplyDetails}) //,supplyData:this.supplyData
    this.cp.dismisLoading();
  }
}
