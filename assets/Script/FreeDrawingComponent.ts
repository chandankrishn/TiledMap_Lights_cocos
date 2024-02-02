import { _decorator, Component, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FreeDrawingComponent')
export class FreeDrawingComponent extends Component {
    @property
    public render;
_vertexArray: [] = [];

    onLoad () {
            this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this); 
            this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this); 
            this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this); 
            this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this); 
    }

    update (dt: any) {
    }

    onTouchStart (event: any) {
            var location = this.node.getComponent(UITransform).convertToNodeSpaceAR(event.getLocation()); 
            this._vertexArray = []; 
            this.render.clear(); 
            this.render.moveTo(location.x, location.y); 
            this._vertexArray.push(location); 
            this.node.emit('FreeDrawingComponent_onTouchStart', this._vertexArray); 
    }

    onTouchMove (event: any) {
            var location = this.node.getComponent(UITransform).convertToNodeSpaceAR(event.getLocation()); 
            var prePosition : Vec3 = new Vec3(this._vertexArray[this._vertexArray.length - 1].x ,this._vertexArray[this._vertexArray.length - 1].y,1); 
            if (prePosition.subtract(location).length() < 10) { 
                return; 
            } 
            this.render.lineTo(location.x, location.y); 
            this.render.stroke(); 
            this._vertexArray.push(location); 
            this.node.emit('FreeDrawingComponent_onTouchMove', this._vertexArray); 
    }

    onTouchEnd (event: any) {
            var location = event.getLocation(); 
            location = this.node.getComponent(UITransform).convertToNodeSpaceAR(location); 
            this.render.lineTo(location.x, location.y); 
            this.node.emit('FreeDrawingComponent_onTouchEnd', this._vertexArray); 
    }

}

