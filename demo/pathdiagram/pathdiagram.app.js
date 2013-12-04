define(function (require, exports, module) {
    var Class = require('core/class');
    var Paper = require('graphic/paper');
    var Draggable = require('../public/draggable');
    var PathDiagram = require('./pathdiagram');

    Class.extendClass(Paper, Draggable);

    var paper = new Paper('pathdiagram').drag();

    paper.on('dragstart', function() {
        this.setStyle('cursor', '-webkit-grabbing');
    }).on('dragend', function() {
        this.setStyle('cursor', '-webkit-grab');
    }).trigger('dragend');

    paper.setWidth(1200).setHeight(800);
    paper.setViewBox(-600, -400, 1200, 800);

    paper.addShape(new PathDiagram());
});