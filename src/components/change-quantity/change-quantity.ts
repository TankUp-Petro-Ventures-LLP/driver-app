import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { ViewController ,TextInput} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
/**
 * Generated class for the ChangeQuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'change-quantity',
  templateUrl: 'change-quantity.html'
})
export class ChangeQuantityComponent {
  @ViewChild('input') myInput : TextInput
  public quantity;
  text: string;

  constructor(private viewCtrl : ViewController, private keyboard: Keyboard) {  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.keyboard.show();
      this.myInput.setFocus();
    },800)
  }

  close() {
    this.viewCtrl.dismiss();
  }
  
  submit() {
    this.viewCtrl.dismiss(this.quantity);
  }
  revert(){
  this.viewCtrl.dismiss()
  }
}
