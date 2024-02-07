import { _decorator, Camera, Component, director, instantiate, Node, Prefab, sys, UITransform, view } from 'cc';
import { ssr } from '../line-of-sight/namespace/SSRLoSNamespace';
import { PolygonColliderObstacle } from '../PolygonColliderObstacle';
import { SSRLoSComponentCore } from '../line-of-sight/component/SSRLoSComponentCore';
const { ccclass, property } = _decorator;

@ccclass('Performance')
export class Performance extends Component {
    @property(Node)
    public robot: Node = null;

    @property(Camera)
    camera !: Camera;
    @property(Node)
    public obstaclesGroup: Node;
    @property(Node)
    public lightsGroup: Node;
    @property(Prefab)
    public hexagonPrefab: Prefab;
    @property(Prefab)
    public lightPrefab: Prefab;


    _obstacles!: any[];
    _lightSources: [];
    // camera: any;
    robotObject: Component | null;
    robotLoSComponent: Component | null;
    robotLoSCore: any;

    start() {
        // cc.debug.setDisplayStats(true); 
        this._obstacles = [];
        this._lightSources = [];
        // this.camera = cc.find("Main Camera", this.node).getComponent(cc.Camera); 
        this.robotObject = this.robot.getComponent("Robot");
        this.robotLoSComponent = this.robot.getComponent(SSRLoSComponentCore);
        this.robotLoSCore = this.robotLoSComponent.getLoSCore();
        this.randomObstacles(10);
    }

    randomObstacles(count: any) {
        this.obstaclesGroup.removeAllChildren(true);
        this._obstacles = [];
        this.robotLoSCore.removeAllObstacles();
        // let w = cc.winSize.width; view.getVisibleSize()
        let w = view.getVisibleSize().width;
        let h = view.getVisibleSize().height;
        let size = (count > 100 ? 10 : 12);
        let wCount = count / 10;
        let hCount = 10;
        this._obstacles = [];
        for (let i = 0; i < wCount; i++) {
            for (let j = 0; j < hCount; j++) {
                let hexagonNode = instantiate(this.hexagonPrefab);
                hexagonNode.parent = this.obstaclesGroup;
                hexagonNode.setPosition(-w / 2 + size + w / (wCount + 1) * (i + 1), -h / 2 + 10 + size + (h - size) / hCount * j);
                this._obstacles.push(hexagonNode);
                let hexagonObstacle = hexagonNode.getComponent(PolygonColliderObstacle);
                let obstalce = this.robotLoSCore.addObstacle(sys.isNative ? hexagonNode._proxy : hexagonObstacle, hexagonObstacle.getVertexArray());
                obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle);
            }
        }
        for (let i = 0; i < this._lightSources.length; i++) {
            this._lightSources[i].getComponent(SSRLoSComponentCore).getLoSCore().removeAllObstacles();
            for (let o = 0; o < this._obstacles.length; o++) {
                let hexagonObstacle = this._obstacles[o].getComponent(PolygonColliderObstacle);
                let obstalce = this._lightSources[i].getComponent(SSRLoSComponentCore).getLoSCore().addObstacle(sys.isNative ? this._obstacles[o]._proxy : hexagonObstacle, hexagonObstacle.getVertexArray());
                obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle);
            }
        }
    }

    randomLights(count: any) {
        this.lightsGroup.removeAllChildren(true);
        this._lightSources = [];
        let w = this.node.getComponent(UITransform)?.width || 0;
        let h = this.node.getComponent(UITransform)?.height || 0;
        let size = 10;
        let hCount = 10;
        for (let i = 0; i < count; i++) {
            let lightNode = instantiate(this.lightPrefab);
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
            for (let o = 0; o < this._obstacles.length; o++) {
                let hexagonObstacle = this._obstacles[o].getComponent(PolygonColliderObstacle);
                let obstalce = lightNode.getComponent("SSRLoSComponentCore").getLoSCore().addObstacle(sys.isNative ? this._obstacles[o]._proxy : hexagonObstacle, hexagonObstacle.getVertexArray());
                obstalce.setVertexArrayProvider(hexagonObstacle.getVertexArray, hexagonObstacle);
            }
        }
    }

    update(dt: any) {
        if (this.robotObject.useCamera) {
            this.camera.node.position = this.robot.position;
        }
        if (this.robotObject.isForceLoSUpdate) {
            this.robotLoSCore.enableForceUpdate();
        }
        let isUpdated = this.robotLoSComponent.updateSightNode();
        if (isUpdated || this.robotObject.isForceLoSUpdate) {
            this.node.getComponent("LoSRenderLayer").updateRender(this.robotObject.isForceLoSUpdate);
            this.node.getComponent("FloatingMenu").updateDebugDraw();
        }
        this.robotLoSCore.disableForceUpdate();
        this.robotObject.isForceLoSUpdate = false;
        for (let i = 0; i < this._lightSources.length; i++) {
            isUpdated = this._lightSources[i].getComponent("SSRLoSComponentCore").updateSightNode();
            this._lightSources[i].getChildByName("SightLightRender").getComponent("SSRLoSComponentRender").plot();
        }
    }

}

