import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ComponentsProvider } from '../../providers/components/components';
/**
 * Generated class for the NothingFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nothing-found',
  templateUrl: 'nothing-found.html',
})
export class NothingFoundPage {
  public data

  constructor(public navCtrl: NavController,private cp :ComponentsProvider, public navParams: NavParams, public viewCtrl: ViewController) {
    this.data = navParams.get('data'); 
  }
  ionViewDidLoad() {}

  back(){

    this.cp.presentLoadingText()
    this.viewCtrl.dismiss();
    this.cp.dismisLoading()
  
  }

}
