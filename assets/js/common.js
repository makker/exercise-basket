

/* Polyfill for NodeList.forEach from 
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
 */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Define clobal event added function
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

function initCommon() {
    // If dev url param then add class dev to body to enable some dev enhancements
    // This feature should be removed before deploying to production
    if (window.location.href.indexOf("?dev") > -1) {
        document.body.classList.add("dev");
    }
};

addEvent(document, "DOMContentLoaded", initCommon);
