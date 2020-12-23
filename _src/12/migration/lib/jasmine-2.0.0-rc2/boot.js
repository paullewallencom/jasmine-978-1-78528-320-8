// Jasmine boot.js for browser runners - exposes external/global interface, builds the Jasmine environment and executes it.
(function() {
  window.jasmine_ = jasmineRequire.core(jasmineRequire);
  jasmineRequire.html(jasmine_);

  var env = jasmine_.getEnv();

  var jasmineInterface = {
    describe_: function(description, specDefinitions) {
      return env.describe(description, specDefinitions);
    },

    xdescribe_: function(description, specDefinitions) {
      return env.xdescribe(description, specDefinitions);
    },

    it_: function(desc, func) {
      return env.it(desc, func);
    },

    xit_: function(desc, func) {
      return env.xit(desc, func);
    },

    beforeEach_: function(beforeEachFunction) {
      return env.beforeEach(beforeEachFunction);
    },

    afterEach_: function(afterEachFunction) {
      return env.afterEach(afterEachFunction);
    },

    expect_: function(actual) {
      return env.expect(actual);
    },

    pending_: function() {
      return env.pending();
    },

    addMatchers_: function(matchers) {
      return env.addMatchers(matchers);
    },

    spyOn_: function(obj, methodName) {
      return env.spyOn(obj, methodName);
    },

    clock_: env.clock,
    setTimeout_: env.clock.setTimeout,
    clearTimeout_: env.clock.clearTimeout,
    setInterval_: env.clock.setInterval,
    clearInterval_: env.clock.clearInterval,
    jsApiReporter_: new jasmine_.JsApiReporter({
      timer: new jasmine_.Timer()
    })
  };

  if (typeof window == "undefined" && typeof exports == "object") {
    extend(exports, jasmineInterface);
  } else {
    extend(window, jasmineInterface);
  }

  var queryString = new jasmine_.QueryString({
    getWindowLocation: function() { return window.location; }
  });

  // TODO: move all of catching to raise so we don't break our brains
  var catchingExceptions = queryString.getParam("catch");
  env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

  var htmlReporter = new jasmine_.HtmlReporter({
    env: env,
    queryString: queryString,
    onRaiseExceptionsClick: function() { queryString.setParam("catch", !env.catchingExceptions()); },
    getContainer: function() { return document.body; },
    createElement: function() { return document.createElement.apply(document, arguments); },
    createTextNode: function() { return document.createTextNode.apply(document, arguments); },
    timer: new jasmine_.Timer()
  });

  env.addReporter(jasmineInterface.jsApiReporter_);
  env.addReporter(htmlReporter);

  var specFilter = new jasmine_.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    htmlReporter.initialize();
    env.execute();
  };

  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

}());
