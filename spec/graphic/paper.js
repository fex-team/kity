var EventHandler = require("graphic/eventhandler");
var Parent = require("graphic/parent");
var Paper = require("graphic/paper");
describe("Kity.Paper", function() {

    it("在容器上创建了 SVG 元素", function() {
        var container = document.createElement("div");
        document.body.appendChild(container);
        var paper = new Paper( container );
        expect(container.firstChild.tagName.toLowerCase()).toBe('svg');
    });

    it("should extends Kity.Parent", function() {

    });

    it("should extends Kity.EventHandler", function() {

    });

    describe("Paper(HTMLElement container)", function() {
        it("can be constructed by an html element as container", function() {

        });
    })

    describe("Paper(string id)", function() {
        it("can be constructed by an html element's id as it's container", function() {
            
        });
    });

    describe("getContainer()", function(){      
        it("should return the parent container reference", function() {

        });
    });

    describe("getWidth()", function() {
        it("should return the width of the paper, in px", function() {

        });
    });

    describe("getHeight()", function() {
        it("should return the height of the paper, in px", function() {

        });
    });

    describe("setWidth()", function() {
        it("should set the width of the paper", function() {

        });

        it("should return this reference", function(){

        });
    });

    describe("setHeight()", function() {
        it("should set the height of the paper", function() {

        });

        it("should return this reference", function(){

        });
    });

    describe("setViewBox(float x, float y, float width, float height)", function() {
        it("should let the viewbox x to be the left most of shape rendering", function() {

        });

        it("should let the viewbox y to be the top most of shape rendering", function() {

        });

        it("should let the viewbox width to be the width of shape rendering", function() {

        });

        it("should let the viewbox height to be the height of shape rendering", function() {

        });

        it("should return this reference", function(){

        });
    });

    describe("getViewBox()", function(){ 
        it("should return the viewbox of the paper", function() {

        });

        it("should offer a zoom value of the viewbox", function() {
            
        });
    });
});