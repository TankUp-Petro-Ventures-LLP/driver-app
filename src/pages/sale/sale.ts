import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DispenseFormComponent } from '../../components/dispense-form/dispense-form';
import { PaymentPage } from '../payment/payment';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ChangeQuantityComponent } from '../../components/change-quantity/change-quantity';
import { ComponentsProvider } from '../../providers/components/components';
import { VerifyFillingPage} from '../verify-filling/verify-filling'
import { BackgroundMode } from '@ionic-native/background-mode';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MessageConfig } from '../../app/message.config';
import { MessageActionModalComponent } from '../../components/message-action-modal/message-action-modal';
import { eTankUpOperation } from '../../factory/operations.factory';

@IonicPage()
@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html',
})
export class SalePage {
  public data
  public supplyData
  public supplyDetails
  public total_changed_quantity
  public total_filled_quantity
  public edit = false
  public image : any
  public obj ={}

  constructor(public navCtrl: NavController, public navParams: NavParams, private mdlCtrl : ModalController,
    public apiTalk:ApiTalkProvider,public cp:ComponentsProvider,private camera: Camera,  private backgroundMode: BackgroundMode) {
      this.supplyDetails = navParams.get('supplyData'); 
  }

  ionViewDidLoad() {
    this.getData()
  }

  doRefresh(refresher) { 
    this.ionViewDidLoad()
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  addFilling(){
    let add = this.mdlCtrl.create(DispenseFormComponent,{supplyDetails:this.supplyDetails})
    add.present()
    add.onDidDismiss(data => {
      if(data){
        this.data = data
        this.data.order_id = this.supplyDetails.order_id
        this.data.order_supply_id = this.supplyDetails.order_supply_id
        this.data.customer_id = this.supplyDetails.customer_id
        this.saveData(this.data)
      }
    });
  }

  saveData(data){
    return this.apiTalk.postData(Config.API_URL +'/customer-tank',data)
    .then(async res =>{
      // await this.openCamera(data)
      this.ionViewDidLoad()
    })
  }

  openCamera(data){
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
     this.uploadImage(data)
    }, (err) => {
    });
    this.backgroundMode.disable();

  }

  uploadImage(data){
    this.obj = {}
    this.obj['customer_id'] = data.customer_id
    this.obj['image'] = this.image
    this.obj['order_id'] = data.order_id
    this.obj['order_supply_id'] = data.order_supply_id
    this.obj['quantity'] = data.quantity
    console.log(this.obj)
    return this.apiTalk.postData(Config.API_URL+ '/driver-app/order-slips?type='+eTankUpOperation.supply, this.obj)
    .then(async result => {
      this.cp.presentAlert(result['json'].msg)
    })
  }

  getData(){
    return this.apiTalk.getData(Config.API_URL + '/customer-tank?order_supply_id='+this.supplyDetails.order_supply_id)
    .then(res =>{
      this.total_changed_quantity = res['json'].total_changed_quantity
      this.total_filled_quantity = res['json'].total_filled_quantity
      this.supplyData = res['json'].data
    })
  }

  payment(){
    if(this.supplyData.length){
      this.navCtrl.push(VerifyFillingPage,{supplyDetails:this.supplyDetails}) //,supplyData:this.supplyData
    }
    else{
      this.cp.presentAlert('Pehle data bharo tab aage badh paoge')
    }
  }

  editQuantity(){
    let add = this.mdlCtrl.create(ChangeQuantityComponent);
    add.present()
    add.onDidDismiss(data => {
      this.ionViewDidLoad()
    });
  }
}
