import { OrderPage } from "../pages/order/order";
import { VendorFillingPage } from "../pages/vendor-filling/vendor-filling";
import { NothingFoundPage } from "../pages/nothing-found/nothing-found";

export class OperationFactory{
    private type : eTankUpOperation
    constructor(type : eTankUpOperation){
        this.type = eTankUpOperation[type]
    }

    get(){
        if(this.type == eTankUpOperation.supply){
            return  OrderPage
        }
        else if(this.type == eTankUpOperation.filling){
            return VendorFillingPage
        }
        else if(this.type == eTankUpOperation.notfound){
            return NothingFoundPage
        }
    }
}



export enum eTankUpOperation{
    supply = 'supply',
    filling = 'filling',
    payment = 'payment',
    notfound = 'notfound'
}