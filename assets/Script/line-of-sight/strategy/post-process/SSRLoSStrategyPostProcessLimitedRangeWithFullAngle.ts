
import { _decorator, macro } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPostProcessLimitedRange } from './SSRLoSStrategyPostProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessLimitedRangeWithFullAngle')
export class ssrLoSStrategyPostProcessLimitedRangeWithFullAngle extends ssrLoSStrategyPostProcessLimitedRange {
    // @property
    // public "extends" = 'PostProcessLimitedRange';

    process () {
            if (this._losComponentCore.getHitPointArray().length == 0) { 
                var verts = ssr.LoS.Helper.arcToSegments(this._losComponentCore.getPosition(), this._losComponentCore.getRadius(), 0, 360 * macro.RAD, parseInt((360 * macro.RAD * ssr.LoS.Constant.SEGMENT_PER_RADIANS).toString()), false); 
                verts.pop(); 
                this._losComponentCore.getSightArea().push(verts); 
            } 
            else { 
                this._super(); 
            } 
    }

}

ssr.LoS.Strategy.PostProcess.LimitedRangeWithFullAngle = ssrLoSStrategyPostProcessLimitedRangeWithFullAngle;
