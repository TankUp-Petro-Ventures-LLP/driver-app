import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { MessageActionModalComponent } from '../message-action-modal/message-action-modal';
import { MessageConfig } from '../../app/message.config';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'dispense-form',
  templateUrl: 'dispense-form.html'
})
export class DispenseFormComponent {

  public form :FormGroup

  constructor(private viewCtrl : ViewController, private navParam : NavParams, private formBuilder :FormBuilder, private mdlCtrl : ModalController) {

    this.form = this.formBuilder.group({
      tank_number: ['', [Validators.required]],
      tank_reading: ['', [Validators.required]],
      quantity: ['', [Validators.required]] , 
      comment: ['', []]

    });

  }

  saveDispensing(){
    let save = this.mdlCtrl.create(MessageActionModalComponent, {msg : MessageConfig.saveDispensing(this.form.value['quantity'], this.form.value['tank_number'])})
    save.present()

    save.onDidDismiss(data => {
      this.viewCtrl.dismiss()
    })
  }

  close(){
    this.viewCtrl.dismiss()
  }

}
