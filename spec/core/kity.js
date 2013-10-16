/**
 * Created with JetBrains PhpStorm.
 * User: dongyancen
 * Date: 13-10-12
 * Time: 下午6:58
 * To change this template use File | Settings | File Templates.
 */
//这是个例子!!!!!
describe(" example", function() {
    //这里使用的是SpecHelper里面自定义的断言
    it('helper',function(){
        expect(true).customMatchers(true);
    });
});
describe(" example2", function() {
    //这里使用的是SpecHelper里面自定义的断言
    it('helper',function(){
        expect(true).customMatchers(true);
    });
});
