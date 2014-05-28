/*global use:true*/

/**
 * 模块暴露
 */

(function(global) {

    define('export', function(require) {
        return require('kity');
    });

    // build 环境中才含有use
    if ('use' in this) use('export');

})(this);