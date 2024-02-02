
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPostProcessBase } from './SSRLoSStrategyPostProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessLimitedRange')
export class ssrLoSStrategyPostProcessLimitedRange extends ssrLoSStrategyPostProcessBase{ 
    // @property
    // public "extends" = 'PostProcessBase';
    
    process () {
            var blockingEdgeMap = {}; 
            var sourcePosition = this._losComponentCore.getPosition(); 
            var radius = this._losComponentCore.getRadius(); 
            var centralAngle = this._losComponentCore.getCentralAngle(); 
            var potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap(); 
            var blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray(); 
            var visibleEdgeArray = this._losComponentCore.getVisibleEdgeArray(); 
            var hitPointArray = this._losComponentCore.getHitPointArray(); 
            var sightArea = this._losComponentCore.getSightArea(); 
            if (centralAngle == ssr.LoS.Constant.FULL_ANGLE) { 
                hitPointArray.push(hitPointArray[0]); 
            } 
            var preHitPoint = hitPointArray[0]; 
            for (var i = 1, l = hitPointArray.length; i < l; i ++) { 
                var currentHitPoint = hitPointArray[i]; 
                var sameEdgeID = ssr.LoS.Helper.getSameEdgeID(preHitPoint, currentHitPoint); 
                if (sameEdgeID != 0) { 
                    visibleEdgeArray.push( 
                        [ 
                            preHitPoint.getHitPoint(), 
                            currentHitPoint.getHitPoint() 
                        ] 
                    ); 
                    if (!blockingEdgeMap[sameEdgeID.toString()]) { 
                        blockingEdgeMap[sameEdgeID.toString()] = sameEdgeID; 
                        blockingEdgeArray.push(potentialBlockingEdgeMap[sameEdgeID.toString()]); 
                    } 
                } 
                var relation = ssr.LoS.Helper.segmentOrArc(preHitPoint, currentHitPoint); 
                if (relation == ssr.LoS.Constant.HIT_POINT_CONNECTION.ARC) { 
                    var diff = ssr.LoS.Helper.radiansBetweenAngle(preHitPoint.getAngle(), currentHitPoint.getAngle()); 
                    var segments = Math.ceil(diff * ssr.LoS.Constant.SEGMENT_PER_RADIANS); 
                    if (segments <= 1) { 
                        sightArea.push( 
                            [ 
                                preHitPoint.getHitPoint(), 
                                currentHitPoint.getHitPoint() 
                            ]        
                        ); 
                    } 
                    else { 
                        if (diff > Math.PI) { 
                            var diffLeft = (diff - Math.PI); 
                            diff = Math.PI; 
                            segments = Math.ceil(diff * ssr.LoS.Constant.SEGMENT_PER_RADIANS); 
                            var verts = ssr.LoS.Helper.arcToSegments(sourcePosition, radius, preHitPoint.getAngle(), diff, segments, false); 
                            sightArea.push(verts); 
                            segments = Math.ceil(diffLeft * ssr.LoS.Constant.SEGMENT_PER_RADIANS); 
                            verts = ssr.LoS.Helper.arcToSegments(sourcePosition, radius, preHitPoint.getAngle() + Math.PI, diffLeft, segments, false); 
                            sightArea.push(verts); 
                        } 
                        else { 
                            var verts = ssr.LoS.Helper.arcToSegments(this._losComponentCore.getPosition(), radius, preHitPoint.getAngle(), diff, segments, false); 
                            sightArea.push(verts); 
                        }    
                    } 
                } 
                else { 
                    sightArea.push( 
                        [ 
                            preHitPoint.getHitPoint(), 
                            currentHitPoint.getHitPoint() 
                        ]        
                    ); 
                } 
                preHitPoint = currentHitPoint; 
            } 
            if (centralAngle == ssr.LoS.Constant.FULL_ANGLE) { 
                hitPointArray.pop(); 
            } 
    }

}

ssr.LoS.Strategy.PostProcess.LimitedRange = ssrLoSStrategyPostProcessLimitedRange;

