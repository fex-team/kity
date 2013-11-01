define(function(require, exports, module) {
    var utils = require('core/utils');
    require('core/class').createClass("kity.graphic.Matrix", {
        constructor: function() {
            this.setMatrix(1, 0, 0, 1, 0, 0);
        },
        setMatrix: function(a, b, c, d, e, f) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
            this.f = f;
        },
        analyseSimple: function() {
            
        }
    });
});