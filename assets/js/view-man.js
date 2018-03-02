
// Define app.viewManager sub module
(function(mod) {
    var s = { 
        // JS modules
        dataManager: null,
        utils: null,

        // HTML elements
        listsWrapper: null,
        listWrapper: null,
        listTemplate: null,
        itemTemplate: null,
        modalWrapper: null,
        
        // settings
        activeView: "lists",
        activeList: null,
        lang: langData.en,
        users: null,
    };

    mod.init = function(utils, dataManager) {

        // set reference to dataManager and utils
        s.dataManager = dataManager;
        s.utils = utils;

        s.users = dataManager.getUsers();

        // Define view based in URL params
        if (window.location.href) {
            var listId = s.utils.getURLParam("list");
            if (listId != undefined && dataManager.listExists(listId)) {
                s.activeList = dataManager.getList(listId);
                s.activeView = "list";
            }
        }

        // Set wrappers for later use 
        s.modalWrapper = document.getElementById("modalWrapper");
        s.listsWrapper = document.getElementById("listsWrapper");
        s.listWrapper = document.getElementById("listWrapper");

        // Set common button labels
        // TODO: Some UI texts still in HTML
        s.utils.setTextByClass(document, "buttonEdit", mod.buttonLabel("edit"));
        s.utils.setTextByClass(document, "buttonDelete", mod.buttonLabel("delete"));
        s.utils.setTextByClass(document, "buttonSend", mod.buttonLabel("send"));
        s.utils.setTextByClass(document, "buttonCollaborate", mod.buttonLabel("collaborate"));
        s.utils.setTextByClass(document, "buttonClose", mod.buttonLabel("close", "default"));
        s.utils.setTextByClass(document, "buttonCancel", mod.buttonLabel("cancel"));
        s.utils.setTextByClass(document, "buttonAdd", mod.buttonLabel("add"));

        // attach eventhandlers
        mod.setModalButtonEventHandlers();

        // Set HTML templates for list and item
        var listTemplateNode = document.getElementById("listTemplate"),
            itemTemplateNode = document.getElementById("itemTemplate");

        // Set item template element's html as item template and remove item template element
        s.itemTemplate = itemTemplateNode.innerHTML;
        itemTemplateNode.remove();

        // Set list template element's html as list template and remove lists template element
        s.listTemplate = listTemplateNode.innerHTML;
        listTemplateNode.remove();

        // Render view
        mod.updateView();
    };

    mod.updateView = function() {
        
        if (s.activeView != "list") {
            // Set URL params for current view
            s.utils.setURLParam("view", "lists");
            s.utils.setURLParam("list", undefined);

            // Set body classes to show current view
            document.body.classList.remove("listActive");
            document.body.classList.add("listsActive");

            // clear lists
            s.listsWrapper.innerHTML = "";

            // Render lists
            var lists = s.dataManager.getLists();
            if (lists.length > 0) {
                lists.forEach(function(list) {
                    // Set event callbacks
                    list.openCallBack = mod.openList;

                    // Populate list template with content and attach
                    var el = mod.populateList(list);
                    s.listsWrapper.appendChild(el);
                    
                    // Set event handlers
                    addEvent(el, "click", list.open.bind(list));
                });

            } else {
                // No lists alert
                s.listsWrapper.innerHTML = s.lang.alerts.noLists;
            }

        } else {
            var list = s.activeList;

            // Set URL params for current view
            s.utils.setURLParam("view", "list");
            s.utils.setURLParam("list", list.id);

            // clear old list HTML
            s.listWrapper.innerHTML = "";

            // Set body classes to show current view
            document.body.classList.remove("listsActive");
            document.body.classList.add("listActive");
            
            // Set event callbacks
            list.editCallBack = mod.editList;
            list.deleteCallBack = mod.deleteList;
            list.sendCallBack = mod.sendList;
            list.collborateCallBack = mod.collborateList;
            list.closeCallBack = mod.closeList;
            list.deleteItemCallBack = mod.deleteItem;

            // Populate template and attach
            var el = mod.populateList(s.activeList);
            s.listWrapper.appendChild(el);

            // Set event handlers
            addEvent(s.utils.getElByClass("buttonAddItem", el), "click", mod.addItem.bind(mod));
            addEvent(s.utils.getElByClass("buttonEdit", el), "click", list.edit.bind(list));
            addEvent(s.utils.getElByClass("buttonDelete", el), "click", list.delete.bind(list));
            addEvent(s.utils.getElByClass("buttonSend", el), "click", list.send.bind(list));
            addEvent(s.utils.getElByClass("buttonCollaborate", el), "click", list.collaborate.bind(list));
            addEvent(s.utils.getElByClass("buttonClose", el), "click", list.close.bind(list));

            // Set focus to add new item input field
            s.listWrapper.querySelector("#text").focus();
        }
    };

    mod.populateList = function(list) {
        var el = document.createElement('span'),
            itemsWrapper;

        // Get template HTML
        el.innerHTML = s.listTemplate;
        // Get items wrapper
        itemsWrapper = el.getElementsByClassName("listItems")[0];

        // Set texts
        s.utils.setTextByClass(el, "listTitle", list.title);
        s.utils.setTextByClass(el, "listDescription", list.description);

        // Populate list items 
        if (s.activeView == "list") {
            list.items.forEach(function(item) {
                mod.populateItem(item, itemsWrapper);
            });

        } else {
            // Only 3 items for dashboard lists
            for (var i = 0; (i < list.items.length && i < 3); i++) {
                var item = list.items[i];
                mod.populateItem(item, itemsWrapper);
            };
        }

        return el.firstElementChild;
    };
    
    mod.populateItem = function(item, root) {
        var el = document.createElement('span')
            checkbox = null,
            checkboxLabel = null,
            selectAssignee = null;
        
        el.innerHTML = s.itemTemplate;
        
        // Set item's HTML elements
        checkbox = el.getElementsByClassName("checkboxBought")[0];
        checkboxLabel = el.querySelector("label.text");
        selectAssignee = s.utils.getElByClass("selectAssignee", el);

        // Set checkbox properties
        checkbox.checked = item.bought;
        checkbox.id = "bought-"+ item.id;
        checkboxLabel.htmlFor = "bought-"+ item.id;        

        // Set item text
        s.utils.setTextByClass(el, "text", item.text);

        // TODO: comments
        
        // Set assignee dropdown
        s.users.forEach(function(user) {
            var option = new Option(user.fullName, user.id);
            if (item.assignee === user.id) option.selected = true;
            selectAssignee.options.add(option);
        });
        
        // Set assignee for lists view
        if (typeof(item.assignee) == "number") {
            s.utils.setTextByClass(el, "assignee", s.dataManager.getInitials(item.assignee));
        } else {
            s.utils.getElByClass("assignee", el).remove();
        }
        
        // Set id for item's HTML element
        el.firstElementChild.id = item.id;

        // Set event handlers
        addEvent(s.utils.getElByClass("checkboxBought", el), "click", item.toggleBought.bind(item));
        addEvent(selectAssignee, "change", item.assign.bind(item));
        addEvent(s.utils.getElByClass("buttonDel", el), "click", item.delete.bind(item));

        // Append to list
        root.appendChild(el.firstElementChild);

        return el.firstElementChild;
    };

    // List specific functions
    
    mod.openList = function(id) {
        s.activeList = s.dataManager.getList(id);
        s.activeView = "list";
        mod.updateView();
    };

    mod.addList = function(e) {
        e.preventDefault();

        var title = document.querySelector("#addList #title").value;
        var description = document.querySelector("#addList #description").value;
        var list = s.dataManager.addList(title, description);
        
        s.activeList = list;
        s.activeView = "list";

        mod.closeModal();
        mod.updateView();
    };

    mod.editList = function(id) {
        // TODO
    };

    mod.deleteList = function(success) {
        if (success) {
            s.activeList = null;
            s.activeView = "lists";
            mod.updateView();

        } else {
            console.warn("Couldn't delete list!")
        }
    };

    mod.sendList = function(id) {
        // TODO
        console.log("TODO sendList: ", id);
    };

    mod.collaborateList = function(id) {
        // TODO
        console.log("TODO collaborateList: ", id);
    };

    mod.closeList = function(id) {
        s.activeList = null;
        s.activeView = "lists";
        mod.updateView();
    };


    // Item specific functions

    mod.addItem = function(e){
        e.preventDefault();

        var inputText = s.listWrapper.querySelector("#text");
        var bought = s.listWrapper.querySelector("#formAddItem #bought").checked;
        var text = inputText.value;

        var item = s.activeList.addItem(text, bought);
        var itemsWrapper = s.listWrapper.getElementsByClassName("listItems")[0];
        
        mod.populateItem(item, itemsWrapper);

        inputText.value = "";
        inputText.focus();
    };

    mod.deleteItem = function(id) {
        // Remove item from HMTL
        s.listWrapper.querySelector(".listItem[id=\""+ id +"\"]").remove();

    }.bind(this);


    // Modal / Dialog specific functions

    mod.addListDialog = function() {        
        mod.openModal("addList");
        document.querySelector("#addList #title").focus();
    };

    mod.setModalButtonEventHandlers = function() {

        // Set modal event handlers
        var cancelButtons = s.utils.getElsByClass("buttonCancel");
        cancelButtons.forEach(function(el){
            addEvent(el, "click", mod.closeModal.bind(mod));
        });
        
        // Add new list modal

        var addListForm = document.getElementById("formAddList");
        addEvent(addListForm, "submit", mod.addList.bind(mod));  

        var addListButton = s.utils.getElsByClass("buttonAdd")[0];
        addEvent(addListButton, "click", mod.addList.bind(mod));        
    }

    mod.openModal = function(id) {
        var el = document.getElementById(id);
        el.classList.add("active");
        document.body.classList.add("modalOpen");
    }

    mod.closeModal = function() {
        var modal = document.querySelector(".modal.active");
        modal.classList.remove("active");

        // Clear input fields
        var inputs = modal.querySelectorAll("input");
        inputs.forEach(function(input) {
            input.value = "";
        });
        document.body.classList.remove("modalOpen");
    }
    

    // Set button label helper

    mod.buttonLabel = function(button, state) {
        var label = "";
        if(state === undefined) state = "default";
        
        try{
            label = s.lang.ui.buttonLabels[button].state[state];
        } catch(e) {
            console.warn(s.lang.alerts.noLabel, button, state);
        }

        return label;
    }

})(app.viewManager);