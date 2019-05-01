import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NothingFoundPage } from './nothing-found';

@NgModule({
  declarations: [
    NothingFoundPage,
  ],
  imports: [
    IonicPageModule.forChild(NothingFoundPage),
  ],
})
export class NothingFoundPageModule {}
