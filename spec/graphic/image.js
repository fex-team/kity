describe("Kity.Image", function() {
    var Image = kity.Image,Shape = kity.Shape;
    var image;
    beforeEach(function() {
        image = new Image(300, 400);
    });
    it("should be an instance of Shape", function() {
        expect(image instanceof Shape).toBeTruthy();
    });

    it("用 url 构造", function() {
        image = new Image("http://www.baidu.com/img/bdlogo.gif");
        expect(image.getUrl()).toBe('http://www.baidu.com/img/bdlogo.gif');
    });

    it("url 属性读写", function() {
        expect(image.setUrl("http://www.baidu.com/img/bdlogo.gif").getUrl())
            .toBe("http://www.baidu.com/img/bdlogo.gif");
    });


});