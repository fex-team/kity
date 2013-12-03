/**
 * 模块暴露
 */

( function ( global ) {

    define( 'kity.start', function ( require ) {

        var kity = global.kity = {

            // core
            'Class': require( 'core/class' ),

            // shape
            Bezier: require( 'graphic/bezier' ),
            BezierPoint: require( 'graphic/bezierpoint' ),
            Brush: require( 'graphic/brush' ),
            Circle: require( 'graphic/circle' ),
            clip: require( 'graphic/clip' ),
            Color: require( 'graphic/color' ),
            ColorBrush: require( 'graphic/colorbrush' ),
            Curve: require( 'graphic/curve' ),
            Ellipse: require( 'graphic/ellipse' ),
            GradientBrush: require( 'graphic/gradientbrush' ),
            Group: require( 'graphic/group' ),
            Image: require( 'graphic/image' ),
            Line: require( 'graphic/line' ),
            LinearGradientBrush: require( 'graphic/lineargradientbrush' ),
            Mask: require( 'graphic/mask' ),
            Matrix: require( 'graphic/matrix' ),
            Palette: require( 'graphic/palette' ),
            Paper: require( 'graphic/paper' ),
            Path: require( 'graphic/path' ),
            PatternBrush: require( 'graphic/patternbrush' ),
            Pen: require( 'graphic/pen' ),
            Point: require( 'graphic/point' ),
            Polygon: require( 'graphic/polygon' ),
            Polyline: require( 'graphic/polyline' ),
            RadialGradientBrush: require( 'graphic/radialgradientbrush' ),
            Rect: require( 'graphic/rect' ),
            Shape: require( 'graphic/shape' ),
            ShapePoint: require( 'graphic/shapepoint' ),
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

        };

    } );

    try {
        use( 'kity.start' );
    } catch ( e ) {
        global.seajs.use( 'kity.start' );
    }

} )( this );