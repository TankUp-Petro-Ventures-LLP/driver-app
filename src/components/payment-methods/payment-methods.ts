import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';

@Component({
  selector: 'payment-methods',
  templateUrl: 'payment-methods.html'
})
export class PaymentMethodsComponent {
  @Input('data') paymentData
  @Output('result')  emit = new EventEmitter()

  public payment_methods
  public method

  constructor(public apiTalk:ApiTalkProvider) {
    this.getPaymentMethods()
  }
  
  ionViewDidLoad() {
  }
  getPaymentMethods(){
    return this.apiTalk.getData(Config.API_URL  + '/payment/option')
    .then(res =>{
      this.payment_methods = res['json']
      console.log(this.payment_methods)
      for(let i=0;i<this.payment_methods.length;i++){
        if(this.payment_methods[i].id == this.paymentData.payment_mode){
          this.method = this.payment_methods[i]
          break
        }
      }      
    })
  }
  emitData(method){
    this.method = method
    this.emitMethod()
  }
  emitMethod(){
    this.emit.emit(this.method)
  }
}
