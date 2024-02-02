
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessBase } from './SSRLoSStrategyProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessLimitedRange')
export class ssrLoSStrategyProcessLimitedRange extends ssrLoSStrategyProcessBase {
    // @property
    // public "extends" = 'ProcessBase';

    generateAuxiliaryAnglePoint () {
            var sourcePosition = this._losComponentCore.getPosition(); 
            var radius = this._losComponentCore.getRadius(); 
            var obstacles = this._losComponentCore.getObstacles(); 
            for (var i = 0, l = obstacles.length; i < l; i ++) { 
                var anglePointArray = obstacles[i].getAnglePointArray(); 
                for (var j = 0, ll = anglePointArray.length; j < ll; j ++) { 
                    var anglePoint = anglePointArray[j]; 
                    if (anglePoint.getType() != ssr.LoS.Constant.ANGLE_POINT_TYPE.ENDPOINT || 
                        this._isAnglePointCollinearWithEdges(anglePoint)) { 
                        continue; 
                    } 
                    var auxiliaryAnglePointType = this._calculateAuxiliaryAnglePointType(anglePoint); 
                    if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS || 
                        auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) { 
                        var plusRay = ssr.LoS.Helper.generateAuxiliaryRay( 
                            sourcePosition,  
                            anglePoint.getEndPoint(),  
                            ssr.LoS.Constant.IOTA_RADIANS_PLUS_COS,  
                            ssr.LoS.Constant.IOTA_RADIANS_PLUS_SIN 
                        ); 
                        var normalizeV = ssr.LoS.Helper.pNormalize(plusRay, sourcePosition); 
                        plusRay.x = sourcePosition.x + normalizeV.x * radius; 
                        plusRay.y = sourcePosition.y + normalizeV.y * radius; 
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
                            ssr.LoS.Constant.IOTA_RADIANS_MINUS_SIN 
                        ); 
                        var normalizeV = ssr.LoS.Helper.pNormalize(minusRay, sourcePosition); 
                        minusRay.x = sourcePosition.x + normalizeV.x * radius; 
                        minusRay.y = sourcePosition.y + normalizeV.y * radius; 
                        var minusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint); 
                        minusRayAnglePoint.init(minusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY); 
                        obstacles[i].addAuxiliaryAnglePoint(minusRayAnglePoint); 
                    } 
                } 
            } 
    }

    _sortAnglePointArrayFromStartToEnd (angleStart: any, angleEnd: any) {
            var anglePointArray = this._losComponentCore.getAnglePointArray(); 
            var angleIndex = anglePointArray.map(function(e) { return e.getAngle(); }).indexOf(angleStart); 
            var toMoveArray = anglePointArray.splice(angleIndex); 
            for (var i = toMoveArray.length - 1; i >= 0; i --) { 
                anglePointArray.unshift(toMoveArray[i]); 
            } 
    }

    _isAnglePointCollinearWithEdges (anglePoint: any) {
            return false; 
    }

    _removePossibleRedundantHitPoints () {
            var hitPointArray = this._losComponentCore.getHitPointArray(); 
            if (hitPointArray.length > 2) { 
                var firstHitPoint = hitPointArray[0]; 
                var lastHitPoint = hitPointArray[hitPointArray.length - 1]; 
                if (firstHitPoint.getType() != ssr.LoS.Constant.HIT_POINT_TYPE.ENDPOINT  
                    && ssr.LoS.Helper.getSameEdgeID(firstHitPoint, lastHitPoint) > 0) { 
                    ssr.LoS.Data.Manager.getInstance().free(firstHitPoint); 
                    hitPointArray.shift(); 
                } 
                if (lastHitPoint.getType() != ssr.LoS.Constant.HIT_POINT_TYPE.ENDPOINT &&  
                    ssr.LoS.Helper.getSameEdgeID(firstHitPoint, lastHitPoint) > 0) { 
                    ssr.LoS.Data.Manager.getInstance().free(lastHitPoint); 
                    hitPointArray.pop(); 
                } 
            } 
    }

}
ssr.LoS.Strategy.Process.LimitedRange = ssrLoSStrategyProcessLimitedRange;

