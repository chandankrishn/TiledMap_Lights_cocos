import { _decorator, Component, Mask , Node } from 'cc';
import  ssr from '../namespace/SSRLoSNamespace';
const { ccclass, menu, property } = _decorator;

@ccclass('SSRLoSComponentMask')
// @menu('ssr/LoS/Mask')
export class SSRLoSComponentMask extends Component {
  
    @property([Node])
    targets: Node[] = []


    mask!: Mask;
    _losMaskNode: any;

    // onLoad () {
    // }

    start () {
            if (!this.mask) { 
                this.mask = this.node.getComponent(Mask); 
            } 
            if (!this.mask) { 
                console.error("Component cc.Mask is needed for rendering!"); 
                return; 
            } 
            this._losMaskNode = new ssr.LoS.Mask(this.mask); 
            for (var i = 0; i < this.targets.length; i ++) { 
                var target = this.targets[i]; 
                if (target.getComponent("SSRLoSComponentCore")) { 
                    this._losMaskNode.addTarget(target); 
                } 
                else { 
                    console.log("No LoSCore component found on the target!"); 
                } 
            } 
    }

    updateSightNode (isForceLoSUpdate: any) {
            if (!this.mask || !this.node.active) { 
                return; 
            } 
            if (this._losMaskNode.isNeedUpdate() || isForceLoSUpdate) { 
                this._losMaskNode.updateTargets(); 
            } 
    }

}

