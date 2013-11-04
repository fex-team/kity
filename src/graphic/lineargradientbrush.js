define(function(require, exports, module) {

    var className = "kity.graphic.LinearGradientBrush";
    var svg = require('graphic/svg');
    
    return require('core/class').createClass( className, {
        base: 'kity.graphic.GradientBrush',

        constructor: function() {
            this.callBase();
            this.setStartPosition(0, 0);
            this.setEndPosition(1, 0);
        },

        getType: function() {
            return "LinearGradientBrush";
        },

        setStartPosition: function(px, py) {
            this.sp = [px, py];
            return this;
        },

        setEndPosition: function(px, py) {
            this.ep = [px, py];
            return this;
        },

        getStartPosition: function() {
            return { x: this.sp[0], y: this.sp[1] };
        },

        getEndPosition: function() {
            return { x: this.ep[0], y: this.ep[1] };
        },

        // implement
        getGradientDef: function( paper ) {
            var gradient = paper.createDef('linearGradient');
            var p1 = this.getStartPosition(),
                p2 = this.getEndPosition();

            gradient.setAttribute('x1', p1.x);
            gradient.setAttribute('y1', p1.y);
            gradient.setAttribute('x2', p2.x);
            gradient.setAttribute('y2', p2.y);
            return gradient;
        }
    });
});