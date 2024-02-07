
import { _decorator, Button, Component, director, Label, Node, Rect, ScrollView, Toggle, view } from 'cc';
import ssr from '../line-of-sight/namespace/SSRLoSNamespace';
import { LoSRenderLayer } from './LoSRenderLayer';
const { ccclass, property } = _decorator;

@ccclass('FloatingMenu')
export class FloatingMenu extends Component {
    @property(Node)
    public robot!: Node;



    @property(Node)
    public obstaclesGroup!: Node;
    @property
    public lightsGroup!: Node;

    @property(ScrollView)
    public floatingMenu!: ScrollView;

    // @property
    // public floatingMenu : Node;


    _obstacleCount!: number;
    _lightsCount!: number;
    losRenderLayer!: Component | null;
    performance!: Component | null;
    robotObject!: Component | null;
    robotLoSComponent!: Component | null;
    robotLoSCore!: any;
    _losMaskRenderMenuPanelItem!: Node | null;
    _sightAreaRenderMenuPanelItem!: Node | null;
    _sightLightRenderMenuPanelItem!: Node | null;
    _sightRangeRenderMenuPanelItem!: Node | null;
    _rayRenderMenuPanelItem!: Node | null;
    _hitPointRenderMenuPanelItem!: Node | null;
    _sightVertRenderMenuPanelItem!: Node | null;
    _potentialBlockingEdgesRenderMenuPanelItem!: Node | null;
    _blockingEdgesRenderMenuPanelItem!: Node | null;
    _visibleEdgeRenderMenuPanelItem!: Node | null;
    _sightRangePlusMenuPanelItem!: Node | null;
    _sightRangeMinusMenuPanelItem!: Node | null;
    _sightAnglePlusMenuPanelItem!: Node | null;
    _sightAngleMinusMenuPanelItem!: Node | null;
    _sightSizeMenuPanelItem!: Node | null;
    _sightRectMenuPanelItem!: Node | null;
    _dirtyDetectionPanelItem!: Node | null;
    _randomObstaclesPanelItem!: Node | null;
    _randomLightsPanelItem!: Node | null;
    _autoRotationPanelItem!: Node | null;
    _sightRayDebugLabel: any;
    _hitPointDebugLabel: any;
    _potentialBlockingEdgeDebugLabel: any;
    _blockingEdgeDebugLabel: any;
    _visibleEdgeDebugLabel: any;
    _sightVertDebugLabel: any;
    _sightRangeDebugLabel: any;
    _sightAngleDebugLabel: any;
    _randomObstaclesDebugLabel: any;
    _randomLightsDebugLabel: any;
    _isTransformationDirtyDetectionOn!: boolean;
    // floatingMenu: import("cc").Director;

    start() {
        this._obstacleCount = 10;
        this._lightsCount = 0;
        this.losRenderLayer = this.node.getComponent(LoSRenderLayer);
        this.performance = this.node.getComponent("Performance");
        this.robotObject = this.robot.getComponent("Robot");
        this.robotLoSComponent = this.robot.getComponent("SSRLoSComponentCore");
        this.robotLoSCore = this.robotLoSComponent.getLoSCore();
        this._initFloatingMenu();
        this._initDebugDraw();
    }

    _initFloatingMenu() {
        // this.floatingMenu =  director.getScene()?.getChildByName("RenderRoot2D").getChildByName('FloatingMenu').getChildByName("scrollView").getComponent("ScrollView"); 
        this._losMaskRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_rayRenderMenuPanelItem");
        this._sightAreaRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_sightAreaRenderMenuPanelItem");
        this._sightLightRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_sightLightRenderMenuPanelItem");
        this._sightRangeRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_sightRangeRenderMenuPanelItem");
        this._rayRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_rayRenderMenuPanelItem");
        this._hitPointRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_hitPointRenderMenuPanelItem");
        this._sightVertRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_sightVertRenderMenuPanelItem");
        this._potentialBlockingEdgesRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_potentialBlockingEdgesRenderMenuPanelItem");
        this._blockingEdgesRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_blockingEdgesRenderMenuPanelItem");
        this._visibleEdgeRenderMenuPanelItem = this.floatingMenu.content.getChildByName("_visibleEdgeRenderMenuPanelItem");
        this._sightRangePlusMenuPanelItem = this.floatingMenu.content.getChildByName("_sightRangePlusMenuPanelItem");
        this._sightRangeMinusMenuPanelItem = this.floatingMenu.content.getChildByName("_sightRangeMinusMenuPanelItem");
        this._sightAnglePlusMenuPanelItem = this.floatingMenu.content.getChildByName("_sightAnglePlusMenuPanelItem");
        this._sightAngleMinusMenuPanelItem = this.floatingMenu.content.getChildByName("_sightAngleMinusMenuPanelItem");
        this._sightSizeMenuPanelItem = this.floatingMenu.content.getChildByName("_sightSizeMenuPanelItem");
        this._sightRectMenuPanelItem = this.floatingMenu.content.getChildByName("_sightRectMenuPanelItem");
        this._dirtyDetectionPanelItem = this.floatingMenu.content.getChildByName("_dirtyDetectionPanelItem");
        this._randomObstaclesPanelItem = this.floatingMenu.content.getChildByName("_randomObstaclesPanelItem");
        this._randomLightsPanelItem = this.floatingMenu.content.getChildByName("_randomLightsPanelItem");
        this._autoRotationPanelItem = this.floatingMenu.content.getChildByName("_autoRotationPanelItem");
    }

    _initDebugDraw() {

        this._sightRayDebugLabel = this._rayRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._sightRayDebugLabel.string = "(-)";
        this._sightRayDebugLabel.node.color = this.losRenderLayer?._losComponentRenderRay.getRender().strokeColor;
        this._hitPointDebugLabel = this._hitPointRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._hitPointDebugLabel.string = "(-)";
        this._hitPointDebugLabel.node.color = this.losRenderLayer?._losComponentRenderHitPoint.getRender().strokeColor;
        this._potentialBlockingEdgeDebugLabel = this._potentialBlockingEdgesRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._potentialBlockingEdgeDebugLabel.string = "(-)";
        this._potentialBlockingEdgeDebugLabel.node.color = this.losRenderLayer?._losComponentRenderPotentialBlockingEdge.getRender().strokeColor;
        this._blockingEdgeDebugLabel = this._blockingEdgesRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._blockingEdgeDebugLabel.string = "(-)";
        this._blockingEdgeDebugLabel.node.color = this.losRenderLayer?._losComponentRenderBlockingEdge.getRender().strokeColor;
        this._visibleEdgeDebugLabel = this._visibleEdgeRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._visibleEdgeDebugLabel.string = "(-)";
        this._visibleEdgeDebugLabel.node.color = this.losRenderLayer._losComponentRenderVisibleEdge.getRender().strokeColor;
        this._sightVertDebugLabel = this._sightVertRenderMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._sightVertDebugLabel.string = "(-)";
        this._sightVertDebugLabel.node.color = this.losRenderLayer._losComponentRenderSightVert.getRender().strokeColor;
        this._sightRangeDebugLabel = this._sightRangePlusMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._sightRangeDebugLabel.string = "(-)";
        this._sightAngleDebugLabel = this._sightAnglePlusMenuPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._sightAngleDebugLabel.string = "(-)";
        this._randomObstaclesDebugLabel = this._randomObstaclesPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._randomObstaclesDebugLabel.string = "(✖️ 10)";
        this._randomLightsDebugLabel = this._randomLightsPanelItem?.getChildByName("debug")?.getComponent(Label);
        this._randomLightsDebugLabel.string = "(✖️ 0)";
    }

    losMaskRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableLoSMask();
        }
        else {
            this.enableLoSMask();
        }
    }

    sightAreaRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableSightArea();
        }
        else {
            this.enableSightArea();
        }
    }

    sightLightRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableSightLight();
        }
        else {
            this.enableSightLight();
        }
    }

    sightRangeRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableSightRangeRender();
        }
        else {
            this.enableSightRangeRender();
        }
    }

    rayRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableRayRender();
        }
        else {
            this.enableRayRender();
        }
    }

    hitPointRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableHitPointRender()
        }
        else {
            this.enableHitPointRender();
        }
    }

    sightVertRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableSightVertRender()
        }
        else {
            this.enableSightVertRender();
        }
    }

    potentialBlockingEdgesRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disablePotentialBlockingEdgesRender();
        }
        else {
            this.enablePotentialBlockingEdgesRender();
        }
    }

    blockingEdgesRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableBlockingEdgesRender();
        }
        else {
            this.enableBlockingEdgesRender()
        }
    }

    visibleEdgeRenderMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableVisibleEdgesRender();
        }
        else {
            this.enableVisibleEdgesRender();
        }
    }

    sightRangeMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableSightRange();
        }
        else {
            this.enableSightRange();
        }
    }

    sightRangePlusMenuCallback(sender: any, data: any) {
        this.sightRangePlus();
    }

    sightRangeMinusMenuCallback(sender: any, data: any) {
        this.sightRangeMinus();
    }

    endAnglePlusMenuCallback(sender: any, data: any) {
        this.sightEndAnglePlus();
    }

    sightAnglePlusMenuCallback(sender: any, data: any) {
        this.sightAnglePlus();
    }

    sightAngleMinusMenuCallback(sender: any, data: any) {
        this.sightAngleMinus();
    }

    endAngleMinusMenuCallback(sender: any, data: any) {
        this.sightEndAngleMinus();
    }

    dirtyDetectionMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableDirtyDetection();
        }
        else {
            this.enableDirtyDetection();
        }
    }

    sightRectMenuCallback(sender: any) {
        this._sightSizeMenuPanelItem.getComponent(Toggle).isChecked = false;
        if (sender.isChecked == 0) {
            this.robotLoSCore.enableAutoGenerateBoundary();
        }
        else {
            this.robotLoSCore.setSightRect(new Rect(-300, -300, 600, 600));
        }
    }

    sightSizeMenuCallback(sender: any) {
        this._sightRectMenuPanelItem.getComponent(Toggle).isChecked = false;
        if (sender.isChecked == 0) {
            this.robotLoSCore.enableAutoGenerateBoundary();
        }
        else {
            this.robotLoSCore.setSightSize(view.getVisibleSize().width / 2, view.getVisibleSize().height / 2);
        }
    }

    followMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableFollow();
        }
        else {
            this.enableFollow();
        }
    }

    randomObstaclesMenuCallback(sender: any, data: any) {
        this._obstacleCount += 10;
        this._randomObstaclesDebugLabel.string = "(✖️ " + this._obstacleCount + ")";
        this.performance.randomObstacles(this._obstacleCount);
    }

    randomLightsMenuCallback(sender: any, data: any) {
        this._lightsCount += 2;
        this._randomLightsDebugLabel.string = "(✖️ " + this._lightsCount + ")";
        this.performance.randomLights(this._lightsCount);
    }

    autoRotationMenuCallback(sender: any, data: any) {
        if (sender.isChecked == 0) {
            this.disableAutoRotation();
        }
        else {
            this.enableAutoRotation();
        }
    }


    disableLoSMask() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losMaskNode.node.active = false;
    }
    enableLoSMask() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losMaskNode.node.active = true;
    }
    enableSightArea() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightArea.node.active = true;
    }
    disableSightArea() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightArea.node.active = false;
        this.losRenderLayer._losComponentRenderSightArea.clear();
    }
    enableSightLight() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightLight.node.active = true;
    }
    disableSightLight() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightLight.node.active = false;
        this.losRenderLayer._losComponentRenderSightLight.clear();
    }
    enableSightRangeRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightRange.node.active = true;
    }
    disableSightRangeRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightRange.node.active = false;
        this.losRenderLayer._losComponentRenderSightRange.clear();
    }
    enableRayRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderRay.node.active = true;
    }
    disableRayRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderRay.node.active = false;
        this.losRenderLayer._losComponentRenderRay.clear();
    }
    enableHitPointRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderHitPoint.node.active = true;
    }
    disableHitPointRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderHitPoint.node.active = false;
        this.losRenderLayer._losComponentRenderHitPoint.clear();
    }
    enableSightVertRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightVert.node.active = true;
    }
    disableSightVertRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderSightVert.node.active = false;
        this.losRenderLayer._losComponentRenderSightVert.clear();
    }
    enablePotentialBlockingEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderPotentialBlockingEdge.node.active = true;
    }
    disablePotentialBlockingEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderPotentialBlockingEdge.node.active = false;
        this.losRenderLayer._losComponentRenderPotentialBlockingEdge.clear();
    }
    enableBlockingEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderBlockingEdge.node.active = true;
    }
    disableBlockingEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderBlockingEdge.node.active = false;
        this.losRenderLayer._losComponentRenderBlockingEdge.clear();
    }
    enableVisibleEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderVisibleEdge.node.active = true;
    }
    disableVisibleEdgesRender() {
        this.robotObject.isForceLoSUpdate = true;
        this.losRenderLayer._losComponentRenderVisibleEdge.node.active = false;
        this.losRenderLayer._losComponentRenderVisibleEdge.clear();
    }
    enableDirtyDetection() {
        if (this.robot) {
            let obstacles = this.robotLoSCore.getObstacles();
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].enableDirtyDetection();
            }
        }
        let lights = this.lightsGroup.getChildren();
        for (let i = 0; i < lights.length; i++) {
            let obstacles = lights[i].getComponent("SSRLoSComponentCore").getLoSCore().getObstacles();
            for (let j = 0; j < obstacles.length; j++) {
                obstacles[j].enableDirtyDetection();
            }
        }
        this._isTransformationDirtyDetectionOn = true;
    }
    disableDirtyDetection() {
        if (this.robot) {
            let obstacles = this.robotLoSCore.getObstacles();
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].disableDirtyDetection();
            }
        }
        let lights = this.lightsGroup.getChildren();
        for (let i = 0; i < lights.length; i++) {
            let obstacles = lights[i].getComponent("SSRLoSComponentCore").getLoSCore().getObstacles();
            for (let j = 0; j < obstacles.length; j++) {
                obstacles[j].disableDirtyDetection();
            }
        }
        this._isTransformationDirtyDetectionOn = false;
    }
    enableSightRange() {
        if (this.robotLoSCore.getRadius() == -1) {
            this.robotLoSCore.setRadius(32 * 4);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightRangePlusMenuPanelItem.getComponent(Button).interactable = true;
        this._sightRangeMinusMenuPanelItem.getComponent(Button).interactable = true;
        this._sightAnglePlusMenuPanelItem.getComponent(Button).interactable = true;
        this._sightAngleMinusMenuPanelItem.getComponent(Button).interactable = true;
        this._sightSizeMenuPanelItem.getComponent(Button).interactable = false;
        this._sightRectMenuPanelItem.getComponent(Button).interactable = false;

        this._sightRangeDebugLabel.string = " (" + this.robotLoSCore.getRadius() + ")";
        this._sightAngleDebugLabel.string = " (" + this.robotLoSCore.getCentralAngle() + ")";
    }
    disableSightRange() {
        this.robotLoSCore.setCentralAngle(ssr.LoS.Constant.FULL_ANGLE);
        this.robotLoSCore.setRadius(ssr.LoS.Constant.UNLIMITED_RANGE);
        this.robotObject.isForceLoSUpdate = true;
        this._sightRangePlusMenuPanelItem.getComponent(Button).interactable = false;
        this._sightRangeMinusMenuPanelItem.getComponent(Button).interactable = false;
        this._sightAnglePlusMenuPanelItem.getComponent(Button).interactable = false;
        this._sightAngleMinusMenuPanelItem.getComponent(Button).interactable = false;
        this._sightSizeMenuPanelItem.getComponent(Button).interactable = true;
        this._sightRectMenuPanelItem.getComponent(Button).interactable = true;

        this._sightRangeDebugLabel.string = "N/A";
        this._sightAngleDebugLabel.string = "N/A";
    }
    sightRangeMinus() {
        if (this.robot) {
            let radius = this.robotLoSCore.getRadius();
            if (radius <= 0) {
                return;
            }
            this.robotLoSCore.setRadius(radius - 8);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightRangeDebugLabel.string = " (" + this.robotLoSCore.getRadius() + ")";
    }
    sightRangePlus() {
        if (this.robot) {
            let radius = this.robotLoSCore.getRadius();
            this.robotLoSCore.setRadius(radius + 8);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightRangeDebugLabel.string = " (" + this.robotLoSCore.getRadius() + ")";
    }
    sightAnglePlus() {
        if (this.robot) {
            let angle = this.robotLoSCore.getCentralAngle();
            this.robotLoSCore.setCentralAngle(angle + 2);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightAngleDebugLabel.string = " (" + this.robotLoSCore.getCentralAngle() + "°)";
    }
    sightAngleMinus() {
        if (this.robot) {
            let angle = this.robotLoSCore.getCentralAngle();
            this.robotLoSCore.setCentralAngle(angle - 2);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightAngleDebugLabel.string = " (" + this.robotLoSCore.getCentralAngle() + "°)";
    }
    sightEndAnglePlus() {
        if (this.robot) {
            let endAngle = this.robotLoSCore.getEndAngle();
            this.robotLoSCore.setEndAngle(endAngle + 2);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightAngleDebugLabel.string = " (" + this.robotLoSCore.getCentralAngle() + "°)";
    }
    sightEndAngleMinus() {
        if (this.robot) {
            let endAngle = this.robotLoSCore.getEndAngle();
            this.robotLoSCore.setEndAngle(endAngle - 2);
        }
        this.robotObject.isForceLoSUpdate = true;
        this._sightAngleDebugLabel.string = " (" + this.robotLoSCore.getCentralAngle() + "°)";
    }
    disableFollow() {
        this.robotObject.useCamera = false;
    }
    enableFollow() {
        this.robotObject.useCamera = true;
        this.robotObject.isForceLoSUpdate = true;
    }
    disableAutoRotation() {
        let obstaclesArray = this.obstaclesGroup.getChildren();
        // for (let i = 0; i < obstaclesArray.length; i ++) {
        //     obstaclesArray[i].stopAllActions();
        // }
    }
    enableAutoRotation() {
        let obstaclesArray = this.obstaclesGroup.getChildren();
        for (let i = 0; i < obstaclesArray.length; i++) {
            // obstaclesArray[i].runAction(
            //     cc.repeatForever(
            //         cc.rotateBy(10, 360)
            //     )
            // );
        }
    }
    //
    updateDebugDraw() {
        let rayCount = this.robotLoSCore.getRayCount();
        this._sightRayDebugLabel.string = (" (" + rayCount + ")");

        let hitPointCount = this.robotLoSCore.getHitPointCount();
        this._hitPointDebugLabel.string = (" (" + hitPointCount + ")");

        let sightVertCount = this.robotLoSCore.getSightAreaVertCount();
        this._sightVertDebugLabel.string = (" (" + sightVertCount + ")");

        let potentialBlockingEdgeCount = this.robotLoSCore.getPotentialBlockingEdgeCount();
        this._potentialBlockingEdgeDebugLabel.string = (" (" + potentialBlockingEdgeCount + ")");

        let blockingEdgeCount = this.robotLoSCore.getBlockingEdgeCount();
        this._blockingEdgeDebugLabel.string = (" (" + blockingEdgeCount + ")");

        let visibleEdgeCount = this.robotLoSCore.getVisibleEdgeCount();
        this._visibleEdgeDebugLabel.string = (" (" + visibleEdgeCount + ")");
    }

}

