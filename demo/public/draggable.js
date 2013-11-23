define( function(require, exports, module) {
    var Paper = require('graphic/paper');
    return require('core/class').createClass({
        drag: function( opt ) {

            if( this.dragEnabled ) {
                return;
            }

            var dragStart = opt && opt.start || this.dragStart,
                dragMove = opt && opt.move || this.dragMove,
                dragEnd = opt && opt.end || this.dragEnd,
                dragTarget = opt && opt.target || this.dragTarget || this,
                me = this;

            this.dragEnabled = true;
            this.dragTarget = dragTarget;

            function bindEvents(paper) {

                var startPosition, lastPosition, dragging = false;

                var dragFn = function(e) {
                    if(!dragging) {
                        paper.off('mousemove', dragFn);
                    }
                    var currentPosition = e.getPosition();
                    var movement = {
                        x: currentPosition.x - startPosition.x,
                        y: currentPosition.y - startPosition.y
                    };
                    var delta = {
                        x: currentPosition.x - lastPosition.x,
                        y: currentPosition.y - lastPosition.y
                    };
                    if(!dragMove) {
                        if( me.isInstanceOf(Paper) ) {
                            var view = me.getViewPort();
                            view.center.x -= delta.x;
                            view.center.y -= delta.y;
                            me.setViewPort(view);
                        } else {
                            me.translate(delta.x, delta.y);
                        }
                    } else {
                        dragMove.call(me, {
                            position: currentPosition,
                            movement: movement,
                            delta: delta
                        });
                    }
                    lastPosition = currentPosition;
                    e.stopPropagation();
                };

                dragTarget.on('mousedown', dragTarget._dragMouseDown = function(e) {
                    if( e.originEvent.button ) {
                        return;
                    }
                    lastPosition = startPosition = e.getPosition();
                    dragging = true;
                    paper.on('mousemove', dragFn);
                    if(dragStart) {
                        var cancel = dragStart.call(me, {
                            position: startPosition
                        }) === false;
                        if(cancel) {
                            return;
                        }
                    }
                    if(me.isInstanceOf(Paper)) {
                        me.setStyle('cursor', 'grabbing');
                        me.setStyle('cursor', '-webkit-grabbing');
                        me.setStyle('cursor', '-moz-grabbing');
                    }
                    e.stopPropagation();
                });

                paper.on('mouseup', dragTarget._dragMouseUp = function(e) {
                    if(dragging) {
                        dragging = false;
                        paper.off('mousemove', dragFn);
                        if(dragEnd) {
                            dragEnd.call(me, {
                                position: e.getPosition()
                            });
                        }
                    }
                    if(me.isInstanceOf(Paper)) {
                        me.setStyle('cursor', 'grab');
                        me.setStyle('cursor', '-webkit-grab');
                        me.setStyle('cursor', '-moz-grab');
                    }
                    e.stopPropagation();
                });
            }

            if(me.isInstanceOf(Paper)) {
                bindEvents(me);
                me.setStyle('cursor', 'grab');
                me.setStyle('cursor', '-webkit-grab');
                me.setStyle('cursor', '-moz-grab');
            } else {
                this.getPaperPromise(bindEvents);
                dragTarget.setStyle('cursor', 'move');
            }
            return this;
        }, // end of drag


        undrag: function() {
            var target = this.dragTarget;
            target.off('mousedown', target._dragMouseDown);
            target.getPaper().off('mouseup', target._dragMouseUp);
            delete target._dragMouseDown;
            delete target._dragMouseUp;
            target.setStyle('cursor', 'default');
            this.dragEnabled = false;
            return this;
        }
    });
});