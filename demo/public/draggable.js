define(function(require, exports, module){
    return require('core/class').createClass({
        constructor: function() {
            this.bindDrag();
            this.enableDrag();
        },
        getDragTarget: function() {
            return this;
        },
        enableDrag: function() {
            this.dragenabled = true;
            this.getDragTarget().setStyle('cursor', 'move');
        },
        disableDrag: function() {
            this.dragenabled = false;
            this.getDragTarget().setStyle('cursor', 'default');
        },
        dragStart: function(position) {

        },
        drag: function(delta) {
            this.translate(delta.x, delta.y);
        },
        dragEnd: function(position) {

        },
        bindDrag: function() {
            var me = this;

            function bind() {
                var paper = me.getPaper();
                if(!paper) {
                    return setTimeout(bind, 100);
                }
                var dragMove = function(e) {
                    var dragPosition = e.getPosition();
                    var delta = {
                        x: dragPosition.x - startPosition.x,
                        y: dragPosition.y - startPosition.y
                    };
                    me.drag(delta);
                };
                var startPosition = null;
                paper.on('mousedown', function(e) {
                    if(!me.dragenabled || e.targetShape != me.getDragTarget()) {
                        return;
                    }
                    startPosition = e.getPosition();
                    me.dragStart(startPosition);
                    paper.on('mousemove', dragMove);
                });
                paper.on('mouseup', function(e) {
                    paper.off('mousemove', dragMove);
                    me.dragEnd(e.getPosition());
                });
            }
            bind();
        }
    });
});