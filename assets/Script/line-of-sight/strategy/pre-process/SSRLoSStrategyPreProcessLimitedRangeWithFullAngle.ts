
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessLimitedRange } from './SSRLoSStrategyPreProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessLimitedRangeWithFullAngle')
export class ssrLoSStrategyPreProcessLimitedRangeWithFullAngle extends ssrLoSStrategyPreProcessLimitedRange {
    generateBoundary () {
            return new ssr.LoS.Data.BoundaryCircle( 
                this._losComponentCore.getPosition(),  
                this._losComponentCore.getRadius() 
            ); 
    }

}
ssr.LoS.Strategy.PreProcess.LimitedRangeWithFullAngle = ssrLoSStrategyPreProcessLimitedRangeWithFullAngle;

