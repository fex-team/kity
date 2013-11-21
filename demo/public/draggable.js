define(function(require, exports, module){
    return require('core/class').createClass({
        constructor: function() {
            this.bind();
            this.enableDrag();
        },
        getDragTarget: function() {
            return this;
        },
        enableDrag: function() {
            this.dragenabled = true;
        },
        disableDrag: function() {
            this.dragenabled = false;
        },
        dragStart: function(position) {

        },
        drag: function(delta) {
            this.translate(delta.x, delta.y);
        },
        dragEnd: function(position) {

        },
        bind: function() {
            var isDragging = false;
            var startPosition = null;
            var me = this;
            this.on('mousedown', function(e) {
                if(!me.dragenabled || e.targetShape != me.getDragTarget()) {
                    return;
                }
                isDragging = true;
                startPosition = e.getPosition();
                me.dragStart(startPosition);
            });
            this.on('mousemove', function(e) {
                if(!isDragging) {
                    return false;
                }
                var dragPosition = e.getPosition();
                var delta = {
                    x: dragPosition.x - startPosition.x,
                    y: dragPosition.y - startPosition.y
                };
                me.drag(delta);
            });
            this.on('mouseup', function(e) {
                isDragging = false;
                me.dragEnd(e.getPosition());
            });
        }
    });
});