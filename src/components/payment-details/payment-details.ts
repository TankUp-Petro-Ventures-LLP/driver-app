import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello PaymentDetailsComponent Component');
    this.text = 'Hello World';
  }

}
