import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalePage } from './sale';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SalePage,
  ],
  imports: [
    IonicPageModule.forChild(SalePage),
    ComponentsModule
  ],
})
export class SalePageModule {}
