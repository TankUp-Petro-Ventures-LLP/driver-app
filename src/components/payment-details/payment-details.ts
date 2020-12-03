import { Component, Input } from '@angular/core';

/**
 * Generated class for the PaymentDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'payment-details',
  templateUrl: 'payment-details.html'
})
export class PaymentDetailsComponent {
@Input('paymentData') paymentData
  text: string;

  constructor() {
    console.log('Hello PaymentDetailsComponent Component');
    this.text = 'Hello World';
    let timeout= setTimeout( () => {
      console.log(this.paymentData)
 }, 1000 );
   
  }


}
