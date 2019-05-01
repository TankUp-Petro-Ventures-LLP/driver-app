import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { eTankUpOperation, OperationFactory } from '../../factory/operations.factory';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ComponentsProvider } from '../../providers/components/components';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
public vehicle_id
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTalk:ApiTalkProvider,public cp:ComponentsProvider) {
  }

 async ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
    this.vehicle_id = await this.cp.storageGet('vehicle_id')
    this.getOperation()
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
    if(type == 'notfound'){
      this.navCtrl.setRoot(HomePage)
    }
    else{
      this.navCtrl.setRoot(component,{data:result})
    }
  }
}
