/**
 * Created with JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-17
 * Time: 上午2:24
 * To change this template use File | Settings | File Templates.
 */
/**
 * 重载QUnit部分接口实现批量执行控制功能
 */
debugger
//jasmane : if (self.index < self.blocks.length && !(this.abort && !this.ensured[self.index])) {
(function() {
    if (!jasmine)
        return;
    var n = jasmine.Queue.prototype.next_,s = jasmine.Queue.prototype.start;
//todo  写到调用HtmlReporter前
    function _n(self,args /* failures, total */) {
                 // the last Queue in the file has done ,there is no more Suite or Queue
//           if(self.index == self.blocks.length || (this.abort && !this.ensured[self.index])){
//        //display failed Suite
//        $('li.fail ol').toggle();
          //     if (parent && parent.brtest) {
//            parent.$(parent.brtest).trigger('done', [ new Date().getTime(), {
//                failed : args[0],
//                passed : args[1],
//                detail:args[2]
//            }, window._$jscoverage || null ]);
//        }
//           }

//
    }
    function _s(self,args /* failures, total */) {

    }
//    QUnit.moduleStart = function() {
//        stop();
//        /* 为批量执行等待import.php正确返回 */
//        var h = setInterval(function() {
//            if (window && window['baidu']) {
//                clearInterval(h);
//                ms.apply(this, arguments);
//                start();
//            }
//        }, 20);
//    };
    jasmine.Queue.prototype.start =function(){
        //todo
        /* wait for import.php return */
//        var h = setInterval(function() {
//            if (window && window['baidu']) {
//                clearInterval(h);
                s.apply(this, arguments);
//            }
//        }, 20);
    };
    jasmine.Queue.prototype.next_ = function() {
        _n(this,arguments);
        n.apply(this, arguments);
    };
})();