
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessBase } from './SSRLoSStrategyProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessLimitedRange')
export class ssrLoSStrategyProcessLimitedRange extends ssrLoSStrategyProcessBase {
    // @property
    // public "extends" = 'ProcessBase';

    generateAuxiliaryAnglePoint() {
        let sourcePosition = this._losComponentCore.getPosition();
        let radius = this._losComponentCore.getRadius();
        let obstacles = this._losComponentCore.getObstacles();
        for (let i = 0, l = obstacles.length; i < l; i++) {
            let anglePointArray = obstacles[i].getAnglePointArray();
            for (let j = 0, ll = anglePointArray.length; j < ll; j++) {
                let anglePoint = anglePointArray[j];
                if (anglePoint.getType() != ssr.LoS.Constant.ANGLE_POINT_TYPE.ENDPOINT ||
                    this._isAnglePointCollinearWithEdges(anglePoint)) {
                    continue;
                }
                let auxiliaryAnglePointType = this._calculateAuxiliaryAnglePointType(anglePoint);
                if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS ||
                    auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) {
                    let plusRay = ssr.LoS.Helper.generateAuxiliaryRay(
                        sourcePosition,
                        anglePoint.getEndPoint(),
                        ssr.LoS.Constant.IOTA_RADIANS_PLUS_COS,
                        ssr.LoS.Constant.IOTA_RADIANS_PLUS_SIN
                    );
                    let normalizeV = ssr.LoS.Helper.pNormalize(plusRay, sourcePosition);
                    plusRay.x = sourcePosition.x + normalizeV.x * radius;
                    plusRay.y = sourcePosition.y + normalizeV.y * radius;
                    let plusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint);
                    plusRayAnglePoint.init(plusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY);
                    obstacles[i].addAuxiliaryAnglePoint(plusRayAnglePoint);
                }
                if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS ||
                    auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) {
                    let minusRay = ssr.LoS.Helper.generateAuxiliaryRay(
                        sourcePosition,
                        anglePoint.getEndPoint(),
                        ssr.LoS.Constant.IOTA_RADIANS_MINUS_COS,
                        ssr.LoS.Constant.IOTA_RADIANS_MINUS_SIN
                    );
                    let normalizeV = ssr.LoS.Helper.pNormalize(minusRay, sourcePosition);
                    minusRay.x = sourcePosition.x + normalizeV.x * radius;
                    minusRay.y = sourcePosition.y + normalizeV.y * radius;
                    let minusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint);
                    minusRayAnglePoint.init(minusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY);
                    obstacles[i].addAuxiliaryAnglePoint(minusRayAnglePoint);
                }
            }
        }
    }

    _sortAnglePointArrayFromStartToEnd(angleStart: any, angleEnd: any) {
        let anglePointArray = this._losComponentCore.getAnglePointArray();
        let angleIndex = anglePointArray.map(function (e) { return e.getAngle(); }).indexOf(angleStart);
        let toMoveArray = anglePointArray.splice(angleIndex);
        for (let i = toMoveArray.length - 1; i >= 0; i--) {
            anglePointArray.unshift(toMoveArray[i]);
        }
    }

    _isAnglePointCollinearWithEdges(anglePoint: any) {
        return false;
    }

    _removePossibleRedundantHitPoints() {
        let hitPointArray = this._losComponentCore.getHitPointArray();
        if (hitPointArray.length > 2) {
            let firstHitPoint = hitPointArray[0];
            let lastHitPoint = hitPointArray[hitPointArray.length - 1];
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

