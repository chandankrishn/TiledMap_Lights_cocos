
import { _decorator } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolBase')
export class ssrLoSStrategyToolBase {
    _losComponentCore: any;


    constructor() {
        this._losComponentCore = arguments[0];
    }

    isPointVisible(targetPoint: any) {
        let sourcePosition = this._losComponentCore.getPosition();
        let blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray();
        for (let i = 0, l = blockingEdgeArray.length; i < l; i++) {
            let blockingEdge = blockingEdgeArray[i];
            let testResult = ssr.LoS.Helper.segmentSegmentTest(
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
