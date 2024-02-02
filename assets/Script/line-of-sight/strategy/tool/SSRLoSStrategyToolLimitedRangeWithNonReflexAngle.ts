
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyToolLimitedRangeWithNonFullAngle } from './SSRLoSStrategyToolLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolLimitedRangeWithNonReflexAngle')
export class ssrLoSStrategyToolLimitedRangeWithNonReflexAngle  extends ssrLoSStrategyToolLimitedRangeWithNonFullAngle{
    
}
ssr.LoS.Strategy.Tool.LimitedRangeWithNonReflexAngle = ssrLoSStrategyToolLimitedRangeWithNonFullAngle;
