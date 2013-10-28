define(function(require, exports, module) {
    function childRemove() {
        var parent = this.parent,
            index = parent.indexOf(this);
        parent.removeChild(index);
        return this;
    }
    return require("core/class").createClass("Kity.graphic.Parent", {
        getChildren: function() {
            return this._children || (this._children = []);
        },
        getChild: function( index ) {
            return this.getChildren()[index];
        },
        getFirstChild: function() {
            return this.getChild(0);
        },
        getLastChild: function() {
            return this.getChild( this.getChildren().length - 1 );
        },
        indexOf: function( elem ) {
            return this.getChildren().indexOf( elem );
        },
        forEachChild: function( fn ) {
            var children = this.getChildren(),
                length = children.length,
                i;
            for(i = 0; i < length; i++) {
                fn.call(this, i, children[i]);
            }
            return this;
        },
        addChild: function( child, pos ) {
            var children = this.getChildren(),
                length = children.length,
                before, after;
            if( !( pos >= 0 && pos < length ) ) {
                pos = length;
            }
            if( pos == 0 ) {
                children.unshift( child );
            } else if ( pos == length ) {
                children.push( child );
            } else {
                before = children.slice(0, pos);
                before.push(child);
                after = children.slice(pos);
                this._children = before.concat(after);
            }
            if( typeof(child) == 'object' ) {
                child.parent = this;
                child.remove = childRemove;
            }
            return this;
        },
        appendChild: function( child ) {
            return this.addChild( child );
        },
        prependChild: function( child ) {
            return this.addChild( child, 0 );
        },
        removeChild: function( pos ) {
            var children = this._children,
                length = children.length,
                child = children[pos],
                before, after;

            if( child === undefined ) return this;

            if( pos == 0 ) {
                children.pop();
            } else if ( pos == length - 1 ) {
                children.shift();
            } else {
                before = children.slice(0, pos);
                after = children.slice(pos + 1);
                this._children = before.concat(after);
            }

            if ( child.parent ) delete child.parent;
            if ( child.remove ) delete child.remove;

            return this;
        },
        clear: function() {
            while(this.getChildren().length) this.removeChild(0);
            return this;
        }
    });
});