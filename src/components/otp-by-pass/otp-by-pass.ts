import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';

/**
 * Generated class for the OtpByPassComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'otp-by-pass',
  templateUrl: 'otp-by-pass.html'
})
export class OtpByPassComponent {

  text: string;
  public form :FormGroup

  constructor(public viewCtrl:ViewController, private formBuilder :FormBuilder,public apiTalk:ApiTalkProvider) {
    this.form = this.formBuilder.group({
      name: ['',Validators.compose([ Validators.required])],
      phone_number:['',Validators.compose([ Validators.required,Validators.min(0),Validators.required,Validators.maxLength(10)])] , 
    });
  }
  dismiss(){
    this.viewCtrl.dismiss(false)
  }

  save(){
    this.viewCtrl.dismiss(this.form.value)
  }
}
