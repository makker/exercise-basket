
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
            buttonMenu: null,
            menuWrapper: null,
        },
        list = null;

    mod.init = function() {
        dataManager.init(mod.utils);
        viewManager.init(mod.utils, dataManager);
        lists = dataManager.getLists();
        
        s.buttonAddListDialog = document.getElementById("buttonAddListDialog");
        s.buttonMenu = document.getElementById("buttonMenu");
        s.menuWrapper = document.getElementById("menu");

        // Set common UI event handlers
        addEvent(s.buttonAddListDialog, "click", viewManager.addListDialog.bind(viewManager));
        addEvent(s.buttonMenu, "click", mod.toggleMenu.bind(mod));
    }

    mod.toggleMenu = function() {
        if (document.body.className.indexOf("menuOpen") > -1) {
            document.body.classList.remove("menuOpen");
        } else {
            document.body.classList.add("menuOpen");
        }
    };

    return mod;
})();

function init() {

    app.init();
};

addEvent(document, "DOMContentLoaded", init);