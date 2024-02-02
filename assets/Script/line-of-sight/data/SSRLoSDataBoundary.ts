
import { _decorator } from 'cc';
import  ssr  from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataBoundary')
export class ssrLoSDataBoundary {
    _type: any;
    constructor () {
            this._type = arguments[0]; 
    }

    getType () {
            return this._type; 
    }

}


ssr.LoS.Data.Boundary = ssrLoSDataBoundary;
