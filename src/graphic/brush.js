define(function(require, exports, module) {

    var className = "kity.graphic.Brush";
    
    return require('core/class').createClass( className, {
        constructor: function() {
            
        },
        getType: function() {
            throw new Error("abstract method call error");
        }
    });
});