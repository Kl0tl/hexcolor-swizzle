import { rgba, red, green, blue, alpha } from 'hexcolor';

var each = Function.prototype.call.bind(Array.prototype.forEach);

var getters = { r: red, g: green, b: blue, a: alpha };

each('rgb', function (r) {
  each('rgb', function (g) {
    each('rgb', function (b) {
      var name = r + g + b;
      Object.defineProperty(Number.prototype, name, {
        get: new Function('rgba', 'r', 'g', 'b', 'a', 'return function ' + name + '() {' +
          'return rgba(r(this), g(this), b(this), this > 0xffffff ? a(this) : 255);' +
        '}')(rgba, getters[r], getters[g], getters[b], getters.a),
        enumerable: false
      });
    });
  });
});

each('rgba', function (r) {
  each('rgba', function (g) {
    each('rgba', function (b) {
      each('rgba', function (a) {
        var name = r + g + b + a;
        Object.defineProperty(Number.prototype, name, {
          get: new Function('rgba', 'r', 'g', 'b', 'a', 'return function ' + name + '() {' +
            'return rgba(r(this), g(this), b(this), a(this));' +
          '}')(rgba, getters[r], getters[g], getters[b], getters[a]),
          enumerable: false
        });
      });
    });
  });
});
