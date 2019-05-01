import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogInPage } from './log-in';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LogInPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LogInPage),
  ],
})
export class LogInPageModule {}
