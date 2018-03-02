
app = (function() {
    var dataManager = {}, 
        viewManager = {}, 
        utils = {},
        mod = { 
            utils:utils, 
            dataManager: dataManager, 
            viewManager: viewManager 
        },
        // SETTINGS
        s = {   
            buttonAddList: null,
        },
        list = null;

    mod.init = function() {
        dataManager.init(mod.utils);
        viewManager.init(mod.utils, dataManager);
        lists = dataManager.getLists();
        
        s.buttonAddListDialog = document.getElementById("buttonAddListDialog");

        // Set common UI event handlers
        addEvent(s.buttonAddListDialog, "click", viewManager.addListDialog.bind(viewManager));
    }

    return mod;
})();

function init() {

    app.init();
};

addEvent(document, "DOMContentLoaded", init);