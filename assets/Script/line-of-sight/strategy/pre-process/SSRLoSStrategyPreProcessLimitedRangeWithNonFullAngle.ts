
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessLimitedRange} from './SSRLoSStrategyPreProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle')
export class ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle extends ssrLoSStrategyPreProcessLimitedRange{
    // @property
    // public "extends" = 'PreProcessLimitedRange';

    generateBoundary () {
            return new ssr.LoS.Data.BoundarySector( 
                this._losComponentCore.getPosition(),  
                this._losComponentCore.getRadius(),  
                this._losComponentCore.getDirection(),  
                this._losComponentCore.getCentralAngle() 
            ); 
    }

}
ssr.LoS.Strategy.PreProcess.LimitedRangeWithNonFullAngle = ssrLoSStrategyPreProcessLimitedRangeWithNonFullAngle;
