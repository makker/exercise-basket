
// Set app.dataManager sub module
(function(mod) {
    var setting = {    // settings
    };
    
    mod.getElsByClass = function(className, root) {
        if(root == undefined) root = document.body;

        var els = root.getElementsByClassName(className);

        if (els.length > 0) {
            var arr = [];

            for (var i = 0; i < els.length; i++) {
                arr.push(els[i]);
            };

            return arr;

        } else {
            console.warn("Any element with class '"+ className +"' couldn't be found in", root);
        }
    };

    mod.getElByClass = function(className, root) {
        var el = mod.getElsByClass(className, root)[0];
        return el;
    };

    mod.setTextByClass = function(node, className, text) {
        var els = mod.getElsByClass(className, node);

        if (els) {
            els.forEach(function(el){
                el.appendChild(document.createTextNode(text));
            });
        }
    };

    mod.getURLParams = function(type) {
        var paramStrings = window.location.search.substring(1).split('&');

        var params = (type == "lookup") ? {} : [];
        paramStrings.forEach(function(paramString, index) {
            param = paramString.split("=");
            if(param[0] == undefined) param[1] = param[0];
            if (type == "lookup") {
                params[param[0]] = param[1];
            } else if (type == "indexLookup") {
                params[param[0]] = index;
            } else {
                params.push(param);
            }
        });
        return params;
    };

    mod.getURLParam = function(name) {
        return mod.getURLParams("lookup")[name];
    };

    mod.setURLParam = function(name, value) {
        var indexLookup = mod.getURLParams("indexLookup"),
            URLParamStrings = [];

        var params = mod.getURLParams();

        if (value === undefined) {
            // remove
            if (indexLookup[name] !== undefined) {
                params.splice(indexLookup[name], 1);
            }

        } else if (indexLookup[name] === undefined) {
            // add
            params.push([name, value]);

        } else {
            // change
            params[indexLookup[name]] = [name, value];
        }
        
        params.forEach(function(param) {
            if (Array.isArray(param) && param.length > 0) {
                URLParamStrings.push(param.join("="));
            }
        });

        history.replaceState({}, "index", "index.html?" + URLParamStrings.join("&"));
        // window.location.search = URLParams;
        
    };

})(window.app.utils);
