define(function(require, exports) {

    // 原生动画帧方法 polyfill
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(fn) {
            return setTimeout(fn, 1000 / 60);
        };

    var frameRequestId;

    // 等待执行的帧的集合，这些帧的方法将在下个动画帧同步执行
    var pendingFrames = [];

    /**
     * 添加一个帧到等待集合中
     *
     * 如果添加的帧是序列的第一个，至少有一个帧需要被执行，则下一个动画帧需要执行
     */
    function pushFrame(frame) {
        if (pendingFrames.push(frame) === 1 && !frameRequestId) {
            frameRequestId = requestAnimationFrame(executePendingFrames);
        }
    }

    /**
     * 执行所有等待帧
     */
    function executePendingFrames() {
        var frames = pendingFrames;
        pendingFrames = [];
        while (frames.length) {
            executeFrame(frames.pop());
        }
        frameRequestId = 0;
    }

    /**
     * 请求一个帧，执行指定的动作。动作回调提供一些有用的信息
     *
     * @param {Function} action
     *
     *     要执行的动作，该动作回调有一个参数 frame，其中：
     *
     *     frame.time
     *         动作执行时的时间戳（ms）
     *
     *     frame.index
     *         当前执行的帧的编号（首帧为 0）
     *
     *     frame.dur
     *         上一帧至今经过的时间，单位 ms
     *
     *     frame.elapsed
     *         从首帧开始到当前帧经过的时间
     *
     *     frame.action
     *         指向当前的帧处理函数
     *
     *     frame.next()
     *         表示下一帧继续执行。如果不调用该方法，将不会执行下一帧。
     *
     */
    function requestFrame(action) {
        var frame = initFrame(action);
        pushFrame(frame);
        return frame;
    }

    /**
     * 释放一个已经请求过的帧，如果该帧在等待集合里，将移除，下个动画帧不会执行释放的帧
     */
    function releaseFrame(frame) {
        var index = pendingFrames.indexOf(frame);
        if (~index) {
            pendingFrames.splice(index, 1);
        }
    }

    /**
     * 初始化一个帧，主要用于后续计算
     */
    function initFrame(action) {
        var frame = {
            index: 0,
            time: +new Date(),
            elapsed: 0,
            action: action,
            next: function() {
                pushFrame(frame);
            }
        };
        return frame;
    }

    /**
     * 执行一个帧动作
     */
    function executeFrame(frame) {
        // 当前帧时间错
        var time = +new Date();

        // 当上一帧到当前帧经过的时间
        var dur = time - frame.time;

        //
        // http://stackoverflow.com/questions/13133434/requestanimationframe-detect-stop
        // 浏览器最小化或切换标签，requestAnimationFrame 不会执行。
        // 检测时间超过 200 ms（频率小于 5Hz ） 判定为计时器暂停，重置为一帧长度
        //
        if (dur > 200) {
            dur = 1000 / 60;
        }

        frame.dur = dur;
        frame.elapsed += dur;
        frame.time = time;
        frame.action.call(null, frame);
        frame.index++;
    }

    // 暴露
    exports.requestFrame = requestFrame;
    exports.releaseFrame = releaseFrame;
});