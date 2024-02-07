import { _decorator, Component, EPhysics2DDrawFlags, error, Graphics, PhysicsSystem2D, PolygonCollider2D, Vec2 } from 'cc';
const { ccclass, executeInEditMode } = _decorator;

@ccclass('PolygonColliderObstacle')
@executeInEditMode
export class PolygonColliderObstacle extends Component {

        render!: Graphics | null;
        polygonCollider!: PolygonCollider2D | null;

        onLoad() {
                this.render = this.node.getComponent(Graphics);
                this.polygonCollider = this.node.getComponent(PolygonCollider2D);
                this.plot();
        }

        plot() {
                this.render?.clear();
                if (!this.polygonCollider || !this.render) return;
                for (let i = 0; i < this.polygonCollider?.points?.length; i++) {
                        let pt = this.polygonCollider.points[i];
                        if (i == 0) {
                                this.render.moveTo(pt.x + this.polygonCollider.offset.x, pt.y + this.polygonCollider.offset.y);
                        }
                        else {
                                this.render.lineTo(pt.x + this.polygonCollider.offset.x, pt.y + this.polygonCollider.offset.y);
                        }
                }
                this.render.close();
                this.render.stroke();
                this.render.fill();
        }

        updateVertexArray(points: any) {
                if (!this.polygonCollider) return;
                this.polygonCollider.points = points;
                this.plot();
        }

        getVertexArray() {
                console.trace();
                if (!this.polygonCollider) return;
                let vertexArray = [];
                for (let j = 0; j < this.polygonCollider.points.length; j++) {
                        let point = this.polygonCollider.points[j];
                        let point2 = point.rotate(this.node.angle * Math.PI / 180);
                        const data = new Vec2(point2.x + this.node.position.x + this.polygonCollider.offset.x, point2.y + this.node.position.y + this.polygonCollider.offset.y);
                        vertexArray.push(data);
                }
                console.log("Vertex array", vertexArray);
                return vertexArray;
        }
}

