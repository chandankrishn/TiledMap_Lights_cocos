import { _decorator, Component, EPhysics2DDrawFlags, error, Graphics, PhysicsSystem2D, PolygonCollider2D, Vec2 } from 'cc';
const { ccclass, executeInEditMode } = _decorator;

@ccclass('PolygonColliderObstacle')
@executeInEditMode
export class PolygonColliderObstacle extends Component {

    render!: Graphics | null;
    polygonCollider!: PolygonCollider2D | null;

    onLoad () {
                // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
            this.render = this.node.getComponent(Graphics); 
            this.polygonCollider = this.node.getComponent(PolygonCollider2D); 
            this.plot(); 
    }

    plot () {
            this.render?.clear(); 
            if(!this.polygonCollider || !this.render) return;
            for (var i = 0; i < this.polygonCollider?.points?.length; i ++) { 
                var pt = this.polygonCollider.points[i]; 
                if (i == 0) { 
                    this.render.moveTo(pt.x + this.polygonCollider.offset.x, pt.y + this.polygonCollider.offset.y); 
                }   
                else { 
                    this.render.lineTo(pt.x + this.polygonCollider.offset.x, pt.y + this.polygonCollider.offset.y); 
                } 
            } 
            this.render.fill(); 
    }

    updateVertexArray (points: any) {
        if(!this.polygonCollider ) return;
            this.polygonCollider.points = points; 
            this.plot(); 
    }

    getVertexArray () {
        if(!this.polygonCollider ) return;
            var vertexArray = []; 
            for (var j = 0; j < this.polygonCollider.points.length; j ++) { 
                var point = this.polygonCollider.points[j]; 
                var point2 = point.rotate(this.node.angle * Math.PI / 180); 
                vertexArray.push(new Vec2(point2.x + this.node.x + this.polygonCollider.offset.x, point2.y + this.node.y + this.polygonCollider.offset.y)); 
            } 
            return vertexArray; 
    }

    _resetRender () {
            this.plot(); 
    }

    onFocusInEditor () {
            this.plot(); 
    }

    onLostFocusInEditor () {
            this.plot(); 
    }

    onEnable () {
            this.plot(); 
    }

    onDisable () {
            this.plot(); 
    }

    lateUpdate (delta: any) {
            // cc.engine.repaintInEditMode(); 
            this.plot(); 
    }

}

