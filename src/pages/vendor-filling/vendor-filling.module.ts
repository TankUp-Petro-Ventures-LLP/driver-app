import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorFillingPage } from './vendor-filling';

@NgModule({
  declarations: [
    VendorFillingPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorFillingPage),
  ],
})
export class VendorFillingPageModule {}
