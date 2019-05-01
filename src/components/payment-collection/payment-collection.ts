import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'payment-collection',
  templateUrl: 'payment-collection.html'
})
export class PaymentCollectionComponent {

  public form :FormGroup


  constructor(private formBuilder :FormBuilder, private viewCtrl : ViewController) {

    this.form = this.formBuilder.group({
      amount: ['', [Validators.required,Validators.min(1)]],
    });

  }

  saveAmount(){
    this.viewCtrl.dismiss({amount : this.form.value['amount']})
  }

  close(){
    this.viewCtrl.dismiss(false)
  }


}
