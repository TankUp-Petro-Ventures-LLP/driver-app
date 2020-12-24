import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'
import {  LoadingController,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { OnAppLoad } from '../../classes/on.app.load';

@Injectable()
export class ComponentsProvider {
  public loading
  constructor(public http: HttpClient,private storage :Storage,
    private loadingCtrl : LoadingController,private alertCtrl:AlertController,
    public geolocation:Geolocation, private appLoad : OnAppLoad) {
    console.log('Hello ComponentsProvider Provider');
  }
  storageSet(key,value){
    return this.storage.set(key,value)
  }
  storageGet(key){
    return this.storage.get(key)
  }
  removeAll(){
    return this.storage.clear()
  }

  storageRem(key){
    return this.storage.remove(key)
  }

  presentLoadingText(text : string = "लोड हो रहा है कृपया प्रतीक्षा करें...") {
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: text
    });
  
    this.loading.present();
  }

  dismisLoading(){
    this.loading.dismiss();
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    // alert.setMode('ios')
    alert.present();
  }
  getLocation(){
     return this.geolocation.watchPosition()
  }
  getCurrentLocation(){
    return this.geolocation.getCurrentPosition()
  }
}
