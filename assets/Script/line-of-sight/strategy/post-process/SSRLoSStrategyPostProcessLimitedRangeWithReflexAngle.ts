
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import {   ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle} from './SSRLoSStrategyPostProcessLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssr.LoS.Strategy.PostProcess.LimitedRangeWithReflexAngle')
export class ssrLoSStrategyPostProcessLimitedRangeWithReflexAngle extends ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle {
    // @property
    // public "extends" = 'PostProcessLimitedRangeWithNonFullAngle';
}
ssr.LoS.Strategy.PostProcess.LimitedRangeWithReflexAngle = ssrLoSStrategyPostProcessLimitedRangeWithReflexAngle;
