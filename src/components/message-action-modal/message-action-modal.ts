import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'message-action-modal',
  templateUrl: 'message-action-modal.html'
})
export class MessageActionModalComponent {

  public msg


  constructor(private viewCtrl : ViewController, private navParam : NavParams) {
    this.msg = this.navParam.get('msg')
    // this.msg = {
    //   heading: "Hello",
    //   message: "OTP has been sent to your Registered Mobile Number",
    //   button: {accept : 'ok', decline : 'Cancel'}
    // }


  }

  accept(){
    this.viewCtrl.dismiss(true)
  }

  decline(){
    this.viewCtrl.dismiss(false)
  }

}
