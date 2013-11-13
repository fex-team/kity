var Paper = require( 'graphic/paper' );
var Rect = require( 'graphic/rect' );
describe( "Kity.EventHandler", function () {
    var paper, rect;
    beforeEach( function () {
        paper = new Paper( document.body );
        rect = new Rect( 0, 0, 100, 100 );
        paper.addItem( rect );
    } );
    describe( "addEventListener(name, handler)", function () {
        it( "能够触发已注册的事件", function () {
            var fired = false;
            rect.addEventListener( 'click', function ( e ) {
                fired = true;
                expect( e.targetShape ).toBe( rect );
            } );
            rect.node.dispatchEvent( new MouseEvent( 'click' ) );
            expect( fired ).toBeTruthy();
        } );
        it( "能冒泡到 Parent 上", function () {
            var fired = false;
            paper.addEventListener( 'click', function ( e ) {
                fired = true;
                expect( e.targetShape ).toBe( rect );
            } );
            rect.node.dispatchEvent( new MouseEvent( 'click' ) );
            expect( fired ).toBeTruthy();
        } );

        it( "保持链式调用", function () {
            expect( rect.addEventListener( 'click', function () {} ) ).toBe( rect );
        } );
    } );

    describe( "removeEventListener(name, handler)", function () {
        it( "取消注册后不触发", function () {
            var fired = false;

            function listener( e ) {
                fired = true;
                expect( e.targetShape ).toBe( rect );
            }
            rect.addEventListener( 'click', listener );
            rect.removeEventListener( 'click', listener );
            rect.node.dispatchEvent( new MouseEvent( 'click' ) );
            expect( fired ).toBeFalsy();
        } );

        it( "不传递handler全部取消", function () {

            var fired1 = false,
                fired2 = false;

            function listener1( e ) {
                fired1 = true;
                expect( e.targetShape ).toBe( rect );
            }

            function listener2( e ) {
                fired2 = true;
                expect( e.targetShape ).toBe( rect );
            }
            rect.addEventListener( 'click', listener1 );
            rect.addEventListener( 'click', listener2 );
            rect.removeEventListener( 'click' );
            rect.node.dispatchEvent( new MouseEvent( 'click' ) );
            expect( fired1 || fired2 ).toBeFalsy();
        } )
    } );
} );