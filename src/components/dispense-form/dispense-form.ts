import { Component, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { MessageActionModalComponent } from '../message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { ViewController, NavParams } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'dispense-form',
  templateUrl: 'dispense-form.html'
})
export class DispenseFormComponent {

  public form :FormGroup
  public data
  public isDisabled = false
  public supplyDetails
  public result
  public tank_name
  public image : any

  constructor(private viewCtrl : ViewController, private navParam : NavParams, private formBuilder :FormBuilder, private mdlCtrl : ModalController,
    public apiTalk:ApiTalkProvider,private backgroundMode: BackgroundMode, private camera: Camera) {
    this.form = this.formBuilder.group({
      tank_name: ['', [Validators.required]],//^(0|[1-9]\d*)$/
      tank_reading: ['',Validators.compose([ Validators.required,  Validators.pattern('^(0|[1-9][0-9]*)$')])],
      quantity:['',Validators.compose([ Validators.required,Validators.min(0)])] , 
      metadata: ['', []],
      id : ['',[]],
      changed_quantity:['', []]
    });
    this.data = this.navParam.get('data')
    this.supplyDetails = this.navParam.get('supplyDetails')

  }

  ionViewDidLoad(){
    if(this.data){
      this.isDisabled = true
      this.form.setValue(this.data)
    }
  }

  saveDispensing(){
    if(!this.data){
      let save = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.saveDispensing(this.form.value['quantity'], this.form.value['tank_name'])})
      save.present()
      save.onDidDismiss(data => {
        if(data){
          let modal = this.mdlCtrl.create(MessageActionModalComponent,{msg:MessageConfig.slipConfirmation})
          modal.present()
          modal.onDidDismiss(async d => {
            if(d){
             await this.clickParchiPhoto()
              this.sendParchi()
            }
          })
          this.viewCtrl.dismiss(this.form.value)
        }
      })
    }
    else{
      let save = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.saveDispensing(this.form.value['changed_quantity'], this.form.value['tank_name'])})
      save.present()
      save.onDidDismiss(data => {
        if(data){
          this.viewCtrl.dismiss(this.form.value)
        }
      })
    }
  }

  clickParchiPhoto(){
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
      return new Promise((resolve, reject) => {
        this.camera.getPicture(options).then((imageData) => {
  
        this.image = 'data:image/jpg;base64,' + imageData;
        this.backgroundMode.disable()
        resolve()
        }, (err) => {
          reject()
        });
      })
      ;
  }

  sendParchi(){
    let body = {}
    body['body'] = this.image
    let name = `${this.supplyDetails.order_supply_id}-${(new Date())}`
    return this.apiTalk.putData(Config.aws_s3_bucket + '/image?bucket=sale.slips&filePath='+name,body)
    .then(r => {
    })
  }

  close(){
    this.viewCtrl.dismiss(false)
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }


  searchTank(){
      if(this.tank_name.length < 1) {
        // this.setNull()
        return
      }
      return this.apiTalk.getData(Config.API_URL+"/search?key="+this.tank_name+'&type=customer_tank&customer_id='+this.supplyDetails.customer_id)
      .then(res => {
        this.result = res['json']
      })
  }
  selectTank(value){
    this.form.patchValue({tank_name:value.tank_name})
    this.tank_name = value.tank_name
    this.result = null
  }

  selectRadio(value)
  {
    this.form.patchValue({tank_name:value})
    this.tank_name = value

  }
}
