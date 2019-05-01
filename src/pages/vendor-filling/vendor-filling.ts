import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config } from '../../configuration/config';
import { HomePage } from '../home/home';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { eTankUpOperation } from '../../factory/operations.factory';
import { OtpPage } from '../otp/otp';
import { ComponentsProvider } from '../../providers/components/components';

@IonicPage()
@Component({
  selector: 'page-vendor-filling',
  templateUrl: 'vendor-filling.html',
})
export class VendorFillingPage {
public formFilling :FormGroup
public filling
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiTalk:ApiTalkProvider,private formBuilder :FormBuilder,public mdlCtrl:ModalController,
    public cp:ComponentsProvider) {
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

    permission.onDidDismiss(data => {
      if(data){
        return this.apiTalk.putData(Config.API_URL+'/vehicle-purchase?id='+this.filling.id,this.formFilling.value)
        .then(async result =>{
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
}

