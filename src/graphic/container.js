define(function (require, exports, module) {
    function itemRemove() {
        var container = this.container,
            index = container.indexOf(this);
        container.removeItem(index);
        return this;
    }
    return require('core/class').createClass('Container', {
        getItems: function () {
            return this.items || (this.items = []);
        },
        getItem: function (index) {
            return this.getItems()[index];
        },
        getFirstItem: function () {
            return this.getItem(0);
        },
        getLastItem: function () {
            return this.getItem(this.getItems().length - 1);
        },
        indexOf: function (item) {
            return this.getItems().indexOf(item);
        },
        eachItem: function (fn) {
            var items = this.getItems(),
                length = items.length,
                i;
            for (i = 0; i < length; i++) {
                fn.call(this, i, items[i]);
            }
            return this;
        },
        addItem: function (item, pos, noEvent) {
            var items = this.getItems(),
                length = items.length,
                before, after;
            if (!(pos >= 0 && pos < length)) {
                pos = length;
            }
            if (pos === 0) {
                items.unshift(item);
            } else if (pos == length) {
                items.push(item);
            } else {
                before = items.slice(0, pos);
                before.push(item);
                after = items.slice(pos);
                this.items = before.concat(after);
            }
            if (typeof (item) === 'object') {
                item.container = this;
                item.remove = itemRemove;
            }
            if(!noEvent) {
                this.onContainerChanged('add', [item]);
            }
            return this;
        },
        addItems: function(items) {
            for(var i = 0, l = items.length; i < l; i++) {
                this.addItem(items[i], -1, true);
            }
            this.onContainerChanged('add', items);
            return this;
        },
        setItems: function(items) {
            return this.clear().addItems(items);
        },
        appendItem: function (item) {
            return this.addItem(item);
        },
        prependItem: function (item) {
            return this.addItem(item, 0);
        },
        removeItem: function (pos, noEvent) {
            if( typeof(pos) !== 'number' ) {
                return this.removeItem(this.indexOf(pos));
            }

            var items = this.getItems(),
                length = items.length,
                item = items[pos],
                before, after;

            if (item === undefined) {
                return this;
            }

            if (pos === 0) {
                items.shift();
            } else if (pos == length - 1) {
                items.pop();
            } else {
                before = items.slice(0, pos);
                after = items.slice(pos + 1);
                this.items = before.concat(after);
            }

            if (item.container) {
                delete item.container;
            }
            if (item.remove) {
                delete item.remove;
            }

            if(!noEvent) {
                this.onContainerChanged('remove', [item]);
            }

            return this;
        },
        clear: function () {
            var removed = [];
            var item;
            while ( (item = this.getFirstItem()) ) {
                removed.push(item);
                this.removeItem(0, true);
            }
            this.onContainerChanged('remove', removed);
            return this;
        },
        onContainerChanged: function(type, items) {

        }
    });
});