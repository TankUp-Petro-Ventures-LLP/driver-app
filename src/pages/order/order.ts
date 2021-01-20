import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { SalePage } from '../sale/sale';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ComponentsProvider } from '../../providers/components/components';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public supplyData
  public latitude
  public longitude
  public currentCoordinates
  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController,public platform:Platform,
    public apiTalk:ApiTalkProvider,public cp:ComponentsProvider) {
    this.supplyData = navParams.get('data'); 
  }

  ionViewDidLoad() {
    
  }
  
  doRefresh(refresher) { 
    this.ionViewDidLoad()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  startDelivery(){
    var blur= document.getElementById('blur');
    blur.classList.toggle('active')
    let permission = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.startDelivery})
    permission.present()

    permission.onDidDismiss(async data => {
      if(data){
        this.cp.presentLoadingText();
        await this.startTime()
        await this.saveLocationOfCustomer()
        this.navCtrl.push(SalePage,{supplyData:this.supplyData})
        this.cp.dismisLoading()
      }
    })
  }

  startTime(){
    let obj ={}
    obj['start_time'] = Date()
    return this.apiTalk.putData(Config.API_URL + '/supply?id='+ this.supplyData.order_supply_id,obj)
  }

  saveLocationOfCustomer(){
    this.cp.getCurrentLocation()
    .then(async result =>{
      this.currentCoordinates = result
      let obj = {}
      obj['latitude'] = this.currentCoordinates.coords.latitude
      obj['longitude'] = this.currentCoordinates.coords.longitude
      await this.apiTalk.putData(Config.API_URL + '/address?order_id='+this.supplyData.order_id,obj)
    })
  }
  navigateToGMaps(){
    this.latitude = this.supplyData.lat
    this.longitude = this.supplyData.long
    
    let destination = this.latitude + ',' + this.longitude;
    if(this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('My Label');
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }
  call(number){
    Config.makeCall(number);
  }
  callTankUp(){
    Config.makeCall(Config.tankup_number);
  }
  
}
