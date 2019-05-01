import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { DispenseFormComponent } from '../dispense-form/dispense-form';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';


@Component({
  selector: 'dispensed',
  templateUrl: 'dispensed.html'
})
export class DispensedComponent {
@Input('supplyData') supplyData
@Input('edit') editButton

@Output('result')  emit = new EventEmitter()
public data 

  constructor(public mdlCtrl:ModalController,public apiTalk:ApiTalkProvider) {
  }
  ionViewDidLoad(){

  }
  edit(data){
    let add = this.mdlCtrl.create(DispenseFormComponent,{data:data})
    add.present()
    add.onDidDismiss(async data => {
      if(data){
        this.data = data
        await this.updateFilling()
      }
    });
  }
  
  updateFilling(){
    let edited_quantity = this.data.changed_quantity
    this.data['changed_quantity'] = edited_quantity
    console.log(this.data)
    return this.apiTalk.putData(Config.API_URL + '/customer-tank?id='+this.data.id,this.data)
    .then(result =>{
      this.reload()
    })
  }

  reload(){
    this.emit.emit(true)
  }

  delete(){

  }
}
