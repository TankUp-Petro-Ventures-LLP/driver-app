import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'payment-not-collected',
  templateUrl: 'payment-not-collected.html'
})
export class PaymentNotCollectedComponent {

  public form :FormGroup
  public supervisors = [
    {id : 1, name : "Indresh"},
    {id : 2, name : "Sonatosh"}
  ]

  constructor(private formBuilder :FormBuilder, private viewCtrl : ViewController) {

    this.form = this.formBuilder.group({
      supervisor: ['', [Validators.required]],
    });

  }

  save(){
    this.viewCtrl.dismiss({supervisor : this.form.value['supervisor']})
  }

  close(){
    this.viewCtrl.dismiss(false)
  }

}
