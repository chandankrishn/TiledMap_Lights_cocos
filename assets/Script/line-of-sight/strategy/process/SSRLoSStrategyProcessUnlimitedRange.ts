
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyProcessBase } from './SSRLoSStrategyProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessUnlimitedRange')
export class ssrLoSStrategyProcessUnlimitedRange extends ssrLoSStrategyProcessBase {
    // @property
    // public "extends" = 'ProcessBase';

    generateAuxiliaryAnglePoint() {
        let sourcePosition = this._losComponentCore.getPosition();
        let obstacles = this._losComponentCore.getObstacles();
        // console.log(obstacles);
        // console.log("anglePointArray", this._losComponentCore.getAnglePointArray().concat([]), sourcePosition);
        let auxillaryCount1 = 0, auxillaryCount2 = 0;
        for (let i = 0, l = obstacles.length; i < l; i++) {
            let anglePointArray = obstacles[i].getAnglePointArray();
            for (let j = 0, ll = anglePointArray.length; j < ll; j++) {

                // console.log("obtacle anglepoint", obstacles, anglePointArray);
                let anglePoint = anglePointArray[j];
                if (anglePoint.getType() != ssr.LoS.Constant.ANGLE_POINT_TYPE.ENDPOINT) {
                    continue;
                }
                let auxiliaryAnglePointType = this._calculateAuxiliaryAnglePointType(anglePoint);
                // if ()
                if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.PLUS ||
                    auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) {
                    let plusRay = ssr.LoS.Helper.generateAuxiliaryRay(
                        sourcePosition,
                        anglePoint.getEndPoint(),
                        ssr.LoS.Constant.IOTA_RADIANS_PLUS_COS,
                        ssr.LoS.Constant.IOTA_RADIANS_PLUS_SIN,
                        this._losComponentCore.getSightBoundary().getRectangle().width
                    );
                    let plusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint);
                    plusRayAnglePoint.init(plusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY);
                    auxillaryCount1++;
                    obstacles[i].addAuxiliaryAnglePoint(plusRayAnglePoint);
                }
                if (auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.MINUS ||
                    auxiliaryAnglePointType == ssr.LoS.Constant.AUXILIARY_ANGLE_POINT_TYPE.BOTH) {
                    let minusRay = ssr.LoS.Helper.generateAuxiliaryRay(
                        sourcePosition,
                        anglePoint.getEndPoint(),
                        ssr.LoS.Constant.IOTA_RADIANS_MINUS_COS,
                        ssr.LoS.Constant.IOTA_RADIANS_MINUS_SIN,
                        this._losComponentCore.getSightBoundary().getRectangle().width
                    );
                    let minusRayAnglePoint = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.AnglePoint);
                    minusRayAnglePoint.init(minusRay, [0], ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY);
                    auxillaryCount2++;
                    obstacles[i].addAuxiliaryAnglePoint(minusRayAnglePoint);
                }
            }

        }
        console.log(auxillaryCount1, auxillaryCount2);
        // console.log("anglePointArray1", this._losComponentCore.getAnglePointArray().concat([]), sourcePosition);
    }

}
ssr.LoS.Strategy.Process.UnlimitedRange = ssrLoSStrategyProcessUnlimitedRange;
