
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessLimitedRangeWithNonFullAngle } from './SSRLoSStrategyProcessLimitedRangeWithNonFullAngle';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessLimitedRangeWithNonReflexAngle')
export class ssrLoSStrategyProcessLimitedRangeWithNonReflexAngle extends ssrLoSStrategyProcessLimitedRangeWithNonFullAngle {
    // @property
    // public "extends" = 'ProcessLimitedRangeWithNonFullAngle';
}
ssr.LoS.Strategy.Process.LimitedRangeWithNonReflexAngle = ssrLoSStrategyProcessLimitedRangeWithNonReflexAngle;
