
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import {  ssrLoSStrategyToolLimitedRange } from './SSRLoSStrategyToolLimitedRange';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyToolLimitedRangeWithFullAngle')
export class ssrLoSStrategyToolLimitedRangeWithFullAngle extends ssrLoSStrategyToolLimitedRange {
    // @property
    // public "extends" = 'ToolLimitedRange';

    isPointVisible (targetPoint: any) {
        	var inclusionTestResult = ssr.LoS.Helper.pointCircleInclusionTest( 
                targetPoint,  
        		this._losComponentCore.getPosition(),  
        		this._losComponentCore.getRadius() 
        	); 
            if (inclusionTestResult == ssr.LoS.Constant.POINT_RECT_TEST.OUT) { 
                return false; 
            } 
            return this._super(targetPoint); 
    }

}
ssr.LoS.Strategy.Tool.LimitedRangeWithFullAngle = ssrLoSStrategyToolLimitedRangeWithFullAngle;
