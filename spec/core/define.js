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

			dog = new kity.Dog("kity");
		});

		it("can be instantiated", function(){
			expect(dog.getName()).toBe("kity");
		});

		it("is instanceof Dog", function() {
			expect(dog instanceof kity.Dog).toBeTruthy();
		});
	});

	describe("inherit Dog from animal", function() {
		
		var satsuma;
		beforeEach(function() {
			define("zoo.Animal", {
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
					return "Animal aged " + this.getAge();
				}
			});

			define("zoo.Dog", {
				super: "zoo.Animal",
				constructor: function Dog() {
					this.super("Animal").constructor(12);
				},
				bark: function() {
					return "Dog bark";
				},
				toString: function() {
					return this.super("Animal").toString() + " Dog";
				}
			});

			define("zoo.Satsuma", {
				super: "zoo.Dog",
				constructor: function() {
					this.super("Dog").constructor();
				},
				toString: function() {
					return this.super("Dog").toString() + " Satsuma";
				}
			});

			satsuma = new kity.zoo.Satsuma();
		});

		describe("satsuma instance", function() {
			it("should be instanceof Dog", function() {
				expect(satsuma instanceof kity.zoo.Dog).toBeTruthy();
			});
			it("should be instanceof Animal", function() {
				expect(satsuma instanceof kity.zoo.Animal).toBeTruthy();
			});
			it("should be aged 12", function() {
				expect(satsuma.getAge()).toBe(12);
			});
			it("can bark", function() {
				expect(satsuma.bark()).toBe("Dog bark");
			});
			it("should call all the super to string", function() {
				satsuma.setAge(14);
				expect(satsuma.toString()).toBe("Animal aged 14 Dog Satsuma");
			});
		});
		
	});
});
