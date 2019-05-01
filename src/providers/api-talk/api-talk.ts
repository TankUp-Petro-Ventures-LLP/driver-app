import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { ComponentsProvider } from '../components/components';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import { eAuthType } from '../../configuration/config';

@Injectable()
export class ApiTalkProvider {
  public token: string;
  constructor(public http: Http, private cp : ComponentsProvider, private storage : Storage, public app: App) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

 async login(passed_url, data){
    let headers = new Headers({'Content-type' : 'application/json'});
    let options = new  RequestOptions({ headers: headers });
    return this.http
      .post(passed_url, (data),options)
      .toPromise()
      .then(res => {
         res['json'] = JSON.parse(res['_body'])
         return res
      })
      .catch(Error => {
         Error['json'] = JSON.parse(Error['_body'])
         return Error
      })
  }

  async getData(passed_url){
    let sppu = passed_url.split("?")
    if(sppu.length > 1){
      passed_url += '&source=driverapp'
    }
    else{
      passed_url += '?source=driverapp'
    }

    let currentUser = await this.cp.storageGet('user')
    let token = currentUser && currentUser.token;
    token = 'jwt '+token
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.set('Authorization',token)
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(passed_url) //,options
      .toPromise()
      .then(res => {
        res['json'] = JSON.parse(res['_body'])
        return res
      })
      .catch(Error => {
        if(Error['status'] == 401) this.logout()
          Error['json'] = JSON.parse(Error['_body'])
          return Error
      });
  }

  async putData(passed_url, data){
    let sppu = passed_url.split("?")
    if(sppu.length > 1){
      passed_url += '&source=driverapp'
    }
    else{
      passed_url += '?source=driverapp'
    }
    // let currentUser = await this.cp.storageGet('user')
    // let token = currentUser && currentUser.token;
    // token = 'jwt '+token
    let headers = new Headers({ 'Content-Type': 'application/json'});
    // headers.set('Authorization',token)
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(passed_url, JSON.stringify(data), options )//
      .toPromise( )
      .then(res => {
         res['json'] = JSON.parse(res['_body'])
         return res
       })
      .catch(Error => {
       if(Error['status'] == 401) this.logout()
         Error['json'] = JSON.parse(Error['_body'])
         return Error
      });
  }

  async postData(passed_url, data){
    let sppu = passed_url.split("?")
    if(sppu.length > 1){
      passed_url += '&source=driverapp'
    }
    else{
      passed_url += '?source=driverapp'
    }
    // let currentUser = await this.cp.storageGet('user')
    // let token = currentUser && currentUser.token;
    // token = 'jwt '+token
    let headers = new Headers({'Content-type' : 'application/json'});
    // headers.set('Authorization',token)
    let options = new  RequestOptions({ headers: headers });
    return this.http
      .post(passed_url, JSON.stringify(data), options)
      .toPromise()
      .then(res => {
         res['json'] = JSON.parse(res['_body'])
         return res
      })
      .catch(Error => {
       if(Error['status'] == 401) this.logout()
         Error['json'] = JSON.parse(Error['_body'])
         return Error
      })
  }

  async deleteData(passed_url){
    let currentUser = await this.cp.storageGet('user')
    let token = currentUser && currentUser.token;
    token = 'jwt '+token
    let headers = new Headers({'Content-type' : 'application/json'});
    headers.set('Authorization',token)
    let options = new  RequestOptions({ headers: headers });
    return this.http
      .delete(passed_url, options)
      .toPromise()
      .then(res => {
         res['json'] = JSON.parse(res['_body'])
         return res
      })
      .catch(Error => {
       if(Error['status'] == 401) this.logout()
         Error['json'] = JSON.parse(Error['_body'])
         return Error
      })
  }

  async logout(){
    await this.storage.clear()
  }

}
