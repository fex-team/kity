/**
 * Created with JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-10
 * Time: 上午1:54
 * To change this template use File | Settings | File Templates.
 */

(function (){
    var paths  = [
            'core/kity.js',
            'core/utils.js',
            'core/define.js'
        ],
        baseURL = '../../src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }
})();