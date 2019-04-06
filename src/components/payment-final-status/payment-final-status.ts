import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'payment-final-status',
  templateUrl: 'payment-final-status.html'
})
export class PaymentFinalStatusComponent {

  public data

  constructor(private navParam : NavParams) {
    this.data = this.navParam.get('data')
  }




}
