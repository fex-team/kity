define(function(require, exports, module){
    var Path = require('graphic/path');
    var Vector = require('graphic/vector');
    return require('core/class').createClass({
        base: Path,
        constructor: function(r, R, a1, a2) {
            this.callBase();
            this.draw(r, R, a1, a2);
            this.center = Vector.fromPolar( (R + r) / 2, (a1 + a2) / 2 );
        },
        draw: function(r, R, a1, a2) {
            var d = this.getDrawer();
            var p1 = Vector.fromPolar(r, a1),
                p2 = Vector.fromPolar(R, a1),
                p3 = Vector.fromPolar(R, a2),
                p4 = Vector.fromPolar(r, a2);
            d.moveTo(p1.x, p1.y);
            d.lineTo(p2.x, p2.y);
            d.carcTo(R, p3.x, p3.y, 0, 1);
            d.lineTo(p4.x, p4.y);
            d.carcTo(r, p1.x, p1.y);
            d.close();
        }
    });
});