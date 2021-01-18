import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { eTankUpOperation } from '../../factory/operations.factory';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ComponentsProvider } from '../../providers/components/components';
import { OtpPage } from '../otp/otp';

/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {

  public data
  public paymentData
  public filling_id
  public vendor_id
  public obj
  public showSummary
  public image
  public imageArray =[]
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,  private backgroundMode: BackgroundMode,public apiTalk:ApiTalkProvider,
    public cp:ComponentsProvider) {
    this.data = navParams.get('data'); 
    this.paymentData = navParams.get('paymentData'); 
    this.filling_id = navParams.get('filling_id'); 
    this.vendor_id = navParams.get('vendor_id'); 
    this.obj = navParams.get('obj'); 
    this.showSummary = navParams.get('showSummary'); 
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImagePage');
  }

  openCamera(){
    this.backgroundMode.enable();
    const options: CameraOptions = {
      quality: 60,
      targetHeight:1280,
      targetWidth:1280,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.image = 'data:image/jpg;base64,' + imageData;
     this.uploadImage()
     console.log(this.imageArray)
    }, (err) => {
    });
    this.backgroundMode.disable();

  }

  uploadImage(){
    this.cp.presentLoadingText();
    this.obj = {}
    this.obj['customer_id'] = this.data.customer_id
    this.obj['image'] = this.image
    this.obj['order_id'] = this.data.order_id
    this.obj['order_supply_id'] = this.data.order_supply_id
    // this.obj['quantity'] = data.quantity
    console.log(this.obj)
    return this.apiTalk.postData(Config.API_URL+ '/driver-app/order-slips?type='+eTankUpOperation.supply, this.obj)
    .then(async result => {
      this.cp.dismisLoading();
      this.imageArray.push(this.image)
      this.cp.presentAlert(result['json'].msg)
    })
  }
  openGallery(){
    this.camera.getPicture({
      quality: 60,
      targetHeight:1280,
      targetWidth:1280,
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
   
       destinationType: this.camera.DestinationType.DATA_URL
   
      }).then((imageData) => {
   
        this.image = 'data:image/jpg;base64,'+imageData;
        this.uploadImage()
      }, (err) => {     
    });  
    
  }


  finish(){
    this.navCtrl.setRoot(OtpPage,{data:this.data,paymentData:this.data,showAmount:false})
  }
}


