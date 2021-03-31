import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ApiTalkProvider } from '../../providers/api-talk/api-talk';
import { Config } from '../../configuration/config';
import { ComponentsProvider } from '../../providers/components/components';

@Component({
  selector: 'payment-methods',
  templateUrl: 'payment-methods.html'
})
export class PaymentMethodsComponent {
  @Input('data') data
  @Output('result')  emit = new EventEmitter()

  public payment_methods
  public method

  constructor(public apiTalk:ApiTalkProvider,public cp: ComponentsProvider) {
  }
  async ngOnInit() {
    await this.getPaymentMethods()
  }
  async getPaymentMethods(){
    console.log(this.data)
    return this.apiTalk.getData(Config.API_URL  + '/payment/option')
    .then(res =>{
      this.payment_methods = res['json']
      console.log(this.payment_methods,"payment method")
      for(let i=0;i<this.payment_methods.length;i++){
        if(this.payment_methods[i].id == this.data.payment_mode){
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
