
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyToolBase } from './SSRLoSStrategyToolBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolLimitedRange')
export class ssrLoSStrategyToolLimitedRange extends ssrLoSStrategyToolBase {

    isPointVisible (targetPoint: any) {
        	return this._super(targetPoint); 
    }

}

ssr.LoS.Strategy.Tool.LimitedRange  = ssrLoSStrategyToolLimitedRange;
