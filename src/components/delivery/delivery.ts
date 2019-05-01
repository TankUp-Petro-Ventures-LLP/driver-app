import { Component, Input } from '@angular/core';
import { Config } from '../../configuration/config';

@Component({
  selector: 'delivery',
  templateUrl: 'delivery.html'
})
export class DeliveryComponent {
  @Input('supplyData') supplyData

  constructor() {
  }

  ionViewDidLoad() {
 
  }
  call(number){
    Config.makeCall(number);
  }


}
