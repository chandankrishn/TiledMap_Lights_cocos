import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PolygonDrawingComponent')
export class PolygonDrawingComponent extends Component {
    @property
    public render;
    _vertexArray: [];

    onLoad() {
        this._vertexArray = [];
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    update(dt: any) {
    }

    onTouchStart(event: any) {
        let location = this.node.getComponent(UITransform).convertToNodeSpaceAR(event.getLocation());
        if (this._vertexArray.length == 0) {
            this._vertexArray.push(location);
        }
        this._plot(location);
        this.node.emit('PolygonDrawingComponent_onTouchStart', this._vertexArray);
    }

    onTouchMove(event: any) {
        let location = this.node.getComponent(UITransform).convertToNodeSpaceAR(event.getLocation());
        if (this._vertexArray.length > 0) {
            this._plot(location);
        }
        this.node.emit('PolygonDrawingComponent_onTouchMove', this._vertexArray);
    }

    onTouchEnd(event: any) {
        let location = event.getLocation();
        location = this.node.getComponent(UITransform).convertToNodeSpaceAR(location);
        if (this._vertexArray.length > 0) {
            if (location.sub(this._vertexArray[this._vertexArray.length - 1]).mag() < 20) {
                this._vertexArray.push(location);
                this.node.emit('PolygonDrawingComponent_onTouchEnd', this._vertexArray.slice(), false);
                this.render.clear();
                this._vertexArray = [];
            }
            else if (location.sub(this._vertexArray[0]).mag() < 20) {
                this._vertexArray.push(location);
                this.node.emit('PolygonDrawingComponent_onTouchEnd', this._vertexArray.slice(), true);
                this.render.clear();
                this._vertexArray = [];
            }
            else {
                this._vertexArray.push(location);
                this._plot();
            }
        }
    }

    _plot(position: any) {
        this.render.clear();
        if (this._vertexArray.length == 1) {
            this.render.moveTo(this._vertexArray[0].x, this._vertexArray[0].y);
            this.render.lineTo(position.x, position.y);
            this.render.stroke();
        }
        else if (this._vertexArray.length == 2) {
            if (position) {
                this.render.moveTo(this._vertexArray[0].x, this._vertexArray[0].y);
                this.render.lineTo(this._vertexArray[1].x, this._vertexArray[1].y);
                this.render.lineTo(position.x, position.y);
                this.render.stroke();
                this.render.fill();
            }
            else {
                this.render.moveTo(this._vertexArray[0].x, this._vertexArray[0].y);
                this.render.lineTo(this._vertexArray[1].x, this._vertexArray[1].y);
                this.render.stroke();
            }
        }
        else {
            let vertexArrayCopy = this._vertexArray.slice();
            if (position) {
                vertexArrayCopy.push(position);
            }
            for (let i = 0; i < vertexArrayCopy.length; i++) {
                if (i == 0) {
                    this.render.moveTo(vertexArrayCopy[i].x, vertexArrayCopy[i].y);
                }
                else {
                    this.render.lineTo(vertexArrayCopy[i].x, vertexArrayCopy[i].y);
                    if (i == vertexArrayCopy.length - 1) {
                        this.render.lineTo(vertexArrayCopy[0].x, vertexArrayCopy[0].y);
                    }
                }
            }
            this.render.stroke();
            this.render.fill();
        }
    }

}

