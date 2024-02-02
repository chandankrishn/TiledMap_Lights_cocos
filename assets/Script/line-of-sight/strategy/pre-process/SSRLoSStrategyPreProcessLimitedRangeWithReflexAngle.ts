
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle } from './SSRLoSStrategyPreProcessLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessLimitedRangeWithReflexAngle')
export class ssrLoSStrategyPreProcessLimitedRangeWithReflexAngle extends ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle {
    // @property
    // public "extends" = 'PreProcessLimitedRangeWithNonFullAngle';
}

ssr.LoS.Strategy.PreProcess.LimitedRangeWithReflexAngle = ssrLoSStrategyPreProcessLimitedRangeWithReflexAngle;

