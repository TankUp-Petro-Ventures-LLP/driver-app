import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'message-modal',
  templateUrl: 'message-modal.html'
})
export class MessageModalComponent {
  public msg


  constructor(private viewCtrl : ViewController, private navParam : NavParams) {
    this.msg = this.navParam.get('msg')
    // this.msg = {
    //   heading: "Hello",
    //   message: "OTP has been sent to your Registered Mobile Number",
    //   button: "Ok"
    // }


  }

  dissmiss(){
    this.viewCtrl.dismiss()
  }

}


// interface MsgBody {
//   heading? : string,
//   message : string,
//   button? 
// }
