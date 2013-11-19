define(function (require, exports, module) {

    return require('core/class').createClass('Styled', {
        addClass: function (name) {
            this.node.classList.add(name);
            return this;
        },
        removeClass: function (name) {
            this.node.classList.remove(name);
            return this;
        },
        hasClass: function (name) {
            return this.node.classList.contains(name);
        },
        setStyle: function (styles) {
            if(arguments.length == 2) {
                this.node.style[arguments[0]] = arguments[1];
                return this;
            }
            for (var name in styles) {
                if (styles.hasOwnProperty(name)) {
                    this.node.style[name] = styles[name];
                }
            }
            return this;
        }
    });
});