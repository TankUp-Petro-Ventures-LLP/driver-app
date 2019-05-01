import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform, ToastController, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Config } from '../../configuration/config';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative : Firebase,
    public afs : AngularFirestore,
    public platform : Platform,
    public toastCtrl : ToastController,
    public alertCtrl : AlertController
  ) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken()
      // this.test(token)
    }
    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken()
      await this.firebaseNative.grantPermission()
    }
    if(!this.platform.is('cordova')){
      //this is for web
    }
    return this.saveTokenToFirestore(token)
  }

  private saveTokenToFirestore(token){
    if(!token) return
    const devicesRef = this.afs.collection('vehicle')
    const docData = {
      token,
      vehicle_id : Config.VEHICLE_ID
    }
    return devicesRef.doc(String(docData.vehicle_id)).set(docData)
  }



  listenToNotification(){
    return this.firebaseNative.onNotificationOpen()
  }

  test(token){
    const toast = this.toastCtrl.create({
      message : token,
      duration : 10000
    });
    toast.present();
  }

  presentAlert(token) {
    let alert = this.alertCtrl.create({
      title: token,
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  //---for Geological Location------//
   saveLocationToFirestore(obj){
    // if(!(key in obj)) return
    // console.log(obj)
    const devicesRef = this.afs.collection('vehicle_position')
    obj['vehicle_id'] = Config.VEHICLE_ID
    // console.log(devicesRef)
    return devicesRef.doc(obj.vehicle_id).set(obj)
  }

}
