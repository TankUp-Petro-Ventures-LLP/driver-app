import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderPageModule } from '../pages/order/order.module';
import { SalePageModule } from '../pages/sale/sale.module';
import { PaymentPageModule } from '../pages/payment/payment.module';
import { LogInPageModule } from '../pages/log-in/log-in.module';
import { ApiTalkProvider } from '../providers/api-talk/api-talk';
import { ComponentsProvider } from '../providers/components/components';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SetVehiclePageModule } from '../pages/set-vehicle/set-vehicle.module';
import { MeterReadingPageModule } from '../pages/meter-reading/meter-reading.module';

import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { VendorFillingPageModule } from '../pages/vendor-filling/vendor-filling.module';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { OnAppLoad } from '../classes/on.app.load';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {Firebase} from '@ionic-native/firebase'
import { FcmProvider } from '../providers/fcm/fcm';
import { NothingFoundPageModule } from '../pages/nothing-found/nothing-found.module';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { HardZeroPageModule } from '../pages/hard-zero/hard-zero.module';
import { Home2PageModule } from '../pages/home2/home2.module';
import { OrderSummaryPageModule } from '../pages/order-summary/order-summary.module';
import { VerifyFillingPageModule } from '../pages/verify-filling/verify-filling.module';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OtpPageModule } from '../pages/otp/otp.module';


var firebase = {
    apiKey: "AIzaSyAqQFMofT5a0wKV3kn3yZoLyVsnuFmI7v0",
      authDomain: "tankup-driver-app-60e91.firebaseapp.com",
      databaseURL: "https://tankup-driver-app-60e91.firebaseio.com",
      projectId: "tankup-driver-app-60e91",
      storageBucket: "tankup-driver-app-60e91.appspot.com",
      messagingSenderId: "860273701577"
  };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false, 
      autoFocusAssist: false}),
    IonicStorageModule.forRoot(
      {
        name: 'driverApp',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    OrderPageModule, SalePageModule,PaymentPageModule,LogInPageModule,
    SetVehiclePageModule,
    MeterReadingPageModule,VendorFillingPageModule,NothingFoundPageModule,
    HardZeroPageModule,Home2PageModule,OrderSummaryPageModule,VerifyFillingPageModule,OtpPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiTalkProvider,
    ComponentsProvider,
    Uid,
    AndroidPermissions,
    Keyboard,
    Geolocation,
    LocationAccuracy,
    OnAppLoad,
    FcmProvider,
    Firebase,
    Camera,
    File,
    BackgroundMode
  ]
})
export class AppModule {}
