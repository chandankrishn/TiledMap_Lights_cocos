
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPostProcessBase } from './SSRLoSStrategyPostProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessUnlimitedRange')
export class ssrLoSStrategyPostProcessUnlimitedRange extends ssrLoSStrategyPostProcessBase {

    process() {
        let hitPointArray = this._losComponentCore.getHitPointArray();
        if (hitPointArray.length <= 0) {
            return;
        }

        let blockingEdgeMap = {};
        let potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap();
        let blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray();
        let visibleEdgeArray = this._losComponentCore.getVisibleEdgeArray();
        let sightArea = this._losComponentCore.getSightArea();
        hitPointArray.push(hitPointArray[0]);
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
            sightArea.push(
                [
                    preHitPoint.getHitPoint(),
                    currentHitPoint.getHitPoint()
                ]
            );
            preHitPoint = currentHitPoint;
        }
        hitPointArray.pop();
    }

}

ssr.LoS.Strategy.PostProcess.UnlimitedRange = ssrLoSStrategyPostProcessUnlimitedRange;
