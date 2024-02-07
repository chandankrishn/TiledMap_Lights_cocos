
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyToolLimitedRange } from './SSRLoSStrategyToolLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolLimitedRangeWithNonFullAngle')
export class ssrLoSStrategyToolLimitedRangeWithNonFullAngle extends ssrLoSStrategyToolLimitedRange {


    isPointVisible(targetPoint: any) {
        let inclusionTestResult = ssr.LoS.Helper.pointNonReflexSectorInclusionTest(
            targetPoint,
            this._losComponentCore.getSightBoundary()
        );
        if (inclusionTestResult != ssr.LoS.Constant.POINT_SECTOR_TEST.IN) {
            return false;
        }
        return this._super(targetPoint);
    }

}

ssr.LoS.Strategy.Tool.LimitedRangeWithNonFullAngle = ssrLoSStrategyToolLimitedRangeWithNonFullAngle;
