import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config } from '../../configuration/config';
import { HomePage } from '../home/home';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { eTankUpOperation } from '../../factory/operations.factory';
import { OtpPage } from '../otp/otp';
import { ComponentsProvider } from '../../providers/components/components';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';

@IonicPage()
@Component({
  selector: 'page-vendor-filling',
  templateUrl: 'vendor-filling.html',
})
export class VendorFillingPage {
public formFilling :FormGroup
public filling
public latitude
public longitude
public image : any
public obj ={}
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTalk:ApiTalkProvider,private formBuilder :FormBuilder,public mdlCtrl:ModalController,
    public cp:ComponentsProvider,public platform:Platform,private camera: Camera,  private backgroundMode: BackgroundMode) {
    this.formFilling = this.formBuilder.group({
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
      comment: ['',[]],
      voucher_no: ['', Validators.required]
    });
    this.filling = navParams.get('data'); 
  }

  ionViewDidLoad() {
    if(this.filling){
      this.formFilling.setValue({quantity:this.filling.quantity,rate:this.filling.rate,comment:this.filling.comment,voucher_no:this.filling.voucher_no})
    }
  }

  complete(){
    let permission = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.completeFilling})
    permission.present()

    permission.onDidDismiss(async data => {
      if(data){
        let user = await this.cp.storageGet('user')
        this.formFilling.value['driver_id']= user.id
        return this.apiTalk.putData(Config.API_URL+'/vehicle-purchase?id='+this.filling.id,this.formFilling.value)
        .then(async result =>{
          await this.openCamera()
          this.cp.presentLoadingText()
          await this.generateOtp()
          this.cp.dismisLoading()
          this.navCtrl.setRoot(OtpPage,{vendor_id:this.filling.vendor_id,filling_id:this.filling.id})
        })
      }
    })
  }

  generateOtp(){
    let obj = {}
    obj['filling_id'] = this.filling.id
    obj['vendor_id'] = this.filling.vendor_id
    obj['type'] = eTankUpOperation.filling
    return this.apiTalk.postData(Config.API_URL + '/otp/generate',obj)
  }

  navigateToGMaps(){
    this.latitude = this.filling.lat
    this.longitude = this.filling.long
    
    let destination = this.latitude + ',' + this.longitude;
    if(this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('My Label');
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
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
    }, (err) => {
    });
    this.backgroundMode.disable();

  }

  uploadImage(){
    this.obj = {}
    this.obj['vendor_id'] = this.filling.vendor_id
    this.obj['image'] = this.image
    this.obj['voucher_no'] = this.formFilling.value.voucher_no
    console.log(this.obj)
    return this.apiTalk.postData(Config.API_URL+ '/driver-app/order-slips?type='+eTankUpOperation.filling, this.obj)
    .then(async result => {
      this.cp.presentAlert(result['json'].msg)
    })
  }

  
}

