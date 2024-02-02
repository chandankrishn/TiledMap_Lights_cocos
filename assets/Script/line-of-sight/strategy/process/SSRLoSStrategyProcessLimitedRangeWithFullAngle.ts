
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessLimitedRange } from './SSRLoSStrategyProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessLimitedRangeWithFullAngle')
export class ssrLoSStrategyProcessLimitedRangeWithFullAngle extends ssrLoSStrategyProcessLimitedRange  {
    
}
ssr.LoS.Strategy.Process.LimitedRangeWithFullAngle = ssrLoSStrategyProcessLimitedRangeWithFullAngle;
