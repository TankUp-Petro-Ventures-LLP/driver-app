import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyFillingPage } from './verify-filling';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VerifyFillingPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyFillingPage),
    ComponentsModule
  ],
})
export class VerifyFillingPageModule {}
