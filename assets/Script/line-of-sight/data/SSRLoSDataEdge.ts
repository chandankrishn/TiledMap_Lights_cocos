/****************************************************************************
Copyright (c) 2017-2018 SuperSuRaccoon

Site: http://www.supersuraccoon-cocos2d.com
Mail: supersuraccoon@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
/**
* ssr.LoS.Data.Edge
* @class
* @extends cc.Class
* @prop {cc.Point}                         startPoint                         - The start point of the edge.
* @prop {cc.Point}                         endPoint                           - The end point of the edge.
* @prop {Number}                           edgeID                             - The id of the edge.
* @prop {ssr.LoS.Constant.EDGE_TYPE}       type                               - The type of the edge.
* @prop {cc.Point}                         edgeVector                         - The vector of the edge.
*/
/**
* The constructor
* @function
* @param {cc.Point} startPoint The start point of the edge.
* @param {cc.Point} endPoint The end point of the edge.
* @param {Number} edgeID The id of the edge.
* @param {ssr.LoS.Constant.EDGE_TYPE} type The type of the edge.
*/
/**
* The initializer.
* @function
* @param {cc.Point} startPoint The start point of the edge.
* @param {cc.Point} endPoint The end point of the edge.
* @param {Number} edgeID The id of the edge.
* @param {ssr.LoS.Constant.EDGE_TYPE} type The type of the edge.
*/
/**
* Get the start point.
* @function
* @return {cc.Point} The start point.
*/
/**
* Get the end point.
* @function
* @return {cc.Point} The end point.
*/
/**
* Get the edge id.
* @function
* @return {Number} The edge id.
*/
/**
* Get the edge type.
* @function
* @return {ssr.LoS.Constant.EDGE_TYPE} The edge type.
*/
/**
* Get the edge vector.
* @function
* @return {cc.Point} The edge edge vector.
*/
import { Vec2, _decorator } from 'cc';
import  ssr  from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataEdge')
export class ssrLoSDataEdge {
    _startPoint: any;
    _endPoint: any;
    _edgeID: any;
    _type: any;
    _edgeVector: any;

    constructor () {
            if (ssr.LoS.Data.Edge.__alloc === undefined) { 
                ssr.LoS.Data.Edge.__alloc = 0; 
            } 
            ssr.LoS.Data.Edge.__alloc += 1; 
    }

    init (startPoint: Vec2, endPoint: Vec2, edgeID: any, type: any) {
            this._startPoint = startPoint; 
            this._endPoint = endPoint; 
            this._edgeID = edgeID; 
            this._type = type; 
            this._edgeVector = endPoint.subtract(startPoint); 
    }

    getStartPoint () {
            return this._startPoint; 
    }

    getEndPoint () {
            return this._endPoint; 
    }

    getEdgeID () {
            return this._edgeID; 
    }

    getType () {
            return this._type; 
    }

    getEdgeVector () {
            return this._edgeVector; 
    }

}
ssr.LoS.Data.Edge = ssrLoSDataEdge;

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// /****************************************************************************
//  Copyright (c) 2017-2018 SuperSuRaccoon
//  
//  Site: http://www.supersuraccoon-cocos2d.com
//  Mail: supersuraccoon@gmail.com
// 
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
// 
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
// 
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//  ****************************************************************************/
//  
// const ssr = require('../namespace/SSRLoSNamespace');
// 
// /**
//  * ssr.LoS.Data.Edge
//  * @class
//  * @extends cc.Class
//  * @prop {cc.Point}                         startPoint                         - The start point of the edge.
//  * @prop {cc.Point}                         endPoint                           - The end point of the edge.
//  * @prop {Number}                           edgeID                             - The id of the edge.
//  * @prop {ssr.LoS.Constant.EDGE_TYPE}       type                               - The type of the edge.
//  * @prop {cc.Point}                         edgeVector                         - The vector of the edge.
//  */
// ssr.LoS.Data.Edge = cc.Class(/** @lends ssr.LoS.Data.Edge# */{
//     name: "ssr.LoS.Data.Edge",
//     "extends": cc.Object,
//     /**
//      * The constructor
//      * @function
//      * @param {cc.Point} startPoint The start point of the edge.
//      * @param {cc.Point} endPoint The end point of the edge.
//      * @param {Number} edgeID The id of the edge.
//      * @param {ssr.LoS.Constant.EDGE_TYPE} type The type of the edge.
//      */
//     constructor:function() {
//         if (ssr.LoS.Data.Edge.__alloc === undefined) {
//             ssr.LoS.Data.Edge.__alloc = 0;
//         }
//         ssr.LoS.Data.Edge.__alloc += 1;
//     },
//     /**
//      * The initializer.
//      * @function
//      * @param {cc.Point} startPoint The start point of the edge.
//      * @param {cc.Point} endPoint The end point of the edge.
//      * @param {Number} edgeID The id of the edge.
//      * @param {ssr.LoS.Constant.EDGE_TYPE} type The type of the edge.
//      */
//     init:function(startPoint, endPoint, edgeID, type) {
//         this._startPoint = startPoint;
//         this._endPoint = endPoint;
//         this._edgeID = edgeID;
//         this._type = type;
//         this._edgeVector = endPoint.sub(startPoint);
//     },
//     /**
//      * Get the start point.
//      * @function
//      * @return {cc.Point} The start point.
//      */
//     getStartPoint:function() {
//         return this._startPoint;
//     },
//     /**
//      * Get the end point.
//      * @function
//      * @return {cc.Point} The end point.
//      */
//     getEndPoint:function() {
//         return this._endPoint;
//     },
//     /**
//      * Get the edge id.
//      * @function
//      * @return {Number} The edge id.
//      */
//     getEdgeID:function() {
//         return this._edgeID;
//     },
//     /**
//      * Get the edge type.
//      * @function
//      * @return {ssr.LoS.Constant.EDGE_TYPE} The edge type.
//      */
//     getType:function() {
//         return this._type;
//     },
//     /**
//      * Get the edge vector.
//      * @function
//      * @return {cc.Point} The edge edge vector.
//      */
//     getEdgeVector:function() {
//         return this._edgeVector;
//     }
// });
