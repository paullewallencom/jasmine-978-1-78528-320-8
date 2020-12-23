describe("Jasmine Built-in matchers", function() {
  describe("toEqual", function() {
    it("should pass equal numbers", function() {
      expect(1).toEqual(1);
    });

    it("should pass equal strings", function() {
      expect("testing").toEqual("testing");
    });

    it("should pass equal booleans", function() {
      expect(true).toEqual(true);
    });

    it("should pass equal objects", function() {
      expect({a: "testing"}).toEqual({a: "testing"});
    });

    it("should pass equal arrays", function() {
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });
  });

  describe("toBe", function() {
    it("should pass equal numbers", function() {
      expect(1).toBe(1);
    });

    it("should pass equal strings", function() {
      expect("testing").toBe("testing");
    });

    it("should pass equal booleans", function() {
      expect(true).toBe(true);
    });

    it("should pass same objects", function() {
      var object = {a: "testing"};
      expect(object).toBe(object);
    });

    it("should pass same arrays", function() {
      var array = [1, 2, 3];
      expect(array).toBe(array);
    });

    it("should not pass equal objects", function() {
      expect({a: "testing"}).not.toBe({a: "testing"});
    });

    it("should not pass equal arrays", function() {
      expect([1, 2, 3]).not.toBe([1, 2, 3]);
    });
  });

  describe("toBeTruthy", function() {
    it("should pass the true boolean value", function() {
      expect(true).toBeTruthy();
    });

    it("should pass any number different than +0 and -0", function() {
      expect(1).toBeTruthy();
    });

    it("should pass any non empty string", function() {
      expect("a").toBeTruthy();
    });

    it("should pass any object (including an array)", function() {
      expect([]).toBeTruthy();
      expect({}).toBeTruthy();
    });
  });


  describe("toBeFalsy", function () {
    it("should pass undefined", function() {
      expect(undefined).toBeFalsy();
    });

    it("should pass null", function() {
      expect(null).toBeFalsy();
    });

    it("should pass NaN", function() {
      expect(NaN).toBeFalsy();
    });

    it("should pass the false boolean value", function() {
      expect(false).toBeFalsy();
    });

    it("should pass the number 0", function() {
      expect(0).toBeFalsy();
    });

    it("should pass an empty string", function() {
      expect("").toBeFalsy();
    });
  });


  describe("toBeNull", function() {
    it("should pass null", function() {
      expect(null).toBeNull();
    });
  });


  describe("toBeUndefined", function() {
    it("should pass undefined", function() {
      expect(undefined).toBeUndefined();
    });
  });


  describe("toBeDefined", function() {
    it("should pass any value other than undefined (even null and NaN)", function() {
      expect(null).toBeDefined();
      expect(NaN).toBeDefined();
    });
  });


  describe("toBeNaN", function() {
    it("should pass NaN", function() {
      expect(NaN).toBeNaN();
    });
  });


  describe("toContain", function() {
    it("should pass if a string contains another string", function() {
      expect("My big string").toContain("big");
    });

    it("should pass if an array contains an element", function() {
      expect([1, 2, 3]).toContain(2);
    });
  });


  describe("toMatch", function() {
    it("should pass a matching string", function() {
      expect("My big matched string").toMatch(/My(.+)string/);
    });
  });


  describe("toBeLessThan", function() {
    it("should pass when the actual is less than expected", function() {
      expect(1).toBeLessThan(2);
    });
  });


  describe("toBeGreaterThan", function() {
    it("should pass when the actual is greater than expected", function() {
      expect(2).toBeGreaterThan(1);
    });
  });


  describe("toThrow", function() {
    it("should pass when the exception is thrown", function() {
      expect(function () {
        throw("Some exception");
      }).toThrow("Some exception");
    });
  });
});
