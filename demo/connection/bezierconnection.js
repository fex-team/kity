define(function (require, exports, module) {
    var Bezier = require('graphic/bezier');
    var BezierPoint = require('graphic/bezierpoint');
    var Vector = require('graphic/vector');
    var Pen = require('graphic/pen');
    function mid(a, b) {
        return (a + b) / 2;
    }
    function getSnapPoints( snaper ) {
        if(snaper.getSnapPoints) {
            return snaper.getSnapPoints();
        }
        var box = snaper.getRenderBox();
        var x1 = box.x, x2 = box.x + box.width,
            y1 = box.y, y2 = box.y + box.height,
            xm = mid(x1, x2), ym = mid(y1, y2);
        return [
            { x: xm, y: y1, type: 'top' }, // top
            { x: x2, y: ym, type: 'right' }, // right
            { x: xm, y: y2, type: 'bottom' }, // bottom
            { x: x1, y: ym, type: 'left' } // left
        ];
    }
    var DIR_NORMALS = {
        top: new Vector(0, -1),
        left: new Vector(-1, 0),
        bottom: new Vector(0, 1),
        right: new Vector(1, 0)
    };
    function fillNormal( snapPoint ) {
        if(snapPoint.normal) {
            return;
        }
        snapPoint.normal = DIR_NORMALS[snapPoint.type] || DIR_NORMALS.left;
    }
    return require('core/class').createClass("SnapCurve", {
        base: Bezier,
        constructor: function( start, end ) {
            this.callBase();
            this.setStartSnaper( start );
            this.setEndSnaper( end );
            this.init();
            this.updateConnection();
        },
        init: function() {
            this.addPoint(this.startBesierPoint = new BezierPoint());
            this.addPoint(this.endBesierPoint = new BezierPoint());
            this.stroke(new Pen('red', 3));
        },
        bindSnaper: function( snaper ) {
            var me = this;
            snaper.on('shapeupdate', function() {
                me.updateConnection();
            });
        },
        setStartSnaper: function( snaper ) {
            this.start = snaper;
            this.bindSnaper(snaper);
        },
        setEndSnaper: function( snaper ) {
            this.end = snaper;
            this.bindSnaper(snaper);
        },
        isReady: function() {
            return !!(this.start && this.end);
        },
        calcEndPoints: function() {
            var startEnds = getSnapPoints(this.start),
                endEnds = getSnapPoints(this.end);
            var nearStart, nearEnd, minDistance = Number.MAX_VALUE;
            var i, j, startEnd, endEnd, distance;

            // 寻找最近的粘附点
            // 暴力解法：可优化但不必要，因为点集不会很大
            for( i = 0; i < startEnds.length; i++) {
                for( j = 0; j < endEnds.length; j++) {
                    distance = Math.abs(startEnds[i].x - endEnds[j].x) + Math.abs(startEnds[i].y - endEnds[j].y) * 0.5; //Vector.fromPoints( startEnds[i], endEnds[j] ).length();
                    if(distance < minDistance) {
                        minDistance = distance;
                        nearStart = startEnds[i];
                        nearEnd = endEnds[j];
                    }
                }
            }
            return {
                start: nearStart,
                end: nearEnd
            };
        },
        updateConnection: function() {
            if(!this.isReady()) {
                return false;
            }
            var endPoints = this.calcEndPoints(),
                startEnd = endPoints.start,
                endEnd = endPoints.end;

            fillNormal(startEnd);
            fillNormal(endEnd);

            var pointVector = Vector.fromPoints( startEnd, endEnd );

            var forward = Vector.projection( pointVector, startEnd.normal );
            var backward = Vector.projection( Vector.reverse(pointVector), endEnd.normal );

            forward = Vector.multipy( forward, 0.5 );
            forward = Vector.add( startEnd, forward );
            backward = Vector.multipy( backward, 0.5 );
            backward = Vector.add( endEnd, backward );

            this.startBesierPoint.setVertex(startEnd.x, startEnd.y);
            this.startBesierPoint.setForward(forward.x, forward.y);

            this.endBesierPoint.setVertex(endEnd.x, endEnd.y);
            this.endBesierPoint.setBackward(backward.x, backward.y);
        }
    });
});