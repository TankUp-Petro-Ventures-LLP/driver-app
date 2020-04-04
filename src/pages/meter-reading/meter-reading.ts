import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config, eAuthType } from '../../configuration/config';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { HomePage } from '../home/home';
import { ComponentsProvider } from '../../providers/components/components';
import { LogInPage } from '../log-in/log-in';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
@IonicPage()
@Component({
  selector: 'page-meter-reading',
  templateUrl: 'meter-reading.html',
})
export class MeterReadingPage {
  public data= new Meter
  
  public dataFilling : FormGroup;
  public logo = Config.tankUpLogo
  public vehicle_id
  public loggedOut
  public msg
  public last_meter_reading
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public apiTalk:ApiTalkProvider,
    public cp:ComponentsProvider,public mdlCtrl:ModalController) {
    if(this.vehicle_id == '8'){
      this.dataFilling = this.formBuilder.group({
        meter_reading: ['',Validators.compose([ Validators.required, Validators.max(999999999), Validators.pattern('^(0|[1-9][0-9]*)$')])], ///^(0|[1-9][0-9]*)$/
        kilometer: ['',Validators.compose([ Validators.required,  Validators.pattern('^(0|[1-9][0-9]*)$')])],
        hour_meter_reading: ['',Validators.compose([Validators.required])]
      });
    }
    else{
      this.dataFilling = this.formBuilder.group({
        meter_reading: ['',Validators.compose([ Validators.required, Validators.max(999999999), Validators.pattern('^(0|[1-9][0-9]*)$')])], ///^(0|[1-9][0-9]*)$/
        kilometer: ['',Validators.compose([ Validators.required,  Validators.pattern('^(0|[1-9][0-9]*)$')])],
        // hour_meter_reading: ['',Validators.compose([Validators.required])]
      });
    }
    this.loggedOut = navParams.get('logout'); 

  }

  async ionViewDidLoad() {
    this.vehicle_id = await this.cp.storageGet('vehicle_id')
    this.getPreviousReading()

  }
  async check(){

    let readings = await this.cp.storageGet('readings')
    if(readings){
      this.navCtrl.setRoot(HomePage)
    }

  }


  async send(){
    await this.sendMeterReading()
    if(this.loggedOut){
      this.logout()
      this.navCtrl.setRoot(LogInPage)
    }
    else{
      this.check()
    }
  }
  getPreviousReading(){
    return this.apiTalk.getData(Config.API_URL + '/vehicle/meter-reading?vehicle_id='+this.vehicle_id)
    .then(result => {
      this.last_meter_reading = result['json'].data
    })
  }

  async sendMeterReading(){
    let data = {}
    data['kilometer'] = this.dataFilling.value.kilometer
    data['meter_reading'] = this.dataFilling.value.meter_reading
    data['hour_meter_reading'] = this.dataFilling.value.hour_meter_reading
    data['vehicle_id']  = this.vehicle_id
    if(!this.loggedOut){
      let save = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.meterReadingConfirmation(this.last_meter_reading, data['meter_reading'])})
      save.present()
      save.onDidDismiss( d => {
        if(d){
          this.cp.presentLoadingText()
          return this.apiTalk.postData(Config.API_URL+ '/vehicle/meter-reading?vehicle_id='+this.vehicle_id +'&type=MR', data)
          .then(async result => {
            if(result['status'] == 200){
              this.cp.dismisLoading()
              await this.cp.storageSet('readings', true)
              this.check()
            }
            else{
              this.cp.dismisLoading()
              await this.cp.storageSet('readings', false)
            }
          })
          .catch(error =>    this.cp.dismisLoading());
        }
      })
    }
  }

  async logout(){
    let user = await this.cp.storageGet('user')
    let obj = {}
    obj['driver_id'] = user.id
    obj['vehicle_id'] = this.vehicle_id
    obj['type'] = eAuthType.driver

    obj['kilometer'] = this.dataFilling.value.kilometer
    obj['meter_reading'] = this.dataFilling.value.meter_reading
    obj['hour_meter_reading'] = this.dataFilling.value.hour_meter_reading

    this.cp.presentLoadingText()
    await this.apiTalk.postData(Config.API_URL+ '/vehicle/meter-reading?vehicle_id='+this.vehicle_id +'&type=MR', obj)

    return this.apiTalk.postData(Config.API_URL + '/logout',obj)
    .then(result => {
      this.cp.storageRem('user')
      this.cp.storageRem('readings')
      this.cp.storageRem('isLoggedIn')
      this.cp.dismisLoading()

    })
  }
  
}

class Meter{
  meter_reading:string
  kilometer:string
  hour_meter_reading:string
}