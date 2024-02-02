
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessBase} from './SSRLoSStrategyProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessUnlimitedRange')
export class ssrLoSStrategyProcessUnlimitedRange extends ssrLoSStrategyProcessBase {
    // @property
    // public "extends" = 'ProcessBase';

    generateAuxiliaryAnglePoint () {
            var sourcePosition = this._losComponentCore.getPosition(); 
            var obstacles = this._losComponentCore.getObstacles(); 
            for (var i = 0, l = obstacles.length; i < l; i ++) { 
                var anglePointArray = obstacles[i].getAnglePointArray(); 
                for (var j = 0, ll = anglePointArray.length; j < ll; j ++) { 
                    var anglePoint = anglePointArray[j]; 
                    if (anglePoint.getType() != ssr.LoS.Constant.ANGLE_POINT_TYPE.ENDPOINT) { 
                        continue; 
                    } 
                    var auxiliaryAnglePointType = this._calculateAuxiliaryAnglePointType(anglePoint); 
                    if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS || 
                        auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) { 
                        var plusRay = ssr.LoS.Helper.generateAuxiliaryRay( 
                            sourcePosition,  
                            anglePoint.getEndPoint(),  
                            ssr.LoS.Constant.IOTA_RADIANS_PLUS_COS,  
                            ssr.LoS.Constant.IOTA_RADIANS_PLUS_SIN,  
                            this._losComponentCore.getSightBoundary().getRectangle().width 
                        ); 
                        var plusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint); 
                        plusRayAnglePoint.init(plusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY); 
                        obstacles[i].addAuxiliaryAnglePoint(plusRayAnglePoint); 
                    } 
                    if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS || 
                        auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) { 
                        var minusRay = ssr.LoS.Helper.generateAuxiliaryRay( 
                            sourcePosition,  
                            anglePoint.getEndPoint(),  
                            ssr.LoS.Constant.IOTA_RADIANS_MINUS_COS,  
                            ssr.LoS.Constant.IOTA_RADIANS_MINUS_SIN,  
                            this._losComponentCore.getSightBoundary().getRectangle().width 
                        ); 
                        var minusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint); 
                        minusRayAnglePoint.init(minusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY); 
                        obstacles[i].addAuxiliaryAnglePoint(minusRayAnglePoint); 
                    } 
                }             
            } 
    }

}
ssr.LoS.Strategy.Process.UnlimitedRange = ssrLoSStrategyProcessUnlimitedRange;
