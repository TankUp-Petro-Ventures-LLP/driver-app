import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Platform } from "ionic-angular";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Injectable } from "@angular/core";

@Injectable()
export class OnAppLoad {
   

    constructor( private androidPermissions: AndroidPermissions,
        private plt:Platform,
        private locationAccuracy:LocationAccuracy){}

    async execute(){
        if(await this.isCordovaAvailable())
        {
            await this.takeLocationPermission()
            await this.requestLoction()
        }
    }
    async takeLocationPermission(){
          let result = await this.checkAndroidPermission('ACCESS_COARSE_LOCATION')

          if(result.hasPermission){

            return 1
            
          }
          else{
            await this.requestForPermission(['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION'])
          }
    }

    isCordovaAvailable(){
      if (this.plt.is('cordova')) {
        return true
      }
      else return false
    }

    checkAndroidPermission(type){
      return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION[type])
    }

    requestForPermission(type){
      let requestsList = []
      for(let i=0; i < type.length; i++){
        requestsList.push(this.androidPermissions.PERMISSION[type[i]])
      }
      return this.androidPermissions.requestPermissions(requestsList);
    }

    async requestLoction(){
        return this.locationAccuracy.canRequest().then(async (canRequest: boolean) => {
            console.log(canRequest)
          if(canRequest) {
            // the accuracy option will be ignored by iOS
            return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {return true},
              error => {
                //   console.log(error)
                this.requestLoction();
                  return error

              }
            );
          }
        else{
          await this.execute();
        }
        });
    }
}
