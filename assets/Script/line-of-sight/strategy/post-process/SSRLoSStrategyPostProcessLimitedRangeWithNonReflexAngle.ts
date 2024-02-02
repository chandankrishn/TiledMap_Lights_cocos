
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import {  ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle } from './SSRLoSStrategyPostProcessLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessLimitedRangeWithNonReflexAngle')
export class ssrLoSStrategyPostProcessLimitedRangeWithNonReflexAngle extends  ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle{
    // @property
    // public "extends" = 'PostProcessLimitedRangeWithNonFullAngle';
}

ssr.LoS.Strategy.PostProcess.LimitedRangeWithNonReflexAngle = ssrLoSStrategyPostProcessLimitedRangeWithNonFullAngle;
