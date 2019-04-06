import { Component, Input } from '@angular/core';

@Component({
  selector: 'delivery',
  templateUrl: 'delivery.html'
})
export class DeliveryComponent {
  @Input('delivery') delivery : Delivery

  constructor() {
    this.delivery = {
      customer : 'arpit',
      contact : '9450292374',
      address : 'address',
      quantity : 50,
      lat : 10,
      long : 1,
      time_of_delivery : '10:50'
    }
  }

  ionViewDidLoad() {
 
  }

}


interface Delivery{
  customer : string
  contact : string
  address : string
  quantity : any
  lat : any
  long : any
  time_of_delivery : string
}