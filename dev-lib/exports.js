/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kity.start', function ( require ) {

        var kity = global.kity = require( 'core/class' );

        require( 'core/utils' ).extend( kity, {

            // core
            Utils: require( "core/utils" ),
            Browser: require( "core/browser" ),
            // shape
            Bezier: require( 'graphic/bezier' ),
            BezierPoint: require( 'graphic/bezierpoint' ),
            Circle: require( 'graphic/circle' ),
            Clip: require( 'graphic/clip' ),
            Color: require( 'graphic/color' ),
            Curve: require( 'graphic/curve' ),
            Ellipse: require( 'graphic/ellipse' ),
            GradientBrush: require( 'graphic/gradientbrush' ),
            Group: require( 'graphic/group' ),
            HyperLink: require( 'graphic/hyperlink' ),
            Image: require( 'graphic/image' ),
            Line: require( 'graphic/line' ),
            LinearGradientBrush: require( 'graphic/lineargradientbrush' ),
            Mask: require( 'graphic/mask' ),
            Matrix: require( 'graphic/matrix' ),
            Marker: require( 'graphic/marker' ),
            Palette: require( 'graphic/palette' ),
            Paper: require( 'graphic/paper' ),
            Path: require( 'graphic/path' ),
            PatternBrush: require( 'graphic/patternbrush' ),
            Pen: require( 'graphic/pen' ),
            Point: require( 'graphic/point' ),
            Polygon: require( 'graphic/polygon' ),
            Polyline: require( 'graphic/polyline' ),
            Pie: require( 'graphic/pie' ),
            RadialGradientBrush: require( 'graphic/radialgradientbrush' ),
            Rect: require( 'graphic/rect' ),
            RegularPolygon: require('graphic/regularpolygon'),
            Ring: require( 'graphic/ring' ),
            Shape: require( 'graphic/shape' ),
            ShapePoint: require( 'graphic/shapepoint' ),
            Sweep: require( 'graphic/sweep' ),
            Star: require('graphic/star'),
            Text: require( 'graphic/text' ),
            TextSpan: require( 'graphic/textspan' ),
            Use: require( 'graphic/use' ),
            Vector: require( 'graphic/vector' ),

            // animate
            Animator: require( 'animate/animator' ),
            Easing: require( 'animate/easing' ),
            OpacityAnimator: require( 'animate/opacityanimator' ),
            RotateAnimator: require( 'animate/rotateanimator' ),
            ScaleAnimator: require( 'animate/scaleanimator' ),
            Timeline: require( 'animate/timeline' ),
            TranslateAnimator: require( 'animate/translateanimator' ),

            // filter
            Filter: require( 'filter/filter' ),
            GaussianblurFilter: require( 'filter/gaussianblurfilter' ),
            ProjectionFilter: require( 'filter/projectionfilter' ),

            // effect
            ColorMatrixEffect: require( 'filter/effect/colormatrixeffect' ),
            CompositeEffect: require( 'filter/effect/compositeeffect' ),
            ConvolveMatrixEffect: require( 'filter/effect/convolvematrixeffect' ),
            Effect: require( 'filter/effect/effect' ),
            GaussianblurEffect: require( 'filter/effect/gaussianblureffect' ),
            OffsetEffect: require( 'filter/effect/offseteffect' )

        } );

    } );

    // build环境中才含有use
    try {
        use( 'kity.start' );
    } catch ( e ) {}

} )( this );
