
import { Vec2, _decorator, macro } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessBase')
export class ssrLoSStrategyProcessBase {
    _losComponentCore: any;
    // @property
    // public "extends" = null;

    constructor () {
            this._losComponentCore = arguments[0]; 
    }

    _calculateAuxiliaryAnglePointType (anglePoint: any) {
            var prepX = anglePoint.getEndPoint().x - this._losComponentCore.getPosition().x; 
            var prepY = this._losComponentCore.getPosition().y - anglePoint.getEndPoint().y; 
            var p1 = null; 
            var p2 = null; 
            if (anglePoint.getPrevEdge()) {    
                p1 = (anglePoint.getPrevEdge().getEdgeVector().x * prepY) + (anglePoint.getPrevEdge().getEdgeVector().y * prepX); 
            } 
            if (anglePoint.getNextEdge()) { 
                p2 = (anglePoint.getNextEdge().getEdgeVector().x * prepY) + (anglePoint.getNextEdge().getEdgeVector().y * prepX); 
            } 
            if (p1 != null && p2 != null) { 
                if ((p1 >= 0) && (p2 <= 0)) { 
                    return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS; 
                } 
                else if ((p1 <= 0) && (p2 >= 0)) { 
                    return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS; 
                } 
                else { 
                    return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.NONE; 
                } 
            } 
            else { 
                if (p2 == null && p1!=null) { 
                    if (p1 > 0) { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS; 
                    } 
                    else if (p1 < 0) { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS; 
                    } 
                    else { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH; 
                    } 
                } 
                if (p1 == null && p2!=null) { 
                    if (p2 < 0) { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS; 
                    } 
                    else if (p2 > 0) { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS; 
                    } 
                    else { 
                        return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH; 
                    } 
                } 
            } 
            return ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.NONE; 
    }

    generateAuxiliaryAnglePoint () {
    }

    packAnglePoints () {
            var obstacles = this._losComponentCore.getObstacles(); 
            var anglePointArray = this._losComponentCore.getAnglePointArray(); 
            for (var i = 0, l = obstacles.length; i < l; i ++) { 
                obstacles[i].getAnglePointArray().forEach(function(v: any) {this.push(v)}, anglePointArray);  
                obstacles[i].getAnglePointAuxiliaryArray().forEach(function(v: any) {this.push(v)}, anglePointArray);  
            } 
            var obstacle = this._losComponentCore.getBoundaryObstacle(); 
            obstacle.getAnglePointArray().forEach(function(v : any) {this.push(v)}, anglePointArray);  
            obstacle.getAnglePointAuxiliaryArray().forEach(function(v : any) {this.push(v)}, anglePointArray);  
    }

    packPotentialBlockingEdges () {
            var obstacles = this._losComponentCore.getObstacles(); 
            var potentialBlockingEdgeArray = this._losComponentCore.getPotentialBlockingEdgeArray(); 
            var potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap(); 
            for (var i = 0, l = obstacles.length; i < l; i ++) { 
                obstacles[i].getPotentialBlockingEdgeArray().forEach(function(v) {this.push(v)}, potentialBlockingEdgeArray); 
            } 
            var obstacle = this._losComponentCore.getBoundaryObstacle(); 
            obstacle.getPotentialBlockingEdgeArray().forEach(function(v) {this.push(v)}, potentialBlockingEdgeArray); 
            for (var i = 0, l = potentialBlockingEdgeArray.length; i < l; i ++) { 
                potentialBlockingEdgeMap[potentialBlockingEdgeArray[i].getEdgeID().toString()] = potentialBlockingEdgeArray[i]; 
            } 
    }

    sortAnglePointArray () {
            var anglePointArray = this._losComponentCore.getAnglePointArray(); 
    		if (anglePointArray.length <= 0) { 
                return; 
            } 
            var self = this; 
            var sourcePosition = this._losComponentCore.getPosition(); 
            for (var i = 0, l = anglePointArray.length; i < l; i ++) { 
                anglePointArray[i].setAngle( 
                    ssr.LoS.Helper.pToAngle(anglePointArray[i].getEndPoint(), sourcePosition) 
                ); 
            } 
            anglePointArray.sort(function(a, b) { 
                return a.getAngle() - b.getAngle(); 
            }); 
    }

    _canMergeRays (angleA: any, angleB: any) {
            return (Math.abs(angleA - angleB) < macro.FLT_EPSILON); 
    }

    generateRays () {
            var anglePointArray = this._losComponentCore.getAnglePointArray(); 
    		if (anglePointArray.length <= 0) { 
                return; 
            } 
            var rayArray = this._losComponentCore.getRayArray(); 
            var sourcePosition = this._losComponentCore.getPosition(); 
            var ray = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.Ray); 
            ray.init( 
                anglePointArray[0].getEndPoint(),  
                anglePointArray[0].getEdgeIDs(),  
                anglePointArray[0].getType(),  
                anglePointArray[0].getAngle() 
            ); 
            ray.setDistanceSQ(ssr.LoS.Helper.pDistanceSQ(anglePointArray[0].getEndPoint(), sourcePosition)); 
            rayArray.push(ray); 
            for (var i = 1, j = 0, n = anglePointArray.length; i < n; i ++) { 
                if (!this._canMergeRays(anglePointArray[i].getAngle(), rayArray[j].getAngle())) { 
                    ray = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.Ray); 
                    ray.init( 
                        anglePointArray[i].getEndPoint(),  
                        anglePointArray[i].getEdgeIDs(),  
                        anglePointArray[i].getType(),  
                        anglePointArray[i].getAngle() 
                    ); 
                    anglePointArray[i].setDistanceSQ(ssr.LoS.Helper.pDistanceSQ(anglePointArray[i].getEndPoint(), sourcePosition)); 
                    ray.setDistanceSQ(anglePointArray[i].getDistanceSQ()); 
                    rayArray.push(ray); 
                    j ++; 
                } 
                else { 
                    var distanceSQ = ssr.LoS.Helper.pDistanceSQ(anglePointArray[i].getEndPoint(), sourcePosition); 
                    if (rayArray[j].getDistanceSQ() == -1 || distanceSQ < rayArray[j].getDistanceSQ()) { 
                        rayArray[j].setType(anglePointArray[i].getType()); 
                        rayArray[j].setEdgeIDs(anglePointArray[i].getEdgeIDs()); 
                        rayArray[j].setDistanceSQ(distanceSQ); 
                        rayArray[j].setEndPoint(anglePointArray[i].getEndPoint()); 
                    } 
                } 
            } 
    }

    castRays () {
            var rayArray = this._losComponentCore.getRayArray(); 
            if (rayArray.length <= 0) { 
                return; 
            } 
            var potentialBlockingEdgeArray = this._losComponentCore.getPotentialBlockingEdgeArray(); 
            var preBlockingEdge = null; 
            var collineationCount = 0; 
            var sourcePosition = this._losComponentCore.getPosition(); 
            var hitPointArray = this._losComponentCore.getHitPointArray(); 
            for (var i = 0, l = rayArray.length; i < l; i ++) { 
                var ray = rayArray[i]; 
                var rayEndPoint = ray.getEndPoint(); 
                var blockingEdge = null; 
                var hitPoint = ray.getEndPoint(); 
                var closestSQ = ray.getDistanceSQ(); 
                if (preBlockingEdge) { 
                    if (ssr.LoS.Helper.segmentSegmentTest( 
                        sourcePosition,  
                        rayEndPoint,  
                        preBlockingEdge.getStartPoint(),  
                        preBlockingEdge.getEndPoint())) { 
                        var intersection = ssr.LoS.Helper.segmentSegmentIntersect( 
                            sourcePosition,  
                            rayEndPoint,  
                            preBlockingEdge.getStartPoint(),  
                            preBlockingEdge.getEndPoint() 
                        ); 
                        if (intersection) { 
                            var distanceSQ = ssr.LoS.Helper.pDistanceSQ(sourcePosition, intersection); 
                            if (closestSQ == -1) { 
                                hitPoint =new Vec2(intersection.x, intersection.y); 
                                blockingEdge = preBlockingEdge; 
                            } 
                            else { 
                                if (distanceSQ < (closestSQ - macro.FLT_EPSILON)) { 
                                    hitPoint = new Vec2(intersection.x, intersection.y); 
                                    blockingEdge = preBlockingEdge; 
                                } 
                                else if (distanceSQ == closestSQ) { 
                                    if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY && 
                                        ray.getEdgeIDs().length == 1 && 
                                        ray.getEdgeIDs()[0] == 0) { 
                                        ray.setEdgeIDs([preBlockingEdge.getEdgeID()]); 
                                    } 
                                } 
                            } 
                        } 
                    } 
                } 
                else { 
                    for (var j = 0, ll = potentialBlockingEdgeArray.length; j < ll; j ++) { 
                        var potentialBlockingEdge = potentialBlockingEdgeArray[j]; 
                        var potentialBlockingEdgeStartPoint = potentialBlockingEdge.getStartPoint(); 
                        var potentialBlockingEdgeEndPoint = potentialBlockingEdge.getEndPoint(); 
                        if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.ENDPOINT) { 
                            if ((rayEndPoint.x == potentialBlockingEdgeStartPoint.x && 
                                 rayEndPoint.y == potentialBlockingEdgeStartPoint.y) ||  
                                (rayEndPoint.x == potentialBlockingEdgeEndPoint.x && 
                                 rayEndPoint.y == potentialBlockingEdgeEndPoint.y)) { 
                                continue; 
                            } 
                        } 
                        else if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY) { 
                            if ((rayEndPoint.x == potentialBlockingEdgeStartPoint.x && 
                                 rayEndPoint.y == potentialBlockingEdgeStartPoint.y) ||  
                                (rayEndPoint.x == potentialBlockingEdgeEndPoint.x && 
                                 rayEndPoint.y == potentialBlockingEdgeEndPoint.y)) { 
                                if (ray.getEdgeIDs().length == 1 && ray.getEdgeIDs()[0] == 0) { 
                                    ray.setEdgeIDs([potentialBlockingEdge.getEdgeID()]); 
                                } 
                            } 
                        } 
                        if (ssr.LoS.Helper.segmentSegmentTest(sourcePosition, rayEndPoint, potentialBlockingEdgeStartPoint, potentialBlockingEdgeEndPoint)) { 
                            var intersection = ssr.LoS.Helper.segmentSegmentIntersect(sourcePosition, rayEndPoint, potentialBlockingEdgeStartPoint, potentialBlockingEdgeEndPoint); 
                            if (intersection) { 
                                var distanceSQ = ssr.LoS.Helper.pDistanceSQ(sourcePosition, intersection); 
                                if (closestSQ == -1 || distanceSQ < closestSQ - macro.FLT_EPSILON) { 
                                    closestSQ = distanceSQ; 
                                    hitPoint = new Vec2(intersection.x, intersection.y); 
                                    blockingEdge = potentialBlockingEdge; 
                                } 
                            }      
                        }  
                    } 
                } 
                var secondToLastHitPoint = hitPointArray[hitPointArray.length - 2]; 
                if (!blockingEdge) { 
                    if (collineationCount > 0 &&  
                        preBlockingEdge &&  
                        ssr.LoS.Helper.isElementInArray(preBlockingEdge.getEdgeID(), ray.getEdgeIDs())) { 
                        if (secondToLastHitPoint) { 
                            if (secondToLastHitPoint.getType() == ssr.LoS.Constant.HIT_POINT_TYPE.SEGMENT) { 
                                var popHitPoint = hitPointArray.pop(); 
                                ssr.LoS.Data.Manager.getInstance().free(popHitPoint); 
                            } 
                            else { 
                                if (ssr.LoS.Helper.getSameEdgeID(secondToLastHitPoint, ray) > 0) { 
                                    var popHitPoint = hitPointArray.pop(); 
                                    ssr.LoS.Data.Manager.getInstance().free(popHitPoint); 
                                } 
                            } 
                        } 
                    } 
                    preBlockingEdge = null; 
                    collineationCount = 0; 
                    var hitPointData = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.HitPoint); 
                    if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY) { 
                        hitPointData.init(rayEndPoint, ray.getEdgeIDs(), ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.BOUNDARY); 
                    } 
                    else { 
                        hitPointData.init(rayEndPoint, ray.getEdgeIDs(), ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.ENDPOINT); 
                    } 
                    hitPointArray.push(hitPointData); 
                } 
                else { 
                    if (preBlockingEdge &&  
                        collineationCount > 0 &&  
                        secondToLastHitPoint &&  
                        ssr.LoS.Helper.isElementInArray(blockingEdge.getEdgeID(), secondToLastHitPoint.getEdgeIDs())) { 
                        var popHitPoint = hitPointArray.pop(); 
                        ssr.LoS.Data.Manager.getInstance().free(popHitPoint); 
                    } 
                    else { 
                        collineationCount += 1; 
                    } 
                    var hitPointData = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.HitPoint); 
                    if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY) { 
                        hitPointData.init(hitPoint, [blockingEdge.getEdgeID()], ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.BOUNDARY); 
                    } 
                    else { 
                        hitPointData.init(hitPoint, [blockingEdge.getEdgeID()], ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.SEGMENT); 
                    } 
                    hitPointArray.push(hitPointData); 
                    preBlockingEdge = blockingEdge;  
                } 
            } 
            this._removePossibleRedundantHitPoints(); 
    }

    _removePossibleRedundantHitPoints () {
    }

}
ssr.LoS.Strategy.Process.Base = ssrLoSStrategyProcessBase;
