
import { Vec2, _decorator, macro } from 'cc';
import ssr from '../../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyProcessBase')
export class ssrLoSStrategyProcessBase {
    _losComponentCore: any;
    // @property
    // public "extends" = null;

    constructor() {
        this._losComponentCore = arguments[0];
    }

    _calculateAuxiliaryAnglePointType(anglePoint: any) {
        let prepX = anglePoint.getEndPoint().x - this._losComponentCore.getPosition().x;
        let prepY = this._losComponentCore.getPosition().y - anglePoint.getEndPoint().y;
        let p1 = null;
        let p2 = null;
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
            if (p2 == null && p1 != null) {
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
            if (p1 == null && p2 != null) {
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

    generateAuxiliaryAnglePoint() {
    }

    packAnglePoints() {
        let obstacles = this._losComponentCore.getObstacles();
        let anglePointArray = this._losComponentCore.getAnglePointArray();
        // console.log("anglePointArray00", this._losComponentCore.getAnglePointArray().concat([]));
        for (let i = 0, l = obstacles.length; i < l; i++) {
            obstacles[i].getAnglePointArray().forEach((v: any) => {
                anglePointArray.push(v)
            });
            obstacles[i].getAnglePointAuxiliaryArray().forEach((v: any) => {
                anglePointArray.push(v)
            });
        }
        let obstacle = this._losComponentCore.getBoundaryObstacle();
        obstacle.getAnglePointArray().forEach((v: any) => {
            anglePointArray.push(v)
        });
        obstacle.getAnglePointAuxiliaryArray().forEach((v: any) => {
            anglePointArray.push(v)
        });
        // console.log("anglePointArray11", this._losComponentCore.getAnglePointArray().concat([]));
    }

    packPotentialBlockingEdges() {
        let obstacles = this._losComponentCore.getObstacles();
        let potentialBlockingEdgeArray = this._losComponentCore.getPotentialBlockingEdgeArray();
        let potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap();
        for (let i = 0, l = obstacles.length; i < l; i++) {
            obstacles[i].getPotentialBlockingEdgeArray().forEach(function (v) { this.push(v) }, potentialBlockingEdgeArray);
        }
        let obstacle = this._losComponentCore.getBoundaryObstacle();
        obstacle.getPotentialBlockingEdgeArray().forEach(function (v) { this.push(v) }, potentialBlockingEdgeArray);
        for (let i = 0, l = potentialBlockingEdgeArray.length; i < l; i++) {
            potentialBlockingEdgeMap[potentialBlockingEdgeArray[i].getEdgeID().toString()] = potentialBlockingEdgeArray[i];
        }
    }

    sortAnglePointArray() {
        let anglePointArray = this._losComponentCore.getAnglePointArray();
        if (anglePointArray.length <= 0) {
            return;
        }
        let self = this;
        let sourcePosition = this._losComponentCore.getPosition();
        for (let i = 0, l = anglePointArray.length; i < l; i++) {
            anglePointArray[i].setAngle(
                ssr.LoS.Helper.pToAngle(anglePointArray[i].getEndPoint(), sourcePosition)
            );
        }
        anglePointArray.sort(function (a, b) {
            return a.getAngle() - b.getAngle();
        });
    }

    _canMergeRays(angleA: any, angleB: any) {
        return (Math.abs(angleA - angleB) < macro.FLT_EPSILON);
    }

    generateRays() {
        let anglePointArray = this._losComponentCore.getAnglePointArray();
        if (anglePointArray.length <= 0) {
            return;
        }
        let rayArray = this._losComponentCore.getRayArray();
        let sourcePosition = this._losComponentCore.getPosition();
        let ray = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.Ray);
        ray.init(
            anglePointArray[0].getEndPoint(),
            anglePointArray[0].getEdgeIDs(),
            anglePointArray[0].getType(),
            anglePointArray[0].getAngle()
        );
        ray.setDistanceSQ(ssr.LoS.Helper.pDistanceSQ(anglePointArray[0].getEndPoint(), sourcePosition));
        rayArray.push(ray);
        for (let i = 1, j = 0, n = anglePointArray.length; i < n; i++) {
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
                j++;
            }
            else {
                let distanceSQ = ssr.LoS.Helper.pDistanceSQ(anglePointArray[i].getEndPoint(), sourcePosition);
                if (rayArray[j].getDistanceSQ() == -1 || distanceSQ < rayArray[j].getDistanceSQ()) {
                    rayArray[j].setType(anglePointArray[i].getType());
                    rayArray[j].setEdgeIDs(anglePointArray[i].getEdgeIDs());
                    rayArray[j].setDistanceSQ(distanceSQ);
                    rayArray[j].setEndPoint(anglePointArray[i].getEndPoint());
                }
            }
        }
        // console.log("anglePointArray1", this._losComponentCore.getAnglePointArray().concat([]), sourcePosition);
    }

    castRays() {
        let rayArray = this._losComponentCore.getRayArray();
        if (rayArray.length <= 0) {
            return;
        }
        let potentialBlockingEdgeArray = this._losComponentCore.getPotentialBlockingEdgeArray();
        let preBlockingEdge = null;
        let collineationCount = 0;
        let sourcePosition = this._losComponentCore.getPosition();
        let hitPointArray = this._losComponentCore.getHitPointArray();
        for (let i = 0, l = rayArray.length; i < l; i++) {
            let ray = rayArray[i];
            let rayEndPoint = ray.getEndPoint();
            let blockingEdge = null;
            let hitPoint = ray.getEndPoint();
            let closestSQ = ray.getDistanceSQ();
            if (preBlockingEdge) {
                /*
                    If there is a recorded pre blocking edge, we do not need to do the intersection test with all the potential blocking edges.
                    Just do the intersection in between the ray and the preBlockingEdge.
                    If they do not intersect, then the angle point of the ray if the hit point we need.
                    If they do intersect, then the intersection is the hit point we need.
                */
                if (ssr.LoS.Helper.segmentSegmentTest(
                    sourcePosition,
                    rayEndPoint,
                    preBlockingEdge.getStartPoint(),
                    preBlockingEdge.getEndPoint())) {
                    let intersection = ssr.LoS.Helper.segmentSegmentIntersect(
                        sourcePosition,
                        rayEndPoint,
                        preBlockingEdge.getStartPoint(),
                        preBlockingEdge.getEndPoint()
                    );
                    if (intersection) {
                        let distanceSQ = ssr.LoS.Helper.pDistanceSQ(sourcePosition, intersection);
                        if (closestSQ == -1) {
                            hitPoint = new Vec2(intersection.x, intersection.y);
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
                                    /*
                                        The ray is one of the sector's edge.
                                        In this case ==> ssr.LoS.Data.Ray.edgeIDs == [0] .
                                        So we need to rewrite it with the edgeIDs of the potentialBlockingEdge.
                                    */
                                    ray.setEdgeIDs([preBlockingEdge.getEdgeID()]);
                                }
                            }
                        }
                    }
                }
            }
            else {
                for (let j = 0, ll = potentialBlockingEdgeArray.length; j < ll; j++) {
                    let potentialBlockingEdge = potentialBlockingEdgeArray[j];
                    let potentialBlockingEdgeStartPoint = potentialBlockingEdge.getStartPoint();
                    let potentialBlockingEdgeEndPoint = potentialBlockingEdge.getEndPoint();
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
                            /*
                                The ray is one of the sector's edge.
                                In this case ==> ssr.LoS.Data.Ray.edgeIDs == [0] .
                                So we need to rewrite it with the edgeIDs of the potentialBlockingEdge.
                            */
                            if (ray.getEdgeIDs().length == 1 && ray.getEdgeIDs()[0] == 0) {
                                ray.setEdgeIDs([potentialBlockingEdge.getEdgeID()]);
                            }
                        }
                    }
                    if (ssr.LoS.Helper.segmentSegmentTest(sourcePosition, rayEndPoint, potentialBlockingEdgeStartPoint, potentialBlockingEdgeEndPoint)) {
                        let intersection = ssr.LoS.Helper.segmentSegmentIntersect(sourcePosition, rayEndPoint, potentialBlockingEdgeStartPoint, potentialBlockingEdgeEndPoint);
                        if (intersection) {
                            let distanceSQ = ssr.LoS.Helper.pDistanceSQ(sourcePosition, intersection);
                            if (closestSQ == -1 || distanceSQ < closestSQ - macro.FLT_EPSILON) {
                                closestSQ = distanceSQ;
                                hitPoint = new Vec2(intersection.x, intersection.y);
                                blockingEdge = potentialBlockingEdge;
                            }
                        }
                    }
                }
            }
            /* 
                Try reduce the redundant hit points while processing each ray.
                This is very important since in fact we only need two hit points (exact two hit points) for any edges.
                If we dot reduce the hit points count here the amount of hit points might be 10 times more and will slow down the sight area render process significantly.
            */
            let secondToLastHitPoint = hitPointArray[hitPointArray.length - 2];
            if (!blockingEdge) {
                /* 
                    In this block, it means that:
                        - The closest hit point is the end point of the ray itself (HIT_POINT_TYPE.ENDPOINT/BOUNDARY)
                */
                // The hit point is the ray angle point itself
                if (collineationCount > 0 &&
                    preBlockingEdge &&
                    ssr.LoS.Helper.isElementInArray(preBlockingEdge.getEdgeID(), ray.getEdgeIDs())) {
                    if (secondToLastHitPoint) {
                        // need at least 2 hit points before the new one
                        if (secondToLastHitPoint.getType() == ssr.LoS.Constant.HIT_POINT_TYPE.SEGMENT) {
                            // the second to last hit point has to be on an edge (not on an end point)
                            let popHitPoint = hitPointArray.pop();
                            ssr.LoS.Data.Manager.getInstance().free(popHitPoint);
                        }
                        else {
                            if (ssr.LoS.Helper.getSameEdgeID(secondToLastHitPoint, ray) > 0) {
                                let popHitPoint = hitPointArray.pop();
                                ssr.LoS.Data.Manager.getInstance().free(popHitPoint);
                            }
                        }
                    }
                }
                // clear recorded data
                preBlockingEdge = null;
                collineationCount = 0;
                // add the hit point
                let hitPointData = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.HitPoint);
                if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY) {
                    hitPointData.init(rayEndPoint, ray.getEdgeIDs(), ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.BOUNDARY);
                }
                else {
                    hitPointData.init(rayEndPoint, ray.getEdgeIDs(), ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.ENDPOINT);
                }
                hitPointArray.push(hitPointData);
            }
            else {
                /* 
                    In this block, it means that:
                        - The closest hit point is on an edge (HIT_POINT_TYPE.SEGMENT/BOUNDARY)
                        - Remember if the closest hit point is the end point of the ray itself than if will go to the if block
                */
                if (preBlockingEdge &&
                    collineationCount > 0 &&
                    secondToLastHitPoint &&
                    ssr.LoS.Helper.isElementInArray(blockingEdge.getEdgeID(), secondToLastHitPoint.getEdgeIDs())) {
                    // remove pre hit point that is on the same edge of the new one
                    let popHitPoint = hitPointArray.pop();
                    ssr.LoS.Data.Manager.getInstance().free(popHitPoint);
                }
                else {
                    // record the count of hit points on the same edge
                    collineationCount += 1;
                }
                // add the hit point
                let hitPointData = ssr.LoS.Data.Manager.getInstance().create(ssr.LoS.Data.HitPoint);
                if (ray.getType() == ssr.LoS.Constant.ANGLE_POINT_TYPE.BOUNDARY) {
                    hitPointData.init(hitPoint, [blockingEdge.getEdgeID()], ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.BOUNDARY);
                }
                else {
                    hitPointData.init(hitPoint, [blockingEdge.getEdgeID()], ray.getAngle(), ssr.LoS.Constant.HIT_POINT_TYPE.SEGMENT);
                }
                hitPointArray.push(hitPointData);
                // record the blockingEdge
                preBlockingEdge = blockingEdge;
            }
        }
        this._removePossibleRedundantHitPoints();
    }

    _removePossibleRedundantHitPoints() {
    }

}
ssr.LoS.Strategy.Process.Base = ssrLoSStrategyProcessBase;
