describe("define()", function() {

	describe("define class Dog", function() {
		var dog;
		beforeEach(function() {			
			define("Dog", {
				constructor: function( name ) {
					this.setName(name);
				},
				setName: function( name ) {
					this._name = name;
				},
				getName: function() {
					return this._name;
				}
			});

			dog = new Dog("kity");
		});

		it("can be instantiated", function(){
			expect(dog.getName()).toBe("kity");
		});

		it("is instanceof Dog", function() {
			expect(dog instanceof Dog).toBeTruthy();
		});
	});

	describe("inherit Dog from animal", function() {
		
		var satsuma;
		beforeEach(function() {
			define("Animal", {
				constructor: function Animal(age) {
					this.setAge(age);
				},
				setAge: function(age) {
					this._age = age;
				},
				getAge: function() {
					return this._age;
				},
				toString: function() {
					return "Animal";
				}
			});

			define("Dog", {
				super: "Animal",
				constructor: function Dog() {
					this.super().constructor(12);
				},
				bark: function() {
					return "Dog bark";
				},
				toString: function() {
					return this.super().toString() + " Dog";
				}
			});

			define("Satsuma", {
				super: "Dog",
				toString: function() {
					return this.super().toString() + " Satsuma";
				}
			});

			satsuma = new Satsuma();
		});

		describe("satsuma instance", function() {
			it("should be instanceof Dog", function() {
				expect(satsuma instanceof Dog).toBeTruthy();
			});
			it("should be instanceof Animal", function() {
				expect(satsuma instanceof Animal).toBeTruthy();
			});
			it("should be aged 12", function() {
				expect(satsuma.getAge()).toBe(12);
			});
			it("can bark", function() {
				expect(satsuma.bark()).toBe("Dog bark");
			});
			it("should call all the super to string", function() {
				expect(satsuma.toString()).toBe("Animal Dog Satsuma");
			});
		});
		
	});
});
