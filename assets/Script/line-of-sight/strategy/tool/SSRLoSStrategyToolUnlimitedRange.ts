
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyToolBase } from './SSRLoSStrategyToolBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolUnlimitedRange')
export class ssrLoSStrategyToolUnlimitedRange extends ssrLoSStrategyToolBase {
    @property
    public "extends" = 'ToolBase';
	_losComponentCore: any;

    isPointVisible (targetPoint: any) {
        	var inclusionTestResult = ssr.LoS.Helper.pointRetangleInclusionTest(targetPoint, this._losComponentCore.getSightBoundary().getRectangle()); 
        	if (inclusionTestResult == ssr.LoS.Constant.POINT_RECT_TEST.OUT) { 
        		return false; 
        	} 
        	else { 
        		return this._super(targetPoint); 
        	} 
    }

}

ssr.LoS.Strategy.Tool.UnlimitedRange = ssrLoSStrategyToolUnlimitedRange;
