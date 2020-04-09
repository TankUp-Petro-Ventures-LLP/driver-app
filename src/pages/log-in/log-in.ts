import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { ComponentsProvider } from '../../providers/components/components';
import { Config, eAuthType } from '../../configuration/config';
import { HomePage } from '../home/home';
import { MeterReadingPage } from '../meter-reading/meter-reading';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Uid } from '@ionic-native/uid';

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  public user :FormGroup
  public a =1
  public logo = Config.tankUpLogo
  public nu = false

  constructor(public navCtrl: NavController, public navParams: NavParams,private apiTalk:ApiTalkProvider,private formBuilder :FormBuilder,
    private cp :ComponentsProvider,private menuCtrl: MenuController,private uid: Uid, private androidPermissions: AndroidPermissions,
    private modalCtrl : ModalController) {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
  }

  async login(){
    // let imei = await this.getImei()
    let vid = await this.cp.storageGet('vehicle_id')
    let obj ={
      username:this.user.value['username'],
      password:this.user.value['password'],
      type :eAuthType.driver,
      // imei : imei,
      vehicle_id :vid
    }
    this.cp.presentLoadingText()
    try{
      let res = await  this.apiTalk.login(Config.API_URL+"/login", obj) //
      switch(res['status']){
        case 200:
          this.cp.storageSet('user',res['json'])
          this.cp.storageSet('isLoggedIn',true)
          this.cp.dismisLoading()
          this.navCtrl.setRoot(MeterReadingPage)
          break
        default:
          this.cp.presentAlert(res['json'].msg)
          this.cp.dismisLoading()
          // this.modalCtrl.create(ResponseMessagesComponent, {msg : res['json'].msg}).present()
      }
    }
    catch(e){
      this.cp.dismisLoading()
    }
  } 

  // async getImei() {
  //   const { hasPermission } = await this.androidPermissions.checkPermission(
  //     this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //   );
   
  //   if (!hasPermission) {
  //     const result = await this.androidPermissions.requestPermission(
  //       this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //     );
   
  //     if (!result.hasPermission) {
  //       throw new Error('Permissions required');
  //     }
   
  //     // ok, a user gave us permission, we can get him identifiers after restart app
  //     return;
  //   }
   
  //    return this.uid.IMEI
  //  }
}
