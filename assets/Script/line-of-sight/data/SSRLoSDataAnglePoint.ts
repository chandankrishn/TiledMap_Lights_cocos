
import { _decorator } from 'cc';
import  ssr  from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataAnglePoint')
export class ssrLoSDataAnglePoint {
    _endPoint: any;
    _edgeIDs: any;
    _type: any;
    _prevEdge: any;
    _nextEdge: any;
    _distanceSQ: any;
    _angle: any;


    constructor () {
            if (ssr.LoS.Data.AnglePoint.__alloc === undefined) { 
                ssr.LoS.Data.AnglePoint.__alloc = 0; 
            } 
            ssr.LoS.Data.AnglePoint.__alloc += 1; 
    }

    init (endPoint: any, edgeIDs: any, type: any, prevEdge: any, nextEdge: any, distanceSQ: any, angle: any) {
            this._endPoint = endPoint; 
            this._edgeIDs = edgeIDs; 
            this._type = type; 
            this._prevEdge = prevEdge; 
            this._nextEdge = nextEdge; 
            this._distanceSQ = distanceSQ || -1; 
            this._angle = angle || 0; 
    }

    getEndPoint () {
            return this._endPoint; 
    }

    getEdgeIDs () {
            return this._edgeIDs; 
    }

    getType () {
            return this._type; 
    }

    getPrevEdge () {
            return this._prevEdge; 
    }

    getNextEdge () {
            return this._nextEdge; 
    }

    getDistanceSQ () {
            return this._distanceSQ; 
    }

    setDistanceSQ (distanceSQ: any) {
            this._distanceSQ = distanceSQ; 
    }

    getAngle () {
            return this._angle; 
    }

    setAngle (angle: any) {
            this._angle = angle; 
    }

}

ssr.LoS.Data.AnglePoint = ssrLoSDataAnglePoint;

