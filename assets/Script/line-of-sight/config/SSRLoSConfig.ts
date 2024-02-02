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

// const ssr = require('../namespace/SSRLoSNamespace');
import { sys } from "cc";
import ssr from "../namespace/SSRLoSNamespace";

/**
 * The modules that will be activated in Native if JSBinding is available
 * @constant
 * @type Array.<String>
 */
ssr.LoS.Config.Modules = [
    "Core", 
    "Util", 
    // "Obstacle", 
    // "Mask",
    // "RenderBase",
    // "RenderBlockingEdge",
    // "RenderHitPoint",
    // "RenderPotentialBlockingEdge",
    // "RenderRay",
    // "RenderSightArea",
    // "RenderSightLight",
    // "RenderSightRange",
    // "RenderSightVert",
    // "RenderVisibleEdge",
    // "RenderSightLight",
];

/**
 * Check if the module is available in JSBinding.
 * @function
 * @private
 * @param {String} moduleName The module name.
 * @return {Boolean} True for available false for not.
 */
ssr.LoS.Config.isModuleNativeImplemented = function(moduleName : any) {
    if(sys.isNative) {
        var moduleNativeName = moduleName + "Native";
        if (ssr.LoS.Component[moduleNativeName]) {
            return true;
        }
        else if (ssr.LoS.Data[moduleNativeName]) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

/**
 * Enable the module in JSBinding.
 * @function
 * @private
 * @param {String} moduleName The module name.
 */
ssr.LoS.Config.enableModuNativeImplemention = function(moduleName: any) {
    if(sys.isNative) {
        var moduleNativeName = moduleName;
        if (ssr.LoS.Component[moduleName]) {
            ssr.LoS.Component[moduleName] = ssr.LoS.Component[moduleNativeName];
        }
        if (ssr.LoS.Data[moduleName]) {
            ssr.LoS.Data[moduleName] = ssr.LoS.Data[moduleNativeName];
        }
        if (ssr.LoS[moduleName]) {
            ssr.LoS[moduleName] = ssr.LoS[moduleNativeName];
        }
    }
};

/**
 * Try to enable the all the modules in JSBinding in Native. This will be called on boot.
 * @function
 * @private
 */
ssr.LoS.Config.__initModules = function() {
    if(sys.isNative) {
       for (var i = 0; i < ssr.LoS.Config.Modules.length; i ++) {
            var moduleName = ssr.LoS.Config.Modules[i];
            if (ssr.LoS.Config.isModuleNativeImplemented(moduleName)) {
                ssr.LoS.Config.enableModuNativeImplemention(moduleName);
                console.log("isModuleNativeImplemented ok: " + moduleName);
            }
            else {
                console.log("isM oduleNativeImplemented na: " + moduleName);
            }
        }
    }
};//();
