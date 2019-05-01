import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Config } from '../../configuration/config';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { ComponentsProvider } from '../../providers/components/components';
import { LogInPage } from '../log-in/log-in';

@IonicPage()
@Component({
  selector: 'page-set-vehicle',
  templateUrl: 'set-vehicle.html',
})
export class SetVehiclePage {
  public logo = Config.tankUpLogo
  public vehicleList
  public vehicles
  public data =  new Vehicle
  public vehicle_id

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTalk:ApiTalkProvider,public cp:ComponentsProvider) {
  }

  ionViewDidLoad() {
    this.getVehicleList()
  }
  
  getVehicleList(){
    return this.apiTalk.getData(Config.API_URL + '/vehicle')
    .then(r=>{
      this.vehicleList = r['json'].data
    })
  }

   async setVehicle(){
    this.vehicle_id = this.data.id
    if(this.vehicle_id && this.vehicle_id > 0){
     await  this.cp.storageSet('vehicle_id',this.vehicle_id)
    }
    this.check()

  }

  async check(){
    this.cp.presentLoadingText('checking vehicle')
    let vehicle = await this.cp.storageGet('vehicle_id')
    if(vehicle){
      this.cp.dismisLoading()
      this.navCtrl.setRoot(LogInPage)
    }
    else{
      this.cp.dismisLoading()
    }
  }
}

class Vehicle{
  id:number
}