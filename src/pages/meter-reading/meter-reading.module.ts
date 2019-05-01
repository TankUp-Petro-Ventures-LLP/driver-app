import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeterReadingPage } from './meter-reading';

@NgModule({
  declarations: [
    MeterReadingPage,
  ],
  imports: [
    IonicPageModule.forChild(MeterReadingPage),
  ],
})
export class MeterReadingPageModule {}
