
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolBase')
export class ssrLoSStrategyToolBase {
    _losComponentCore: any;
    

    constructor () {
            this._losComponentCore = arguments[0]; 
    }

    isPointVisible (targetPoint: any) {
            var sourcePosition = this._losComponentCore.getPosition(); 
            var blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray(); 
            for (var i = 0, l = blockingEdgeArray.length; i < l; i ++) { 
                var blockingEdge = blockingEdgeArray[i]; 
                var testResult = ssr.LoS.Helper.segmentSegmentTest( 
                    sourcePosition,  
                    targetPoint,  
                    blockingEdge.getStartPoint(),  
                    blockingEdge.getEndPoint() 
                ); 
                if (testResult) { 
                    return false; 
                } 
            } 
            return true; 
    }

}
ssr.LoS.Strategy.Tool.Base = ssrLoSStrategyToolBase;
