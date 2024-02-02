
import { Rect, _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessBase} from './SSRLoSStrategyPreProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessUnlimitedRange')
export class ssrLoSStrategyPreProcessUnlimitedRange extends ssrLoSStrategyPreProcessBase {
    _currentRectangle!: null;

    generateBoundary () {
            var rect = null; 
            var sightRect = this._losComponentCore.getSightRect(); 
            var position = this._losComponentCore.getPosition(); 
            if (this._losComponentCore.isAutoGenerateBoundary()) { 
                rect = this._losComponentCore.generateScreenRect(); 
            } 
            else { 
                if (this._losComponentCore.isLockSightBoundary()) { 
                    rect = sightRect; 
                } 
                else { 
                    rect = new Rect( 
                        position.x - sightRect.width / 2,  
                        position.y - sightRect.height / 2,  
                        sightRect.width,  
                        sightRect.height 
                    ) 
                } 
            } 
            return new ssr.LoS.Data.BoundaryRectangle(rect); 
    }

}
ssr.LoS.Strategy.PreProcess.UnlimitedRange  = ssrLoSStrategyPreProcessUnlimitedRange;
