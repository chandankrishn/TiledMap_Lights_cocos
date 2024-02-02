
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPostProcessLimitedRange } from './SSRLoSStrategyPostProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssr.LoS.Strategy.PostProcess.LimitedRangeWithNonFullAngle')
export class ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle extends ssrLoSStrategyPostProcessLimitedRange  {
    
}

ssr.LoS.Strategy.PostProcess.LimitedRangeWithNonFullAngle = ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle;
