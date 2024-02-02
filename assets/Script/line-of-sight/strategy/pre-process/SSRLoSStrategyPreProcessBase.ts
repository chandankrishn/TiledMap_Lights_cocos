
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessBase')
export class ssrLoSStrategyPreProcessBase {
//     @property
//     public "extends" = null;
        _losComponentCore: any;

    constructor () {
            this._losComponentCore = arguments[0]; 
    }

    generateBoundary () {
            return null; 
    }

}
ssr.LoS.Strategy.PreProcess.Base = ssrLoSStrategyPreProcessBase;
