/**
 * 模块暴露_为支持某些模块单测,添加了一些暴露的模块
 */

(function(global) {

    define('kity.start_forTest', function(require) {
        require('kity.start');
        require('core/utils').extend(global.kity, {
            //add
            Container: require('graphic/container'),
            Eventhandler: require('graphic/eventhandler'),
            Shapecontainer: require('graphic/shapecontainer')
        });
    });
    // build环境中才含有use
    try {
        use('kity.start_forTest');
    } catch (e) {}

})(this);
inc.use( 'kity.start_forTest' );