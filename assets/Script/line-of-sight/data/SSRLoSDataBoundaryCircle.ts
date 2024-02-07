
import { _decorator } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
import { ssrLoSDataBoundary } from './SSRLoSDataBoundary';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataBoundaryCircle')
export class ssrLoSDataBoundaryCircle extends ssrLoSDataBoundary {
        _center: any;
        _radius: any;


        constructor() {
                super();
                this._type = ssr.LoS.Constant.BOUNDARY_TYPE.CIRCLE;
                this._center = arguments[0];
                this._radius = arguments[1];
        }

        getCenter() {
                return this._center;
        }

        getRadius() {
                return this._radius;
        }

}

ssr.LoS.Data.BoundaryCircle = ssrLoSDataBoundaryCircle;
