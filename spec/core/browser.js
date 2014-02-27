//getRequires(["core/class"]);
describe("browser", function () {

    var browser = kity.Browser;
    if(browser.chrome){
        it("is chrome", function () {
            expect(browser.chrome).toBeTruthy()
        });
    }
    if(browser.gecko){
        it("is firefox", function () {
            expect(browser.gecko).toBeTruthy()
        });
    }
    if(browser.ie){
        it("is ie", function () {
            expect(browser.ie).toBeTruthy()
        });
    }


});