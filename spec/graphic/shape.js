//getRequires([]);
describe( "Shape", function () {
    describe('setAttr',function(){
        var text = new kity.Text();

        it( "setAttr/getAttr", function () {
            text.setAttr('font-weight','bold');
            expect(text.getAttr('font-weight')).toBe('bold');
            text.setAttr('font-weight');
            expect(text.getAttr('font-weight')).toBeNull();
            text.setAttr({
                'font-weight':'bold',
                'test':'aaa'
            });
            expect(text.getAttr('font-weight')).toBe('bold');
            expect(text.getAttr('test')).toBe('aaa');
            text.setAttr({
                'font-weight':'',
                'test':''
            });
            expect(text.getAttr('font-weight')).toBeNull();
            expect(text.getAttr('test')).toBeNull();
        } );
    })


} );