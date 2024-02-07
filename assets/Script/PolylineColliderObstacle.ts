import { _decorator, Component, Graphics } from 'cc';
const { ccclass, executeInEditMode } = _decorator;

@ccclass('PolylineColliderObstacle')
@executeInEditMode
export class PolylineColliderObstacle extends Component {
        render: Graphics | null;

        onLoad() {
                this.render = this.node.getComponent("Graphics");
                this.polylineCollider = this.node.getComponent(PhysicsChainCollider);
                this.plot();
        }

        plot() {
                this.render.clear();
                for (let i = 0; i < this.polylineCollider.points.length; i++) {
                        let pt = this.polylineCollider.points[i];
                        if (i == 0) {
                                this.render.moveTo(pt.x, pt.y);
                        }
                        else {
                                this.render.lineTo(pt.x, pt.y);
                        }
                }
                this.render.stroke();
        }

        getVertexArray() {
                // let vertexArray = []; 
                // for (let j = 0; j < this.polylineCollider.points.length; j ++) { 
                // vertexArray.push(cc.v2(this.polylineCollider.points[j].x + this.node.x, this.polylineCollider.points[j].y + this.node.y)); 
                // } 
                // return vertexArray; 
        }

        updateVertexArray(points: any) {
                // this.polylineCollider.points = points; 
                // this.plot(); 
        }

        _resetRender() {
                // this.plot(); 
        }

        onFocusInEditor() {
                // this.plot(); 
        }

        onLostFocusInEditor() {
                // this.plot(); 
        }

        onEnable() {
                // this.plot(); 
        }

        onDisable() {
                // this.plot();
        }

        lateUpdate(delta: any) {
                // cc.engine.repaintInEditMode(); 
                // this.plot();
        }

}

