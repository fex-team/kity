describe("Kity.Container", function () {
    var Container = require("graphic/container");
    var container;

    beforeEach(function () {
        container = new Container();
    });

    function add5Item(container) {
        container.addItem("item1");
        container.addItem("item2");
        container.addItem("item3");
        container.addItem("item4");
        container.addItem("item5");
    }

    describe("getItems()", function () {
        it("should return a zero-length array when it has no item", function () {
            expect(container.getItems() instanceof Array).toBeTruthy();
            expect(container.getItems().length).toBe(0);
        });

        it("should return all and only its itemren", function () {
            add5Item(container);
            expect(container.getItems().join(",")).toBe("item1,item2,item3,item4,item5");
        });
    });

    describe("getItem(int pos)", function () {
        it("should return the item in given position", function () {
            add5Item(container);
            expect(container.getItem(2)).toBe("item3");
        });

        it("should return undefined if no item in given position", function () {
            add5Item(container);
            expect(container.getItem(5)).toBeUndefined();
        });
    });

    describe("getFirstItem()", function () {
        it("should return the first item of container", function () {
            add5Item(container);
            expect(container.getFirstItem()).toBe("item1");
        });

        it("should return undefined if container has no item", function () {
            expect(container.getFirstItem()).toBeUndefined();
        });
    });

    describe("getLastItem()", function () {
        it("should return the last item of container", function () {
            add5Item(container);
            expect(container.getLastItem()).toBe("item5");
        });

        it("should return undefined if container has no item", function () {
            expect(container.getLastItem()).toBeUndefined();
        });
    });

    describe("indexOf(object item)", function () {
        it("should return the position of the given item", function () {
            add5Item(container);
            expect(container.indexOf("item2")).toBe(1);
        });

        it("should return -1 when the given object is not a item of container", function () {
            add5Item(container);
            expect(container.indexOf("itemn")).toBe(-1);
        });
    });

    describe("eachItem()", function () {
        it("shoud interate all and only the itemren of the container", function () {
            add5Item(container);
            var items = [];
            container.eachItem(function (index, item) {
                items.push(item);
            });
            expect(items.join("item1,item2,item3,item4,item5"));
        });

        it("should pass the position and the item to the callback function", function () {
            add5Item(container);
            container.eachItem(function (index, item) {
                expect(item).toBe("item" + (index + 1));
            });
        });

        it("should apply this reference to the container in the callback function", function () {
            add5Item(container);
            container.eachItem(function () {
                expect(this).toBe(container);
            });
        });

        it("should return this reference", function () {
            add5Item(container);
            expect(container.eachItem(function () {})).toBe(container);
        });
    });

    describe("addItem(object item, int pos)", function () {
        it("should add a item to the container", function () {
            container.addItem("item0");
            expect(container.getItems().length).toBe(1);
            expect(container.getFirstItem()).toBe("item0");
        });

        it("should ensure the added item in the given position", function () {
            add5Item(container);
            container.addItem("test", 2);
            expect(container.getItem(2)).toBe("test");
        });

        it("should add the item to last position when position is not given", function () {
            add5Item(container);
            container.addItem("test");
            expect(container.getLastItem()).toBe("test");
        });

        it("should add the item to last position when the given position is illigal", function () {
            add5Item(container);
            container.addItem("test", 11);
            expect(container.getLastItem()).toBe("test");
        });

        it("should add a reference of the container to the item", function () {
            var obj = {};
            container.addItem(obj);
            expect(obj.container).toBe(container);
        });

        it("should provide the item a removal method", function () {
            var obj = {};
            container.addItem(obj);
            expect(obj.remove).toBeDefined();
            obj.remove();
            expect(container.getItems().length).toBe(0);
        });

        it("should return this reference", function () {
            expect(container.addItem("test")).toBe(container);
        });
    });

    describe("appendItem(object item)", function () {

        it("should add a item as last-item of container", function () {
            container.appendItem("item1").appendItem("item2");
            expect(container.getLastItem()).toBe("item2");
        });

        it("should return this reference", function () {
            expect(container.appendItem("item1")).toBe(container);
        });
    });

    describe("prependItem(object item)", function () {

        it("should add a item as first-item of container", function () {
            container.prependItem("item1").prependItem("item2");
            expect(container.getFirstItem()).toBe("item2");
        });

        it("should return this reference", function () {
            expect(container.prependItem("item1")).toBe(container);
        });
    });

    describe("removeItem(int pos)", function () {
        it("should remove the item in the given position", function () {
            add5Item(container);
            container.removeItem(2);
            expect(container.getItems().join(",")).toBe("item1,item2,item4,item5");
        });

        it("should remove the container reference and the removal method on the item", function () {
            var obj = {};
            container.addItem(obj);
            container.removeItem(0);
            expect(obj.container).toBeUndefined();
            expect(obj.remove).toBeUndefined();
        });

        it("should return this reference", function () {
            expect(container.addItem("test").removeItem(0)).toBe(container);
        });
    });

    describe("clear()", function () {
        it("should remove all itemren of the container", function () {
            add5Item(container);
            expect(container.clear().getItems().length).toBe(0);
        });

        it("should return this reference", function () {
            expect(container.clear()).toBe(container);
        });
    });
});