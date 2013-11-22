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
            var isDragging = false;

            function bind() {
                var paper = me.getPaper();
                if(!paper) {
                    return setTimeout(bind, 100);
                }
                var startPosition = null;
                function drag (e) {
                    if(!isDragging) {
                        paper.off('mousemove', drag);
                        return;
                    }
                    var dragPosition = e.getPosition();
                    var delta = {
                        x: dragPosition.x - startPosition.x,
                        y: dragPosition.y - startPosition.y
                    };
                    me.drag(delta);
                }
                paper.on('mousedown', function(e) {
                    if(!me.dragenabled || e.targetShape != me.getDragTarget()) {
                        return;
                    }
                    startPosition = e.getPosition();
                    me.dragStart(startPosition);
                    isDragging = true;
                    paper.on('mousemove', drag);
                });
                paper.on('mouseup', function(e) {
                    isDragging = false;
                    me.dragEnd(e.getPosition());
                });
            }
            bind();
        }
    });
});