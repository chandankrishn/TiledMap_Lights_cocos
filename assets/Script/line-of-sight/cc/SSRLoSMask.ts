
import { GraphicsComponent, Mask, _decorator } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSMask')
export class ssrLoSMask {
    _mask: Mask;
    _targets!: any[];

    constructor() {

        this._mask = arguments[0];
        this._targets = [];
    }

    addTarget(node: any, losComponentCoreProvider: any) {
        let result = this.findTarget(node);
        if (result != -1) {
            console.log("ssr.LoS.Component.Mask addTarget node already added");
        }
        else {
            this._targets.push(node);
        }
    }

    removeTarget(node: any) {
        for (let i = 0, l = this._targets.length; i < l; i++) {
            if (node === this._targets[i]) {
                this._targets.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeTargets(nodes: any) {
        for (let i = 0, l = nodes.length; i < l; i++) {
            this.removeTarget(nodes[i]);
        }
    }

    removeAllTargets() {
        for (let i = 0, l = this._targets.length; i < l; i++) {
            this.removeTarget(this._targets[i]);
        }
        this._targets = [];
    }

    findTarget(node: any) {
        for (let i = 0, l = this._targets.length; i < l; i++) {
            if (node === this._targets[i]) {
                return i;
            }
        }
        return -1;
    }

    updateTarget(node: any, needForceUpdate: any) {
        let nodeIndex = this.findTarget(node);
        if (nodeIndex == -1) {
            console.log("ssr.LoS.Component.Mask updateTarget node is not added!")
        }
        needForceUpdate = (needForceUpdate === undefined ? false : needForceUpdate);
        let losCore = node.getComponent("SSRLoSComponentCore").getLoSCore();

        ssr.LoS.Render.Util.renderSightArea(losCore, this._mask.node.getComponent(GraphicsComponent));
    }

    updateTargets(nodes: any, needForceUpdate: any) {
        if (!nodes) {
            nodes = this._targets;
        }
        this._mask?.node?.getComponent(GraphicsComponent)?.clear();
        for (let i = 0, l = nodes.length; i < l; i++) {

            this.updateTarget(nodes[i], needForceUpdate);
        }
    }

    isNeedUpdate(nodes: any) {
        if (!nodes) {
            nodes = this._targets;
        }
        let needUpdate = false;
        for (let i = 0, l = nodes.length; i < l; i++) {
            let nodeIndex = this.findTarget(nodes[i]);
            if (nodeIndex == -1) {
                continue;
            }
            let losCore = nodes[i].getComponent("SSRLoSComponentCore").getLoSCore();
            if (losCore.isUpdated()) {
                needUpdate = true;
                break;
            }
        }
        return needUpdate;
    }

}
ssr.LoS.Mask = ssrLoSMask;
