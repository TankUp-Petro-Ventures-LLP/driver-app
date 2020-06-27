export class Config{
    static _API_URL : string = 'http://13.126.96.232:3000/api/';

    static API_URL = 'http://13.126.96.232:3000/api-v3';
    // static API_URL = 'http://192.168.0.169:3000/api-v3';

    static METER_URL = (vehicle_id) => {
        return 'vehicle/'+vehicle_id+'/meter';
    }
    static VEHICLE_ID; //new
    static order_status_id_for_complete = 1
    static driver = '/driver-app'
    static VEHICLE_URL = 'vehicle/';

    //---------Logos---------//
    static tankUpLogo ='../assets/imgs/tankupLogo.png'
    static money = 'assets/icon/money-bag.png'
    static pump = 'assets/icon/dispenser.png'
    static cheque = 'assets/icon/cheque.png'

    
    static makeCall(number : number){
        let location ='tel:+91'+number+'';
        window.location.href = location;
        return;
    }

}
export enum eAuthType{
    driver = 'driver'
}