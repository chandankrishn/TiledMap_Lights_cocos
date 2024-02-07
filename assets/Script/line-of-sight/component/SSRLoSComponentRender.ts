/*
BLEND_ZERO: 0,
BLEND_ONE: 1,
BLEND_SRC_COLOR: 768,
BLEND_ONE_MINUS_SRC_COLOR: 769,
BLEND_DST_COLOR: 774,
BLEND_ONE_MINUS_DST_COLOR: 775,
BLEND_SRC_ALPHA: 770,
BLEND_ONE_MINUS_SRC_ALPHA: 771,
BLEND_DST_ALPHA: 772,
BLEND_ONE_MINUS_DST_ALPHA: 773,

768/769
*/
import { _decorator, Component, EffectAsset, Enum, gfx, Graphics, IMaterialInfo, Material, Node, resources, screen, UITransform, Vec3, view } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
const { ccclass, menu, property } = _decorator;

export enum LOS_RENDER_TYPE {
    "SIGHT_AREA",
    "SIGHT_VERT",
    "BLOCKING_EDGE",
    "POTENTIAL_BLOCKING_EDGE",
    "VISIBLE_EDGE",
    "HIT_POINT",
    "RAY",
    "SIGHT_RANGE",
    "SIGHT_LIGHT",
}
@ccclass('SSRLoSComponentRender')
@menu('ssr/LoS/Render')
export class SSRLoSComponentRender extends Component {
    @property(Node)
    target!: Node;
    @property(Graphics)
    render!: Graphics;
    @property({ type: Enum(LOS_RENDER_TYPE) })
    mode: LOS_RENDER_TYPE = LOS_RENDER_TYPE.SIGHT_LIGHT;
    @property({ type: Boolean })
    isIgnoreSourcePosition: Boolean = false;
    @property({ type: EffectAsset })
    _lightEffectAsset: EffectAsset;
    _srcBlendFactor = 770;
    _dstBlendFactor = 771;
    _losCore = null;
    // _losCore: any;
    // _lightEffectAsset: any;

    onLoad() {
    }

    start() {
        if (this.mode == LOS_RENDER_TYPE.SIGHT_LIGHT) {
            this._loadLightEffect();
        }
        let losCoreComponent = this.target ? this.target.getComponent("SSRLoSComponentCore") : null;
        if (losCoreComponent) {
            this._losCore = losCoreComponent.getLoSCore();
        }
        if (!this.render) {
            this.render = this.node.getComponent(Graphics);
        }
    }

    update(dt: any) {
        if (!this.render || !this._losCore) {
            return;
        }
        let isUpdated = this._losCore.isUpdated();
        if (isUpdated || this._lightEffectAsset) {
            this.plot();
        }
    }

    clear() {
        this.render.clear();
    }

    plot() {
        if (!this.node.active) {
            return;
        }
        this.render.clear();
        if (this.mode == LOS_RENDER_TYPE.SIGHT_AREA) {
            ssr.LoS.Render.Util.renderSightArea(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.SIGHT_VERT) {
            ssr.LoS.Render.Util.renderSightVert(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.BLOCKING_EDGE) {
            ssr.LoS.Render.Util.renderBlockingEdge(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.POTENTIAL_BLOCKING_EDGE) {
            ssr.LoS.Render.Util.renderPotentialBlockingEdge(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.VISIBLE_EDGE) {
            ssr.LoS.Render.Util.renderVisibleEdge(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.HIT_POINT) {
            ssr.LoS.Render.Util.renderHitPoint(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.RAY) {
            ssr.LoS.Render.Util.renderRay(this._losCore, this.render, this.isIgnoreSourcePosition, this.target);
        }
        else if (this.mode == LOS_RENDER_TYPE.SIGHT_RANGE) {
            ssr.LoS.Render.Util.renderSightRange(this._losCore, this.render, this.isIgnoreSourcePosition);
        }
        else if (this.mode == LOS_RENDER_TYPE.SIGHT_LIGHT) {
            if (this._lightEffectAsset) {
                this._updateLightEffect();
                ssr.LoS.Render.Util.renderSightArea(this._losCore, this.render, this.isIgnoreSourcePosition);
            }
        }
    }

    _loadLightEffect() {
        let self = this;
        resources.load("line-of-sight/shader/light", EffectAsset, null, function (error, asset) {
            self._lightEffectAsset = asset;
            self._applyLightEffect();
            ssr.LoS.Render.Util.renderSightArea(self._losCore, self.render);
        });
        // cc.loader.loadRes("line-of-sight/shader/light", cc.EffectAsset, null, function(error, asset) { 
        //     self._lightEffectAsset = asset; 
        //     self._applyLightEffect(); 
        //     ssr.LoS.Render.Util.renderSightArea(self._losCore, self.render); 
        // }); 
    }

    _applyLightEffect() {
        // if (!this.render) { 
        //     this.render = this.node.getComponent("cc.Graphics"); 
        // } 
        // let material = new Material(); 
        // material.effectAsset = this._lightEffectAsset; 
        // material.name = "light"; 
        // this.render.setMaterial(0, material); 
        // material.setBlend( 
        //     true, 
        //     cc.gfx.BLEND_FUNC_ADD, 
        //     this.srcBlendFactor, this.dstBlendFactor, 
        //     cc.gfx.BLEND_FUNC_ADD, 
        //     this.srcBlendFactor, this.dstBlendFactor 
        // ); 


        if (!this.render) {
            this.render = this.node.getComponent(Graphics);
        }
        let material = new Material();
        const materialInfo: IMaterialInfo = {
            effectAsset: this._lightEffectAsset,
            effectName: "light",
        }
        // material.overridePipelineStates()
        // material.effectAsset = this._lightEffectAsset; 
        // material.name = "light"; 
        material.initialize(materialInfo);
        this.render.setMaterial(material, 0);

        //! Pending for udpate
        // @param enabled enabled
        // @param blendEq blendEq
        // @param blendSrc blendSrc
        // @param blendDst blendDst
        // @param blendAlphaEq blendAlphaEq
        // @param blendSrcAlpha blendSrcAlpha
        // @param blendDstAlpha blendDstAlpha
        // @param blendColor blendColor
        // @param passIdx passIdx 

        material.setProperty('u_srcBlend', gfx.BlendFactor.SRC_COLOR);
        material.setProperty('u_dstBlend', gfx.BlendFactor.ONE_MINUS_SRC_COLOR);
        material.setProperty('u_dstBlend', gfx.BlendFactor.SRC_ALPHA);
        material.setProperty('u_dstBlend', gfx.BlendFactor.ONE_MINUS_SRC_ALPHA);
        this._updateLightEffect();
    }

    _updateLightEffect() {
        console.log("CALLED");

        if (!this.render) {
            this.render = this.node.getComponent(Graphics);
        }
        let material = this.render.getSharedMaterial(0);

        let frameSize = screen.windowSize;
        let visibleSize = view.getVisibleSize();
        let retinaFactor = screen.devicePixelRatio;

        // let position = this.target.g.convertToWorldSpaceAR(cc.v2(0, 0)); 
        let position = this.target.getComponent(UITransform)?.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        let centerx = position.x * frameSize.width / visibleSize.width * retinaFactor;
        let centery = position.y * frameSize.height / visibleSize.height * retinaFactor;
        material.setProperty("center", [centerx, centery]);
        let radius = this._losCore.getRadius();
        if (radius == -1) {
            let rect = this._losCore.getSightRect();
            // radius = Math.sqrt(rect.width * rect.width, rect.height * rect.height); 
            radius = Math.sqrt(rect.width * rect.width);
            material.setProperty("radius", radius);
            material.setProperty("sourceRadius", 10);
            material.setProperty("intensity", 0.8);
        }
        else {
            material.setProperty("radius", radius * 2);
            material.setProperty("sourceRadius", radius * 0.1);
            material.setProperty("intensity", 0.8);
        }
    }

    getRender() {
        return this.render;
    }

}
