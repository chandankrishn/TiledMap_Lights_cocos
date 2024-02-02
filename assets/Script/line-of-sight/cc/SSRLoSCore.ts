
import { Rect, UITransform, Vec2, _decorator, misc, view } from 'cc';
import { ssrLoSDataObstacle } from '../data/SSRLoSDataObstacle';
import  ssr  from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSCore')
export class ssrLoSCore {
    _radius: any;
    _centralAngle: any;
    _position!: null;
    _sceenPosition!: null;
    _rotation!: number;
    _direction: any;
    _mode: any;
    _owner: any;
    _isUpdated!: boolean;
    _isForceUpdate!: boolean;
    _isAutoGenerateBoundary!: boolean;
    _isLockSightBoundary!: boolean;
    _isNeedCulling!: boolean;
    _isCulled!: boolean;
    _sightRect: any;
    _sightBoundary!: null;
    _dirtyFlag: any;
    _obstacles: ssrLoSDataObstacle[] = [];
    _boundaryObstacle: any;
    _potentialBlockingEdgeMap!: {};
    _potentialBlockingEdgeArray: [] = [];
    _anglePointArray: [] = [];
    _rayArray:[] = [];
    _visibleEdgeArray: [] = [];
    _blockingEdgeArray: [] =[];
    _hitPointArray: [] = [];
    _sightAreaArray: [] = [];
    _preProcessStrategy!: null;
    _cullingStrategy!: null;
    _processStrategy!: null;
    _postProcessStrategy!: null;
    _toolStrategy!: null;
//     @property
//     public "extends" = null;

    constructor () {
            this._initData(arguments[0]); 
            this._initStrategies(); 
            this._updateStrategies(); 
    }

    _initData (owner: any) {
            this._radius = ssr.LoS.Constant.UNLIMITED_RANGE; 
            this._centralAngle = ssr.LoS.Constant.FULL_ANGLE; 
            this._position = null; 
            this._sceenPosition = null; 
            this._rotation = 0; 
            this._direction = new Vec2(1, 0); 
            this._mode = ssr.LoS.Constant.MODE.UNLIMITED_RANGE; 
            this._owner = owner; 
            this._isUpdated = false; 
            this._isForceUpdate = false; 
            this._isAutoGenerateBoundary = true; 
            this._isLockSightBoundary = false; 
            this._isNeedCulling = false; 
            this._isCulled = false; 
            this._sightRect = new Rect(0, 0, view.getVisibleSize().width, view.getVisibleSize().height); 
            this._sightBoundary = null; 
            this._dirtyFlag = ssr.LoS.Constant.DIRTY_FLAGS.NOT_DIRTY; 
            this._obstacles = []; 
            this._boundaryObstacle = new ssr.LoS.Data.Obstacle(null, [], true, true); 
            this._potentialBlockingEdgeMap = {}; 
            this._potentialBlockingEdgeArray = []; 
            this._anglePointArray = []; 
            this._rayArray = []; 
            this._visibleEdgeArray = []; 
            this._blockingEdgeArray = []; 
            this._hitPointArray = []; 
            this._sightAreaArray = []; 
            this._preProcessStrategy = null; 
            this._cullingStrategy = null; 
            this._processStrategy = null; 
            this._postProcessStrategy = null; 
            this._toolStrategy = null; 
    }

    clear () {
            this.clearPotentialBlockingEdgeArray(); 
            this.clearPotentialBlockingEdgeMap(); 
            this.clearBlockingEdgeArray(); 
            this.clearRayArray(); 
            this.clearVisibleEdgeArray(); 
            this.clearAnglePointArray(); 
            this.clearSightArea(); 
            this.clearHitPointArray(); 
            this.removeAllObstacles(); 
            this.removeBoundaryObstacle(); 
    }

    setOwner (owner: any) {
            if (owner == this._owner) { 
                return; 
            } 
            this._owner = owner; 
    }

    getOwner () {
            return this._owner; 
    }

    getBoundaryObstacle () {
            return this._boundaryObstacle; 
    }

    removeBoundaryObstacle () {
            this._boundaryObstacle = null; 
    }

    setMode (mode: any) {
            this._mode = mode; 
            if (mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                this._isLockSightBoundary = false; 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            } 
    }

    getMode () {
            return this._mode; 
    }

    setDirtyFlag (dirtyFlag: any) {
            this._dirtyFlag |= dirtyFlag; 
    }

    removeDirtyFlag (dirtyFlag: any) {
            this._dirtyFlag &= ~dirtyFlag; 
    }

    getDirtyFlag (dirtyFlag: any) {
            return ((this._dirtyFlag & dirtyFlag) != 0 ? true : false); 
    }

    resetDirtyFlag () {
            this._dirtyFlag = ssr.LoS.Constant.DIRTY_FLAGS.NOT_DIRTY; 
    }

    _getOwnerScreenPosition () {
            return this.getOwner().parent ? this.getOwner().parent.getComponent(UITransform).convertToWorldSpaceAR(this.getOwner().position) : this.getOwner().position; 
    }

    _getCameraScreenPosition () {
        // const test : Node = new Node();
        
        // console.log(this.getOwner());
        console.log(this.getOwner().getPosition());
        const position = new Vec2(this.getOwner().getPosition().x ,this.getOwner().getPosition().y)
        return position;

        //     cc.Camera.findCamera(this.getOwner()).getWorldToScreenPoint(this.getOwner().position); 
    }

    generateScreenRect () {
            var nodePosition = this.getOwner().getPosition(); 
            var cameraPosition = this._getCameraScreenPosition(); 
        //     view.getFrameSize(); 
        //     var visibleSize = view.getVisibleSize(); 
        //     console.log( view.getFrameSize() )
        //     console.log(view.getVisibleSize() );

            return  new Rect( 
                nodePosition.x - view.getVisibleSize().width / 2 - cameraPosition.x,  
                nodePosition.y - view.getVisibleSize().height / 2 - cameraPosition.y,  
                view.getVisibleSize().width,  
                view.getVisibleSize().height 
            ); 
    }

    getSightArea () {
            return this._sightAreaArray; 
    }

    clearSightArea () {
            this._sightAreaArray = []; 
    }

    getBlockingEdgeArray () {
            return this._blockingEdgeArray; 
    }

    clearBlockingEdgeArray () {
            this._blockingEdgeArray = []; 
    }

    getRayArray () {
            return this._rayArray; 
    }

    clearRayArray () {
            for (var i = 0, l = this._rayArray.length; i < l; i ++) { 
                ssr.LoS.Data.Manager.getInstance().free(this._rayArray[i]); 
            } 
            this._rayArray = []; 
    }

    getPotentialBlockingEdgeArray () {
            return this._potentialBlockingEdgeArray; 
    }

    clearPotentialBlockingEdgeArray () {
            this._potentialBlockingEdgeArray = []; 
    }

    getPotentialBlockingEdgeMap () {
            return this._potentialBlockingEdgeMap; 
    }

    clearPotentialBlockingEdgeMap () {
            this._potentialBlockingEdgeMap = {}; 
    }

    getVisibleEdgeArray () {
            return this._visibleEdgeArray; 
    }

    clearVisibleEdgeArray () {
            this._visibleEdgeArray = []; 
    }

    getHitPointArray () {
            return this._hitPointArray; 
    }

    clearHitPointArray () {
            for (var i = 0, l = this._hitPointArray.length; i < l; i ++) { 
                ssr.LoS.Data.Manager.getInstance().free(this._hitPointArray[i]); 
            } 
            this._hitPointArray = []; 
    }

    getAnglePointArray () {
            return this._anglePointArray; 
    }

    clearAnglePointArray () {
            this._anglePointArray = []; 
    }

    setRadius (value: any) {
            if (this.getRadius() == value) { 
                return; 
            } 
            var updateStrategiesFlag = false; 
            if (value == ssr.LoS.Constant.UNLIMITED_RANGE) { 
                updateStrategiesFlag = true; 
                this.setMode(ssr.LoS.Constant.MODE.UNLIMITED_RANGE); 
            } 
            else { 
                if (this.getRadius() == ssr.LoS.Constant.UNLIMITED_RANGE) { 
                    updateStrategiesFlag = true; 
                    this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_FULL_ANGLE); 
                } 
            } 
            this._radius = value; 
            if (updateStrategiesFlag) { 
                this._updateStrategies(); 
            } 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.RADIUS); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING); 
    }

    getRadius () {
            return this._radius; 
    }

    setCentralAngle (value: any) {
            value = ssr.LoS.Helper.angleNormalize(value); 
            if (this.getCentralAngle() == value) { 
                return; 
            } 
            var updateStrategiesFlag = false; 
            if (value == ssr.LoS.Constant.FULL_ANGLE) { 
                updateStrategiesFlag = true; 
                this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_FULL_ANGLE); 
            } 
            else { 
                if (this.getCentralAngle() == ssr.LoS.Constant.FULL_ANGLE) { 
                    updateStrategiesFlag = true; 
                    if (value > 0 && value <= 180) { 
                        this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_NON_REFLEX_ANGLE); 
                    } 
                    else { 
                        this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_REFLEX_ANGLE); 
                    } 
                } 
                else { 
                    if (this.getCentralAngle() <= 180 && value > 180) { 
                        updateStrategiesFlag = true; 
                        this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_REFLEX_ANGLE); 
                    } 
                    else if (this.getCentralAngle() > 180 && value <= 180) { 
                        updateStrategiesFlag = true; 
                        this.setMode(ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_NON_REFLEX_ANGLE); 
                    }    
                } 
            } 
            this._centralAngle = value; 
            if (updateStrategiesFlag) { 
                this._updateStrategies(); 
            } 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.ANGLE); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING); 
    }

    getCentralAngle () {
            return this._centralAngle; 
    }

    getPosition () {
            return this.getOwner().getPosition(); 
    }

    getRotation () {
            return this._rotation; 
    }

    setDirection (value: any) {
            this._direction = value; 
    }

    getDirection () {
            return this._direction; 
    }

    getSightBoundary () {
            return this._sightBoundary; 
    }

    isUpdated () {
            return this._isUpdated; 
    }

    _initStrategies () {
            this._preProcessStrategy = null; 
            this._cullingStrategy = null; 
            this._processStrategy = null; 
            this._postProcessStrategy = null; 
            this._toolStrategy = null; 
    }

    _updateStrategies () {
            if (this._mode == ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                this._preProcessStrategy = new ssr.LoS.Strategy.PreProcess.UnlimitedRange(this); 
                this._cullingStrategy = new ssr.LoS.Strategy.Culling.UnlimitedRange(this); 
                this._processStrategy = new ssr.LoS.Strategy.Process.UnlimitedRange(this); 
                this._postProcessStrategy = new ssr.LoS.Strategy.PostProcess.UnlimitedRange(this); 
                this._toolStrategy = new ssr.LoS.Strategy.Tool.UnlimitedRange(this); 
            } 
            else if (this._mode == ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_FULL_ANGLE) { 
                this._preProcessStrategy = new ssr.LoS.Strategy.PreProcess.LimitedRangeWithFullAngle(this); 
                this._cullingStrategy = new ssr.LoS.Strategy.Culling.LimitedRangeWithFullAngle(this); 
                this._processStrategy = new ssr.LoS.Strategy.Process.LimitedRangeWithFullAngle(this); 
                this._postProcessStrategy = new ssr.LoS.Strategy.PostProcess.LimitedRangeWithFullAngle(this); 
                this._toolStrategy = new ssr.LoS.Strategy.Tool.LimitedRangeWithFullAngle(this); 
            } 
            else if (this._mode == ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_NON_REFLEX_ANGLE) { 
                this._preProcessStrategy = new ssr.LoS.Strategy.PreProcess.LimitedRangeWithNonReflexAngle(this); 
                this._cullingStrategy = new ssr.LoS.Strategy.Culling.LimitedRangeWithNonReflexAngle(this); 
                this._processStrategy = new ssr.LoS.Strategy.Process.LimitedRangeWithNonReflexAngle(this); 
                this._postProcessStrategy = new ssr.LoS.Strategy.PostProcess.LimitedRangeWithNonReflexAngle(this); 
                this._toolStrategy = new ssr.LoS.Strategy.Tool.LimitedRangeWithNonReflexAngle(this); 
            } 
            else if (this._mode == ssr.LoS.Constant.MODE.LIMITED_RANGE_WITH_REFLEX_ANGLE) { 
                this._preProcessStrategy = new ssr.LoS.Strategy.PreProcess.LimitedRangeWithReflexAngle(this); 
                this._cullingStrategy = new ssr.LoS.Strategy.Culling.LimitedRangeWithReflexAngle(this); 
                this._processStrategy = new ssr.LoS.Strategy.Process.LimitedRangeWithReflexAngle(this); 
                this._postProcessStrategy = new ssr.LoS.Strategy.PostProcess.LimitedRangeWithReflexAngle(this); 
                this._toolStrategy = new ssr.LoS.Strategy.Tool.LimitedRangeWithReflexAngle(this); 
            } 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.MODE); 
    }

    update () {
            this._isUpdated = this._isNeedUpdate(); 
            if (this._isUpdated) { 
                this._process(); 
            } 
            return this._isUpdated; 
    }

    _checkPosition () {
            if (this._position && this._position.equals(this.getOwner().getPosition())) { 
                return; 
            } 
            this._position = this.getOwner().getPosition(); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.POSITION); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING); 
            if (!this._isLockSightBoundary) { 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            } 
    }

    _checkScreenPosition () {
            var screenPosition = this._getOwnerScreenPosition(); 
            if (this._sceenPosition && this._sceenPosition.equals(screenPosition)) { 
                return; 
            } 
            this._sceenPosition = screenPosition; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.POSITION); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING); 
            if (!this._isLockSightBoundary) { 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            } 
    }

    _checkRotation () {
            if (this._rotation == this.getOwner().angle) { 
                return; 
            } 
            this._rotation = this.getOwner().angle; 
            this.setDirection(new Vec2(Math.cos(misc.degreesToRadians(this._rotation)), Math.sin(misc.degreesToRadians(this._rotation)))); 
            if (this._centralAngle == ssr.LoS.Constant.FULL_ANGLE) { 
                return; 
            } 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.ROTATION); 
            if (this._centralAngle != ssr.LoS.Constant.FULL_ANGLE) { 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING); 
            } 
    }

    _isNeedUpdate () {
            var needUpdate = false; 
            if (this.isForceUpdate()) { 
                return true; 
            } 
            if (this._isNeedCulling) { 
                var screenRect = this.generateScreenRect(); 
                var sightRect = new Rect(this.getOwner().getPosition().x - this._radius,  
                                        this.getOwner().getPosition().y - this._radius,  
                                        this._radius * 2,  
                                        this._radius * 2); 
                if (!ssr.LoS.Helper.rectContainsRect(sightRect, screenRect)) { 
                    this._isCulled = true; 
                    return false;        
                } 
            } 
            this._checkPosition(); 
            this._checkScreenPosition(); 
            this._checkRotation(); 
            this._isCulled = false; 
            if (this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.POSITION)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.ROTATION)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.RADIUS)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.ANGLE)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.MODE)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.OBSTACLE)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING)) { 
                needUpdate = true; 
            } 
            if (!needUpdate && this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY)) { 
                needUpdate = true; 
            } 
            var obstacleDirty = this._processObstacleDirtyDetection(); 
            return needUpdate || obstacleDirty; 
    }

    _processObstacleDirtyDetection () {
            var isAnyObstacleDirty = false; 
            for (var i = 0, l = this._obstacles.length; i < l; i ++) { 
                var obstacle = this._obstacles[i]; 
                var obstacleDirty = false; 
                if (obstacle.isDirtyDetectionOn()) { 
                    if (obstacle._vertexArrayProvider) { 
                        var oldVertexArray = obstacle.getVertexArray(); 
                        var newVertexArray = obstacle._vertexArrayProvider.call(obstacle._node); 
                        if (!obstacleDirty) { 
                            if (oldVertexArray.length != newVertexArray.length) { 
                                obstacleDirty = true; 
                                isAnyObstacleDirty = true; 
                            } 
                            else { 
                                for (var m = 0; m < oldVertexArray.length; m ++) { 
                                    var isVertexFound = false; 
                                    for (var n = 0; n < newVertexArray.length; n ++) { 
                                        if (oldVertexArray[m].equals(newVertexArray[n])) { 
                                            isVertexFound = true; 
                                            break; 
                                        } 
                                    } 
                                    if (!isVertexFound) { 
                                        obstacleDirty = true; 
                                        isAnyObstacleDirty = true; 
                                        break; 
                                    } 
                                } 
                            } 
                        } 
                        obstacle.setVertexArray(newVertexArray); 
                    } 
                    else { 
                        if (obstacle.__position !== undefined &&  
                            !obstacle.__position.equals(obstacle._node.getPosition())) { 
                            obstacleDirty = true; 
                        } 
                        obstacle.__position = new Vec2(obstacle._node.getPosition()); 
                        if (!obstacleDirty &&  
                            obstacle.__rotation !== undefined &&  
                            obstacle.__rotation != obstacle._node.angle) { 
                            obstacleDirty = true; 
                        } 
                        obstacle.__rotation = obstacle._node.angle; 
                        if (!obstacleDirty &&  
                            (obstacle.__scaleX !== undefined && obstacle.__scaleX != obstacle._node.scaleX) || 
                            (obstacle.__scaleY !== undefined && obstacle.__scaleY != obstacle._node.scaleY)) { 
                            obstacleDirty = true; 
                        } 
                        obstacle.__scaleX = obstacle._node.scaleX; 
                        obstacle.__scaleY = obstacle._node.scaleY; 
                    } 
                } 
                if (obstacleDirty) { 
                    this.updateObstacle(obstacle._node); 
                } 
            } 
            return isAnyObstacleDirty; 
    }

    _process () {
            this.clearBlockingEdgeArray(); 
            this.clearSightArea(); 
            this.clearVisibleEdgeArray(); 
            this.clearRayArray(); 
            this.clearAnglePointArray(); 
            this.clearPotentialBlockingEdgeArray(); 
            this.clearPotentialBlockingEdgeMap(); 
            this.clearHitPointArray(); 
            if (!this._sightBoundary || this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY)) { 
                this._sightBoundary = this._preProcessStrategy.generateBoundary(); 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
            } 
            if (this.getDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.CULLING)) { 
                this._cleanupAllObstaclesForProcess();    
            } 
            this._cullingStrategy.process(); 
            this._processStrategy.generateAuxiliaryAnglePoint(); 
            this._processStrategy.packAnglePoints(); 
            this._processStrategy.packPotentialBlockingEdges(); 
            this._processStrategy.sortAnglePointArray(); 
            this._processStrategy.generateRays(); 
            this._processStrategy.castRays(); 
            this._postProcessStrategy.process(); 
            this.resetDirtyFlag(); 
    }

    removeAllObstacles () {
            for (var i = 0, l = this._obstacles.length; i < l; i ++) { 
                this._obstacles[i].cleanup(); 
            } 
            this._obstacles = []; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.OBSTACLE); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    _cleanupAllObstaclesForProcess () {
            for (var i = 0, l = this._obstacles.length; i < l; i ++) { 
                var obstacle = this._obstacles[i]; 
                obstacle.cleanupForProcess(); 
            } 
    }

    addObstacle (node: any, vertexArray: any, isPolygon: any) {
            var obstacle = this.findObstacle(node); 
            if (obstacle) { 
                console.log("addObstacle findObstacle true: please use updateObstacle instead !!!"); 
            } 
            else { 
        
                obstacle = new ssr.LoS.Data.Obstacle(node, vertexArray, isPolygon); 
                this._obstacles.push(obstacle); 
                this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.OBSTACLE); 
            } 
            return obstacle; 
    }

    updateObstacle (node: any, vertexArray: any) {
            var obstacle = this.findObstacle(node); 
            if (!obstacle) { 
                console.log("updateObstacle not found"); 
                return; 
            } 
            obstacle.update(vertexArray); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.OBSTACLE); 
            return obstacle; 
    }

    removeObstacle (node: any) {
            for (var i = 0, l = this._obstacles.length; i < l; i ++) { 
                if (node === this._obstacles[i].getNode()) { 
                    this._obstacles.splice(i, 1); 
                    this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.OBSTACLE); 
                    return true; 
                } 
            } 
            console.log("removeObstacle not found");     
            return false; 
    }

    removeObstacles (nodes: any) {
            for (var i = 0, l = nodes.length; i < l; i ++) { 
                this.removeObstacle(nodes[i]);    
            } 
    }

    getObstacles () {
            return this._obstacles; 
    }

    findObstacle (node: any) {
            for (var i = 0, l = this._obstacles.length; i < l; i ++) { 
                if (node === this._obstacles[i].getNode()) { 
                    return this._obstacles[i]; 
                } 
            } 
            return null; 
    }

    enableForceUpdate () {
            this._isForceUpdate = true; 
    }

    disableForceUpdate () {
            this._isForceUpdate = false; 
    }

    isForceUpdate () {
            return this._isForceUpdate; 
    }

    enableAutoGenerateBoundary () {
            if (this._isAutoGenerateBoundary || this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                return; 
            } 
            this._isAutoGenerateBoundary = true; 
            this._sightRect = new Rect(0, 0,view.getVisibleSize().width, view.getVisibleSize().height); 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    disableAutoGenerateBoundary () {
            if (!this._isAutoGenerateBoundary || this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                return; 
            } 
            this._isAutoGenerateBoundary = false; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    isAutoGenerateBoundary () {
            return this._isAutoGenerateBoundary; 
    }

    isLockSightBoundary () {
            return this._isLockSightBoundary; 
    }

    lockSightBoundary () {
            if (this._isLockSightBoundary || this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                return; 
            } 
            this._isLockSightBoundary = true; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    unlockSightBoundary () {
            if (!this._isLockSightBoundary || this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                return; 
            } 
            this._isLockSightBoundary = false; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    isNeedCulling () {
            return this._isNeedCulling; 
    }

    isCulled () {
            return this._isCulled; 
    }

    enableCulling () {
            if (this._mode == ssr.LoS.Constant.MODE.UNLIMITED_RANGE) { 
                console.log("Culling enabled but will no take effect in current mode: UNLIMITED_RANGE !"); 
                return; 
            } 
            this._isNeedCulling = true; 
    }

    disableCulling () {
            this._isNeedCulling = false; 
    }

    setSightSize (width: any, height: any) {
            if (this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE || 
                (this._sightRect.width === width && this._sightRect.height === height)) { 
                return; 
            } 
            this.disableAutoGenerateBoundary(); 
            this.unlockSightBoundary(); 
            this._sightRect.width = width; 
            this._sightRect.height = height; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    setSightRect (rect: any) {
            if (this._mode != ssr.LoS.Constant.MODE.UNLIMITED_RANGE || 
                (this._sightRect.x === rect.x &&  
                 this._sightRect.y === rect.y &&  
                 this._sightRect.width === rect.width &&  
                 this._sightRect.height === rect.height)) { 
                return; 
            } 
            this.disableAutoGenerateBoundary(); 
            this.lockSightBoundary(); 
            this._sightRect = rect; 
            this.setDirtyFlag(ssr.LoS.Constant.DIRTY_FLAGS.BOUNDARY); 
    }

    getSightRect () {
            return this._sightRect 
    }

    getSightAreaVertCount () {
            var sightVertCount = 0; 
            for (var i = 0, l = this._sightAreaArray.length; i < l; i ++) { 
                sightVertCount += (this._sightAreaArray[i].length - 1); 
            } 
            return sightVertCount; 
    }

    getBlockingEdgeCount () {
            return this._blockingEdgeArray.length; 
    }

    getRayCount () {
            return this._rayArray.length; 
    }

    getPotentialBlockingEdgeCount () {
            return this._potentialBlockingEdgeArray.length; 
    }

    getVisibleEdgeCount () {
            return this._visibleEdgeArray.length; 
    }

    getHitPointCount () {
            return this._hitPointArray.length; 
    }

    getAnglePointCount () {
            return this._anglePointArray.length; 
    }

    isPointVisible (targetPoint: any) {
            return this._toolStrategy.isPointVisible( 
                targetPoint,  
                this._sourcePosition,  
                this._radius,  
                this._sightBoundary,  
                this._blockingEdgeArray 
            ); 
    }

}
ssr.LoS.Core = ssrLoSCore;
