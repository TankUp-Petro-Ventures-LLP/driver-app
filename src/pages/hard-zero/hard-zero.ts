import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageConfig } from '../../app/message.config';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { ComponentsProvider } from '../../providers/components/components';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { BackgroundMode } from '@ionic-native/background-mode';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-hard-zero',
  templateUrl: 'hard-zero.html',
})
export class HardZeroPage {
  public dataFilling : FormGroup;
  public image : any
  public obj
  public vehicle_id
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,private file: File,private formBuilder: FormBuilder,public cp:ComponentsProvider,public apiTalk:ApiTalkProvider,public mdlCtrl:ModalController,
    private backgroundMode: BackgroundMode) {
      this.dataFilling = this.formBuilder.group({
        meter_reading: ['',Validators.compose([ Validators.required, Validators.max(999999999),  Validators.pattern('^(0|[1-9][0-9]*)$')])], ///^(0|[1-9][0-9]*)$/
      });
  }

  async ionViewDidLoad() {
    this.vehicle_id = await this.cp.storageGet('vehicle_id')

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

    //  var currentName = this.image.replace(/^.*[\\\/]/, '');
    //  var d = new Date(),
    //  n = d.getTime(),
    //  newFileName = n + ".jpg";
    //  this.file.moveFile(this.file.tempDirectory, currentName, this.file.dataDirectory, newFileName).then(function(success) {


    // }, function(error) {
    //   //an error occured
    // });
    }, (err) => {
    });
    this.backgroundMode.disable();

  }

  send(){
    var blur= document.getElementById('blur');
    blur.classList.toggle('active')
    this.obj = {}
    this.obj['meter_reading'] = this.dataFilling.value['meter_reading']
    this.obj['image'] = this.image
    let save = this.mdlCtrl.create(MessageActionModalComponent, {msg :  MessageConfig.sendHardZero})
    save.present()
    save.onDidDismiss( d => {
      if(d){
        console.log(this.obj)
        this.cp.presentLoadingText()
        return this.apiTalk.postData(Config.API_URL+ '/vehicle/meter-reading?vehicle_id='+this.vehicle_id +'&type=HZ', this.obj)
        .then(async result => {
          if(result['status'] == 200){
            this.cp.dismisLoading()
            this.navCtrl.setRoot(HomePage)
          }
          else{
          }
        })
        .catch(error =>    this.cp.dismisLoading());
      }
    })
  }
}
