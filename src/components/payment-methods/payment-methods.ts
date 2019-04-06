import { Component, Input } from '@angular/core';

@Component({
  selector: 'payment-methods',
  templateUrl: 'payment-methods.html'
})
export class PaymentMethodsComponent {
  @Input('default') default
  public selectOptions = {
    title: 'Payment Methods'
  }

  public methods = [
    {name : 'cod', id:1},
    {name : 'cheque', id:2},
    {name : 'neft', id :3}
  ]

  constructor() {
    this.default = this.methods[0]
  }

  ionViewDidLoad() {
  }


}
