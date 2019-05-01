import { Component } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';
import { ComponentsProvider } from '../../providers/components/components';
import { Config } from '../../configuration/config';
import { OperationFactory, eTankUpOperation } from '../../factory/operations.factory';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { OnAppLoad } from '../../classes/on.app.load';
import { FcmProvider } from '../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { MeterReadingPage } from '../meter-reading/meter-reading';
import { OtpPage } from '../otp/otp';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public user
public money = Config.money
public pump = Config.pump
public vehicle_id
public analyticsData
  constructor(public navCtrl: NavController,public menuCtrl:MenuController,
    public cp:ComponentsProvider,public apiTalk:ApiTalkProvider,public fcm:FcmProvider,public onAppLoad:OnAppLoad,public alertCtrl:AlertController) {
    this.menuCtrl.enable(true)
    
  }
  async ionViewDidLoad(){
    this.init()
    this.user = await this.cp.storageGet('user')
    this.vehicle_id = await this.cp.storageGet('vehicle_id')
    setTimeout(async () => {
      this.cp.getLocation()
      .subscribe(async (data) => {
         this.saveLocationToDB(data)
      })
    }, 60000)
    this.getAnalyticsOfDriver()
   }

  async getOperation(){
    let result =  await this.fetchData()
    this.viewOperations(result['json'])
  }

  async fetchData(){
    let res = await this.apiTalk.getData(Config.API_URL + Config.driver + '/operation?vehicle_id='+this.vehicle_id)
    return res
  }
  viewOperations(result){
    let type = eTankUpOperation[String(result.type)]
    let tankupFactory = new OperationFactory(type)
    let component = tankupFactory.get()
    console.log(result)
    if(result.otp == true){
      let data = {}
      if(result.order_supply_id){
        data['order_supply_id'] = result.order_supply_id
        this.navCtrl.setRoot(OtpPage,{data:data,showSummary:false})
      }
      else{
        this.navCtrl.setRoot(OtpPage,{filling_id:result.id,vendor_id:result.vendor_id})
      }
    }
    else{
      this.navCtrl.push(component,{data:result})
    }
  }
  
  async saveLocationToDB(data){
    let vehicle_id = await this.cp.storageGet('vehicle_id')
    let user = await this.cp.storageGet('user')
 
   var today = new Date();
   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date+' '+time;
     let obj = {}
     obj['vehicle_id'] = vehicle_id
     obj['driver_id'] = user.id
     obj['latitude'] = data.coords.latitude
     obj['longitude'] =  data.coords.longitude
     obj['date_time'] =  dateTime
     return this.apiTalk.postData(Config._API_URL + Config.VEHICLE_URL + 'save-location-to-db',obj)
     .then(res =>{
     })
   }

  async init(){
    Config.VEHICLE_ID = await this.cp.storageGet('vehicle_id')
    if(await this.onAppLoad.isCordovaAvailable()){
      this.notificationInit()
    }
  }

  notificationInit(){
    this.fcm.getToken()
    this.fcm.listenToNotification().pipe(
      tap(msg => {
        this.presentAlert(msg)
      })
    )
    .subscribe()
  }
  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg.title,
      message: msg.body,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
           this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }

  async getAnalyticsOfDriver(){
    let user = await this.cp.storageGet('user')
    return this.apiTalk.getData(Config.API_URL + Config.driver + '/get?driver_id='+user.id)
    .then(result =>{
      this.analyticsData = result['json']
    })
  }

  logout(){
    this.cp.presentLoadingText()
    this.navCtrl.setRoot(MeterReadingPage,{logout:true})
    this.cp.dismisLoading()
  }


}
