import { _decorator, Component, Node } from 'cc';
import { ssr } from '../line-of-sight/namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('LoSRenderLayer')
export class LoSRenderLayer extends Component {
    @property(Node)
    public robot: Node = null;
        robotLoSComponent: Component | null;
        robotLoSCore: any;
        _losComponentRenderRay: Component | null;
        _losComponentRenderHitPoint: Component | null;
        _losComponentRenderPotentialBlockingEdge: Component | null;
        _losComponentRenderBlockingEdge: Component | null;
        _losComponentRenderVisibleEdge: Component | null;
        _losComponentRenderSightVert: Component | null;
        _losComponentRenderSightRange: Component | null;
        _losComponentRenderSightArea: Component | null;
        _losComponentRenderSightLight: Component | null;
        _losMaskNode: Component | null;

    start () {
            this.robotLoSComponent = this.robot.getComponent("SSRLoSComponentCore"); 
            this.robotLoSCore = this.robotLoSComponent.getLoSCore(); 
            this._initLoSComponentRender(); 
    }

    _initLoSComponentRender () {
            var loSRenderGroup = this.node.getChildByName("LoSRenderGroup"); 
            console.log("Froup found", loSRenderGroup);
            this._losComponentRenderRay = loSRenderGroup.getChildByName("RayRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderHitPoint = loSRenderGroup.getChildByName("HitPointRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderPotentialBlockingEdge = loSRenderGroup.getChildByName("PotentialBlockingEdgeRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderBlockingEdge = loSRenderGroup.getChildByName("BlockingEdgeRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderVisibleEdge = loSRenderGroup.getChildByName("VisibleEdgeRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderSightVert = loSRenderGroup.getChildByName("SightVertRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderSightRange = loSRenderGroup.getChildByName("SightRangeRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderSightArea = loSRenderGroup.getChildByName("SightAreaRender").getComponent("SSRLoSComponentRender"); 
            this._losComponentRenderSightLight = loSRenderGroup.getChildByName("SightLightRender").getComponent("SSRLoSComponentRender"); 
            this._losMaskNode = loSRenderGroup.getChildByName("MaskRender").getComponent("SSRLoSComponentMask"); 
    }

    updateRender (isForceLoSUpdate: any) {
            this._losComponentRenderSightArea.plot(); 
            this._losComponentRenderSightRange.plot(); 
            this._losComponentRenderRay.plot(); 
            this._losComponentRenderHitPoint.plot(); 
            this._losComponentRenderSightVert.plot(); 
            this._losComponentRenderPotentialBlockingEdge.plot(); 
            this._losComponentRenderBlockingEdge.plot(); 
            this._losComponentRenderVisibleEdge.plot(); 
            this._losComponentRenderSightLight.plot(); 
            this._losMaskNode.updateSightNode(isForceLoSUpdate); 
    }

}

