

// Set app.dataManager sub module
(function(mod) {
    var s = {    // settings
            utils: null,
            loggedUser: 4,  // This would not be normally hardcoded :)
        },
        data = appData,
        users = [],
        usersLookup = {},
        listsLookup = {},
        listsIndexLookup = {};

    function List(data) {
        var itemsLookup = {};
        var itemsIndexLookup = {};
        Object.assign(this, data);
        
        // Event callback functions are set from view manager
        // Should've made this with real event handlers, but realized it too late
        this.openCallBack = null;
        this.editCallBack = null;
        this.deleteCallBack = null;
        this.sendCallBack = null;
        this.collaborateCallBack = null;
        this.closeCallBack = null;
        
        this.deleteItemCallBack = null;

        this.open = function(e) {
            e.preventDefault();
            if (this.openCallBack) this.openCallBack(this.id);
        }

        this.edit = function(e) {
            e.preventDefault();
            if (this.editCallBack) this.editCallBack(this.id);
        }
        this.delete = function(e) {
            e.preventDefault();
            mod.deleteList(this.id);
            if (this.deleteCallBack) this.deleteCallBack(this.id);
        }
        this.send = function(e) {
            // TODO
            console.log("send: ", e);
            e.preventDefault();
            if (this.sendCallBack) this.sendCallBack(this.id);
        }
        this.collaborate = function(e) {
            // TODO
            console.log("collaborate: ", e);
            e.preventDefault();
            if (this.collaborateCallBack) this.collaborateCallBack(this.id);
        }
        this.close = function(e) {
            e.preventDefault();
            if (this.closeCallBack) this.closeCallBack(this.id);
        }

        // ITEM SPECIFIC METHDOS
    
        this.addItemToCollection = function(item, index) {
            itemsIndexLookup[item.id] = index;
            var itemObj = this.items[index] = itemsLookup[item.id] = new Item(item);
            itemObj.deleteCallBack = this.deleteItem;
            return itemObj;

        }
        this.addItem = function(text, bought) {
            var item = { 
                    id: Math.round(Math.random() * 1000000000),
                    text: text,
                    bought: bought,
                    assignee: null,
                    collaborators: [s.loggedUser],
                };
                
            var index = this.items.length;
            var itemObj = this.addItemToCollection(item, index);

            return itemObj;
        };
        
        this.deleteItem = function(id) {
            if (itemsLookup[id] == undefined) {
                return false;
            }
            
            var index = itemsIndexLookup[id];
            data.items.splice(index, 1);

            delete itemsIndexLookup[id];
            delete itemsLookup[id];
            
            this.deleteItemCallBack(id);

            return true;
        }.bind(this);

        data.items.forEach(function(item, index) {
            this.addItemToCollection(item, index);
        }.bind(this));

        return this;
    };

    function Item(data) {
        var data = data;
        Object.assign(this, data);
        
        // Event callback functions are set from view manager
        // Should've made this with real event handlers, but realized it too late
        this.editCallBack = null;
        this.boughtCallBack = null;
        this.deleteCallBack = null;
        this.closeCallBack = null;

        this.open = function(e) {
            e.preventDefault();
            if (this.openCallBack) this.openCallBack(this.id);
        };

        this.edit = function(e) {
            e.preventDefault();
            if (this.editCallBack) this.editCallBack(this.id);
        };

        this.delete = function(e) {
            e.preventDefault();
            if (this.deleteCallBack) this.deleteCallBack(this.id);
        };

        this.toggleBought = function(e) {
            this.bought = e.target.checked;
        };
        
        this.assign = function(e) {
            var assignee = e.target.options[e.target.selectedIndex].value;
            this.assignee = (assignee !== "") ? parseInt(assignee) : null;
        };

        this.close = function(e) {
            e.preventDefault();
            if (this.closeCallBack) this.closeCallBack(this.id);
        };

        return this;
    };

    function updateListsLookUpIndex() {
        data.lists.forEach(function(list, index) {
            listsIndexLookup[list.id] = index;
        });
    }

    mod.init = function(utils) {
        s.utils = utils;
        users = data.users;
        data.users.forEach(function(user) {
            usersLookup[user.id] = user;
        });
        data.lists.forEach(function(list, index) {
            listsIndexLookup[list.id] = index;
            data.lists[index] = listsLookup[list.id] = new List(list);
        });
    };

    // LIST METHODS

    mod.addList = function(title, description) {
        var list = { 
                id: Math.round(Math.random() * 1000000000),
                title: title, 
                description: description,
                collaborators: [s.loggedUser],
                items: [],
            };
        console.log("list: ", list);
            
        var index = data.lists.length;
        listsIndexLookup[list.id] = index;
        data.lists[index] = listsLookup[list.id] = new List(list);

        return data.lists[index];
    };

    mod.deleteList = function(id) {
        // TODO: confirm dialog
        if (listsLookup[id] == undefined) {
            return false;
        }
        var index = listsIndexLookup[id];
        data.lists.splice(index, 1);
        delete listsIndexLookup[id];
        delete listsLookup[id];
        
        return true;
    };
    mod.getLists = function() {
        return data.lists;
    };

    mod.getList = function(id) {
        return listsLookup[id];
    };

    mod.listExists = function(id) {
        return (listsLookup[id] !== undefined);
    };

    // USER METHODS
    
    mod.getUsers = function() {
        return users;
    };

    mod.getUser = function(id) {
        return usersLookup[id];
    };

    mod.getFullName = function(id) {
        var user = mod.getUser(id);
        return user.fullName;
    };

    mod.getInitials = function(id) {
        var name = mod.getFullName(id);
        var arr = name.split(" ");
        var initials = "";
        arr.forEach(function(str){
            initials += str.charAt(0).toUpperCase();
        });
        return initials;
    };

})(app.dataManager);