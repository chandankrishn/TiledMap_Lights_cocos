
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPostProcessBase } from './SSRLoSStrategyPostProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessLimitedRange')
export class ssrLoSStrategyPostProcessLimitedRange extends ssrLoSStrategyPostProcessBase {
    // @property
    // public "extends" = 'PostProcessBase';

    process() {
        let blockingEdgeMap = {};
        let sourcePosition = this._losComponentCore.getPosition();
        let radius = this._losComponentCore.getRadius();
        let centralAngle = this._losComponentCore.getCentralAngle();
        let potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap();
        let blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray();
        let visibleEdgeArray = this._losComponentCore.getVisibleEdgeArray();
        let hitPointArray = this._losComponentCore.getHitPointArray();
        let sightArea = this._losComponentCore.getSightArea();
        if (centralAngle == ssr.LoS.Constant.FULL_ANGLE) {
            hitPointArray.push(hitPointArray[0]);
        }
        let preHitPoint = hitPointArray[0];
        for (let i = 1, l = hitPointArray.length; i < l; i++) {
            let currentHitPoint = hitPointArray[i];
            let sameEdgeID = ssr.LoS.Helper.getSameEdgeID(preHitPoint, currentHitPoint);
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
            let relation = ssr.LoS.Helper.segmentOrArc(preHitPoint, currentHitPoint);
            if (relation == ssr.LoS.Constant.HIT_POINT_CONNECTION.ARC) {
                let diff = ssr.LoS.Helper.radiansBetweenAngle(preHitPoint.getAngle(), currentHitPoint.getAngle());
                let segments = Math.ceil(diff * ssr.LoS.Constant.SEGMENT_PER_RADIANS);
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
                        let diffLeft = (diff - Math.PI);
                        diff = Math.PI;
                        segments = Math.ceil(diff * ssr.LoS.Constant.SEGMENT_PER_RADIANS);
                        let verts = ssr.LoS.Helper.arcToSegments(sourcePosition, radius, preHitPoint.getAngle(), diff, segments, false);
                        sightArea.push(verts);
                        segments = Math.ceil(diffLeft * ssr.LoS.Constant.SEGMENT_PER_RADIANS);
                        verts = ssr.LoS.Helper.arcToSegments(sourcePosition, radius, preHitPoint.getAngle() + Math.PI, diffLeft, segments, false);
                        sightArea.push(verts);
                    }
                    else {
                        let verts = ssr.LoS.Helper.arcToSegments(this._losComponentCore.getPosition(), radius, preHitPoint.getAngle(), diff, segments, false);
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

