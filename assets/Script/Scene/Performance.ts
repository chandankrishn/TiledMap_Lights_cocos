import { _decorator, Camera, Component, director, instantiate, Node, sys, UITransform, view } from 'cc';
import { ssr } from '../line-of-sight/namespace/SSRLoSNamespace';
import { PolygonColliderObstacle } from '../PolygonColliderObstacle';
import { SSRLoSComponentCore } from '../line-of-sight/component/SSRLoSComponentCore';
const { ccclass, property } = _decorator;

@ccclass('Performance')
export class Performance extends Component {
    @property(Node)
    public robot: Node = 'null';

    @property(Camera)
    camera !: Camera;
    @property
    public obstaclesGroup;
    @property
    public lightsGroup;
    @property
    public hexagonPrefab;
    @property
    public lightPrefab;


    _obstacles!: any[];
    _lightSources: [];
    // camera: any;
    robotObject: Component | null;
    robotLoSComponent: Component | null;
    robotLoSCore: any;

    start () {
            // cc.debug.setDisplayStats(true); 
            this._obstacles = []; 
            this._lightSources = []; 
            // this.camera = cc.find("Main Camera", this.node).getComponent(cc.Camera); 
            this.robotObject = this.robot.getComponent("Robot"); 
            this.robotLoSComponent = this.robot.getComponent("SSRLoSComponentCore"); 
            console.log("Robot los component" , this.robotLoSComponent);
            this.robotLoSCore = this.robotLoSComponent.getLoSCore(); 
            this.randomObstacles(10); 
    }

    randomObstacles (count: any) {
            this.obstaclesGroup.removeAllChildren(true); 
            this._obstacles = []; 
            this.robotLoSCore.removeAllObstacles(); 
            // var w = cc.winSize.width; view.getVisibleSize()
            var w = this.node.getComponent(UITransform)?.width || 0;
            var h = this.node.getComponent(UITransform)?.height || 0; 
            var size = (count > 100 ? 10 : 12); 
            var wCount = count / 10; 
            var hCount = 10; 
            this._obstacles = []; 
            for (var i = 0; i < wCount; i ++) { 
                for (var j = 0; j < hCount; j ++) { 
                    var hexagonNode = instantiate(this.hexagonPrefab); 
                    hexagonNode.parent = this.obstaclesGroup; 
                    hexagonNode.setPosition(-w / 2 + size + w / (wCount + 1) * (i + 1), -h / 2 + 10 + size + (h - size) / hCount * j); 
                    this._obstacles.push(hexagonNode); 
                    var hexagonObstacle = hexagonNode.getComponent(PolygonColliderObstacle); 
                    var obstalce = this.robotLoSCore.addObstacle(sys.isNative ? hexagonNode._proxy : hexagonObstacle, hexagonObstacle.getVertexArray()); 
                    obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle); 
                } 
            } 
            for (var i = 0; i < this._lightSources.length; i ++) { 
                this._lightSources[i].getComponent(SSRLoSComponentCore).getLoSCore().removeAllObstacles(); 
                for (var o = 0; o < this._obstacles.length; o ++) { 
                    var hexagonObstacle = this._obstacles[o].getComponent(PolygonColliderObstacle); 
                    var obstalce = this._lightSources[i].getComponent(SSRLoSComponentCore).getLoSCore().addObstacle(sys.isNative ? this._obstacles[o]._proxy : hexagonObstacle, hexagonObstacle.getVertexArray()); 
                    obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle); 
                } 
            } 
    }

    randomLights (count: any) {
            this.lightsGroup.removeAllChildren(true); 
            this._lightSources = []; 
            var w = this.node.getComponent(UITransform)?.width || 0;
            var h = this.node.getComponent(UITransform)?.height || 0; 
            var size = 10; 
            var hCount = 10; 
            for (var i = 0; i < count; i ++) { 
                var lightNode = instantiate(this.lightPrefab); 
                lightNode.parent = this.lightsGroup; 
                lightNode.setPosition(-w / 2 + 20, -h / 2 + 10 + size + (h - size) / hCount * i + 30); 
                // lightNode.runAction( 
                //     cc.repeatForever( 
                //         cc.sequence( 
                //             cc.moveBy(20 + i * 2, cc.v2(w - 10, 0)), 
                //             cc.moveBy(20 + i * 2, cc.v2(-w + 10, 0)) 
                //         ) 
                //     ) 
                // ); 
                this._lightSources.push(lightNode); 
                for (var o = 0; o < this._obstacles.length; o ++) { 
                    var hexagonObstacle = this._obstacles[o].getComponent(PolygonColliderObstacle); 
                    var obstalce = lightNode.getComponent("SSRLoSComponentCore").getLoSCore().addObstacle(sys.isNative ? this._obstacles[o]._proxy : hexagonObstacle, hexagonObstacle.getVertexArray()); 
                    obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle); 
                } 
            } 
    }

    update (dt: any) {
            if (this.robotObject.useCamera) { 
                this.camera.node.position = this.robot.position; 
            } 
            if (this.robotObject.isForceLoSUpdate) { 
                this.robotLoSCore.enableForceUpdate(); 
            } 
            var isUpdated = this.robotLoSComponent.updateSightNode(); 
            if (isUpdated || this.robotObject.isForceLoSUpdate) { 
                this.node.getComponent("LoSRenderLayer").updateRender(this.robotObject.isForceLoSUpdate); 
                this.node.getComponent("FloatingMenu").updateDebugDraw(); 
            } 
            this.robotLoSCore.disableForceUpdate(); 
            this.robotObject.isForceLoSUpdate = false; 
            for (var i = 0; i < this._lightSources.length; i ++) { 
                isUpdated = this._lightSources[i].getComponent("SSRLoSComponentCore").updateSightNode(); 
                this._lightSources[i].getChildByName("SightLightRender").getComponent("SSRLoSComponentRender").plot(); 
            } 
    }

}

