import { Component } from '@angular/core';
import { NavParams, ViewController, Platform } from 'ionic-angular';

@Component({
  selector: 'payment-final-status',
  templateUrl: 'payment-final-status.html'
})
export class PaymentFinalStatusComponent {

  public data
  private backButtonUnregister: any;

  constructor(private navParam : NavParams, private viewCtrl : ViewController,public platform: Platform) {
    this.data = this.navParam.get('data')
    this.backButtonUnregister = platform.registerBackButtonAction(() => {});

  }

  complete(){
    this.viewCtrl.dismiss(this.data.data.amount)
  }
  ionViewWillLeave() {
    this.backButtonUnregister();
  }

}
