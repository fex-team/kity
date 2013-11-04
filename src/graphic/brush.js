define(function(require, exports, module) {
    
    return require('core/class').createClass( 'Brush', {
        constructor: function() {
            
        },
        getType: function() {
            throw new Error('abstract method call error');
        }
    });
});