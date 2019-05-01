import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in';
import { ComponentsProvider } from '../providers/components/components';
import { SetVehiclePage } from '../pages/set-vehicle/set-vehicle';
import { MeterReadingPage } from '../pages/meter-reading/meter-reading';
import { OnAppLoad } from '../classes/on.app.load';
import { HardZeroPage } from '../pages/hard-zero/hard-zero';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { OtpPage } from '../pages/otp/otp';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public cp:ComponentsProvider,
    public menuCtrl:MenuController, private onAppload : OnAppLoad,public alertCtrl:AlertController,private ionicApp : IonicApp) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Hard Zero', component: HardZeroPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.menuCtrl.enable(false)
      this.setRootPage()
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#F76B1C');
      this.splashScreen.hide();
      this.onAppload.execute()
      this.appExitStrategy()

    });
  }

  public showedAlert : boolean
  public confirmAlert;
  appExitStrategy(){
    this.showedAlert = false;

        // Confirm exit
        this.platform.registerBackButtonAction(() => {
            // let activeModal=this.ionicApp._modalPortal.getActive();


            let activeModal = this.ionicApp._loadingPortal.getActive() ||
            this.ionicApp._modalPortal.getActive() ||
            this.ionicApp._toastPortal.getActive() ||
            this.ionicApp._overlayPortal.getActive();


            
            if (this.nav.length() == 1 && !activeModal) {
                if (!this.showedAlert) {
                    this.confirmExitApp();
                } else {
                    this.showedAlert = false;
                    this.confirmAlert.dismiss();
                }
            }

            if(this.nav.canGoBack() && !activeModal) { // CHECK IF THE USER IS IN THE ROOT PAGE.
              this.nav.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
              return
            }

            // let activeModal=this.ionicApp._modalPortal.getActive();
            if(activeModal){
              activeModal.dismiss();
              return;
            }

            // this.nav.pop();
        });
  }

  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this.alertCtrl.create({
        title: "Exit",
        message: "Press Ok to exit.",
        buttons: [
            {
                text: 'cancel',
                handler: () => {
                    this.showedAlert = false;
                    return;
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    this.platform.exitApp();
                }
            }
        ]
    });
    this.confirmAlert.present();
  }

  async setRootPage(){
    let vehicle = await this.cp.storageGet('vehicle_id')
    let user = await this.cp.storageGet('user')
    let readings = await this.cp.storageGet('readings')

    if(vehicle && user && readings) this.rootPage = HomePage
    else if(vehicle && user) this.rootPage = MeterReadingPage
    else if(vehicle) this.rootPage = LogInPage
    else this.rootPage = SetVehiclePage
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
