import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';

@Component({
  selector: 'payment-not-collected',
  templateUrl: 'payment-not-collected.html'
})
export class PaymentNotCollectedComponent {

  public form :FormGroup
  public supervisors
  public data
  constructor(private formBuilder :FormBuilder, private viewCtrl : ViewController,public apiTalk:ApiTalkProvider) {

    this.form = this.formBuilder.group({
      approved_by: ['', [Validators.required]],
    });
    this.getEmployees()
  }
  getEmployees(){
    return this.apiTalk.getData(Config.API_URL + '/employee')
    .then(result =>{
      this.supervisors = result['json']
    })
  }

  selectSupervisor(value){
    this.form.value['approved_by'] = value.id
    this.data = value
  }
  save(){
    this.viewCtrl.dismiss({approved_by : this.form.value['approved_by'],data:this.data})
  }

  close(){
    this.viewCtrl.dismiss(false)
  }

}
