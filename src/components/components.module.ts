import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { DeliveryComponent } from './delivery/delivery';
import { MessageModalComponent } from './message-modal/message-modal';
import { MessageActionModalComponent } from './message-action-modal/message-action-modal';
import { DispensedComponent } from './dispensed/dispensed';
import { DispenseFormComponent } from './dispense-form/dispense-form';
import { PaymentMethodsComponent } from './payment-methods/payment-methods';
import { PaymentDetailsComponent } from './payment-details/payment-details';
import { PaymentCollectionComponent } from './payment-collection/payment-collection';
import { PaymentNotCollectedComponent } from './payment-not-collected/payment-not-collected';
import { PaymentFinalStatusComponent } from './payment-final-status/payment-final-status';
import { ChangeQuantityComponent} from './change-quantity/change-quantity'
import { OtpByPassComponent } from './otp-by-pass/otp-by-pass';

@NgModule({
	declarations: [DeliveryComponent,
    MessageModalComponent,
    MessageActionModalComponent,
    DispensedComponent,
    DispenseFormComponent,
    PaymentMethodsComponent,
    PaymentDetailsComponent,
    PaymentCollectionComponent,
    PaymentNotCollectedComponent,
    PaymentFinalStatusComponent,
    ChangeQuantityComponent,
    OtpByPassComponent],
	imports: [IonicModule],
	exports: [DeliveryComponent,
	MessageModalComponent,
    MessageActionModalComponent,
    DispensedComponent,
    DispenseFormComponent,
    PaymentMethodsComponent,
    PaymentDetailsComponent,
    PaymentCollectionComponent,
    PaymentNotCollectedComponent,
    PaymentFinalStatusComponent,
    ChangeQuantityComponent,
    OtpByPassComponent],
	entryComponents : [MessageModalComponent,MessageActionModalComponent, DispenseFormComponent,
        PaymentCollectionComponent, PaymentNotCollectedComponent, PaymentFinalStatusComponent,
        ChangeQuantityComponent,OtpByPassComponent]
})
export class ComponentsModule {}
