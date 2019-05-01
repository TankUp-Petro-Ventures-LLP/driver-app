import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NothingFoundPage');
  }

}
