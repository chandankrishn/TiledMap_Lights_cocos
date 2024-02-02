
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle } from './SSRLoSStrategyPreProcessLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessLimitedRangeWithNonReflexAngle')
export class ssrLoSStrategyPreProcessLimitedRangeWithNonReflexAngle extends ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle {
   
}
ssr.LoS.Strategy.PreProcess.LimitedRangeWithNonReflexAngle = ssrLoSStrategyPreProcessLimitedRangeWithNonReflexAngle;

