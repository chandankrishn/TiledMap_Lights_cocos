
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessLimitedRange } from './SSRLoSStrategyProcessLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessLimitedRangeWithNonFullAngle')
export class ssrLoSStrategyProcessLimitedRangeWithNonFullAngle extends ssrLoSStrategyProcessLimitedRange {
    // @property
    // public "extends" = 'ProcessLimitedRange';

    sortAnglePointArray () {
    		this._super(); 
            var edges = this._losComponentCore.getSightBoundary().getEdges(); 
            var sourcePosition = this._losComponentCore.getPosition(); 
            var startAngle = ssr.LoS.Helper.pToAngle(edges[0], sourcePosition); 
            var endAngle = ssr.LoS.Helper.pToAngle(edges[1], sourcePosition); 
            if (startAngle > endAngle) { 
                this._sortAnglePointArrayFromStartToEnd(startAngle, endAngle); 
            } 
    }

    _isAnglePointCollinearWithEdges (anglePoint: any) {
            var sourcePosition = this._losComponentCore.getPosition(); 
            var edge1 = this._losComponentCore.getSightBoundary().getEdges()[0]; 
            var edge2 = this._losComponentCore.getSightBoundary().getEdges()[1]; 
            if (ssr.LoS.Helper.isCollinearAndSameDirection(anglePoint.getEndPoint(), edge1, sourcePosition) ||  
                ssr.LoS.Helper.isCollinearAndSameDirection(anglePoint.getEndPoint(), edge2, sourcePosition)) { 
                return true; 
            } 
            else { 
                return false; 
            } 
    }

}
ssr.LoS.Strategy.Process.LimitedRangeWithNonFullAngle = ssrLoSStrategyProcessLimitedRangeWithNonFullAngle;
