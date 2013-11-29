define(function(require, exports, module) {
    
    var targetMap = {};
    var targetId = 0;
    function getTargetId( obj ) {
        return obj._kityTargetId ||
            ( obj._kityTargetId = 'KITY_EVENT_TARGET_ID_' + targetId++);
    }

    function getCallbackList( obj, name ) {
        var id = getTargetId( obj );
        targetMap[id] = targetMap[id] || {};
        return targetMap[id][name] || (targetMap[id][name] = []);
    }

    function addCallBack( obj, name, handler, oncemark ) {
        var list = getCallbackList( obj, name );
        if( list.indexOf(handler) == -1 ) {
            list.push(handler);
            if(oncemark) {
                list.once = list.once || [];
                list.once.push( handler );
            }
        }
    }

    function removeCallBack( obj, name, handler ) {
        var list = getCallbackList( obj, name );
        var index = list.indexOf(handler);
        if ( index != -1 ) {
            list.splice( index, 1 );
        }
    }

    function removeAllCallback( obj, name ) {
        var list = getCallbackList( obj, name );
        list.splice( 0, list.length );
    }

    function triggerCallbackList( obj, name, e ) {
        var list = getCallbackList( obj, name );
        for(var i = 0, length = list.length; i < length; i++) {
            list[i].call( obj, e );
        }
        if(list.once) {
            while(list.once.length) {
               removeCallBack( obj, name, list.once.pop() );
            }
        }
    }

    return require('core/class').createClass('EventHandler', {
        on: function( name, handler ) {
            addCallBack( this, name, handler );
            return this;
        },
        off: function( name, handler ) {
            if(handler) {
                removeCallBack( this, name, handler );
            } else {
                removeAllCallback( this, name );
            }
            return this;
        },
        once: function( name, handler ) {
            addCallBack( this, name, handler );
            return this;
        },
        trigger: function( name, e ) {
            if( this.muted()[name] ) {
                return;
            }
            triggerCallbackList( this, name, e );
            return this;
        },
        fire: function( name, e ) {
            return this.trigger( name, e );
        },
        muted: function() {
            this._kityMuteEvent = this._kityMuteEvent || {};
            return this._kityMuteEvent;
        },
        mute: function( name ) {
            this.muted()[name] = true;
        },
        unmute: function( name ) {
            this.muted()[name] = false;
        }
    });
});