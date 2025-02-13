/**
 * vis-network
 * https://visjs.github.io/vis-network/
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 8.2.0
 * @date    2020-08-13T21:43:47.994Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

import { DataSet, DataView } from 'vis-data/peer/esm/vis-data.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$1
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;

var path = {};

var aFunction = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue; // bind timers to global for call from export context

    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      } // export virtual prototype methods


      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']'; // eslint-disable-next-line no-new-func


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


var functionBind = Function.bind || function bind(that
/* , ...args */
) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);

  var boundFunction = function bound()
  /* args... */
  {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// https://tc39.github.io/ecma262/#sec-function.prototype.bind

_export({
  target: 'Function',
  proto: true
}, {
  bind: functionBind
});

var entryVirtual = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var bind = entryVirtual('Function').bind;

var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
};

var bind$1 = bind_1;

var bind$2 = bind$1;

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var hiddenKeys = {};

var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

// https://tc39.github.io/ecma262/#sec-object.keys

var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

var f$3 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$3
};

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

var objectAssign = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && nativeAssign({
    b: 1
  }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), {
    b: 2
  })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign;

// https://tc39.github.io/ecma262/#sec-object.assign

_export({
  target: 'Object',
  stat: true,
  forced: Object.assign !== objectAssign
}, {
  assign: objectAssign
});

var assign = path.Object.assign;

var assign$1 = assign;

var assign$2 = assign$1;

/**
 * Draw a circle.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The radius of the circle.
 */
function drawCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.closePath();
}
/**
 * Draw a square.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the width and height of the square.
 */

function drawSquare(ctx, x, y, r) {
  ctx.beginPath();
  ctx.rect(x - r, y - r, r * 2, r * 2);
  ctx.closePath();
}
/**
 * Draw an equilateral triangle standing on a side.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the length of the sides.
 *
 * @remarks
 * http://en.wikipedia.org/wiki/Equilateral_triangle
 */

function drawTriangle(ctx, x, y, r) {
  ctx.beginPath(); // the change in radius and the offset is here to center the shape

  r *= 1.15;
  y += 0.275 * r;
  var s = r * 2;
  var s2 = s / 2;
  var ir = Math.sqrt(3) / 6 * s; // radius of inner circle

  var h = Math.sqrt(s * s - s2 * s2); // height

  ctx.moveTo(x, y - (h - ir));
  ctx.lineTo(x + s2, y + ir);
  ctx.lineTo(x - s2, y + ir);
  ctx.lineTo(x, y - (h - ir));
  ctx.closePath();
}
/**
 * Draw an equilateral triangle standing on a vertex.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the length of the sides.
 *
 * @remarks
 * http://en.wikipedia.org/wiki/Equilateral_triangle
 */

function drawTriangleDown(ctx, x, y, r) {
  ctx.beginPath(); // the change in radius and the offset is here to center the shape

  r *= 1.15;
  y -= 0.275 * r;
  var s = r * 2;
  var s2 = s / 2;
  var ir = Math.sqrt(3) / 6 * s; // radius of inner circle

  var h = Math.sqrt(s * s - s2 * s2); // height

  ctx.moveTo(x, y + (h - ir));
  ctx.lineTo(x + s2, y - ir);
  ctx.lineTo(x - s2, y - ir);
  ctx.lineTo(x, y + (h - ir));
  ctx.closePath();
}
/**
 * Draw a star.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The outer radius of the star.
 */

function drawStar(ctx, x, y, r) {
  // http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
  ctx.beginPath(); // the change in radius and the offset is here to center the shape

  r *= 0.82;
  y += 0.1 * r;

  for (var n = 0; n < 10; n++) {
    var radius = n % 2 === 0 ? r * 1.3 : r * 0.5;
    ctx.lineTo(x + radius * Math.sin(n * 2 * Math.PI / 10), y - radius * Math.cos(n * 2 * Math.PI / 10));
  }

  ctx.closePath();
}
/**
 * Draw a diamond.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the width and height of the diamond.
 *
 * @remarks
 * http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
 */

function drawDiamond(ctx, x, y, r) {
  ctx.beginPath();
  ctx.lineTo(x, y + r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y - r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
}
/**
 * Draw a rectangle with rounded corners.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the rectangle.
 * @param h - The height of the rectangle.
 * @param r - The radius of the corners.
 *
 * @remarks
 * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 */

function drawRoundRect(ctx, x, y, w, h, r) {
  var r2d = Math.PI / 180;

  if (w - 2 * r < 0) {
    r = w / 2;
  } //ensure that the radius isn't too large for x


  if (h - 2 * r < 0) {
    r = h / 2;
  } //ensure that the radius isn't too large for y


  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, r2d * 270, r2d * 360, false);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, r2d * 90, false);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, r2d * 90, r2d * 180, false);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, r2d * 180, r2d * 270, false);
  ctx.closePath();
}
/**
 * Draw an ellipse.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the ellipse.
 * @param h - The height of the ellipse.
 *
 * @remarks
 * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
 *
 * Postfix '_vis' added to discern it from standard method ellipse().
 */

function drawEllipse(ctx, x, y, w, h) {
  var kappa = 0.5522848,
      ox = w / 2 * kappa,
      // control point offset horizontal
  oy = h / 2 * kappa,
      // control point offset vertical
  xe = x + w,
      // x-end
  ye = y + h,
      // y-end
  xm = x + w / 2,
      // x-middle
  ym = y + h / 2; // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
}
/**
 * Draw an isometric cylinder.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the database.
 * @param h - The height of the database.
 *
 * @remarks
 * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
 */

function drawDatabase(ctx, x, y, w, h) {
  var f = 1 / 3;
  var wEllipse = w;
  var hEllipse = h * f;
  var kappa = 0.5522848,
      ox = wEllipse / 2 * kappa,
      // control point offset horizontal
  oy = hEllipse / 2 * kappa,
      // control point offset vertical
  xe = x + wEllipse,
      // x-end
  ye = y + hEllipse,
      // y-end
  xm = x + wEllipse / 2,
      // x-middle
  ym = y + hEllipse / 2,
      // y-middle
  ymb = y + (h - hEllipse / 2),
      // y-midlle, bottom ellipse
  yeb = y + h; // y-end, bottom ellipse

  ctx.beginPath();
  ctx.moveTo(xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.lineTo(xe, ymb);
  ctx.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
  ctx.bezierCurveTo(xm - ox, yeb, x, ymb + oy, x, ymb);
  ctx.lineTo(x, ym);
}
/**
 * Draw a dashed line.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The start position on the x axis.
 * @param y - The start position on the y axis.
 * @param x2 - The end position on the x axis.
 * @param y2 - The end position on the y axis.
 * @param pattern - List of lengths starting with line and then alternating between space and line.
 *
 * @author David Jordan
 * @date 2012-08-08
 * @remarks
 * http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
 */

function drawDashedLine(ctx, x, y, x2, y2, pattern) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  var patternLength = pattern.length;
  var dx = x2 - x;
  var dy = y2 - y;
  var slope = dy / dx;
  var distRemaining = Math.sqrt(dx * dx + dy * dy);
  var patternIndex = 0;
  var draw = true;
  var xStep = 0;
  var dashLength = +pattern[0];

  while (distRemaining >= 0.1) {
    dashLength = +pattern[patternIndex++ % patternLength];

    if (dashLength > distRemaining) {
      dashLength = distRemaining;
    }

    xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
    xStep = dx < 0 ? -xStep : xStep;
    x += xStep;
    y += slope * xStep;

    if (draw === true) {
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
    }

    distRemaining -= dashLength;
    draw = !draw;
  }
}
/**
 * Draw a hexagon.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The radius of the hexagon.
 */

function drawHexagon(ctx, x, y, r) {
  ctx.beginPath();
  var sides = 6;
  var a = Math.PI * 2 / sides;
  ctx.moveTo(x + r, y);

  for (var i = 1; i < sides; i++) {
    ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
  }

  ctx.closePath();
}
var shapeMap = {
  circle: drawCircle,
  dashedLine: drawDashedLine,
  database: drawDatabase,
  diamond: drawDiamond,
  ellipse: drawEllipse,
  ellipse_vis: drawEllipse,
  hexagon: drawHexagon,
  roundRect: drawRoundRect,
  square: drawSquare,
  star: drawStar,
  triangle: drawTriangle,
  triangleDown: drawTriangleDown
};
/**
 * Returns either custom or native drawing function base on supplied name.
 *
 * @param name - The name of the function. Either the name of a
 * CanvasRenderingContext2D property or an export from shapes.ts without the
 * draw prefix.
 *
 * @returns The function that can be used for rendering. In case of native
 * CanvasRenderingContext2D function the API is normalized to
 * `(ctx: CanvasRenderingContext2D, ...originalArgs) => void`.
 */

function getShape(name) {
  if (Object.prototype.hasOwnProperty.call(shapeMap, name)) {
    return shapeMap[name];
  } else {
    return function (ctx) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      CanvasRenderingContext2D.prototype[name].call(ctx, args);
    };
  }
}

var componentEmitter = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */
  {
    module.exports = Emitter;
  }
  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */


  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }

    return obj;
  }
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */


  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {}; // all

    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    } // specific event


    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this; // remove all handlers

    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    } // remove specific handler


    var cb;

    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];

      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    } // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.


    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };
  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */


  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1),
        callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);

      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };
  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */


  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };
  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */


  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };
});

// https://tc39.github.io/ecma262/#sec-object.defineproperty

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperty: objectDefineProperty.f
});

var defineProperty_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperty = module.exports = function defineProperty(it, key, desc) {
    return Object.defineProperty(it, key, desc);
  };

  if (Object.defineProperty.sham) defineProperty.sham = true;
});

var defineProperty$1 = defineProperty_1;

var defineProperty$2 = defineProperty$1;

// https://tc39.github.io/ecma262/#sec-object.defineproperties

var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};

// https://tc39.github.io/ecma262/#sec-object.defineproperties

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperties: objectDefineProperties
});

var defineProperties_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperties = module.exports = function defineProperties(T, D) {
    return Object.defineProperties(T, D);
  };

  if (Object.defineProperties.sham) defineProperties.sham = true;
});

var defineProperties = defineProperties_1;

var defineProperties$1 = defineProperties;

var aFunction$1 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$4
};

var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor$1(1);
});
var FORCED = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key);
  }
});

var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
    return Object.getOwnPropertyDescriptor(it, key);
  };

  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
});

var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol.iterator == 'symbol';

// https://tc39.github.io/ecma262/#sec-isarray

var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var html = getBuiltIn('document', 'documentElement');

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;

var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.4',
    mode:  'pure' ,
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString$1 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$5
};

var redefine = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
};

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

var f$6 = wellKnownSymbol;
var wellKnownSymbolWrapped = {
  f: f$6
};

var defineProperty$3 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var defineProperty$4 = objectDefineProperty.f;
var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has(target, TO_STRING_TAG$2)) {
      defineProperty$4(target, TO_STRING_TAG$2, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store$1, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var $forEach = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore$1 = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
  }
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
  defineWellKnownSymbol(name);
});
_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;

      while (arguments.length > index) args.push(arguments[index++]);

      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

var getOwnPropertySymbols$1 = getOwnPropertySymbols;

var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

var iterators = {};

var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype$1 : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis$1;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG$3) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
  }

  iterators[COLLECTION_NAME] = iterators.Array;
}

var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var ITERATOR$2 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || iterators[classof(it)];
};

var getIterator = function (it) {
  var iteratorMethod = getIteratorMethod(it);

  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  }

  return anObject(iteratorMethod.call(it));
};

var getIterator_1 = getIterator;

var getIterator$1 = getIterator_1;

var getIteratorMethod_1 = getIteratorMethod;

var getIteratorMethod$1 = getIteratorMethod_1;

var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var ITERATOR$3 = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$3] === it);
};

// https://tc39.github.io/ecma262/#sec-array.from


var arrayFrom = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

_export({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: arrayFrom
});

var from_1 = path.Array.from;

var from_1$1 = from_1;

var from_1$2 = from_1$1;

// https://tc39.github.io/ecma262/#sec-object.create

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  create: objectCreate
});

var Object$1 = path.Object;

var create = function create(P, D) {
  return Object$1.create(P, D);
};

var create$1 = create;

var create$2 = create$1;

var defineProperty$5 = defineProperty_1;

var defineProperty$6 = defineProperty$5;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$6(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty$7 = _defineProperty;

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};

var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: stringTrimForced('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

var trim = entryVirtual('String').trim;

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var defineProperty$8 = Object.defineProperty;
var cache = {};

var thrower = function (it) {
  throw it;
};

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;
  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = {
      length: -1
    };
    if (ACCESSORS) defineProperty$8(O, 1, {
      enumerable: true,
      get: thrower
    });else O[1] = 1;
    method.call(O, argument0, argument1);
  });
};

var $forEach$1 = arrayIteration.forEach;
var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


_export({
  target: 'Array',
  proto: true,
  forced: [].forEach != arrayForEach
}, {
  forEach: arrayForEach
});

var forEach = entryVirtual('Array').forEach;

var forEach$1 = forEach;

var ArrayPrototype$1 = Array.prototype;
var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.forEach // eslint-disable-next-line no-prototype-builtins
  || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
};

var forEach$2 = forEach_1;

var trim$1 = stringTrim.trim;
var $parseInt = global_1.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
  var S = trim$1(String(string));
  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
} : $parseInt;

// https://tc39.github.io/ecma262/#sec-parseint-string-radix

_export({
  global: true,
  forced: parseInt != numberParseInt
}, {
  parseInt: numberParseInt
});

var _parseInt = path.parseInt;

var _parseInt$1 = _parseInt;

var _parseInt$2 = _parseInt$1;

var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

var createMethod$4 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$4(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$4(false)
};

var $values = objectToArray.values; // `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values

_export({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

var values = path.Object.values;

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$1] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $filter = arrayIteration.filter;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var filter = entryVirtual('Array').filter;

var ArrayPrototype$2 = Array.prototype;

var filter_1 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.filter ? filter : own;
};

var filter$1 = filter_1;

var filter$2 = filter$1;

var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1,
  sham: !correctPrototypeGetter
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var getPrototypeOf = path.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf;

var getPrototypeOf$2 = getPrototypeOf$1;

var $indexOf = arrayIncludes.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$2
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var indexOf$1 = entryVirtual('Array').indexOf;

var ArrayPrototype$3 = Array.prototype;

var indexOf_1 = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.indexOf ? indexOf$1 : own;
};

var indexOf$2 = indexOf_1;

var indexOf$3 = indexOf$2;

// https://tc39.github.io/ecma262/#sec-array.isarray

_export({
  target: 'Array',
  stat: true
}, {
  isArray: isArray
});

var isArray$1 = path.Array.isArray;

var isArray$2 = isArray$1;

var isArray$3 = isArray$2;

function _arrayWithHoles(arr) {
  if (isArray$3(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

var ITERATOR$5 = wellKnownSymbol('iterator');

var isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$5] !== undefined || '@@iterator' in O // eslint-disable-next-line no-prototype-builtins
  || iterators.hasOwnProperty(classof(O));
};

var isIterable_1 = isIterable;

var isIterable$1 = isIterable_1;

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$2
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

// empty

var es_object_toString = /*#__PURE__*/Object.freeze({
	__proto__: null
});

// https://tc39.github.io/ecma262/#sec-symbol.asynciterator

defineWellKnownSymbol('asyncIterator');

// empty

var es_symbol_description = /*#__PURE__*/Object.freeze({
	__proto__: null
});

// https://tc39.github.io/ecma262/#sec-symbol.hasinstance

defineWellKnownSymbol('hasInstance');

// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable

defineWellKnownSymbol('isConcatSpreadable');

// https://tc39.github.io/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator');

// https://tc39.github.io/ecma262/#sec-symbol.match

defineWellKnownSymbol('match');

defineWellKnownSymbol('matchAll');

// https://tc39.github.io/ecma262/#sec-symbol.replace

defineWellKnownSymbol('replace');

// https://tc39.github.io/ecma262/#sec-symbol.search

defineWellKnownSymbol('search');

// https://tc39.github.io/ecma262/#sec-symbol.species

defineWellKnownSymbol('species');

// https://tc39.github.io/ecma262/#sec-symbol.split

defineWellKnownSymbol('split');

// https://tc39.github.io/ecma262/#sec-symbol.toprimitive

defineWellKnownSymbol('toPrimitive');

// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

defineWellKnownSymbol('toStringTag');

// https://tc39.github.io/ecma262/#sec-symbol.unscopables

defineWellKnownSymbol('unscopables');

// https://tc39.github.io/ecma262/#sec-math-@@tostringtag

setToStringTag(Math, 'Math', true);

// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

setToStringTag(global_1.JSON, 'JSON', true);

getCjsExportFromNamespace(es_object_toString);

getCjsExportFromNamespace(es_symbol_description);

var symbol = path.Symbol;

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('asyncDispose');

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('dispose');

// https://github.com/tc39/proposal-observable

defineWellKnownSymbol('observable');

// https://github.com/tc39/proposal-pattern-matching

defineWellKnownSymbol('patternMatch');

defineWellKnownSymbol('replaceAll');

var symbol$1 = symbol;

var symbol$2 = symbol$1;

function _iterableToArrayLimit(arr, i) {
  if (typeof symbol$2 === "undefined" || !isIterable$1(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = getIterator$1(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

var from_1$3 = from_1;

var from_1$4 = from_1$3;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var SPECIES$2 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var slice$1 = entryVirtual('Array').slice;

var ArrayPrototype$4 = Array.prototype;

var slice_1 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.slice ? slice$1 : own;
};

var slice$2 = slice_1;

var slice$3 = slice$2;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);

  var n = slice$3(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from_1$4(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

// https://tc39.github.io/ecma262/#sec-date.now

_export({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return new Date().getTime();
  }
});

var now = path.Date.now;

var now$1 = now;

var now$2 = now$1;

var FAILS_ON_PRIMITIVES$2 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$2
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$1 = path.Object.keys;

var keys$2 = keys$1;

var keys$3 = keys$2;

var $map = arrayIteration.map;
var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH$4 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var map = entryVirtual('Array').map;

var ArrayPrototype$5 = Array.prototype;

var map_1 = function (it) {
  var own = it.map;
  return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.map ? map : own;
};

var map$1 = map_1;

var map$2 = map$1;

var isArray$4 = isArray$1;

var isArray$5 = isArray$4;

var iterator = wellKnownSymbolWrapped.f('iterator');

var iterator$1 = iterator;

var iterator$2 = iterator$1;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof symbol$2 === "function" && typeof iterator$2 === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

// https://tc39.github.io/ecma262/#sec-reflect.ownkeys

_export({
  target: 'Reflect',
  stat: true
}, {
  ownKeys: ownKeys
});

var ownKeys$1 = path.Reflect.ownKeys;

var slice$4 = slice_1;

var slice$5 = slice$4;

function _arrayWithoutHoles(arr) {
  if (isArray$3(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof symbol$2 !== "undefined" && isIterable$1(Object(iter))) return from_1$4(iter);
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

var concat = entryVirtual('Array').concat;

var ArrayPrototype$6 = Array.prototype;

var concat_1 = function (it) {
  var own = it.concat;
  return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.concat ? concat : own;
};

var concat$1 = concat_1;

var concat$2 = concat$1;

var symbol$3 = symbol;

var symbol$4 = symbol$3;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context13; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = slice$5(_context13 = Object.prototype.toString.call(o)).call(_context13, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * vis-util
 * https://github.com/visjs/vis-util
 *
 * utilitie collection for visjs
 *
 * @version 4.3.4
 * @date    2020-08-01T15:11:53.524Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

/**
 * Use this symbol to delete properies in deepObjectAssign.
 */
var DELETE = symbol$4("DELETE");
/**
 * Seedable, fast and reasonably good (not crypto but more than okay for our
 * needs) random number generator.
 *
 * @remarks
 * Adapted from {@link https://web.archive.org/web/20110429100736/http://baagoe.com:80/en/RandomMusings/javascript}.
 * Original algorithm created by Johannes Baagøe \<baagoe\@baagoe.com\> in 2010.
 */

/**
 * Create a seeded pseudo random generator based on Alea by Johannes Baagøe.
 *
 * @param seed - All supplied arguments will be used as a seed. In case nothing
 * is supplied the current time will be used to seed the generator.
 *
 * @returns A ready to use seeded generator.
 */


function Alea() {
  for (var _len3 = arguments.length, seed = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    seed[_key3] = arguments[_key3];
  }

  return AleaImplementation(seed.length ? seed : [now$2()]);
}
/**
 * An implementation of [[Alea]] without user input validation.
 *
 * @param seed - The data that will be used to seed the generator.
 *
 * @returns A ready to use seeded generator.
 */


function AleaImplementation(seed) {
  var _mashSeed = mashSeed(seed),
      _mashSeed2 = slicedToArray(_mashSeed, 3),
      s0 = _mashSeed2[0],
      s1 = _mashSeed2[1],
      s2 = _mashSeed2[2];

  var c = 1;

  var random = function random() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };

  random.uint32 = function () {
    return random() * 0x100000000;
  }; // 2^32


  random.fract53 = function () {
    return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16;
  }; // 2^-53


  random.algorithm = "Alea";
  random.seed = seed;
  random.version = "0.9";
  return random;
}
/**
 * Turn arbitrary data into values [[AleaImplementation]] can use to generate
 * random numbers.
 *
 * @param seed - Arbitrary data that will be used as the seed.
 *
 * @returns Three numbers to use as initial values for [[AleaImplementation]].
 */


function mashSeed() {
  var mash = Mash();
  var s0 = mash(" ");
  var s1 = mash(" ");
  var s2 = mash(" ");

  for (var i = 0; i < arguments.length; i++) {
    s0 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s0 < 0) {
      s0 += 1;
    }

    s1 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s1 < 0) {
      s1 += 1;
    }

    s2 -= mash(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (s2 < 0) {
      s2 += 1;
    }
  }

  return [s0, s1, s2];
}
/**
 * Create a new mash function.
 *
 * @returns A nonpure function that takes arbitrary [[Mashable]] data and turns
 * them into numbers.
 */


function Mash() {
  var n = 0xefc8249d;
  return function (data) {
    var string = data.toString();

    for (var i = 0; i < string.length; i++) {
      n += string.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
} // utility functions

var fullHexRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
var shortHexRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
var rgbRE = /^rgb\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *\)$/i;
var rgbaRE = /^rgba\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *([01]|0?\.\d+) *\)$/i;
/**
 * Remove everything in the DOM object.
 *
 * @param DOMobject - Node whose child nodes will be recursively deleted.
 */


function recursiveDOMDelete(DOMobject) {
  if (DOMobject) {
    while (DOMobject.hasChildNodes() === true) {
      var child = DOMobject.firstChild;

      if (child) {
        recursiveDOMDelete(child);
        DOMobject.removeChild(child);
      }
    }
  }
}
/**
 * Test whether given object is a string.
 *
 * @param value - Input value of unknown type.
 *
 * @returns True if string, false otherwise.
 */


function isString(value) {
  return value instanceof String || typeof value === "string";
}
/**
 * Test whether given object is a object (not primitive or null).
 *
 * @param value - Input value of unknown type.
 *
 * @returns True if not null object, false otherwise.
 */


function isObject$1(value) {
  return _typeof_1(value) === "object" && value !== null;
}
/**
 * Copy property from b to a if property present in a.
 * If property in b explicitly set to null, delete it if `allowDeletion` set.
 *
 * Internal helper routine, should not be exported. Not added to `exports` for that reason.
 *
 * @param a - Target object.
 * @param b - Source object.
 * @param prop - Name of property to copy from b to a.
 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
 */


function copyOrDelete(a, b, prop, allowDeletion) {
  var doDeletion = false;

  if (allowDeletion === true) {
    doDeletion = b[prop] === null && a[prop] !== undefined;
  }

  if (doDeletion) {
    delete a[prop];
  } else {
    a[prop] = b[prop]; // Remember, this is a reference copy!
  }
}
/**
 * Fill an object with a possibly partially defined other object.
 *
 * Only copies values for the properties already present in a.
 * That means an object is not created on a property if only the b object has it.
 *
 * @param a - The object that will have it's properties updated.
 * @param b - The object with property updates.
 * @param allowDeletion - If true, delete properties in a that are explicitly set to null in b.
 */


function fillIfDefined(a, b) {
  var allowDeletion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // NOTE: iteration of properties of a
  // NOTE: prototype properties iterated over as well
  for (var prop in a) {
    if (b[prop] !== undefined) {
      if (b[prop] === null || _typeof_1(b[prop]) !== "object") {
        // Note: typeof null === 'object'
        copyOrDelete(a, b, prop, allowDeletion);
      } else {
        var aProp = a[prop];
        var bProp = b[prop];

        if (isObject$1(aProp) && isObject$1(bProp)) {
          fillIfDefined(aProp, bProp, allowDeletion);
        }
      }
    }
  }
}
/**
 * Extend object a with selected properties of object b.
 * Only properties with defined values are copied.
 *
 * @remarks
 * Previous version of this routine implied that multiple source objects could
 * be used; however, the implementation was **wrong**. Since multiple (\>1)
 * sources weren't used anywhere in the `vis.js` code, this has been removed
 *
 * @param props - Names of first-level properties to copy over.
 * @param a - Target object.
 * @param b - Source object.
 * @param allowDeletion - If true, delete property in a if explicitly set to null in b.
 *
 * @returns Argument a.
 */


function selectiveDeepExtend(props, a, b) {
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // TODO: add support for Arrays to deepExtend
  if (isArray$5(b)) {
    throw new TypeError("Arrays are not supported by deepExtend");
  }

  for (var p = 0; p < props.length; p++) {
    var prop = props[p];

    if (Object.prototype.hasOwnProperty.call(b, prop)) {
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === undefined) {
          a[prop] = {};
        }

        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop], false, allowDeletion);
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      } else if (isArray$5(b[prop])) {
        throw new TypeError("Arrays are not supported by deepExtend");
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    }
  }

  return a;
}
/**
 * Extend object `a` with properties of object `b`, ignoring properties which
 * are explicitly specified to be excluded.
 *
 * @remarks
 * The properties of `b` are considered for copying. Properties which are
 * themselves objects are are also extended. Only properties with defined
 * values are copied.
 *
 * @param propsToExclude - Names of properties which should *not* be copied.
 * @param a - Object to extend.
 * @param b - Object to take properties from for extension.
 * @param allowDeletion - If true, delete properties in a that are explicitly
 * set to null in b.
 *
 * @returns Argument a.
 */


function selectiveNotDeepExtend(propsToExclude, a, b) {
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // TODO: add support for Arrays to deepExtend
  // NOTE: array properties have an else-below; apparently, there is a problem here.
  if (isArray$5(b)) {
    throw new TypeError("Arrays are not supported by deepExtend");
  }

  for (var prop in b) {
    if (!Object.prototype.hasOwnProperty.call(b, prop)) {
      continue;
    } // Handle local properties only


    if (indexOf$3(propsToExclude).call(propsToExclude, prop) !== -1) {
      continue;
    } // In exclusion list, skip


    if (b[prop] && b[prop].constructor === Object) {
      if (a[prop] === undefined) {
        a[prop] = {};
      }

      if (a[prop].constructor === Object) {
        deepExtend(a[prop], b[prop]); // NOTE: allowDeletion not propagated!
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    } else if (isArray$5(b[prop])) {
      a[prop] = [];

      for (var i = 0; i < b[prop].length; i++) {
        a[prop].push(b[prop][i]);
      }
    } else {
      copyOrDelete(a, b, prop, allowDeletion);
    }
  }

  return a;
}
/**
 * Deep extend an object a with the properties of object b.
 *
 * @param a - Target object.
 * @param b - Source object.
 * @param protoExtend - If true, the prototype values will also be extended.
 * (That is the options objects that inherit from others will also get the
 * inherited options).
 * @param allowDeletion - If true, the values of fields that are null will be deleted.
 *
 * @returns Argument a.
 */


function deepExtend(a, b) {
  var protoExtend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var allowDeletion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  for (var prop in b) {
    if (Object.prototype.hasOwnProperty.call(b, prop) || protoExtend === true) {
      if (_typeof_1(b[prop]) === "object" && b[prop] !== null && getPrototypeOf$2(b[prop]) === Object.prototype) {
        if (a[prop] === undefined) {
          a[prop] = deepExtend({}, b[prop], protoExtend); // NOTE: allowDeletion not propagated!
        } else if (_typeof_1(a[prop]) === "object" && a[prop] !== null && getPrototypeOf$2(a[prop]) === Object.prototype) {
          deepExtend(a[prop], b[prop], protoExtend); // NOTE: allowDeletion not propagated!
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      } else if (isArray$5(b[prop])) {
        var _context3;

        a[prop] = slice$5(_context3 = b[prop]).call(_context3);
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    }
  }

  return a;
}
/**
 * Used to extend an array and copy it. This is used to propagate paths recursively.
 *
 * @param arr - First part.
 * @param newValue - The value to be aadded into the array.
 *
 * @returns A new array with all items from arr and newValue (which is last).
 */


function copyAndExtendArray(arr, newValue) {
  var _context4;

  return concat$2(_context4 = []).call(_context4, toConsumableArray(arr), [newValue]);
}
/**
 * Used to extend an array and copy it. This is used to propagate paths recursively.
 *
 * @param arr - The array to be copied.
 *
 * @returns Shallow copy of arr.
 */


function copyArray(arr) {
  return slice$5(arr).call(arr);
}
/**
 * Retrieve the absolute left value of a DOM element.
 *
 * @param elem - A dom element, for example a div.
 *
 * @returns The absolute left position of this element in the browser page.
 */


function getAbsoluteLeft(elem) {
  return elem.getBoundingClientRect().left;
}
/**
 * Retrieve the absolute top value of a DOM element.
 *
 * @param elem - A dom element, for example a div.
 *
 * @returns The absolute top position of this element in the browser page.
 */


function getAbsoluteTop(elem) {
  return elem.getBoundingClientRect().top;
}
/**
 * Add a className to the given elements style.
 *
 * @param elem - The element to which the classes will be added.
 * @param classNames - Space separated list of classes.
 */


function addClassName(elem, classNames) {
  var classes = elem.className.split(" ");
  var newClasses = classNames.split(" ");
  classes = concat$2(classes).call(classes, filter$2(newClasses).call(newClasses, function (className) {
    return indexOf$3(classes).call(classes, className) < 0;
  }));
  elem.className = classes.join(" ");
}
/**
 * Remove a className from the given elements style.
 *
 * @param elem - The element from which the classes will be removed.
 * @param classNames - Space separated list of classes.
 */


function removeClassName(elem, classNames) {
  var classes = elem.className.split(" ");
  var oldClasses = classNames.split(" ");
  classes = filter$2(classes).call(classes, function (className) {
    return indexOf$3(oldClasses).call(oldClasses, className) < 0;
  });
  elem.className = classes.join(" ");
}
/**
 * For each method for both arrays and objects.
 * In case of an array, the built-in Array.forEach() is applied (**No, it's not!**).
 * In case of an Object, the method loops over all properties of the object.
 *
 * @param object - An Object or Array to be iterated over.
 * @param callback - Array.forEach-like callback.
 */


function forEach$3(object, callback) {
  if (isArray$5(object)) {
    // array
    var len = object.length;

    for (var i = 0; i < len; i++) {
      callback(object[i], i, object);
    }
  } else {
    // object
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }
}
/**
 * Add and event listener. Works for all browsers.
 *
 * @param element - The element to bind the event listener to.
 * @param action - Same as Element.addEventListener(action, —, —).
 * @param listener - Same as Element.addEventListener(—, listener, —).
 * @param useCapture - Same as Element.addEventListener(—, —, useCapture).
 */


function addEventListener(element, action, listener, useCapture) {
  if (element.addEventListener) {
    var _context5;

    if (useCapture === undefined) {
      useCapture = false;
    }

    if (action === "mousewheel" && indexOf$3(_context5 = navigator.userAgent).call(_context5, "Firefox") >= 0) {
      action = "DOMMouseScroll"; // For Firefox
    }

    element.addEventListener(action, listener, useCapture);
  } else {
    // @TODO: IE types? Does anyone care?
    element.attachEvent("on" + action, listener); // IE browsers
  }
}
/**
 * Remove an event listener from an element.
 *
 * @param element - The element to bind the event listener to.
 * @param action - Same as Element.removeEventListener(action, —, —).
 * @param listener - Same as Element.removeEventListener(—, listener, —).
 * @param useCapture - Same as Element.removeEventListener(—, —, useCapture).
 */


function removeEventListener(element, action, listener, useCapture) {
  if (element.removeEventListener) {
    var _context6;

    // non-IE browsers
    if (useCapture === undefined) {
      useCapture = false;
    }

    if (action === "mousewheel" && indexOf$3(_context6 = navigator.userAgent).call(_context6, "Firefox") >= 0) {
      action = "DOMMouseScroll"; // For Firefox
    }

    element.removeEventListener(action, listener, useCapture);
  } else {
    // @TODO: IE types? Does anyone care?
    element.detachEvent("on" + action, listener); // IE browsers
  }
}
/**
 * Convert hex color string into RGB color object.
 *
 * @remarks
 * {@link http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
 *
 * @param hex - Hex color string (3 or 6 digits, with or without #).
 *
 * @returns RGB color object.
 */

function hexToRGB(hex) {
  var result;

  switch (hex.length) {
    case 3:
    case 4:
      result = shortHexRE.exec(hex);
      return result ? {
        r: _parseInt$2(result[1] + result[1], 16),
        g: _parseInt$2(result[2] + result[2], 16),
        b: _parseInt$2(result[3] + result[3], 16)
      } : null;

    case 6:
    case 7:
      result = fullHexRE.exec(hex);
      return result ? {
        r: _parseInt$2(result[1], 16),
        g: _parseInt$2(result[2], 16),
        b: _parseInt$2(result[3], 16)
      } : null;

    default:
      return null;
  }
}
/**
 * This function takes string color in hex or RGB format and adds the opacity, RGBA is passed through unchanged.
 *
 * @param color - The color string (hex, RGB, RGBA).
 * @param opacity - The new opacity.
 *
 * @returns RGBA string, for example 'rgba(255, 0, 127, 0.3)'.
 */


function overrideOpacity(color, opacity) {
  if (indexOf$3(color).call(color, "rgba") !== -1) {
    return color;
  } else if (indexOf$3(color).call(color, "rgb") !== -1) {
    var rgb = color.substr(indexOf$3(color).call(color, "(") + 1).replace(")", "").split(",");
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
  } else {
    var _rgb = hexToRGB(color);

    if (_rgb == null) {
      return color;
    } else {
      return "rgba(" + _rgb.r + "," + _rgb.g + "," + _rgb.b + "," + opacity + ")";
    }
  }
}
/**
 * Convert RGB \<0, 255\> into hex color string.
 *
 * @param red - Red channel.
 * @param green - Green channel.
 * @param blue - Blue channel.
 *
 * @returns Hex color string (for example: '#0acdc0').
 */


function RGBToHex(red, green, blue) {
  var _context7;

  return "#" + slice$5(_context7 = ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16)).call(_context7, 1);
}
/**
 * Parse a color property into an object with border, background, and highlight colors.
 *
 * @param inputColor - Shorthand color string or input color object.
 * @param defaultColor - Full color object to fill in missing values in inputColor.
 *
 * @returns Color object.
 */


function parseColor(inputColor, defaultColor) {
  if (isString(inputColor)) {
    var colorStr = inputColor;

    if (isValidRGB(colorStr)) {
      var _context8;

      var rgb = map$2(_context8 = colorStr.substr(4).substr(0, colorStr.length - 5).split(",")).call(_context8, function (value) {
        return _parseInt$2(value);
      });

      colorStr = RGBToHex(rgb[0], rgb[1], rgb[2]);
    }

    if (isValidHex(colorStr) === true) {
      var hsv = hexToHSV(colorStr);
      var lighterColorHSV = {
        h: hsv.h,
        s: hsv.s * 0.8,
        v: Math.min(1, hsv.v * 1.02)
      };
      var darkerColorHSV = {
        h: hsv.h,
        s: Math.min(1, hsv.s * 1.25),
        v: hsv.v * 0.8
      };
      var darkerColorHex = HSVToHex(darkerColorHSV.h, darkerColorHSV.s, darkerColorHSV.v);
      var lighterColorHex = HSVToHex(lighterColorHSV.h, lighterColorHSV.s, lighterColorHSV.v);
      return {
        background: colorStr,
        border: darkerColorHex,
        highlight: {
          background: lighterColorHex,
          border: darkerColorHex
        },
        hover: {
          background: lighterColorHex,
          border: darkerColorHex
        }
      };
    } else {
      return {
        background: colorStr,
        border: colorStr,
        highlight: {
          background: colorStr,
          border: colorStr
        },
        hover: {
          background: colorStr,
          border: colorStr
        }
      };
    }
  } else {
    if (defaultColor) {
      var color = {
        background: inputColor.background || defaultColor.background,
        border: inputColor.border || defaultColor.border,
        highlight: isString(inputColor.highlight) ? {
          border: inputColor.highlight,
          background: inputColor.highlight
        } : {
          background: inputColor.highlight && inputColor.highlight.background || defaultColor.highlight.background,
          border: inputColor.highlight && inputColor.highlight.border || defaultColor.highlight.border
        },
        hover: isString(inputColor.hover) ? {
          border: inputColor.hover,
          background: inputColor.hover
        } : {
          border: inputColor.hover && inputColor.hover.border || defaultColor.hover.border,
          background: inputColor.hover && inputColor.hover.background || defaultColor.hover.background
        }
      };
      return color;
    } else {
      var _color = {
        background: inputColor.background || undefined,
        border: inputColor.border || undefined,
        highlight: isString(inputColor.highlight) ? {
          border: inputColor.highlight,
          background: inputColor.highlight
        } : {
          background: inputColor.highlight && inputColor.highlight.background || undefined,
          border: inputColor.highlight && inputColor.highlight.border || undefined
        },
        hover: isString(inputColor.hover) ? {
          border: inputColor.hover,
          background: inputColor.hover
        } : {
          border: inputColor.hover && inputColor.hover.border || undefined,
          background: inputColor.hover && inputColor.hover.background || undefined
        }
      };
      return _color;
    }
  }
}
/**
 * Convert RGB \<0, 255\> into HSV object.
 *
 * @remarks
 * {@link http://www.javascripter.net/faq/rgb2hsv.htm}
 *
 * @param red - Red channel.
 * @param green - Green channel.
 * @param blue - Blue channel.
 *
 * @returns HSV color object.
 */


function RGBToHSV(red, green, blue) {
  red = red / 255;
  green = green / 255;
  blue = blue / 255;
  var minRGB = Math.min(red, Math.min(green, blue));
  var maxRGB = Math.max(red, Math.max(green, blue)); // Black-gray-white

  if (minRGB === maxRGB) {
    return {
      h: 0,
      s: 0,
      v: minRGB
    };
  } // Colors other than black-gray-white:


  var d = red === minRGB ? green - blue : blue === minRGB ? red - green : blue - red;
  var h = red === minRGB ? 3 : blue === minRGB ? 1 : 5;
  var hue = 60 * (h - d / (maxRGB - minRGB)) / 360;
  var saturation = (maxRGB - minRGB) / maxRGB;
  var value = maxRGB;
  return {
    h: hue,
    s: saturation,
    v: value
  };
}
/**
 * Convert HSV \<0, 1\> into RGB color object.
 *
 * @remarks
 * {@link https://gist.github.com/mjijackson/5311256}
 *
 * @param h - Hue.
 * @param s - Saturation.
 * @param v - Value.
 *
 * @returns RGB color object.
 */


function HSVToRGB(h, s, v) {
  var r;
  var g;
  var b;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;

    case 1:
      r = q, g = v, b = p;
      break;

    case 2:
      r = p, g = v, b = t;
      break;

    case 3:
      r = p, g = q, b = v;
      break;

    case 4:
      r = t, g = p, b = v;
      break;

    case 5:
      r = v, g = p, b = q;
      break;
  }

  return {
    r: Math.floor(r * 255),
    g: Math.floor(g * 255),
    b: Math.floor(b * 255)
  };
}
/**
 * Convert HSV \<0, 1\> into hex color string.
 *
 * @param h - Hue.
 * @param s - Saturation.
 * @param v - Value.
 *
 * @returns Hex color string.
 */


function HSVToHex(h, s, v) {
  var rgb = HSVToRGB(h, s, v);
  return RGBToHex(rgb.r, rgb.g, rgb.b);
}
/**
 * Convert hex color string into HSV \<0, 1\>.
 *
 * @param hex - Hex color string.
 *
 * @returns HSV color object.
 */


function hexToHSV(hex) {
  var rgb = hexToRGB(hex);

  if (!rgb) {
    throw new TypeError("'".concat(hex, "' is not a valid color."));
  }

  return RGBToHSV(rgb.r, rgb.g, rgb.b);
}
/**
 * Validate hex color string.
 *
 * @param hex - Unknown string that may contain a color.
 *
 * @returns True if the string is valid, false otherwise.
 */


function isValidHex(hex) {
  var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  return isOk;
}
/**
 * Validate RGB color string.
 *
 * @param rgb - Unknown string that may contain a color.
 *
 * @returns True if the string is valid, false otherwise.
 */


function isValidRGB(rgb) {
  return rgbRE.test(rgb);
}
/**
 * Validate RGBA color string.
 *
 * @param rgba - Unknown string that may contain a color.
 *
 * @returns True if the string is valid, false otherwise.
 */


function isValidRGBA(rgba) {
  return rgbaRE.test(rgba);
}
/**
 * This recursively redirects the prototype of JSON objects to the referenceObject.
 * This is used for default options.
 *
 * @param referenceObject - The original object.
 *
 * @returns The Element if the referenceObject is an Element, or a new object inheriting from the referenceObject.
 */


function bridgeObject(referenceObject) {
  if (referenceObject === null || _typeof_1(referenceObject) !== "object") {
    return null;
  }

  if (referenceObject instanceof Element) {
    // Avoid bridging DOM objects
    return referenceObject;
  }

  var objectTo = create$2(referenceObject);

  for (var i in referenceObject) {
    if (Object.prototype.hasOwnProperty.call(referenceObject, i)) {
      if (_typeof_1(referenceObject[i]) == "object") {
        objectTo[i] = bridgeObject(referenceObject[i]);
      }
    }
  }

  return objectTo;
}
/**
 * This is used to set the options of subobjects in the options object.
 *
 * A requirement of these subobjects is that they have an 'enabled' element
 * which is optional for the user but mandatory for the program.
 *
 * The added value here of the merge is that option 'enabled' is set as required.
 *
 * @param mergeTarget - Either this.options or the options used for the groups.
 * @param options - Options.
 * @param option - Option key in the options argument.
 * @param globalOptions - Global options, passed in to determine value of option 'enabled'.
 */


function mergeOptions(mergeTarget, options, option) {
  var globalOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Local helpers
  var isPresent = function isPresent(obj) {
    return obj !== null && obj !== undefined;
  };

  var isObject = function isObject(obj) {
    return obj !== null && _typeof_1(obj) === "object";
  }; // https://stackoverflow.com/a/34491287/1223531


  var isEmpty = function isEmpty(obj) {
    for (var x in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, x)) {
        return false;
      }
    }

    return true;
  }; // Guards


  if (!isObject(mergeTarget)) {
    throw new Error("Parameter mergeTarget must be an object");
  }

  if (!isObject(options)) {
    throw new Error("Parameter options must be an object");
  }

  if (!isPresent(option)) {
    throw new Error("Parameter option must have a value");
  }

  if (!isObject(globalOptions)) {
    throw new Error("Parameter globalOptions must be an object");
  } //
  // Actual merge routine, separated from main logic
  // Only a single level of options is merged. Deeper levels are ref'd. This may actually be an issue.
  //


  var doMerge = function doMerge(target, options, option) {
    if (!isObject(target[option])) {
      target[option] = {};
    }

    var src = options[option];
    var dst = target[option];

    for (var prop in src) {
      if (Object.prototype.hasOwnProperty.call(src, prop)) {
        dst[prop] = src[prop];
      }
    }
  }; // Local initialization


  var srcOption = options[option];
  var globalPassed = isObject(globalOptions) && !isEmpty(globalOptions);
  var globalOption = globalPassed ? globalOptions[option] : undefined;
  var globalEnabled = globalOption ? globalOption.enabled : undefined; /////////////////////////////////////////
  // Main routine
  /////////////////////////////////////////

  if (srcOption === undefined) {
    return; // Nothing to do
  }

  if (typeof srcOption === "boolean") {
    if (!isObject(mergeTarget[option])) {
      mergeTarget[option] = {};
    }

    mergeTarget[option].enabled = srcOption;
    return;
  }

  if (srcOption === null && !isObject(mergeTarget[option])) {
    // If possible, explicit copy from globals
    if (isPresent(globalOption)) {
      mergeTarget[option] = create$2(globalOption);
    } else {
      return; // Nothing to do
    }
  }

  if (!isObject(srcOption)) {
    return;
  } //
  // Ensure that 'enabled' is properly set. It is required internally
  // Note that the value from options will always overwrite the existing value
  //


  var enabled = true; // default value

  if (srcOption.enabled !== undefined) {
    enabled = srcOption.enabled;
  } else {
    // Take from globals, if present
    if (globalEnabled !== undefined) {
      enabled = globalOption.enabled;
    }
  }

  doMerge(mergeTarget, options, option);
  mergeTarget[option].enabled = enabled;
}
/*
 * Easing Functions.
 * Only considering the t value for the range [0, 1] => [0, 1].
 *
 * Inspiration: from http://gizma.com/easing/
 * https://gist.github.com/gre/1650294
 */


var easingFunctions = {
  /**
   * Provides no easing and no acceleration.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  linear: function linear(t) {
    return t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },

  /**
   * Accelerate from zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },

  /**
   * Decelerate to zero velocity.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },

  /**
   * Accelerate until halfway, then decelerate.
   *
   * @param t - Time.
   *
   * @returns Value at time t.
   */
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
// It works only for single property objects,
// otherwise it combines all of the types in a union.
// export function topMost<K1 extends string, V1> (
//   pile: Record<K1, undefined | V1>[],
//   accessors: K1 | [K1]
// ): undefined | V1
// export function topMost<K1 extends string, K2 extends string, V1, V2> (
//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2>>[],
//   accessors: [K1, K2]
// ): undefined | V1 | V2
// export function topMost<K1 extends string, K2 extends string, K3 extends string, V1, V2, V3> (
//   pile: Record<K1, undefined | V1 | Record<K2, undefined | V2 | Record<K3, undefined | V3>>>[],
//   accessors: [K1, K2, K3]
// ): undefined | V1 | V2 | V3

/**
 * Get the top most property value from a pile of objects.
 *
 * @param pile - Array of objects, no required format.
 * @param accessors - Array of property names.
 * For example `object['foo']['bar']` → `['foo', 'bar']`.
 *
 * @returns Value of the property with given accessors path from the first pile item where it's not undefined.
 */


function topMost(pile, accessors) {
  var candidate;

  if (!isArray$5(accessors)) {
    accessors = [accessors];
  }

  var _iterator2 = _createForOfIteratorHelper(pile),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var member = _step2.value;

      if (member) {
        candidate = member[accessors[0]];

        for (var i = 1; i < accessors.length; i++) {
          if (candidate) {
            candidate = candidate[accessors[i]];
          }
        }

        if (typeof candidate !== "undefined") {
          break;
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return candidate;
}

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('splice', {
  ACCESSORS: true,
  0: 0,
  1: 2
});
var max$2 = Math.max;
var min$2 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$5
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var splice = entryVirtual('Array').splice;

var ArrayPrototype$7 = Array.prototype;

var splice_1 = function (it) {
  var own = it.splice;
  return it === ArrayPrototype$7 || it instanceof Array && own === ArrayPrototype$7.splice ? splice : own;
};

var splice$1 = splice_1;

var splice$2 = splice$1;

var $includes = arrayIncludes.includes;
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('indexOf', {
  ACCESSORS: true,
  1: 0
}); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

_export({
  target: 'Array',
  proto: true,
  forced: !USES_TO_LENGTH$6
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

var includes = entryVirtual('Array').includes;

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};

// https://tc39.github.io/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes$1 = entryVirtual('String').includes;

var ArrayPrototype$8 = Array.prototype;
var StringPrototype = String.prototype;

var includes$2 = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.includes) return includes;

  if (typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.includes) {
    return includes$1;
  }

  return own;
};

var includes$3 = includes$2;

var includes$4 = includes$3;

/* eslint-disable max-statements */

/* eslint-disable no-prototype-builtins */

/* eslint-disable no-unused-vars */

/* eslint-disable no-var */

/**
 * Parse a text source containing data in DOT language into a JSON object.
 * The object contains two lists: one with nodes and one with edges.
 *
 * DOT language reference: http://www.graphviz.org/doc/info/lang.html
 *
 * DOT language attributes: http://graphviz.org/content/attrs
 *
 * @param {string} data     Text containing a graph in DOT-notation
 * @return {Object} graph   An object containing two parameters:
 *                          {Object[]} nodes
 *                          {Object[]} edges
 *
 * -------------------------------------------
 * TODO
 * ====
 *
 * For label handling, this is an incomplete implementation. From docs (quote #3015):
 *
 * > the escape sequences "\n", "\l" and "\r" divide the label into lines, centered,
 * > left-justified, and right-justified, respectively.
 *
 * Source: http://www.graphviz.org/content/attrs#kescString
 *
 * > As another aid for readability, dot allows double-quoted strings to span multiple physical
 * > lines using the standard C convention of a backslash immediately preceding a newline
 * > character
 * > In addition, double-quoted strings can be concatenated using a '+' operator.
 * > As HTML strings can contain newline characters, which are used solely for formatting,
 * > the language does not allow escaped newlines or concatenation operators to be used
 * > within them.
 *
 * - Currently, only '\\n' is handled
 * - Note that text explicitly says 'labels'; the dot parser currently handles escape
 *   sequences in **all** strings.
 */
function parseDOT(data) {
  dot = data;
  return parseGraph();
} // mapping of attributes from DOT (the keys) to vis.js (the values)

var NODE_ATTR_MAPPING = {
  'fontsize': 'font.size',
  'fontcolor': 'font.color',
  'labelfontcolor': 'font.color',
  'fontname': 'font.face',
  'color': ['color.border', 'color.background'],
  'fillcolor': 'color.background',
  'tooltip': 'title',
  'labeltooltip': 'title'
};

var EDGE_ATTR_MAPPING = create$2(NODE_ATTR_MAPPING);

EDGE_ATTR_MAPPING.color = 'color.color';
EDGE_ATTR_MAPPING.style = 'dashes'; // token types enumeration

var TOKENTYPE = {
  NULL: 0,
  DELIMITER: 1,
  IDENTIFIER: 2,
  UNKNOWN: 3
}; // map with all delimiters

var DELIMITERS = {
  '{': true,
  '}': true,
  '[': true,
  ']': true,
  ';': true,
  '=': true,
  ',': true,
  '->': true,
  '--': true
};
var dot = ''; // current dot file

var index = 0; // current index in dot file

var c = ''; // current token character in expr

var token = ''; // current token

var tokenType = TOKENTYPE.NULL; // type of the token

/**
 * Get the first character from the dot file.
 * The character is stored into the char c. If the end of the dot file is
 * reached, the function puts an empty string in c.
 */

function first() {
  index = 0;
  c = dot.charAt(0);
}
/**
 * Get the next character from the dot file.
 * The character is stored into the char c. If the end of the dot file is
 * reached, the function puts an empty string in c.
 */


function next() {
  index++;
  c = dot.charAt(index);
}
/**
 * Preview the next character from the dot file.
 * @return {string} cNext
 */


function nextPreview() {
  return dot.charAt(index + 1);
}

var regexAlphaNumeric = /[a-zA-Z_0-9.:#]/;
/**
 * Test whether given character is alphabetic or numeric
 * @param {string} c
 * @return {Boolean} isAlphaNumeric
 */

function isAlphaNumeric(c) {
  return regexAlphaNumeric.test(c);
}
/**
 * Merge all options of object b into object b
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 */


function merge(a, b) {
  if (!a) {
    a = {};
  }

  if (b) {
    for (var name in b) {
      if (b.hasOwnProperty(name)) {
        a[name] = b[name];
      }
    }
  }

  return a;
}
/**
 * Set a value in an object, where the provided parameter name can be a
 * path with nested parameters. For example:
 *
 *     var obj = {a: 2};
 *     setValue(obj, 'b.c', 3);     // obj = {a: 2, b: {c: 3}}
 *
 * @param {Object} obj
 * @param {string} path  A parameter name or dot-separated parameter path,
 *                      like "color.highlight.border".
 * @param {*} value
 */


function setValue(obj, path, value) {
  var keys = path.split('.');
  var o = obj;

  while (keys.length) {
    var key = keys.shift();

    if (keys.length) {
      // this isn't the end point
      if (!o[key]) {
        o[key] = {};
      }

      o = o[key];
    } else {
      // this is the end point
      o[key] = value;
    }
  }
}
/**
 * Add a node to a graph object. If there is already a node with
 * the same id, their attributes will be merged.
 * @param {Object} graph
 * @param {Object} node
 */


function addNode(graph, node) {
  var i, len;
  var current = null; // find root graph (in case of subgraph)

  var graphs = [graph]; // list with all graphs from current graph to root graph

  var root = graph;

  while (root.parent) {
    graphs.push(root.parent);
    root = root.parent;
  } // find existing node (at root level) by its id


  if (root.nodes) {
    for (i = 0, len = root.nodes.length; i < len; i++) {
      if (node.id === root.nodes[i].id) {
        current = root.nodes[i];
        break;
      }
    }
  }

  if (!current) {
    // this is a new node
    current = {
      id: node.id
    };

    if (graph.node) {
      // clone default attributes
      current.attr = merge(current.attr, graph.node);
    }
  } // add node to this (sub)graph and all its parent graphs


  for (i = graphs.length - 1; i >= 0; i--) {
    var _context;

    var g = graphs[i];

    if (!g.nodes) {
      g.nodes = [];
    }

    if (indexOf$3(_context = g.nodes).call(_context, current) === -1) {
      g.nodes.push(current);
    }
  } // merge attributes


  if (node.attr) {
    current.attr = merge(current.attr, node.attr);
  }
}
/**
 * Add an edge to a graph object
 * @param {Object} graph
 * @param {Object} edge
 */


function addEdge(graph, edge) {
  if (!graph.edges) {
    graph.edges = [];
  }

  graph.edges.push(edge);

  if (graph.edge) {
    var attr = merge({}, graph.edge); // clone default attributes

    edge.attr = merge(attr, edge.attr); // merge attributes
  }
}
/**
 * Create an edge to a graph object
 * @param {Object} graph
 * @param {string | number | Object} from
 * @param {string | number | Object} to
 * @param {string} type
 * @param {Object | null} attr
 * @return {Object} edge
 */


function createEdge(graph, from, to, type, attr) {
  var edge = {
    from: from,
    to: to,
    type: type
  };

  if (graph.edge) {
    edge.attr = merge({}, graph.edge); // clone default attributes
  }

  edge.attr = merge(edge.attr || {}, attr); // merge attributes
  // Move arrows attribute from attr to edge temporally created in
  // parseAttributeList().

  if (attr != null) {
    if (attr.hasOwnProperty('arrows') && attr['arrows'] != null) {
      edge['arrows'] = {
        to: {
          enabled: true,
          type: attr.arrows.type
        }
      };
      attr['arrows'] = null;
    }
  }

  return edge;
}
/**
 * Get next token in the current dot file.
 * The token and token type are available as token and tokenType
 */


function getToken() {
  tokenType = TOKENTYPE.NULL;
  token = ''; // skip over whitespaces

  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    // space, tab, enter
    next();
  }

  do {
    var isComment = false; // skip comment

    if (c === '#') {
      // find the previous non-space character
      var i = index - 1;

      while (dot.charAt(i) === ' ' || dot.charAt(i) === '\t') {
        i--;
      }

      if (dot.charAt(i) === '\n' || dot.charAt(i) === '') {
        // the # is at the start of a line, this is indeed a line comment
        while (c != '' && c != '\n') {
          next();
        }

        isComment = true;
      }
    }

    if (c === '/' && nextPreview() === '/') {
      // skip line comment
      while (c != '' && c != '\n') {
        next();
      }

      isComment = true;
    }

    if (c === '/' && nextPreview() === '*') {
      // skip block comment
      while (c != '') {
        if (c === '*' && nextPreview() === '/') {
          // end of block comment found. skip these last two characters
          next();
          next();
          break;
        } else {
          next();
        }
      }

      isComment = true;
    } // skip over whitespaces


    while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
      // space, tab, enter
      next();
    }
  } while (isComment); // check for end of dot file


  if (c === '') {
    // token is still empty
    tokenType = TOKENTYPE.DELIMITER;
    return;
  } // check for delimiters consisting of 2 characters


  var c2 = c + nextPreview();

  if (DELIMITERS[c2]) {
    tokenType = TOKENTYPE.DELIMITER;
    token = c2;
    next();
    next();
    return;
  } // check for delimiters consisting of 1 character


  if (DELIMITERS[c]) {
    tokenType = TOKENTYPE.DELIMITER;
    token = c;
    next();
    return;
  } // check for an identifier (number or string)
  // TODO: more precise parsing of numbers/strings (and the port separator ':')


  if (isAlphaNumeric(c) || c === '-') {
    token += c;
    next();

    while (isAlphaNumeric(c)) {
      token += c;
      next();
    }

    if (token === 'false') {
      token = false; // convert to boolean
    } else if (token === 'true') {
      token = true; // convert to boolean
    } else if (!isNaN(Number(token))) {
      token = Number(token); // convert to number
    }

    tokenType = TOKENTYPE.IDENTIFIER;
    return;
  } // check for a string enclosed by double quotes


  if (c === '"') {
    next();

    while (c != '' && (c != '"' || c === '"' && nextPreview() === '"')) {
      if (c === '"') {
        // skip the escape character
        token += c;
        next();
      } else if (c === '\\' && nextPreview() === 'n') {
        // Honor a newline escape sequence
        token += '\n';
        next();
      } else {
        token += c;
      }

      next();
    }

    if (c != '"') {
      throw newSyntaxError('End of string " expected');
    }

    next();
    tokenType = TOKENTYPE.IDENTIFIER;
    return;
  } // something unknown is found, wrong characters, a syntax error


  tokenType = TOKENTYPE.UNKNOWN;

  while (c != '') {
    token += c;
    next();
  }

  throw new SyntaxError('Syntax error in part "' + chop(token, 30) + '"');
}
/**
 * Parse a graph.
 * @returns {Object} graph
 */


function parseGraph() {
  var graph = {};
  first();
  getToken(); // optional strict keyword

  if (token === 'strict') {
    graph.strict = true;
    getToken();
  } // graph or digraph keyword


  if (token === 'graph' || token === 'digraph') {
    graph.type = token;
    getToken();
  } // optional graph id


  if (tokenType === TOKENTYPE.IDENTIFIER) {
    graph.id = token;
    getToken();
  } // open angle bracket


  if (token != '{') {
    throw newSyntaxError('Angle bracket { expected');
  }

  getToken(); // statements

  parseStatements(graph); // close angle bracket

  if (token != '}') {
    throw newSyntaxError('Angle bracket } expected');
  }

  getToken(); // end of file

  if (token !== '') {
    throw newSyntaxError('End of file expected');
  }

  getToken(); // remove temporary default options

  delete graph.node;
  delete graph.edge;
  delete graph.graph;
  return graph;
}
/**
 * Parse a list with statements.
 * @param {Object} graph
 */


function parseStatements(graph) {
  while (token !== '' && token != '}') {
    parseStatement(graph);

    if (token === ';') {
      getToken();
    }
  }
}
/**
 * Parse a single statement. Can be a an attribute statement, node
 * statement, a series of node statements and edge statements, or a
 * parameter.
 * @param {Object} graph
 */


function parseStatement(graph) {
  // parse subgraph
  var subgraph = parseSubgraph(graph);

  if (subgraph) {
    // edge statements
    parseEdge(graph, subgraph);
    return;
  } // parse an attribute statement


  var attr = parseAttributeStatement(graph);

  if (attr) {
    return;
  } // parse node


  if (tokenType != TOKENTYPE.IDENTIFIER) {
    throw newSyntaxError('Identifier expected');
  }

  var id = token; // id can be a string or a number

  getToken();

  if (token === '=') {
    // id statement
    getToken();

    if (tokenType != TOKENTYPE.IDENTIFIER) {
      throw newSyntaxError('Identifier expected');
    }

    graph[id] = token;
    getToken(); // TODO: implement comma separated list with "a_list: ID=ID [','] [a_list] "
  } else {
    parseNodeStatement(graph, id);
  }
}
/**
 * Parse a subgraph
 * @param {Object} graph    parent graph object
 * @return {Object | null} subgraph
 */


function parseSubgraph(graph) {
  var subgraph = null; // optional subgraph keyword

  if (token === 'subgraph') {
    subgraph = {};
    subgraph.type = 'subgraph';
    getToken(); // optional graph id

    if (tokenType === TOKENTYPE.IDENTIFIER) {
      subgraph.id = token;
      getToken();
    }
  } // open angle bracket


  if (token === '{') {
    getToken();

    if (!subgraph) {
      subgraph = {};
    }

    subgraph.parent = graph;
    subgraph.node = graph.node;
    subgraph.edge = graph.edge;
    subgraph.graph = graph.graph; // statements

    parseStatements(subgraph); // close angle bracket

    if (token != '}') {
      throw newSyntaxError('Angle bracket } expected');
    }

    getToken(); // remove temporary default options

    delete subgraph.node;
    delete subgraph.edge;
    delete subgraph.graph;
    delete subgraph.parent; // register at the parent graph

    if (!graph.subgraphs) {
      graph.subgraphs = [];
    }

    graph.subgraphs.push(subgraph);
  }

  return subgraph;
}
/**
 * parse an attribute statement like "node [shape=circle fontSize=16]".
 * Available keywords are 'node', 'edge', 'graph'.
 * The previous list with default attributes will be replaced
 * @param {Object} graph
 * @returns {String | null} keyword Returns the name of the parsed attribute
 *                                  (node, edge, graph), or null if nothing
 *                                  is parsed.
 */


function parseAttributeStatement(graph) {
  // attribute statements
  if (token === 'node') {
    getToken(); // node attributes

    graph.node = parseAttributeList();
    return 'node';
  } else if (token === 'edge') {
    getToken(); // edge attributes

    graph.edge = parseAttributeList();
    return 'edge';
  } else if (token === 'graph') {
    getToken(); // graph attributes

    graph.graph = parseAttributeList();
    return 'graph';
  }

  return null;
}
/**
 * parse a node statement
 * @param {Object} graph
 * @param {string | number} id
 */


function parseNodeStatement(graph, id) {
  // node statement
  var node = {
    id: id
  };
  var attr = parseAttributeList();

  if (attr) {
    node.attr = attr;
  }

  addNode(graph, node); // edge statements

  parseEdge(graph, id);
}
/**
 * Parse an edge or a series of edges
 * @param {Object} graph
 * @param {string | number} from        Id of the from node
 */


function parseEdge(graph, from) {
  while (token === '->' || token === '--') {
    var to;
    var type = token;
    getToken();
    var subgraph = parseSubgraph(graph);

    if (subgraph) {
      to = subgraph;
    } else {
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError('Identifier or subgraph expected');
      }

      to = token;
      addNode(graph, {
        id: to
      });
      getToken();
    } // parse edge attributes


    var attr = parseAttributeList(); // create edge

    var edge = createEdge(graph, from, to, type, attr);
    addEdge(graph, edge);
    from = to;
  }
}
/**
 * Parse a set with attributes,
 * for example [label="1.000", shape=solid]
 * @return {Object | null} attr
 */


function parseAttributeList() {
  var i;
  var attr = null; // edge styles of dot and vis

  var edgeStyles = {
    'dashed': true,
    'solid': false,
    'dotted': [1, 5]
  };
  /**
   * Define arrow types.
   * vis currently supports types defined in 'arrowTypes'.
   * Details of arrow shapes are described in
   * http://www.graphviz.org/content/arrow-shapes
   */

  var arrowTypes = {
    dot: 'circle',
    box: 'box',
    crow: 'crow',
    curve: 'curve',
    icurve: 'inv_curve',
    normal: 'triangle',
    inv: 'inv_triangle',
    diamond: 'diamond',
    tee: 'bar',
    vee: 'vee'
  };
  /**
   * 'attr_list' contains attributes for checking if some of them are affected
   * later. For instance, both of 'arrowhead' and 'dir' (edge style defined
   * in DOT) make changes to 'arrows' attribute in vis.
   */

  var attr_list = new Array();
  var attr_names = new Array(); // used for checking the case.
  // parse attributes

  while (token === '[') {
    getToken();
    attr = {};

    while (token !== '' && token != ']') {
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError('Attribute name expected');
      }

      var name = token;
      getToken();

      if (token != '=') {
        throw newSyntaxError('Equal sign = expected');
      }

      getToken();

      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError('Attribute value expected');
      }

      var value = token; // convert from dot style to vis

      if (name === 'style') {
        value = edgeStyles[value];
      }

      var arrowType;

      if (name === 'arrowhead') {
        arrowType = arrowTypes[value];
        name = 'arrows';
        value = {
          'to': {
            'enabled': true,
            'type': arrowType
          }
        };
      }

      if (name === 'arrowtail') {
        arrowType = arrowTypes[value];
        name = 'arrows';
        value = {
          'from': {
            'enabled': true,
            'type': arrowType
          }
        };
      }

      attr_list.push({
        'attr': attr,
        'name': name,
        'value': value
      });
      attr_names.push(name);
      getToken();

      if (token == ',') {
        getToken();
      }
    }

    if (token != ']') {
      throw newSyntaxError('Bracket ] expected');
    }

    getToken();
  }
  /**
   * As explained in [1], graphviz has limitations for combination of
   * arrow[head|tail] and dir. If attribute list includes 'dir',
   * following cases just be supported.
   *   1. both or none + arrowhead, arrowtail
   *   2. forward + arrowhead (arrowtail is not affedted)
   *   3. back + arrowtail (arrowhead is not affected)
   * [1] https://www.graphviz.org/doc/info/attrs.html#h:undir_note
   */


  if (includes$4(attr_names).call(attr_names, 'dir')) {
    var idx = {}; // get index of 'arrows' and 'dir'

    idx.arrows = {};

    for (i = 0; i < attr_list.length; i++) {
      if (attr_list[i].name === 'arrows') {
        if (attr_list[i].value.to != null) {
          idx.arrows.to = i;
        } else if (attr_list[i].value.from != null) {
          idx.arrows.from = i;
        } else {
          throw newSyntaxError('Invalid value of arrows');
        }
      } else if (attr_list[i].name === 'dir') {
        idx.dir = i;
      }
    } // first, add default arrow shape if it is not assigned to avoid error


    var dir_type = attr_list[idx.dir].value;

    if (!includes$4(attr_names).call(attr_names, 'arrows')) {
      if (dir_type === 'both') {
        attr_list.push({
          'attr': attr_list[idx.dir].attr,
          'name': 'arrows',
          'value': {
            to: {
              enabled: true
            }
          }
        });
        idx.arrows.to = attr_list.length - 1;
        attr_list.push({
          'attr': attr_list[idx.dir].attr,
          'name': 'arrows',
          'value': {
            from: {
              enabled: true
            }
          }
        });
        idx.arrows.from = attr_list.length - 1;
      } else if (dir_type === 'forward') {
        attr_list.push({
          'attr': attr_list[idx.dir].attr,
          'name': 'arrows',
          'value': {
            to: {
              enabled: true
            }
          }
        });
        idx.arrows.to = attr_list.length - 1;
      } else if (dir_type === 'back') {
        attr_list.push({
          'attr': attr_list[idx.dir].attr,
          'name': 'arrows',
          'value': {
            from: {
              enabled: true
            }
          }
        });
        idx.arrows.from = attr_list.length - 1;
      } else if (dir_type === 'none') {
        attr_list.push({
          'attr': attr_list[idx.dir].attr,
          'name': 'arrows',
          'value': ''
        });
        idx.arrows.to = attr_list.length - 1;
      } else {
        throw newSyntaxError('Invalid dir type "' + dir_type + '"');
      }
    }

    var from_type;
    var to_type; // update 'arrows' attribute from 'dir'.

    if (dir_type === 'both') {
      // both of shapes of 'from' and 'to' are given
      if (idx.arrows.to && idx.arrows.from) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.to].attr,
          'name': attr_list[idx.arrows.to].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        };

        splice$2(attr_list).call(attr_list, idx.arrows.from, 1); // shape of 'to' is assigned and use default to 'from'

      } else if (idx.arrows.to) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = 'arrow';
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.to].attr,
          'name': attr_list[idx.arrows.to].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        }; // only shape of 'from' is assigned and use default for 'to'
      } else if (idx.arrows.from) {
        to_type = 'arrow';
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.from] = {
          'attr': attr_list[idx.arrows.from].attr,
          'name': attr_list[idx.arrows.from].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        };
      }
    } else if (dir_type === 'back') {
      // given both of shapes, but use only 'from'
      if (idx.arrows.to && idx.arrows.from) {
        to_type = '';
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.from] = {
          'attr': attr_list[idx.arrows.from].attr,
          'name': attr_list[idx.arrows.from].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        }; // given shape of 'to', but does not use it
      } else if (idx.arrows.to) {
        to_type = '';
        from_type = 'arrow';
        idx.arrows.from = idx.arrows.to;
        attr_list[idx.arrows.from] = {
          'attr': attr_list[idx.arrows.from].attr,
          'name': attr_list[idx.arrows.from].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        }; // assign given 'from' shape
      } else if (idx.arrows.from) {
        to_type = '';
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.from].attr,
          'name': attr_list[idx.arrows.from].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        };
      }

      attr_list[idx.arrows.from] = {
        'attr': attr_list[idx.arrows.from].attr,
        'name': attr_list[idx.arrows.from].name,
        'value': {
          from: {
            enabled: true,
            type: attr_list[idx.arrows.from].value.from.type
          }
        }
      };
    } else if (dir_type === 'none') {
      var idx_arrow;

      if (idx.arrows.to) {
        idx_arrow = idx.arrows.to;
      } else {
        idx_arrow = idx.arrows.from;
      }

      attr_list[idx_arrow] = {
        'attr': attr_list[idx_arrow].attr,
        'name': attr_list[idx_arrow].name,
        'value': ''
      };
    } else if (dir_type === 'forward') {
      // given both of shapes, but use only 'to'
      if (idx.arrows.to && idx.arrows.from) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = '';
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.to].attr,
          'name': attr_list[idx.arrows.to].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        }; // assign given 'to' shape
      } else if (idx.arrows.to) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = '';
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.to].attr,
          'name': attr_list[idx.arrows.to].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        }; // given shape of 'from', but does not use it
      } else if (idx.arrows.from) {
        to_type = 'arrow';
        from_type = '';
        idx.arrows.to = idx.arrows.from;
        attr_list[idx.arrows.to] = {
          'attr': attr_list[idx.arrows.to].attr,
          'name': attr_list[idx.arrows.to].name,
          'value': {
            to: {
              enabled: true,
              type: to_type
            },
            from: {
              enabled: true,
              type: from_type
            }
          }
        };
      }

      attr_list[idx.arrows.to] = {
        'attr': attr_list[idx.arrows.to].attr,
        'name': attr_list[idx.arrows.to].name,
        'value': {
          to: {
            enabled: true,
            type: attr_list[idx.arrows.to].value.to.type
          }
        }
      };
    } else {
      throw newSyntaxError('Invalid dir type "' + dir_type + '"');
    } // remove 'dir' attribute no need anymore


    splice$2(attr_list).call(attr_list, idx.dir, 1);
  } // parse 'penwidth'


  var nof_attr_list;

  if (includes$4(attr_names).call(attr_names, 'penwidth')) {
    var tmp_attr_list = [];
    nof_attr_list = attr_list.length;

    for (i = 0; i < nof_attr_list; i++) {
      // exclude 'width' from attr_list if 'penwidth' exists
      if (attr_list[i].name !== 'width') {
        if (attr_list[i].name === 'penwidth') {
          attr_list[i].name = 'width';
        }

        tmp_attr_list.push(attr_list[i]);
      }
    }

    attr_list = tmp_attr_list;
  }

  nof_attr_list = attr_list.length;

  for (i = 0; i < nof_attr_list; i++) {
    setValue(attr_list[i].attr, attr_list[i].name, attr_list[i].value);
  }

  return attr;
}
/**
 * Create a syntax error with extra information on current token and index.
 * @param {string} message
 * @returns {SyntaxError} err
 */


function newSyntaxError(message) {
  return new SyntaxError(message + ', got "' + chop(token, 30) + '" (char ' + index + ')');
}
/**
 * Chop off text after a maximum length
 * @param {string} text
 * @param {number} maxLength
 * @returns {String}
 */


function chop(text, maxLength) {
  return text.length <= maxLength ? text : text.substr(0, 27) + '...';
}
/**
 * Execute a function fn for each pair of elements in two arrays
 * @param {Array | *} array1
 * @param {Array | *} array2
 * @param {function} fn
 */


function forEach2(array1, array2, fn) {
  if (isArray$5(array1)) {
    forEach$2(array1).call(array1, function (elem1) {
      if (isArray$5(array2)) {
        forEach$2(array2).call(array2, function (elem2) {
          fn(elem1, elem2);
        });
      } else {
        fn(elem1, array2);
      }
    });
  } else {
    if (isArray$5(array2)) {
      forEach$2(array2).call(array2, function (elem2) {
        fn(array1, elem2);
      });
    } else {
      fn(array1, array2);
    }
  }
}
/**
 * Set a nested property on an object
 * When nested objects are missing, they will be created.
 * For example setProp({}, 'font.color', 'red') will return {font: {color: 'red'}}
 * @param {Object} object
 * @param {string} path   A dot separated string like 'font.color'
 * @param {*} value       Value for the property
 * @return {Object} Returns the original object, allows for chaining.
 */


function setProp(object, path, value) {
  var names = path.split('.');
  var prop = names.pop(); // traverse over the nested objects

  var obj = object;

  for (var i = 0; i < names.length; i++) {
    var name = names[i];

    if (!(name in obj)) {
      obj[name] = {};
    }

    obj = obj[name];
  } // set the property value


  obj[prop] = value;
  return object;
}
/**
 * Convert an object with DOT attributes to their vis.js equivalents.
 * @param {Object} attr     Object with DOT attributes
 * @param {Object} mapping
 * @return {Object}         Returns an object with vis.js attributes
 */


function convertAttr(attr, mapping) {
  var converted = {};

  for (var prop in attr) {
    if (attr.hasOwnProperty(prop)) {
      var visProp = mapping[prop];

      if (isArray$5(visProp)) {
        forEach$2(visProp).call(visProp, function (visPropI) {
          setProp(converted, visPropI, attr[prop]);
        });
      } else if (typeof visProp === 'string') {
        setProp(converted, visProp, attr[prop]);
      } else {
        setProp(converted, prop, attr[prop]);
      }
    }
  }

  return converted;
}
/**
 * Convert a string containing a graph in DOT language into a map containing
 * with nodes and edges in the format of graph.
 * @param {string} data         Text containing a graph in DOT-notation
 * @return {Object} graphData
 */


function DOTToGraph(data) {
  // parse the DOT file
  var dotData = parseDOT(data);
  var graphData = {
    nodes: [],
    edges: [],
    options: {}
  }; // copy the nodes

  if (dotData.nodes) {
    var _context2;

    forEach$2(_context2 = dotData.nodes).call(_context2, function (dotNode) {
      var graphNode = {
        id: dotNode.id,
        label: String(dotNode.label || dotNode.id)
      };
      merge(graphNode, convertAttr(dotNode.attr, NODE_ATTR_MAPPING));

      if (graphNode.image) {
        graphNode.shape = 'image';
      }

      graphData.nodes.push(graphNode);
    });
  } // copy the edges


  if (dotData.edges) {
    var _context3;

    /**
     * Convert an edge in DOT format to an edge with VisGraph format
     * @param {Object} dotEdge
     * @returns {Object} graphEdge
     */
    var convertEdge = function convertEdge(dotEdge) {
      var graphEdge = {
        from: dotEdge.from,
        to: dotEdge.to
      };
      merge(graphEdge, convertAttr(dotEdge.attr, EDGE_ATTR_MAPPING)); // Add arrows attribute to default styled arrow.
      // The reason why default style is not added in parseAttributeList() is
      // because only default is cleared before here.

      if (graphEdge.arrows == null && dotEdge.type === '->') {
        graphEdge.arrows = 'to';
      }

      return graphEdge;
    };

    forEach$2(_context3 = dotData.edges).call(_context3, function (dotEdge) {
      var from, to;

      if (dotEdge.from instanceof Object) {
        from = dotEdge.from.nodes;
      } else {
        from = {
          id: dotEdge.from
        };
      }

      if (dotEdge.to instanceof Object) {
        to = dotEdge.to.nodes;
      } else {
        to = {
          id: dotEdge.to
        };
      }

      if (dotEdge.from instanceof Object && dotEdge.from.edges) {
        var _context4;

        forEach$2(_context4 = dotEdge.from.edges).call(_context4, function (subEdge) {
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });
      }

      forEach2(from, to, function (from, to) {
        var subEdge = createEdge(graphData, from.id, to.id, dotEdge.type, dotEdge.attr);
        var graphEdge = convertEdge(subEdge);
        graphData.edges.push(graphEdge);
      });

      if (dotEdge.to instanceof Object && dotEdge.to.edges) {
        var _context5;

        forEach$2(_context5 = dotEdge.to.edges).call(_context5, function (subEdge) {
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });
      }
    });
  } // copy the options


  if (dotData.attr) {
    graphData.options = dotData.attr;
  }

  return graphData;
}

var dotparser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	parseDOT: parseDOT,
	DOTToGraph: DOTToGraph
});

/**
 * Convert Gephi to Vis.
 *
 * @param gephiJSON - The parsed JSON data in Gephi format.
 * @param optionsObj - Additional options.
 *
 * @returns The converted data ready to be used in Vis.
 */
function parseGephi(gephiJSON, optionsObj) {
  var _context;

  var options = {
    edges: {
      inheritColor: false
    },
    nodes: {
      fixed: false,
      parseColor: false
    }
  };

  if (optionsObj != null) {
    if (optionsObj.fixed != null) {
      options.nodes.fixed = optionsObj.fixed;
    }

    if (optionsObj.parseColor != null) {
      options.nodes.parseColor = optionsObj.parseColor;
    }

    if (optionsObj.inheritColor != null) {
      options.edges.inheritColor = optionsObj.inheritColor;
    }
  }

  var gEdges = gephiJSON.edges;

  var vEdges = map$2(gEdges).call(gEdges, function (gEdge) {
    var vEdge = {
      from: gEdge.source,
      id: gEdge.id,
      to: gEdge.target
    };

    if (gEdge.attributes != null) {
      vEdge.attributes = gEdge.attributes;
    }

    if (gEdge.label != null) {
      vEdge.label = gEdge.label;
    }

    if (gEdge.attributes != null && gEdge.attributes.title != null) {
      vEdge.title = gEdge.attributes.title;
    }

    if (gEdge.type === "Directed") {
      vEdge.arrows = "to";
    } // edge['value'] = gEdge.attributes != null ? gEdge.attributes.Weight : undefined;
    // edge['width'] = edge['value'] != null ? undefined : edgegEdge.size;


    if (gEdge.color && options.edges.inheritColor === false) {
      vEdge.color = gEdge.color;
    }

    return vEdge;
  });

  var vNodes = map$2(_context = gephiJSON.nodes).call(_context, function (gNode) {
    var vNode = {
      id: gNode.id,
      fixed: options.nodes.fixed && gNode.x != null && gNode.y != null
    };

    if (gNode.attributes != null) {
      vNode.attributes = gNode.attributes;
    }

    if (gNode.label != null) {
      vNode.label = gNode.label;
    }

    if (gNode.size != null) {
      vNode.size = gNode.size;
    }

    if (gNode.attributes != null && gNode.attributes.title != null) {
      vNode.title = gNode.attributes.title;
    }

    if (gNode.title != null) {
      vNode.title = gNode.title;
    }

    if (gNode.x != null) {
      vNode.x = gNode.x;
    }

    if (gNode.y != null) {
      vNode.y = gNode.y;
    }

    if (gNode.color != null) {
      if (options.nodes.parseColor === true) {
        vNode.color = gNode.color;
      } else {
        vNode.color = {
          background: gNode.color,
          border: gNode.color,
          highlight: {
            background: gNode.color,
            border: gNode.color
          },
          hover: {
            background: gNode.color,
            border: gNode.color
          }
        };
      }
    }

    return vNode;
  });

  return {
    nodes: vNodes,
    edges: vEdges
  };
}

var gephiParser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	parseGephi: parseGephi
});

var keycharm = createCommonjsModule(function (module, exports) {
  /**
   * Created by Alex on 11/6/2014.
   */
  // https://github.com/umdjs/umd/blob/master/returnExports.js#L40-L60
  // if the module has no dependencies, the above pattern can be simplified to

  (function (root, factory) {
    {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    function keycharm(options) {
      var preventDefault = options && options.preventDefault || false;
      var container = options && options.container || window;
      var _exportFunctions = {};
      var _bound = {
        keydown: {},
        keyup: {}
      };
      var _keys = {};
      var i; // a - z

      for (i = 97; i <= 122; i++) {
        _keys[String.fromCharCode(i)] = {
          code: 65 + (i - 97),
          shift: false
        };
      } // A - Z


      for (i = 65; i <= 90; i++) {
        _keys[String.fromCharCode(i)] = {
          code: i,
          shift: true
        };
      } // 0 - 9


      for (i = 0; i <= 9; i++) {
        _keys['' + i] = {
          code: 48 + i,
          shift: false
        };
      } // F1 - F12


      for (i = 1; i <= 12; i++) {
        _keys['F' + i] = {
          code: 111 + i,
          shift: false
        };
      } // num0 - num9


      for (i = 0; i <= 9; i++) {
        _keys['num' + i] = {
          code: 96 + i,
          shift: false
        };
      } // numpad misc


      _keys['num*'] = {
        code: 106,
        shift: false
      };
      _keys['num+'] = {
        code: 107,
        shift: false
      };
      _keys['num-'] = {
        code: 109,
        shift: false
      };
      _keys['num/'] = {
        code: 111,
        shift: false
      };
      _keys['num.'] = {
        code: 110,
        shift: false
      }; // arrows

      _keys['left'] = {
        code: 37,
        shift: false
      };
      _keys['up'] = {
        code: 38,
        shift: false
      };
      _keys['right'] = {
        code: 39,
        shift: false
      };
      _keys['down'] = {
        code: 40,
        shift: false
      }; // extra keys

      _keys['space'] = {
        code: 32,
        shift: false
      };
      _keys['enter'] = {
        code: 13,
        shift: false
      };
      _keys['shift'] = {
        code: 16,
        shift: undefined
      };
      _keys['esc'] = {
        code: 27,
        shift: false
      };
      _keys['backspace'] = {
        code: 8,
        shift: false
      };
      _keys['tab'] = {
        code: 9,
        shift: false
      };
      _keys['ctrl'] = {
        code: 17,
        shift: false
      };
      _keys['alt'] = {
        code: 18,
        shift: false
      };
      _keys['delete'] = {
        code: 46,
        shift: false
      };
      _keys['pageup'] = {
        code: 33,
        shift: false
      };
      _keys['pagedown'] = {
        code: 34,
        shift: false
      }; // symbols

      _keys['='] = {
        code: 187,
        shift: false
      };
      _keys['-'] = {
        code: 189,
        shift: false
      };
      _keys[']'] = {
        code: 221,
        shift: false
      };
      _keys['['] = {
        code: 219,
        shift: false
      };

      var down = function (event) {
        handleEvent(event, 'keydown');
      };

      var up = function (event) {
        handleEvent(event, 'keyup');
      }; // handle the actualy bound key with the event


      var handleEvent = function (event, type) {
        if (_bound[type][event.keyCode] !== undefined) {
          var bound = _bound[type][event.keyCode];

          for (var i = 0; i < bound.length; i++) {
            if (bound[i].shift === undefined) {
              bound[i].fn(event);
            } else if (bound[i].shift == true && event.shiftKey == true) {
              bound[i].fn(event);
            } else if (bound[i].shift == false && event.shiftKey == false) {
              bound[i].fn(event);
            }
          }

          if (preventDefault == true) {
            event.preventDefault();
          }
        }
      }; // bind a key to a callback


      _exportFunctions.bind = function (key, callback, type) {
        if (type === undefined) {
          type = 'keydown';
        }

        if (_keys[key] === undefined) {
          throw new Error("unsupported key: " + key);
        }

        if (_bound[type][_keys[key].code] === undefined) {
          _bound[type][_keys[key].code] = [];
        }

        _bound[type][_keys[key].code].push({
          fn: callback,
          shift: _keys[key].shift
        });
      }; // bind all keys to a call back (demo purposes)


      _exportFunctions.bindAll = function (callback, type) {
        if (type === undefined) {
          type = 'keydown';
        }

        for (var key in _keys) {
          if (_keys.hasOwnProperty(key)) {
            _exportFunctions.bind(key, callback, type);
          }
        }
      }; // get the key label from an event


      _exportFunctions.getKey = function (event) {
        for (var key in _keys) {
          if (_keys.hasOwnProperty(key)) {
            if (event.shiftKey == true && _keys[key].shift == true && event.keyCode == _keys[key].code) {
              return key;
            } else if (event.shiftKey == false && _keys[key].shift == false && event.keyCode == _keys[key].code) {
              return key;
            } else if (event.keyCode == _keys[key].code && key == 'shift') {
              return key;
            }
          }
        }

        return "unknown key, currently not supported";
      }; // unbind either a specific callback from a key or all of them (by leaving callback undefined)


      _exportFunctions.unbind = function (key, callback, type) {
        if (type === undefined) {
          type = 'keydown';
        }

        if (_keys[key] === undefined) {
          throw new Error("unsupported key: " + key);
        }

        if (callback !== undefined) {
          var newBindings = [];
          var bound = _bound[type][_keys[key].code];

          if (bound !== undefined) {
            for (var i = 0; i < bound.length; i++) {
              if (!(bound[i].fn == callback && bound[i].shift == _keys[key].shift)) {
                newBindings.push(_bound[type][_keys[key].code][i]);
              }
            }
          }

          _bound[type][_keys[key].code] = newBindings;
        } else {
          _bound[type][_keys[key].code] = [];
        }
      }; // reset all bound variables.


      _exportFunctions.reset = function () {
        _bound = {
          keydown: {},
          keyup: {}
        };
      }; // unbind all listeners and reset all variables.


      _exportFunctions.destroy = function () {
        _bound = {
          keydown: {},
          keyup: {}
        };
        container.removeEventListener('keydown', down, true);
        container.removeEventListener('keyup', up, true);
      }; // create listeners.


      container.addEventListener('keydown', down, true);
      container.addEventListener('keyup', up, true); // return the public functions.

      return _exportFunctions;
    }

    return keycharm;
  });
});

/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */


var assign$3;

if (typeof Object.assign !== 'function') {
  assign$3 = function assign(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }

    return output;
  };
} else {
  assign$3 = Object.assign;
}

var assign$1$1 = assign$3;
var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = typeof document === "undefined" ? {
  style: {}
} : document.createElement('div');
var TYPE_FUNCTION = 'function';
var round = Math.round,
    abs = Math.abs;
var now$3 = Date.now;
/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var prefix;
  var prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);
  var i = 0;

  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = prefix ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }

    i++;
  }

  return undefined;
}
/* eslint-disable no-new-func, no-nested-ternary */


var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {};
} else {
  win = window;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION) {
    return false;
  }

  var touchMap = {};
  var cssSupports = win.CSS && win.CSS.supports;
  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
  });
  return touchMap;
}

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();
var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
var SUPPORT_TOUCH = ('ontouchstart' in win);
var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];
/**
 * @private
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */

function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}
/**
 * @private
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */


function boolOrFn(val, args) {
  if (typeof val === TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}
/**
 * @private
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */


function inStr(str, find) {
  return str.indexOf(find) > -1;
}
/**
 * @private
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */


function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  } // pan-x OR pan-y


  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  } // manipulation


  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}
/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */


var TouchAction = /*#__PURE__*/function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = value.toLowerCase().trim();
  };
  /**
   * @private
   * just re-set the touchAction value
   */


  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  };
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */


  _proto.compute = function compute() {
    var actions = [];
    each(this.manager.recognizers, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  };
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */


  _proto.preventDefaults = function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      // do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  };
  /**
   * @private
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */


  _proto.preventSrc = function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  };

  return TouchAction;
}();
/**
 * @private
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */


function hasParent(node, parent) {
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
/**
 * @private
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */


function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;
  var i = 0;

  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}
/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */


function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;

  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now$3(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}
/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */


function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}
/**
 * @private
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */


function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}
/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */


function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

function computeDeltaXY(session, input) {
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}
/**
 * @private
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */


function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}
/**
 * @private
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */


function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}
/**
 * @private
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */


function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}
/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */


function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}
/**
* @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */


function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  } // to compute scale and rotation we need to store the multiple touches


  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now$3();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;
  var srcEvent = input.srcEvent;
  var srcEventTarget;

  if (srcEvent.composedPath) {
    srcEventTarget = srcEvent.composedPath()[0];
  } else if (srcEvent.path) {
    srcEventTarget = srcEvent.path[0];
  } else {
    srcEventTarget = srcEvent.target;
  }

  if (hasParent(srcEventTarget, target)) {
    target = srcEventTarget;
  }

  input.target = target;
}
/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */


function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  } // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'


  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}
/**
 * @private
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */


function splitStr(str) {
  return str.trim().split(/\s+/g);
}
/**
 * @private
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function addEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.addEventListener(type, handler, false);
  });
}
/**
 * @private
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */


function removeEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.removeEventListener(type, handler, false);
  });
}
/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */


function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || window;
}
/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */


var Input = /*#__PURE__*/function () {
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {};
  /**
   * @private
   * bind the events
   */


  _proto.init = function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };
  /**
   * @private
   * unbind the events
   */


  _proto.destroy = function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };

  return Input;
}();
/**
 * @private
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */


function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;

    while (i < src.length) {
      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
        // do not use === here, test fails
        return i;
      }

      i++;
    }

    return -1;
  }
}

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (win.MSPointerEvent && !win.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */


var PointerEventInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    var proto = PointerEventInput.prototype;
    proto.evEl = POINTER_ELEMENT_EVENTS;
    proto.evWin = POINTER_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.store = _this.manager.session.pointerEvents = [];
    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) {
      return;
    } // update the event in the store


    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  };

  return PointerEventInput;
}(Input);
/**
 * @private
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */


function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}
/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */


function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];

    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }

    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function (a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(TouchInput, _Input);

  function TouchInput() {
    var _this;

    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);

    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return TouchInput;
}(Input);

function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i;
  var targetTouches;
  var changedTouches = toArray(ev.changedTouches);
  var changedTargetTouches = [];
  var target = this.target; // get target touches from touches

  targetTouches = allTouches.filter(function (touch) {
    return hasParent(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    i = 0;

    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  } // filter changed touches to only contain touches that exist in the collected target ids


  i = 0;

  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    } // cleanup removed touches


    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }

    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(MouseInput, _Input);

  function MouseInput() {
    var _this;

    var proto = MouseInput.prototype;
    proto.evEl = MOUSE_ELEMENT_EVENTS;
    proto.evWin = MOUSE_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.pressed = false; // mousedown state

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return MouseInput;
}(Input);
/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */


var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function setLastTouch(eventData) {
  var _eventData$changedPoi = eventData.changedPointers,
      touch = _eventData$changedPoi[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    var lts = this.lastTouches;
    this.lastTouches.push(lastTouch);

    var removeLastTouch = function removeLastTouch() {
      var i = lts.indexOf(lastTouch);

      if (i > -1) {
        lts.splice(i, 1);
      }
    };

    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function isSyntheticEvent(eventData) {
  var x = eventData.srcEvent.clientX;
  var y = eventData.srcEvent.clientY;

  for (var i = 0; i < this.lastTouches.length; i++) {
    var t = this.lastTouches[i];
    var dx = Math.abs(x - t.x);
    var dy = Math.abs(y - t.y);

    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
      return true;
    }
  }

  return false;
}

var TouchMouseInput = /*#__PURE__*/function () {
  var TouchMouseInput = /*#__PURE__*/function (_Input) {
    _inheritsLoose(TouchMouseInput, _Input);

    function TouchMouseInput(_manager, callback) {
      var _this;

      _this = _Input.call(this, _manager, callback) || this;

      _this.handler = function (manager, inputEvent, inputData) {
        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
          return;
        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


        if (isTouch) {
          recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
          return;
        }

        _this.callback(manager, inputEvent, inputData);
      };

      _this.touch = new TouchInput(_this.manager, _this.handler);
      _this.mouse = new MouseInput(_this.manager, _this.handler);
      _this.primaryTouch = null;
      _this.lastTouches = [];
      return _this;
    }
    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */


    var _proto = TouchMouseInput.prototype;
    /**
     * @private
     * remove the event listeners
     */

    _proto.destroy = function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    };

    return TouchMouseInput;
  }(Input);

  return TouchMouseInput;
}();
/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */


function createInputInstance(manager) {
  var Type; // let inputClass = manager.options.inputClass;

  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}
/**
 * @private
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */


function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;
/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */

var _uniqueId = 1;

function uniqueId() {
  return _uniqueId++;
}
/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */


function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;

  if (manager) {
    return manager.get(otherRecognizer);
  }

  return otherRecognizer;
}
/**
 * @private
 * get a usable string, used as event postfix
 * @param {constant} state
 * @returns {String} state
 */


function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}
/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */


var Recognizer = /*#__PURE__*/function () {
  function Recognizer(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = _extends({
      enable: true
    }, options);
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

    this.manager && this.manager.touchAction.update();
    return this;
  };
  /**
   * @private
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  };
  /**
   * @private
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  };
  /**
   * @private
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.requireFailure = function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  };
  /**
   * @private
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);

    if (index > -1) {
      this.requireFail.splice(index, 1);
    }

    return this;
  };
  /**
   * @private
   * has require failures boolean
   * @returns {boolean}
   */


  _proto.hasRequireFailures = function hasRequireFailures() {
    return this.requireFail.length > 0;
  };
  /**
   * @private
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */


  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  };
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */


  _proto.emit = function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  };
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */


  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) {
      return this.emit(input);
    } // it's failing anyway


    this.state = STATE_FAILED;
  };
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */


  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  };
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = assign$1$1({}, inputData); // is is enabled and allow recognizing?

    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  };
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */


  _proto.process = function process(inputData) {};
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */


  _proto.getTouchAction = function getTouchAction() {};
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */


  _proto.reset = function reset() {};

  return Recognizer;
}();
/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */


var TapRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(TapRecognizer, _Recognizer);

  function TapRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, options)) || this; // previous time and center,
    // used for tap counting

    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this3 = this;

    this._timer = setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return TapRecognizer;
}(Recognizer);
/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */


var AttrRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(AttrRecognizer, _Recognizer);

  function AttrRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _Recognizer.call(this, _extends({
      pointers: 1
    }, options)) || this;
  }
  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */


  var _proto = AttrRecognizer.prototype;

  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  };
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */


  _proto.process = function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return AttrRecognizer;
}(Recognizer);
/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */


function directionStr(direction) {
  if (direction === DIRECTION_DOWN) {
    return 'down';
  } else if (direction === DIRECTION_UP) {
    return 'up';
  } else if (direction === DIRECTION_LEFT) {
    return 'left';
  } else if (direction === DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}
/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */


var PanRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(PanRecognizer, _AttrRecognizer);

  function PanRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _AttrRecognizer.call(this, _extends({
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    }, options)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];

    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }

    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }

    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);

    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PanRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */


var SwipeRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

  function SwipeRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    }, options)) || this;
  }

  var _proto = SwipeRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  };

  _proto.attrTest = function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  };

  _proto.emit = function emit(input) {
    var direction = directionStr(input.offsetDirection);

    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  };

  return SwipeRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */


var PinchRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'pinch',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PinchRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */


var RotateRecognizer = /*#__PURE__*/function (_AttrRecognizer) {
  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

  function RotateRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'rotate',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = RotateRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  };

  return RotateRecognizer;
}(AttrRecognizer);
/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */


var PressRecognizer = /*#__PURE__*/function (_Recognizer) {
  _inheritsLoose(PressRecognizer, _Recognizer);

  function PressRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, options)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + "up", input);
    } else {
      this._input.timeStamp = now$3();
      this.manager.emit(this.options.event, this._input);
    }
  };

  return PressRecognizer;
}(Recognizer);

var defaults = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * @private
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * @private
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * @private
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * @private
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: "none",

    /**
     * @private
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: "none",

    /**
     * @private
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: "none",

    /**
     * @private
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: "none",

    /**
     * @private
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: "none",

    /**
     * @private
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: "rgba(0,0,0,0)"
  }
};
/**
 * @private
 * Default recognizer setup when calling `Hammer()`
 * When creating a new Manager these will be skipped.
 * This is separated with other defaults because of tree-shaking.
 * @type {Array}
 */

var preset = [[RotateRecognizer, {
  enable: false
}], [PinchRecognizer, {
  enable: false
}, ['rotate']], [SwipeRecognizer, {
  direction: DIRECTION_HORIZONTAL
}], [PanRecognizer, {
  direction: DIRECTION_HORIZONTAL
}, ['swipe']], [TapRecognizer], [TapRecognizer, {
  event: 'doubletap',
  taps: 2
}, ['tap']], [PressRecognizer]];
var STOP = 1;
var FORCED_STOP = 2;
/**
 * @private
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var element = manager.element;

  if (!element.style) {
    return;
  }

  var prop;
  each(manager.options.cssProps, function (value, name) {
    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || "";
    }
  });

  if (!add) {
    manager.oldCssProps = {};
  }
}
/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent("Event");
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}
/**
* @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Manager = /*#__PURE__*/function () {
  function Manager(element, options) {
    var _this = this;

    this.options = assign$1$1({}, defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = _this.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // Options that need a little more setup

    if (options.touchAction) {
      this.touchAction.update();
    }

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  };
  /**
   * @private
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */


  _proto.stop = function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  };
  /**
   * @private
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    var session = this.session;

    if (session.stopped) {
      return;
    } // run the touch-action polyfill


    this.touchAction.preventDefaults(inputData);
    var recognizer;
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      session.curRecognizer = null;
      curRecognizer = null;
    }

    var i = 0;

    while (i < recognizers.length) {
      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.

      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        session.curRecognizer = recognizer;
        curRecognizer = recognizer;
      }

      i++;
    }
  };
  /**
   * @private
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */


  _proto.get = function get(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;

    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizer) {
        return recognizers[i];
      }
    }

    return null;
  };
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */


  _proto.add = function add(recognizer) {
    if (invokeArrayArg(recognizer, "add", this)) {
      return this;
    } // remove existing


    var existing = this.get(recognizer.options.event);

    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  };
  /**
   * @private
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */


  _proto.remove = function remove(recognizer) {
    if (invokeArrayArg(recognizer, "remove", this)) {
      return this;
    }

    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var recognizers = this.recognizers;
      var index = inArray(recognizers, targetRecognizer);

      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }

    return this;
  };
  /**
   * @private
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */


  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  };
  /**
   * @private unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */


  _proto.off = function off(events, handler) {
    if (events === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  };
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */


  _proto.emit = function emit(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    } // no handlers, so skip it all


    var handlers = this.handlers[event] && this.handlers[event].slice();

    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    var i = 0;

    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  };
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */


  _proto.destroy = function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  return Manager;
}();

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */

var SingleTouchInput = /*#__PURE__*/function (_Input) {
  _inheritsLoose(SingleTouchInput, _Input);

  function SingleTouchInput() {
    var _this;

    var proto = SingleTouchInput.prototype;
    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.started = false;
    return _this;
  }

  var _proto = SingleTouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return SingleTouchInput;
}(Input);

function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}
/**
 * @private
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */


function deprecate(method, name, message) {
  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
  return function () {
    var e = new Error('get-stack-trace');
    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
    var log = window.console && (window.console.warn || window.console.log);

    if (log) {
      log.call(window.console, deprecationMessage, stack);
    }

    return method.apply(this, arguments);
  };
}
/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */


var extend = deprecate(function (dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;

  while (i < keys.length) {
    if (!merge || merge && dest[keys[i]] === undefined) {
      dest[keys[i]] = src[keys[i]];
    }

    i++;
  }

  return dest;
}, 'extend', 'Use `assign`.');
/**
 * @private
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */

var merge$1 = deprecate(function (dest, src) {
  return extend(dest, src, true);
}, 'merge', 'Use `assign`.');
/**
 * @private
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */

function inherit(child, base, properties) {
  var baseP = base.prototype;
  var childP;
  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    assign$1$1(childP, properties);
  }
}
/**
 * @private
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */


function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}
/**
 * @private
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Hammer = /*#__PURE__*/function () {
  var Hammer =
  /**
    * @private
    * @const {string}
    */
  function Hammer(element, options) {
    if (options === void 0) {
      options = {};
    }

    return new Manager(element, _extends({
      recognizers: preset.concat()
    }, options));
  };

  Hammer.VERSION = "2.0.17-rc";
  Hammer.DIRECTION_ALL = DIRECTION_ALL;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
  Hammer.DIRECTION_UP = DIRECTION_UP;
  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  Hammer.DIRECTION_NONE = DIRECTION_NONE;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.INPUT_START = INPUT_START;
  Hammer.INPUT_MOVE = INPUT_MOVE;
  Hammer.INPUT_END = INPUT_END;
  Hammer.INPUT_CANCEL = INPUT_CANCEL;
  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
  Hammer.STATE_BEGAN = STATE_BEGAN;
  Hammer.STATE_CHANGED = STATE_CHANGED;
  Hammer.STATE_ENDED = STATE_ENDED;
  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
  Hammer.STATE_CANCELLED = STATE_CANCELLED;
  Hammer.STATE_FAILED = STATE_FAILED;
  Hammer.Manager = Manager;
  Hammer.Input = Input;
  Hammer.TouchAction = TouchAction;
  Hammer.TouchInput = TouchInput;
  Hammer.MouseInput = MouseInput;
  Hammer.PointerEventInput = PointerEventInput;
  Hammer.TouchMouseInput = TouchMouseInput;
  Hammer.SingleTouchInput = SingleTouchInput;
  Hammer.Recognizer = Recognizer;
  Hammer.AttrRecognizer = AttrRecognizer;
  Hammer.Tap = TapRecognizer;
  Hammer.Pan = PanRecognizer;
  Hammer.Swipe = SwipeRecognizer;
  Hammer.Pinch = PinchRecognizer;
  Hammer.Rotate = RotateRecognizer;
  Hammer.Press = PressRecognizer;
  Hammer.on = addEventListeners;
  Hammer.off = removeEventListeners;
  Hammer.each = each;
  Hammer.merge = merge$1;
  Hammer.extend = extend;
  Hammer.bindFn = bindFn;
  Hammer.assign = assign$1$1;
  Hammer.inherit = inherit;
  Hammer.bindFn = bindFn;
  Hammer.prefixed = prefixed;
  Hammer.toArray = toArray;
  Hammer.inArray = inArray;
  Hammer.uniqueArray = uniqueArray;
  Hammer.splitStr = splitStr;
  Hammer.boolOrFn = boolOrFn;
  Hammer.hasParent = hasParent;
  Hammer.addEventListeners = addEventListeners;
  Hammer.removeEventListeners = removeEventListeners;
  Hammer.defaults = assign$1$1({}, defaults, {
    preset: preset
  });
  return Hammer;
}(); //  style loader but by script tag, not by the loader.


var defaults$1 = Hammer.defaults;

var hammer_esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Hammer,
	INPUT_START: INPUT_START,
	INPUT_MOVE: INPUT_MOVE,
	INPUT_END: INPUT_END,
	INPUT_CANCEL: INPUT_CANCEL,
	STATE_POSSIBLE: STATE_POSSIBLE,
	STATE_BEGAN: STATE_BEGAN,
	STATE_CHANGED: STATE_CHANGED,
	STATE_ENDED: STATE_ENDED,
	STATE_RECOGNIZED: STATE_RECOGNIZED,
	STATE_CANCELLED: STATE_CANCELLED,
	STATE_FAILED: STATE_FAILED,
	DIRECTION_NONE: DIRECTION_NONE,
	DIRECTION_LEFT: DIRECTION_LEFT,
	DIRECTION_RIGHT: DIRECTION_RIGHT,
	DIRECTION_UP: DIRECTION_UP,
	DIRECTION_DOWN: DIRECTION_DOWN,
	DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	DIRECTION_ALL: DIRECTION_ALL,
	Manager: Manager,
	Input: Input,
	TouchAction: TouchAction,
	TouchInput: TouchInput,
	MouseInput: MouseInput,
	PointerEventInput: PointerEventInput,
	TouchMouseInput: TouchMouseInput,
	SingleTouchInput: SingleTouchInput,
	Recognizer: Recognizer,
	AttrRecognizer: AttrRecognizer,
	Tap: TapRecognizer,
	Pan: PanRecognizer,
	Swipe: SwipeRecognizer,
	Pinch: PinchRecognizer,
	Rotate: RotateRecognizer,
	Press: PressRecognizer,
	on: addEventListeners,
	off: removeEventListeners,
	each: each,
	merge: merge$1,
	extend: extend,
	assign: assign$1$1,
	inherit: inherit,
	bindFn: bindFn,
	prefixed: prefixed,
	toArray: toArray,
	inArray: inArray,
	uniqueArray: uniqueArray,
	splitStr: splitStr,
	boolOrFn: boolOrFn,
	hasParent: hasParent,
	addEventListeners: addEventListeners,
	removeEventListeners: removeEventListeners,
	defaults: defaults$1
});

var require$$0 = getCjsExportFromNamespace(hammer_esm);

var hammer = createCommonjsModule(function (module) {
  /**
   * Setup a mock hammer.js object, for unit testing.
   *
   * Inspiration: https://github.com/uber/deck.gl/pull/658
   *
   * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
   */
  function hammerMock() {
    var noop = function noop() {};

    return {
      on: noop,
      off: noop,
      destroy: noop,
      emit: noop,
      get: function get(m) {
        //eslint-disable-line no-unused-vars
        return {
          set: noop
        };
      }
    };
  }

  if (typeof window !== 'undefined') {
    var Hammer = window['Hammer'] || require$$0;
    module.exports = Hammer;
  } else {
    module.exports = function () {
      // hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
      return hammerMock();
    };
  }
});

/**
 * Turn an element into an clickToUse element.
 * When not active, the element has a transparent overlay. When the overlay is
 * clicked, the mode is changed to active.
 * When active, the element is displayed with a blue border around it, and
 * the interactive contents of the element can be used. When clicked outside
 * the element, the elements mode is changed to inactive.
 * @param {Element} container
 * @constructor Activator
 */

function Activator(container) {
  var _context,
      _this = this,
      _context2;

  this.active = false;
  this.dom = {
    container: container
  };
  this.dom.overlay = document.createElement('div');
  this.dom.overlay.className = 'vis-overlay';
  this.dom.container.appendChild(this.dom.overlay);
  this.hammer = hammer(this.dom.overlay);
  this.hammer.on('tap', bind$2(_context = this._onTapOverlay).call(_context, this)); // block all touch events (except tap)

  var events = ['tap', 'doubletap', 'press', 'pinch', 'pan', 'panstart', 'panmove', 'panend'];

  forEach$2(events).call(events, function (event) {
    _this.hammer.on(event, function (event) {
      event.srcEvent.stopPropagation();
    });
  }); // attach a click event to the window, in order to deactivate when clicking outside the timeline


  if (document && document.body) {
    this.onClick = function (event) {
      if (!_hasParent(event.target, container)) {
        _this.deactivate();
      }
    };

    document.body.addEventListener('click', this.onClick);
  }

  if (this.keycharm !== undefined) {
    this.keycharm.destroy();
  }

  this.keycharm = keycharm(); // keycharm listener only bounded when active)

  this.escListener = bind$2(_context2 = this.deactivate).call(_context2, this);
} // turn into an event emitter


componentEmitter(Activator.prototype); // The currently active activator

Activator.current = null;
/**
 * Destroy the activator. Cleans up all created DOM and event listeners
 */

Activator.prototype.destroy = function () {
  this.deactivate(); // remove dom

  this.dom.overlay.parentNode.removeChild(this.dom.overlay); // remove global event listener

  if (this.onClick) {
    document.body.removeEventListener('click', this.onClick);
  } // remove keycharm


  if (this.keycharm !== undefined) {
    this.keycharm.destroy();
  }

  this.keycharm = null; // cleanup hammer instances

  this.hammer.destroy();
  this.hammer = null; // FIXME: cleaning up hammer instances doesn't work (Timeline not removed from memory)
};
/**
 * Activate the element
 * Overlay is hidden, element is decorated with a blue shadow border
 */


Activator.prototype.activate = function () {
  var _context3;

  // we allow only one active activator at a time
  if (Activator.current) {
    Activator.current.deactivate();
  }

  Activator.current = this;
  this.active = true;
  this.dom.overlay.style.display = 'none';
  addClassName(this.dom.container, 'vis-active');
  this.emit('change');
  this.emit('activate'); // ugly hack: bind ESC after emitting the events, as the Network rebinds all
  // keyboard events on a 'change' event

  bind$2(_context3 = this.keycharm).call(_context3, 'esc', this.escListener);
};
/**
 * Deactivate the element
 * Overlay is displayed on top of the element
 */


Activator.prototype.deactivate = function () {
  this.active = false;
  this.dom.overlay.style.display = 'block';
  removeClassName(this.dom.container, 'vis-active');
  this.keycharm.unbind('esc', this.escListener);
  this.emit('change');
  this.emit('deactivate');
};
/**
 * Handle a tap event: activate the container
 * @param {Event}  event   The event
 * @private
 */


Activator.prototype._onTapOverlay = function (event) {
  // activate the container
  this.activate();
  event.srcEvent.stopPropagation();
};
/**
 * Test whether the element has the requested parent element somewhere in
 * its chain of parent nodes.
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @returns {boolean} Returns true when the parent is found somewhere in the
 *                    chain of parent nodes.
 * @private
 */


function _hasParent(element, parent) {
  while (element) {
    if (element === parent) {
      return true;
    }

    element = element.parentNode;
  }

  return false;
}

// English
var en = {
  addDescription: "Click in an empty space to place a new node.",
  addEdge: "Add Edge",
  addNode: "Add Node",
  back: "Back",
  createEdgeError: "Cannot link edges to a cluster.",
  del: "Delete selected",
  deleteClusterError: "Clusters cannot be deleted.",
  edgeDescription: "Click on a node and drag the edge to another node to connect them.",
  edit: "Edit",
  editClusterError: "Clusters cannot be edited.",
  editEdge: "Edit Edge",
  editEdgeDescription: "Click on the control points and drag them to a node to connect to it.",
  editNode: "Edit Node"
}; // German

var de = {
  addDescription: "Klicke auf eine freie Stelle, um einen neuen Knoten zu plazieren.",
  addEdge: "Kante hinzuf\xFCgen",
  addNode: "Knoten hinzuf\xFCgen",
  back: "Zur\xFCck",
  createEdgeError: "Es ist nicht m\xF6glich, Kanten mit Clustern zu verbinden.",
  del: "L\xF6sche Auswahl",
  deleteClusterError: "Cluster k\xF6nnen nicht gel\xF6scht werden.",
  edgeDescription: "Klicke auf einen Knoten und ziehe die Kante zu einem anderen Knoten, um diese zu verbinden.",
  edit: "Editieren",
  editClusterError: "Cluster k\xF6nnen nicht editiert werden.",
  editEdge: "Kante editieren",
  editEdgeDescription: "Klicke auf die Verbindungspunkte und ziehe diese auf einen Knoten, um sie zu verbinden.",
  editNode: "Knoten editieren"
}; // Spanish

var es = {
  addDescription: "Haga clic en un lugar vac\xEDo para colocar un nuevo nodo.",
  addEdge: "A\xF1adir arista",
  addNode: "A\xF1adir nodo",
  back: "Atr\xE1s",
  createEdgeError: "No se puede conectar una arista a un grupo.",
  del: "Eliminar selecci\xF3n",
  deleteClusterError: "No es posible eliminar grupos.",
  edgeDescription: "Haga clic en un nodo y arrastre la arista hacia otro nodo para conectarlos.",
  edit: "Editar",
  editClusterError: "No es posible editar grupos.",
  editEdge: "Editar arista",
  editEdgeDescription: "Haga clic en un punto de control y arrastrelo a un nodo para conectarlo.",
  editNode: "Editar nodo"
}; //Italiano

var it = {
  addDescription: "Clicca per aggiungere un nuovo nodo",
  addEdge: "Aggiungi un vertice",
  addNode: "Aggiungi un nodo",
  back: "Indietro",
  createEdgeError: "Non si possono collegare vertici ad un cluster",
  del: "Cancella la selezione",
  deleteClusterError: "I cluster non possono essere cancellati",
  edgeDescription: "Clicca su un nodo e trascinalo ad un altro nodo per connetterli.",
  edit: "Modifica",
  editClusterError: "I clusters non possono essere modificati.",
  editEdge: "Modifica il vertice",
  editEdgeDescription: "Clicca sui Punti di controllo e trascinali ad un nodo per connetterli.",
  editNode: "Modifica il nodo"
}; // Dutch

var nl = {
  addDescription: "Klik op een leeg gebied om een nieuwe node te maken.",
  addEdge: "Link toevoegen",
  addNode: "Node toevoegen",
  back: "Terug",
  createEdgeError: "Kan geen link maken naar een cluster.",
  del: "Selectie verwijderen",
  deleteClusterError: "Clusters kunnen niet worden verwijderd.",
  edgeDescription: "Klik op een node en sleep de link naar een andere node om ze te verbinden.",
  edit: "Wijzigen",
  editClusterError: "Clusters kunnen niet worden aangepast.",
  editEdge: "Link wijzigen",
  editEdgeDescription: "Klik op de verbindingspunten en sleep ze naar een node om daarmee te verbinden.",
  editNode: "Node wijzigen"
}; // Portuguese Brazil

var pt = {
  addDescription: "Clique em um espaço em branco para adicionar um novo nó",
  addEdge: "Adicionar aresta",
  addNode: "Adicionar nó",
  back: "Voltar",
  createEdgeError: "Não foi possível linkar arestas a um cluster.",
  del: "Remover selecionado",
  deleteClusterError: "Clusters não puderam ser removidos.",
  edgeDescription: "Clique em um nó e arraste a aresta até outro nó para conectá-los",
  edit: "Editar",
  editClusterError: "Clusters não puderam ser editados.",
  editEdge: "Editar aresta",
  editEdgeDescription: "Clique nos pontos de controle e os arraste para um nó para conectá-los",
  editNode: "Editar nó"
}; // Russian

var ru = {
  addDescription: "Кликните в свободное место, чтобы добавить новый узел.",
  addEdge: "Добавить ребро",
  addNode: "Добавить узел",
  back: "Назад",
  createEdgeError: "Невозможно соединить ребра в кластер.",
  del: "Удалить выбранное",
  deleteClusterError: "Кластеры не могут быть удалены",
  edgeDescription: "Кликните на узел и протяните ребро к другому узлу, чтобы соединить их.",
  edit: "Редактировать",
  editClusterError: "Кластеры недоступны для редактирования.",
  editEdge: "Редактировать ребро",
  editEdgeDescription: "Кликните на контрольные точки и перетащите их в узел, чтобы подключиться к нему.",
  editNode: "Редактировать узел"
}; // Chinese

var cn = {
  addDescription: "单击空白处放置新节点。",
  addEdge: "添加连接线",
  addNode: "添加节点",
  back: "返回",
  createEdgeError: "无法将连接线连接到群集。",
  del: "删除选定",
  deleteClusterError: "无法删除群集。",
  edgeDescription: "单击某个节点并将该连接线拖动到另一个节点以连接它们。",
  edit: "编辑",
  editClusterError: "无法编辑群集。",
  editEdge: "编辑连接线",
  editEdgeDescription: "单击控制节点并将它们拖到节点上连接。",
  editNode: "编辑节点"
}; // Ukrainian

var uk = {
  addDescription: "Kлікніть на вільне місце, щоб додати новий вузол.",
  addEdge: "Додати край",
  addNode: "Додати вузол",
  back: "Назад",
  createEdgeError: "Не можливо об'єднати краї в групу.",
  del: "Видалити обране",
  deleteClusterError: "Групи не можуть бути видалені.",
  edgeDescription: "Клікніть на вузол і перетягніть край до іншого вузла, щоб їх з'єднати.",
  edit: "Редагувати",
  editClusterError: "Групи недоступні для редагування.",
  editEdge: "Редагувати край",
  editEdgeDescription: "Клікніть на контрольні точки і перетягніть їх у вузол, щоб підключитися до нього.",
  editNode: "Редагувати вузол"
}; // French

var fr = {
  addDescription: "Cliquez dans un endroit vide pour placer un nœud.",
  addEdge: "Ajouter un lien",
  addNode: "Ajouter un nœud",
  back: "Retour",
  createEdgeError: "Impossible de créer un lien vers un cluster.",
  del: "Effacer la sélection",
  deleteClusterError: "Les clusters ne peuvent pas être effacés.",
  edgeDescription: "Cliquez sur un nœud et glissez le lien vers un autre nœud pour les connecter.",
  edit: "Éditer",
  editClusterError: "Les clusters ne peuvent pas être édités.",
  editEdge: "Éditer le lien",
  editEdgeDescription: "Cliquez sur les points de contrôle et glissez-les pour connecter un nœud.",
  editNode: "Éditer le nœud"
}; // Czech

var cs = {
  addDescription: "Kluknutím do prázdného prostoru můžete přidat nový vrchol.",
  addEdge: "Přidat hranu",
  addNode: "Přidat vrchol",
  back: "Zpět",
  createEdgeError: "Nelze připojit hranu ke shluku.",
  del: "Smazat výběr",
  deleteClusterError: "Nelze mazat shluky.",
  edgeDescription: "Přetažením z jednoho vrcholu do druhého můžete spojit tyto vrcholy novou hranou.",
  edit: "Upravit",
  editClusterError: "Nelze upravovat shluky.",
  editEdge: "Upravit hranu",
  editEdgeDescription: "Přetažením kontrolního vrcholu hrany ji můžete připojit k jinému vrcholu.",
  editNode: "Upravit vrchol"
};

var locales = /*#__PURE__*/Object.freeze({
	__proto__: null,
	en: en,
	de: de,
	es: es,
	it: it,
	nl: nl,
	pt: pt,
	ru: ru,
	cn: cn,
	uk: uk,
	fr: fr,
	cs: cs
});

/**
 * Normalizes language code into the format used internally.
 *
 * @param locales - All the available locales.
 * @param rawCode - The original code as supplied by the user.
 *
 * @returns Language code in the format language-COUNTRY or language, eventually
 * fallbacks to en.
 */
function normalizeLanguageCode(locales, rawCode) {
  try {
    var _rawCode$split = rawCode.split(/[-_ \/]/, 2),
        _rawCode$split2 = slicedToArray(_rawCode$split, 2),
        rawLanguage = _rawCode$split2[0],
        rawCountry = _rawCode$split2[1];

    var language = rawLanguage != null ? rawLanguage.toLowerCase() : null;
    var country = rawCountry != null ? rawCountry.toUpperCase() : null;

    if (language && country) {
      var code = language + "-" + country;

      if (Object.prototype.hasOwnProperty.call(locales, code)) {
        return code;
      } else {
        var _context;

        console.warn(concat$2(_context = "Unknown variant ".concat(country, " of language ")).call(_context, language, "."));
      }
    }

    if (language) {
      var _code = language;

      if (Object.prototype.hasOwnProperty.call(locales, _code)) {
        return _code;
      } else {
        console.warn("Unknown language ".concat(language));
      }
    }

    console.warn("Unknown locale ".concat(rawCode, ", falling back to English."));
    return "en";
  } catch (error) {
    console.error(error);
    console.warn("Unexpected error while normalizing locale ".concat(rawCode, ", falling back to English."));
    return "en";
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$6(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

/**
 * Associates a canvas to a given image, containing a number of renderings
 * of the image at various sizes.
 *
 * This technique is known as 'mipmapping'.
 *
 * NOTE: Images can also be of type 'data:svg+xml`. This code also works
 *       for svg, but the mipmapping may not be necessary.
 *
 * @param {Image} image
 */
var CachedImage = /*#__PURE__*/function () {
  /**
   * @ignore
   */
  function CachedImage() {
    classCallCheck(this, CachedImage);

    // eslint-disable-line no-unused-vars
    this.NUM_ITERATIONS = 4; // Number of items in the coordinates array

    this.image = new Image();
    this.canvas = document.createElement('canvas');
  }
  /**
   * Called when the image has been successfully loaded.
   */


  createClass(CachedImage, [{
    key: "init",
    value: function init() {
      if (this.initialized()) return;
      this.src = this.image.src; // For same interface with Image

      var w = this.image.width;
      var h = this.image.height; // Ease external access

      this.width = w;
      this.height = h;
      var h2 = Math.floor(h / 2);
      var h4 = Math.floor(h / 4);
      var h8 = Math.floor(h / 8);
      var h16 = Math.floor(h / 16);
      var w2 = Math.floor(w / 2);
      var w4 = Math.floor(w / 4);
      var w8 = Math.floor(w / 8);
      var w16 = Math.floor(w / 16); // Make canvas as small as possible

      this.canvas.width = 3 * w4;
      this.canvas.height = h2; // Coordinates and sizes of images contained in the canvas
      // Values per row:  [top x, left y, width, height]

      this.coordinates = [[0, 0, w2, h2], [w2, 0, w4, h4], [w2, h4, w8, h8], [5 * w8, h4, w16, h16]];

      this._fillMipMap();
    }
    /**
     * @return {Boolean} true if init() has been called, false otherwise.
     */

  }, {
    key: "initialized",
    value: function initialized() {
      return this.coordinates !== undefined;
    }
    /**
     * Redraw main image in various sizes to the context.
     *
     * The rationale behind this is to reduce artefacts due to interpolation
     * at differing zoom levels.
     *
     * Source: http://stackoverflow.com/q/18761404/1223531
     *
     * This methods takes the resizing out of the drawing loop, in order to
     * reduce performance overhead.
     *
     * TODO: The code assumes that a 2D context can always be gotten. This is
     *       not necessarily true! OTOH, if not true then usage of this class
     *       is senseless.
     *
     * @private
     */

  }, {
    key: "_fillMipMap",
    value: function _fillMipMap() {
      var ctx = this.canvas.getContext('2d'); // First zoom-level comes from the image

      var to = this.coordinates[0];
      ctx.drawImage(this.image, to[0], to[1], to[2], to[3]); // The rest are copy actions internal to the canvas/context

      for (var iterations = 1; iterations < this.NUM_ITERATIONS; iterations++) {
        var from = this.coordinates[iterations - 1];
        var _to = this.coordinates[iterations];
        ctx.drawImage(this.canvas, from[0], from[1], from[2], from[3], _to[0], _to[1], _to[2], _to[3]);
      }
    }
    /**
     * Draw the image, using the mipmap if necessary.
     *
     * MipMap is only used if param factor > 2; otherwise, original bitmap
     * is resized. This is also used to skip mipmap usage, e.g. by setting factor = 1
     *
     * Credits to 'Alex de Mulder' for original implementation.
     *
     * @param {CanvasRenderingContext2D} ctx  context on which to draw zoomed image
     * @param {Float} factor scale factor at which to draw
     * @param {number} left
     * @param {number} top
     * @param {number} width
     * @param {number} height
     */

  }, {
    key: "drawImageAtPosition",
    value: function drawImageAtPosition(ctx, factor, left, top, width, height) {
      if (!this.initialized()) return; //can't draw image yet not intialized

      if (factor > 2) {
        // Determine which zoomed image to use
        factor *= 0.5;
        var iterations = 0;

        while (factor > 2 && iterations < this.NUM_ITERATIONS) {
          factor *= 0.5;
          iterations += 1;
        }

        if (iterations >= this.NUM_ITERATIONS) {
          iterations = this.NUM_ITERATIONS - 1;
        } //console.log("iterations: " + iterations);


        var from = this.coordinates[iterations];
        ctx.drawImage(this.canvas, from[0], from[1], from[2], from[3], left, top, width, height);
      } else {
        // Draw image directly
        ctx.drawImage(this.image, left, top, width, height);
      }
    }
  }]);

  return CachedImage;
}();

/**
 * This callback is a callback that accepts an Image.
 * @callback ImageCallback
 * @param {Image} image
 */

/**
 * This class loads images and keeps them stored.
 *
 * @param {ImageCallback} callback
 */

var Images = /*#__PURE__*/function () {
  /**
   * @param {ImageCallback} callback
   */
  function Images(callback) {
    classCallCheck(this, Images);

    this.images = {};
    this.imageBroken = {};
    this.callback = callback;
  }
  /**
   * @param {string} url                      The original Url that failed to load, if the broken image is successfully loaded it will be added to the cache using this Url as the key so that subsequent requests for this Url will return the broken image
   * @param {string} brokenUrl                Url the broken image to try and load
   * @param {Image} imageToLoadBrokenUrlOn   The image object
   */


  createClass(Images, [{
    key: "_tryloadBrokenUrl",
    value: function _tryloadBrokenUrl(url, brokenUrl, imageToLoadBrokenUrlOn) {
      //If these parameters aren't specified then exit the function because nothing constructive can be done
      if (url === undefined || imageToLoadBrokenUrlOn === undefined) return;

      if (brokenUrl === undefined) {
        console.warn("No broken url image defined");
        return;
      } //Clear the old subscription to the error event and put a new in place that only handle errors in loading the brokenImageUrl


      imageToLoadBrokenUrlOn.image.onerror = function () {
        console.error("Could not load brokenImage:", brokenUrl); // cache item will contain empty image, this should be OK for default
      }; //Set the source of the image to the brokenUrl, this is actually what kicks off the loading of the broken image


      imageToLoadBrokenUrlOn.image.src = brokenUrl;
    }
    /**
     *
     * @param {vis.Image} imageToRedrawWith
     * @private
     */

  }, {
    key: "_redrawWithImage",
    value: function _redrawWithImage(imageToRedrawWith) {
      if (this.callback) {
        this.callback(imageToRedrawWith);
      }
    }
    /**
     * @param {string} url          Url of the image
     * @param {string} brokenUrl    Url of an image to use if the url image is not found
     * @return {Image} img          The image object
     */

  }, {
    key: "load",
    value: function load(url, brokenUrl) {
      var _this = this;

      //Try and get the image from the cache, if successful then return the cached image
      var cachedImage = this.images[url];
      if (cachedImage) return cachedImage; //Create a new image

      var img = new CachedImage(); // Need to add to cache here, otherwise final return will spawn different copies of the same image,
      // Also, there will be multiple loads of the same image.

      this.images[url] = img; //Subscribe to the event that is raised if the image loads successfully

      img.image.onload = function () {
        // Properly init the cached item and then request a redraw
        _this._fixImageCoordinates(img.image);

        img.init();

        _this._redrawWithImage(img);
      }; //Subscribe to the event that is raised if the image fails to load


      img.image.onerror = function () {
        console.error("Could not load image:", url); //Try and load the image specified by the brokenUrl using

        _this._tryloadBrokenUrl(url, brokenUrl, img);
      }; //Set the source of the image to the url, this is what actually kicks off the loading of the image


      img.image.src = url; //Return the new image

      return img;
    }
    /**
     * IE11 fix -- thanks dponch!
     *
     * Local helper function
     * @param {vis.Image} imageToCache
     * @private
     */

  }, {
    key: "_fixImageCoordinates",
    value: function _fixImageCoordinates(imageToCache) {
      if (imageToCache.width === 0) {
        document.body.appendChild(imageToCache);
        imageToCache.width = imageToCache.offsetWidth;
        imageToCache.height = imageToCache.offsetHeight;
        document.body.removeChild(imageToCache);
      }
    }
  }]);

  return Images;
}();

/**
 * This class can store groups and options specific for groups.
 */
var Groups = /*#__PURE__*/function () {
  /**
   * @ignore
   */
  function Groups() {
    classCallCheck(this, Groups);

    this.clear();
    this.defaultIndex = 0;
    this.groupsArray = [];
    this.groupIndex = 0;
    this.defaultGroups = [{
      border: "#2B7CE9",
      background: "#97C2FC",
      highlight: {
        border: "#2B7CE9",
        background: "#D2E5FF"
      },
      hover: {
        border: "#2B7CE9",
        background: "#D2E5FF"
      }
    }, // 0: blue
    {
      border: "#FFA500",
      background: "#FFFF00",
      highlight: {
        border: "#FFA500",
        background: "#FFFFA3"
      },
      hover: {
        border: "#FFA500",
        background: "#FFFFA3"
      }
    }, // 1: yellow
    {
      border: "#FA0A10",
      background: "#FB7E81",
      highlight: {
        border: "#FA0A10",
        background: "#FFAFB1"
      },
      hover: {
        border: "#FA0A10",
        background: "#FFAFB1"
      }
    }, // 2: red
    {
      border: "#41A906",
      background: "#7BE141",
      highlight: {
        border: "#41A906",
        background: "#A1EC76"
      },
      hover: {
        border: "#41A906",
        background: "#A1EC76"
      }
    }, // 3: green
    {
      border: "#E129F0",
      background: "#EB7DF4",
      highlight: {
        border: "#E129F0",
        background: "#F0B3F5"
      },
      hover: {
        border: "#E129F0",
        background: "#F0B3F5"
      }
    }, // 4: magenta
    {
      border: "#7C29F0",
      background: "#AD85E4",
      highlight: {
        border: "#7C29F0",
        background: "#D3BDF0"
      },
      hover: {
        border: "#7C29F0",
        background: "#D3BDF0"
      }
    }, // 5: purple
    {
      border: "#C37F00",
      background: "#FFA807",
      highlight: {
        border: "#C37F00",
        background: "#FFCA66"
      },
      hover: {
        border: "#C37F00",
        background: "#FFCA66"
      }
    }, // 6: orange
    {
      border: "#4220FB",
      background: "#6E6EFD",
      highlight: {
        border: "#4220FB",
        background: "#9B9BFD"
      },
      hover: {
        border: "#4220FB",
        background: "#9B9BFD"
      }
    }, // 7: darkblue
    {
      border: "#FD5A77",
      background: "#FFC0CB",
      highlight: {
        border: "#FD5A77",
        background: "#FFD1D9"
      },
      hover: {
        border: "#FD5A77",
        background: "#FFD1D9"
      }
    }, // 8: pink
    {
      border: "#4AD63A",
      background: "#C2FABC",
      highlight: {
        border: "#4AD63A",
        background: "#E6FFE3"
      },
      hover: {
        border: "#4AD63A",
        background: "#E6FFE3"
      }
    }, // 9: mint
    {
      border: "#990000",
      background: "#EE0000",
      highlight: {
        border: "#BB0000",
        background: "#FF3333"
      },
      hover: {
        border: "#BB0000",
        background: "#FF3333"
      }
    }, // 10:bright red
    {
      border: "#FF6000",
      background: "#FF6000",
      highlight: {
        border: "#FF6000",
        background: "#FF6000"
      },
      hover: {
        border: "#FF6000",
        background: "#FF6000"
      }
    }, // 12: real orange
    {
      border: "#97C2FC",
      background: "#2B7CE9",
      highlight: {
        border: "#D2E5FF",
        background: "#2B7CE9"
      },
      hover: {
        border: "#D2E5FF",
        background: "#2B7CE9"
      }
    }, // 13: blue
    {
      border: "#399605",
      background: "#255C03",
      highlight: {
        border: "#399605",
        background: "#255C03"
      },
      hover: {
        border: "#399605",
        background: "#255C03"
      }
    }, // 14: green
    {
      border: "#B70054",
      background: "#FF007E",
      highlight: {
        border: "#B70054",
        background: "#FF007E"
      },
      hover: {
        border: "#B70054",
        background: "#FF007E"
      }
    }, // 15: magenta
    {
      border: "#AD85E4",
      background: "#7C29F0",
      highlight: {
        border: "#D3BDF0",
        background: "#7C29F0"
      },
      hover: {
        border: "#D3BDF0",
        background: "#7C29F0"
      }
    }, // 16: purple
    {
      border: "#4557FA",
      background: "#000EA1",
      highlight: {
        border: "#6E6EFD",
        background: "#000EA1"
      },
      hover: {
        border: "#6E6EFD",
        background: "#000EA1"
      }
    }, // 17: darkblue
    {
      border: "#FFC0CB",
      background: "#FD5A77",
      highlight: {
        border: "#FFD1D9",
        background: "#FD5A77"
      },
      hover: {
        border: "#FFD1D9",
        background: "#FD5A77"
      }
    }, // 18: pink
    {
      border: "#C2FABC",
      background: "#74D66A",
      highlight: {
        border: "#E6FFE3",
        background: "#74D66A"
      },
      hover: {
        border: "#E6FFE3",
        background: "#74D66A"
      }
    }, // 19: mint
    {
      border: "#EE0000",
      background: "#990000",
      highlight: {
        border: "#FF3333",
        background: "#BB0000"
      },
      hover: {
        border: "#FF3333",
        background: "#BB0000"
      }
    } // 20:bright red
    ];
    this.options = {};
    this.defaultOptions = {
      useDefaultGroups: true
    };

    assign$2(this.options, this.defaultOptions);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(Groups, [{
    key: "setOptions",
    value: function setOptions(options) {
      var optionFields = ['useDefaultGroups'];

      if (options !== undefined) {
        for (var groupName in options) {
          if (Object.prototype.hasOwnProperty.call(options, groupName)) {
            if (indexOf$3(optionFields).call(optionFields, groupName) === -1) {
              var group = options[groupName];
              this.add(groupName, group);
            }
          }
        }
      }
    }
    /**
     * Clear all groups
     */

  }, {
    key: "clear",
    value: function clear() {
      this.groups = {};
      this.groupsArray = [];
    }
    /**
     * Get group options of a groupname.
     * If groupname is not found, a new group may be created.
     *
     * @param {*}       groupname     Can be a number, string, Date, etc.
     * @param {boolean} [shouldCreate=true] If true, create a new group
     * @return {Object} The found or created group
     */

  }, {
    key: "get",
    value: function get(groupname) {
      var shouldCreate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var group = this.groups[groupname];

      if (group === undefined && shouldCreate) {
        if (this.options.useDefaultGroups === false && this.groupsArray.length > 0) {
          // create new group
          var index = this.groupIndex % this.groupsArray.length;
          this.groupIndex++;
          group = {};
          group.color = this.groups[this.groupsArray[index]];
          this.groups[groupname] = group;
        } else {
          // create new group
          var _index = this.defaultIndex % this.defaultGroups.length;

          this.defaultIndex++;
          group = {};
          group.color = this.defaultGroups[_index];
          this.groups[groupname] = group;
        }
      }

      return group;
    }
    /**
     * Add a custom group style
     * @param {string} groupName
     * @param {Object} style       An object containing borderColor,
     *                             backgroundColor, etc.
     * @return {Object} group      The created group object
     */

  }, {
    key: "add",
    value: function add(groupName, style) {
      this.groups[groupName] = style;
      this.groupsArray.push(groupName);
      return style;
    }
  }]);

  return Groups;
}();

var slice$6 = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap$1 = function (scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice$6.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


_export({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global_1.setInterval)
});

var setTimeout$1 = path.setTimeout;

var setTimeout$2 = setTimeout$1;

var $some = arrayIteration.some;
var STRICT_METHOD$2 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('some'); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$7
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var some = entryVirtual('Array').some;

var ArrayPrototype$9 = Array.prototype;

var some_1 = function (it) {
  var own = it.some;
  return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.some ? some : own;
};

var some$1 = some_1;

var some$2 = some$1;

var globalIsFinite = global_1.isFinite; // `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite

var numberIsFinite = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};

// https://tc39.github.io/ecma262/#sec-number.isfinite

_export({
  target: 'Number',
  stat: true
}, {
  isFinite: numberIsFinite
});

var _isFinite = path.Number.isFinite;

var _isFinite$1 = _isFinite;

var _isFinite$2 = _isFinite$1;

// https://tc39.github.io/ecma262/#sec-number.isnan

_export({
  target: 'Number',
  stat: true
}, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

var isNan = path.Number.isNaN;

var isNan$1 = isNan;

var isNan$2 = isNan$1;

var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
var FAILS_ON_PRIMITIVES$3 = fails(function () {
  return !Object.getOwnPropertyNames(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$3
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames$2
});

var Object$2 = path.Object;

var getOwnPropertyNames = function getOwnPropertyNames(it) {
  return Object$2.getOwnPropertyNames(it);
};

var getOwnPropertyNames$1 = getOwnPropertyNames;

var getOwnPropertyNames$2 = getOwnPropertyNames$1;

var trim$2 = stringTrim.trim;
var $parseFloat = global_1.parseFloat;
var FORCED$3 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

var numberParseFloat = FORCED$3 ? function parseFloat(string) {
  var trimmedString = trim$2(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

// https://tc39.github.io/ecma262/#sec-parsefloat-string

_export({
  global: true,
  forced: parseFloat != numberParseFloat
}, {
  parseFloat: numberParseFloat
});

var _parseFloat = path.parseFloat;

var _parseFloat$1 = _parseFloat;

var _parseFloat$2 = _parseFloat$1;

/**
 * Helper functions for components
 */

/**
 * Determine values to use for (sub)options of 'chosen'.
 *
 * This option is either a boolean or an object whose values should be examined further.
 * The relevant structures are:
 *
 * - chosen: <boolean value>
 * - chosen: { subOption: <boolean or function> }
 *
 * Where subOption is 'node', 'edge' or 'label'.
 *
 * The intention of this method appears to be to set a specific priority to the options;
 * Since most properties are either bridged or merged into the local options objects, there
 * is not much point in handling them separately.
 * TODO: examine if 'most' in previous sentence can be replaced with 'all'. In that case, we
 *       should be able to get rid of this method.
 *
 * @param {string}  subOption  option within object 'chosen' to consider; either 'node', 'edge' or 'label'
 * @param {Object}  pile       array of options objects to consider
 *
 * @return {boolean|function}  value for passed subOption of 'chosen' to use
 */

function choosify(subOption, pile) {
  // allowed values for subOption
  var allowed = ['node', 'edge', 'label'];
  var value = true;
  var chosen = topMost(pile, 'chosen');

  if (typeof chosen === 'boolean') {
    value = chosen;
  } else if (_typeof_1(chosen) === 'object') {
    if (indexOf$3(allowed).call(allowed, subOption) === -1) {
      throw new Error('choosify: subOption \'' + subOption + '\' should be one of ' + "'" + allowed.join("', '") + "'");
    }

    var chosenEdge = topMost(pile, ['chosen', subOption]);

    if (typeof chosenEdge === 'boolean' || typeof chosenEdge === 'function') {
      value = chosenEdge;
    }
  }

  return value;
}
/**
 * Check if the point falls within the given rectangle.
 *
 * @param {rect} rect
 * @param {point} point
 * @param {rotationPoint} [rotationPoint] if specified, the rotation that applies to the rectangle.
 * @returns {boolean}  true if point within rectangle, false otherwise
 */

function pointInRect(rect, point, rotationPoint) {
  if (rect.width <= 0 || rect.height <= 0) {
    return false; // early out
  }

  if (rotationPoint !== undefined) {
    // Rotate the point the same amount as the rectangle
    var tmp = {
      x: point.x - rotationPoint.x,
      y: point.y - rotationPoint.y
    };

    if (rotationPoint.angle !== 0) {
      // In order to get the coordinates the same, you need to
      // rotate in the reverse direction
      var angle = -rotationPoint.angle;
      var tmp2 = {
        x: Math.cos(angle) * tmp.x - Math.sin(angle) * tmp.y,
        y: Math.sin(angle) * tmp.x + Math.cos(angle) * tmp.y
      };
      point = tmp2;
    } else {
      point = tmp;
    } // Note that if a rotation is specified, the rectangle coordinates
    // are **not* the full canvas coordinates. They are relative to the
    // rotationPoint. Hence, the point coordinates need not be translated
    // back in this case.

  }

  var right = rect.x + rect.width;
  var bottom = rect.y + rect.width;
  return rect.left < point.x && right > point.x && rect.top < point.y && bottom > point.y;
}
/**
 * Check if given value is acceptable as a label text.
 *
 * @param {*} text value to check; can be anything at this point
 * @returns {boolean} true if valid label value, false otherwise
 */

function isValidLabel(text) {
  // Note that this is quite strict: types that *might* be converted to string are disallowed
  return typeof text === 'string' && text !== '';
}
/**
 * Returns x, y of self reference circle based on provided angle
 *
 * @param {Object} ctx
 * @param {number} angle
 * @param {number} radius
 * @param {VisNode} node
 *
 * @returns {Object} x and y coordinates
 */

function getSelfRefCoordinates(ctx, angle, radius, node) {
  var x = node.x;
  var y = node.y;

  if (typeof node.distanceToBorder === "function") {
    //calculating opposite and adjacent
    //distaneToBorder becomes Hypotenuse.
    //Formulas sin(a) = Opposite / Hypotenuse and cos(a) = Adjacent / Hypotenuse
    var toBorderDist = node.distanceToBorder(ctx, angle);
    var yFromNodeCenter = Math.sin(angle) * toBorderDist;
    var xFromNodeCenter = Math.cos(angle) * toBorderDist; //xFromNodeCenter is basically x and if xFromNodeCenter equals to the distance to border then it means
    //that y does not need calculation because it is equal node.height / 2 or node.y
    //same thing with yFromNodeCenter and if yFromNodeCenter equals to the distance to border then it means
    //that x is equal node.width / 2 or node.x

    if (xFromNodeCenter === toBorderDist) {
      x += toBorderDist;
      y = node.y;
    } else if (yFromNodeCenter === toBorderDist) {
      x = node.x;
      y -= toBorderDist;
    } else {
      x += xFromNodeCenter;
      y -= yFromNodeCenter;
    }
  } else if (node.shape.width > node.shape.height) {
    x = node.x + node.shape.width * 0.5;
    y = node.y - radius;
  } else {
    x = node.x + radius;
    y = node.y - node.shape.height * 0.5;
  }

  return {
    x: x,
    y: y
  };
}

var values$1 = entryVirtual('Array').values;

var values$2 = values$1;

var ArrayPrototype$a = Array.prototype;
var DOMIterables$1 = {
  DOMTokenList: true,
  NodeList: true
};

var values_1 = function (it) {
  var own = it.values;
  return it === ArrayPrototype$a || it instanceof Array && own === ArrayPrototype$a.values // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$1.hasOwnProperty(classof(it)) ? values$2 : own;
};

var values$3 = values_1;

/**
 * Callback to determine text dimensions, using the parent label settings.
 * @callback MeasureText
 * @param {text} text
 * @param {text} mod
 * @return {Object} { width, values} width in pixels and font attributes
 */

/**
 * Helper class for Label which collects results of splitting labels into lines and blocks.
 *
 * @private
 */
var LabelAccumulator = /*#__PURE__*/function () {
  /**
   * @param {MeasureText} measureText
   */
  function LabelAccumulator(measureText) {
    classCallCheck(this, LabelAccumulator);

    this.measureText = measureText;
    this.current = 0;
    this.width = 0;
    this.height = 0;
    this.lines = [];
  }
  /**
   * Append given text to the given line.
   *
   * @param {number}  l    index of line to add to
   * @param {string}  text string to append to line
   * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
   * @private
   */


  createClass(LabelAccumulator, [{
    key: "_add",
    value: function _add(l, text) {
      var mod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'normal';

      if (this.lines[l] === undefined) {
        this.lines[l] = {
          width: 0,
          height: 0,
          blocks: []
        };
      } // We still need to set a block for undefined and empty texts, hence return at this point
      // This is necessary because we don't know at this point if we're at the
      // start of an empty line or not.
      // To compensate, empty blocks are removed in `finalize()`.
      //
      // Empty strings should still have a height


      var tmpText = text;
      if (text === undefined || text === "") tmpText = " "; // Determine width and get the font properties

      var result = this.measureText(tmpText, mod);

      var block = assign$2({}, values$3(result));

      block.text = text;
      block.width = result.width;
      block.mod = mod;

      if (text === undefined || text === "") {
        block.width = 0;
      }

      this.lines[l].blocks.push(block); // Update the line width. We need this for determining if a string goes over max width

      this.lines[l].width += block.width;
    }
    /**
     * Returns the width in pixels of the current line.
     *
     * @returns {number}
     */

  }, {
    key: "curWidth",
    value: function curWidth() {
      var line = this.lines[this.current];
      if (line === undefined) return 0;
      return line.width;
    }
    /**
     * Add text in block to current line
     *
     * @param {string} text
     * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
     */

  }, {
    key: "append",
    value: function append(text) {
      var mod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';

      this._add(this.current, text, mod);
    }
    /**
     * Add text in block to current line and start a new line
     *
     * @param {string} text
     * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
     */

  }, {
    key: "newLine",
    value: function newLine(text) {
      var mod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';

      this._add(this.current, text, mod);

      this.current++;
    }
    /**
     * Determine and set the heights of all the lines currently contained in this instance
     *
     * Note that width has already been set.
     *
     * @private
     */

  }, {
    key: "determineLineHeights",
    value: function determineLineHeights() {
      for (var k = 0; k < this.lines.length; k++) {
        var line = this.lines[k]; // Looking for max height of blocks in line

        var height = 0;

        if (line.blocks !== undefined) {
          // Can happen if text contains e.g. '\n '
          for (var l = 0; l < line.blocks.length; l++) {
            var block = line.blocks[l];

            if (height < block.height) {
              height = block.height;
            }
          }
        }

        line.height = height;
      }
    }
    /**
     * Determine the full size of the label text, as determined by current lines and blocks
     *
     * @private
     */

  }, {
    key: "determineLabelSize",
    value: function determineLabelSize() {
      var width = 0;
      var height = 0;

      for (var k = 0; k < this.lines.length; k++) {
        var line = this.lines[k];

        if (line.width > width) {
          width = line.width;
        }

        height += line.height;
      }

      this.width = width;
      this.height = height;
    }
    /**
     * Remove all empty blocks and empty lines we don't need
     *
     * This must be done after the width/height determination,
     * so that these are set properly for processing here.
     *
     * @returns {Array<Line>} Lines with empty blocks (and some empty lines) removed
     * @private
     */

  }, {
    key: "removeEmptyBlocks",
    value: function removeEmptyBlocks() {
      var tmpLines = [];

      for (var k = 0; k < this.lines.length; k++) {
        var line = this.lines[k]; // Note: an empty line in between text has width zero but is still relevant to layout.
        // So we can't use width for testing empty line here

        if (line.blocks.length === 0) continue; // Discard final empty line always

        if (k === this.lines.length - 1) {
          if (line.width === 0) continue;
        }

        var tmpLine = {};

        assign$2(tmpLine, line);

        tmpLine.blocks = [];
        var firstEmptyBlock = void 0;
        var tmpBlocks = [];

        for (var l = 0; l < line.blocks.length; l++) {
          var block = line.blocks[l];

          if (block.width !== 0) {
            tmpBlocks.push(block);
          } else {
            if (firstEmptyBlock === undefined) {
              firstEmptyBlock = block;
            }
          }
        } // Ensure that there is *some* text present


        if (tmpBlocks.length === 0 && firstEmptyBlock !== undefined) {
          tmpBlocks.push(firstEmptyBlock);
        }

        tmpLine.blocks = tmpBlocks;
        tmpLines.push(tmpLine);
      }

      return tmpLines;
    }
    /**
     * Set the sizes for all lines and the whole thing.
     *
     * @returns {{width: (number|*), height: (number|*), lines: Array}}
     */

  }, {
    key: "finalize",
    value: function finalize() {
      //console.log(JSON.stringify(this.lines, null, 2));
      this.determineLineHeights();
      this.determineLabelSize();
      var tmpLines = this.removeEmptyBlocks(); // Return a simple hash object for further processing.

      return {
        width: this.width,
        height: this.height,
        lines: tmpLines
      };
    }
  }]);

  return LabelAccumulator;
}();

var tagPattern = {
  // HTML
  '<b>': /<b>/,
  '<i>': /<i>/,
  '<code>': /<code>/,
  '</b>': /<\/b>/,
  '</i>': /<\/i>/,
  '</code>': /<\/code>/,
  // Markdown
  '*': /\*/,
  // bold
  '_': /\_/,
  // ital
  '`': /`/,
  // mono
  'afterBold': /[^\*]/,
  'afterItal': /[^_]/,
  'afterMono': /[^`]/
};
/**
 * Internal helper class for parsing the markup tags for HTML and Markdown.
 *
 * NOTE: Sequences of tabs and spaces are reduced to single space.
 *       Scan usage of `this.spacing` within method
 */

var MarkupAccumulator = /*#__PURE__*/function () {
  /**
   * Create an instance
   *
   * @param {string} text  text to parse for markup
   */
  function MarkupAccumulator(text) {
    classCallCheck(this, MarkupAccumulator);

    this.text = text;
    this.bold = false;
    this.ital = false;
    this.mono = false;
    this.spacing = false;
    this.position = 0;
    this.buffer = "";
    this.modStack = [];
    this.blocks = [];
  }
  /**
   * Return the mod label currently on the top of the stack
   *
   * @returns {string}  label of topmost mod
   * @private
   */


  createClass(MarkupAccumulator, [{
    key: "mod",
    value: function mod() {
      return this.modStack.length === 0 ? 'normal' : this.modStack[0];
    }
    /**
     * Return the mod label currently active
     *
     * @returns {string}  label of active mod
     * @private
     */

  }, {
    key: "modName",
    value: function modName() {
      if (this.modStack.length === 0) return 'normal';else if (this.modStack[0] === 'mono') return 'mono';else {
        if (this.bold && this.ital) {
          return 'boldital';
        } else if (this.bold) {
          return 'bold';
        } else if (this.ital) {
          return 'ital';
        }
      }
    }
    /**
     * @private
     */

  }, {
    key: "emitBlock",
    value: function emitBlock() {
      if (this.spacing) {
        this.add(" ");
        this.spacing = false;
      }

      if (this.buffer.length > 0) {
        this.blocks.push({
          text: this.buffer,
          mod: this.modName()
        });
        this.buffer = "";
      }
    }
    /**
     * Output text to buffer
     *
     * @param {string} text  text to add
     * @private
     */

  }, {
    key: "add",
    value: function add(text) {
      if (text === " ") {
        this.spacing = true;
      }

      if (this.spacing) {
        this.buffer += " ";
        this.spacing = false;
      }

      if (text != " ") {
        this.buffer += text;
      }
    }
    /**
     * Handle parsing of whitespace
     *
     * @param {string} ch  the character to check
     * @returns {boolean} true if the character was processed as whitespace, false otherwise
     */

  }, {
    key: "parseWS",
    value: function parseWS(ch) {
      if (/[ \t]/.test(ch)) {
        if (!this.mono) {
          this.spacing = true;
        } else {
          this.add(ch);
        }

        return true;
      }

      return false;
    }
    /**
     * @param {string} tagName  label for block type to set
     * @private
     */

  }, {
    key: "setTag",
    value: function setTag(tagName) {
      this.emitBlock();
      this[tagName] = true;
      this.modStack.unshift(tagName);
    }
    /**
     * @param {string} tagName  label for block type to unset
     * @private
     */

  }, {
    key: "unsetTag",
    value: function unsetTag(tagName) {
      this.emitBlock();
      this[tagName] = false;
      this.modStack.shift();
    }
    /**
     * @param {string} tagName label for block type we are currently processing
     * @param {string|RegExp} tag string to match in text
     * @returns {boolean} true if the tag was processed, false otherwise
     */

  }, {
    key: "parseStartTag",
    value: function parseStartTag(tagName, tag) {
      // Note: if 'mono' passed as tagName, there is a double check here. This is OK
      if (!this.mono && !this[tagName] && this.match(tag)) {
        this.setTag(tagName);
        return true;
      }

      return false;
    }
    /**
     * @param {string|RegExp} tag
     * @param {number} [advance=true] if set, advance current position in text
     * @returns {boolean} true if match at given position, false otherwise
     * @private
     */

  }, {
    key: "match",
    value: function match(tag) {
      var advance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _this$prepareRegExp = this.prepareRegExp(tag),
          _this$prepareRegExp2 = slicedToArray(_this$prepareRegExp, 2),
          regExp = _this$prepareRegExp2[0],
          length = _this$prepareRegExp2[1];

      var matched = regExp.test(this.text.substr(this.position, length));

      if (matched && advance) {
        this.position += length - 1;
      }

      return matched;
    }
    /**
     * @param {string} tagName label for block type we are currently processing
     * @param {string|RegExp} tag string to match in text
     * @param {RegExp} [nextTag] regular expression to match for characters *following* the current tag
     * @returns {boolean} true if the tag was processed, false otherwise
     */

  }, {
    key: "parseEndTag",
    value: function parseEndTag(tagName, tag, nextTag) {
      var checkTag = this.mod() === tagName;

      if (tagName === 'mono') {
        // special handling for 'mono'
        checkTag = checkTag && this.mono;
      } else {
        checkTag = checkTag && !this.mono;
      }

      if (checkTag && this.match(tag)) {
        if (nextTag !== undefined) {
          // Purpose of the following match is to prevent a direct unset/set of a given tag
          // E.g. '*bold **still bold*' => '*bold still bold*'
          if (this.position === this.text.length - 1 || this.match(nextTag, false)) {
            this.unsetTag(tagName);
          }
        } else {
          this.unsetTag(tagName);
        }

        return true;
      }

      return false;
    }
    /**
     * @param {string|RegExp} tag  string to match in text
     * @param {value} value  string to replace tag with, if found at current position
     * @returns {boolean} true if the tag was processed, false otherwise
     */

  }, {
    key: "replace",
    value: function replace(tag, value) {
      if (this.match(tag)) {
        this.add(value);
        this.position += length - 1;
        return true;
      }

      return false;
    }
    /**
     * Create a regular expression for the tag if it isn't already one.
     *
     * The return value is an array `[RegExp, number]`, with exactly two value, where:
     *  - RegExp is the regular expression to use
     *  - number is the lenth of the input string to match
     *
     * @param {string|RegExp} tag  string to match in text
     * @returns {Array}  regular expression to use and length of input string to match
     * @private
     */

  }, {
    key: "prepareRegExp",
    value: function prepareRegExp(tag) {
      var length;
      var regExp;

      if (tag instanceof RegExp) {
        regExp = tag;
        length = 1; // ASSUMPTION: regexp only tests one character
      } else {
        // use prepared regexp if present
        var prepared = tagPattern[tag];

        if (prepared !== undefined) {
          regExp = prepared;
        } else {
          regExp = new RegExp(tag);
        }

        length = tag.length;
      }

      return [regExp, length];
    }
  }]);

  return MarkupAccumulator;
}();
/**
 * Helper class for Label which explodes the label text into lines and blocks within lines
 *
 * @private
 */


var LabelSplitter = /*#__PURE__*/function () {
  /**
   * @param {CanvasRenderingContext2D} ctx Canvas rendering context
   * @param {Label} parent reference to the Label instance using current instance
   * @param {boolean} selected
   * @param {boolean} hover
   */
  function LabelSplitter(ctx, parent, selected, hover) {
    var _this = this;

    classCallCheck(this, LabelSplitter);

    this.ctx = ctx;
    this.parent = parent;
    this.selected = selected;
    this.hover = hover;
    /**
     * Callback to determine text width; passed to LabelAccumulator instance
     *
     * @param  {String} text string to determine width of
     * @param  {String} mod  font type to use for this text
     * @return {Object} { width, values} width in pixels and font attributes
     */

    var textWidth = function textWidth(text, mod) {
      if (text === undefined) return 0; // TODO: This can be done more efficiently with caching
      // This will set the ctx.font correctly, depending on selected/hover and mod - so that ctx.measureText() will be accurate.

      var values = _this.parent.getFormattingValues(ctx, selected, hover, mod);

      var width = 0;

      if (text !== '') {
        var measure = _this.ctx.measureText(text);

        width = measure.width;
      }

      return {
        width: width,
        values: values
      };
    };

    this.lines = new LabelAccumulator(textWidth);
  }
  /**
   * Split passed text of a label into lines and blocks.
   *
   * # NOTE
   *
   * The handling of spacing is option dependent:
   *
   * - if `font.multi : false`, all spaces are retained
   * - if `font.multi : true`, every sequence of spaces is compressed to a single space
   *
   * This might not be the best way to do it, but this is as it has been working till now.
   * In order not to break existing functionality, for the time being this behaviour will
   * be retained in any code changes.
   *
   * @param {string} text  text to split
   * @returns {Array<line>}
   */


  createClass(LabelSplitter, [{
    key: "process",
    value: function process(text) {
      if (!isValidLabel(text)) {
        return this.lines.finalize();
      }

      var font = this.parent.fontOptions; // Normalize the end-of-line's to a single representation - order important

      text = text.replace(/\r\n/g, '\n'); // Dos EOL's

      text = text.replace(/\r/g, '\n'); // Mac EOL's
      // Note that at this point, there can be no \r's in the text.
      // This is used later on splitStringIntoLines() to split multifont texts.

      var nlLines = String(text).split('\n');
      var lineCount = nlLines.length;

      if (font.multi) {
        // Multi-font case: styling tags active
        for (var i = 0; i < lineCount; i++) {
          var blocks = this.splitBlocks(nlLines[i], font.multi); // Post: Sequences of tabs and spaces are reduced to single space

          if (blocks === undefined) continue;

          if (blocks.length === 0) {
            this.lines.newLine("");
            continue;
          }

          if (font.maxWdt > 0) {
            // widthConstraint.maximum defined
            //console.log('Running widthConstraint multi, max: ' + this.fontOptions.maxWdt);
            for (var j = 0; j < blocks.length; j++) {
              var mod = blocks[j].mod;
              var _text = blocks[j].text;
              this.splitStringIntoLines(_text, mod, true);
            }
          } else {
            // widthConstraint.maximum NOT defined
            for (var _j = 0; _j < blocks.length; _j++) {
              var _mod = blocks[_j].mod;
              var _text2 = blocks[_j].text;
              this.lines.append(_text2, _mod);
            }
          }

          this.lines.newLine();
        }
      } else {
        // Single-font case
        if (font.maxWdt > 0) {
          // widthConstraint.maximum defined
          // console.log('Running widthConstraint normal, max: ' + this.fontOptions.maxWdt);
          for (var _i = 0; _i < lineCount; _i++) {
            this.splitStringIntoLines(nlLines[_i]);
          }
        } else {
          // widthConstraint.maximum NOT defined
          for (var _i2 = 0; _i2 < lineCount; _i2++) {
            this.lines.newLine(nlLines[_i2]);
          }
        }
      }

      return this.lines.finalize();
    }
    /**
     * normalize the markup system
     *
     * @param {boolean|'md'|'markdown'|'html'} markupSystem
     * @returns {string}
     */

  }, {
    key: "decodeMarkupSystem",
    value: function decodeMarkupSystem(markupSystem) {
      var system = 'none';

      if (markupSystem === 'markdown' || markupSystem === 'md') {
        system = 'markdown';
      } else if (markupSystem === true || markupSystem === 'html') {
        system = 'html';
      }

      return system;
    }
    /**
     *
     * @param {string} text
     * @returns {Array}
     */

  }, {
    key: "splitHtmlBlocks",
    value: function splitHtmlBlocks(text) {
      var s = new MarkupAccumulator(text);

      var parseEntities = function parseEntities(ch) {
        if (/&/.test(ch)) {
          var parsed = s.replace(s.text, '&lt;', '<') || s.replace(s.text, '&amp;', '&');

          if (!parsed) {
            s.add("&");
          }

          return true;
        }

        return false;
      };

      while (s.position < s.text.length) {
        var ch = s.text.charAt(s.position);
        var parsed = s.parseWS(ch) || /</.test(ch) && (s.parseStartTag('bold', '<b>') || s.parseStartTag('ital', '<i>') || s.parseStartTag('mono', '<code>') || s.parseEndTag('bold', '</b>') || s.parseEndTag('ital', '</i>') || s.parseEndTag('mono', '</code>')) || parseEntities(ch);

        if (!parsed) {
          s.add(ch);
        }

        s.position++;
      }

      s.emitBlock();
      return s.blocks;
    }
    /**
     *
     * @param {string} text
     * @returns {Array}
     */

  }, {
    key: "splitMarkdownBlocks",
    value: function splitMarkdownBlocks(text) {
      var _this2 = this;

      var s = new MarkupAccumulator(text);
      var beginable = true;

      var parseOverride = function parseOverride(ch) {
        if (/\\/.test(ch)) {
          if (s.position < _this2.text.length + 1) {
            s.position++;
            ch = _this2.text.charAt(s.position);

            if (/ \t/.test(ch)) {
              s.spacing = true;
            } else {
              s.add(ch);
              beginable = false;
            }
          }

          return true;
        }

        return false;
      };

      while (s.position < s.text.length) {
        var ch = s.text.charAt(s.position);
        var parsed = s.parseWS(ch) || parseOverride(ch) || (beginable || s.spacing) && (s.parseStartTag('bold', '*') || s.parseStartTag('ital', '_') || s.parseStartTag('mono', '`')) || s.parseEndTag('bold', '*', 'afterBold') || s.parseEndTag('ital', '_', 'afterItal') || s.parseEndTag('mono', '`', 'afterMono');

        if (!parsed) {
          s.add(ch);
          beginable = false;
        }

        s.position++;
      }

      s.emitBlock();
      return s.blocks;
    }
    /**
     * Explodes a piece of text into single-font blocks using a given markup
     *
     * @param {string} text
     * @param {boolean|'md'|'markdown'|'html'} markupSystem
     * @returns {Array.<{text: string, mod: string}>}
     * @private
     */

  }, {
    key: "splitBlocks",
    value: function splitBlocks(text, markupSystem) {
      var system = this.decodeMarkupSystem(markupSystem);

      if (system === 'none') {
        return [{
          text: text,
          mod: 'normal'
        }];
      } else if (system === 'markdown') {
        return this.splitMarkdownBlocks(text);
      } else if (system === 'html') {
        return this.splitHtmlBlocks(text);
      }
    }
    /**
     * @param {string} text
     * @returns {boolean} true if text length over the current max with
     * @private
     */

  }, {
    key: "overMaxWidth",
    value: function overMaxWidth(text) {
      var width = this.ctx.measureText(text).width;
      return this.lines.curWidth() + width > this.parent.fontOptions.maxWdt;
    }
    /**
     * Determine the longest part of the sentence which still fits in the
     * current max width.
     *
     * @param {Array} words  Array of strings signifying a text lines
     * @return {number}      index of first item in string making string go over max
     * @private
     */

  }, {
    key: "getLongestFit",
    value: function getLongestFit(words) {
      var text = '';
      var w = 0;

      while (w < words.length) {
        var pre = text === '' ? '' : ' ';
        var newText = text + pre + words[w];
        if (this.overMaxWidth(newText)) break;
        text = newText;
        w++;
      }

      return w;
    }
    /**
     * Determine the longest part of the string which still fits in the
     * current max width.
     *
     * @param {Array} words Array of strings signifying a text lines
     * @return {number} index of first item in string making string go over max
     */

  }, {
    key: "getLongestFitWord",
    value: function getLongestFitWord(words) {
      var w = 0;

      while (w < words.length) {
        if (this.overMaxWidth(slice$5(words).call(words, 0, w))) break;
        w++;
      }

      return w;
    }
    /**
     * Split the passed text into lines, according to width constraint (if any).
     *
     * The method assumes that the input string is a single line, i.e. without lines break.
     *
     * This method retains spaces, if still present (case `font.multi: false`).
     * A space which falls on an internal line break, will be replaced by a newline.
     * There is no special handling of tabs; these go along with the flow.
     *
     * @param {string} str
     * @param {string} [mod='normal']
     * @param {boolean} [appendLast=false]
     * @private
     */

  }, {
    key: "splitStringIntoLines",
    value: function splitStringIntoLines(str) {
      var mod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
      var appendLast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Set the canvas context font, based upon the current selected/hover state
      // and the provided mod, so the text measurement performed by getLongestFit
      // will be accurate - and not just use the font of whoever last used the canvas.
      this.parent.getFormattingValues(this.ctx, this.selected, this.hover, mod); // Still-present spaces are relevant, retain them

      str = str.replace(/^( +)/g, '$1\r');
      str = str.replace(/([^\r][^ ]*)( +)/g, '$1\r$2\r');
      var words = str.split('\r');

      while (words.length > 0) {
        var w = this.getLongestFit(words);

        if (w === 0) {
          // Special case: the first word is already larger than the max width.
          var word = words[0]; // Break the word to the largest part that fits the line

          var x = this.getLongestFitWord(word);
          this.lines.newLine(slice$5(word).call(word, 0, x), mod); // Adjust the word, so that the rest will be done next iteration

          words[0] = slice$5(word).call(word, x);
        } else {
          // skip any space that is replaced by a newline
          var newW = w;

          if (words[w - 1] === ' ') {
            w--;
          } else if (words[newW] === ' ') {
            newW++;
          }

          var text = slice$5(words).call(words, 0, w).join("");

          if (w == words.length && appendLast) {
            this.lines.append(text, mod);
          } else {
            this.lines.newLine(text, mod);
          } // Adjust the word, so that the rest will be done next iteration


          words = slice$5(words).call(words, newW);
        }
      }
    }
  }]);

  return LabelSplitter;
}();

/**
 * List of special styles for multi-fonts
 * @private
 */

var multiFontStyle = ['bold', 'ital', 'boldital', 'mono'];
/**
 * A Label to be used for Nodes or Edges.
 */

var Label = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Object} options
   * @param {boolean} [edgelabel=false]
   */
  function Label(body, options) {
    var edgelabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    classCallCheck(this, Label);

    this.body = body;
    this.pointToSelf = false;
    this.baseSize = undefined;
    this.fontOptions = {}; // instance variable containing the *instance-local* font options

    this.setOptions(options);
    this.size = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      yLine: 0
    };
    this.isEdgeLabel = edgelabel;
  }
  /**
   * @param {Object} options the options of the parent Node-instance
   */


  createClass(Label, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.elementOptions = options; // Reference to the options of the parent Node-instance

      this.initFontOptions(options.font);

      if (isValidLabel(options.label)) {
        this.labelDirty = true;
      } else {
        // Bad label! Change the option value to prevent bad stuff happening
        options.label = undefined;
      }

      if (options.font !== undefined && options.font !== null) {
        // font options can be deleted at various levels
        if (typeof options.font === 'string') {
          this.baseSize = this.fontOptions.size;
        } else if (_typeof_1(options.font) === 'object') {
          var size = options.font.size;

          if (size !== undefined) {
            this.baseSize = size;
          }
        }
      }
    }
    /**
     * Init the font Options structure.
     *
     * Member fontOptions serves as an accumulator for the current font options.
     * As such, it needs to be completely separated from the node options.
     *
     * @param {Object} newFontOptions the new font options to process
     * @private
     */

  }, {
    key: "initFontOptions",
    value: function initFontOptions(newFontOptions) {
      var _this = this;

      // Prepare the multi-font option objects.
      // These will be filled in propagateFonts(), if required
      forEach$3(multiFontStyle, function (style) {
        _this.fontOptions[style] = {};
      }); // Handle shorthand option, if present

      if (Label.parseFontString(this.fontOptions, newFontOptions)) {
        this.fontOptions.vadjust = 0;
        return;
      } // Copy over the non-multifont options, if specified


      forEach$3(newFontOptions, function (prop, n) {
        if (prop !== undefined && prop !== null && _typeof_1(prop) !== 'object') {
          _this.fontOptions[n] = prop;
        }
      });
    }
    /**
     * If in-variable is a string, parse it as a font specifier.
     *
     * Note that following is not done here and have to be done after the call:
     * - Not all font options are set (vadjust, mod)
     *
     * @param {Object} outOptions  out-parameter, object in which to store the parse results (if any)
     * @param {Object} inOptions  font options to parse
     * @return {boolean} true if font parsed as string, false otherwise
     * @static
     */

  }, {
    key: "constrain",

    /**
     * Set the width and height constraints based on 'nearest' value
     *
     * @param {Array} pile array of option objects to consider
     * @returns {object} the actual constraint values to use
     * @private
     */
    value: function constrain(pile) {
      // NOTE: constrainWidth and  constrainHeight never set!
      // NOTE: for edge labels, only 'maxWdt' set
      // Node labels can set all the fields
      var fontOptions = {
        constrainWidth: false,
        maxWdt: -1,
        minWdt: -1,
        constrainHeight: false,
        minHgt: -1,
        valign: 'middle'
      };
      var widthConstraint = topMost(pile, 'widthConstraint');

      if (typeof widthConstraint === 'number') {
        fontOptions.maxWdt = Number(widthConstraint);
        fontOptions.minWdt = Number(widthConstraint);
      } else if (_typeof_1(widthConstraint) === 'object') {
        var widthConstraintMaximum = topMost(pile, ['widthConstraint', 'maximum']);

        if (typeof widthConstraintMaximum === 'number') {
          fontOptions.maxWdt = Number(widthConstraintMaximum);
        }

        var widthConstraintMinimum = topMost(pile, ['widthConstraint', 'minimum']);

        if (typeof widthConstraintMinimum === 'number') {
          fontOptions.minWdt = Number(widthConstraintMinimum);
        }
      }

      var heightConstraint = topMost(pile, 'heightConstraint');

      if (typeof heightConstraint === 'number') {
        fontOptions.minHgt = Number(heightConstraint);
      } else if (_typeof_1(heightConstraint) === 'object') {
        var heightConstraintMinimum = topMost(pile, ['heightConstraint', 'minimum']);

        if (typeof heightConstraintMinimum === 'number') {
          fontOptions.minHgt = Number(heightConstraintMinimum);
        }

        var heightConstraintValign = topMost(pile, ['heightConstraint', 'valign']);

        if (typeof heightConstraintValign === 'string') {
          if (heightConstraintValign === 'top' || heightConstraintValign === 'bottom') {
            fontOptions.valign = heightConstraintValign;
          }
        }
      }

      return fontOptions;
    }
    /**
     * Set options and update internal state
     *
     * @param {Object} options  options to set
     * @param {Array}  pile     array of option objects to consider for option 'chosen'
     */

  }, {
    key: "update",
    value: function update(options, pile) {
      this.setOptions(options, true);
      this.propagateFonts(pile);
      deepExtend(this.fontOptions, this.constrain(pile));
      this.fontOptions.chooser = choosify('label', pile);
    }
    /**
     * When margins are set in an element, adjust sizes is called to remove them
     * from the width/height constraints. This must be done prior to label sizing.
     *
     * @param {{top: number, right: number, bottom: number, left: number}} margins
     */

  }, {
    key: "adjustSizes",
    value: function adjustSizes(margins) {
      var widthBias = margins ? margins.right + margins.left : 0;

      if (this.fontOptions.constrainWidth) {
        this.fontOptions.maxWdt -= widthBias;
        this.fontOptions.minWdt -= widthBias;
      }

      var heightBias = margins ? margins.top + margins.bottom : 0;

      if (this.fontOptions.constrainHeight) {
        this.fontOptions.minHgt -= heightBias;
      }
    } /////////////////////////////////////////////////////////
    // Methods for handling options piles
    // Eventually, these will be moved to a separate class
    /////////////////////////////////////////////////////////

    /**
     * Add the font members of the passed list of option objects to the pile.
     *
     * @param {Pile} dstPile  pile of option objects add to
     * @param {Pile} srcPile  pile of option objects to take font options from
     * @private
     */

  }, {
    key: "addFontOptionsToPile",
    value: function addFontOptionsToPile(dstPile, srcPile) {
      for (var i = 0; i < srcPile.length; ++i) {
        this.addFontToPile(dstPile, srcPile[i]);
      }
    }
    /**
     * Add given font option object to the list of objects (the 'pile') to consider for determining
     * multi-font option values.
     *
     * @param {Pile} pile  pile of option objects to use
     * @param {object} options  instance to add to pile
     * @private
     */

  }, {
    key: "addFontToPile",
    value: function addFontToPile(pile, options) {
      if (options === undefined) return;
      if (options.font === undefined || options.font === null) return;
      var item = options.font;
      pile.push(item);
    }
    /**
     * Collect all own-property values from the font pile that aren't multi-font option objectss.
     *
     * @param {Pile} pile  pile of option objects to use
     * @returns {object} object with all current own basic font properties
     * @private
     */

  }, {
    key: "getBasicOptions",
    value: function getBasicOptions(pile) {
      var ret = {}; // Scans the whole pile to get all options present

      for (var n = 0; n < pile.length; ++n) {
        var fontOptions = pile[n]; // Convert shorthand if necessary

        var tmpShorthand = {};

        if (Label.parseFontString(tmpShorthand, fontOptions)) {
          fontOptions = tmpShorthand;
        }

        forEach$3(fontOptions, function (opt, name) {
          if (opt === undefined) return; // multi-font option need not be present

          if (Object.prototype.hasOwnProperty.call(ret, name)) return; // Keep first value we encounter

          if (indexOf$3(multiFontStyle).call(multiFontStyle, name) !== -1) {
            // Skip multi-font properties but we do need the structure
            ret[name] = {};
          } else {
            ret[name] = opt;
          }
        });
      }

      return ret;
    }
    /**
     * Return the value for given option for the given multi-font.
     *
     * All available option objects are trawled in the set order to construct the option values.
     *
     * ---------------------------------------------------------------------
     * ## Traversal of pile for multi-fonts
     *
     * The determination of multi-font option values is a special case, because any values not
     * present in the multi-font options should by definition be taken from the main font options,
     * i.e. from the current 'parent' object of the multi-font option.
     *
     * ### Search order for multi-fonts
     *
     * 'bold' used as example:
     *
     *   - search in option group 'bold' in local properties
     *   - search in main font option group in local properties
     *
     * ---------------------------------------------------------------------
     *
     * @param {Pile} pile  pile of option objects to use
     * @param {MultiFontStyle} multiName sub path for the multi-font
     * @param {string} option  the option to search for, for the given multi-font
     * @returns {string|number} the value for the given option
     * @private
     */

  }, {
    key: "getFontOption",
    value: function getFontOption(pile, multiName, option) {
      var multiFont; // Search multi font in local properties

      for (var n = 0; n < pile.length; ++n) {
        var fontOptions = pile[n];

        if (Object.prototype.hasOwnProperty.call(fontOptions, multiName)) {
          multiFont = fontOptions[multiName];
          if (multiFont === undefined || multiFont === null) continue; // Convert shorthand if necessary
          // TODO: inefficient to do this conversion every time; find a better way.

          var tmpShorthand = {};

          if (Label.parseFontString(tmpShorthand, multiFont)) {
            multiFont = tmpShorthand;
          }

          if (Object.prototype.hasOwnProperty.call(multiFont, option)) {
            return multiFont[option];
          }
        }
      } // Option is not mentioned in the multi font options; take it from the parent font options.
      // These have already been converted with getBasicOptions(), so use the converted values.


      if (Object.prototype.hasOwnProperty.call(this.fontOptions, option)) {
        return this.fontOptions[option];
      } // A value **must** be found; you should never get here.


      throw new Error("Did not find value for multi-font for property: '" + option + "'");
    }
    /**
     * Return all options values for the given multi-font.
     *
     * All available option objects are trawled in the set order to construct the option values.
     *
     * @param {Pile} pile  pile of option objects to use
     * @param {MultiFontStyle} multiName sub path for the mod-font
     * @returns {MultiFontOptions}
     * @private
     */

  }, {
    key: "getFontOptions",
    value: function getFontOptions(pile, multiName) {
      var result = {};
      var optionNames = ['color', 'size', 'face', 'mod', 'vadjust']; // List of allowed options per multi-font

      for (var i = 0; i < optionNames.length; ++i) {
        var mod = optionNames[i];
        result[mod] = this.getFontOption(pile, multiName, mod);
      }

      return result;
    } /////////////////////////////////////////////////////////
    // End methods for handling options piles
    /////////////////////////////////////////////////////////

    /**
     * Collapse the font options for the multi-font to single objects, from
     * the chain of option objects passed (the 'pile').
     *
     * @param {Pile} pile  sequence of option objects to consider.
     *                     First item in list assumed to be the newly set options.
     */

  }, {
    key: "propagateFonts",
    value: function propagateFonts(pile) {
      var _this2 = this;

      var fontPile = []; // sequence of font objects to consider, order important
      // Note that this.elementOptions is not used here.

      this.addFontOptionsToPile(fontPile, pile);
      this.fontOptions = this.getBasicOptions(fontPile); // We set multifont values even if multi === false, for consistency (things break otherwise)

      var _loop = function _loop(i) {
        var mod = multiFontStyle[i];
        var modOptions = _this2.fontOptions[mod];

        var tmpMultiFontOptions = _this2.getFontOptions(fontPile, mod); // Copy over found values


        forEach$3(tmpMultiFontOptions, function (option, n) {
          modOptions[n] = option;
        });
        modOptions.size = Number(modOptions.size);
        modOptions.vadjust = Number(modOptions.vadjust);
      };

      for (var i = 0; i < multiFontStyle.length; ++i) {
        _loop(i);
      }
    }
    /**
     * Main function. This is called from anything that wants to draw a label.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {string} [baseline='middle']
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover) {
      var baseline = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'middle';
      // if no label, return
      if (this.elementOptions.label === undefined) return; // check if we have to render the label

      var viewFontSize = this.fontOptions.size * this.body.view.scale;
      if (this.elementOptions.label && viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1) return; // This ensures that there will not be HUGE letters on screen
      // by setting an upper limit on the visible text size (regardless of zoomLevel)

      if (viewFontSize >= this.elementOptions.scaling.label.maxVisible) {
        viewFontSize = Number(this.elementOptions.scaling.label.maxVisible) / this.body.view.scale;
      } // update the size cache if required


      this.calculateLabelSize(ctx, selected, hover, x, y, baseline);

      this._drawBackground(ctx);

      this._drawText(ctx, x, this.size.yLine, baseline, viewFontSize);
    }
    /**
     * Draws the label background
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */

  }, {
    key: "_drawBackground",
    value: function _drawBackground(ctx) {
      if (this.fontOptions.background !== undefined && this.fontOptions.background !== "none") {
        ctx.fillStyle = this.fontOptions.background;
        var size = this.getSize();
        ctx.fillRect(size.left, size.top, size.width, size.height);
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @param {string} [baseline='middle']
     * @param {number} viewFontSize
     * @private
     */

  }, {
    key: "_drawText",
    value: function _drawText(ctx, x, y) {
      var baseline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'middle';
      var viewFontSize = arguments.length > 4 ? arguments[4] : undefined;

      var _this$_setAlignment = this._setAlignment(ctx, x, y, baseline);

      var _this$_setAlignment2 = slicedToArray(_this$_setAlignment, 2);

      x = _this$_setAlignment2[0];
      y = _this$_setAlignment2[1];
      ctx.textAlign = 'left';
      x = x - this.size.width / 2; // Shift label 1/2-distance to the left

      if (this.fontOptions.valign && this.size.height > this.size.labelHeight) {
        if (this.fontOptions.valign === 'top') {
          y -= (this.size.height - this.size.labelHeight) / 2;
        }

        if (this.fontOptions.valign === 'bottom') {
          y += (this.size.height - this.size.labelHeight) / 2;
        }
      } // draw the text


      for (var i = 0; i < this.lineCount; i++) {
        var line = this.lines[i];

        if (line && line.blocks) {
          var width = 0;

          if (this.isEdgeLabel || this.fontOptions.align === 'center') {
            width += (this.size.width - line.width) / 2;
          } else if (this.fontOptions.align === 'right') {
            width += this.size.width - line.width;
          }

          for (var j = 0; j < line.blocks.length; j++) {
            var block = line.blocks[j];
            ctx.font = block.font;

            var _this$_getColor = this._getColor(block.color, viewFontSize, block.strokeColor),
                _this$_getColor2 = slicedToArray(_this$_getColor, 2),
                fontColor = _this$_getColor2[0],
                strokeColor = _this$_getColor2[1];

            if (block.strokeWidth > 0) {
              ctx.lineWidth = block.strokeWidth;
              ctx.strokeStyle = strokeColor;
              ctx.lineJoin = 'round';
            }

            ctx.fillStyle = fontColor;

            if (block.strokeWidth > 0) {
              ctx.strokeText(block.text, x + width, y + block.vadjust);
            }

            ctx.fillText(block.text, x + width, y + block.vadjust);
            width += block.width;
          }

          y += line.height;
        }
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @param {string} baseline
     * @returns {Array.<number>}
     * @private
     */

  }, {
    key: "_setAlignment",
    value: function _setAlignment(ctx, x, y, baseline) {
      // check for label alignment (for edges)
      // TODO: make alignment for nodes
      if (this.isEdgeLabel && this.fontOptions.align !== 'horizontal' && this.pointToSelf === false) {
        x = 0;
        y = 0;
        var lineMargin = 2;

        if (this.fontOptions.align === 'top') {
          ctx.textBaseline = 'alphabetic';
          y -= 2 * lineMargin; // distance from edge, required because we use alphabetic. Alphabetic has less difference between browsers
        } else if (this.fontOptions.align === 'bottom') {
          ctx.textBaseline = 'hanging';
          y += 2 * lineMargin; // distance from edge, required because we use hanging. Hanging has less difference between browsers
        } else {
          ctx.textBaseline = 'middle';
        }
      } else {
        ctx.textBaseline = baseline;
      }

      return [x, y];
    }
    /**
     * fade in when relative scale is between threshold and threshold - 1.
     * If the relative scale would be smaller than threshold -1 the draw function would have returned before coming here.
     *
     * @param {string} color  The font color to use
     * @param {number} viewFontSize
     * @param {string} initialStrokeColor
     * @returns {Array.<string>} An array containing the font color and stroke color
     * @private
     */

  }, {
    key: "_getColor",
    value: function _getColor(color, viewFontSize, initialStrokeColor) {
      var fontColor = color || '#000000';
      var strokeColor = initialStrokeColor || '#ffffff';

      if (viewFontSize <= this.elementOptions.scaling.label.drawThreshold) {
        var opacity = Math.max(0, Math.min(1, 1 - (this.elementOptions.scaling.label.drawThreshold - viewFontSize)));
        fontColor = overrideOpacity(fontColor, opacity);
        strokeColor = overrideOpacity(strokeColor, opacity);
      }

      return [fontColor, strokeColor];
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @returns {{width: number, height: number}}
     */

  }, {
    key: "getTextSize",
    value: function getTextSize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._processLabel(ctx, selected, hover);

      return {
        width: this.size.width,
        height: this.size.height,
        lineCount: this.lineCount
      };
    }
    /**
     * Get the current dimensions of the label
     *
     * @return {rect}
     */

  }, {
    key: "getSize",
    value: function getSize() {
      var lineMargin = 2;
      var x = this.size.left; // default values which might be overridden below

      var y = this.size.top - 0.5 * lineMargin; // idem

      if (this.isEdgeLabel) {
        var x2 = -this.size.width * 0.5;

        switch (this.fontOptions.align) {
          case 'middle':
            x = x2;
            y = -this.size.height * 0.5;
            break;

          case 'top':
            x = x2;
            y = -(this.size.height + lineMargin);
            break;

          case 'bottom':
            x = x2;
            y = lineMargin;
            break;
        }
      }

      var ret = {
        left: x,
        top: y,
        width: this.size.width,
        height: this.size.height
      };
      return ret;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {'middle'|'hanging'} [baseline='middle']
     */

  }, {
    key: "calculateLabelSize",
    value: function calculateLabelSize(ctx, selected, hover) {
      var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var baseline = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'middle';

      this._processLabel(ctx, selected, hover);

      this.size.left = x - this.size.width * 0.5;
      this.size.top = y - this.size.height * 0.5;
      this.size.yLine = y + (1 - this.lineCount) * 0.5 * this.fontOptions.size;

      if (baseline === "hanging") {
        this.size.top += 0.5 * this.fontOptions.size;
        this.size.top += 4; // distance from node, required because we use hanging. Hanging has less difference between browsers

        this.size.yLine += 4; // distance from node
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {string} mod
     * @returns {{color, size, face, mod, vadjust, strokeWidth: *, strokeColor: (*|string|allOptions.edges.font.strokeColor|{string}|allOptions.nodes.font.strokeColor|Array)}}
     */

  }, {
    key: "getFormattingValues",
    value: function getFormattingValues(ctx, selected, hover, mod) {
      var getValue = function getValue(fontOptions, mod, option) {
        if (mod === "normal") {
          if (option === 'mod') return "";
          return fontOptions[option];
        }

        if (fontOptions[mod][option] !== undefined) {
          // Grumbl leaving out test on undefined equals false for ""
          return fontOptions[mod][option];
        } else {
          // Take from parent font option
          return fontOptions[option];
        }
      };

      var values = {
        color: getValue(this.fontOptions, mod, 'color'),
        size: getValue(this.fontOptions, mod, 'size'),
        face: getValue(this.fontOptions, mod, 'face'),
        mod: getValue(this.fontOptions, mod, 'mod'),
        vadjust: getValue(this.fontOptions, mod, 'vadjust'),
        strokeWidth: this.fontOptions.strokeWidth,
        strokeColor: this.fontOptions.strokeColor
      };

      if (selected || hover) {
        if (mod === "normal" && this.fontOptions.chooser === true && this.elementOptions.labelHighlightBold) {
          values.mod = 'bold';
        } else {
          if (typeof this.fontOptions.chooser === 'function') {
            this.fontOptions.chooser(values, this.elementOptions.id, selected, hover);
          }
        }
      }

      var fontString = "";

      if (values.mod !== undefined && values.mod !== "") {
        // safeguard for undefined - this happened
        fontString += values.mod + " ";
      }

      fontString += values.size + "px " + values.face;
      ctx.font = fontString.replace(/"/g, "");
      values.font = ctx.font;
      values.height = values.size;
      return values;
    }
    /**
     *
     * @param {boolean} selected
     * @param {boolean} hover
     * @returns {boolean}
     */

  }, {
    key: "differentState",
    value: function differentState(selected, hover) {
      return selected !== this.selectedState || hover !== this.hoverState;
    }
    /**
     * This explodes the passed text into lines and determines the width, height and number of lines.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {string} inText  the text to explode
     * @returns {{width, height, lines}|*}
     * @private
     */

  }, {
    key: "_processLabelText",
    value: function _processLabelText(ctx, selected, hover, inText) {
      var splitter = new LabelSplitter(ctx, this, selected, hover);
      return splitter.process(inText);
    }
    /**
     * This explodes the label string into lines and sets the width, height and number of lines.
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @private
     */

  }, {
    key: "_processLabel",
    value: function _processLabel(ctx, selected, hover) {
      if (this.labelDirty === false && !this.differentState(selected, hover)) return;

      var state = this._processLabelText(ctx, selected, hover, this.elementOptions.label);

      if (this.fontOptions.minWdt > 0 && state.width < this.fontOptions.minWdt) {
        state.width = this.fontOptions.minWdt;
      }

      this.size.labelHeight = state.height;

      if (this.fontOptions.minHgt > 0 && state.height < this.fontOptions.minHgt) {
        state.height = this.fontOptions.minHgt;
      }

      this.lines = state.lines;
      this.lineCount = state.lines.length;
      this.size.width = state.width;
      this.size.height = state.height;
      this.selectedState = selected;
      this.hoverState = hover;
      this.labelDirty = false;
    }
    /**
     * Check if this label is visible
     *
     * @return {boolean} true if this label will be show, false otherwise
     */

  }, {
    key: "visible",
    value: function visible() {
      if (this.size.width === 0 || this.size.height === 0 || this.elementOptions.label === undefined) {
        return false; // nothing to display
      }

      var viewFontSize = this.fontOptions.size * this.body.view.scale;

      if (viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1) {
        return false; // Too small or too far away to show
      }

      return true;
    }
  }], [{
    key: "parseFontString",
    value: function parseFontString(outOptions, inOptions) {
      if (!inOptions || typeof inOptions !== 'string') return false;
      var newOptionsArray = inOptions.split(" ");
      outOptions.size = +newOptionsArray[0].replace("px", '');
      outOptions.face = newOptionsArray[1];
      outOptions.color = newOptionsArray[2];
      return true;
    }
  }]);

  return Label;
}();

var nativeConstruct = getBuiltIn('Reflect', 'construct'); // `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it

var NEW_TARGET_BUG = fails(function () {
  function F() {
    /* empty */
  }

  return !(nativeConstruct(function () {
    /* empty */
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () {
    /* empty */
  });
});
var FORCED$4 = NEW_TARGET_BUG || ARGS_BUG;
_export({
  target: 'Reflect',
  stat: true,
  forced: FORCED$4,
  sham: FORCED$4
}, {
  construct: function construct(Target, args
  /* , newTarget */
  ) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);

    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();

        case 1:
          return new Target(args[0]);

        case 2:
          return new Target(args[0], args[1]);

        case 3:
          return new Target(args[0], args[1], args[2]);

        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      } // w/o altered newTarget, lot of arguments case


      var $args = [null];
      $args.push.apply($args, args);
      return new (functionBind.apply(Target, $args))();
    } // with altered newTarget, not support built-in constructors


    var proto = newTarget.prototype;
    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

var construct$1 = path.Reflect.construct;

var construct$2 = construct$1;

var construct$3 = construct$2;

var create$3 = create;

var create$4 = create$3;

// https://tc39.github.io/ecma262/#sec-object.setprototypeof

_export({
  target: 'Object',
  stat: true
}, {
  setPrototypeOf: objectSetPrototypeOf
});

var setPrototypeOf = path.Object.setPrototypeOf;

var setPrototypeOf$1 = setPrototypeOf;

var setPrototypeOf$2 = setPrototypeOf$1;

var setPrototypeOf$3 = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create$4(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf$3(subClass, superClass);
}

var inherits = _inherits;

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized$1;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf$3 = getPrototypeOf;

var getPrototypeOf$4 = getPrototypeOf$3;

var getPrototypeOf$5 = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$4 : function _getPrototypeOf(o) {
      return o.__proto__ || getPrototypeOf$4(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

// https://tc39.github.io/ecma262/#sec-array.prototype.fill


var arrayFill = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) O[index++] = value;

  return O;
};

// https://tc39.github.io/ecma262/#sec-array.prototype.fill

_export({
  target: 'Array',
  proto: true
}, {
  fill: arrayFill
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

var fill = entryVirtual('Array').fill;

var ArrayPrototype$b = Array.prototype;

var fill_1 = function (it) {
  var own = it.fill;
  return it === ArrayPrototype$b || it instanceof Array && own === ArrayPrototype$b.fill ? fill : own;
};

var fill$1 = fill_1;

var fill$2 = fill$1;

/**
 * The Base class for all Nodes.
 */
var NodeBase = /*#__PURE__*/function () {
  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function NodeBase(options, body, labelModule) {
    classCallCheck(this, NodeBase);

    this.body = body;
    this.labelModule = labelModule;
    this.setOptions(options);
    this.top = undefined;
    this.left = undefined;
    this.height = undefined;
    this.width = undefined;
    this.radius = undefined;
    this.margin = undefined;
    this.refreshNeeded = true;
    this.boundingBox = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
  }
  /**
   *
   * @param {Object} options
   */


  createClass(NodeBase, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
    /**
     *
     * @param {Label} labelModule
     * @private
     */

  }, {
    key: "_setMargins",
    value: function _setMargins(labelModule) {
      this.margin = {};

      if (this.options.margin) {
        if (_typeof_1(this.options.margin) == 'object') {
          this.margin.top = this.options.margin.top;
          this.margin.right = this.options.margin.right;
          this.margin.bottom = this.options.margin.bottom;
          this.margin.left = this.options.margin.left;
        } else {
          this.margin.top = this.options.margin;
          this.margin.right = this.options.margin;
          this.margin.bottom = this.options.margin;
          this.margin.left = this.options.margin;
        }
      }

      labelModule.adjustSizes(this.margin);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     * @private
     */

  }, {
    key: "_distanceToBorder",
    value: function _distanceToBorder(ctx, angle) {
      var borderWidth = this.options.borderWidth;

      if (ctx) {
        this.resize(ctx);
      }

      return Math.min(Math.abs(this.width / 2 / Math.cos(angle)), Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "enableShadow",
    value: function enableShadow(ctx, values) {
      if (values.shadow) {
        ctx.shadowColor = values.shadowColor;
        ctx.shadowBlur = values.shadowSize;
        ctx.shadowOffsetX = values.shadowX;
        ctx.shadowOffsetY = values.shadowY;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "disableShadow",
    value: function disableShadow(ctx, values) {
      if (values.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0)';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "enableBorderDashes",
    value: function enableBorderDashes(ctx, values) {
      if (values.borderDashes !== false) {
        if (ctx.setLineDash !== undefined) {
          var dashes = values.borderDashes;

          if (dashes === true) {
            dashes = [5, 15];
          }

          ctx.setLineDash(dashes);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used.");
          this.options.shapeProperties.borderDashes = false;
          values.borderDashes = false;
        }
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "disableBorderDashes",
    value: function disableBorderDashes(ctx, values) {
      if (values.borderDashes !== false) {
        if (ctx.setLineDash !== undefined) {
          ctx.setLineDash([0]);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used.");
          this.options.shapeProperties.borderDashes = false;
          values.borderDashes = false;
        }
      }
    }
    /**
     * Determine if the shape of a node needs to be recalculated.
     *
     * @param {boolean} selected
     * @param {boolean} hover
     * @returns {boolean}
     * @protected
     */

  }, {
    key: "needsRefresh",
    value: function needsRefresh(selected, hover) {
      if (this.refreshNeeded === true) {
        // This is probably not the best location to reset this member.
        // However, in the current logic, it is the most convenient one.
        this.refreshNeeded = false;
        return true;
      }

      return this.width === undefined || this.labelModule.differentState(selected, hover);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "initContextForDraw",
    value: function initContextForDraw(ctx, values) {
      var borderWidth = values.borderWidth / this.body.view.scale;
      ctx.lineWidth = Math.min(this.width, borderWidth);
      ctx.strokeStyle = values.borderColor;
      ctx.fillStyle = values.color;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "performStroke",
    value: function performStroke(ctx, values) {
      var borderWidth = values.borderWidth / this.body.view.scale; //draw dashed border if enabled, save and restore is required for firefox not to crash on unix.

      ctx.save(); // if borders are zero width, they will be drawn with width 1 by default. This prevents that

      if (borderWidth > 0) {
        this.enableBorderDashes(ctx, values); //draw the border

        ctx.stroke(); //disable dashed border for other elements

        this.disableBorderDashes(ctx, values);
      }

      ctx.restore();
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     */

  }, {
    key: "performFill",
    value: function performFill(ctx, values) {
      ctx.save();
      ctx.fillStyle = values.color; // draw shadow if enabled

      this.enableShadow(ctx, values); // draw the background

      fill$2(ctx).call(ctx); // disable shadows for other elements.


      this.disableShadow(ctx, values);
      ctx.restore();
      this.performStroke(ctx, values);
    }
    /**
     *
     * @param {number} margin
     * @private
     */

  }, {
    key: "_addBoundingBoxMargin",
    value: function _addBoundingBoxMargin(margin) {
      this.boundingBox.left -= margin;
      this.boundingBox.top -= margin;
      this.boundingBox.bottom += margin;
      this.boundingBox.right += margin;
    }
    /**
     * Actual implementation of this method call.
     *
     * Doing it like this makes it easier to override
     * in the child classes.
     *
     * @param {number} x width
     * @param {number} y height
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     * @private
     */

  }, {
    key: "_updateBoundingBox",
    value: function _updateBoundingBox(x, y, ctx, selected, hover) {
      if (ctx !== undefined) {
        this.resize(ctx, selected, hover);
      }

      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
      this.boundingBox.left = this.left;
      this.boundingBox.top = this.top;
      this.boundingBox.bottom = this.top + this.height;
      this.boundingBox.right = this.left + this.width;
    }
    /**
     * Default implementation of this method call.
     * This acts as a stub which can be overridden.
     *
     * @param {number} x width
     * @param {number} y height
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y, ctx, selected, hover) {
      this._updateBoundingBox(x, y, ctx, selected, hover);
    }
    /**
     * Determine the dimensions to use for nodes with an internal label
     *
     * Currently, these are: Circle, Ellipse, Database, Box
     * The other nodes have external labels, and will not call this method
     *
     * If there is no label, decent default values are supplied.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} [selected]
     * @param {boolean} [hover]
     * @returns {{width:number, height:number}}
     */

  }, {
    key: "getDimensionsFromLabel",
    value: function getDimensionsFromLabel(ctx, selected, hover) {
      // NOTE: previously 'textSize' was not put in 'this' for Ellipse
      // TODO: examine the consequences.
      this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
      var width = this.textSize.width;
      var height = this.textSize.height;
      var DEFAULT_SIZE = 14;

      if (width === 0) {
        // This happens when there is no label text set
        width = DEFAULT_SIZE; // use a decent default

        height = DEFAULT_SIZE; // if width zero, then height also always zero
      }

      return {
        width: width,
        height: height
      };
    }
  }]);

  return NodeBase;
}();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Box Node/Cluster shape.
 *
 * @extends NodeBase
 */

var Box = /*#__PURE__*/function (_NodeBase) {
  inherits(Box, _NodeBase);

  var _super = _createSuper(Box);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Box(options, body, labelModule) {
    var _this;

    classCallCheck(this, Box);

    _this = _super.call(this, options, body, labelModule);

    _this._setMargins(labelModule);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(Box, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;

      if (this.needsRefresh(selected, hover)) {
        var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        this.width = dimensions.width + this.margin.right + this.margin.left;
        this.height = dimensions.height + this.margin.top + this.margin.bottom;
        this.radius = this.width / 2;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
      this.initContextForDraw(ctx, values);
      drawRoundRect(ctx, this.left, this.top, this.width, this.height, values.borderRadius);
      this.performFill(ctx, values);
      this.updateBoundingBox(x, y, ctx, selected, hover);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
    }
    /**
     *
     * @param {number} x width
     * @param {number} y height
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} selected
     * @param {boolean} hover
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y, ctx, selected, hover) {
      this._updateBoundingBox(x, y, ctx, selected, hover);

      var borderRadius = this.options.shapeProperties.borderRadius; // only effective for box

      this._addBoundingBoxMargin(borderRadius);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      if (ctx) {
        this.resize(ctx);
      }

      var borderWidth = this.options.borderWidth;
      return Math.min(Math.abs(this.width / 2 / Math.cos(angle)), Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
    }
  }]);

  return Box;
}(NodeBase);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * NOTE: This is a bad base class
 *
 * Child classes are:
 *
 *   Image       - uses *only* image methods
 *   Circle      - uses *only* _drawRawCircle
 *   CircleImage - uses all
 *
 * TODO: Refactor, move _drawRawCircle to different module, derive Circle from NodeBase
 *       Rename this to ImageBase
 *       Consolidate common code in Image and CircleImage to base class
 *
 * @extends NodeBase
 */

var CircleImageBase = /*#__PURE__*/function (_NodeBase) {
  inherits(CircleImageBase, _NodeBase);

  var _super = _createSuper$1(CircleImageBase);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function CircleImageBase(options, body, labelModule) {
    var _this;

    classCallCheck(this, CircleImageBase);

    _this = _super.call(this, options, body, labelModule);
    _this.labelOffset = 0;
    _this.selected = false;
    return _this;
  }
  /**
   *
   * @param {Object} options
   * @param {Object} [imageObj]
   * @param {Object} [imageObjAlt]
   */


  createClass(CircleImageBase, [{
    key: "setOptions",
    value: function setOptions(options, imageObj, imageObjAlt) {
      this.options = options;

      if (!(imageObj === undefined && imageObjAlt === undefined)) {
        this.setImages(imageObj, imageObjAlt);
      }
    }
    /**
     * Set the images for this node.
     *
     * The images can be updated after the initial setting of options;
     * therefore, this method needs to be reentrant.
     *
     * For correct working in error cases, it is necessary to properly set
     * field 'nodes.brokenImage' in the options.
     *
     * @param {Image} imageObj  required; main image to show for this node
     * @param {Image|undefined} imageObjAlt optional; image to show when node is selected
     */

  }, {
    key: "setImages",
    value: function setImages(imageObj, imageObjAlt) {
      if (imageObjAlt && this.selected) {
        this.imageObj = imageObjAlt;
        this.imageObjAlt = imageObj;
      } else {
        this.imageObj = imageObj;
        this.imageObjAlt = imageObjAlt;
      }
    }
    /**
     * Set selection and switch between the base and the selected image.
     *
     * Do the switch only if imageObjAlt exists.
     *
     * @param {boolean} selected value of new selected state for current node
     */

  }, {
    key: "switchImages",
    value: function switchImages(selected) {
      var selection_changed = selected && !this.selected || !selected && this.selected;
      this.selected = selected; // Remember new selection

      if (this.imageObjAlt !== undefined && selection_changed) {
        var imageTmp = this.imageObj;
        this.imageObj = this.imageObjAlt;
        this.imageObjAlt = imageTmp;
      }
    }
    /**
     * Returns Image Padding from node options
     *
     * @returns {{top: number,left: number,bottom: number,right: number}} image padding inside this shape
     * @private
     */

  }, {
    key: "_getImagePadding",
    value: function _getImagePadding() {
      var imgPadding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      if (this.options.imagePadding) {
        var optImgPadding = this.options.imagePadding;

        if (_typeof_1(optImgPadding) == 'object') {
          imgPadding.top = optImgPadding.top;
          imgPadding.right = optImgPadding.right;
          imgPadding.bottom = optImgPadding.bottom;
          imgPadding.left = optImgPadding.left;
        } else {
          imgPadding.top = optImgPadding;
          imgPadding.right = optImgPadding;
          imgPadding.bottom = optImgPadding;
          imgPadding.left = optImgPadding;
        }
      }

      return imgPadding;
    }
    /**
     * Adjust the node dimensions for a loaded image.
     *
     * Pre: this.imageObj is valid
     */

  }, {
    key: "_resizeImage",
    value: function _resizeImage() {
      var width, height;

      if (this.options.shapeProperties.useImageSize === false) {
        // Use the size property
        var ratio_width = 1;
        var ratio_height = 1; // Only calculate the proper ratio if both width and height not zero

        if (this.imageObj.width && this.imageObj.height) {
          if (this.imageObj.width > this.imageObj.height) {
            ratio_width = this.imageObj.width / this.imageObj.height;
          } else {
            ratio_height = this.imageObj.height / this.imageObj.width;
          }
        }

        width = this.options.size * 2 * ratio_width;
        height = this.options.size * 2 * ratio_height;
      } else {
        // Use the image size with image padding
        var imgPadding = this._getImagePadding();

        width = this.imageObj.width + imgPadding.left + imgPadding.right;
        height = this.imageObj.height + imgPadding.top + imgPadding.bottom;
      }

      this.width = width;
      this.height = height;
      this.radius = 0.5 * this.width;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {ArrowOptions} values
     * @private
     */

  }, {
    key: "_drawRawCircle",
    value: function _drawRawCircle(ctx, x, y, values) {
      this.initContextForDraw(ctx, values);
      drawCircle(ctx, x, y, values.size);
      this.performFill(ctx, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {ArrowOptions} values
     * @private
     */

  }, {
    key: "_drawImageAtPosition",
    value: function _drawImageAtPosition(ctx, values) {
      if (this.imageObj.width != 0) {
        // draw the image
        ctx.globalAlpha = values.opacity !== undefined ? values.opacity : 1; // draw shadow if enabled

        this.enableShadow(ctx, values);
        var factor = 1;

        if (this.options.shapeProperties.interpolation === true) {
          factor = this.imageObj.width / this.width / this.body.view.scale;
        }

        var imgPadding = this._getImagePadding();

        var imgPosLeft = this.left + imgPadding.left;
        var imgPosTop = this.top + imgPadding.top;
        var imgWidth = this.width - imgPadding.left - imgPadding.right;
        var imgHeight = this.height - imgPadding.top - imgPadding.bottom;
        this.imageObj.drawImageAtPosition(ctx, factor, imgPosLeft, imgPosTop, imgWidth, imgHeight); // disable shadows for other elements.

        this.disableShadow(ctx, values);
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @private
     */

  }, {
    key: "_drawImageLabel",
    value: function _drawImageLabel(ctx, x, y, selected, hover) {
      var offset = 0;

      if (this.height !== undefined) {
        offset = this.height * 0.5;
        var labelDimensions = this.labelModule.getTextSize(ctx, selected, hover);

        if (labelDimensions.lineCount >= 1) {
          offset += labelDimensions.height / 2;
        }
      }

      var yLabel = y + offset;

      if (this.options.label) {
        this.labelOffset = offset;
      }

      this.labelModule.draw(ctx, x, yLabel, selected, hover, 'hanging');
    }
  }]);

  return CircleImageBase;
}(NodeBase);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Circle Node/Cluster shape.
 *
 * @extends CircleImageBase
 */

var Circle = /*#__PURE__*/function (_CircleImageBase) {
  inherits(Circle, _CircleImageBase);

  var _super = _createSuper$2(Circle);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Circle(options, body, labelModule) {
    var _this;

    classCallCheck(this, Circle);

    _this = _super.call(this, options, body, labelModule);

    _this._setMargins(labelModule);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(Circle, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;

      if (this.needsRefresh(selected, hover)) {
        var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        var diameter = Math.max(dimensions.width + this.margin.right + this.margin.left, dimensions.height + this.margin.top + this.margin.bottom);
        this.options.size = diameter / 2; // NOTE: this size field only set here, not in Ellipse, Database, Box

        this.width = diameter;
        this.height = diameter;
        this.radius = this.width / 2;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;

      this._drawRawCircle(ctx, x, y, values);

      this.updateBoundingBox(x, y);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, y, selected, hover);
    }
    /**
     *
     * @param {number} x width
     * @param {number} y height
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y) {
      this.boundingBox.top = y - this.options.size;
      this.boundingBox.left = x - this.options.size;
      this.boundingBox.right = x + this.options.size;
      this.boundingBox.bottom = y + this.options.size;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle - Unused
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      // eslint-disable-line no-unused-vars
      if (ctx) {
        this.resize(ctx);
      }

      return this.width * 0.5;
    }
  }]);

  return Circle;
}(CircleImageBase);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A CircularImage Node/Cluster shape.
 *
 * @extends CircleImageBase
 */

var CircularImage = /*#__PURE__*/function (_CircleImageBase) {
  inherits(CircularImage, _CircleImageBase);

  var _super = _createSuper$3(CircularImage);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   * @param {Image} imageObj
   * @param {Image} imageObjAlt
   */
  function CircularImage(options, body, labelModule, imageObj, imageObjAlt) {
    var _this;

    classCallCheck(this, CircularImage);

    _this = _super.call(this, options, body, labelModule);

    _this.setImages(imageObj, imageObjAlt);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(CircularImage, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;
      var imageAbsent = this.imageObj.src === undefined || this.imageObj.width === undefined || this.imageObj.height === undefined;

      if (imageAbsent) {
        var diameter = this.options.size * 2;
        this.width = diameter;
        this.height = diameter;
        this.radius = 0.5 * this.width;
        return;
      } // At this point, an image is present, i.e. this.imageObj is valid.


      if (this.needsRefresh(selected, hover)) {
        this._resizeImage();
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.switchImages(selected);
      this.resize();
      var labelX = x,
          labelY = y;

      if (this.options.shapeProperties.coordinateOrigin === 'top-left') {
        this.left = x;
        this.top = y;
        labelX += this.width / 2;
        labelY += this.height / 2;
      } else {
        this.left = x - this.width / 2;
        this.top = y - this.height / 2;
      } // draw the background circle. IMPORTANT: the stroke in this method is used by the clip method below.


      this._drawRawCircle(ctx, labelX, labelY, values); // now we draw in the circle, we save so we can revert the clip operation after drawing.


      ctx.save(); // clip is used to use the stroke in drawRawCircle as an area that we can draw in.

      ctx.clip(); // draw the image

      this._drawImageAtPosition(ctx, values); // restore so we can again draw on the full canvas


      ctx.restore();

      this._drawImageLabel(ctx, labelX, labelY, selected, hover);

      this.updateBoundingBox(x, y);
    } // TODO: compare with Circle.updateBoundingBox(), consolidate? More stuff is happening here

    /**
     *
     * @param {number} x width
     * @param {number} y height
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y) {
      if (this.options.shapeProperties.coordinateOrigin === 'top-left') {
        this.boundingBox.top = y;
        this.boundingBox.left = x;
        this.boundingBox.right = x + this.options.size * 2;
        this.boundingBox.bottom = y + this.options.size * 2;
      } else {
        this.boundingBox.top = y - this.options.size;
        this.boundingBox.left = x - this.options.size;
        this.boundingBox.right = x + this.options.size;
        this.boundingBox.bottom = y + this.options.size;
      } // TODO: compare with Image.updateBoundingBox(), consolidate?


      this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
      this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
      this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle - Unused
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      // eslint-disable-line no-unused-vars
      if (ctx) {
        this.resize(ctx);
      }

      return this.width * 0.5;
    }
  }]);

  return CircularImage;
}(CircleImageBase);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Base class for constructing Node/Cluster Shapes.
 *
 * @extends NodeBase
 */

var ShapeBase = /*#__PURE__*/function (_NodeBase) {
  inherits(ShapeBase, _NodeBase);

  var _super = _createSuper$4(ShapeBase);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function ShapeBase(options, body, labelModule) {
    classCallCheck(this, ShapeBase);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   * @param {Object} [values={size: this.options.size}]
   */


  createClass(ShapeBase, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;
      var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        size: this.options.size
      };

      if (this.needsRefresh(selected, hover)) {
        var _this$customSizeWidth, _this$customSizeHeigh;

        this.labelModule.getTextSize(ctx, selected, hover);
        var size = 2 * values.size;
        this.width = (_this$customSizeWidth = this.customSizeWidth) !== null && _this$customSizeWidth !== void 0 ? _this$customSizeWidth : size;
        this.height = (_this$customSizeHeigh = this.customSizeHeight) !== null && _this$customSizeHeigh !== void 0 ? _this$customSizeHeigh : size;
        this.radius = 0.5 * this.width;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} shape
     * @param {number} sizeMultiplier - Unused! TODO: Remove next major release
     * @param {number} x
     * @param {number} y
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     * @private
     *
     * @returns {Object} Callbacks to draw later on higher layers.
     */

  }, {
    key: "_drawShape",
    value: function _drawShape(ctx, shape, sizeMultiplier, x, y, selected, hover, values) {
      var _this = this;

      this.resize(ctx, selected, hover, values);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
      this.initContextForDraw(ctx, values);
      getShape(shape)(ctx, x, y, values.size);
      this.performFill(ctx, values);

      if (this.options.icon !== undefined) {
        if (this.options.icon.code !== undefined) {
          ctx.font = (selected ? "bold " : "") + this.height / 2 + "px " + (this.options.icon.face || "FontAwesome");
          ctx.fillStyle = this.options.icon.color || "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(this.options.icon.code, x, y);
        }
      }

      return {
        drawExternalLabel: function drawExternalLabel() {
          if (_this.options.label !== undefined) {
            // Need to call following here in order to ensure value for
            // `this.labelModule.size.height`.
            _this.labelModule.calculateLabelSize(ctx, selected, hover, x, y, 'hanging');

            var yLabel = y + 0.5 * _this.height + 0.5 * _this.labelModule.size.height;

            _this.labelModule.draw(ctx, x, yLabel, selected, hover, 'hanging');
          }

          _this.updateBoundingBox(x, y);
        }
      };
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y) {
      this.boundingBox.top = y - this.options.size;
      this.boundingBox.left = x - this.options.size;
      this.boundingBox.right = x + this.options.size;
      this.boundingBox.bottom = y + this.options.size;

      if (this.options.label !== undefined && this.labelModule.size.width > 0) {
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height);
      }
    }
  }]);

  return ShapeBase;
}(NodeBase);

function ownKeys$2(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; forEach$2(_context = ownKeys$2(Object(source), true)).call(_context, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context2; forEach$2(_context2 = ownKeys$2(Object(source))).call(_context2, function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A CustomShape Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var CustomShape = /*#__PURE__*/function (_ShapeBase) {
  inherits(CustomShape, _ShapeBase);

  var _super = _createSuper$5(CustomShape);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   * @param {function} ctxRenderer
    */
  function CustomShape(options, body, labelModule, ctxRenderer) {
    var _this;

    classCallCheck(this, CustomShape);

    _this = _super.call(this, options, body, labelModule, ctxRenderer);
    _this.ctxRenderer = ctxRenderer;
    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on different layers.
   */


  createClass(CustomShape, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover, values);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2; // Guard right away because someone may just draw in the function itself.

      ctx.save();
      var drawLater = this.ctxRenderer({
        ctx: ctx,
        x: x,
        y: y,
        state: {
          selected: selected,
          hover: hover
        },
        style: _objectSpread({}, values),
        label: this.options.label
      }); // Render the node shape bellow arrows.

      if (drawLater.drawNode != null) {
        drawLater.drawNode();
      }

      ctx.restore();

      if (drawLater.drawExternalLabel) {
        // Guard the external label (above arrows) drawing function.
        var drawExternalLabel = drawLater.drawExternalLabel;

        drawLater.drawExternalLabel = function () {
          ctx.save();
          drawExternalLabel();
          ctx.restore();
        };
      }

      if (drawLater.nodeDimensions) {
        this.customSizeWidth = drawLater.nodeDimensions.width;
        this.customSizeHeight = drawLater.nodeDimensions.height;
      }

      return drawLater;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return CustomShape;
}(ShapeBase);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Database Node/Cluster shape.
 *
 * @extends NodeBase
 */

var Database = /*#__PURE__*/function (_NodeBase) {
  inherits(Database, _NodeBase);

  var _super = _createSuper$6(Database);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Database(options, body, labelModule) {
    var _this;

    classCallCheck(this, Database);

    _this = _super.call(this, options, body, labelModule);

    _this._setMargins(labelModule);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */


  createClass(Database, [{
    key: "resize",
    value: function resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        var size = dimensions.width + this.margin.right + this.margin.left;
        this.width = size;
        this.height = size;
        this.radius = this.width / 2;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
      this.initContextForDraw(ctx, values);
      drawDatabase(ctx, x - this.width / 2, y - this.height / 2, this.width, this.height);
      this.performFill(ctx, values);
      this.updateBoundingBox(x, y, ctx, selected, hover);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Database;
}(NodeBase);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Diamond Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Diamond = /*#__PURE__*/function (_ShapeBase) {
  inherits(Diamond, _ShapeBase);

  var _super = _createSuper$7(Diamond);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Diamond(options, body, labelModule) {
    classCallCheck(this, Diamond);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Diamond, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'diamond', 4, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Diamond;
}(ShapeBase);

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Dot Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Dot = /*#__PURE__*/function (_ShapeBase) {
  inherits(Dot, _ShapeBase);

  var _super = _createSuper$8(Dot);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Dot(options, body, labelModule) {
    classCallCheck(this, Dot);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Dot, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'circle', 2, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      // eslint-disable-line no-unused-vars
      if (ctx) {
        this.resize(ctx);
      }

      return this.options.size;
    }
  }]);

  return Dot;
}(ShapeBase);

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Am Ellipse Node/Cluster shape.
 *
 * @extends NodeBase
 */

var Ellipse = /*#__PURE__*/function (_NodeBase) {
  inherits(Ellipse, _NodeBase);

  var _super = _createSuper$9(Ellipse);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Ellipse(options, body, labelModule) {
    classCallCheck(this, Ellipse);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(Ellipse, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;

      if (this.needsRefresh(selected, hover)) {
        var dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        this.height = dimensions.height * 2;
        this.width = dimensions.width + dimensions.height;
        this.radius = 0.5 * this.width;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x - this.width * 0.5;
      this.top = y - this.height * 0.5;
      this.initContextForDraw(ctx, values);
      drawEllipse(ctx, this.left, this.top, this.width, this.height);
      this.performFill(ctx, values);
      this.updateBoundingBox(x, y, ctx, selected, hover);
      this.labelModule.draw(ctx, x, y, selected, hover);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      if (ctx) {
        this.resize(ctx);
      }

      var a = this.width * 0.5;
      var b = this.height * 0.5;
      var w = Math.sin(angle) * a;
      var h = Math.cos(angle) * b;
      return a * b / Math.sqrt(w * w + h * h);
    }
  }]);

  return Ellipse;
}(NodeBase);

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * An icon replacement for the default Node shape.
 *
 * @extends NodeBase
 */

var Icon = /*#__PURE__*/function (_NodeBase) {
  inherits(Icon, _NodeBase);

  var _super = _createSuper$a(Icon);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Icon(options, body, labelModule) {
    var _this;

    classCallCheck(this, Icon);

    _this = _super.call(this, options, body, labelModule);

    _this._setMargins(labelModule);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx - Unused.
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(Icon, [{
    key: "resize",
    value: function resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        this.iconSize = {
          width: Number(this.options.icon.size),
          height: Number(this.options.icon.size)
        };
        this.width = this.iconSize.width + this.margin.right + this.margin.left;
        this.height = this.iconSize.height + this.margin.top + this.margin.bottom;
        this.radius = 0.5 * this.width;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     *
     * @returns {Object} Callbacks to draw later on higher layers.
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      var _this2 = this;

      this.resize(ctx, selected, hover);
      this.options.icon.size = this.options.icon.size || 50;
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;

      this._icon(ctx, x, y, selected, hover, values);

      return {
        drawExternalLabel: function drawExternalLabel() {
          if (_this2.options.label !== undefined) {
            var iconTextSpacing = 5;

            _this2.labelModule.draw(ctx, _this2.left + _this2.iconSize.width / 2 + _this2.margin.left, y + _this2.height / 2 + iconTextSpacing, selected);
          }

          _this2.updateBoundingBox(x, y);
        }
      };
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y) {
      this.boundingBox.top = y - this.options.icon.size * 0.5;
      this.boundingBox.left = x - this.options.icon.size * 0.5;
      this.boundingBox.right = x + this.options.icon.size * 0.5;
      this.boundingBox.bottom = y + this.options.icon.size * 0.5;

      if (this.options.label !== undefined && this.labelModule.size.width > 0) {
        var iconTextSpacing = 5;
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height + iconTextSpacing);
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover - Unused
     * @param {ArrowOptions} values
     */

  }, {
    key: "_icon",
    value: function _icon(ctx, x, y, selected, hover, values) {
      var iconSize = Number(this.options.icon.size);

      if (this.options.icon.code !== undefined) {
        ctx.font = [this.options.icon.weight != null ? this.options.icon.weight : selected ? "bold" : "", // If the weight is forced (for example to make Font Awesome 5 work
        // properly) substitute slightly bigger size for bold font face.
        (this.options.icon.weight != null && selected ? 5 : 0) + iconSize + "px", this.options.icon.face].join(" "); // draw icon

        ctx.fillStyle = this.options.icon.color || "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // draw shadow if enabled

        this.enableShadow(ctx, values);
        ctx.fillText(this.options.icon.code, x, y); // disable shadows for other elements.

        this.disableShadow(ctx, values);
      } else {
        console.error('When using the icon shape, you need to define the code in the icon options object. This can be done per node or globally.');
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Icon;
}(NodeBase);

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * An image-based replacement for the default Node shape.
 *
 * @extends CircleImageBase
 */

var Image$1 = /*#__PURE__*/function (_CircleImageBase) {
  inherits(Image, _CircleImageBase);

  var _super = _createSuper$b(Image);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   * @param {Image} imageObj
   * @param {Image} imageObjAlt
   */
  function Image(options, body, labelModule, imageObj, imageObjAlt) {
    var _this;

    classCallCheck(this, Image);

    _this = _super.call(this, options, body, labelModule);

    _this.setImages(imageObj, imageObjAlt);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx - Unused.
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */


  createClass(Image, [{
    key: "resize",
    value: function resize(ctx) {
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selected;
      var hover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.hover;
      var imageAbsent = this.imageObj.src === undefined || this.imageObj.width === undefined || this.imageObj.height === undefined;

      if (imageAbsent) {
        var side = this.options.size * 2;
        this.width = side;
        this.height = side;
        return;
      }

      if (this.needsRefresh(selected, hover)) {
        this._resizeImage();
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      ctx.save();
      this.switchImages(selected);
      this.resize();
      var labelX = x,
          labelY = y;

      if (this.options.shapeProperties.coordinateOrigin === 'top-left') {
        this.left = x;
        this.top = y;
        labelX += this.width / 2;
        labelY += this.height / 2;
      } else {
        this.left = x - this.width / 2;
        this.top = y - this.height / 2;
      }

      if (this.options.shapeProperties.useBorderWithImage === true) {
        var neutralborderWidth = this.options.borderWidth;
        var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;
        var borderWidth = (selected ? selectionLineWidth : neutralborderWidth) / this.body.view.scale;
        ctx.lineWidth = Math.min(this.width, borderWidth);
        ctx.beginPath();
        var strokeStyle = selected ? this.options.color.highlight.border : hover ? this.options.color.hover.border : this.options.color.border;
        var fillStyle = selected ? this.options.color.highlight.background : hover ? this.options.color.hover.background : this.options.color.background;

        if (values.opacity !== undefined) {
          strokeStyle = overrideOpacity(strokeStyle, values.opacity);
          fillStyle = overrideOpacity(fillStyle, values.opacity);
        } // setup the line properties.


        ctx.strokeStyle = strokeStyle; // set a fillstyle

        ctx.fillStyle = fillStyle; // draw a rectangle to form the border around. This rectangle is filled so the opacity of a picture (in future vis releases?) can be used to tint the image

        ctx.rect(this.left - 0.5 * ctx.lineWidth, this.top - 0.5 * ctx.lineWidth, this.width + ctx.lineWidth, this.height + ctx.lineWidth);

        fill$2(ctx).call(ctx);

        this.performStroke(ctx, values);
        ctx.closePath();
      }

      this._drawImageAtPosition(ctx, values);

      this._drawImageLabel(ctx, labelX, labelY, selected, hover);

      this.updateBoundingBox(x, y);
      ctx.restore();
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(x, y) {
      this.resize();

      if (this.options.shapeProperties.coordinateOrigin === 'top-left') {
        this.left = x;
        this.top = y;
      } else {
        this.left = x - this.width / 2;
        this.top = y - this.height / 2;
      }

      this.boundingBox.left = this.left;
      this.boundingBox.top = this.top;
      this.boundingBox.bottom = this.top + this.height;
      this.boundingBox.right = this.left + this.width;

      if (this.options.label !== undefined && this.labelModule.size.width > 0) {
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset);
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Image;
}(CircleImageBase);

function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Square Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Square = /*#__PURE__*/function (_ShapeBase) {
  inherits(Square, _ShapeBase);

  var _super = _createSuper$c(Square);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Square(options, body, labelModule) {
    classCallCheck(this, Square);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Square, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'square', 2, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Square;
}(ShapeBase);

function _createSuper$d(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$d(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$d() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Hexagon Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Hexagon = /*#__PURE__*/function (_ShapeBase) {
  inherits(Hexagon, _ShapeBase);

  var _super = _createSuper$d(Hexagon);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Hexagon(options, body, labelModule) {
    classCallCheck(this, Hexagon);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Hexagon, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'hexagon', 4, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Hexagon;
}(ShapeBase);

function _createSuper$e(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$e(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$e() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Star Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Star = /*#__PURE__*/function (_ShapeBase) {
  inherits(Star, _ShapeBase);

  var _super = _createSuper$e(Star);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Star(options, body, labelModule) {
    classCallCheck(this, Star);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Star, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'star', 4, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Star;
}(ShapeBase);

function _createSuper$f(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$f(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$f() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A text-based replacement for the default Node shape.
 *
 * @extends NodeBase
 */

var Text = /*#__PURE__*/function (_NodeBase) {
  inherits(Text, _NodeBase);

  var _super = _createSuper$f(Text);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Text(options, body, labelModule) {
    var _this;

    classCallCheck(this, Text);

    _this = _super.call(this, options, body, labelModule);

    _this._setMargins(labelModule);

    return _this;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */


  createClass(Text, [{
    key: "resize",
    value: function resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
        this.width = this.textSize.width + this.margin.right + this.margin.left;
        this.height = this.textSize.height + this.margin.top + this.margin.bottom;
        this.radius = 0.5 * this.width;
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x width
     * @param {number} y height
     * @param {boolean} selected
     * @param {boolean} hover
     * @param {ArrowOptions} values
     */

  }, {
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x - this.width / 2;
      this.top = y - this.height / 2; // draw shadow if enabled

      this.enableShadow(ctx, values);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover); // disable shadows for other elements.

      this.disableShadow(ctx, values);
      this.updateBoundingBox(x, y, ctx, selected, hover);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Text;
}(NodeBase);

function _createSuper$g(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$g(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$g() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Triangle Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var Triangle = /*#__PURE__*/function (_ShapeBase) {
  inherits(Triangle, _ShapeBase);

  var _super = _createSuper$g(Triangle);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function Triangle(options, body, labelModule) {
    classCallCheck(this, Triangle);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(Triangle, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'triangle', 3, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return Triangle;
}(ShapeBase);

function _createSuper$h(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$h(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$h() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A downward facing Triangle Node/Cluster shape.
 *
 * @extends ShapeBase
 */

var TriangleDown = /*#__PURE__*/function (_ShapeBase) {
  inherits(TriangleDown, _ShapeBase);

  var _super = _createSuper$h(TriangleDown);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Label} labelModule
   */
  function TriangleDown(options, body, labelModule) {
    classCallCheck(this, TriangleDown);

    return _super.call(this, options, body, labelModule);
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   *
   * @returns {Object} Callbacks to draw later on higher layers.
   */


  createClass(TriangleDown, [{
    key: "draw",
    value: function draw(ctx, x, y, selected, hover, values) {
      return this._drawShape(ctx, 'triangleDown', 3, x, y, selected, hover, values);
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} angle
     * @returns {number}
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  }]);

  return TriangleDown;
}(ShapeBase);

var $stringify$1 = getBuiltIn('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);

  if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
    return '\\u' + match.charCodeAt(0).toString(16);
  }

  return match;
};

var FORCED$5 = fails(function () {
  return $stringify$1('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify$1('\uDEAD') !== '"\\udead"';
});

if ($stringify$1) {
  // https://github.com/tc39/proposal-well-formed-stringify
  _export({
    target: 'JSON',
    stat: true,
    forced: FORCED$5
  }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var result = $stringify$1.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

if (!path.JSON) path.JSON = {
  stringify: JSON.stringify
}; // eslint-disable-next-line no-unused-vars

var stringify = function stringify(it, replacer, space) {
  return path.JSON.stringify.apply(null, arguments);
};

var stringify$1 = stringify;

var stringify$2 = stringify$1;

var errorFound = false;
var allOptions;
var printStyle = 'background: #FFeeee; color: #dd0000';
/**
 *  Used to validate options.
 */

var Validator = /*#__PURE__*/function () {
  /**
   * @ignore
   */
  function Validator() {
    classCallCheck(this, Validator);
  }
  /**
   * Main function to be called
   * @param {Object} options
   * @param {Object} referenceOptions
   * @param {Object} subObject
   * @returns {boolean}
   * @static
   */


  createClass(Validator, null, [{
    key: "validate",
    value: function validate(options, referenceOptions, subObject) {
      errorFound = false;
      allOptions = referenceOptions;
      var usedOptions = referenceOptions;

      if (subObject !== undefined) {
        usedOptions = referenceOptions[subObject];
      }

      Validator.parse(options, usedOptions, []);
      return errorFound;
    }
    /**
     * Will traverse an object recursively and check every value
     * @param {Object} options
     * @param {Object} referenceOptions
     * @param {array} path    | where to look for the actual option
     * @static
     */

  }, {
    key: "parse",
    value: function parse(options, referenceOptions, path) {
      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option)) {
          Validator.check(option, options, referenceOptions, path);
        }
      }
    }
    /**
     * Check every value. If the value is an object, call the parse function on that object.
     * @param {string} option
     * @param {Object} options
     * @param {Object} referenceOptions
     * @param {array} path    | where to look for the actual option
     * @static
     */

  }, {
    key: "check",
    value: function check(option, options, referenceOptions, path) {
      if (referenceOptions[option] === undefined && referenceOptions.__any__ === undefined) {
        Validator.getSuggestion(option, referenceOptions, path);
        return;
      }

      var referenceOption = option;
      var is_object = true;

      if (referenceOptions[option] === undefined && referenceOptions.__any__ !== undefined) {
        // NOTE: This only triggers if the __any__ is in the top level of the options object.
        //       THAT'S A REALLY BAD PLACE TO ALLOW IT!!!!
        // TODO: Examine if needed, remove if possible
        // __any__ is a wildcard. Any value is accepted and will be further analysed by reference.
        referenceOption = '__any__'; // if the any-subgroup is not a predefined object in the configurator,
        // we do not look deeper into the object.

        is_object = Validator.getType(options[option]) === 'object';
      }

      var refOptionObj = referenceOptions[referenceOption];

      if (is_object && refOptionObj.__type__ !== undefined) {
        refOptionObj = refOptionObj.__type__;
      }

      Validator.checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path);
    }
    /**
     *
     * @param {string}  option           | the option property
     * @param {Object}  options          | The supplied options object
     * @param {Object}  referenceOptions | The reference options containing all options and their allowed formats
     * @param {string}  referenceOption  | Usually this is the same as option, except when handling an __any__ tag.
     * @param {string}  refOptionObj     | This is the type object from the reference options
     * @param {Array}   path             | where in the object is the option
     * @static
     */

  }, {
    key: "checkFields",
    value: function checkFields(option, options, referenceOptions, referenceOption, refOptionObj, path) {
      var log = function log(message) {
        console.log('%c' + message + Validator.printLocation(path, option), printStyle);
      };

      var optionType = Validator.getType(options[option]);
      var refOptionType = refOptionObj[optionType];

      if (refOptionType !== undefined) {
        // if the type is correct, we check if it is supposed to be one of a few select values
        if (Validator.getType(refOptionType) === 'array' && indexOf$3(refOptionType).call(refOptionType, options[option]) === -1) {
          log('Invalid option detected in "' + option + '".' + ' Allowed values are:' + Validator.print(refOptionType) + ' not "' + options[option] + '". ');
          errorFound = true;
        } else if (optionType === 'object' && referenceOption !== "__any__") {
          path = copyAndExtendArray(path, option);
          Validator.parse(options[option], referenceOptions[referenceOption], path);
        }
      } else if (refOptionObj['any'] === undefined) {
        // type of the field is incorrect and the field cannot be any
        log('Invalid type received for "' + option + '". Expected: ' + Validator.print(keys$3(refOptionObj)) + '. Received [' + optionType + '] "' + options[option] + '"');
        errorFound = true;
      }
    }
    /**
     *
     * @param {Object|boolean|number|string|Array.<number>|Date|Node|Moment|undefined|null} object
     * @returns {string}
     * @static
     */

  }, {
    key: "getType",
    value: function getType(object) {
      var type = _typeof_1(object);

      if (type === 'object') {
        if (object === null) {
          return 'null';
        }

        if (object instanceof Boolean) {
          return 'boolean';
        }

        if (object instanceof Number) {
          return 'number';
        }

        if (object instanceof String) {
          return 'string';
        }

        if (isArray$5(object)) {
          return 'array';
        }

        if (object instanceof Date) {
          return 'date';
        }

        if (object.nodeType !== undefined) {
          return 'dom';
        }

        if (object._isAMomentObject === true) {
          return 'moment';
        }

        return 'object';
      } else if (type === 'number') {
        return 'number';
      } else if (type === 'boolean') {
        return 'boolean';
      } else if (type === 'string') {
        return 'string';
      } else if (type === undefined) {
        return 'undefined';
      }

      return type;
    }
    /**
     * @param {string} option
     * @param {Object} options
     * @param {Array.<string>} path
     * @static
     */

  }, {
    key: "getSuggestion",
    value: function getSuggestion(option, options, path) {
      var localSearch = Validator.findInOptions(option, options, path, false);
      var globalSearch = Validator.findInOptions(option, allOptions, [], true);
      var localSearchThreshold = 8;
      var globalSearchThreshold = 4;
      var msg;

      if (localSearch.indexMatch !== undefined) {
        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was incomplete? Did you mean: "' + localSearch.indexMatch + '"?\n\n';
      } else if (globalSearch.distance <= globalSearchThreshold && localSearch.distance > globalSearch.distance) {
        msg = ' in ' + Validator.printLocation(localSearch.path, option, '') + 'Perhaps it was misplaced? Matching option found at: ' + Validator.printLocation(globalSearch.path, globalSearch.closestMatch, '');
      } else if (localSearch.distance <= localSearchThreshold) {
        msg = '. Did you mean "' + localSearch.closestMatch + '"?' + Validator.printLocation(localSearch.path, option);
      } else {
        msg = '. Did you mean one of these: ' + Validator.print(keys$3(options)) + Validator.printLocation(path, option);
      }

      console.log('%cUnknown option detected: "' + option + '"' + msg, printStyle);
      errorFound = true;
    }
    /**
     * traverse the options in search for a match.
     * @param {string} option
     * @param {Object} options
     * @param {Array} path    | where to look for the actual option
     * @param {boolean} [recursive=false]
     * @returns {{closestMatch: string, path: Array, distance: number}}
     * @static
     */

  }, {
    key: "findInOptions",
    value: function findInOptions(option, options, path) {
      var recursive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var min = 1e9;
      var closestMatch = '';
      var closestMatchPath = [];
      var lowerCaseOption = option.toLowerCase();
      var indexMatch = undefined;

      for (var op in options) {
        // eslint-disable-line guard-for-in
        var distance = void 0;

        if (options[op].__type__ !== undefined && recursive === true) {
          var result = Validator.findInOptions(option, options[op], copyAndExtendArray(path, op));

          if (min > result.distance) {
            closestMatch = result.closestMatch;
            closestMatchPath = result.path;
            min = result.distance;
            indexMatch = result.indexMatch;
          }
        } else {
          var _context;

          if (indexOf$3(_context = op.toLowerCase()).call(_context, lowerCaseOption) !== -1) {
            indexMatch = op;
          }

          distance = Validator.levenshteinDistance(option, op);

          if (min > distance) {
            closestMatch = op;
            closestMatchPath = copyArray(path);
            min = distance;
          }
        }
      }

      return {
        closestMatch: closestMatch,
        path: closestMatchPath,
        distance: min,
        indexMatch: indexMatch
      };
    }
    /**
     * @param {Array.<string>} path
     * @param {Object} option
     * @param {string} prefix
     * @returns {String}
     * @static
     */

  }, {
    key: "printLocation",
    value: function printLocation(path, option) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Problem value found at: \n';
      var str = '\n\n' + prefix + 'options = {\n';

      for (var i = 0; i < path.length; i++) {
        for (var j = 0; j < i + 1; j++) {
          str += '  ';
        }

        str += path[i] + ': {\n';
      }

      for (var _j = 0; _j < path.length + 1; _j++) {
        str += '  ';
      }

      str += option + '\n';

      for (var _i = 0; _i < path.length + 1; _i++) {
        for (var _j2 = 0; _j2 < path.length - _i; _j2++) {
          str += '  ';
        }

        str += '}\n';
      }

      return str + '\n\n';
    }
    /**
     * @param {Object} options
     * @returns {String}
     * @static
     */

  }, {
    key: "print",
    value: function print(options) {
      return stringify$2(options).replace(/(\")|(\[)|(\])|(,"__type__")/g, "").replace(/(\,)/g, ', ');
    }
    /**
     *  Compute the edit distance between the two given strings
     * http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
     *
     * Copyright (c) 2011 Andrei Mackenzie
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     *
     * @param {string} a
     * @param {string} b
     * @returns {Array.<Array.<number>>}}
     * @static
     */

  }, {
    key: "levenshteinDistance",
    value: function levenshteinDistance(a, b) {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;
      var matrix = []; // increment along the first column of each row

      var i;

      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      } // increment each column in the first row


      var j;

      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      } // Fill in the rest of the matrix


      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    }
  }]);

  return Validator;
}();

function ownKeys$3(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context5; forEach$2(_context5 = ownKeys$3(Object(source), true)).call(_context5, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context6; forEach$2(_context6 = ownKeys$3(Object(source))).call(_context6, function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }
/**
 * A node. A node can be connected to other nodes via one or multiple edges.
 */

var Node = /*#__PURE__*/function () {
  /**
   *
   * @param {object} options An object containing options for the node. All
   *                            options are optional, except for the id.
   *                              {number} id     Id of the node. Required
   *                              {string} label  Text label for the node
   *                              {number} x      Horizontal position of the node
   *                              {number} y      Vertical position of the node
   *                              {string} shape  Node shape
   *                              {string} image  An image url
   *                              {string} title  A title text, can be HTML
   *                              {anytype} group A group name or number
   *
   * @param {Object} body               Shared state of current network instance
   * @param {Network.Images} imagelist  A list with images. Only needed when the node has an image
   * @param {Groups} grouplist          A list with groups. Needed for retrieving group options
   * @param {Object} globalOptions      Current global node options; these serve as defaults for the node instance
   * @param {Object} defaultOptions     Global default options for nodes; note that this is also the prototype
   *                                    for parameter `globalOptions`.
   */
  function Node(options, body, imagelist, grouplist, globalOptions, defaultOptions) {
    classCallCheck(this, Node);

    this.options = bridgeObject(globalOptions);
    this.globalOptions = globalOptions;
    this.defaultOptions = defaultOptions;
    this.body = body;
    this.edges = []; // all edges connected to this node
    // set defaults for the options

    this.id = undefined;
    this.imagelist = imagelist;
    this.grouplist = grouplist; // state options

    this.x = undefined;
    this.y = undefined;
    this.baseSize = this.options.size;
    this.baseFontSize = this.options.font.size;
    this.predefinedPosition = false; // used to check if initial fit should just take the range or approximate

    this.selected = false;
    this.hover = false;
    this.labelModule = new Label(this.body, this.options, false
    /* Not edge label */
    );
    this.setOptions(options);
  }
  /**
   * Attach a edge to the node
   * @param {Edge} edge
   */


  createClass(Node, [{
    key: "attachEdge",
    value: function attachEdge(edge) {
      var _context;

      if (indexOf$3(_context = this.edges).call(_context, edge) === -1) {
        this.edges.push(edge);
      }
    }
    /**
     * Detach a edge from the node
     *
     * @param {Edge} edge
     */

  }, {
    key: "detachEdge",
    value: function detachEdge(edge) {
      var _context2;

      var index = indexOf$3(_context2 = this.edges).call(_context2, edge);

      if (index != -1) {
        var _context3;

        splice$2(_context3 = this.edges).call(_context3, index, 1);
      }
    }
    /**
     * Set or overwrite options for the node
     *
     * @param {Object} options an object with options
     * @returns {null|boolean}
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var currentShape = this.options.shape;

      if (!options) {
        return; // Note that the return value will be 'undefined'! This is OK.
      } // Save the color for later.
      // This is necessary in order to prevent local color from being overwritten by group color.
      // TODO: To prevent such workarounds the way options are handled should be rewritten from scratch.
      // This is not the only problem with current options handling.


      if (typeof options.color !== 'undefined') {
        this._localColor = options.color;
      } // basic options


      if (options.id !== undefined) {
        this.id = options.id;
      }

      if (this.id === undefined) {
        throw new Error("Node must have an id");
      }

      Node.checkMass(options, this.id); // set these options locally
      // clear x and y positions

      if (options.x !== undefined) {
        if (options.x === null) {
          this.x = undefined;
          this.predefinedPosition = false;
        } else {
          this.x = _parseInt$2(options.x);
          this.predefinedPosition = true;
        }
      }

      if (options.y !== undefined) {
        if (options.y === null) {
          this.y = undefined;
          this.predefinedPosition = false;
        } else {
          this.y = _parseInt$2(options.y);
          this.predefinedPosition = true;
        }
      }

      if (options.size !== undefined) {
        this.baseSize = options.size;
      }

      if (options.value !== undefined) {
        options.value = _parseFloat$2(options.value);
      } // this transforms all shorthands into fully defined options


      Node.parseOptions(this.options, options, true, this.globalOptions, this.grouplist);
      var pile = [options, this.options, this.defaultOptions];
      this.chooser = choosify('node', pile);

      this._load_images();

      this.updateLabelModule(options); // Need to set local opacity after `this.updateLabelModule(options);` because `this.updateLabelModule(options);` overrites local opacity with group opacity

      if (options.opacity !== undefined && Node.checkOpacity(options.opacity)) {
        this.options.opacity = options.opacity;
      }

      this.updateShape(currentShape);
      return options.hidden !== undefined || options.physics !== undefined;
    }
    /**
     * Load the images from the options, for the nodes that need them.
     *
     * Images are always loaded, even if they are not used in the current shape.
     * The user may switch to an image shape later on.
     *
     * @private
     */

  }, {
    key: "_load_images",
    value: function _load_images() {
      if (this.options.shape === 'circularImage' || this.options.shape === 'image') {
        if (this.options.image === undefined) {
          throw new Error("Option image must be defined for node type '" + this.options.shape + "'");
        }
      }

      if (this.options.image === undefined) {
        return;
      }

      if (this.imagelist === undefined) {
        throw new Error("Internal Error: No images provided");
      }

      if (typeof this.options.image === 'string') {
        this.imageObj = this.imagelist.load(this.options.image, this.options.brokenImage, this.id);
      } else {
        if (this.options.image.unselected === undefined) {
          throw new Error("No unselected image provided");
        }

        this.imageObj = this.imagelist.load(this.options.image.unselected, this.options.brokenImage, this.id);

        if (this.options.image.selected !== undefined) {
          this.imageObjAlt = this.imagelist.load(this.options.image.selected, this.options.brokenImage, this.id);
        } else {
          this.imageObjAlt = undefined;
        }
      }
    }
    /**
     * Check that opacity is only between 0 and 1
     *
     * @param {Number} opacity
     * @returns {boolean}
     */

  }, {
    key: "getFormattingValues",

    /**
     *
     * @returns {{color: *, borderWidth: *, borderColor: *, size: *, borderDashes: (boolean|Array|allOptions.nodes.shapeProperties.borderDashes|{boolean, array}), borderRadius: (number|allOptions.nodes.shapeProperties.borderRadius|{number}|Array), shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *}}
     */
    value: function getFormattingValues() {
      var values = {
        color: this.options.color.background,
        opacity: this.options.opacity,
        borderWidth: this.options.borderWidth,
        borderColor: this.options.color.border,
        size: this.options.size,
        borderDashes: this.options.shapeProperties.borderDashes,
        borderRadius: this.options.shapeProperties.borderRadius,
        shadow: this.options.shadow.enabled,
        shadowColor: this.options.shadow.color,
        shadowSize: this.options.shadow.size,
        shadowX: this.options.shadow.x,
        shadowY: this.options.shadow.y
      };

      if (this.selected || this.hover) {
        if (this.chooser === true) {
          if (this.selected) {
            values.borderWidth *= 2;
            values.color = this.options.color.highlight.background;
            values.borderColor = this.options.color.highlight.border;
            values.shadow = this.options.shadow.enabled;
          } else if (this.hover) {
            values.color = this.options.color.hover.background;
            values.borderColor = this.options.color.hover.border;
            values.shadow = this.options.shadow.enabled;
          }
        } else if (typeof this.chooser === 'function') {
          this.chooser(values, this.options.id, this.selected, this.hover);

          if (values.shadow === false) {
            if (values.shadowColor !== this.options.shadow.color || values.shadowSize !== this.options.shadow.size || values.shadowX !== this.options.shadow.x || values.shadowY !== this.options.shadow.y) {
              values.shadow = true;
            }
          }
        }
      } else {
        values.shadow = this.options.shadow.enabled;
      }

      if (this.options.opacity !== undefined) {
        var opacity = this.options.opacity;
        values.borderColor = overrideOpacity(values.borderColor, opacity);
        values.color = overrideOpacity(values.color, opacity);
        values.shadowColor = overrideOpacity(values.shadowColor, opacity);
      }

      return values;
    }
    /**
     *
     * @param {Object} options
     */

  }, {
    key: "updateLabelModule",
    value: function updateLabelModule(options) {
      if (this.options.label === undefined || this.options.label === null) {
        this.options.label = '';
      }

      Node.updateGroupOptions(this.options, _objectSpread$1(_objectSpread$1({}, options), {}, {
        color: options && options.color || this._localColor || undefined
      }), this.grouplist); //
      // Note:The prototype chain for this.options is:
      //
      // this.options ->    NodesHandler.options    -> NodesHandler.defaultOptions
      //                 (also: this.globalOptions)
      //
      // Note that the prototypes are mentioned explicitly in the pile list below;
      // WE DON'T WANT THE ORDER OF THE PROTOTYPES!!!! At least, not for font handling of labels.
      // This is a good indication that the prototype usage of options is deficient.
      //

      var currentGroup = this.grouplist.get(this.options.group, false);
      var pile = [options, // new options
      this.options, // current node options, see comment above for prototype
      currentGroup, // group options, if any
      this.globalOptions, // Currently set global node options
      this.defaultOptions // Default global node options
      ];
      this.labelModule.update(this.options, pile);

      if (this.labelModule.baseSize !== undefined) {
        this.baseFontSize = this.labelModule.baseSize;
      }
    }
    /**
     *
     * @param {string} currentShape
     */

  }, {
    key: "updateShape",
    value: function updateShape(currentShape) {
      if (currentShape === this.options.shape && this.shape) {
        this.shape.setOptions(this.options, this.imageObj, this.imageObjAlt);
      } else {
        // choose draw method depending on the shape
        switch (this.options.shape) {
          case 'box':
            this.shape = new Box(this.options, this.body, this.labelModule);
            break;

          case 'circle':
            this.shape = new Circle(this.options, this.body, this.labelModule);
            break;

          case 'circularImage':
            this.shape = new CircularImage(this.options, this.body, this.labelModule, this.imageObj, this.imageObjAlt);
            break;

          case 'custom':
            this.shape = new CustomShape(this.options, this.body, this.labelModule, this.options.ctxRenderer);
            break;

          case 'database':
            this.shape = new Database(this.options, this.body, this.labelModule);
            break;

          case 'diamond':
            this.shape = new Diamond(this.options, this.body, this.labelModule);
            break;

          case 'dot':
            this.shape = new Dot(this.options, this.body, this.labelModule);
            break;

          case 'ellipse':
            this.shape = new Ellipse(this.options, this.body, this.labelModule);
            break;

          case 'icon':
            this.shape = new Icon(this.options, this.body, this.labelModule);
            break;

          case 'image':
            this.shape = new Image$1(this.options, this.body, this.labelModule, this.imageObj, this.imageObjAlt);
            break;

          case 'square':
            this.shape = new Square(this.options, this.body, this.labelModule);
            break;

          case 'hexagon':
            this.shape = new Hexagon(this.options, this.body, this.labelModule);
            break;

          case 'star':
            this.shape = new Star(this.options, this.body, this.labelModule);
            break;

          case 'text':
            this.shape = new Text(this.options, this.body, this.labelModule);
            break;

          case 'triangle':
            this.shape = new Triangle(this.options, this.body, this.labelModule);
            break;

          case 'triangleDown':
            this.shape = new TriangleDown(this.options, this.body, this.labelModule);
            break;

          default:
            this.shape = new Ellipse(this.options, this.body, this.labelModule);
            break;
        }
      }

      this.needsRefresh();
    }
    /**
     * select this node
     */

  }, {
    key: "select",
    value: function select() {
      this.selected = true;
      this.needsRefresh();
    }
    /**
     * unselect this node
     */

  }, {
    key: "unselect",
    value: function unselect() {
      this.selected = false;
      this.needsRefresh();
    }
    /**
     * Reset the calculated size of the node, forces it to recalculate its size
     */

  }, {
    key: "needsRefresh",
    value: function needsRefresh() {
      this.shape.refreshNeeded = true;
    }
    /**
     * get the title of this node.
     * @return {string} title    The title of the node, or undefined when no title
     *                           has been set.
     */

  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.options.title;
    }
    /**
     * Calculate the distance to the border of the Node
     * @param {CanvasRenderingContext2D}   ctx
     * @param {number} angle        Angle in radians
     * @returns {number} distance   Distance to the border in pixels
     */

  }, {
    key: "distanceToBorder",
    value: function distanceToBorder(ctx, angle) {
      return this.shape.distanceToBorder(ctx, angle);
    }
    /**
     * Check if this node has a fixed x and y position
     * @return {boolean}      true if fixed, false if not
     */

  }, {
    key: "isFixed",
    value: function isFixed() {
      return this.options.fixed.x && this.options.fixed.y;
    }
    /**
     * check if this node is selecte
     * @return {boolean} selected   True if node is selected, else false
     */

  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.selected;
    }
    /**
     * Retrieve the value of the node. Can be undefined
     * @return {number} value
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.options.value;
    }
    /**
     * Get the current dimensions of the label
     *
     * @return {rect}
     */

  }, {
    key: "getLabelSize",
    value: function getLabelSize() {
      return this.labelModule.size();
    }
    /**
     * Adjust the value range of the node. The node will adjust it's size
     * based on its value.
     * @param {number} min
     * @param {number} max
     * @param {number} total
     */

  }, {
    key: "setValueRange",
    value: function setValueRange(min, max, total) {
      if (this.options.value !== undefined) {
        var scale = this.options.scaling.customScalingFunction(min, max, total, this.options.value);
        var sizeDiff = this.options.scaling.max - this.options.scaling.min;

        if (this.options.scaling.label.enabled === true) {
          var fontDiff = this.options.scaling.label.max - this.options.scaling.label.min;
          this.options.font.size = this.options.scaling.label.min + scale * fontDiff;
        }

        this.options.size = this.options.scaling.min + scale * sizeDiff;
      } else {
        this.options.size = this.baseSize;
        this.options.font.size = this.baseFontSize;
      }

      this.updateLabelModule();
    }
    /**
     * Draw this node in the given canvas
     * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
     * @param {CanvasRenderingContext2D}   ctx
     *
     * @returns {Object} Callbacks to draw later on higher layers.
     */

  }, {
    key: "draw",
    value: function draw(ctx) {
      var values = this.getFormattingValues();
      return this.shape.draw(ctx, this.x, this.y, this.selected, this.hover, values) || {};
    }
    /**
     * Update the bounding box of the shape
     * @param {CanvasRenderingContext2D}   ctx
     */

  }, {
    key: "updateBoundingBox",
    value: function updateBoundingBox(ctx) {
      this.shape.updateBoundingBox(this.x, this.y, ctx);
    }
    /**
     * Recalculate the size of this node in the given canvas
     * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
     * @param {CanvasRenderingContext2D}   ctx
     */

  }, {
    key: "resize",
    value: function resize(ctx) {
      var values = this.getFormattingValues();
      this.shape.resize(ctx, this.selected, this.hover, values);
    }
    /**
     * Determine all visual elements of this node instance, in which the given
     * point falls within the bounding shape.
     *
     * @param {point} point
     * @returns {Array.<nodeClickItem|nodeLabelClickItem>} list with the items which are on the point
     */

  }, {
    key: "getItemsOnPoint",
    value: function getItemsOnPoint(point) {
      var ret = [];

      if (this.labelModule.visible()) {
        if (pointInRect(this.labelModule.getSize(), point)) {
          ret.push({
            nodeId: this.id,
            labelId: 0
          });
        }
      }

      if (pointInRect(this.shape.boundingBox, point)) {
        ret.push({
          nodeId: this.id
        });
      }

      return ret;
    }
    /**
     * Check if this object is overlapping with the provided object
     * @param {Object} obj   an object with parameters left, top, right, bottom
     * @return {boolean}     True if location is located on node
     */

  }, {
    key: "isOverlappingWith",
    value: function isOverlappingWith(obj) {
      return this.shape.left < obj.right && this.shape.left + this.shape.width > obj.left && this.shape.top < obj.bottom && this.shape.top + this.shape.height > obj.top;
    }
    /**
     * Check if this object is overlapping with the provided object
     * @param {Object} obj   an object with parameters left, top, right, bottom
     * @return {boolean}     True if location is located on node
     */

  }, {
    key: "isBoundingBoxOverlappingWith",
    value: function isBoundingBoxOverlappingWith(obj) {
      return this.shape.boundingBox.left < obj.right && this.shape.boundingBox.right > obj.left && this.shape.boundingBox.top < obj.bottom && this.shape.boundingBox.bottom > obj.top;
    }
    /**
    * Check valid values for mass
    *
    * The mass may not be negative or zero. If it is, reset to 1
    *
    * @param {object} options
    * @param {Node.id} id
     * @static
    */

  }], [{
    key: "checkOpacity",
    value: function checkOpacity(opacity) {
      return 0 <= opacity && opacity <= 1;
    }
    /**
     * Check that origin is 'center' or 'top-left'
     *
     * @param {String} origin
     * @returns {boolean}
     */

  }, {
    key: "checkCoordinateOrigin",
    value: function checkCoordinateOrigin(origin) {
      return origin === undefined || origin === 'center' || origin === 'top-left';
    }
    /**
     * Copy group option values into the node options.
     *
     * The group options override the global node options, so the copy of group options
     *  must happen *after* the global node options have been set.
     *
     * This method must also be called also if the global node options have changed and the group options did not.
     *
     * @param {Object} parentOptions
     * @param {Object} newOptions  new values for the options, currently only passed in for check
     * @param {Object} groupList
     */

  }, {
    key: "updateGroupOptions",
    value: function updateGroupOptions(parentOptions, newOptions, groupList) {
      var _context4;

      if (groupList === undefined) return; // No groups, nothing to do

      var group = parentOptions.group; // paranoia: the selected group is already merged into node options, check.

      if (newOptions !== undefined && newOptions.group !== undefined && group !== newOptions.group) {
        throw new Error("updateGroupOptions: group values in options don't match.");
      }

      var hasGroup = typeof group === 'number' || typeof group === 'string' && group != '';
      if (!hasGroup) return; // current node has no group, no need to merge

      var groupObj = groupList.get(group);

      if (groupObj.opacity !== undefined && newOptions.opacity === undefined) {
        if (!Node.checkOpacity(groupObj.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + groupObj.opacity);
          groupObj.opacity = undefined;
        }
      } // Skip any new option to avoid them being overridden by the group options.


      var skipProperties = filter$2(_context4 = getOwnPropertyNames$2(newOptions)).call(_context4, function (p) {
        return newOptions[p] != null;
      }); // Always skip merging group font options into parent; these are required to be distinct for labels


      skipProperties.push('font');
      selectiveNotDeepExtend(skipProperties, parentOptions, groupObj); // the color object needs to be completely defined.
      // Since groups can partially overwrite the colors, we parse it again, just in case.

      parentOptions.color = parseColor(parentOptions.color);
    }
    /**
     * This process all possible shorthands in the new options and makes sure that the parentOptions are fully defined.
     * Static so it can also be used by the handler.
     *
     * @param {Object} parentOptions
     * @param {Object} newOptions
     * @param {boolean} [allowDeletion=false]
     * @param {Object} [globalOptions={}]
     * @param {Object} [groupList]
     * @static
     */

  }, {
    key: "parseOptions",
    value: function parseOptions(parentOptions, newOptions) {
      var allowDeletion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var globalOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var groupList = arguments.length > 4 ? arguments[4] : undefined;
      var fields = ['color', 'fixed', 'shadow'];
      selectiveNotDeepExtend(fields, parentOptions, newOptions, allowDeletion);
      Node.checkMass(newOptions);

      if (parentOptions.opacity !== undefined) {
        if (!Node.checkOpacity(parentOptions.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + parentOptions.opacity);
          parentOptions.opacity = undefined;
        }
      }

      if (newOptions.opacity !== undefined) {
        if (!Node.checkOpacity(newOptions.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + newOptions.opacity);
          newOptions.opacity = undefined;
        }
      }

      if (newOptions.shapeProperties && !Node.checkCoordinateOrigin(newOptions.shapeProperties.coordinateOrigin)) {
        console.error("Invalid option for node coordinateOrigin, found: " + newOptions.shapeProperties.coordinateOrigin);
      } // merge the shadow options into the parent.


      mergeOptions(parentOptions, newOptions, 'shadow', globalOptions); // individual shape newOptions

      if (newOptions.color !== undefined && newOptions.color !== null) {
        var parsedColor = parseColor(newOptions.color);
        fillIfDefined(parentOptions.color, parsedColor);
      } else if (allowDeletion === true && newOptions.color === null) {
        parentOptions.color = bridgeObject(globalOptions.color); // set the object back to the global options
      } // handle the fixed options


      if (newOptions.fixed !== undefined && newOptions.fixed !== null) {
        if (typeof newOptions.fixed === 'boolean') {
          parentOptions.fixed.x = newOptions.fixed;
          parentOptions.fixed.y = newOptions.fixed;
        } else {
          if (newOptions.fixed.x !== undefined && typeof newOptions.fixed.x === 'boolean') {
            parentOptions.fixed.x = newOptions.fixed.x;
          }

          if (newOptions.fixed.y !== undefined && typeof newOptions.fixed.y === 'boolean') {
            parentOptions.fixed.y = newOptions.fixed.y;
          }
        }
      }

      if (allowDeletion === true && newOptions.font === null) {
        parentOptions.font = bridgeObject(globalOptions.font); // set the object back to the global options
      }

      Node.updateGroupOptions(parentOptions, newOptions, groupList); // handle the scaling options, specifically the label part

      if (newOptions.scaling !== undefined) {
        mergeOptions(parentOptions.scaling, newOptions.scaling, 'label', globalOptions.scaling);
      }
    }
  }, {
    key: "checkMass",
    value: function checkMass(options, id) {
      if (options.mass !== undefined && options.mass <= 0) {
        var strId = '';

        if (id !== undefined) {
          strId = ' in node id: ' + id;
        }

        console.log('%cNegative or zero mass disallowed' + strId + ', setting mass to 1.', printStyle);
        options.mass = 1;
      }
    }
  }]);

  return Node;
}();

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { var _context4; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = slice$5(_context4 = Object.prototype.toString.call(o)).call(_context4, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Handler for Nodes
 */

var NodesHandler = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Images} images
   * @param {Array.<Group>} groups
   * @param {LayoutEngine} layoutEngine
   */
  function NodesHandler(body, images, groups, layoutEngine) {
    var _context,
        _this = this;

    classCallCheck(this, NodesHandler);

    this.body = body;
    this.images = images;
    this.groups = groups;
    this.layoutEngine = layoutEngine; // create the node API in the body container

    this.body.functions.createNode = bind$2(_context = this.create).call(_context, this);
    this.nodesListeners = {
      add: function add(event, params) {
        _this.add(params.items);
      },
      update: function update(event, params) {
        _this.update(params.items, params.data, params.oldData);
      },
      remove: function remove(event, params) {
        _this.remove(params.items);
      }
    };
    this.defaultOptions = {
      borderWidth: 1,
      borderWidthSelected: 2,
      brokenImage: undefined,
      color: {
        border: '#2B7CE9',
        background: '#97C2FC',
        highlight: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        },
        hover: {
          border: '#2B7CE9',
          background: '#D2E5FF'
        }
      },
      opacity: undefined,
      // number between 0 and 1
      fixed: {
        x: false,
        y: false
      },
      font: {
        color: '#343434',
        size: 14,
        // px
        face: 'arial',
        background: 'none',
        strokeWidth: 0,
        // px
        strokeColor: '#ffffff',
        align: 'center',
        vadjust: 0,
        multi: false,
        bold: {
          mod: 'bold'
        },
        boldital: {
          mod: 'bold italic'
        },
        ital: {
          mod: 'italic'
        },
        mono: {
          mod: '',
          size: 15,
          // px
          face: 'monospace',
          vadjust: 2
        }
      },
      group: undefined,
      hidden: false,
      icon: {
        face: 'FontAwesome',
        //'FontAwesome',
        code: undefined,
        //'\uf007',
        size: 50,
        //50,
        color: '#2B7CE9' //'#aa00ff'

      },
      image: undefined,
      // --> URL
      imagePadding: {
        // only for image shape
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      label: undefined,
      labelHighlightBold: true,
      level: undefined,
      margin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      mass: 1,
      physics: true,
      scaling: {
        min: 10,
        max: 30,
        label: {
          enabled: false,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
        customScalingFunction: function customScalingFunction(min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            var scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        }
      },
      shadow: {
        enabled: false,
        color: 'rgba(0,0,0,0.5)',
        size: 10,
        x: 5,
        y: 5
      },
      shape: 'ellipse',
      shapeProperties: {
        borderDashes: false,
        // only for borders
        borderRadius: 6,
        // only for box shape
        interpolation: true,
        // only for image and circularImage shapes
        useImageSize: false,
        // only for image and circularImage shapes
        useBorderWithImage: false,
        // only for image shape
        coordinateOrigin: 'center' // only for image and circularImage shapes

      },
      size: 25,
      title: undefined,
      value: undefined,
      x: undefined,
      y: undefined
    }; // Protect from idiocy

    if (this.defaultOptions.mass <= 0) {
      throw 'Internal error: mass in defaultOptions of NodesHandler may not be zero or negative';
    }

    this.options = bridgeObject(this.defaultOptions);
    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(NodesHandler, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _context2,
          _context3,
          _this2 = this;

      // refresh the nodes. Used when reverting from hierarchical layout
      this.body.emitter.on('refreshNodes', bind$2(_context2 = this.refresh).call(_context2, this));
      this.body.emitter.on('refresh', bind$2(_context3 = this.refresh).call(_context3, this));
      this.body.emitter.on('destroy', function () {
        forEach$3(_this2.nodesListeners, function (callback, event) {
          if (_this2.body.data.nodes) _this2.body.data.nodes.off(event, callback);
        });
        delete _this2.body.functions.createNode;
        delete _this2.nodesListeners.add;
        delete _this2.nodesListeners.update;
        delete _this2.nodesListeners.remove;
        delete _this2.nodesListeners;
      });
    }
    /**
     *
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        Node.parseOptions(this.options, options); // Need to set opacity here because Node.parseOptions is also used for groups,
        // if you set opacity in Node.parseOptions it overwrites group opacity.

        if (options.opacity !== undefined) {
          if (isNan$2(options.opacity) || !_isFinite$2(options.opacity) || options.opacity < 0 || options.opacity > 1) {
            console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + options.opacity);
          } else {
            this.options.opacity = options.opacity;
          }
        } // update the shape in all nodes


        if (options.shape !== undefined) {
          for (var nodeId in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
              this.body.nodes[nodeId].updateShape();
            }
          }
        } // Update the labels of nodes if any relevant options changed.


        if (typeof options.font !== "undefined" || typeof options.widthConstraint !== "undefined" || typeof options.heightConstraint !== "undefined") {
          for (var _i = 0, _Object$keys = keys$3(this.body.nodes); _i < _Object$keys.length; _i++) {
            var _nodeId = _Object$keys[_i];

            this.body.nodes[_nodeId].updateLabelModule();

            this.body.nodes[_nodeId].needsRefresh();
          }
        } // update the shape size in all nodes


        if (options.size !== undefined) {
          for (var _nodeId2 in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, _nodeId2)) {
              this.body.nodes[_nodeId2].needsRefresh();
            }
          }
        } // update the state of the variables if needed


        if (options.hidden !== undefined || options.physics !== undefined) {
          this.body.emitter.emit('_dataChanged');
        }
      }
    }
    /**
     * Set a data set with nodes for the network
     * @param {Array | DataSet | DataView} nodes         The data containing the nodes.
     * @param {boolean} [doNotEmit=false]
     * @private
     */

  }, {
    key: "setData",
    value: function setData(nodes) {
      var doNotEmit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var oldNodesData = this.body.data.nodes;

      if (nodes instanceof DataSet || nodes instanceof DataView) {
        this.body.data.nodes = nodes;
      } else if (isArray$5(nodes)) {
        this.body.data.nodes = new DataSet();
        this.body.data.nodes.add(nodes);
      } else if (!nodes) {
        this.body.data.nodes = new DataSet();
      } else {
        throw new TypeError('Array or DataSet expected');
      }

      if (oldNodesData) {
        // unsubscribe from old dataset
        forEach$3(this.nodesListeners, function (callback, event) {
          oldNodesData.off(event, callback);
        });
      } // remove drawn nodes


      this.body.nodes = {};

      if (this.body.data.nodes) {
        // subscribe to new dataset
        var me = this;
        forEach$3(this.nodesListeners, function (callback, event) {
          me.body.data.nodes.on(event, callback);
        }); // draw all new nodes

        var ids = this.body.data.nodes.getIds();
        this.add(ids, true);
      }

      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    /**
     * Add nodes
     * @param {number[] | string[]} ids
     * @param {boolean} [doNotEmit=false]
     * @private
     */

  }, {
    key: "add",
    value: function add(ids) {
      var doNotEmit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var id;
      var newNodes = [];

      for (var i = 0; i < ids.length; i++) {
        id = ids[i];
        var properties = this.body.data.nodes.get(id);
        var node = this.create(properties);
        newNodes.push(node);
        this.body.nodes[id] = node; // note: this may replace an existing node
      }

      this.layoutEngine.positionInitially(newNodes);

      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    /**
     * Update existing nodes, or create them when not yet existing
     * @param {number[] | string[]} ids id's of changed nodes
     * @param {Array} changedData array with changed data
     * @param {Array|undefined} oldData optional; array with previous data
     * @private
     */

  }, {
    key: "update",
    value: function update(ids, changedData, oldData) {
      var nodes = this.body.nodes;
      var dataChanged = false;

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var node = nodes[id];
        var data = changedData[i];

        if (node !== undefined) {
          // update node
          if (node.setOptions(data)) {
            dataChanged = true;
          }
        } else {
          dataChanged = true; // create node

          node = this.create(data);
          nodes[id] = node;
        }
      }

      if (!dataChanged && oldData !== undefined) {
        // Check for any changes which should trigger a layout recalculation
        // For now, this is just 'level' for hierarchical layout
        // Assumption: old and new data arranged in same order; at time of writing, this holds.
        dataChanged = some$2(changedData).call(changedData, function (newValue, index) {
          var oldValue = oldData[index];
          return oldValue && oldValue.level !== newValue.level;
        });
      }

      if (dataChanged === true) {
        this.body.emitter.emit("_dataChanged");
      } else {
        this.body.emitter.emit("_dataUpdated");
      }
    }
    /**
     * Remove existing nodes. If nodes do not exist, the method will just ignore it.
     * @param {number[] | string[]} ids
     * @private
     */

  }, {
    key: "remove",
    value: function remove(ids) {
      var nodes = this.body.nodes;

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        delete nodes[id];
      }

      this.body.emitter.emit("_dataChanged");
    }
    /**
     * create a node
     * @param {Object} properties
     * @param {class} [constructorClass=Node.default]
     * @returns {*}
     */

  }, {
    key: "create",
    value: function create(properties) {
      var constructorClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Node;
      return new constructorClass(properties, this.body, this.images, this.groups, this.options, this.defaultOptions);
    }
    /**
     *
     * @param {boolean} [clearPositions=false]
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;

      var clearPositions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      forEach$3(this.body.nodes, function (node, nodeId) {
        var data = _this3.body.data.nodes.get(nodeId);

        if (data !== undefined) {
          if (clearPositions === true) {
            node.setOptions({
              x: null,
              y: null
            });
          }

          node.setOptions({
            fixed: false
          });
          node.setOptions(data);
        }
      });
    }
    /**
     * Returns the positions of the nodes.
     * @param {Array.<Node.id>|String} [ids]  --> optional, can be array of nodeIds, can be string
     * @returns {{}}
     */

  }, {
    key: "getPositions",
    value: function getPositions(ids) {
      var dataArray = {};

      if (ids !== undefined) {
        if (isArray$5(ids) === true) {
          for (var i = 0; i < ids.length; i++) {
            if (this.body.nodes[ids[i]] !== undefined) {
              var node = this.body.nodes[ids[i]];
              dataArray[ids[i]] = {
                x: Math.round(node.x),
                y: Math.round(node.y)
              };
            }
          }
        } else {
          if (this.body.nodes[ids] !== undefined) {
            var _node = this.body.nodes[ids];
            dataArray[ids] = {
              x: Math.round(_node.x),
              y: Math.round(_node.y)
            };
          }
        }
      } else {
        for (var _i2 = 0; _i2 < this.body.nodeIndices.length; _i2++) {
          var _node2 = this.body.nodes[this.body.nodeIndices[_i2]];
          dataArray[this.body.nodeIndices[_i2]] = {
            x: Math.round(_node2.x),
            y: Math.round(_node2.y)
          };
        }
      }

      return dataArray;
    }
    /**
     * Retrieves the x y position of a specific id.
     *
     * @param {string} id The id to retrieve.
     *
     * @throws {TypeError} If no id is included.
     * @throws {ReferenceError} If an invalid id is provided.
     *
     * @returns {{ x: number, y: number }} Returns X, Y canvas position of the node with given id.
     */

  }, {
    key: "getPosition",
    value: function getPosition(id) {
      if (id == undefined) {
        throw new TypeError("No id was specified for getPosition method.");
      } else if (this.body.nodes[id] == undefined) {
        throw new ReferenceError("NodeId provided for getPosition does not exist. Provided: ".concat(id));
      } else {
        return {
          x: Math.round(this.body.nodes[id].x),
          y: Math.round(this.body.nodes[id].y)
        };
      }
    }
    /**
     * Load the XY positions of the nodes into the dataset.
     */

  }, {
    key: "storePositions",
    value: function storePositions() {
      // todo: add support for clusters and hierarchical.
      var dataArray = [];
      var dataset = this.body.data.nodes.getDataSet();

      var _iterator = _createForOfIteratorHelper$1(dataset.get()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dsNode = _step.value;
          var id = dsNode.id;
          var bodyNode = this.body.nodes[id];
          var x = Math.round(bodyNode.x);
          var y = Math.round(bodyNode.y);

          if (dsNode.x !== x || dsNode.y !== y) {
            dataArray.push({
              id: id,
              x: x,
              y: y
            });
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      dataset.update(dataArray);
    }
    /**
     * get the bounding box of a node.
     * @param {Node.id} nodeId
     * @returns {j|*}
     */

  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(nodeId) {
      if (this.body.nodes[nodeId] !== undefined) {
        return this.body.nodes[nodeId].shape.boundingBox;
      }
    }
    /**
     * Get the Ids of nodes connected to this node.
     * @param {Node.id} nodeId
     * @param {'to'|'from'|undefined} direction values 'from' and 'to' select respectively parent and child nodes only.
     *                                          Any other value returns both parent and child nodes.
     * @returns {Array}
     */

  }, {
    key: "getConnectedNodes",
    value: function getConnectedNodes(nodeId, direction) {
      var nodeList = [];

      if (this.body.nodes[nodeId] !== undefined) {
        var node = this.body.nodes[nodeId];
        var nodeObj = {}; // used to quickly check if node already exists

        for (var i = 0; i < node.edges.length; i++) {
          var edge = node.edges[i];

          if (direction !== 'to' && edge.toId == node.id) {
            // these are double equals since ids can be numeric or string
            if (nodeObj[edge.fromId] === undefined) {
              nodeList.push(edge.fromId);
              nodeObj[edge.fromId] = true;
            }
          } else if (direction !== 'from' && edge.fromId == node.id) {
            // these are double equals since ids can be numeric or string
            if (nodeObj[edge.toId] === undefined) {
              nodeList.push(edge.toId);
              nodeObj[edge.toId] = true;
            }
          }
        }
      }

      return nodeList;
    }
    /**
     * Get the ids of the edges connected to this node.
     * @param {Node.id} nodeId
     * @returns {*}
     */

  }, {
    key: "getConnectedEdges",
    value: function getConnectedEdges(nodeId) {
      var edgeList = [];

      if (this.body.nodes[nodeId] !== undefined) {
        var node = this.body.nodes[nodeId];

        for (var i = 0; i < node.edges.length; i++) {
          edgeList.push(node.edges[i].id);
        }
      } else {
        console.log("NodeId provided for getConnectedEdges does not exist. Provided: ", nodeId);
      }

      return edgeList;
    }
    /**
     * Move a node.
     *
     * @param {Node.id} nodeId
     * @param {number} x
     * @param {number} y
     */

  }, {
    key: "moveNode",
    value: function moveNode(nodeId, x, y) {
      var _this4 = this;

      if (this.body.nodes[nodeId] !== undefined) {
        this.body.nodes[nodeId].x = Number(x);
        this.body.nodes[nodeId].y = Number(y);

        setTimeout$2(function () {
          _this4.body.emitter.emit("startSimulation");
        }, 0);
      } else {
        console.log("Node id supplied to moveNode does not exist. Provided: ", nodeId);
      }
    }
  }]);

  return NodesHandler;
}();

var getOwnPropertyDescriptor$4 = getOwnPropertyDescriptor_1;

var getOwnPropertyDescriptor$5 = getOwnPropertyDescriptor$4;

// https://tc39.github.io/ecma262/#sec-reflect.get

function get$1(target, propertyKey
/* , receiver */
) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = objectGetOwnPropertyDescriptor.f(target, propertyKey)) return has(descriptor, 'value') ? descriptor.value : descriptor.get === undefined ? undefined : descriptor.get.call(receiver);
  if (isObject(prototype = objectGetPrototypeOf(target))) return get$1(prototype, propertyKey, receiver);
}

_export({
  target: 'Reflect',
  stat: true
}, {
  get: get$1
});

var get$2 = path.Reflect.get;

var get$3 = get$2;

var get$4 = get$3;

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf$5(object);
    if (object === null) break;
  }

  return object;
}

var superPropBase = _superPropBase;

var get$5 = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && get$4) {
      module.exports = _get = get$4;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;

        var desc = getOwnPropertyDescriptor$5(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
});

var $hypot = Math.hypot;
var abs$1 = Math.abs;
var sqrt = Math.sqrt; // Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546

var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity; // `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot

_export({
  target: 'Math',
  stat: true,
  forced: BUGGY
}, {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;

    while (i < aLen) {
      arg = abs$1(arguments[i++]);

      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }

    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

var hypot = path.Math.hypot;

var hypot$1 = hypot;

var hypot$2 = hypot$1;

function _createSuper$i(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$i(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$i() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Common methods for endpoints
 *
 * @class
 */

var EndPoint = /*#__PURE__*/function () {
  function EndPoint() {
    classCallCheck(this, EndPoint);
  }

  createClass(EndPoint, null, [{
    key: "transform",

    /**
     * Apply transformation on points for display.
     *
     * The following is done:
     * - rotate by the specified angle
     * - multiply the (normalized) coordinates by the passed length
     * - offset by the target coordinates
     *
     * @param points - The point(s) to be transformed.
     * @param arrowData - The data determining the result of the transformation.
     */
    value: function transform(points, arrowData) {
      if (!isArray$5(points)) {
        points = [points];
      }

      var x = arrowData.point.x;
      var y = arrowData.point.y;
      var angle = arrowData.angle;
      var length = arrowData.length;

      for (var i = 0; i < points.length; ++i) {
        var p = points[i];
        var xt = p.x * Math.cos(angle) - p.y * Math.sin(angle);
        var yt = p.x * Math.sin(angle) + p.y * Math.cos(angle);
        p.x = x + length * xt;
        p.y = y + length * yt;
      }
    }
    /**
     * Draw a closed path using the given real coordinates.
     *
     * @param ctx - The path will be rendered into this context.
     * @param points - The points of the path.
     */

  }, {
    key: "drawPath",
    value: function drawPath(ctx, points) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (var i = 1; i < points.length; ++i) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.closePath();
    }
  }]);

  return EndPoint;
}();
/**
 * Drawing methods for the arrow endpoint.
 */


var Image$2 = /*#__PURE__*/function (_EndPoint) {
  inherits(Image, _EndPoint);

  var _super = _createSuper$i(Image);

  function Image() {
    classCallCheck(this, Image);

    return _super.apply(this, arguments);
  }

  createClass(Image, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns False as there is no way to fill an image.
     */
    value: function draw(ctx, arrowData) {
      if (arrowData.image) {
        ctx.save();
        ctx.translate(arrowData.point.x, arrowData.point.y);
        ctx.rotate(Math.PI / 2 + arrowData.angle);
        var width = arrowData.imageWidth != null ? arrowData.imageWidth : arrowData.image.width;
        var height = arrowData.imageHeight != null ? arrowData.imageHeight : arrowData.image.height;
        arrowData.image.drawImageAtPosition(ctx, 1, // scale
        -width / 2, // x
        0, // y
        width, height);
        ctx.restore();
      }

      return false;
    }
  }]);

  return Image;
}(EndPoint);
/**
 * Drawing methods for the arrow endpoint.
 */


var Arrow = /*#__PURE__*/function (_EndPoint2) {
  inherits(Arrow, _EndPoint2);

  var _super2 = _createSuper$i(Arrow);

  function Arrow() {
    classCallCheck(this, Arrow);

    return _super2.apply(this, arguments);
  }

  createClass(Arrow, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var points = [{
        x: 0,
        y: 0
      }, {
        x: -1,
        y: 0.3
      }, {
        x: -0.9,
        y: 0
      }, {
        x: -1,
        y: -0.3
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Arrow;
}(EndPoint);
/**
 * Drawing methods for the crow endpoint.
 */


var Crow = /*#__PURE__*/function () {
  function Crow() {
    classCallCheck(this, Crow);
  }

  createClass(Crow, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var points = [{
        x: -1,
        y: 0
      }, {
        x: 0,
        y: 0.3
      }, {
        x: -0.4,
        y: 0
      }, {
        x: 0,
        y: -0.3
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Crow;
}();
/**
 * Drawing methods for the curve endpoint.
 */


var Curve = /*#__PURE__*/function () {
  function Curve() {
    classCallCheck(this, Curve);
  }

  createClass(Curve, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var point = {
        x: -0.4,
        y: 0
      };
      EndPoint.transform(point, arrowData); // Update endpoint style for drawing transparent arc.

      ctx.strokeStyle = ctx.fillStyle;
      ctx.fillStyle = "rgba(0, 0, 0, 0)"; // Define curve endpoint as semicircle.

      var pi = Math.PI;
      var startAngle = arrowData.angle - pi / 2;
      var endAngle = arrowData.angle + pi / 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
      ctx.stroke();
      return true;
    }
  }]);

  return Curve;
}();
/**
 * Drawing methods for the inverted curve endpoint.
 */


var InvertedCurve = /*#__PURE__*/function () {
  function InvertedCurve() {
    classCallCheck(this, InvertedCurve);
  }

  createClass(InvertedCurve, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var point = {
        x: -0.3,
        y: 0
      };
      EndPoint.transform(point, arrowData); // Update endpoint style for drawing transparent arc.

      ctx.strokeStyle = ctx.fillStyle;
      ctx.fillStyle = "rgba(0, 0, 0, 0)"; // Define inverted curve endpoint as semicircle.

      var pi = Math.PI;
      var startAngle = arrowData.angle + pi / 2;
      var endAngle = arrowData.angle + 3 * pi / 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
      ctx.stroke();
      return true;
    }
  }]);

  return InvertedCurve;
}();
/**
 * Drawing methods for the trinagle endpoint.
 */


var Triangle$1 = /*#__PURE__*/function () {
  function Triangle() {
    classCallCheck(this, Triangle);
  }

  createClass(Triangle, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var points = [{
        x: 0.02,
        y: 0
      }, {
        x: -1,
        y: 0.3
      }, {
        x: -1,
        y: -0.3
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Triangle;
}();
/**
 * Drawing methods for the inverted trinagle endpoint.
 */


var InvertedTriangle = /*#__PURE__*/function () {
  function InvertedTriangle() {
    classCallCheck(this, InvertedTriangle);
  }

  createClass(InvertedTriangle, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var points = [{
        x: 0,
        y: 0.3
      }, {
        x: 0,
        y: -0.3
      }, {
        x: -1,
        y: 0
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return InvertedTriangle;
}();
/**
 * Drawing methods for the circle endpoint.
 */


var Circle$1 = /*#__PURE__*/function () {
  function Circle() {
    classCallCheck(this, Circle);
  }

  createClass(Circle, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      var point = {
        x: -0.4,
        y: 0
      };
      EndPoint.transform(point, arrowData);
      drawCircle(ctx, point.x, point.y, arrowData.length * 0.4);
      return true;
    }
  }]);

  return Circle;
}();
/**
 * Drawing methods for the bar endpoint.
 */


var Bar = /*#__PURE__*/function () {
  function Bar() {
    classCallCheck(this, Bar);
  }

  createClass(Bar, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      /*
      var points = [
        {x:0, y:0.5},
        {x:0, y:-0.5}
      ];
           EndPoint.transform(points, arrowData);
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.stroke();
      */
      var points = [{
        x: 0,
        y: 0.5
      }, {
        x: 0,
        y: -0.5
      }, {
        x: -0.15,
        y: -0.5
      }, {
        x: -0.15,
        y: 0.5
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Bar;
}();
/**
 * Drawing methods for the box endpoint.
 */


var Box$1 = /*#__PURE__*/function () {
  function Box() {
    classCallCheck(this, Box);
  }

  createClass(Box, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      var points = [{
        x: 0,
        y: 0.3
      }, {
        x: 0,
        y: -0.3
      }, {
        x: -0.6,
        y: -0.3
      }, {
        x: -0.6,
        y: 0.3
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Box;
}();
/**
 * Drawing methods for the diamond endpoint.
 */


var Diamond$1 = /*#__PURE__*/function () {
  function Diamond() {
    classCallCheck(this, Diamond);
  }

  createClass(Diamond, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      var points = [{
        x: 0,
        y: 0
      }, {
        x: -0.5,
        y: -0.3
      }, {
        x: -1,
        y: 0
      }, {
        x: -0.5,
        y: 0.3
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Diamond;
}();
/**
 * Drawing methods for the vee endpoint.
 */


var Vee = /*#__PURE__*/function () {
  function Vee() {
    classCallCheck(this, Vee);
  }

  createClass(Vee, null, [{
    key: "draw",

    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    value: function draw(ctx, arrowData) {
      // Normalized points of closed path, in the order that they should be drawn.
      // (0, 0) is the attachment point, and the point around which should be rotated
      var points = [{
        x: -1,
        y: 0.3
      }, {
        x: -0.5,
        y: 0
      }, {
        x: -1,
        y: -0.3
      }, {
        x: 0,
        y: 0
      }];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  }]);

  return Vee;
}();
/**
 * Drawing methods for the endpoints.
 */


var EndPoints = /*#__PURE__*/function () {
  function EndPoints() {
    classCallCheck(this, EndPoints);
  }

  createClass(EndPoints, null, [{
    key: "draw",

    /**
     * Draw an endpoint.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     *
     * @returns True if ctx.fill() can be used to fill the arrow, false otherwise.
     */
    value: function draw(ctx, arrowData) {
      var type;

      if (arrowData.type) {
        type = arrowData.type.toLowerCase();
      }

      switch (type) {
        case "image":
          return Image$2.draw(ctx, arrowData);

        case "circle":
          return Circle$1.draw(ctx, arrowData);

        case "box":
          return Box$1.draw(ctx, arrowData);

        case "crow":
          return Crow.draw(ctx, arrowData);

        case "curve":
          return Curve.draw(ctx, arrowData);

        case "diamond":
          return Diamond$1.draw(ctx, arrowData);

        case "inv_curve":
          return InvertedCurve.draw(ctx, arrowData);

        case "triangle":
          return Triangle$1.draw(ctx, arrowData);

        case "inv_triangle":
          return InvertedTriangle.draw(ctx, arrowData);

        case "bar":
          return Bar.draw(ctx, arrowData);

        case "vee":
          return Vee.draw(ctx, arrowData);

        case "arrow": // fall-through

        default:
          return Arrow.draw(ctx, arrowData);
      }
    }
  }]);

  return EndPoints;
}();

function ownKeys$4(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; forEach$2(_context2 = ownKeys$4(Object(source), true)).call(_context2, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context3; forEach$2(_context3 = ownKeys$4(Object(source))).call(_context3, function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }
/**
 * The Base Class for all edges.
 */

var EdgeBase = /*#__PURE__*/function () {
  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param _body - The body of the network.
   * @param _labelModule - Label module.
   */
  function EdgeBase(options, _body, _labelModule) {
    classCallCheck(this, EdgeBase);

    this._body = _body;
    this._labelModule = _labelModule;
    this.color = {};
    this.colorDirty = true;
    this.hoverWidth = 1.5;
    this.selectionWidth = 2;
    this.setOptions(options);
    this.fromPoint = this.from;
    this.toPoint = this.to;
  }
  /** @inheritdoc */


  createClass(EdgeBase, [{
    key: "connect",
    value: function connect() {
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
    }
    /** @inheritdoc */

  }, {
    key: "cleanup",
    value: function cleanup() {
      return false;
    }
    /**
     * Set new edge options.
     *
     * @param options - The new edge options object.
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
      this.id = this.options.id;
    }
    /** @inheritdoc */

  }, {
    key: "drawLine",
    value: function drawLine(ctx, values, _selected, _hover) {
      var viaNode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.getViaNode();
      // set style
      ctx.strokeStyle = this.getColor(ctx, values);
      ctx.lineWidth = values.width;

      if (values.dashes !== false) {
        this._drawDashedLine(ctx, values, viaNode);
      } else {
        this._drawLine(ctx, values, viaNode);
      }
    }
    /**
     * Draw a line with given style between two nodes through supplied node(s).
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param viaNode - Additional control point(s) for the edge.
     * @param fromPoint - TODO: Seems ignored, remove?
     * @param toPoint - TODO: Seems ignored, remove?
     */

  }, {
    key: "_drawLine",
    value: function _drawLine(ctx, values, viaNode, fromPoint, toPoint) {
      if (this.from != this.to) {
        // draw line
        this._line(ctx, values, viaNode, fromPoint, toPoint);
      } else {
        var _this$_getCircleData = this._getCircleData(ctx),
            _this$_getCircleData2 = slicedToArray(_this$_getCircleData, 3),
            x = _this$_getCircleData2[0],
            y = _this$_getCircleData2[1],
            radius = _this$_getCircleData2[2];

        this._circle(ctx, values, x, y, radius);
      }
    }
    /**
     * Draw a dashed line with given style between two nodes through supplied node(s).
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param viaNode - Additional control point(s) for the edge.
     * @param _fromPoint - Ignored (TODO: remove in the future).
     * @param _toPoint - Ignored (TODO: remove in the future).
     */

  }, {
    key: "_drawDashedLine",
    value: function _drawDashedLine(ctx, values, viaNode, _fromPoint, _toPoint) {
      ctx.lineCap = "round";
      var pattern = isArray$5(values.dashes) ? values.dashes : [5, 5]; // only firefox and chrome support this method, else we use the legacy one.

      if (ctx.setLineDash !== undefined) {
        ctx.save(); // set dash settings for chrome or firefox

        ctx.setLineDash(pattern);
        ctx.lineDashOffset = 0; // draw the line

        if (this.from != this.to) {
          // draw line
          this._line(ctx, values, viaNode);
        } else {
          var _this$_getCircleData3 = this._getCircleData(ctx),
              _this$_getCircleData4 = slicedToArray(_this$_getCircleData3, 3),
              x = _this$_getCircleData4[0],
              y = _this$_getCircleData4[1],
              radius = _this$_getCircleData4[2];

          this._circle(ctx, values, x, y, radius);
        } // restore the dash settings.


        ctx.setLineDash([0]);
        ctx.lineDashOffset = 0;
        ctx.restore();
      } else {
        // unsupporting smooth lines
        if (this.from != this.to) {
          // draw line
          drawDashedLine(ctx, this.from.x, this.from.y, this.to.x, this.to.y, pattern);
        } else {
          var _this$_getCircleData5 = this._getCircleData(ctx),
              _this$_getCircleData6 = slicedToArray(_this$_getCircleData5, 3),
              _x = _this$_getCircleData6[0],
              _y = _this$_getCircleData6[1],
              _radius = _this$_getCircleData6[2];

          this._circle(ctx, values, _x, _y, _radius);
        } // draw shadow if enabled


        this.enableShadow(ctx, values);
        ctx.stroke(); // disable shadows for other elements.

        this.disableShadow(ctx, values);
      }
    }
    /**
     * Find the intersection between the border of the node and the edge.
     *
     * @param node - The node (either from or to node of the edge).
     * @param ctx - The context that will be used for rendering.
     * @param options - Additional options.
     *
     * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
     */

  }, {
    key: "findBorderPosition",
    value: function findBorderPosition(node, ctx, options) {
      if (this.from != this.to) {
        return this._findBorderPosition(node, ctx, options);
      } else {
        return this._findBorderPositionCircle(node, ctx, options);
      }
    }
    /** @inheritdoc */

  }, {
    key: "findBorderPositions",
    value: function findBorderPositions(ctx) {
      if (this.from != this.to) {
        return {
          from: this._findBorderPosition(this.from, ctx),
          to: this._findBorderPosition(this.to, ctx)
        };
      } else {
        var _context;

        var _this$_getCircleData$ = slice$5(_context = this._getCircleData(ctx)).call(_context, 0, 2),
            _this$_getCircleData$2 = slicedToArray(_this$_getCircleData$, 2),
            x = _this$_getCircleData$2[0],
            y = _this$_getCircleData$2[1];

        return {
          from: this._findBorderPositionCircle(this.from, ctx, {
            x: x,
            y: y,
            low: 0.25,
            high: 0.6,
            direction: -1
          }),
          to: this._findBorderPositionCircle(this.from, ctx, {
            x: x,
            y: y,
            low: 0.6,
            high: 0.8,
            direction: 1
          })
        };
      }
    }
    /**
     * Compute the center point and radius of an edge connected to the same node at both ends.
     *
     * @param ctx - The context that will be used for rendering.
     *
     * @returns `[x, y, radius]`
     */

  }, {
    key: "_getCircleData",
    value: function _getCircleData(ctx) {
      var radius = this.options.selfReference.size;

      if (ctx !== undefined) {
        if (this.from.shape.width === undefined) {
          this.from.shape.resize(ctx);
        }
      } // get circle coordinates


      var coordinates = getSelfRefCoordinates(ctx, this.options.selfReference.angle, radius, this.from);
      return [coordinates.x, coordinates.y, radius];
    }
    /**
     * Get a point on a circle.
     *
     * @param x - Center of the circle on the x axis.
     * @param y - Center of the circle on the y axis.
     * @param radius - Radius of the circle.
     * @param position - Value between 0 (line start) and 1 (line end).
     *
     * @returns Cartesian coordinates of requested point on the circle.
     */

  }, {
    key: "_pointOnCircle",
    value: function _pointOnCircle(x, y, radius, position) {
      var angle = position * 2 * Math.PI;
      return {
        x: x + radius * Math.cos(angle),
        y: y - radius * Math.sin(angle)
      };
    }
    /**
     * Find the intersection between the border of the node and the edge.
     *
     * @remarks
     * This function uses binary search to look for the point where the circle crosses the border of the node.
     *
     * @param nearNode - The node (either from or to node of the edge).
     * @param ctx - The context that will be used for rendering.
     * @param options - Additional options.
     *
     * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
     */

  }, {
    key: "_findBorderPositionCircle",
    value: function _findBorderPositionCircle(nearNode, ctx, options) {
      var x = options.x;
      var y = options.y;
      var low = options.low;
      var high = options.high;
      var direction = options.direction;
      var maxIterations = 10;
      var radius = this.options.selfReference.size;
      var threshold = 0.05;
      var pos;
      var middle = (low + high) * 0.5;
      var endPointOffset = 0;

      if (this.options.arrowStrikethrough === true) {
        if (direction === -1) {
          endPointOffset = this.options.endPointOffset.from;
        } else if (direction === 1) {
          endPointOffset = this.options.endPointOffset.to;
        }
      }

      var iteration = 0;

      do {
        middle = (low + high) * 0.5;
        pos = this._pointOnCircle(x, y, radius, middle);
        var angle = Math.atan2(nearNode.y - pos.y, nearNode.x - pos.x);
        var distanceToBorder = nearNode.distanceToBorder(ctx, angle) + endPointOffset;
        var distanceToPoint = Math.sqrt(Math.pow(pos.x - nearNode.x, 2) + Math.pow(pos.y - nearNode.y, 2));
        var difference = distanceToBorder - distanceToPoint;

        if (Math.abs(difference) < threshold) {
          break; // found
        } else if (difference > 0) {
          // distance to nodes is larger than distance to border --> t needs to be bigger if we're looking at the to node.
          if (direction > 0) {
            low = middle;
          } else {
            high = middle;
          }
        } else {
          if (direction > 0) {
            high = middle;
          } else {
            low = middle;
          }
        }

        ++iteration;
      } while (low <= high && iteration < maxIterations);

      return _objectSpread$2(_objectSpread$2({}, pos), {}, {
        t: middle
      });
    }
    /**
     * Get the line width of the edge. Depends on width and whether one of the connected nodes is selected.
     *
     * @param selected - Determines wheter the line is selected.
     * @param hover - Determines wheter the line is being hovered, only applies if selected is false.
     *
     * @returns The width of the line.
     */

  }, {
    key: "getLineWidth",
    value: function getLineWidth(selected, hover) {
      if (selected === true) {
        return Math.max(this.selectionWidth, 0.3 / this._body.view.scale);
      } else if (hover === true) {
        return Math.max(this.hoverWidth, 0.3 / this._body.view.scale);
      } else {
        return Math.max(this.options.width, 0.3 / this._body.view.scale);
      }
    }
    /**
     * Compute the color or gradient for given edge.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param _selected - Ignored (TODO: remove in the future).
     * @param _hover - Ignored (TODO: remove in the future).
     *
     * @returns Color string if single color is inherited or gradient if two.
     */

  }, {
    key: "getColor",
    value: function getColor(ctx, values) {
      if (values.inheritsColor !== false) {
        // when this is a loop edge, just use the 'from' method
        if (values.inheritsColor === "both" && this.from.id !== this.to.id) {
          var grd = ctx.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y);
          var fromColor = this.from.options.color.highlight.border;
          var toColor = this.to.options.color.highlight.border;

          if (this.from.selected === false && this.to.selected === false) {
            fromColor = overrideOpacity(this.from.options.color.border, values.opacity);
            toColor = overrideOpacity(this.to.options.color.border, values.opacity);
          } else if (this.from.selected === true && this.to.selected === false) {
            toColor = this.to.options.color.border;
          } else if (this.from.selected === false && this.to.selected === true) {
            fromColor = this.from.options.color.border;
          }

          grd.addColorStop(0, fromColor);
          grd.addColorStop(1, toColor); // -------------------- this returns -------------------- //

          return grd;
        }

        if (values.inheritsColor === "to") {
          return overrideOpacity(this.to.options.color.border, values.opacity);
        } else {
          // "from"
          return overrideOpacity(this.from.options.color.border, values.opacity);
        }
      } else {
        return overrideOpacity(values.color, values.opacity);
      }
    }
    /**
     * Draw a line from a node to itself, a circle.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param x - Center of the circle on the x axis.
     * @param y - Center of the circle on the y axis.
     * @param radius - Radius of the circle.
     */

  }, {
    key: "_circle",
    value: function _circle(ctx, values, x, y, radius) {
      // draw shadow if enabled
      this.enableShadow(ctx, values); //full circle

      var angleFrom = 0;
      var angleTo = Math.PI * 2;

      if (!this.options.selfReference.renderBehindTheNode) {
        //render only parts which are not overlaping with parent node
        //need to find x,y of from point and x,y to point
        //calculating radians
        var low = this.options.selfReference.angle;
        var high = this.options.selfReference.angle + Math.PI;

        var pointTFrom = this._findBorderPositionCircle(this.from, ctx, {
          x: x,
          y: y,
          low: low,
          high: high,
          direction: -1
        });

        var pointTTo = this._findBorderPositionCircle(this.from, ctx, {
          x: x,
          y: y,
          low: low,
          high: high,
          direction: 1
        });

        angleFrom = Math.atan2(pointTFrom.y - y, pointTFrom.x - x);
        angleTo = Math.atan2(pointTTo.y - y, pointTTo.x - x);
      } // draw a circle


      ctx.beginPath();
      ctx.arc(x, y, radius, angleFrom, angleTo, false);
      ctx.stroke(); // disable shadows for other elements.

      this.disableShadow(ctx, values);
    }
    /**
     * @inheritdoc
     *
     * @remarks
     * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
     */

  }, {
    key: "getDistanceToEdge",
    value: function getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      if (this.from != this.to) {
        return this._getDistanceToEdge(x1, y1, x2, y2, x3, y3);
      } else {
        var _this$_getCircleData7 = this._getCircleData(undefined),
            _this$_getCircleData8 = slicedToArray(_this$_getCircleData7, 3),
            x = _this$_getCircleData8[0],
            y = _this$_getCircleData8[1],
            radius = _this$_getCircleData8[2];

        var dx = x - x3;
        var dy = y - y3;
        return Math.abs(Math.sqrt(dx * dx + dy * dy) - radius);
      }
    }
    /**
     * Calculate the distance between a point (x3, y3) and a line segment from (x1, y1) to (x2, y2).
     *
     * @param x1 - First end of the line segment on the x axis.
     * @param y1 - First end of the line segment on the y axis.
     * @param x2 - Second end of the line segment on the x axis.
     * @param y2 - Second end of the line segment on the y axis.
     * @param x3 - Position of the point on the x axis.
     * @param y3 - Position of the point on the y axis.
     *
     * @returns The distance between the line segment and the point.
     */

  }, {
    key: "_getDistanceToLine",
    value: function _getDistanceToLine(x1, y1, x2, y2, x3, y3) {
      var px = x2 - x1;
      var py = y2 - y1;
      var something = px * px + py * py;
      var u = ((x3 - x1) * px + (y3 - y1) * py) / something;

      if (u > 1) {
        u = 1;
      } else if (u < 0) {
        u = 0;
      }

      var x = x1 + u * px;
      var y = y1 + u * py;
      var dx = x - x3;
      var dy = y - y3; //# Note: If the actual distance does not matter,
      //# if you only want to compare what this function
      //# returns to other results of this function, you
      //# can just return the squared distance instead
      //# (i.e. remove the sqrt) to gain a little performance

      return Math.sqrt(dx * dx + dy * dy);
    }
    /** @inheritdoc */

  }, {
    key: "getArrowData",
    value: function getArrowData(ctx, position, viaNode, _selected, _hover, values) {
      // set lets
      var angle;
      var arrowPoint;
      var node1;
      var node2;
      var reversed;
      var scaleFactor;
      var type;
      var lineWidth = values.width;

      if (position === "from") {
        node1 = this.from;
        node2 = this.to;
        reversed = values.fromArrowScale < 0;
        scaleFactor = Math.abs(values.fromArrowScale);
        type = values.fromArrowType;
      } else if (position === "to") {
        node1 = this.to;
        node2 = this.from;
        reversed = values.toArrowScale < 0;
        scaleFactor = Math.abs(values.toArrowScale);
        type = values.toArrowType;
      } else {
        node1 = this.to;
        node2 = this.from;
        reversed = values.middleArrowScale < 0;
        scaleFactor = Math.abs(values.middleArrowScale);
        type = values.middleArrowType;
      }

      var length = 15 * scaleFactor + 3 * lineWidth; // 3* lineWidth is the width of the edge.
      // if not connected to itself

      if (node1 != node2) {
        var approximateEdgeLength = hypot$2(node1.x - node2.x, node1.y - node2.y);

        var relativeLength = length / approximateEdgeLength;

        if (position !== "middle") {
          // draw arrow head
          if (this.options.smooth.enabled === true) {
            var pointT = this._findBorderPosition(node1, ctx, {
              via: viaNode
            });

            var guidePos = this.getPoint(pointT.t + relativeLength * (position === "from" ? 1 : -1), viaNode);
            angle = Math.atan2(pointT.y - guidePos.y, pointT.x - guidePos.x);
            arrowPoint = pointT;
          } else {
            angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
            arrowPoint = this._findBorderPosition(node1, ctx);
          }
        } else {
          // Negative half length reverses arrow direction.
          var halfLength = (reversed ? -relativeLength : relativeLength) / 2;
          var guidePos1 = this.getPoint(0.5 + halfLength, viaNode);
          var guidePos2 = this.getPoint(0.5 - halfLength, viaNode);
          angle = Math.atan2(guidePos1.y - guidePos2.y, guidePos1.x - guidePos2.x);
          arrowPoint = this.getPoint(0.5, viaNode);
        }
      } else {
        // draw circle
        var _this$_getCircleData9 = this._getCircleData(ctx),
            _this$_getCircleData10 = slicedToArray(_this$_getCircleData9, 3),
            x = _this$_getCircleData10[0],
            y = _this$_getCircleData10[1],
            radius = _this$_getCircleData10[2];

        if (position === "from") {
          var low = this.options.selfReference.angle;
          var high = this.options.selfReference.angle + Math.PI;

          var _pointT = this._findBorderPositionCircle(this.from, ctx, {
            x: x,
            y: y,
            low: low,
            high: high,
            direction: -1
          });

          angle = _pointT.t * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
          arrowPoint = _pointT;
        } else if (position === "to") {
          var _low = this.options.selfReference.angle;

          var _high = this.options.selfReference.angle + Math.PI;

          var _pointT2 = this._findBorderPositionCircle(this.from, ctx, {
            x: x,
            y: y,
            low: _low,
            high: _high,
            direction: 1
          });

          angle = _pointT2.t * -2 * Math.PI + 1.5 * Math.PI - 1.1 * Math.PI;
          arrowPoint = _pointT2;
        } else {
          var pos = this.options.selfReference.angle / (2 * Math.PI);
          arrowPoint = this._pointOnCircle(x, y, radius, pos);
          angle = pos * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
        }
      }

      var xi = arrowPoint.x - length * 0.9 * Math.cos(angle);
      var yi = arrowPoint.y - length * 0.9 * Math.sin(angle);
      var arrowCore = {
        x: xi,
        y: yi
      };
      return {
        point: arrowPoint,
        core: arrowCore,
        angle: angle,
        length: length,
        type: type
      };
    }
    /** @inheritdoc */

  }, {
    key: "drawArrowHead",
    value: function drawArrowHead(ctx, values, _selected, _hover, arrowData) {
      // set style
      ctx.strokeStyle = this.getColor(ctx, values);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineWidth = values.width;
      var canFill = EndPoints.draw(ctx, arrowData);

      if (canFill) {
        // draw shadow if enabled
        this.enableShadow(ctx, values);

        fill$2(ctx).call(ctx); // disable shadows for other elements.


        this.disableShadow(ctx, values);
      }
    }
    /**
     * Set the shadow formatting values in the context if enabled, do nothing otherwise.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the shadow.
     */

  }, {
    key: "enableShadow",
    value: function enableShadow(ctx, values) {
      if (values.shadow === true) {
        ctx.shadowColor = values.shadowColor;
        ctx.shadowBlur = values.shadowSize;
        ctx.shadowOffsetX = values.shadowX;
        ctx.shadowOffsetY = values.shadowY;
      }
    }
    /**
     * Reset the shadow formatting values in the context if enabled, do nothing otherwise.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the shadow.
     */

  }, {
    key: "disableShadow",
    value: function disableShadow(ctx, values) {
      if (values.shadow === true) {
        ctx.shadowColor = "rgba(0,0,0,0)";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }
    /**
     * Render the background according to the formatting values.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the background.
     */

  }, {
    key: "drawBackground",
    value: function drawBackground(ctx, values) {
      if (values.background !== false) {
        // save original line attrs
        var origCtxAttr = {
          strokeStyle: ctx.strokeStyle,
          lineWidth: ctx.lineWidth,
          dashes: ctx.dashes
        };
        ctx.strokeStyle = values.backgroundColor;
        ctx.lineWidth = values.backgroundSize;
        this.setStrokeDashed(ctx, values.backgroundDashes);
        ctx.stroke(); // restore original line attrs

        ctx.strokeStyle = origCtxAttr.strokeStyle;
        ctx.lineWidth = origCtxAttr.lineWidth;
        ctx.dashes = origCtxAttr.dashes;
        this.setStrokeDashed(ctx, values.dashes);
      }
    }
    /**
     * Set the line dash pattern if supported. Logs a warning to the console if it isn't supported.
     *
     * @param ctx - The context that will be used for rendering.
     * @param dashes - The pattern [line, space, line…], true for default dashed line or false for normal line.
     */

  }, {
    key: "setStrokeDashed",
    value: function setStrokeDashed(ctx, dashes) {
      if (dashes !== false) {
        if (ctx.setLineDash !== undefined) {
          var pattern = isArray$5(dashes) ? dashes : [5, 5];
          ctx.setLineDash(pattern);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
        }
      } else {
        if (ctx.setLineDash !== undefined) {
          ctx.setLineDash([]);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
        }
      }
    }
  }]);

  return EdgeBase;
}();

function ownKeys$5(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$3(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; forEach$2(_context = ownKeys$5(Object(source), true)).call(_context, function (key) { defineProperty$7(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context2; forEach$2(_context2 = ownKeys$5(Object(source))).call(_context2, function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$3(source, key)); }); } } return target; }

function _createSuper$j(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$j(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$j() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * The Base Class for all Bezier edges.
 * Bezier curves are used to model smooth gradual curves in paths between nodes.
 */

var BezierEdgeBase = /*#__PURE__*/function (_EdgeBase) {
  inherits(BezierEdgeBase, _EdgeBase);

  var _super = _createSuper$j(BezierEdgeBase);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function BezierEdgeBase(options, body, labelModule) {
    classCallCheck(this, BezierEdgeBase);

    return _super.call(this, options, body, labelModule);
  }
  /**
   * Find the intersection between the border of the node and the edge.
   *
   * @remarks
   * This function uses binary search to look for the point where the bezier curve crosses the border of the node.
   *
   * @param nearNode - The node (either from or to node of the edge).
   * @param ctx - The context that will be used for rendering.
   * @param viaNode - Additional node(s) the edge passes through.
   *
   * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
   */


  createClass(BezierEdgeBase, [{
    key: "_findBorderPositionBezier",
    value: function _findBorderPositionBezier(nearNode, ctx) {
      var viaNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._getViaCoordinates();
      var maxIterations = 10;
      var threshold = 0.2;
      var from = false;
      var high = 1;
      var low = 0;
      var node = this.to;
      var pos;
      var middle;
      var endPointOffset = this.options.endPointOffset ? this.options.endPointOffset.to : 0;

      if (nearNode.id === this.from.id) {
        node = this.from;
        from = true;
        endPointOffset = this.options.endPointOffset ? this.options.endPointOffset.from : 0;
      }

      if (this.options.arrowStrikethrough === false) {
        endPointOffset = 0;
      }

      var iteration = 0;

      do {
        middle = (low + high) * 0.5;
        pos = this.getPoint(middle, viaNode);
        var angle = Math.atan2(node.y - pos.y, node.x - pos.x);
        var distanceToBorder = node.distanceToBorder(ctx, angle) + endPointOffset;
        var distanceToPoint = Math.sqrt(Math.pow(pos.x - node.x, 2) + Math.pow(pos.y - node.y, 2));
        var difference = distanceToBorder - distanceToPoint;

        if (Math.abs(difference) < threshold) {
          break; // found
        } else if (difference < 0) {
          // distance to nodes is larger than distance to border --> t needs to be bigger if we're looking at the to node.
          if (from === false) {
            low = middle;
          } else {
            high = middle;
          }
        } else {
          if (from === false) {
            high = middle;
          } else {
            low = middle;
          }
        }

        ++iteration;
      } while (low <= high && iteration < maxIterations);

      return _objectSpread$3(_objectSpread$3({}, pos), {}, {
        t: middle
      });
    }
    /**
     * Calculate the distance between a point (x3,y3) and a line segment from (x1,y1) to (x2,y2).
     *
     * @remarks
     * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
     *
     * @param x1 - First end of the line segment on the x axis.
     * @param y1 - First end of the line segment on the y axis.
     * @param x2 - Second end of the line segment on the x axis.
     * @param y2 - Second end of the line segment on the y axis.
     * @param x3 - Position of the point on the x axis.
     * @param y3 - Position of the point on the y axis.
     * @param via - The control point for the edge.
     *
     * @returns The distance between the line segment and the point.
     */

  }, {
    key: "_getDistanceToBezierEdge",
    value: function _getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, via) {
      // x3,y3 is the point
      var minDistance = 1e9;
      var distance;
      var i, t, x, y;
      var lastX = x1;
      var lastY = y1;

      for (i = 1; i < 10; i++) {
        t = 0.1 * i;
        x = Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * via.x + Math.pow(t, 2) * x2;
        y = Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * via.y + Math.pow(t, 2) * y2;

        if (i > 0) {
          distance = this._getDistanceToLine(lastX, lastY, x, y, x3, y3);
          minDistance = distance < minDistance ? distance : minDistance;
        }

        lastX = x;
        lastY = y;
      }

      return minDistance;
    }
    /**
     * Render a bezier curve between two nodes.
     *
     * @remarks
     * The method accepts zero, one or two control points.
     * Passing zero control points just draws a straight line.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Style options for edge drawing.
     * @param viaNode1 - First control point for curve drawing.
     * @param viaNode2 - Second control point for curve drawing.
     */

  }, {
    key: "_bezierCurve",
    value: function _bezierCurve(ctx, values, viaNode1, viaNode2) {
      ctx.beginPath();
      ctx.moveTo(this.fromPoint.x, this.fromPoint.y);

      if (viaNode1 != null && viaNode1.x != null) {
        if (viaNode2 != null && viaNode2.x != null) {
          ctx.bezierCurveTo(viaNode1.x, viaNode1.y, viaNode2.x, viaNode2.y, this.toPoint.x, this.toPoint.y);
        } else {
          ctx.quadraticCurveTo(viaNode1.x, viaNode1.y, this.toPoint.x, this.toPoint.y);
        }
      } else {
        // fallback to normal straight edge
        ctx.lineTo(this.toPoint.x, this.toPoint.y);
      } // draw a background


      this.drawBackground(ctx, values); // draw shadow if enabled

      this.enableShadow(ctx, values);
      ctx.stroke();
      this.disableShadow(ctx, values);
    }
    /** @inheritdoc */

  }, {
    key: "getViaNode",
    value: function getViaNode() {
      return this._getViaCoordinates();
    }
  }]);

  return BezierEdgeBase;
}(EdgeBase);

function _createSuper$k(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$k(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$k() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Dynamic Bezier Edge. Bezier curves are used to model smooth gradual
 * curves in paths between nodes. The Dynamic piece refers to how the curve
 * reacts to physics changes.
 *
 * @extends BezierEdgeBase
 */

var BezierEdgeDynamic = /*#__PURE__*/function (_BezierEdgeBase) {
  inherits(BezierEdgeDynamic, _BezierEdgeBase);

  var _super = _createSuper$k(BezierEdgeDynamic);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function BezierEdgeDynamic(options, body, labelModule) {
    var _this;

    classCallCheck(this, BezierEdgeDynamic);

    //this.via = undefined; // Here for completeness but not allowed to defined before super() is invoked.
    _this = _super.call(this, options, body, labelModule); // --> this calls the setOptions below

    _this.via = _this.via; // constructor → super → super → setOptions → setupSupportNode

    _this._boundFunction = function () {
      _this.positionBezierNode();
    };

    _this._body.emitter.on("_repositionBezierNodes", _this._boundFunction);

    return _this;
  }
  /** @inheritdoc */


  createClass(BezierEdgeDynamic, [{
    key: "setOptions",
    value: function setOptions(options) {
      get$5(getPrototypeOf$5(BezierEdgeDynamic.prototype), "setOptions", this).call(this, options); // check if the physics has changed.


      var physicsChange = false;

      if (this.options.physics !== options.physics) {
        physicsChange = true;
      } // set the options and the to and from nodes


      this.options = options;
      this.id = this.options.id;
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to]; // setup the support node and connect

      this.setupSupportNode();
      this.connect(); // when we change the physics state of the edge, we reposition the support node.

      if (physicsChange === true) {
        this.via.setOptions({
          physics: this.options.physics
        });
        this.positionBezierNode();
      }
    }
    /** @inheritdoc */

  }, {
    key: "connect",
    value: function connect() {
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];

      if (this.from === undefined || this.to === undefined || this.options.physics === false) {
        this.via.setOptions({
          physics: false
        });
      } else {
        // fix weird behaviour where a self referencing node has physics enabled
        if (this.from.id === this.to.id) {
          this.via.setOptions({
            physics: false
          });
        } else {
          this.via.setOptions({
            physics: true
          });
        }
      }
    }
    /** @inheritdoc */

  }, {
    key: "cleanup",
    value: function cleanup() {
      this._body.emitter.off("_repositionBezierNodes", this._boundFunction);

      if (this.via !== undefined) {
        delete this._body.nodes[this.via.id];
        this.via = undefined;
        return true;
      }

      return false;
    }
    /**
     * Create and add a support node if not already present.
     *
     * @remarks
     * Bezier curves require an anchor point to calculate the smooth flow.
     * These points are nodes.
     * These nodes are invisible but are used for the force calculation.
     *
     * The changed data is not called, if needed, it is returned by the main edge constructor.
     */

  }, {
    key: "setupSupportNode",
    value: function setupSupportNode() {
      if (this.via === undefined) {
        var nodeId = "edgeId:" + this.id;

        var node = this._body.functions.createNode({
          id: nodeId,
          shape: "circle",
          physics: true,
          hidden: true
        });

        this._body.nodes[nodeId] = node;
        this.via = node;
        this.via.parentEdgeId = this.id;
        this.positionBezierNode();
      }
    }
    /**
     * Position bezier node.
     */

  }, {
    key: "positionBezierNode",
    value: function positionBezierNode() {
      if (this.via !== undefined && this.from !== undefined && this.to !== undefined) {
        this.via.x = 0.5 * (this.from.x + this.to.x);
        this.via.y = 0.5 * (this.from.y + this.to.y);
      } else if (this.via !== undefined) {
        this.via.x = 0;
        this.via.y = 0;
      }
    }
    /** @inheritdoc */

  }, {
    key: "_line",
    value: function _line(ctx, values, viaNode) {
      this._bezierCurve(ctx, values, viaNode);
    }
    /** @inheritdoc */

  }, {
    key: "_getViaCoordinates",
    value: function _getViaCoordinates() {
      return this.via;
    }
    /** @inheritdoc */

  }, {
    key: "getViaNode",
    value: function getViaNode() {
      return this.via;
    }
    /** @inheritdoc */

  }, {
    key: "getPoint",
    value: function getPoint(position) {
      var viaNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.via;

      if (this.from === this.to) {
        var _this$_getCircleData = this._getCircleData(),
            _this$_getCircleData2 = slicedToArray(_this$_getCircleData, 3),
            cx = _this$_getCircleData2[0],
            cy = _this$_getCircleData2[1],
            cr = _this$_getCircleData2[2];

        var a = 2 * Math.PI * (1 - position);
        return {
          x: cx + cr * Math.sin(a),
          y: cy + cr - cr * (1 - Math.cos(a))
        };
      } else {
        return {
          x: Math.pow(1 - position, 2) * this.fromPoint.x + 2 * position * (1 - position) * viaNode.x + Math.pow(position, 2) * this.toPoint.x,
          y: Math.pow(1 - position, 2) * this.fromPoint.y + 2 * position * (1 - position) * viaNode.y + Math.pow(position, 2) * this.toPoint.y
        };
      }
    }
    /** @inheritdoc */

  }, {
    key: "_findBorderPosition",
    value: function _findBorderPosition(nearNode, ctx) {
      return this._findBorderPositionBezier(nearNode, ctx, this.via);
    }
    /** @inheritdoc */

  }, {
    key: "_getDistanceToEdge",
    value: function _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      // x3,y3 is the point
      return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, this.via);
    }
  }]);

  return BezierEdgeDynamic;
}(BezierEdgeBase);

function _createSuper$l(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$l(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$l() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Static Bezier Edge. Bezier curves are used to model smooth gradual curves in paths between nodes.
 */

var BezierEdgeStatic = /*#__PURE__*/function (_BezierEdgeBase) {
  inherits(BezierEdgeStatic, _BezierEdgeBase);

  var _super = _createSuper$l(BezierEdgeStatic);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function BezierEdgeStatic(options, body, labelModule) {
    classCallCheck(this, BezierEdgeStatic);

    return _super.call(this, options, body, labelModule);
  }
  /** @inheritdoc */


  createClass(BezierEdgeStatic, [{
    key: "_line",
    value: function _line(ctx, values, viaNode) {
      this._bezierCurve(ctx, values, viaNode);
    }
    /** @inheritdoc */

  }, {
    key: "getViaNode",
    value: function getViaNode() {
      return this._getViaCoordinates();
    }
    /**
     * Compute the coordinates of the via node.
     *
     * @remarks
     * We do not use the to and fromPoints here to make the via nodes the same as edges without arrows.
     *
     * @returns Cartesian coordinates of the via node.
     */

  }, {
    key: "_getViaCoordinates",
    value: function _getViaCoordinates() {
      // Assumption: x/y coordinates in from/to always defined
      var factor = this.options.smooth.roundness;
      var type = this.options.smooth.type;
      var dx = Math.abs(this.from.x - this.to.x);
      var dy = Math.abs(this.from.y - this.to.y);

      if (type === "discrete" || type === "diagonalCross") {
        var stepX;
        var stepY;

        if (dx <= dy) {
          stepX = stepY = factor * dy;
        } else {
          stepX = stepY = factor * dx;
        }

        if (this.from.x > this.to.x) {
          stepX = -stepX;
        }

        if (this.from.y >= this.to.y) {
          stepY = -stepY;
        }

        var xVia = this.from.x + stepX;
        var yVia = this.from.y + stepY;

        if (type === "discrete") {
          if (dx <= dy) {
            xVia = dx < factor * dy ? this.from.x : xVia;
          } else {
            yVia = dy < factor * dx ? this.from.y : yVia;
          }
        }

        return {
          x: xVia,
          y: yVia
        };
      } else if (type === "straightCross") {
        var _stepX = (1 - factor) * dx;

        var _stepY = (1 - factor) * dy;

        if (dx <= dy) {
          // up - down
          _stepX = 0;

          if (this.from.y < this.to.y) {
            _stepY = -_stepY;
          }
        } else {
          // left - right
          if (this.from.x < this.to.x) {
            _stepX = -_stepX;
          }

          _stepY = 0;
        }

        return {
          x: this.to.x + _stepX,
          y: this.to.y + _stepY
        };
      } else if (type === "horizontal") {
        var _stepX2 = (1 - factor) * dx;

        if (this.from.x < this.to.x) {
          _stepX2 = -_stepX2;
        }

        return {
          x: this.to.x + _stepX2,
          y: this.from.y
        };
      } else if (type === "vertical") {
        var _stepY2 = (1 - factor) * dy;

        if (this.from.y < this.to.y) {
          _stepY2 = -_stepY2;
        }

        return {
          x: this.from.x,
          y: this.to.y + _stepY2
        };
      } else if (type === "curvedCW") {
        dx = this.to.x - this.from.x;
        dy = this.from.y - this.to.y;
        var radius = Math.sqrt(dx * dx + dy * dy);
        var pi = Math.PI;
        var originalAngle = Math.atan2(dy, dx);
        var myAngle = (originalAngle + (factor * 0.5 + 0.5) * pi) % (2 * pi);
        return {
          x: this.from.x + (factor * 0.5 + 0.5) * radius * Math.sin(myAngle),
          y: this.from.y + (factor * 0.5 + 0.5) * radius * Math.cos(myAngle)
        };
      } else if (type === "curvedCCW") {
        dx = this.to.x - this.from.x;
        dy = this.from.y - this.to.y;

        var _radius = Math.sqrt(dx * dx + dy * dy);

        var _pi = Math.PI;

        var _originalAngle = Math.atan2(dy, dx);

        var _myAngle = (_originalAngle + (-factor * 0.5 + 0.5) * _pi) % (2 * _pi);

        return {
          x: this.from.x + (factor * 0.5 + 0.5) * _radius * Math.sin(_myAngle),
          y: this.from.y + (factor * 0.5 + 0.5) * _radius * Math.cos(_myAngle)
        };
      } else {
        // continuous
        var _stepX3;

        var _stepY3;

        if (dx <= dy) {
          _stepX3 = _stepY3 = factor * dy;
        } else {
          _stepX3 = _stepY3 = factor * dx;
        }

        if (this.from.x > this.to.x) {
          _stepX3 = -_stepX3;
        }

        if (this.from.y >= this.to.y) {
          _stepY3 = -_stepY3;
        }

        var _xVia = this.from.x + _stepX3;

        var _yVia = this.from.y + _stepY3;

        if (dx <= dy) {
          if (this.from.x <= this.to.x) {
            _xVia = this.to.x < _xVia ? this.to.x : _xVia;
          } else {
            _xVia = this.to.x > _xVia ? this.to.x : _xVia;
          }
        } else {
          if (this.from.y >= this.to.y) {
            _yVia = this.to.y > _yVia ? this.to.y : _yVia;
          } else {
            _yVia = this.to.y < _yVia ? this.to.y : _yVia;
          }
        }

        return {
          x: _xVia,
          y: _yVia
        };
      }
    }
    /** @inheritdoc */

  }, {
    key: "_findBorderPosition",
    value: function _findBorderPosition(nearNode, ctx) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this._findBorderPositionBezier(nearNode, ctx, options.via);
    }
    /** @inheritdoc */

  }, {
    key: "_getDistanceToEdge",
    value: function _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      var viaNode = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this._getViaCoordinates();
      // x3,y3 is the point
      return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, viaNode);
    }
    /** @inheritdoc */

  }, {
    key: "getPoint",
    value: function getPoint(position) {
      var viaNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._getViaCoordinates();
      var t = position;
      var x = Math.pow(1 - t, 2) * this.fromPoint.x + 2 * t * (1 - t) * viaNode.x + Math.pow(t, 2) * this.toPoint.x;
      var y = Math.pow(1 - t, 2) * this.fromPoint.y + 2 * t * (1 - t) * viaNode.y + Math.pow(t, 2) * this.toPoint.y;
      return {
        x: x,
        y: y
      };
    }
  }]);

  return BezierEdgeStatic;
}(BezierEdgeBase);

function _createSuper$m(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$m(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$m() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Base Class for all Cubic Bezier Edges. Bezier curves are used to model
 * smooth gradual curves in paths between nodes.
 *
 * @extends BezierEdgeBase
 */

var CubicBezierEdgeBase = /*#__PURE__*/function (_BezierEdgeBase) {
  inherits(CubicBezierEdgeBase, _BezierEdgeBase);

  var _super = _createSuper$m(CubicBezierEdgeBase);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function CubicBezierEdgeBase(options, body, labelModule) {
    classCallCheck(this, CubicBezierEdgeBase);

    return _super.call(this, options, body, labelModule);
  }
  /**
   * Calculate the distance between a point (x3,y3) and a line segment from (x1,y1) to (x2,y2).
   *
   * @remarks
   * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
   * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
   *
   * @param x1 - First end of the line segment on the x axis.
   * @param y1 - First end of the line segment on the y axis.
   * @param x2 - Second end of the line segment on the x axis.
   * @param y2 - Second end of the line segment on the y axis.
   * @param x3 - Position of the point on the x axis.
   * @param y3 - Position of the point on the y axis.
   * @param via1 - The first point this edge passes through.
   * @param via2 - The second point this edge passes through.
   *
   * @returns The distance between the line segment and the point.
   */


  createClass(CubicBezierEdgeBase, [{
    key: "_getDistanceToBezierEdge2",
    value: function _getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2) {
      // x3,y3 is the point
      var minDistance = 1e9;
      var lastX = x1;
      var lastY = y1;
      var vec = [0, 0, 0, 0];

      for (var i = 1; i < 10; i++) {
        var t = 0.1 * i;
        vec[0] = Math.pow(1 - t, 3);
        vec[1] = 3 * t * Math.pow(1 - t, 2);
        vec[2] = 3 * Math.pow(t, 2) * (1 - t);
        vec[3] = Math.pow(t, 3);
        var x = vec[0] * x1 + vec[1] * via1.x + vec[2] * via2.x + vec[3] * x2;
        var y = vec[0] * y1 + vec[1] * via1.y + vec[2] * via2.y + vec[3] * y2;

        if (i > 0) {
          var distance = this._getDistanceToLine(lastX, lastY, x, y, x3, y3);

          minDistance = distance < minDistance ? distance : minDistance;
        }

        lastX = x;
        lastY = y;
      }

      return minDistance;
    }
  }]);

  return CubicBezierEdgeBase;
}(BezierEdgeBase);

function _createSuper$n(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$n(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$n() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Cubic Bezier Edge. Bezier curves are used to model smooth gradual curves in paths between nodes.
 */

var CubicBezierEdge = /*#__PURE__*/function (_CubicBezierEdgeBase) {
  inherits(CubicBezierEdge, _CubicBezierEdgeBase);

  var _super = _createSuper$n(CubicBezierEdge);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function CubicBezierEdge(options, body, labelModule) {
    classCallCheck(this, CubicBezierEdge);

    return _super.call(this, options, body, labelModule);
  }
  /** @inheritdoc */


  createClass(CubicBezierEdge, [{
    key: "_line",
    value: function _line(ctx, values, viaNodes) {
      // get the coordinates of the support points.
      var via1 = viaNodes[0];
      var via2 = viaNodes[1];

      this._bezierCurve(ctx, values, via1, via2);
    }
    /**
     * Compute the additional points the edge passes through.
     *
     * @returns Cartesian coordinates of the points the edge passes through.
     */

  }, {
    key: "_getViaCoordinates",
    value: function _getViaCoordinates() {
      var dx = this.from.x - this.to.x;
      var dy = this.from.y - this.to.y;
      var x1;
      var y1;
      var x2;
      var y2;
      var roundness = this.options.smooth.roundness; // horizontal if x > y or if direction is forced or if direction is horizontal

      if ((Math.abs(dx) > Math.abs(dy) || this.options.smooth.forceDirection === true || this.options.smooth.forceDirection === "horizontal") && this.options.smooth.forceDirection !== "vertical") {
        y1 = this.from.y;
        y2 = this.to.y;
        x1 = this.from.x - roundness * dx;
        x2 = this.to.x + roundness * dx;
      } else {
        y1 = this.from.y - roundness * dy;
        y2 = this.to.y + roundness * dy;
        x1 = this.from.x;
        x2 = this.to.x;
      }

      return [{
        x: x1,
        y: y1
      }, {
        x: x2,
        y: y2
      }];
    }
    /** @inheritdoc */

  }, {
    key: "getViaNode",
    value: function getViaNode() {
      return this._getViaCoordinates();
    }
    /** @inheritdoc */

  }, {
    key: "_findBorderPosition",
    value: function _findBorderPosition(nearNode, ctx) {
      return this._findBorderPositionBezier(nearNode, ctx);
    }
    /** @inheritdoc */

  }, {
    key: "_getDistanceToEdge",
    value: function _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      var _ref = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this._getViaCoordinates(),
          _ref2 = slicedToArray(_ref, 2),
          via1 = _ref2[0],
          via2 = _ref2[1];

      // x3,y3 is the point
      return this._getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2);
    }
    /** @inheritdoc */

  }, {
    key: "getPoint",
    value: function getPoint(position) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._getViaCoordinates(),
          _ref4 = slicedToArray(_ref3, 2),
          via1 = _ref4[0],
          via2 = _ref4[1];

      var t = position;
      var vec = [Math.pow(1 - t, 3), 3 * t * Math.pow(1 - t, 2), 3 * Math.pow(t, 2) * (1 - t), Math.pow(t, 3)];
      var x = vec[0] * this.fromPoint.x + vec[1] * via1.x + vec[2] * via2.x + vec[3] * this.toPoint.x;
      var y = vec[0] * this.fromPoint.y + vec[1] * via1.y + vec[2] * via2.y + vec[3] * this.toPoint.y;
      return {
        x: x,
        y: y
      };
    }
  }]);

  return CubicBezierEdge;
}(CubicBezierEdgeBase);

function _createSuper$o(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$o(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$o() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Straight Edge.
 */

var StraightEdge = /*#__PURE__*/function (_EdgeBase) {
  inherits(StraightEdge, _EdgeBase);

  var _super = _createSuper$o(StraightEdge);

  /**
   * Create a new instance.
   *
   * @param options - The options object of given edge.
   * @param body - The body of the network.
   * @param labelModule - Label module.
   */
  function StraightEdge(options, body, labelModule) {
    classCallCheck(this, StraightEdge);

    return _super.call(this, options, body, labelModule);
  }
  /** @inheritdoc */


  createClass(StraightEdge, [{
    key: "_line",
    value: function _line(ctx, values) {
      // draw a straight line
      ctx.beginPath();
      ctx.moveTo(this.fromPoint.x, this.fromPoint.y);
      ctx.lineTo(this.toPoint.x, this.toPoint.y); // draw shadow if enabled

      this.enableShadow(ctx, values);
      ctx.stroke();
      this.disableShadow(ctx, values);
    }
    /** @inheritdoc */

  }, {
    key: "getViaNode",
    value: function getViaNode() {
      return undefined;
    }
    /** @inheritdoc */

  }, {
    key: "getPoint",
    value: function getPoint(position) {
      return {
        x: (1 - position) * this.fromPoint.x + position * this.toPoint.x,
        y: (1 - position) * this.fromPoint.y + position * this.toPoint.y
      };
    }
    /** @inheritdoc */

  }, {
    key: "_findBorderPosition",
    value: function _findBorderPosition(nearNode, ctx) {
      var node1 = this.to;
      var node2 = this.from;

      if (nearNode.id === this.from.id) {
        node1 = this.from;
        node2 = this.to;
      }

      var angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
      var dx = node1.x - node2.x;
      var dy = node1.y - node2.y;
      var edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
      var toBorderDist = nearNode.distanceToBorder(ctx, angle);
      var toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;
      return {
        x: (1 - toBorderPoint) * node2.x + toBorderPoint * node1.x,
        y: (1 - toBorderPoint) * node2.y + toBorderPoint * node1.y,
        t: 0
      };
    }
    /** @inheritdoc */

  }, {
    key: "_getDistanceToEdge",
    value: function _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      // x3,y3 is the point
      return this._getDistanceToLine(x1, y1, x2, y2, x3, y3);
    }
  }]);

  return StraightEdge;
}(EdgeBase);

/**
 * An edge connects two nodes and has a specific direction.
 */

var Edge = /*#__PURE__*/function () {
  /**
   * @param {Object} options        values specific to this edge, must contain at least 'from' and 'to'
   * @param {Object} body           shared state from Network instance
   * @param {Network.Images} imagelist  A list with images. Only needed when the edge has image arrows.
   * @param {Object} globalOptions  options from the EdgesHandler instance
   * @param {Object} defaultOptions default options from the EdgeHandler instance. Value and reference are constant
   */
  function Edge(options, body, imagelist, globalOptions, defaultOptions) {
    classCallCheck(this, Edge);

    if (body === undefined) {
      throw new Error("No body provided");
    } // Since globalOptions is constant in values as well as reference,
    // Following needs to be done only once.


    this.options = bridgeObject(globalOptions);
    this.globalOptions = globalOptions;
    this.defaultOptions = defaultOptions;
    this.body = body;
    this.imagelist = imagelist; // initialize variables

    this.id = undefined;
    this.fromId = undefined;
    this.toId = undefined;
    this.selected = false;
    this.hover = false;
    this.labelDirty = true;
    this.baseWidth = this.options.width;
    this.baseFontSize = this.options.font.size;
    this.from = undefined; // a node

    this.to = undefined; // a node

    this.edgeType = undefined;
    this.connected = false;
    this.labelModule = new Label(this.body, this.options, true
    /* It's an edge label */
    );
    this.setOptions(options);
  }
  /**
   * Set or overwrite options for the edge
   * @param {Object} options  an object with options
   * @returns {undefined|boolean} undefined if no options, true if layout affecting data changed, false otherwise.
   */


  createClass(Edge, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (!options) {
        return;
      } // Following options if changed affect the layout.


      var affectsLayout = typeof options.physics !== "undefined" && this.options.physics !== options.physics || typeof options.hidden !== "undefined" && (this.options.hidden || false) !== (options.hidden || false) || typeof options.from !== "undefined" && this.options.from !== options.from || typeof options.to !== "undefined" && this.options.to !== options.to;
      Edge.parseOptions(this.options, options, true, this.globalOptions);

      if (options.id !== undefined) {
        this.id = options.id;
      }

      if (options.from !== undefined) {
        this.fromId = options.from;
      }

      if (options.to !== undefined) {
        this.toId = options.to;
      }

      if (options.title !== undefined) {
        this.title = options.title;
      }

      if (options.value !== undefined) {
        options.value = _parseFloat$2(options.value);
      }

      var pile = [options, this.options, this.defaultOptions];
      this.chooser = choosify('edge', pile); // update label Module

      this.updateLabelModule(options); // Update edge type, this if changed affects the layout.

      affectsLayout = this.updateEdgeType() || affectsLayout; // if anything has been updates, reset the selection width and the hover width

      this._setInteractionWidths(); // A node is connected when it has a from and to node that both exist in the network.body.nodes.


      this.connect();
      return affectsLayout;
    }
    /**
     *
     * @param {Object} parentOptions
     * @param {Object} newOptions
     * @param {boolean} [allowDeletion=false]
     * @param {Object} [globalOptions={}]
     * @param {boolean} [copyFromGlobals=false]
     */

  }, {
    key: "getFormattingValues",

    /**
     *
     * @returns {ArrowOptions}
     */
    value: function getFormattingValues() {
      var toArrow = this.options.arrows.to === true || this.options.arrows.to.enabled === true;
      var fromArrow = this.options.arrows.from === true || this.options.arrows.from.enabled === true;
      var middleArrow = this.options.arrows.middle === true || this.options.arrows.middle.enabled === true;
      var inheritsColor = this.options.color.inherit;
      var values = {
        toArrow: toArrow,
        toArrowScale: this.options.arrows.to.scaleFactor,
        toArrowType: this.options.arrows.to.type,
        toArrowSrc: this.options.arrows.to.src,
        toArrowImageWidth: this.options.arrows.to.imageWidth,
        toArrowImageHeight: this.options.arrows.to.imageHeight,
        middleArrow: middleArrow,
        middleArrowScale: this.options.arrows.middle.scaleFactor,
        middleArrowType: this.options.arrows.middle.type,
        middleArrowSrc: this.options.arrows.middle.src,
        middleArrowImageWidth: this.options.arrows.middle.imageWidth,
        middleArrowImageHeight: this.options.arrows.middle.imageHeight,
        fromArrow: fromArrow,
        fromArrowScale: this.options.arrows.from.scaleFactor,
        fromArrowType: this.options.arrows.from.type,
        fromArrowSrc: this.options.arrows.from.src,
        fromArrowImageWidth: this.options.arrows.from.imageWidth,
        fromArrowImageHeight: this.options.arrows.from.imageHeight,
        arrowStrikethrough: this.options.arrowStrikethrough,
        color: inheritsColor ? undefined : this.options.color.color,
        inheritsColor: inheritsColor,
        opacity: this.options.color.opacity,
        hidden: this.options.hidden,
        length: this.options.length,
        shadow: this.options.shadow.enabled,
        shadowColor: this.options.shadow.color,
        shadowSize: this.options.shadow.size,
        shadowX: this.options.shadow.x,
        shadowY: this.options.shadow.y,
        dashes: this.options.dashes,
        width: this.options.width,
        background: this.options.background.enabled,
        backgroundColor: this.options.background.color,
        backgroundSize: this.options.background.size,
        backgroundDashes: this.options.background.dashes
      };

      if (this.selected || this.hover) {
        if (this.chooser === true) {
          if (this.selected) {
            var selectedWidth = this.options.selectionWidth;

            if (typeof selectedWidth === 'function') {
              values.width = selectedWidth(values.width);
            } else if (typeof selectedWidth === 'number') {
              values.width += selectedWidth;
            }

            values.width = Math.max(values.width, 0.3 / this.body.view.scale);
            values.color = this.options.color.highlight;
            values.shadow = this.options.shadow.enabled;
          } else if (this.hover) {
            var hoverWidth = this.options.hoverWidth;

            if (typeof hoverWidth === 'function') {
              values.width = hoverWidth(values.width);
            } else if (typeof hoverWidth === 'number') {
              values.width += hoverWidth;
            }

            values.width = Math.max(values.width, 0.3 / this.body.view.scale);
            values.color = this.options.color.hover;
            values.shadow = this.options.shadow.enabled;
          }
        } else if (typeof this.chooser === 'function') {
          this.chooser(values, this.options.id, this.selected, this.hover);

          if (values.color !== undefined) {
            values.inheritsColor = false;
          }

          if (values.shadow === false) {
            if (values.shadowColor !== this.options.shadow.color || values.shadowSize !== this.options.shadow.size || values.shadowX !== this.options.shadow.x || values.shadowY !== this.options.shadow.y) {
              values.shadow = true;
            }
          }
        }
      } else {
        values.shadow = this.options.shadow.enabled;
        values.width = Math.max(values.width, 0.3 / this.body.view.scale);
      }

      return values;
    }
    /**
     * update the options in the label module
     *
     * @param {Object} options
     */

  }, {
    key: "updateLabelModule",
    value: function updateLabelModule(options) {
      var pile = [options, this.options, this.globalOptions, // Currently set global edge options
      this.defaultOptions];
      this.labelModule.update(this.options, pile);

      if (this.labelModule.baseSize !== undefined) {
        this.baseFontSize = this.labelModule.baseSize;
      }
    }
    /**
     * update the edge type, set the options
     * @returns {boolean}
     */

  }, {
    key: "updateEdgeType",
    value: function updateEdgeType() {
      var smooth = this.options.smooth;
      var dataChanged = false;
      var changeInType = true;

      if (this.edgeType !== undefined) {
        if (this.edgeType instanceof BezierEdgeDynamic && smooth.enabled === true && smooth.type === 'dynamic' || this.edgeType instanceof CubicBezierEdge && smooth.enabled === true && smooth.type === 'cubicBezier' || this.edgeType instanceof BezierEdgeStatic && smooth.enabled === true && smooth.type !== 'dynamic' && smooth.type !== 'cubicBezier' || this.edgeType instanceof StraightEdge && smooth.type.enabled === false) {
          changeInType = false;
        }

        if (changeInType === true) {
          dataChanged = this.cleanup();
        }
      }

      if (changeInType === true) {
        if (smooth.enabled === true) {
          if (smooth.type === 'dynamic') {
            dataChanged = true;
            this.edgeType = new BezierEdgeDynamic(this.options, this.body, this.labelModule);
          } else if (smooth.type === 'cubicBezier') {
            this.edgeType = new CubicBezierEdge(this.options, this.body, this.labelModule);
          } else {
            this.edgeType = new BezierEdgeStatic(this.options, this.body, this.labelModule);
          }
        } else {
          this.edgeType = new StraightEdge(this.options, this.body, this.labelModule);
        }
      } else {
        // if nothing changes, we just set the options.
        this.edgeType.setOptions(this.options);
      }

      return dataChanged;
    }
    /**
     * Connect an edge to its nodes
     */

  }, {
    key: "connect",
    value: function connect() {
      this.disconnect();
      this.from = this.body.nodes[this.fromId] || undefined;
      this.to = this.body.nodes[this.toId] || undefined;
      this.connected = this.from !== undefined && this.to !== undefined;

      if (this.connected === true) {
        this.from.attachEdge(this);
        this.to.attachEdge(this);
      } else {
        if (this.from) {
          this.from.detachEdge(this);
        }

        if (this.to) {
          this.to.detachEdge(this);
        }
      }

      this.edgeType.connect();
    }
    /**
     * Disconnect an edge from its nodes
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.from) {
        this.from.detachEdge(this);
        this.from = undefined;
      }

      if (this.to) {
        this.to.detachEdge(this);
        this.to = undefined;
      }

      this.connected = false;
    }
    /**
     * get the title of this edge.
     * @return {string} title    The title of the edge, or undefined when no title
     *                           has been set.
     */

  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.title;
    }
    /**
     * check if this node is selecte
     * @return {boolean} selected   True if node is selected, else false
     */

  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.selected;
    }
    /**
     * Retrieve the value of the edge. Can be undefined
     * @return {number} value
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.options.value;
    }
    /**
     * Adjust the value range of the edge. The edge will adjust it's width
     * based on its value.
     * @param {number} min
     * @param {number} max
     * @param {number} total
     */

  }, {
    key: "setValueRange",
    value: function setValueRange(min, max, total) {
      if (this.options.value !== undefined) {
        var scale = this.options.scaling.customScalingFunction(min, max, total, this.options.value);
        var widthDiff = this.options.scaling.max - this.options.scaling.min;

        if (this.options.scaling.label.enabled === true) {
          var fontDiff = this.options.scaling.label.max - this.options.scaling.label.min;
          this.options.font.size = this.options.scaling.label.min + scale * fontDiff;
        }

        this.options.width = this.options.scaling.min + scale * widthDiff;
      } else {
        this.options.width = this.baseWidth;
        this.options.font.size = this.baseFontSize;
      }

      this._setInteractionWidths();

      this.updateLabelModule();
    }
    /**
     *
     * @private
     */

  }, {
    key: "_setInteractionWidths",
    value: function _setInteractionWidths() {
      if (typeof this.options.hoverWidth === 'function') {
        this.edgeType.hoverWidth = this.options.hoverWidth(this.options.width);
      } else {
        this.edgeType.hoverWidth = this.options.hoverWidth + this.options.width;
      }

      if (typeof this.options.selectionWidth === 'function') {
        this.edgeType.selectionWidth = this.options.selectionWidth(this.options.width);
      } else {
        this.edgeType.selectionWidth = this.options.selectionWidth + this.options.width;
      }
    }
    /**
     * Redraw a edge
     * Draw this edge in the given canvas
     * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
     * @param {CanvasRenderingContext2D}   ctx
     */

  }, {
    key: "draw",
    value: function draw(ctx) {
      var values = this.getFormattingValues();

      if (values.hidden) {
        return;
      } // get the via node from the edge type


      var viaNode = this.edgeType.getViaNode(); // draw line and label

      this.edgeType.drawLine(ctx, values, this.selected, this.hover, viaNode);
      this.drawLabel(ctx, viaNode);
    }
    /**
    * Redraw arrows
    * Draw this arrows in the given canvas
    * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
    * @param {CanvasRenderingContext2D}   ctx
    */

  }, {
    key: "drawArrows",
    value: function drawArrows(ctx) {
      var values = this.getFormattingValues();

      if (values.hidden) {
        return;
      } // get the via node from the edge type


      var viaNode = this.edgeType.getViaNode();
      var arrowData = {}; // restore edge targets to defaults

      this.edgeType.fromPoint = this.edgeType.from;
      this.edgeType.toPoint = this.edgeType.to; // from and to arrows give a different end point for edges. we set them here

      if (values.fromArrow) {
        arrowData.from = this.edgeType.getArrowData(ctx, "from", viaNode, this.selected, this.hover, values);
        if (values.arrowStrikethrough === false) this.edgeType.fromPoint = arrowData.from.core;

        if (values.fromArrowSrc) {
          arrowData.from.image = this.imagelist.load(values.fromArrowSrc);
        }

        if (values.fromArrowImageWidth) {
          arrowData.from.imageWidth = values.fromArrowImageWidth;
        }

        if (values.fromArrowImageHeight) {
          arrowData.from.imageHeight = values.fromArrowImageHeight;
        }
      }

      if (values.toArrow) {
        arrowData.to = this.edgeType.getArrowData(ctx, "to", viaNode, this.selected, this.hover, values);
        if (values.arrowStrikethrough === false) this.edgeType.toPoint = arrowData.to.core;

        if (values.toArrowSrc) {
          arrowData.to.image = this.imagelist.load(values.toArrowSrc);
        }

        if (values.toArrowImageWidth) {
          arrowData.to.imageWidth = values.toArrowImageWidth;
        }

        if (values.toArrowImageHeight) {
          arrowData.to.imageHeight = values.toArrowImageHeight;
        }
      } // the middle arrow depends on the line, which can depend on the to and from arrows so we do this one lastly.


      if (values.middleArrow) {
        arrowData.middle = this.edgeType.getArrowData(ctx, "middle", viaNode, this.selected, this.hover, values);

        if (values.middleArrowSrc) {
          arrowData.middle.image = this.imagelist.load(values.middleArrowSrc);
        }

        if (values.middleArrowImageWidth) {
          arrowData.middle.imageWidth = values.middleArrowImageWidth;
        }

        if (values.middleArrowImageHeight) {
          arrowData.middle.imageHeight = values.middleArrowImageHeight;
        }
      }

      if (values.fromArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.from);
      }

      if (values.middleArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.middle);
      }

      if (values.toArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.to);
      }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {Node} viaNode
     */

  }, {
    key: "drawLabel",
    value: function drawLabel(ctx, viaNode) {
      if (this.options.label !== undefined) {
        // set style
        var node1 = this.from;
        var node2 = this.to;

        if (this.labelModule.differentState(this.selected, this.hover)) {
          this.labelModule.getTextSize(ctx, this.selected, this.hover);
        }

        var point;

        if (node1.id != node2.id) {
          this.labelModule.pointToSelf = false;
          point = this.edgeType.getPoint(0.5, viaNode);
          ctx.save();

          var rotationPoint = this._getRotation(ctx);

          if (rotationPoint.angle != 0) {
            ctx.translate(rotationPoint.x, rotationPoint.y);
            ctx.rotate(rotationPoint.angle);
          } // draw the label


          this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);
          /*
                  // Useful debug code: draw a border around the label
                  // This should **not** be enabled in production!
                  var size = this.labelModule.getSize();; // ;; intentional so lint catches it
                  ctx.strokeStyle = "#ff0000";
                  ctx.strokeRect(size.left, size.top, size.width, size.height);
                  // End  debug code
          */

          ctx.restore();
        } else {
          // Ignore the orientations.
          this.labelModule.pointToSelf = true; // get circle coordinates

          var coordinates = getSelfRefCoordinates(ctx, this.options.selfReference.angle, this.options.selfReference.size, node1);
          point = this._pointOnCircle(coordinates.x, coordinates.y, this.options.selfReference.size, this.options.selfReference.angle);
          this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);
        }
      }
    }
    /**
     * Determine all visual elements of this edge instance, in which the given
     * point falls within the bounding shape.
     *
     * @param {point} point
     * @returns {Array.<edgeClickItem|edgeLabelClickItem>} list with the items which are on the point
     */

  }, {
    key: "getItemsOnPoint",
    value: function getItemsOnPoint(point) {
      var ret = [];

      if (this.labelModule.visible()) {
        var rotationPoint = this._getRotation();

        if (pointInRect(this.labelModule.getSize(), point, rotationPoint)) {
          ret.push({
            edgeId: this.id,
            labelId: 0
          });
        }
      }

      var obj = {
        left: point.x,
        top: point.y
      };

      if (this.isOverlappingWith(obj)) {
        ret.push({
          edgeId: this.id
        });
      }

      return ret;
    }
    /**
     * Check if this object is overlapping with the provided object
     * @param {Object} obj   an object with parameters left, top
     * @return {boolean}     True if location is located on the edge
     */

  }, {
    key: "isOverlappingWith",
    value: function isOverlappingWith(obj) {
      if (this.connected) {
        var distMax = 10;
        var xFrom = this.from.x;
        var yFrom = this.from.y;
        var xTo = this.to.x;
        var yTo = this.to.y;
        var xObj = obj.left;
        var yObj = obj.top;
        var dist = this.edgeType.getDistanceToEdge(xFrom, yFrom, xTo, yTo, xObj, yObj);
        return dist < distMax;
      } else {
        return false;
      }
    }
    /**
     * Determine the rotation point, if any.
     *
     * @param {CanvasRenderingContext2D} [ctx] if passed, do a recalculation of the label size
     * @returns {rotationPoint} the point to rotate around and the angle in radians to rotate
     * @private
     */

  }, {
    key: "_getRotation",
    value: function _getRotation(ctx) {
      var viaNode = this.edgeType.getViaNode();
      var point = this.edgeType.getPoint(0.5, viaNode);

      if (ctx !== undefined) {
        this.labelModule.calculateLabelSize(ctx, this.selected, this.hover, point.x, point.y);
      }

      var ret = {
        x: point.x,
        y: this.labelModule.size.yLine,
        angle: 0
      };

      if (!this.labelModule.visible()) {
        return ret; // Don't even bother doing the atan2, there's nothing to draw
      }

      if (this.options.font.align === "horizontal") {
        return ret; // No need to calculate angle
      }

      var dy = this.from.y - this.to.y;
      var dx = this.from.x - this.to.x;
      var angle = Math.atan2(dy, dx); // radians
      // rotate so that label is readable

      if (angle < -1 && dx < 0 || angle > 0 && dx < 0) {
        angle += Math.PI;
      }

      ret.angle = angle;
      return ret;
    }
    /**
     * Get a point on a circle
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} angle
     * @return {Object} point
     * @private
     */

  }, {
    key: "_pointOnCircle",
    value: function _pointOnCircle(x, y, radius, angle) {
      return {
        x: x + radius * Math.cos(angle),
        y: y - radius * Math.sin(angle)
      };
    }
    /**
     * Sets selected state to true
     */

  }, {
    key: "select",
    value: function select() {
      this.selected = true;
    }
    /**
     * Sets selected state to false
     */

  }, {
    key: "unselect",
    value: function unselect() {
      this.selected = false;
    }
    /**
     * cleans all required things on delete
     * @returns {*}
     */

  }, {
    key: "cleanup",
    value: function cleanup() {
      return this.edgeType.cleanup();
    }
    /**
     * Remove edge from the list and perform necessary cleanup.
     */

  }, {
    key: "remove",
    value: function remove() {
      this.cleanup();
      this.disconnect();
      delete this.body.edges[this.id];
    }
    /**
     * Check if both connecting nodes exist
     * @returns {boolean}
     */

  }, {
    key: "endPointsValid",
    value: function endPointsValid() {
      return this.body.nodes[this.fromId] !== undefined && this.body.nodes[this.toId] !== undefined;
    }
  }], [{
    key: "parseOptions",
    value: function parseOptions(parentOptions, newOptions) {
      var allowDeletion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var globalOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var copyFromGlobals = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var fields = ['endPointOffset', 'arrowStrikethrough', 'id', 'from', 'hidden', 'hoverWidth', 'labelHighlightBold', 'length', 'line', 'opacity', 'physics', 'scaling', 'selectionWidth', 'selfReferenceSize', 'selfReference', 'to', 'title', 'value', 'width', 'font', 'chosen', 'widthConstraint']; // only deep extend the items in the field array. These do not have shorthand.

      selectiveDeepExtend(fields, parentOptions, newOptions, allowDeletion); // Only use endPointOffset values (from and to) if it's valid values

      if (newOptions.endPointOffset !== undefined && newOptions.endPointOffset.from !== undefined) {
        if (_isFinite$2(newOptions.endPointOffset.from)) {
          parentOptions.endPointOffset.from = newOptions.endPointOffset.from;
        } else {
          parentOptions.endPointOffset.from = globalOptions.endPointOffset.from !== undefined ? globalOptions.endPointOffset.from : 0;
          console.error('endPointOffset.from is not a valid number');
        }
      }

      if (newOptions.endPointOffset !== undefined && newOptions.endPointOffset.to !== undefined) {
        if (_isFinite$2(newOptions.endPointOffset.to)) {
          parentOptions.endPointOffset.to = newOptions.endPointOffset.to;
        } else {
          parentOptions.endPointOffset.to = globalOptions.endPointOffset.to !== undefined ? globalOptions.endPointOffset.to : 0;
          console.error('endPointOffset.to is not a valid number');
        }
      } // Only copy label if it's a legal value.


      if (isValidLabel(newOptions.label)) {
        parentOptions.label = newOptions.label;
      } else if (!isValidLabel(parentOptions.label)) {
        parentOptions.label = undefined;
      }

      mergeOptions(parentOptions, newOptions, 'smooth', globalOptions);
      mergeOptions(parentOptions, newOptions, 'shadow', globalOptions);
      mergeOptions(parentOptions, newOptions, 'background', globalOptions);

      if (newOptions.dashes !== undefined && newOptions.dashes !== null) {
        parentOptions.dashes = newOptions.dashes;
      } else if (allowDeletion === true && newOptions.dashes === null) {
        parentOptions.dashes = create$2(globalOptions.dashes); // this sets the pointer of the option back to the global option.
      } // set the scaling newOptions


      if (newOptions.scaling !== undefined && newOptions.scaling !== null) {
        if (newOptions.scaling.min !== undefined) {
          parentOptions.scaling.min = newOptions.scaling.min;
        }

        if (newOptions.scaling.max !== undefined) {
          parentOptions.scaling.max = newOptions.scaling.max;
        }

        mergeOptions(parentOptions.scaling, newOptions.scaling, 'label', globalOptions.scaling);
      } else if (allowDeletion === true && newOptions.scaling === null) {
        parentOptions.scaling = create$2(globalOptions.scaling); // this sets the pointer of the option back to the global option.
      } // handle multiple input cases for arrows


      if (newOptions.arrows !== undefined && newOptions.arrows !== null) {
        if (typeof newOptions.arrows === 'string') {
          var arrows = newOptions.arrows.toLowerCase();
          parentOptions.arrows.to.enabled = indexOf$3(arrows).call(arrows, "to") != -1;
          parentOptions.arrows.middle.enabled = indexOf$3(arrows).call(arrows, "middle") != -1;
          parentOptions.arrows.from.enabled = indexOf$3(arrows).call(arrows, "from") != -1;
        } else if (_typeof_1(newOptions.arrows) === 'object') {
          mergeOptions(parentOptions.arrows, newOptions.arrows, 'to', globalOptions.arrows);
          mergeOptions(parentOptions.arrows, newOptions.arrows, 'middle', globalOptions.arrows);
          mergeOptions(parentOptions.arrows, newOptions.arrows, 'from', globalOptions.arrows);
        } else {
          throw new Error("The arrow newOptions can only be an object or a string. Refer to the documentation. You used:" + stringify$2(newOptions.arrows));
        }
      } else if (allowDeletion === true && newOptions.arrows === null) {
        parentOptions.arrows = create$2(globalOptions.arrows); // this sets the pointer of the option back to the global option.
      } // handle multiple input cases for color


      if (newOptions.color !== undefined && newOptions.color !== null) {
        var fromColor = isString(newOptions.color) ? {
          color: newOptions.color,
          highlight: newOptions.color,
          hover: newOptions.color,
          inherit: false,
          opacity: 1
        } : newOptions.color;
        var toColor = parentOptions.color; // If passed, fill in values from default options - required in the case of no prototype bridging

        if (copyFromGlobals) {
          deepExtend(toColor, globalOptions.color, false, allowDeletion);
        } else {
          // Clear local properties - need to do it like this in order to retain prototype bridges
          for (var i in toColor) {
            if (Object.prototype.hasOwnProperty.call(toColor, i)) {
              delete toColor[i];
            }
          }
        }

        if (isString(toColor)) {
          toColor.color = toColor;
          toColor.highlight = toColor;
          toColor.hover = toColor;
          toColor.inherit = false;

          if (fromColor.opacity === undefined) {
            toColor.opacity = 1.0; // set default
          }
        } else {
          var colorsDefined = false;

          if (fromColor.color !== undefined) {
            toColor.color = fromColor.color;
            colorsDefined = true;
          }

          if (fromColor.highlight !== undefined) {
            toColor.highlight = fromColor.highlight;
            colorsDefined = true;
          }

          if (fromColor.hover !== undefined) {
            toColor.hover = fromColor.hover;
            colorsDefined = true;
          }

          if (fromColor.inherit !== undefined) {
            toColor.inherit = fromColor.inherit;
          }

          if (fromColor.opacity !== undefined) {
            toColor.opacity = Math.min(1, Math.max(0, fromColor.opacity));
          }

          if (colorsDefined === true) {
            toColor.inherit = false;
          } else {
            if (toColor.inherit === undefined) {
              toColor.inherit = 'from'; // Set default
            }
          }
        }
      } else if (allowDeletion === true && newOptions.color === null) {
        parentOptions.color = bridgeObject(globalOptions.color); // set the object back to the global options
      }

      if (allowDeletion === true && newOptions.font === null) {
        parentOptions.font = bridgeObject(globalOptions.font); // set the object back to the global options
      }

      if (Object.prototype.hasOwnProperty.call(newOptions, "selfReferenceSize")) {
        console.log('The selfReferenceSize property has been deprecated. Please use selfReference property instead. The selfReference can be set like thise selfReference:{size:30, angle:Math.PI / 4}');
        parentOptions.selfReference.size = newOptions.selfReferenceSize;
      }
    }
  }]);

  return Edge;
}();

/**
 * Handler for Edges
 */

var EdgesHandler = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Array.<Image>} images
   * @param {Array.<Group>} groups
   */
  function EdgesHandler(body, images, groups) {
    var _context,
        _this = this;

    classCallCheck(this, EdgesHandler);

    this.body = body;
    this.images = images;
    this.groups = groups; // create the edge API in the body container

    this.body.functions.createEdge = bind$2(_context = this.create).call(_context, this);
    this.edgesListeners = {
      add: function add(event, params) {
        _this.add(params.items);
      },
      update: function update(event, params) {
        _this.update(params.items);
      },
      remove: function remove(event, params) {
        _this.remove(params.items);
      }
    };
    this.options = {};
    this.defaultOptions = {
      arrows: {
        to: {
          enabled: false,
          scaleFactor: 1,
          type: 'arrow'
        },
        // boolean / {arrowScaleFactor:1} / {enabled: false, arrowScaleFactor:1}
        middle: {
          enabled: false,
          scaleFactor: 1,
          type: 'arrow'
        },
        from: {
          enabled: false,
          scaleFactor: 1,
          type: 'arrow'
        }
      },
      endPointOffset: {
        from: 0,
        to: 0
      },
      arrowStrikethrough: true,
      color: {
        color: '#848484',
        highlight: '#848484',
        hover: '#848484',
        inherit: 'from',
        opacity: 1.0
      },
      dashes: false,
      font: {
        color: '#343434',
        size: 14,
        // px
        face: 'arial',
        background: 'none',
        strokeWidth: 2,
        // px
        strokeColor: '#ffffff',
        align: 'horizontal',
        multi: false,
        vadjust: 0,
        bold: {
          mod: 'bold'
        },
        boldital: {
          mod: 'bold italic'
        },
        ital: {
          mod: 'italic'
        },
        mono: {
          mod: '',
          size: 15,
          // px
          face: 'courier new',
          vadjust: 2
        }
      },
      hidden: false,
      hoverWidth: 1.5,
      label: undefined,
      labelHighlightBold: true,
      length: undefined,
      physics: true,
      scaling: {
        min: 1,
        max: 15,
        label: {
          enabled: true,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
        customScalingFunction: function customScalingFunction(min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            var scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        }
      },
      selectionWidth: 1.5,
      selfReference: {
        size: 20,
        angle: Math.PI / 4,
        renderBehindTheNode: true
      },
      shadow: {
        enabled: false,
        color: 'rgba(0,0,0,0.5)',
        size: 10,
        x: 5,
        y: 5
      },
      background: {
        enabled: false,
        color: 'rgba(111,111,111,1)',
        size: 10,
        dashes: false
      },
      smooth: {
        enabled: true,
        type: "dynamic",
        forceDirection: 'none',
        roundness: 0.5
      },
      title: undefined,
      width: 1,
      value: undefined
    };
    deepExtend(this.options, this.defaultOptions);
    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(EdgesHandler, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this2 = this,
          _context2,
          _context3;

      // this allows external modules to force all dynamic curves to turn static.
      this.body.emitter.on("_forceDisableDynamicCurves", function (type) {
        var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (type === 'dynamic') {
          type = 'continuous';
        }

        var dataChanged = false;

        for (var edgeId in _this2.body.edges) {
          if (Object.prototype.hasOwnProperty.call(_this2.body.edges, edgeId)) {
            var edge = _this2.body.edges[edgeId];

            var edgeData = _this2.body.data.edges.get(edgeId); // only forcibly remove the smooth curve if the data has been set of the edge has the smooth curves defined.
            // this is because a change in the global would not affect these curves.


            if (edgeData != null) {
              var smoothOptions = edgeData.smooth;

              if (smoothOptions !== undefined) {
                if (smoothOptions.enabled === true && smoothOptions.type === 'dynamic') {
                  if (type === undefined) {
                    edge.setOptions({
                      smooth: false
                    });
                  } else {
                    edge.setOptions({
                      smooth: {
                        type: type
                      }
                    });
                  }

                  dataChanged = true;
                }
              }
            }
          }
        }

        if (emit === true && dataChanged === true) {
          _this2.body.emitter.emit("_dataChanged");
        }
      }); // this is called when options of EXISTING nodes or edges have changed.
      //
      // NOTE: Not true, called when options have NOT changed, for both existing as well as new nodes.
      //       See update() for logic.
      // TODO: Verify and examine the consequences of this. It might still trigger when
      //       non-option fields have changed, but then reconnecting edges is still useless.
      //       Alternatively, it might also be called when edges are removed.
      //

      this.body.emitter.on("_dataUpdated", function () {
        _this2.reconnectEdges();
      }); // refresh the edges. Used when reverting from hierarchical layout

      this.body.emitter.on("refreshEdges", bind$2(_context2 = this.refresh).call(_context2, this));
      this.body.emitter.on("refresh", bind$2(_context3 = this.refresh).call(_context3, this));
      this.body.emitter.on("destroy", function () {
        forEach$3(_this2.edgesListeners, function (callback, event) {
          if (_this2.body.data.edges) _this2.body.data.edges.off(event, callback);
        });
        delete _this2.body.functions.createEdge;
        delete _this2.edgesListeners.add;
        delete _this2.edgesListeners.update;
        delete _this2.edgesListeners.remove;
        delete _this2.edgesListeners;
      });
    }
    /**
     *
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        // use the parser from the Edge class to fill in all shorthand notations
        Edge.parseOptions(this.options, options, true, this.defaultOptions, true); // update smooth settings in all edges

        var dataChanged = false;

        if (options.smooth !== undefined) {
          for (var edgeId in this.body.edges) {
            if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
              dataChanged = this.body.edges[edgeId].updateEdgeType() || dataChanged;
            }
          }
        } // update fonts in all edges


        if (options.font !== undefined) {
          for (var _edgeId in this.body.edges) {
            if (Object.prototype.hasOwnProperty.call(this.body.edges, _edgeId)) {
              this.body.edges[_edgeId].updateLabelModule();
            }
          }
        } // update the state of the variables if needed


        if (options.hidden !== undefined || options.physics !== undefined || dataChanged === true) {
          this.body.emitter.emit('_dataChanged');
        }
      }
    }
    /**
     * Load edges by reading the data table
     * @param {Array | DataSet | DataView} edges    The data containing the edges.
     * @param {boolean} [doNotEmit=false]
     * @private
     */

  }, {
    key: "setData",
    value: function setData(edges) {
      var _this3 = this;

      var doNotEmit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var oldEdgesData = this.body.data.edges;

      if (edges instanceof DataSet || edges instanceof DataView) {
        this.body.data.edges = edges;
      } else if (isArray$5(edges)) {
        this.body.data.edges = new DataSet();
        this.body.data.edges.add(edges);
      } else if (!edges) {
        this.body.data.edges = new DataSet();
      } else {
        throw new TypeError('Array or DataSet expected');
      } // TODO: is this null or undefined or false?


      if (oldEdgesData) {
        // unsubscribe from old dataset
        forEach$3(this.edgesListeners, function (callback, event) {
          oldEdgesData.off(event, callback);
        });
      } // remove drawn edges


      this.body.edges = {}; // TODO: is this null or undefined or false?

      if (this.body.data.edges) {
        // subscribe to new dataset
        forEach$3(this.edgesListeners, function (callback, event) {
          _this3.body.data.edges.on(event, callback);
        }); // draw all new nodes

        var ids = this.body.data.edges.getIds();
        this.add(ids, true);
      }

      this.body.emitter.emit('_adjustEdgesForHierarchicalLayout');

      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    /**
     * Add edges
     * @param {number[] | string[]} ids
     * @param {boolean} [doNotEmit=false]
     * @private
     */

  }, {
    key: "add",
    value: function add(ids) {
      var doNotEmit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var edges = this.body.edges;
      var edgesData = this.body.data.edges;

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var oldEdge = edges[id];

        if (oldEdge) {
          oldEdge.disconnect();
        }

        var data = edgesData.get(id, {
          "showInternalIds": true
        });
        edges[id] = this.create(data);
      }

      this.body.emitter.emit('_adjustEdgesForHierarchicalLayout');

      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    /**
     * Update existing edges, or create them when not yet existing
     * @param {number[] | string[]} ids
     * @private
     */

  }, {
    key: "update",
    value: function update(ids) {
      var edges = this.body.edges;
      var edgesData = this.body.data.edges;
      var dataChanged = false;

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var data = edgesData.get(id);
        var edge = edges[id];

        if (edge !== undefined) {
          // update edge
          edge.disconnect();
          dataChanged = edge.setOptions(data) || dataChanged; // if a support node is added, data can be changed.

          edge.connect();
        } else {
          // create edge
          this.body.edges[id] = this.create(data);
          dataChanged = true;
        }
      }

      if (dataChanged === true) {
        this.body.emitter.emit('_adjustEdgesForHierarchicalLayout');
        this.body.emitter.emit("_dataChanged");
      } else {
        this.body.emitter.emit("_dataUpdated");
      }
    }
    /**
     * Remove existing edges. Non existing ids will be ignored
     * @param {number[] | string[]} ids
     * @param {boolean} [emit=true]
     * @private
     */

  }, {
    key: "remove",
    value: function remove(ids) {
      var emit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (ids.length === 0) return; // early out

      var edges = this.body.edges;
      forEach$3(ids, function (id) {
        var edge = edges[id];

        if (edge !== undefined) {
          edge.remove();
        }
      });

      if (emit) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    /**
     * Refreshes Edge Handler
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var _this4 = this;

      forEach$3(this.body.edges, function (edge, edgeId) {
        var data = _this4.body.data.edges.get(edgeId);

        if (data !== undefined) {
          edge.setOptions(data);
        }
      });
    }
    /**
     *
     * @param {Object} properties
     * @returns {Edge}
     */

  }, {
    key: "create",
    value: function create(properties) {
      return new Edge(properties, this.body, this.images, this.options, this.defaultOptions);
    }
    /**
     * Reconnect all edges
     * @private
     */

  }, {
    key: "reconnectEdges",
    value: function reconnectEdges() {
      var id;
      var nodes = this.body.nodes;
      var edges = this.body.edges;

      for (id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          nodes[id].edges = [];
        }
      }

      for (id in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, id)) {
          var edge = edges[id];
          edge.from = null;
          edge.to = null;
          edge.connect();
        }
      }
    }
    /**
     *
     * @param {Edge.id} edgeId
     * @returns {Array}
     */

  }, {
    key: "getConnectedNodes",
    value: function getConnectedNodes(edgeId) {
      var nodeList = [];

      if (this.body.edges[edgeId] !== undefined) {
        var edge = this.body.edges[edgeId];

        if (edge.fromId !== undefined) {
          nodeList.push(edge.fromId);
        }

        if (edge.toId !== undefined) {
          nodeList.push(edge.toId);
        }
      }

      return nodeList;
    }
    /**
     * There is no direct relation between the nodes and the edges DataSet,
     * so the right place to do call this is in the handler for event `_dataUpdated`.
     */

  }, {
    key: "_updateState",
    value: function _updateState() {
      this._addMissingEdges();

      this._removeInvalidEdges();
    }
    /**
     * Scan for missing nodes and remove corresponding edges, if any.
     * @private
     */

  }, {
    key: "_removeInvalidEdges",
    value: function _removeInvalidEdges() {
      var _this5 = this;

      var edgesToDelete = [];
      forEach$3(this.body.edges, function (edge, id) {
        var toNode = _this5.body.nodes[edge.toId];
        var fromNode = _this5.body.nodes[edge.fromId]; // Skip clustering edges here, let the Clustering module handle those

        if (toNode !== undefined && toNode.isCluster === true || fromNode !== undefined && fromNode.isCluster === true) {
          return;
        }

        if (toNode === undefined || fromNode === undefined) {
          edgesToDelete.push(id);
        }
      });
      this.remove(edgesToDelete, false);
    }
    /**
     * add all edges from dataset that are not in the cached state
     * @private
     */

  }, {
    key: "_addMissingEdges",
    value: function _addMissingEdges() {
      var edgesData = this.body.data.edges;

      if (edgesData === undefined || edgesData === null) {
        return; // No edges DataSet yet; can happen on startup
      }

      var edges = this.body.edges;
      var addIds = [];

      forEach$2(edgesData).call(edgesData, function (edgeData, edgeId) {
        var edge = edges[edgeId];

        if (edge === undefined) {
          addIds.push(edgeId);
        }
      });

      this.add(addIds, true);
    }
  }]);

  return EdgesHandler;
}();

/**
 * Barnes Hut Solver
 */

var BarnesHutSolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function BarnesHutSolver(body, physicsBody, options) {
    classCallCheck(this, BarnesHutSolver);

    this.body = body;
    this.physicsBody = physicsBody;
    this.barnesHutTree;
    this.setOptions(options);
    this._rng = Alea("BARNES HUT SOLVER"); // debug: show grid
    // this.body.emitter.on("afterDrawing", (ctx) => {this._debug(ctx,'#ff0000')})
  }
  /**
   *
   * @param {Object} options
   */


  createClass(BarnesHutSolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
      this.thetaInversed = 1 / this.options.theta; // if 1 then min distance = 0.5, if 0.5 then min distance = 0.5 + 0.5*node.shape.radius

      this.overlapAvoidanceFactor = 1 - Math.max(0, Math.min(1, this.options.avoidOverlap));
    }
    /**
     * This function calculates the forces the nodes apply on each other based on a gravitational model.
     * The Barnes Hut method is used to speed up this N-body simulation.
     *
     * @private
     */

  }, {
    key: "solve",
    value: function solve() {
      if (this.options.gravitationalConstant !== 0 && this.physicsBody.physicsNodeIndices.length > 0) {
        var node;
        var nodes = this.body.nodes;
        var nodeIndices = this.physicsBody.physicsNodeIndices;
        var nodeCount = nodeIndices.length; // create the tree

        var barnesHutTree = this._formBarnesHutTree(nodes, nodeIndices); // for debugging


        this.barnesHutTree = barnesHutTree; // place the nodes one by one recursively

        for (var i = 0; i < nodeCount; i++) {
          node = nodes[nodeIndices[i]];

          if (node.options.mass > 0) {
            // starting with root is irrelevant, it never passes the BarnesHutSolver condition
            this._getForceContributions(barnesHutTree.root, node);
          }
        }
      }
    }
    /**
     * @param {Object} parentBranch
     * @param {Node} node
     * @private
     */

  }, {
    key: "_getForceContributions",
    value: function _getForceContributions(parentBranch, node) {
      this._getForceContribution(parentBranch.children.NW, node);

      this._getForceContribution(parentBranch.children.NE, node);

      this._getForceContribution(parentBranch.children.SW, node);

      this._getForceContribution(parentBranch.children.SE, node);
    }
    /**
     * This function traverses the barnesHutTree. It checks when it can approximate distant nodes with their center of mass.
     * If a region contains a single node, we check if it is not itself, then we apply the force.
     *
     * @param {Object} parentBranch
     * @param {Node} node
     * @private
     */

  }, {
    key: "_getForceContribution",
    value: function _getForceContribution(parentBranch, node) {
      // we get no force contribution from an empty region
      if (parentBranch.childrenCount > 0) {
        // get the distance from the center of mass to the node.
        var dx = parentBranch.centerOfMass.x - node.x;
        var dy = parentBranch.centerOfMass.y - node.y;
        var distance = Math.sqrt(dx * dx + dy * dy); // BarnesHutSolver condition
        // original condition : s/d < theta = passed  ===  d/s > 1/theta = passed
        // calcSize = 1/s --> d * 1/s > 1/theta = passed

        if (distance * parentBranch.calcSize > this.thetaInversed) {
          this._calculateForces(distance, dx, dy, node, parentBranch);
        } else {
          // Did not pass the condition, go into children if available
          if (parentBranch.childrenCount === 4) {
            this._getForceContributions(parentBranch, node);
          } else {
            // parentBranch must have only one node, if it was empty we wouldnt be here
            if (parentBranch.children.data.id != node.id) {
              // if it is not self
              this._calculateForces(distance, dx, dy, node, parentBranch);
            }
          }
        }
      }
    }
    /**
     * Calculate the forces based on the distance.
     *
     * @param {number} distance
     * @param {number} dx
     * @param {number} dy
     * @param {Node} node
     * @param {Object} parentBranch
     * @private
     */

  }, {
    key: "_calculateForces",
    value: function _calculateForces(distance, dx, dy, node, parentBranch) {
      if (distance === 0) {
        distance = 0.1;
        dx = distance;
      }

      if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
        distance = Math.max(0.1 + this.overlapAvoidanceFactor * node.shape.radius, distance - node.shape.radius);
      } // the dividing by the distance cubed instead of squared allows us to get the fx and fy components without sines and cosines
      // it is shorthand for gravityforce with distance squared and fx = dx/distance * gravityForce


      var gravityForce = this.options.gravitationalConstant * parentBranch.mass * node.options.mass / Math.pow(distance, 3);
      var fx = dx * gravityForce;
      var fy = dy * gravityForce;
      this.physicsBody.forces[node.id].x += fx;
      this.physicsBody.forces[node.id].y += fy;
    }
    /**
     * This function constructs the barnesHut tree recursively. It creates the root, splits it and starts placing the nodes.
     *
     * @param {Array.<Node>} nodes
     * @param {Array.<number>} nodeIndices
     * @returns {{root: {centerOfMass: {x: number, y: number}, mass: number, range: {minX: number, maxX: number, minY: number, maxY: number}, size: number, calcSize: number, children: {data: null}, maxWidth: number, level: number, childrenCount: number}}} BarnesHutTree
     * @private
     */

  }, {
    key: "_formBarnesHutTree",
    value: function _formBarnesHutTree(nodes, nodeIndices) {
      var node;
      var nodeCount = nodeIndices.length;
      var minX = nodes[nodeIndices[0]].x;
      var minY = nodes[nodeIndices[0]].y;
      var maxX = nodes[nodeIndices[0]].x;
      var maxY = nodes[nodeIndices[0]].y; // get the range of the nodes

      for (var i = 1; i < nodeCount; i++) {
        var _node = nodes[nodeIndices[i]];
        var x = _node.x;
        var y = _node.y;

        if (_node.options.mass > 0) {
          if (x < minX) {
            minX = x;
          }

          if (x > maxX) {
            maxX = x;
          }

          if (y < minY) {
            minY = y;
          }

          if (y > maxY) {
            maxY = y;
          }
        }
      } // make the range a square


      var sizeDiff = Math.abs(maxX - minX) - Math.abs(maxY - minY); // difference between X and Y

      if (sizeDiff > 0) {
        minY -= 0.5 * sizeDiff;
        maxY += 0.5 * sizeDiff;
      } // xSize > ySize
      else {
          minX += 0.5 * sizeDiff;
          maxX -= 0.5 * sizeDiff;
        } // xSize < ySize


      var minimumTreeSize = 1e-5;
      var rootSize = Math.max(minimumTreeSize, Math.abs(maxX - minX));
      var halfRootSize = 0.5 * rootSize;
      var centerX = 0.5 * (minX + maxX),
          centerY = 0.5 * (minY + maxY); // construct the barnesHutTree

      var barnesHutTree = {
        root: {
          centerOfMass: {
            x: 0,
            y: 0
          },
          mass: 0,
          range: {
            minX: centerX - halfRootSize,
            maxX: centerX + halfRootSize,
            minY: centerY - halfRootSize,
            maxY: centerY + halfRootSize
          },
          size: rootSize,
          calcSize: 1 / rootSize,
          children: {
            data: null
          },
          maxWidth: 0,
          level: 0,
          childrenCount: 4
        }
      };

      this._splitBranch(barnesHutTree.root); // place the nodes one by one recursively


      for (var _i = 0; _i < nodeCount; _i++) {
        node = nodes[nodeIndices[_i]];

        if (node.options.mass > 0) {
          this._placeInTree(barnesHutTree.root, node);
        }
      } // make global


      return barnesHutTree;
    }
    /**
     * this updates the mass of a branch. this is increased by adding a node.
     *
     * @param {Object} parentBranch
     * @param {Node} node
     * @private
     */

  }, {
    key: "_updateBranchMass",
    value: function _updateBranchMass(parentBranch, node) {
      var centerOfMass = parentBranch.centerOfMass;
      var totalMass = parentBranch.mass + node.options.mass;
      var totalMassInv = 1 / totalMass;
      centerOfMass.x = centerOfMass.x * parentBranch.mass + node.x * node.options.mass;
      centerOfMass.x *= totalMassInv;
      centerOfMass.y = centerOfMass.y * parentBranch.mass + node.y * node.options.mass;
      centerOfMass.y *= totalMassInv;
      parentBranch.mass = totalMass;
      var biggestSize = Math.max(Math.max(node.height, node.radius), node.width);
      parentBranch.maxWidth = parentBranch.maxWidth < biggestSize ? biggestSize : parentBranch.maxWidth;
    }
    /**
     * determine in which branch the node will be placed.
     *
     * @param {Object} parentBranch
     * @param {Node} node
     * @param {boolean} skipMassUpdate
     * @private
     */

  }, {
    key: "_placeInTree",
    value: function _placeInTree(parentBranch, node, skipMassUpdate) {
      if (skipMassUpdate != true || skipMassUpdate === undefined) {
        // update the mass of the branch.
        this._updateBranchMass(parentBranch, node);
      }

      var range = parentBranch.children.NW.range;
      var region;

      if (range.maxX > node.x) {
        // in NW or SW
        if (range.maxY > node.y) {
          region = "NW";
        } else {
          region = "SW";
        }
      } else {
        // in NE or SE
        if (range.maxY > node.y) {
          region = "NE";
        } else {
          region = "SE";
        }
      }

      this._placeInRegion(parentBranch, node, region);
    }
    /**
     * actually place the node in a region (or branch)
     *
     * @param {Object} parentBranch
     * @param {Node} node
     * @param {'NW'| 'NE' | 'SW' | 'SE'} region
     * @private
     */

  }, {
    key: "_placeInRegion",
    value: function _placeInRegion(parentBranch, node, region) {
      var children = parentBranch.children[region];

      switch (children.childrenCount) {
        case 0:
          // place node here
          children.children.data = node;
          children.childrenCount = 1;

          this._updateBranchMass(children, node);

          break;

        case 1:
          // convert into children
          // if there are two nodes exactly overlapping (on init, on opening of cluster etc.)
          // we move one node a little bit and we do not put it in the tree.
          if (children.children.data.x === node.x && children.children.data.y === node.y) {
            node.x += this._rng();
            node.y += this._rng();
          } else {
            this._splitBranch(children);

            this._placeInTree(children, node);
          }

          break;

        case 4:
          // place in branch
          this._placeInTree(children, node);

          break;
      }
    }
    /**
     * this function splits a branch into 4 sub branches. If the branch contained a node, we place it in the subbranch
     * after the split is complete.
     *
     * @param {Object} parentBranch
     * @private
     */

  }, {
    key: "_splitBranch",
    value: function _splitBranch(parentBranch) {
      // if the branch is shaded with a node, replace the node in the new subset.
      var containedNode = null;

      if (parentBranch.childrenCount === 1) {
        containedNode = parentBranch.children.data;
        parentBranch.mass = 0;
        parentBranch.centerOfMass.x = 0;
        parentBranch.centerOfMass.y = 0;
      }

      parentBranch.childrenCount = 4;
      parentBranch.children.data = null;

      this._insertRegion(parentBranch, "NW");

      this._insertRegion(parentBranch, "NE");

      this._insertRegion(parentBranch, "SW");

      this._insertRegion(parentBranch, "SE");

      if (containedNode != null) {
        this._placeInTree(parentBranch, containedNode);
      }
    }
    /**
     * This function subdivides the region into four new segments.
     * Specifically, this inserts a single new segment.
     * It fills the children section of the parentBranch
     *
     * @param {Object} parentBranch
     * @param {'NW'| 'NE' | 'SW' | 'SE'} region
     * @private
     */

  }, {
    key: "_insertRegion",
    value: function _insertRegion(parentBranch, region) {
      var minX, maxX, minY, maxY;
      var childSize = 0.5 * parentBranch.size;

      switch (region) {
        case "NW":
          minX = parentBranch.range.minX;
          maxX = parentBranch.range.minX + childSize;
          minY = parentBranch.range.minY;
          maxY = parentBranch.range.minY + childSize;
          break;

        case "NE":
          minX = parentBranch.range.minX + childSize;
          maxX = parentBranch.range.maxX;
          minY = parentBranch.range.minY;
          maxY = parentBranch.range.minY + childSize;
          break;

        case "SW":
          minX = parentBranch.range.minX;
          maxX = parentBranch.range.minX + childSize;
          minY = parentBranch.range.minY + childSize;
          maxY = parentBranch.range.maxY;
          break;

        case "SE":
          minX = parentBranch.range.minX + childSize;
          maxX = parentBranch.range.maxX;
          minY = parentBranch.range.minY + childSize;
          maxY = parentBranch.range.maxY;
          break;
      }

      parentBranch.children[region] = {
        centerOfMass: {
          x: 0,
          y: 0
        },
        mass: 0,
        range: {
          minX: minX,
          maxX: maxX,
          minY: minY,
          maxY: maxY
        },
        size: 0.5 * parentBranch.size,
        calcSize: 2 * parentBranch.calcSize,
        children: {
          data: null
        },
        maxWidth: 0,
        level: parentBranch.level + 1,
        childrenCount: 0
      };
    } //---------------------------  DEBUGGING BELOW  ---------------------------//

    /**
     * This function is for debugging purposed, it draws the tree.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} color
     * @private
     */

  }, {
    key: "_debug",
    value: function _debug(ctx, color) {
      if (this.barnesHutTree !== undefined) {
        ctx.lineWidth = 1;

        this._drawBranch(this.barnesHutTree.root, ctx, color);
      }
    }
    /**
     * This function is for debugging purposes. It draws the branches recursively.
     *
     * @param {Object} branch
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} color
     * @private
     */

  }, {
    key: "_drawBranch",
    value: function _drawBranch(branch, ctx, color) {
      if (color === undefined) {
        color = "#FF0000";
      }

      if (branch.childrenCount === 4) {
        this._drawBranch(branch.children.NW, ctx);

        this._drawBranch(branch.children.NE, ctx);

        this._drawBranch(branch.children.SE, ctx);

        this._drawBranch(branch.children.SW, ctx);
      }

      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(branch.range.minX, branch.range.minY);
      ctx.lineTo(branch.range.maxX, branch.range.minY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.maxX, branch.range.minY);
      ctx.lineTo(branch.range.maxX, branch.range.maxY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.maxX, branch.range.maxY);
      ctx.lineTo(branch.range.minX, branch.range.maxY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.minX, branch.range.maxY);
      ctx.lineTo(branch.range.minX, branch.range.minY);
      ctx.stroke();
      /*
       if (branch.mass > 0) {
       ctx.circle(branch.centerOfMass.x, branch.centerOfMass.y, 3*branch.mass);
       ctx.stroke();
       }
       */
    }
  }]);

  return BarnesHutSolver;
}();

/**
 * Repulsion Solver
 */

var RepulsionSolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function RepulsionSolver(body, physicsBody, options) {
    classCallCheck(this, RepulsionSolver);

    this._rng = Alea("REPULSION SOLVER");
    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(RepulsionSolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
    /**
     * Calculate the forces the nodes apply on each other based on a repulsion field.
     * This field is linearly approximated.
     *
     * @private
     */

  }, {
    key: "solve",
    value: function solve() {
      var dx, dy, distance, fx, fy, repulsingForce, node1, node2;
      var nodes = this.body.nodes;
      var nodeIndices = this.physicsBody.physicsNodeIndices;
      var forces = this.physicsBody.forces; // repulsing forces between nodes

      var nodeDistance = this.options.nodeDistance; // approximation constants

      var a = -2 / 3 / nodeDistance;
      var b = 4 / 3; // we loop from i over all but the last entree in the array
      // j loops from i+1 to the last. This way we do not double count any of the indices, nor i === j

      for (var i = 0; i < nodeIndices.length - 1; i++) {
        node1 = nodes[nodeIndices[i]];

        for (var j = i + 1; j < nodeIndices.length; j++) {
          node2 = nodes[nodeIndices[j]];
          dx = node2.x - node1.x;
          dy = node2.y - node1.y;
          distance = Math.sqrt(dx * dx + dy * dy); // same condition as BarnesHutSolver, making sure nodes are never 100% overlapping.

          if (distance === 0) {
            distance = 0.1 * this._rng();
            dx = distance;
          }

          if (distance < 2 * nodeDistance) {
            if (distance < 0.5 * nodeDistance) {
              repulsingForce = 1.0;
            } else {
              repulsingForce = a * distance + b; // linear approx of  1 / (1 + Math.exp((distance / nodeDistance - 1) * steepness))
            }

            repulsingForce = repulsingForce / distance;
            fx = dx * repulsingForce;
            fy = dy * repulsingForce;
            forces[node1.id].x -= fx;
            forces[node1.id].y -= fy;
            forces[node2.id].x += fx;
            forces[node2.id].y += fy;
          }
        }
      }
    }
  }]);

  return RepulsionSolver;
}();

/**
 * Hierarchical Repulsion Solver
 */
var HierarchicalRepulsionSolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function HierarchicalRepulsionSolver(body, physicsBody, options) {
    classCallCheck(this, HierarchicalRepulsionSolver);

    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(HierarchicalRepulsionSolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
      this.overlapAvoidanceFactor = Math.max(0, Math.min(1, this.options.avoidOverlap || 0));
    }
    /**
     * Calculate the forces the nodes apply on each other based on a repulsion field.
     * This field is linearly approximated.
     *
     * @private
     */

  }, {
    key: "solve",
    value: function solve() {
      var nodes = this.body.nodes;
      var nodeIndices = this.physicsBody.physicsNodeIndices;
      var forces = this.physicsBody.forces; // repulsing forces between nodes

      var nodeDistance = this.options.nodeDistance; // we loop from i over all but the last entree in the array
      // j loops from i+1 to the last. This way we do not double count any of the indices, nor i === j

      for (var i = 0; i < nodeIndices.length - 1; i++) {
        var node1 = nodes[nodeIndices[i]];

        for (var j = i + 1; j < nodeIndices.length; j++) {
          var node2 = nodes[nodeIndices[j]]; // nodes only affect nodes on their level

          if (node1.level === node2.level) {
            var theseNodesDistance = nodeDistance + this.overlapAvoidanceFactor * ((node1.shape.radius || 0) / 2 + (node2.shape.radius || 0) / 2);
            var dx = node2.x - node1.x;
            var dy = node2.y - node1.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var steepness = 0.05;
            var repulsingForce = void 0;

            if (distance < theseNodesDistance) {
              repulsingForce = -Math.pow(steepness * distance, 2) + Math.pow(steepness * theseNodesDistance, 2);
            } else {
              repulsingForce = 0;
            } // normalize force with


            if (distance !== 0) {
              repulsingForce = repulsingForce / distance;
            }

            var fx = dx * repulsingForce;
            var fy = dy * repulsingForce;
            forces[node1.id].x -= fx;
            forces[node1.id].y -= fy;
            forces[node2.id].x += fx;
            forces[node2.id].y += fy;
          }
        }
      }
    }
  }]);

  return HierarchicalRepulsionSolver;
}();

/**
 * Spring Solver
 */
var SpringSolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function SpringSolver(body, physicsBody, options) {
    classCallCheck(this, SpringSolver);

    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(SpringSolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
    /**
     * This function calculates the springforces on the nodes, accounting for the support nodes.
     *
     * @private
     */

  }, {
    key: "solve",
    value: function solve() {
      var edgeLength, edge;
      var edgeIndices = this.physicsBody.physicsEdgeIndices;
      var edges = this.body.edges;
      var node1, node2, node3; // forces caused by the edges, modelled as springs

      for (var i = 0; i < edgeIndices.length; i++) {
        edge = edges[edgeIndices[i]];

        if (edge.connected === true && edge.toId !== edge.fromId) {
          // only calculate forces if nodes are in the same sector
          if (this.body.nodes[edge.toId] !== undefined && this.body.nodes[edge.fromId] !== undefined) {
            if (edge.edgeType.via !== undefined) {
              edgeLength = edge.options.length === undefined ? this.options.springLength : edge.options.length;
              node1 = edge.to;
              node2 = edge.edgeType.via;
              node3 = edge.from;

              this._calculateSpringForce(node1, node2, 0.5 * edgeLength);

              this._calculateSpringForce(node2, node3, 0.5 * edgeLength);
            } else {
              // the * 1.5 is here so the edge looks as large as a smooth edge. It does not initially because the smooth edges use
              // the support nodes which exert a repulsive force on the to and from nodes, making the edge appear larger.
              edgeLength = edge.options.length === undefined ? this.options.springLength * 1.5 : edge.options.length;

              this._calculateSpringForce(edge.from, edge.to, edgeLength);
            }
          }
        }
      }
    }
    /**
     * This is the code actually performing the calculation for the function above.
     *
     * @param {Node} node1
     * @param {Node} node2
     * @param {number} edgeLength
     * @private
     */

  }, {
    key: "_calculateSpringForce",
    value: function _calculateSpringForce(node1, node2, edgeLength) {
      var dx = node1.x - node2.x;
      var dy = node1.y - node2.y;
      var distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01); // the 1/distance is so the fx and fy can be calculated without sine or cosine.

      var springForce = this.options.springConstant * (edgeLength - distance) / distance;
      var fx = dx * springForce;
      var fy = dy * springForce; // handle the case where one node is not part of the physcis

      if (this.physicsBody.forces[node1.id] !== undefined) {
        this.physicsBody.forces[node1.id].x += fx;
        this.physicsBody.forces[node1.id].y += fy;
      }

      if (this.physicsBody.forces[node2.id] !== undefined) {
        this.physicsBody.forces[node2.id].x -= fx;
        this.physicsBody.forces[node2.id].y -= fy;
      }
    }
  }]);

  return SpringSolver;
}();

/**
 * Hierarchical Spring Solver
 */
var HierarchicalSpringSolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function HierarchicalSpringSolver(body, physicsBody, options) {
    classCallCheck(this, HierarchicalSpringSolver);

    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(HierarchicalSpringSolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
    /**
     * This function calculates the springforces on the nodes, accounting for the support nodes.
     *
     * @private
     */

  }, {
    key: "solve",
    value: function solve() {
      var edgeLength, edge;
      var dx, dy, fx, fy, springForce, distance;
      var edges = this.body.edges;
      var factor = 0.5;
      var edgeIndices = this.physicsBody.physicsEdgeIndices;
      var nodeIndices = this.physicsBody.physicsNodeIndices;
      var forces = this.physicsBody.forces; // initialize the spring force counters

      for (var i = 0; i < nodeIndices.length; i++) {
        var nodeId = nodeIndices[i];
        forces[nodeId].springFx = 0;
        forces[nodeId].springFy = 0;
      } // forces caused by the edges, modelled as springs


      for (var _i = 0; _i < edgeIndices.length; _i++) {
        edge = edges[edgeIndices[_i]];

        if (edge.connected === true) {
          edgeLength = edge.options.length === undefined ? this.options.springLength : edge.options.length;
          dx = edge.from.x - edge.to.x;
          dy = edge.from.y - edge.to.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          distance = distance === 0 ? 0.01 : distance; // the 1/distance is so the fx and fy can be calculated without sine or cosine.

          springForce = this.options.springConstant * (edgeLength - distance) / distance;
          fx = dx * springForce;
          fy = dy * springForce;

          if (edge.to.level != edge.from.level) {
            if (forces[edge.toId] !== undefined) {
              forces[edge.toId].springFx -= fx;
              forces[edge.toId].springFy -= fy;
            }

            if (forces[edge.fromId] !== undefined) {
              forces[edge.fromId].springFx += fx;
              forces[edge.fromId].springFy += fy;
            }
          } else {
            if (forces[edge.toId] !== undefined) {
              forces[edge.toId].x -= factor * fx;
              forces[edge.toId].y -= factor * fy;
            }

            if (forces[edge.fromId] !== undefined) {
              forces[edge.fromId].x += factor * fx;
              forces[edge.fromId].y += factor * fy;
            }
          }
        }
      } // normalize spring forces


      springForce = 1;
      var springFx, springFy;

      for (var _i2 = 0; _i2 < nodeIndices.length; _i2++) {
        var _nodeId = nodeIndices[_i2];
        springFx = Math.min(springForce, Math.max(-springForce, forces[_nodeId].springFx));
        springFy = Math.min(springForce, Math.max(-springForce, forces[_nodeId].springFy));
        forces[_nodeId].x += springFx;
        forces[_nodeId].y += springFy;
      } // retain energy balance


      var totalFx = 0;
      var totalFy = 0;

      for (var _i3 = 0; _i3 < nodeIndices.length; _i3++) {
        var _nodeId2 = nodeIndices[_i3];
        totalFx += forces[_nodeId2].x;
        totalFy += forces[_nodeId2].y;
      }

      var correctionFx = totalFx / nodeIndices.length;
      var correctionFy = totalFy / nodeIndices.length;

      for (var _i4 = 0; _i4 < nodeIndices.length; _i4++) {
        var _nodeId3 = nodeIndices[_i4];
        forces[_nodeId3].x -= correctionFx;
        forces[_nodeId3].y -= correctionFy;
      }
    }
  }]);

  return HierarchicalSpringSolver;
}();

/**
 * Central Gravity Solver
 */
var CentralGravitySolver = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function CentralGravitySolver(body, physicsBody, options) {
    classCallCheck(this, CentralGravitySolver);

    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }
  /**
   *
   * @param {Object} options
   */


  createClass(CentralGravitySolver, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
    /**
     * Calculates forces for each node
     */

  }, {
    key: "solve",
    value: function solve() {
      var dx, dy, distance, node;
      var nodes = this.body.nodes;
      var nodeIndices = this.physicsBody.physicsNodeIndices;
      var forces = this.physicsBody.forces;

      for (var i = 0; i < nodeIndices.length; i++) {
        var nodeId = nodeIndices[i];
        node = nodes[nodeId];
        dx = -node.x;
        dy = -node.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        this._calculateForces(distance, dx, dy, forces, node);
      }
    }
    /**
     * Calculate the forces based on the distance.
     * @param {number} distance
     * @param {number} dx
     * @param {number} dy
     * @param {Object<Node.id, vis.Node>} forces
     * @param {Node} node
     * @private
     */

  }, {
    key: "_calculateForces",
    value: function _calculateForces(distance, dx, dy, forces, node) {
      var gravityForce = distance === 0 ? 0 : this.options.centralGravity / distance;
      forces[node.id].x = dx * gravityForce;
      forces[node.id].y = dy * gravityForce;
    }
  }]);

  return CentralGravitySolver;
}();

function _createSuper$p(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$p(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$p() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * @extends BarnesHutSolver
 */

var ForceAtlas2BasedRepulsionSolver = /*#__PURE__*/function (_BarnesHutSolver) {
  inherits(ForceAtlas2BasedRepulsionSolver, _BarnesHutSolver);

  var _super = _createSuper$p(ForceAtlas2BasedRepulsionSolver);

  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function ForceAtlas2BasedRepulsionSolver(body, physicsBody, options) {
    var _this;

    classCallCheck(this, ForceAtlas2BasedRepulsionSolver);

    _this = _super.call(this, body, physicsBody, options);
    _this._rng = Alea("FORCE ATLAS 2 BASED REPULSION SOLVER");
    return _this;
  }
  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Node} node
   * @param {Object} parentBranch
   * @private
   */


  createClass(ForceAtlas2BasedRepulsionSolver, [{
    key: "_calculateForces",
    value: function _calculateForces(distance, dx, dy, node, parentBranch) {
      if (distance === 0) {
        distance = 0.1 * this._rng();
        dx = distance;
      }

      if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
        distance = Math.max(0.1 + this.overlapAvoidanceFactor * node.shape.radius, distance - node.shape.radius);
      }

      var degree = node.edges.length + 1; // the dividing by the distance cubed instead of squared allows us to get the fx and fy components without sines and cosines
      // it is shorthand for gravityforce with distance squared and fx = dx/distance * gravityForce

      var gravityForce = this.options.gravitationalConstant * parentBranch.mass * node.options.mass * degree / Math.pow(distance, 2);
      var fx = dx * gravityForce;
      var fy = dy * gravityForce;
      this.physicsBody.forces[node.id].x += fx;
      this.physicsBody.forces[node.id].y += fy;
    }
  }]);

  return ForceAtlas2BasedRepulsionSolver;
}(BarnesHutSolver);

function _createSuper$q(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$q(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$q() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * @extends CentralGravitySolver
 */

var ForceAtlas2BasedCentralGravitySolver = /*#__PURE__*/function (_CentralGravitySolver) {
  inherits(ForceAtlas2BasedCentralGravitySolver, _CentralGravitySolver);

  var _super = _createSuper$q(ForceAtlas2BasedCentralGravitySolver);

  /**
   * @param {Object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {Object} options
   */
  function ForceAtlas2BasedCentralGravitySolver(body, physicsBody, options) {
    classCallCheck(this, ForceAtlas2BasedCentralGravitySolver);

    return _super.call(this, body, physicsBody, options);
  }
  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Object<Node.id, Node>} forces
   * @param {Node} node
   * @private
   */


  createClass(ForceAtlas2BasedCentralGravitySolver, [{
    key: "_calculateForces",
    value: function _calculateForces(distance, dx, dy, forces, node) {
      if (distance > 0) {
        var degree = node.edges.length + 1;
        var gravityForce = this.options.centralGravity * degree * node.options.mass;
        forces[node.id].x = dx * gravityForce;
        forces[node.id].y = dy * gravityForce;
      }
    }
  }]);

  return ForceAtlas2BasedCentralGravitySolver;
}(CentralGravitySolver);

/**
 * The physics engine
 */

var PhysicsEngine = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   */
  function PhysicsEngine(body) {
    classCallCheck(this, PhysicsEngine);

    this.body = body;
    this.physicsBody = {
      physicsNodeIndices: [],
      physicsEdgeIndices: [],
      forces: {},
      velocities: {}
    };
    this.physicsEnabled = true;
    this.simulationInterval = 1000 / 60;
    this.requiresTimeout = true;
    this.previousStates = {};
    this.referenceState = {};
    this.freezeCache = {};
    this.renderTimer = undefined; // parameters for the adaptive timestep

    this.adaptiveTimestep = false;
    this.adaptiveTimestepEnabled = false;
    this.adaptiveCounter = 0;
    this.adaptiveInterval = 3;
    this.stabilized = false;
    this.startedStabilization = false;
    this.stabilizationIterations = 0;
    this.ready = false; // will be set to true if the stabilize
    // default options

    this.options = {};
    this.defaultOptions = {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0
      },
      forceAtlas2Based: {
        theta: 0.5,
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09,
        avoidOverlap: 0
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09
      },
      maxVelocity: 50,
      minVelocity: 0.75,
      // px/s
      solver: 'barnesHut',
      stabilization: {
        enabled: true,
        iterations: 1000,
        // maximum number of iteration to stabilize
        updateInterval: 50,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: {
        x: 0,
        y: 0
      }
    };

    assign$2(this.options, this.defaultOptions);

    this.timestep = 0.5;
    this.layoutFailed = false;
    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(PhysicsEngine, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this = this;

      this.body.emitter.on('initPhysics', function () {
        _this.initPhysics();
      });
      this.body.emitter.on('_layoutFailed', function () {
        _this.layoutFailed = true;
      });
      this.body.emitter.on('resetPhysics', function () {
        _this.stopSimulation();

        _this.ready = false;
      });
      this.body.emitter.on('disablePhysics', function () {
        _this.physicsEnabled = false;

        _this.stopSimulation();
      });
      this.body.emitter.on('restorePhysics', function () {
        _this.setOptions(_this.options);

        if (_this.ready === true) {
          _this.startSimulation();
        }
      });
      this.body.emitter.on('startSimulation', function () {
        if (_this.ready === true) {
          _this.startSimulation();
        }
      });
      this.body.emitter.on('stopSimulation', function () {
        _this.stopSimulation();
      });
      this.body.emitter.on('destroy', function () {
        _this.stopSimulation(false);

        _this.body.emitter.off();
      });
      this.body.emitter.on("_dataChanged", function () {
        // Nodes and/or edges have been added or removed, update shortcut lists.
        _this.updatePhysicsData();
      }); // debug: show forces
      // this.body.emitter.on("afterDrawing", (ctx) => {this._drawForces(ctx);});
    }
    /**
     * set the physics options
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        if (options === false) {
          this.options.enabled = false;
          this.physicsEnabled = false;
          this.stopSimulation();
        } else if (options === true) {
          this.options.enabled = true;
          this.physicsEnabled = true;
          this.startSimulation();
        } else {
          this.physicsEnabled = true;
          selectiveNotDeepExtend(['stabilization'], this.options, options);
          mergeOptions(this.options, options, 'stabilization');

          if (options.enabled === undefined) {
            this.options.enabled = true;
          }

          if (this.options.enabled === false) {
            this.physicsEnabled = false;
            this.stopSimulation();
          }

          var wind = this.options.wind;

          if (wind) {
            if (typeof wind.x !== 'number' || isNan$2(wind.x)) {
              wind.x = 0;
            }

            if (typeof wind.y !== 'number' || isNan$2(wind.y)) {
              wind.y = 0;
            }
          } // set the timestep


          this.timestep = this.options.timestep;
        }
      }

      this.init();
    }
    /**
     * configure the engine.
     */

  }, {
    key: "init",
    value: function init() {
      var options;

      if (this.options.solver === 'forceAtlas2Based') {
        options = this.options.forceAtlas2Based;
        this.nodesSolver = new ForceAtlas2BasedRepulsionSolver(this.body, this.physicsBody, options);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
        this.gravitySolver = new ForceAtlas2BasedCentralGravitySolver(this.body, this.physicsBody, options);
      } else if (this.options.solver === 'repulsion') {
        options = this.options.repulsion;
        this.nodesSolver = new RepulsionSolver(this.body, this.physicsBody, options);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options);
      } else if (this.options.solver === 'hierarchicalRepulsion') {
        options = this.options.hierarchicalRepulsion;
        this.nodesSolver = new HierarchicalRepulsionSolver(this.body, this.physicsBody, options);
        this.edgesSolver = new HierarchicalSpringSolver(this.body, this.physicsBody, options);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options);
      } else {
        // barnesHut
        options = this.options.barnesHut;
        this.nodesSolver = new BarnesHutSolver(this.body, this.physicsBody, options);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options);
      }

      this.modelOptions = options;
    }
    /**
     * initialize the engine
     */

  }, {
    key: "initPhysics",
    value: function initPhysics() {
      if (this.physicsEnabled === true && this.options.enabled === true) {
        if (this.options.stabilization.enabled === true) {
          this.stabilize();
        } else {
          this.stabilized = false;
          this.ready = true;
          this.body.emitter.emit('fit', {}, this.layoutFailed); // if the layout failed, we use the approximation for the zoom

          this.startSimulation();
        }
      } else {
        this.ready = true;
        this.body.emitter.emit('fit');
      }
    }
    /**
     * Start the simulation
     */

  }, {
    key: "startSimulation",
    value: function startSimulation() {
      if (this.physicsEnabled === true && this.options.enabled === true) {
        this.stabilized = false; // when visible, adaptivity is disabled.

        this.adaptiveTimestep = false; // this sets the width of all nodes initially which could be required for the avoidOverlap

        this.body.emitter.emit("_resizeNodes");

        if (this.viewFunction === undefined) {
          var _context;

          this.viewFunction = bind$2(_context = this.simulationStep).call(_context, this);
          this.body.emitter.on('initRedraw', this.viewFunction);
          this.body.emitter.emit('_startRendering');
        }
      } else {
        this.body.emitter.emit('_redraw');
      }
    }
    /**
     * Stop the simulation, force stabilization.
     * @param {boolean} [emit=true]
     */

  }, {
    key: "stopSimulation",
    value: function stopSimulation() {
      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.stabilized = true;

      if (emit === true) {
        this._emitStabilized();
      }

      if (this.viewFunction !== undefined) {
        this.body.emitter.off('initRedraw', this.viewFunction);
        this.viewFunction = undefined;

        if (emit === true) {
          this.body.emitter.emit('_stopRendering');
        }
      }
    }
    /**
     * The viewFunction inserts this step into each render loop. It calls the physics tick and handles the cleanup at stabilized.
     *
     */

  }, {
    key: "simulationStep",
    value: function simulationStep() {
      // check if the physics have settled
      var startTime = now$2();

      this.physicsTick();
      var physicsTime = now$2() - startTime; // run double speed if it is a little graph

      if ((physicsTime < 0.4 * this.simulationInterval || this.runDoubleSpeed === true) && this.stabilized === false) {
        this.physicsTick(); // this makes sure there is no jitter. The decision is taken once to run it at double speed.

        this.runDoubleSpeed = true;
      }

      if (this.stabilized === true) {
        this.stopSimulation();
      }
    }
    /**
     * trigger the stabilized event.
     *
     * @param {number} [amountOfIterations=this.stabilizationIterations]
     * @private
     */

  }, {
    key: "_emitStabilized",
    value: function _emitStabilized() {
      var _this2 = this;

      var amountOfIterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.stabilizationIterations;

      if (this.stabilizationIterations > 1 || this.startedStabilization === true) {
        setTimeout$2(function () {
          _this2.body.emitter.emit('stabilized', {
            iterations: amountOfIterations
          });

          _this2.startedStabilization = false;
          _this2.stabilizationIterations = 0;
        }, 0);
      }
    }
    /**
     * Calculate the forces for one physics iteration and move the nodes.
     * @private
     */

  }, {
    key: "physicsStep",
    value: function physicsStep() {
      this.gravitySolver.solve();
      this.nodesSolver.solve();
      this.edgesSolver.solve();
      this.moveNodes();
    }
    /**
     * Make dynamic adjustments to the timestep, based on current state.
     *
     * Helper function for physicsTick().
     * @private
     */

  }, {
    key: "adjustTimeStep",
    value: function adjustTimeStep() {
      var factor = 1.2; // Factor for increasing the timestep on success.
      // we compare the two steps. if it is acceptable we double the step.

      if (this._evaluateStepQuality() === true) {
        this.timestep = factor * this.timestep;
      } else {
        // if not, we decrease the step to a minimum of the options timestep.
        // if the decreased timestep is smaller than the options step, we do not reset the counter
        // we assume that the options timestep is stable enough.
        if (this.timestep / factor < this.options.timestep) {
          this.timestep = this.options.timestep;
        } else {
          // if the timestep was larger than 2 times the option one we check the adaptivity again to ensure
          // that large instabilities do not form.
          this.adaptiveCounter = -1; // check again next iteration

          this.timestep = Math.max(this.options.timestep, this.timestep / factor);
        }
      }
    }
    /**
     * A single simulation step (or 'tick') in the physics simulation
     *
     * @private
     */

  }, {
    key: "physicsTick",
    value: function physicsTick() {
      this._startStabilizing(); // this ensures that there is no start event when the network is already stable.


      if (this.stabilized === true) return; // adaptivity means the timestep adapts to the situation, only applicable for stabilization

      if (this.adaptiveTimestep === true && this.adaptiveTimestepEnabled === true) {
        // timestep remains stable for "interval" iterations.
        var doAdaptive = this.adaptiveCounter % this.adaptiveInterval === 0;

        if (doAdaptive) {
          // first the big step and revert.
          this.timestep = 2 * this.timestep;
          this.physicsStep();
          this.revert(); // saves the reference state
          // now the normal step. Since this is the last step, it is the more stable one and we will take this.

          this.timestep = 0.5 * this.timestep; // since it's half the step, we do it twice.

          this.physicsStep();
          this.physicsStep();
          this.adjustTimeStep();
        } else {
          this.physicsStep(); // normal step, keeping timestep constant
        }

        this.adaptiveCounter += 1;
      } else {
        // case for the static timestep, we reset it to the one in options and take a normal step.
        this.timestep = this.options.timestep;
        this.physicsStep();
      }

      if (this.stabilized === true) this.revert();
      this.stabilizationIterations++;
    }
    /**
     * Nodes and edges can have the physics toggles on or off. A collection of indices is created here so we can skip the check all the time.
     *
     * @private
     */

  }, {
    key: "updatePhysicsData",
    value: function updatePhysicsData() {
      this.physicsBody.forces = {};
      this.physicsBody.physicsNodeIndices = [];
      this.physicsBody.physicsEdgeIndices = [];
      var nodes = this.body.nodes;
      var edges = this.body.edges; // get node indices for physics

      for (var nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          if (nodes[nodeId].options.physics === true) {
            this.physicsBody.physicsNodeIndices.push(nodes[nodeId].id);
          }
        }
      } // get edge indices for physics


      for (var edgeId in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, edgeId)) {
          if (edges[edgeId].options.physics === true) {
            this.physicsBody.physicsEdgeIndices.push(edges[edgeId].id);
          }
        }
      } // get the velocity and the forces vector


      for (var i = 0; i < this.physicsBody.physicsNodeIndices.length; i++) {
        var _nodeId = this.physicsBody.physicsNodeIndices[i];
        this.physicsBody.forces[_nodeId] = {
          x: 0,
          y: 0
        }; // forces can be reset because they are recalculated. Velocities have to persist.

        if (this.physicsBody.velocities[_nodeId] === undefined) {
          this.physicsBody.velocities[_nodeId] = {
            x: 0,
            y: 0
          };
        }
      } // clean deleted nodes from the velocity vector


      for (var _nodeId2 in this.physicsBody.velocities) {
        if (nodes[_nodeId2] === undefined) {
          delete this.physicsBody.velocities[_nodeId2];
        }
      }
    }
    /**
     * Revert the simulation one step. This is done so after stabilization, every new start of the simulation will also say stabilized.
     */

  }, {
    key: "revert",
    value: function revert() {
      var nodeIds = keys$3(this.previousStates);

      var nodes = this.body.nodes;
      var velocities = this.physicsBody.velocities;
      this.referenceState = {};

      for (var i = 0; i < nodeIds.length; i++) {
        var nodeId = nodeIds[i];

        if (nodes[nodeId] !== undefined) {
          if (nodes[nodeId].options.physics === true) {
            this.referenceState[nodeId] = {
              positions: {
                x: nodes[nodeId].x,
                y: nodes[nodeId].y
              }
            };
            velocities[nodeId].x = this.previousStates[nodeId].vx;
            velocities[nodeId].y = this.previousStates[nodeId].vy;
            nodes[nodeId].x = this.previousStates[nodeId].x;
            nodes[nodeId].y = this.previousStates[nodeId].y;
          }
        } else {
          delete this.previousStates[nodeId];
        }
      }
    }
    /**
     * This compares the reference state to the current state
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_evaluateStepQuality",
    value: function _evaluateStepQuality() {
      var dx, dy, dpos;
      var nodes = this.body.nodes;
      var reference = this.referenceState;
      var posThreshold = 0.3;

      for (var nodeId in this.referenceState) {
        if (Object.prototype.hasOwnProperty.call(this.referenceState, nodeId) && nodes[nodeId] !== undefined) {
          dx = nodes[nodeId].x - reference[nodeId].positions.x;
          dy = nodes[nodeId].y - reference[nodeId].positions.y;
          dpos = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

          if (dpos > posThreshold) {
            return false;
          }
        }
      }

      return true;
    }
    /**
     * move the nodes one timestep and check if they are stabilized
     */

  }, {
    key: "moveNodes",
    value: function moveNodes() {
      var nodeIndices = this.physicsBody.physicsNodeIndices;
      var maxNodeVelocity = 0;
      var averageNodeVelocity = 0; // the velocity threshold (energy in the system) for the adaptivity toggle

      var velocityAdaptiveThreshold = 5;

      for (var i = 0; i < nodeIndices.length; i++) {
        var nodeId = nodeIndices[i];

        var nodeVelocity = this._performStep(nodeId); // stabilized is true if stabilized is true and velocity is smaller than vmin --> all nodes must be stabilized


        maxNodeVelocity = Math.max(maxNodeVelocity, nodeVelocity);
        averageNodeVelocity += nodeVelocity;
      } // evaluating the stabilized and adaptiveTimestepEnabled conditions


      this.adaptiveTimestepEnabled = averageNodeVelocity / nodeIndices.length < velocityAdaptiveThreshold;
      this.stabilized = maxNodeVelocity < this.options.minVelocity;
    }
    /**
     * Calculate new velocity for a coordinate direction
     *
     * @param {number} v  velocity for current coordinate
     * @param {number} f  regular force for current coordinate
     * @param {number} m  mass of current node
     * @returns {number} new velocity for current coordinate
     * @private
     */

  }, {
    key: "calculateComponentVelocity",
    value: function calculateComponentVelocity(v, f, m) {
      var df = this.modelOptions.damping * v; // damping force

      var a = (f - df) / m; // acceleration

      v += a * this.timestep; // Put a limit on the velocities if it is really high

      var maxV = this.options.maxVelocity || 1e9;

      if (Math.abs(v) > maxV) {
        v = v > 0 ? maxV : -maxV;
      }

      return v;
    }
    /**
     * Perform the actual step
     *
     * @param {Node.id} nodeId
     * @returns {number} the new velocity of given node
     * @private
     */

  }, {
    key: "_performStep",
    value: function _performStep(nodeId) {
      var node = this.body.nodes[nodeId];
      var force = this.physicsBody.forces[nodeId];

      if (this.options.wind) {
        force.x += this.options.wind.x;
        force.y += this.options.wind.y;
      }

      var velocity = this.physicsBody.velocities[nodeId]; // store the state so we can revert

      this.previousStates[nodeId] = {
        x: node.x,
        y: node.y,
        vx: velocity.x,
        vy: velocity.y
      };

      if (node.options.fixed.x === false) {
        velocity.x = this.calculateComponentVelocity(velocity.x, force.x, node.options.mass);
        node.x += velocity.x * this.timestep;
      } else {
        force.x = 0;
        velocity.x = 0;
      }

      if (node.options.fixed.y === false) {
        velocity.y = this.calculateComponentVelocity(velocity.y, force.y, node.options.mass);
        node.y += velocity.y * this.timestep;
      } else {
        force.y = 0;
        velocity.y = 0;
      }

      var totalVelocity = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
      return totalVelocity;
    }
    /**
     * When initializing and stabilizing, we can freeze nodes with a predefined position.
     * This greatly speeds up stabilization because only the supportnodes for the smoothCurves have to settle.
     *
     * @private
     */

  }, {
    key: "_freezeNodes",
    value: function _freezeNodes() {
      var nodes = this.body.nodes;

      for (var id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          if (nodes[id].x && nodes[id].y) {
            var fixed = nodes[id].options.fixed;
            this.freezeCache[id] = {
              x: fixed.x,
              y: fixed.y
            };
            fixed.x = true;
            fixed.y = true;
          }
        }
      }
    }
    /**
     * Unfreezes the nodes that have been frozen by _freezeDefinedNodes.
     *
     * @private
     */

  }, {
    key: "_restoreFrozenNodes",
    value: function _restoreFrozenNodes() {
      var nodes = this.body.nodes;

      for (var id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          if (this.freezeCache[id] !== undefined) {
            nodes[id].options.fixed.x = this.freezeCache[id].x;
            nodes[id].options.fixed.y = this.freezeCache[id].y;
          }
        }
      }

      this.freezeCache = {};
    }
    /**
     * Find a stable position for all nodes
     *
     * @param {number} [iterations=this.options.stabilization.iterations]
     */

  }, {
    key: "stabilize",
    value: function stabilize() {
      var _this3 = this;

      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.stabilization.iterations;

      if (typeof iterations !== 'number') {
        iterations = this.options.stabilization.iterations;
        console.log('The stabilize method needs a numeric amount of iterations. Switching to default: ', iterations);
      }

      if (this.physicsBody.physicsNodeIndices.length === 0) {
        this.ready = true;
        return;
      } // enable adaptive timesteps


      this.adaptiveTimestep =  this.options.adaptiveTimestep; // this sets the width of all nodes initially which could be required for the avoidOverlap

      this.body.emitter.emit("_resizeNodes");
      this.stopSimulation(); // stop the render loop

      this.stabilized = false; // block redraw requests

      this.body.emitter.emit('_blockRedraw');
      this.targetIterations = iterations; // start the stabilization

      if (this.options.stabilization.onlyDynamicEdges === true) {
        this._freezeNodes();
      }

      this.stabilizationIterations = 0;

      setTimeout$2(function () {
        return _this3._stabilizationBatch();
      }, 0);
    }
    /**
     * If not already stabilizing, start it and emit a start event.
     *
     * @returns {boolean} true if stabilization started with this call
     * @private
     */

  }, {
    key: "_startStabilizing",
    value: function _startStabilizing() {
      if (this.startedStabilization === true) return false;
      this.body.emitter.emit('startStabilizing');
      this.startedStabilization = true;
      return true;
    }
    /**
     * One batch of stabilization
     * @private
     */

  }, {
    key: "_stabilizationBatch",
    value: function _stabilizationBatch() {
      var _this4 = this;

      var running = function running() {
        return _this4.stabilized === false && _this4.stabilizationIterations < _this4.targetIterations;
      };

      var sendProgress = function sendProgress() {
        _this4.body.emitter.emit('stabilizationProgress', {
          iterations: _this4.stabilizationIterations,
          total: _this4.targetIterations
        });
      };

      if (this._startStabilizing()) {
        sendProgress(); // Ensure that there is at least one start event.
      }

      var count = 0;

      while (running() && count < this.options.stabilization.updateInterval) {
        this.physicsTick();
        count++;
      }

      sendProgress();

      if (running()) {
        var _context2;

        setTimeout$2(bind$2(_context2 = this._stabilizationBatch).call(_context2, this), 0);
      } else {
        this._finalizeStabilization();
      }
    }
    /**
     * Wrap up the stabilization, fit and emit the events.
     * @private
     */

  }, {
    key: "_finalizeStabilization",
    value: function _finalizeStabilization() {
      this.body.emitter.emit('_allowRedraw');

      if (this.options.stabilization.fit === true) {
        this.body.emitter.emit('fit');
      }

      if (this.options.stabilization.onlyDynamicEdges === true) {
        this._restoreFrozenNodes();
      }

      this.body.emitter.emit('stabilizationIterationsDone');
      this.body.emitter.emit('_requestRedraw');

      if (this.stabilized === true) {
        this._emitStabilized();
      } else {
        this.startSimulation();
      }

      this.ready = true;
    } //---------------------------  DEBUGGING BELOW  ---------------------------//

    /**
     * Debug function that display arrows for the forces currently active in the network.
     *
     * Use this when debugging only.
     *
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */

  }, {
    key: "_drawForces",
    value: function _drawForces(ctx) {
      for (var i = 0; i < this.physicsBody.physicsNodeIndices.length; i++) {
        var index = this.physicsBody.physicsNodeIndices[i];
        var node = this.body.nodes[index];
        var force = this.physicsBody.forces[index];
        var factor = 20;
        var colorFactor = 0.03;
        var forceSize = Math.sqrt(Math.pow(force.x, 2) + Math.pow(force.x, 2));
        var size = Math.min(Math.max(5, forceSize), 15);
        var arrowSize = 3 * size;
        var color = HSVToHex((180 - Math.min(1, Math.max(0, colorFactor * forceSize)) * 180) / 360, 1, 1);
        var point = {
          x: node.x + factor * force.x,
          y: node.y + factor * force.y
        };
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        var angle = Math.atan2(force.y, force.x);
        ctx.fillStyle = color;
        EndPoints.draw(ctx, {
          type: 'arrow',
          point: point,
          angle: angle,
          length: arrowSize
        });

        fill$2(ctx).call(ctx);
      }
    }
  }]);

  return PhysicsEngine;
}();

var nativeReverse = [].reverse;
var test$1 = [1, 2]; // `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794

_export({
  target: 'Array',
  proto: true,
  forced: String(test$1) === String(test$1.reverse())
}, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

var reverse = entryVirtual('Array').reverse;

var ArrayPrototype$c = Array.prototype;

var reverse_1 = function (it) {
  var own = it.reverse;
  return it === ArrayPrototype$c || it instanceof Array && own === ArrayPrototype$c.reverse ? reverse : own;
};

var reverse$1 = reverse_1;

var reverse$2 = reverse$1;

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify$3(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify$3(rnds);
}

/**
 * Utility Class
 */

var NetworkUtil = /*#__PURE__*/function () {
  /**
   * @ignore
   */
  function NetworkUtil() {
    classCallCheck(this, NetworkUtil);
  }
  /**
   * Find the center position of the network considering the bounding boxes
   *
   * @param {Array.<Node>} allNodes
   * @param {Array.<Node>} [specificNodes=[]]
   * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
   * @static
   */


  createClass(NetworkUtil, null, [{
    key: "getRange",
    value: function getRange(allNodes) {
      var specificNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var minY = 1e9,
          maxY = -1e9,
          minX = 1e9,
          maxX = -1e9,
          node;

      if (specificNodes.length > 0) {
        for (var i = 0; i < specificNodes.length; i++) {
          node = allNodes[specificNodes[i]];

          if (minX > node.shape.boundingBox.left) {
            minX = node.shape.boundingBox.left;
          }

          if (maxX < node.shape.boundingBox.right) {
            maxX = node.shape.boundingBox.right;
          }

          if (minY > node.shape.boundingBox.top) {
            minY = node.shape.boundingBox.top;
          } // top is negative, bottom is positive


          if (maxY < node.shape.boundingBox.bottom) {
            maxY = node.shape.boundingBox.bottom;
          } // top is negative, bottom is positive

        }
      }

      if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
        minY = 0, maxY = 0, minX = 0, maxX = 0;
      }

      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      };
    }
    /**
     * Find the center position of the network
     *
     * @param {Array.<Node>} allNodes
     * @param {Array.<Node>} [specificNodes=[]]
     * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
     * @static
     */

  }, {
    key: "getRangeCore",
    value: function getRangeCore(allNodes) {
      var specificNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var minY = 1e9,
          maxY = -1e9,
          minX = 1e9,
          maxX = -1e9,
          node;

      if (specificNodes.length > 0) {
        for (var i = 0; i < specificNodes.length; i++) {
          node = allNodes[specificNodes[i]];

          if (minX > node.x) {
            minX = node.x;
          }

          if (maxX < node.x) {
            maxX = node.x;
          }

          if (minY > node.y) {
            minY = node.y;
          } // top is negative, bottom is positive


          if (maxY < node.y) {
            maxY = node.y;
          } // top is negative, bottom is positive

        }
      }

      if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
        minY = 0, maxY = 0, minX = 0, maxX = 0;
      }

      return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      };
    }
    /**
     * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
     * @returns {{x: number, y: number}}
     * @static
     */

  }, {
    key: "findCenter",
    value: function findCenter(range) {
      return {
        x: 0.5 * (range.maxX + range.minX),
        y: 0.5 * (range.maxY + range.minY)
      };
    }
    /**
     * This returns a clone of the options or options of the edge or node to be used for construction of new edges or check functions for new nodes.
     * @param {vis.Item} item
     * @param {'node'|undefined} type
     * @returns {{}}
     * @static
     */

  }, {
    key: "cloneOptions",
    value: function cloneOptions(item, type) {
      var clonedOptions = {};

      if (type === undefined || type === 'node') {
        deepExtend(clonedOptions, item.options, true);
        clonedOptions.x = item.x;
        clonedOptions.y = item.y;
        clonedOptions.amountOfConnections = item.edges.length;
      } else {
        deepExtend(clonedOptions, item.options, true);
      }

      return clonedOptions;
    }
  }]);

  return NetworkUtil;
}();

function _createSuper$r(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$r(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$r() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A Cluster is a special Node that allows a group of Nodes positioned closely together
 * to be represented by a single Cluster Node.
 *
 * @extends Node
 */

var Cluster = /*#__PURE__*/function (_Node) {
  inherits(Cluster, _Node);

  var _super = _createSuper$r(Cluster);

  /**
   * @param {Object} options
   * @param {Object} body
   * @param {Array.<HTMLImageElement>}imagelist
   * @param {Array} grouplist
   * @param {Object} globalOptions
   * @param {Object} defaultOptions     Global default options for nodes
   */
  function Cluster(options, body, imagelist, grouplist, globalOptions, defaultOptions) {
    var _this;

    classCallCheck(this, Cluster);

    _this = _super.call(this, options, body, imagelist, grouplist, globalOptions, defaultOptions);
    _this.isCluster = true;
    _this.containedNodes = {};
    _this.containedEdges = {};
    return _this;
  }
  /**
   * Transfer child cluster data to current and disconnect the child cluster.
   *
   * Please consult the header comment in 'Clustering.js' for the fields set here.
   *
   * @param {string|number} childClusterId  id of child cluster to open
   */


  createClass(Cluster, [{
    key: "_openChildCluster",
    value: function _openChildCluster(childClusterId) {
      var _this2 = this;

      var childCluster = this.body.nodes[childClusterId];

      if (this.containedNodes[childClusterId] === undefined) {
        throw new Error('node with id: ' + childClusterId + ' not in current cluster');
      }

      if (!childCluster.isCluster) {
        throw new Error('node with id: ' + childClusterId + ' is not a cluster');
      } // Disconnect child cluster from current cluster


      delete this.containedNodes[childClusterId];
      forEach$3(childCluster.edges, function (edge) {
        delete _this2.containedEdges[edge.id];
      }); // Transfer nodes and edges

      forEach$3(childCluster.containedNodes, function (node, nodeId) {
        _this2.containedNodes[nodeId] = node;
      });
      childCluster.containedNodes = {};
      forEach$3(childCluster.containedEdges, function (edge, edgeId) {
        _this2.containedEdges[edgeId] = edge;
      });
      childCluster.containedEdges = {}; // Transfer edges within cluster edges which are clustered

      forEach$3(childCluster.edges, function (clusterEdge) {
        forEach$3(_this2.edges, function (parentClusterEdge) {
          var _context, _context2;

          // Assumption: a clustered edge can only be present in a single clustering edge
          // Not tested here
          var index = indexOf$3(_context = parentClusterEdge.clusteringEdgeReplacingIds).call(_context, clusterEdge.id);

          if (index === -1) return;
          forEach$3(clusterEdge.clusteringEdgeReplacingIds, function (srcId) {
            parentClusterEdge.clusteringEdgeReplacingIds.push(srcId); // Maintain correct bookkeeping for transferred edge

            _this2.body.edges[srcId].edgeReplacedById = parentClusterEdge.id;
          }); // Remove cluster edge from parent cluster edge

          splice$2(_context2 = parentClusterEdge.clusteringEdgeReplacingIds).call(_context2, index, 1);
        });
      });
      childCluster.edges = [];
    }
  }]);

  return Cluster;
}(Node);

/**
 * The clustering engine
 */

var ClusterEngine = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   */
  function ClusterEngine(body) {
    var _this = this;

    classCallCheck(this, ClusterEngine);

    this.body = body;
    this.clusteredNodes = {}; // key: node id, value: { clusterId: <id of cluster>, node: <node instance>}

    this.clusteredEdges = {}; // key: edge id, value: restore information for given edge

    this.options = {};
    this.defaultOptions = {};

    assign$2(this.options, this.defaultOptions);

    this.body.emitter.on('_resetData', function () {
      _this.clusteredNodes = {};
      _this.clusteredEdges = {};
    });
  }
  /**
  *
  * @param {number} hubsize
  * @param {Object} options
  */


  createClass(ClusterEngine, [{
    key: "clusterByHubsize",
    value: function clusterByHubsize(hubsize, options) {
      if (hubsize === undefined) {
        hubsize = this._getHubSize();
      } else if (_typeof_1(hubsize) === "object") {
        options = this._checkOptions(hubsize);
        hubsize = this._getHubSize();
      }

      var nodesToCluster = [];

      for (var i = 0; i < this.body.nodeIndices.length; i++) {
        var node = this.body.nodes[this.body.nodeIndices[i]];

        if (node.edges.length >= hubsize) {
          nodesToCluster.push(node.id);
        }
      }

      for (var _i = 0; _i < nodesToCluster.length; _i++) {
        this.clusterByConnection(nodesToCluster[_i], options, true);
      }

      this.body.emitter.emit('_dataChanged');
    }
    /**
     * loop over all nodes, check if they adhere to the condition and cluster if needed.
     * @param {Object} options
     * @param {boolean} [refreshData=true]
     */

  }, {
    key: "cluster",
    value: function cluster() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var refreshData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (options.joinCondition === undefined) {
        throw new Error("Cannot call clusterByNodeData without a joinCondition function in the options.");
      } // check if the options object is fine, append if needed


      options = this._checkOptions(options);
      var childNodesObj = {};
      var childEdgesObj = {}; // collect the nodes that will be in the cluster

      forEach$3(this.body.nodes, function (node, nodeId) {
        if (node.options && options.joinCondition(node.options) === true) {
          childNodesObj[nodeId] = node; // collect the edges that will be in the cluster

          forEach$3(node.edges, function (edge) {
            if (_this2.clusteredEdges[edge.id] === undefined) {
              childEdgesObj[edge.id] = edge;
            }
          });
        }
      });

      this._cluster(childNodesObj, childEdgesObj, options, refreshData);
    }
    /**
     * Cluster all nodes in the network that have only X edges
     * @param {number} edgeCount
     * @param {Object} options
     * @param {boolean} [refreshData=true]
     */

  }, {
    key: "clusterByEdgeCount",
    value: function clusterByEdgeCount(edgeCount, options) {
      var _this3 = this;

      var refreshData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      options = this._checkOptions(options);
      var clusters = [];
      var usedNodes = {};
      var edge, edges, relevantEdgeCount; // collect the nodes that will be in the cluster

      var _loop = function _loop(i) {
        var childNodesObj = {};
        var childEdgesObj = {};
        var nodeId = _this3.body.nodeIndices[i];
        var node = _this3.body.nodes[nodeId]; // if this node is already used in another cluster this session, we do not have to re-evaluate it.

        if (usedNodes[nodeId] === undefined) {
          relevantEdgeCount = 0;
          edges = [];

          for (var j = 0; j < node.edges.length; j++) {
            edge = node.edges[j];

            if (_this3.clusteredEdges[edge.id] === undefined) {
              if (edge.toId !== edge.fromId) {
                relevantEdgeCount++;
              }

              edges.push(edge);
            }
          } // this node qualifies, we collect its neighbours to start the clustering process.


          if (relevantEdgeCount === edgeCount) {
            var checkJoinCondition = function checkJoinCondition(node) {
              if (options.joinCondition === undefined || options.joinCondition === null) {
                return true;
              }

              var clonedOptions = NetworkUtil.cloneOptions(node);
              return options.joinCondition(clonedOptions);
            };

            var gatheringSuccessful = true;

            for (var _j = 0; _j < edges.length; _j++) {
              edge = edges[_j];

              var childNodeId = _this3._getConnectedId(edge, nodeId); // add the nodes to the list by the join condition.


              if (checkJoinCondition(node)) {
                childEdgesObj[edge.id] = edge;
                childNodesObj[nodeId] = node;
                childNodesObj[childNodeId] = _this3.body.nodes[childNodeId];
                usedNodes[nodeId] = true;
              } else {
                // this node does not qualify after all.
                gatheringSuccessful = false;
                break;
              }
            } // add to the cluster queue


            if (keys$3(childNodesObj).length > 0 && keys$3(childEdgesObj).length > 0 && gatheringSuccessful === true) {
              /**
               * Search for cluster data that contains any of the node id's
               * @returns {Boolean} true if no joinCondition, otherwise return value of joinCondition
               */
              var findClusterData = function findClusterData() {
                for (var n = 0; n < clusters.length; ++n) {
                  // Search for a cluster containing any of the node id's
                  for (var m in childNodesObj) {
                    if (clusters[n].nodes[m] !== undefined) {
                      return clusters[n];
                    }
                  }
                }

                return undefined;
              }; // If any of the found nodes is part of a cluster found in this method,
              // add the current values to that cluster


              var foundCluster = findClusterData();

              if (foundCluster !== undefined) {
                // Add nodes to found cluster if not present
                for (var m in childNodesObj) {
                  if (foundCluster.nodes[m] === undefined) {
                    foundCluster.nodes[m] = childNodesObj[m];
                  }
                } // Add edges to found cluster, if not present


                for (var _m in childEdgesObj) {
                  if (foundCluster.edges[_m] === undefined) {
                    foundCluster.edges[_m] = childEdgesObj[_m];
                  }
                }
              } else {
                // Create a new cluster group
                clusters.push({
                  nodes: childNodesObj,
                  edges: childEdgesObj
                });
              }
            }
          }
        }
      };

      for (var i = 0; i < this.body.nodeIndices.length; i++) {
        _loop(i);
      }

      for (var _i2 = 0; _i2 < clusters.length; _i2++) {
        this._cluster(clusters[_i2].nodes, clusters[_i2].edges, options, false);
      }

      if (refreshData === true) {
        this.body.emitter.emit('_dataChanged');
      }
    }
    /**
     * Cluster all nodes in the network that have only 1 edge
     * @param {Object} options
     * @param {boolean} [refreshData=true]
     */

  }, {
    key: "clusterOutliers",
    value: function clusterOutliers(options) {
      var refreshData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.clusterByEdgeCount(1, options, refreshData);
    }
    /**
     * Cluster all nodes in the network that have only 2 edge
     * @param {Object} options
     * @param {boolean} [refreshData=true]
     */

  }, {
    key: "clusterBridges",
    value: function clusterBridges(options) {
      var refreshData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.clusterByEdgeCount(2, options, refreshData);
    }
    /**
    * suck all connected nodes of a node into the node.
    * @param {Node.id} nodeId
    * @param {Object} options
    * @param {boolean} [refreshData=true]
    */

  }, {
    key: "clusterByConnection",
    value: function clusterByConnection(nodeId, options) {
      var _context;

      var refreshData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // kill conditions
      if (nodeId === undefined) {
        throw new Error("No nodeId supplied to clusterByConnection!");
      }

      if (this.body.nodes[nodeId] === undefined) {
        throw new Error("The nodeId given to clusterByConnection does not exist!");
      }

      var node = this.body.nodes[nodeId];
      options = this._checkOptions(options, node);

      if (options.clusterNodeProperties.x === undefined) {
        options.clusterNodeProperties.x = node.x;
      }

      if (options.clusterNodeProperties.y === undefined) {
        options.clusterNodeProperties.y = node.y;
      }

      if (options.clusterNodeProperties.fixed === undefined) {
        options.clusterNodeProperties.fixed = {};
        options.clusterNodeProperties.fixed.x = node.options.fixed.x;
        options.clusterNodeProperties.fixed.y = node.options.fixed.y;
      }

      var childNodesObj = {};
      var childEdgesObj = {};
      var parentNodeId = node.id;
      var parentClonedOptions = NetworkUtil.cloneOptions(node);
      childNodesObj[parentNodeId] = node; // collect the nodes that will be in the cluster

      for (var i = 0; i < node.edges.length; i++) {
        var edge = node.edges[i];

        if (this.clusteredEdges[edge.id] === undefined) {
          var childNodeId = this._getConnectedId(edge, parentNodeId); // if the child node is not in a cluster


          if (this.clusteredNodes[childNodeId] === undefined) {
            if (childNodeId !== parentNodeId) {
              if (options.joinCondition === undefined) {
                childEdgesObj[edge.id] = edge;
                childNodesObj[childNodeId] = this.body.nodes[childNodeId];
              } else {
                // clone the options and insert some additional parameters that could be interesting.
                var childClonedOptions = NetworkUtil.cloneOptions(this.body.nodes[childNodeId]);

                if (options.joinCondition(parentClonedOptions, childClonedOptions) === true) {
                  childEdgesObj[edge.id] = edge;
                  childNodesObj[childNodeId] = this.body.nodes[childNodeId];
                }
              }
            } else {
              // swallow the edge if it is self-referencing.
              childEdgesObj[edge.id] = edge;
            }
          }
        }
      }

      var childNodeIDs = map$2(_context = keys$3(childNodesObj)).call(_context, function (childNode) {
        return childNodesObj[childNode].id;
      });

      for (var childNodeKey in childNodesObj) {
        if (!Object.prototype.hasOwnProperty.call(childNodesObj, childNodeKey)) continue;
        var childNode = childNodesObj[childNodeKey];

        for (var y = 0; y < childNode.edges.length; y++) {
          var childEdge = childNode.edges[y];

          if (indexOf$3(childNodeIDs).call(childNodeIDs, this._getConnectedId(childEdge, childNode.id)) > -1) {
            childEdgesObj[childEdge.id] = childEdge;
          }
        }
      }

      this._cluster(childNodesObj, childEdgesObj, options, refreshData);
    }
    /**
    * This function creates the edges that will be attached to the cluster
    * It looks for edges that are connected to the nodes from the "outside' of the cluster.
    *
    * @param {{Node.id: vis.Node}} childNodesObj
    * @param {{vis.Edge.id: vis.Edge}} childEdgesObj
    * @param {Object} clusterNodeProperties
    * @param {Object} clusterEdgeProperties
    * @private
    */

  }, {
    key: "_createClusterEdges",
    value: function _createClusterEdges(childNodesObj, childEdgesObj, clusterNodeProperties, clusterEdgeProperties) {
      var edge, childNodeId, childNode, toId, fromId, otherNodeId; // loop over all child nodes and their edges to find edges going out of the cluster
      // these edges will be replaced by clusterEdges.

      var childKeys = keys$3(childNodesObj);

      var createEdges = [];

      for (var i = 0; i < childKeys.length; i++) {
        childNodeId = childKeys[i];
        childNode = childNodesObj[childNodeId]; // construct new edges from the cluster to others

        for (var j = 0; j < childNode.edges.length; j++) {
          edge = childNode.edges[j]; // we only handle edges that are visible to the system, not the disabled ones from the clustering process.

          if (this.clusteredEdges[edge.id] === undefined) {
            // self-referencing edges will be added to the "hidden" list
            if (edge.toId == edge.fromId) {
              childEdgesObj[edge.id] = edge;
            } else {
              // set up the from and to.
              if (edge.toId == childNodeId) {
                // this is a double equals because ints and strings can be interchanged here.
                toId = clusterNodeProperties.id;
                fromId = edge.fromId;
                otherNodeId = fromId;
              } else {
                toId = edge.toId;
                fromId = clusterNodeProperties.id;
                otherNodeId = toId;
              }
            } // Only edges from the cluster outwards are being replaced.


            if (childNodesObj[otherNodeId] === undefined) {
              createEdges.push({
                edge: edge,
                fromId: fromId,
                toId: toId
              });
            }
          }
        }
      } //
      // Here we actually create the replacement edges.
      //
      // We could not do this in the loop above as the creation process
      // would add an edge to the edges array we are iterating over.
      //
      // NOTE: a clustered edge can have multiple base edges!
      //


      var newEdges = [];
      /**
       * Find a cluster edge which matches the given created edge.
       * @param {vis.Edge} createdEdge
       * @returns {vis.Edge}
       */

      var getNewEdge = function getNewEdge(createdEdge) {
        for (var _j2 = 0; _j2 < newEdges.length; _j2++) {
          var newEdge = newEdges[_j2]; // We replace both to and from edges with a single cluster edge

          var matchToDirection = createdEdge.fromId === newEdge.fromId && createdEdge.toId === newEdge.toId;
          var matchFromDirection = createdEdge.fromId === newEdge.toId && createdEdge.toId === newEdge.fromId;

          if (matchToDirection || matchFromDirection) {
            return newEdge;
          }
        }

        return null;
      };

      for (var _j3 = 0; _j3 < createEdges.length; _j3++) {
        var createdEdge = createEdges[_j3];
        var _edge = createdEdge.edge;
        var newEdge = getNewEdge(createdEdge);

        if (newEdge === null) {
          // Create a clustered edge for this connection
          newEdge = this._createClusteredEdge(createdEdge.fromId, createdEdge.toId, _edge, clusterEdgeProperties);
          newEdges.push(newEdge);
        } else {
          newEdge.clusteringEdgeReplacingIds.push(_edge.id);
        } // also reference the new edge in the old edge


        this.body.edges[_edge.id].edgeReplacedById = newEdge.id; // hide the replaced edge

        this._backupEdgeOptions(_edge);

        _edge.setOptions({
          physics: false
        });
      }
    }
    /**
    * This function checks the options that can be supplied to the different cluster functions
    * for certain fields and inserts defaults if needed
    * @param {Object} options
    * @returns {*}
    * @private
    */

  }, {
    key: "_checkOptions",
    value: function _checkOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (options.clusterEdgeProperties === undefined) {
        options.clusterEdgeProperties = {};
      }

      if (options.clusterNodeProperties === undefined) {
        options.clusterNodeProperties = {};
      }

      return options;
    }
    /**
    *
    * @param {Object}    childNodesObj         | object with node objects, id as keys, same as childNodes except it also contains a source node
    * @param {Object}    childEdgesObj         | object with edge objects, id as keys
    * @param {Array}     options               | object with {clusterNodeProperties, clusterEdgeProperties, processProperties}
    * @param {boolean}   refreshData | when true, do not wrap up
    * @private
    */

  }, {
    key: "_cluster",
    value: function _cluster(childNodesObj, childEdgesObj, options) {
      var refreshData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      // Remove nodes which are already clustered
      var tmpNodesToRemove = [];

      for (var nodeId in childNodesObj) {
        if (Object.prototype.hasOwnProperty.call(childNodesObj, nodeId)) {
          if (this.clusteredNodes[nodeId] !== undefined) {
            tmpNodesToRemove.push(nodeId);
          }
        }
      }

      for (var n = 0; n < tmpNodesToRemove.length; ++n) {
        delete childNodesObj[tmpNodesToRemove[n]];
      } // kill condition: no nodes don't bother


      if (keys$3(childNodesObj).length == 0) {
        return;
      } // allow clusters of 1 if options allow


      if (keys$3(childNodesObj).length == 1 && options.clusterNodeProperties.allowSingleNodeCluster != true) {
        return;
      }

      var clusterNodeProperties = deepExtend({}, options.clusterNodeProperties); // construct the clusterNodeProperties

      if (options.processProperties !== undefined) {
        // get the childNode options
        var childNodesOptions = [];

        for (var _nodeId in childNodesObj) {
          if (Object.prototype.hasOwnProperty.call(childNodesObj, _nodeId)) {
            var clonedOptions = NetworkUtil.cloneOptions(childNodesObj[_nodeId]);
            childNodesOptions.push(clonedOptions);
          }
        } // get cluster properties based on childNodes


        var childEdgesOptions = [];

        for (var edgeId in childEdgesObj) {
          if (Object.prototype.hasOwnProperty.call(childEdgesObj, edgeId)) {
            // these cluster edges will be removed on creation of the cluster.
            if (edgeId.substr(0, 12) !== "clusterEdge:") {
              var _clonedOptions = NetworkUtil.cloneOptions(childEdgesObj[edgeId], 'edge');

              childEdgesOptions.push(_clonedOptions);
            }
          }
        }

        clusterNodeProperties = options.processProperties(clusterNodeProperties, childNodesOptions, childEdgesOptions);

        if (!clusterNodeProperties) {
          throw new Error("The processProperties function does not return properties!");
        }
      } // check if we have an unique id;


      if (clusterNodeProperties.id === undefined) {
        clusterNodeProperties.id = 'cluster:' + v4();
      }

      var clusterId = clusterNodeProperties.id;

      if (clusterNodeProperties.label === undefined) {
        clusterNodeProperties.label = 'cluster';
      } // give the clusterNode a position if it does not have one.


      var pos = undefined;

      if (clusterNodeProperties.x === undefined) {
        pos = this._getClusterPosition(childNodesObj);
        clusterNodeProperties.x = pos.x;
      }

      if (clusterNodeProperties.y === undefined) {
        if (pos === undefined) {
          pos = this._getClusterPosition(childNodesObj);
        }

        clusterNodeProperties.y = pos.y;
      } // force the ID to remain the same


      clusterNodeProperties.id = clusterId; // create the cluster Node
      // Note that allowSingleNodeCluster, if present, is stored in the options as well

      var clusterNode = this.body.functions.createNode(clusterNodeProperties, Cluster);
      clusterNode.containedNodes = childNodesObj;
      clusterNode.containedEdges = childEdgesObj; // cache a copy from the cluster edge properties if we have to reconnect others later on

      clusterNode.clusterEdgeProperties = options.clusterEdgeProperties; // finally put the cluster node into global

      this.body.nodes[clusterNodeProperties.id] = clusterNode;

      this._clusterEdges(childNodesObj, childEdgesObj, clusterNodeProperties, options.clusterEdgeProperties); // set ID to undefined so no duplicates arise


      clusterNodeProperties.id = undefined; // wrap up

      if (refreshData === true) {
        this.body.emitter.emit('_dataChanged');
      }
    }
    /**
     *
     * @param {Edge} edge
     * @private
     */

  }, {
    key: "_backupEdgeOptions",
    value: function _backupEdgeOptions(edge) {
      if (this.clusteredEdges[edge.id] === undefined) {
        this.clusteredEdges[edge.id] = {
          physics: edge.options.physics
        };
      }
    }
    /**
     *
     * @param {Edge} edge
     * @private
     */

  }, {
    key: "_restoreEdge",
    value: function _restoreEdge(edge) {
      var originalOptions = this.clusteredEdges[edge.id];

      if (originalOptions !== undefined) {
        edge.setOptions({
          physics: originalOptions.physics
        });
        delete this.clusteredEdges[edge.id];
      }
    }
    /**
    * Check if a node is a cluster.
    * @param {Node.id} nodeId
    * @returns {*}
    */

  }, {
    key: "isCluster",
    value: function isCluster(nodeId) {
      if (this.body.nodes[nodeId] !== undefined) {
        return this.body.nodes[nodeId].isCluster === true;
      } else {
        console.log("Node does not exist.");
        return false;
      }
    }
    /**
    * get the position of the cluster node based on what's inside
    * @param {object} childNodesObj    | object with node objects, id as keys
    * @returns {{x: number, y: number}}
    * @private
    */

  }, {
    key: "_getClusterPosition",
    value: function _getClusterPosition(childNodesObj) {
      var childKeys = keys$3(childNodesObj);

      var minX = childNodesObj[childKeys[0]].x;
      var maxX = childNodesObj[childKeys[0]].x;
      var minY = childNodesObj[childKeys[0]].y;
      var maxY = childNodesObj[childKeys[0]].y;
      var node;

      for (var i = 1; i < childKeys.length; i++) {
        node = childNodesObj[childKeys[i]];
        minX = node.x < minX ? node.x : minX;
        maxX = node.x > maxX ? node.x : maxX;
        minY = node.y < minY ? node.y : minY;
        maxY = node.y > maxY ? node.y : maxY;
      }

      return {
        x: 0.5 * (minX + maxX),
        y: 0.5 * (minY + maxY)
      };
    }
    /**
     * Open a cluster by calling this function.
     * @param {vis.Edge.id}  clusterNodeId | the ID of the cluster node
     * @param {Object} options
     * @param {boolean} refreshData | wrap up afterwards if not true
     */

  }, {
    key: "openCluster",
    value: function openCluster(clusterNodeId, options) {
      var refreshData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // kill conditions
      if (clusterNodeId === undefined) {
        throw new Error("No clusterNodeId supplied to openCluster.");
      }

      var clusterNode = this.body.nodes[clusterNodeId];

      if (clusterNode === undefined) {
        throw new Error("The clusterNodeId supplied to openCluster does not exist.");
      }

      if (clusterNode.isCluster !== true || clusterNode.containedNodes === undefined || clusterNode.containedEdges === undefined) {
        throw new Error("The node:" + clusterNodeId + " is not a valid cluster.");
      } // Check if current cluster is clustered itself


      var stack = this.findNode(clusterNodeId);
      var parentIndex = indexOf$3(stack).call(stack, clusterNodeId) - 1;

      if (parentIndex >= 0) {
        // Current cluster is clustered; transfer contained nodes and edges to parent
        var parentClusterNodeId = stack[parentIndex];
        var parentClusterNode = this.body.nodes[parentClusterNodeId]; // clustering.clusteredNodes and clustering.clusteredEdges remain unchanged

        parentClusterNode._openChildCluster(clusterNodeId); // All components of child cluster node have been transferred. It can die now.


        delete this.body.nodes[clusterNodeId];

        if (refreshData === true) {
          this.body.emitter.emit('_dataChanged');
        }

        return;
      } // main body


      var containedNodes = clusterNode.containedNodes;
      var containedEdges = clusterNode.containedEdges; // allow the user to position the nodes after release.

      if (options !== undefined && options.releaseFunction !== undefined && typeof options.releaseFunction === 'function') {
        var positions = {};
        var clusterPosition = {
          x: clusterNode.x,
          y: clusterNode.y
        };

        for (var nodeId in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
            var containedNode = this.body.nodes[nodeId];
            positions[nodeId] = {
              x: containedNode.x,
              y: containedNode.y
            };
          }
        }

        var newPositions = options.releaseFunction(clusterPosition, positions);

        for (var _nodeId2 in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, _nodeId2)) {
            var _containedNode = this.body.nodes[_nodeId2];

            if (newPositions[_nodeId2] !== undefined) {
              _containedNode.x = newPositions[_nodeId2].x === undefined ? clusterNode.x : newPositions[_nodeId2].x;
              _containedNode.y = newPositions[_nodeId2].y === undefined ? clusterNode.y : newPositions[_nodeId2].y;
            }
          }
        }
      } else {
        // copy the position from the cluster
        forEach$3(containedNodes, function (containedNode) {
          // inherit position
          if (containedNode.options.fixed.x === false) {
            containedNode.x = clusterNode.x;
          }

          if (containedNode.options.fixed.y === false) {
            containedNode.y = clusterNode.y;
          }
        });
      } // release nodes


      for (var _nodeId3 in containedNodes) {
        if (Object.prototype.hasOwnProperty.call(containedNodes, _nodeId3)) {
          var _containedNode2 = this.body.nodes[_nodeId3]; // inherit speed

          _containedNode2.vx = clusterNode.vx;
          _containedNode2.vy = clusterNode.vy;

          _containedNode2.setOptions({
            physics: true
          });

          delete this.clusteredNodes[_nodeId3];
        }
      } // copy the clusterNode edges because we cannot iterate over an object that we add or remove from.


      var edgesToBeDeleted = [];

      for (var i = 0; i < clusterNode.edges.length; i++) {
        edgesToBeDeleted.push(clusterNode.edges[i]);
      } // actually handling the deleting.


      for (var _i3 = 0; _i3 < edgesToBeDeleted.length; _i3++) {
        var edge = edgesToBeDeleted[_i3];

        var otherNodeId = this._getConnectedId(edge, clusterNodeId);

        var otherNode = this.clusteredNodes[otherNodeId];

        for (var j = 0; j < edge.clusteringEdgeReplacingIds.length; j++) {
          var transferId = edge.clusteringEdgeReplacingIds[j];
          var transferEdge = this.body.edges[transferId];
          if (transferEdge === undefined) continue; // if the other node is in another cluster, we transfer ownership of this edge to the other cluster

          if (otherNode !== undefined) {
            // transfer ownership:
            var otherCluster = this.body.nodes[otherNode.clusterId];
            otherCluster.containedEdges[transferEdge.id] = transferEdge; // delete local reference

            delete containedEdges[transferEdge.id]; // get to and from

            var fromId = transferEdge.fromId;
            var toId = transferEdge.toId;

            if (transferEdge.toId == otherNodeId) {
              toId = otherNode.clusterId;
            } else {
              fromId = otherNode.clusterId;
            } // create new cluster edge from the otherCluster


            this._createClusteredEdge(fromId, toId, transferEdge, otherCluster.clusterEdgeProperties, {
              hidden: false,
              physics: true
            });
          } else {
            this._restoreEdge(transferEdge);
          }
        }

        edge.remove();
      } // handle the releasing of the edges


      for (var edgeId in containedEdges) {
        if (Object.prototype.hasOwnProperty.call(containedEdges, edgeId)) {
          this._restoreEdge(containedEdges[edgeId]);
        }
      } // remove clusterNode


      delete this.body.nodes[clusterNodeId];

      if (refreshData === true) {
        this.body.emitter.emit('_dataChanged');
      }
    }
    /**
     *
     * @param {Cluster.id} clusterId
     * @returns {Array.<Node.id>}
     */

  }, {
    key: "getNodesInCluster",
    value: function getNodesInCluster(clusterId) {
      var nodesArray = [];

      if (this.isCluster(clusterId) === true) {
        var containedNodes = this.body.nodes[clusterId].containedNodes;

        for (var nodeId in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
            nodesArray.push(this.body.nodes[nodeId].id);
          }
        }
      }

      return nodesArray;
    }
    /**
    * Get the stack clusterId's that a certain node resides in. cluster A -> cluster B -> cluster C -> node
    *
    * If a node can't be found in the chain, return an empty array.
    *
    * @param {string|number} nodeId
    * @returns {Array}
    */

  }, {
    key: "findNode",
    value: function findNode(nodeId) {
      var stack = [];
      var max = 100;
      var counter = 0;
      var node;

      while (this.clusteredNodes[nodeId] !== undefined && counter < max) {
        node = this.body.nodes[nodeId];
        if (node === undefined) return [];
        stack.push(node.id);
        nodeId = this.clusteredNodes[nodeId].clusterId;
        counter++;
      }

      node = this.body.nodes[nodeId];
      if (node === undefined) return [];
      stack.push(node.id);

      reverse$2(stack).call(stack);

      return stack;
    }
    /**
    * Using a clustered nodeId, update with the new options
    * @param {Node.id} clusteredNodeId
    * @param {object} newOptions
    */

  }, {
    key: "updateClusteredNode",
    value: function updateClusteredNode(clusteredNodeId, newOptions) {
      if (clusteredNodeId === undefined) {
        throw new Error("No clusteredNodeId supplied to updateClusteredNode.");
      }

      if (newOptions === undefined) {
        throw new Error("No newOptions supplied to updateClusteredNode.");
      }

      if (this.body.nodes[clusteredNodeId] === undefined) {
        throw new Error("The clusteredNodeId supplied to updateClusteredNode does not exist.");
      }

      this.body.nodes[clusteredNodeId].setOptions(newOptions);
      this.body.emitter.emit('_dataChanged');
    }
    /**
    * Using a base edgeId, update all related clustered edges with the new options
    * @param {vis.Edge.id} startEdgeId
    * @param {object} newOptions
    */

  }, {
    key: "updateEdge",
    value: function updateEdge(startEdgeId, newOptions) {
      if (startEdgeId === undefined) {
        throw new Error("No startEdgeId supplied to updateEdge.");
      }

      if (newOptions === undefined) {
        throw new Error("No newOptions supplied to updateEdge.");
      }

      if (this.body.edges[startEdgeId] === undefined) {
        throw new Error("The startEdgeId supplied to updateEdge does not exist.");
      }

      var allEdgeIds = this.getClusteredEdges(startEdgeId);

      for (var i = 0; i < allEdgeIds.length; i++) {
        var edge = this.body.edges[allEdgeIds[i]];
        edge.setOptions(newOptions);
      }

      this.body.emitter.emit('_dataChanged');
    }
    /**
    * Get a stack of clusterEdgeId's (+base edgeid) that a base edge is the same as. cluster edge C -> cluster edge B -> cluster edge A -> base edge(edgeId)
    * @param {vis.Edge.id} edgeId
    * @returns {Array.<vis.Edge.id>}
    */

  }, {
    key: "getClusteredEdges",
    value: function getClusteredEdges(edgeId) {
      var stack = [];
      var max = 100;
      var counter = 0;

      while (edgeId !== undefined && this.body.edges[edgeId] !== undefined && counter < max) {
        stack.push(this.body.edges[edgeId].id);
        edgeId = this.body.edges[edgeId].edgeReplacedById;
        counter++;
      }

      reverse$2(stack).call(stack);

      return stack;
    }
    /**
    * Get the base edge id of clusterEdgeId. cluster edge (clusteredEdgeId) -> cluster edge B -> cluster edge C -> base edge
    * @param {vis.Edge.id} clusteredEdgeId
    * @returns {vis.Edge.id} baseEdgeId
    *
    * TODO: deprecate in 5.0.0. Method getBaseEdges() is the correct one to use.
    */

  }, {
    key: "getBaseEdge",
    value: function getBaseEdge(clusteredEdgeId) {
      // Just kludge this by returning the first base edge id found
      return this.getBaseEdges(clusteredEdgeId)[0];
    }
    /**
     * Get all regular edges for this clustered edge id.
     *
     * @param {vis.Edge.id} clusteredEdgeId
     * @returns {Array.<vis.Edge.id>} all baseEdgeId's under this clustered edge
     */

  }, {
    key: "getBaseEdges",
    value: function getBaseEdges(clusteredEdgeId) {
      var IdsToHandle = [clusteredEdgeId];
      var doneIds = [];
      var foundIds = [];
      var max = 100;
      var counter = 0;

      while (IdsToHandle.length > 0 && counter < max) {
        var nextId = IdsToHandle.pop();
        if (nextId === undefined) continue; // Paranoia here and onwards

        var nextEdge = this.body.edges[nextId];
        if (nextEdge === undefined) continue;
        counter++;
        var replacingIds = nextEdge.clusteringEdgeReplacingIds;

        if (replacingIds === undefined) {
          // nextId is a base id
          foundIds.push(nextId);
        } else {
          // Another cluster edge, unravel this one as well
          for (var i = 0; i < replacingIds.length; ++i) {
            var replacingId = replacingIds[i]; // Don't add if already handled
            // TODO: never triggers; find a test-case which does

            if (indexOf$3(IdsToHandle).call(IdsToHandle, replacingIds) !== -1 || indexOf$3(doneIds).call(doneIds, replacingIds) !== -1) {
              continue;
            }

            IdsToHandle.push(replacingId);
          }
        }

        doneIds.push(nextId);
      }

      return foundIds;
    }
    /**
    * Get the Id the node is connected to
    * @param {vis.Edge} edge
    * @param {Node.id} nodeId
    * @returns {*}
    * @private
    */

  }, {
    key: "_getConnectedId",
    value: function _getConnectedId(edge, nodeId) {
      if (edge.toId != nodeId) {
        return edge.toId;
      } else if (edge.fromId != nodeId) {
        return edge.fromId;
      } else {
        return edge.fromId;
      }
    }
    /**
    * We determine how many connections denote an important hub.
    * We take the mean + 2*std as the important hub size. (Assuming a normal distribution of data, ~2.2%)
    *
    * @returns {number}
    * @private
    */

  }, {
    key: "_getHubSize",
    value: function _getHubSize() {
      var average = 0;
      var averageSquared = 0;
      var hubCounter = 0;
      var largestHub = 0;

      for (var i = 0; i < this.body.nodeIndices.length; i++) {
        var node = this.body.nodes[this.body.nodeIndices[i]];

        if (node.edges.length > largestHub) {
          largestHub = node.edges.length;
        }

        average += node.edges.length;
        averageSquared += Math.pow(node.edges.length, 2);
        hubCounter += 1;
      }

      average = average / hubCounter;
      averageSquared = averageSquared / hubCounter;
      var variance = averageSquared - Math.pow(average, 2);
      var standardDeviation = Math.sqrt(variance);
      var hubThreshold = Math.floor(average + 2 * standardDeviation); // always have at least one to cluster

      if (hubThreshold > largestHub) {
        hubThreshold = largestHub;
      }

      return hubThreshold;
    }
    /**
     * Create an edge for the cluster representation.
     *
     * @param {Node.id} fromId
     * @param {Node.id} toId
     * @param {vis.Edge} baseEdge
     * @param {Object} clusterEdgeProperties
     * @param {Object} extraOptions
     * @returns {Edge} newly created clustered edge
     * @private
     */

  }, {
    key: "_createClusteredEdge",
    value: function _createClusteredEdge(fromId, toId, baseEdge, clusterEdgeProperties, extraOptions) {
      // copy the options of the edge we will replace
      var clonedOptions = NetworkUtil.cloneOptions(baseEdge, 'edge'); // make sure the properties of clusterEdges are superimposed on it

      deepExtend(clonedOptions, clusterEdgeProperties); // set up the edge

      clonedOptions.from = fromId;
      clonedOptions.to = toId;
      clonedOptions.id = 'clusterEdge:' + v4(); // apply the edge specific options to it if specified

      if (extraOptions !== undefined) {
        deepExtend(clonedOptions, extraOptions);
      }

      var newEdge = this.body.functions.createEdge(clonedOptions);
      newEdge.clusteringEdgeReplacingIds = [baseEdge.id];
      newEdge.connect(); // Register the new edge

      this.body.edges[newEdge.id] = newEdge;
      return newEdge;
    }
    /**
     * Add the passed child nodes and edges to the given cluster node.
     *
     * @param {Object|Node} childNodes  hash of nodes or single node to add in cluster
     * @param {Object|Edge} childEdges  hash of edges or single edge to take into account when clustering
     * @param {Node} clusterNode  cluster node to add nodes and edges to
     * @param {Object} [clusterEdgeProperties]
     * @private
     */

  }, {
    key: "_clusterEdges",
    value: function _clusterEdges(childNodes, childEdges, clusterNode, clusterEdgeProperties) {
      if (childEdges instanceof Edge) {
        var edge = childEdges;
        var obj = {};
        obj[edge.id] = edge;
        childEdges = obj;
      }

      if (childNodes instanceof Node) {
        var node = childNodes;
        var _obj = {};
        _obj[node.id] = node;
        childNodes = _obj;
      }

      if (clusterNode === undefined || clusterNode === null) {
        throw new Error("_clusterEdges: parameter clusterNode required");
      }

      if (clusterEdgeProperties === undefined) {
        // Take the required properties from the cluster node
        clusterEdgeProperties = clusterNode.clusterEdgeProperties;
      } // create the new edges that will connect to the cluster.
      // All self-referencing edges will be added to childEdges here.


      this._createClusterEdges(childNodes, childEdges, clusterNode, clusterEdgeProperties); // disable the childEdges


      for (var edgeId in childEdges) {
        if (Object.prototype.hasOwnProperty.call(childEdges, edgeId)) {
          if (this.body.edges[edgeId] !== undefined) {
            var _edge2 = this.body.edges[edgeId]; // cache the options before changing

            this._backupEdgeOptions(_edge2); // disable physics and hide the edge


            _edge2.setOptions({
              physics: false
            });
          }
        }
      } // disable the childNodes


      for (var nodeId in childNodes) {
        if (Object.prototype.hasOwnProperty.call(childNodes, nodeId)) {
          this.clusteredNodes[nodeId] = {
            clusterId: clusterNode.id,
            node: this.body.nodes[nodeId]
          };
          this.body.nodes[nodeId].setOptions({
            physics: false
          });
        }
      }
    }
    /**
     * Determine in which cluster given nodeId resides.
     *
     * If not in cluster, return undefined.
     *
     * NOTE: If you know a cleaner way to do this, please enlighten me (wimrijnders).
     *
     * @param {Node.id} nodeId
     * @returns {Node|undefined} Node instance for cluster, if present
     * @private
     */

  }, {
    key: "_getClusterNodeForNode",
    value: function _getClusterNodeForNode(nodeId) {
      if (nodeId === undefined) return undefined;
      var clusteredNode = this.clusteredNodes[nodeId]; // NOTE: If no cluster info found, it should actually be an error

      if (clusteredNode === undefined) return undefined;
      var clusterId = clusteredNode.clusterId;
      if (clusterId === undefined) return undefined;
      return this.body.nodes[clusterId];
    }
    /**
     * Internal helper function for conditionally removing items in array
     *
     * Done like this because Array.filter() is not fully supported by all IE's.
     *
     * @param {Array} arr
     * @param {function} callback
     * @returns {Array}
     * @private
     */

  }, {
    key: "_filter",
    value: function _filter(arr, callback) {
      var ret = [];
      forEach$3(arr, function (item) {
        if (callback(item)) {
          ret.push(item);
        }
      });
      return ret;
    }
    /**
     * Scan all edges for changes in clustering and adjust this if necessary.
     *
     * Call this (internally) after there has been a change in node or edge data.
     *
     * Pre: States of this.body.nodes and this.body.edges consistent
     * Pre: this.clusteredNodes and this.clusteredEdge consistent with containedNodes and containedEdges
     *      of cluster nodes.
     */

  }, {
    key: "_updateState",
    value: function _updateState() {
      var _this4 = this;

      var nodeId;
      var deletedNodeIds = [];
      var deletedEdgeIds = {};
      /**
       * Utility function to iterate over clustering nodes only
       *
       * @param {Function} callback  function to call for each cluster node
       */

      var eachClusterNode = function eachClusterNode(callback) {
        forEach$3(_this4.body.nodes, function (node) {
          if (node.isCluster === true) {
            callback(node);
          }
        });
      }; //
      // Remove deleted regular nodes from clustering
      //
      // Determine the deleted nodes


      for (nodeId in this.clusteredNodes) {
        if (!Object.prototype.hasOwnProperty.call(this.clusteredNodes, nodeId)) continue;
        var node = this.body.nodes[nodeId];

        if (node === undefined) {
          deletedNodeIds.push(nodeId);
        }
      } // Remove nodes from cluster nodes


      eachClusterNode(function (clusterNode) {
        for (var n = 0; n < deletedNodeIds.length; n++) {
          delete clusterNode.containedNodes[deletedNodeIds[n]];
        }
      }); // Remove nodes from cluster list

      for (var n = 0; n < deletedNodeIds.length; n++) {
        delete this.clusteredNodes[deletedNodeIds[n]];
      } //
      // Remove deleted edges from clustering
      //
      // Add the deleted clustered edges to the list


      forEach$3(this.clusteredEdges, function (edgeId) {
        var edge = _this4.body.edges[edgeId];

        if (edge === undefined || !edge.endPointsValid()) {
          deletedEdgeIds[edgeId] = edgeId;
        }
      }); // Cluster nodes can also contain edges which are not clustered,
      // i.e. nodes 1-2 within cluster with an edge in between.
      // So the cluster nodes also need to be scanned for invalid edges

      eachClusterNode(function (clusterNode) {
        forEach$3(clusterNode.containedEdges, function (edge, edgeId) {
          if (!edge.endPointsValid() && !deletedEdgeIds[edgeId]) {
            deletedEdgeIds[edgeId] = edgeId;
          }
        });
      }); // Also scan for cluster edges which need to be removed in the active list.
      // Regular edges have been removed beforehand, so this only picks up the cluster edges.

      forEach$3(this.body.edges, function (edge, edgeId) {
        // Explicitly scan the contained edges for validity
        var isValid = true;
        var replacedIds = edge.clusteringEdgeReplacingIds;

        if (replacedIds !== undefined) {
          var numValid = 0;
          forEach$3(replacedIds, function (containedEdgeId) {
            var containedEdge = _this4.body.edges[containedEdgeId];

            if (containedEdge !== undefined && containedEdge.endPointsValid()) {
              numValid += 1;
            }
          });
          isValid = numValid > 0;
        }

        if (!edge.endPointsValid() || !isValid) {
          deletedEdgeIds[edgeId] = edgeId;
        }
      }); // Remove edges from cluster nodes

      eachClusterNode(function (clusterNode) {
        forEach$3(deletedEdgeIds, function (deletedEdgeId) {
          delete clusterNode.containedEdges[deletedEdgeId];
          forEach$3(clusterNode.edges, function (edge, m) {
            if (edge.id === deletedEdgeId) {
              clusterNode.edges[m] = null; // Don't want to directly delete here, because in the loop

              return;
            }

            edge.clusteringEdgeReplacingIds = _this4._filter(edge.clusteringEdgeReplacingIds, function (id) {
              return !deletedEdgeIds[id];
            });
          }); // Clean up the nulls

          clusterNode.edges = _this4._filter(clusterNode.edges, function (item) {
            return item !== null;
          });
        });
      }); // Remove from cluster list

      forEach$3(deletedEdgeIds, function (edgeId) {
        delete _this4.clusteredEdges[edgeId];
      }); // Remove cluster edges from active list (this.body.edges).
      // deletedEdgeIds still contains id of regular edges, but these should all
      // be gone when you reach here.

      forEach$3(deletedEdgeIds, function (edgeId) {
        delete _this4.body.edges[edgeId];
      }); //
      // Check changed cluster state of edges
      //
      // Iterating over keys here, because edges may be removed in the loop

      var ids = keys$3(this.body.edges);

      forEach$3(ids, function (edgeId) {
        var edge = _this4.body.edges[edgeId];

        var shouldBeClustered = _this4._isClusteredNode(edge.fromId) || _this4._isClusteredNode(edge.toId);

        if (shouldBeClustered === _this4._isClusteredEdge(edge.id)) {
          return; // all is well
        }

        if (shouldBeClustered) {
          // add edge to clustering
          var clusterFrom = _this4._getClusterNodeForNode(edge.fromId);

          if (clusterFrom !== undefined) {
            _this4._clusterEdges(_this4.body.nodes[edge.fromId], edge, clusterFrom);
          }

          var clusterTo = _this4._getClusterNodeForNode(edge.toId);

          if (clusterTo !== undefined) {
            _this4._clusterEdges(_this4.body.nodes[edge.toId], edge, clusterTo);
          } // TODO: check that it works for both edges clustered
          //       (This might be paranoia)

        } else {
          delete _this4._clusterEdges[edgeId];

          _this4._restoreEdge(edge); // This should not be happening, the state should
          // be properly updated at this point.
          //
          // If it *is* reached during normal operation, then we have to implement
          // undo clustering for this edge here.
          // throw new Error('remove edge from clustering not implemented!')

        }
      }); // Clusters may be nested to any level. Keep on opening until nothing to open

      var changed = false;
      var continueLoop = true;

      var _loop2 = function _loop2() {
        var clustersToOpen = []; // Determine the id's of clusters that need opening

        eachClusterNode(function (clusterNode) {
          var numNodes = keys$3(clusterNode.containedNodes).length;

          var allowSingle = clusterNode.options.allowSingleNodeCluster === true;

          if (allowSingle && numNodes < 1 || !allowSingle && numNodes < 2) {
            clustersToOpen.push(clusterNode.id);
          }
        }); // Open them

        for (var _n = 0; _n < clustersToOpen.length; ++_n) {
          _this4.openCluster(clustersToOpen[_n], {}, false
          /* Don't refresh, we're in an refresh/update already */
          );
        }

        continueLoop = clustersToOpen.length > 0;
        changed = changed || continueLoop;
      };

      while (continueLoop) {
        _loop2();
      }

      if (changed) {
        this._updateState(); // Redo this method (recursion possible! should be safe)

      }
    }
    /**
     * Determine if node with given id is part of a cluster.
     *
     * @param {Node.id} nodeId
     * @return {boolean} true if part of a cluster.
     */

  }, {
    key: "_isClusteredNode",
    value: function _isClusteredNode(nodeId) {
      return this.clusteredNodes[nodeId] !== undefined;
    }
    /**
     * Determine if edge with given id is not visible due to clustering.
     *
     * An edge is considered clustered if:
     * - it is directly replaced by a clustering edge
     * - any of its connecting nodes is in a cluster
     *
     * @param {vis.Edge.id} edgeId
     * @return {boolean} true if part of a cluster.
     */

  }, {
    key: "_isClusteredEdge",
    value: function _isClusteredEdge(edgeId) {
      return this.clusteredEdges[edgeId] !== undefined;
    }
  }]);

  return ClusterEngine;
}();

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { var _context4; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = slice$5(_context4 = Object.prototype.toString.call(o)).call(_context4, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Initializes window.requestAnimationFrame() to a usable form.
 *
 * Specifically, set up this method for the case of running on node.js with jsdom enabled.
 *
 * NOTES:
 *
 * * On node.js, when calling this directly outside of this class, `window` is not defined.
 *   This happens even if jsdom is used.
 * * For node.js + jsdom, `window` is available at the moment the constructor is called.
 *   For this reason, the called is placed within the constructor.
 * * Even then, `window.requestAnimationFrame()` is not defined, so it still needs to be added.
 * * During unit testing, it happens that the window object is reset during execution, causing
 *   a runtime error due to missing `requestAnimationFrame()`. This needs to be compensated for,
 *   see `_requestNextFrame()`.
 * * Since this is a global object, it may affect other modules besides `Network`. With normal
 *   usage, this does not cause any problems. During unit testing, errors may occur. These have
 *   been compensated for, see comment block in _requestNextFrame().
 *
 * @private
 */

function _initRequestAnimationFrame() {
  var func;

  if (window !== undefined) {
    func = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  }

  if (func === undefined) {
    // window or method not present, setting mock requestAnimationFrame
    window.requestAnimationFrame = function (callback) {
      //console.log("Called mock requestAnimationFrame");
      callback();
    };
  } else {
    window.requestAnimationFrame = func;
  }
}
/**
 * The canvas renderer
 */


var CanvasRenderer = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   */
  function CanvasRenderer(body, canvas) {
    classCallCheck(this, CanvasRenderer);

    _initRequestAnimationFrame();

    this.body = body;
    this.canvas = canvas;
    this.redrawRequested = false;
    this.renderTimer = undefined;
    this.requiresTimeout = true;
    this.renderingActive = false;
    this.renderRequests = 0;
    this.allowRedraw = true;
    this.dragging = false;
    this.zooming = false;
    this.options = {};
    this.defaultOptions = {
      hideEdgesOnDrag: false,
      hideEdgesOnZoom: false,
      hideNodesOnDrag: false
    };

    assign$2(this.options, this.defaultOptions);

    this._determineBrowserMethod();

    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(CanvasRenderer, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this = this,
          _context2;

      this.body.emitter.on("dragStart", function () {
        _this.dragging = true;
      });
      this.body.emitter.on("dragEnd", function () {
        _this.dragging = false;
      });
      this.body.emitter.on("zoom", function () {
        _this.zooming = true;
        window.clearTimeout(_this.zoomTimeoutId);
        _this.zoomTimeoutId = window.setTimeout(function () {
          var _context;

          _this.zooming = false;

          bind$2(_context = _this._requestRedraw).call(_context, _this)();
        }, 250);
      });
      this.body.emitter.on("_resizeNodes", function () {
        _this._resizeNodes();
      });
      this.body.emitter.on("_redraw", function () {
        if (_this.renderingActive === false) {
          _this._redraw();
        }
      });
      this.body.emitter.on("_blockRedraw", function () {
        _this.allowRedraw = false;
      });
      this.body.emitter.on("_allowRedraw", function () {
        _this.allowRedraw = true;
        _this.redrawRequested = false;
      });
      this.body.emitter.on("_requestRedraw", bind$2(_context2 = this._requestRedraw).call(_context2, this));
      this.body.emitter.on("_startRendering", function () {
        _this.renderRequests += 1;
        _this.renderingActive = true;

        _this._startRendering();
      });
      this.body.emitter.on("_stopRendering", function () {
        _this.renderRequests -= 1;
        _this.renderingActive = _this.renderRequests > 0;
        _this.renderTimer = undefined;
      });
      this.body.emitter.on('destroy', function () {
        _this.renderRequests = 0;
        _this.allowRedraw = false;
        _this.renderingActive = false;

        if (_this.requiresTimeout === true) {
          clearTimeout(_this.renderTimer);
        } else {
          window.cancelAnimationFrame(_this.renderTimer);
        }

        _this.body.emitter.off();
      });
    }
    /**
     *
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        var fields = ['hideEdgesOnDrag', 'hideEdgesOnZoom', 'hideNodesOnDrag'];
        selectiveDeepExtend(fields, this.options, options);
      }
    }
    /**
     * Prepare the drawing of the next frame.
     *
     * Calls the callback when the next frame can or will be drawn.
     *
     * @param {function} callback
     * @param {number} delay - timeout case only, wait this number of milliseconds
     * @returns {function|undefined}
     * @private
     */

  }, {
    key: "_requestNextFrame",
    value: function _requestNextFrame(callback, delay) {
      // During unit testing, it happens that the mock window object is reset while
      // the next frame is still pending. Then, either 'window' is not present, or
      // 'requestAnimationFrame()' is not present because it is not defined on the
      // mock window object.
      //
      // As a consequence, unrelated unit tests may appear to fail, even if the problem
      // described happens in the current unit test.
      //
      // This is not something that will happen in normal operation, but we still need
      // to take it into account.
      //
      if (typeof window === 'undefined') return; // Doing `if (window === undefined)` does not work here!

      var timer;
      var myWindow = window; // Grab a reference to reduce the possibility that 'window' is reset
      // while running this method.

      if (this.requiresTimeout === true) {
        // wait given number of milliseconds and perform the animation step function
        timer = myWindow.setTimeout(callback, delay);
      } else {
        if (myWindow.requestAnimationFrame) {
          timer = myWindow.requestAnimationFrame(callback);
        }
      }

      return timer;
    }
    /**
     *
     * @private
     */

  }, {
    key: "_startRendering",
    value: function _startRendering() {
      if (this.renderingActive === true) {
        if (this.renderTimer === undefined) {
          var _context3;

          this.renderTimer = this._requestNextFrame(bind$2(_context3 = this._renderStep).call(_context3, this), this.simulationInterval);
        }
      }
    }
    /**
     *
     * @private
     */

  }, {
    key: "_renderStep",
    value: function _renderStep() {
      if (this.renderingActive === true) {
        // reset the renderTimer so a new scheduled animation step can be set
        this.renderTimer = undefined;

        if (this.requiresTimeout === true) {
          // this schedules a new simulation step
          this._startRendering();
        }

        this._redraw();

        if (this.requiresTimeout === false) {
          // this schedules a new simulation step
          this._startRendering();
        }
      }
    }
    /**
     * Redraw the network with the current data
     * chart will be resized too.
     */

  }, {
    key: "redraw",
    value: function redraw() {
      this.body.emitter.emit('setSize');

      this._redraw();
    }
    /**
     * Redraw the network with the current data
     * @private
     */

  }, {
    key: "_requestRedraw",
    value: function _requestRedraw() {
      var _this2 = this;

      if (this.redrawRequested !== true && this.renderingActive === false && this.allowRedraw === true) {
        this.redrawRequested = true;

        this._requestNextFrame(function () {
          _this2._redraw(false);
        }, 0);
      }
    }
    /**
     * Redraw the network with the current data
     * @param {boolean} [hidden=false] | Used to get the first estimate of the node sizes.
     *                                   Only the nodes are drawn after which they are quickly drawn over.
     * @private
     */

  }, {
    key: "_redraw",
    value: function _redraw() {
      var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.allowRedraw === true) {
        this.body.emitter.emit("initRedraw");
        this.redrawRequested = false;
        var drawLater = {
          drawExternalLabels: null
        }; // when the container div was hidden, this fixes it back up!

        if (this.canvas.frame.canvas.width === 0 || this.canvas.frame.canvas.height === 0) {
          this.canvas.setSize();
        }

        this.canvas.setTransform();
        var ctx = this.canvas.getContext(); // clear the canvas

        var w = this.canvas.frame.canvas.clientWidth;
        var h = this.canvas.frame.canvas.clientHeight;
        ctx.clearRect(0, 0, w, h); // if the div is hidden, we stop the redraw here for performance.

        if (this.canvas.frame.clientWidth === 0) {
          return;
        } // set scaling and translation


        ctx.save();
        ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
        ctx.scale(this.body.view.scale, this.body.view.scale);
        ctx.beginPath();
        this.body.emitter.emit("beforeDrawing", ctx);
        ctx.closePath();

        if (hidden === false) {
          if ((this.dragging === false || this.dragging === true && this.options.hideEdgesOnDrag === false) && (this.zooming === false || this.zooming === true && this.options.hideEdgesOnZoom === false)) {
            this._drawEdges(ctx);
          }
        }

        if (this.dragging === false || this.dragging === true && this.options.hideNodesOnDrag === false) {
          var _this$_drawNodes = this._drawNodes(ctx, hidden),
              drawExternalLabels = _this$_drawNodes.drawExternalLabels;

          drawLater.drawExternalLabels = drawExternalLabels;
        } // draw the arrows last so they will be at the top


        if (hidden === false) {
          if ((this.dragging === false || this.dragging === true && this.options.hideEdgesOnDrag === false) && (this.zooming === false || this.zooming === true && this.options.hideEdgesOnZoom === false)) {
            this._drawArrows(ctx);
          }
        }

        if (drawLater.drawExternalLabels != null) {
          drawLater.drawExternalLabels();
        }

        if (hidden === false) {
          this._drawSelectionBox(ctx);
        }

        ctx.beginPath();
        this.body.emitter.emit("afterDrawing", ctx);
        ctx.closePath(); // restore original scaling and translation

        ctx.restore();

        if (hidden === true) {
          ctx.clearRect(0, 0, w, h);
        }
      }
    }
    /**
     * Redraw all nodes
     *
     * @param {CanvasRenderingContext2D}   ctx
     * @param {boolean} [alwaysShow]
     * @private
     */

  }, {
    key: "_resizeNodes",
    value: function _resizeNodes() {
      this.canvas.setTransform();
      var ctx = this.canvas.getContext();
      ctx.save();
      ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
      ctx.scale(this.body.view.scale, this.body.view.scale);
      var nodes = this.body.nodes;
      var node; // resize all nodes

      for (var nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          node = nodes[nodeId];
          node.resize(ctx);
          node.updateBoundingBox(ctx, node.selected);
        }
      } // restore original scaling and translation


      ctx.restore();
    }
    /**
     * Redraw all nodes
     *
     * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
     * @param {boolean} [alwaysShow]
     * @private
     *
     * @returns {Object} Callbacks to draw later on higher layers.
     */

  }, {
    key: "_drawNodes",
    value: function _drawNodes(ctx) {
      var alwaysShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nodes = this.body.nodes;
      var nodeIndices = this.body.nodeIndices;
      var node;
      var selected = [];
      var hovered = [];
      var margin = 20;
      var topLeft = this.canvas.DOMtoCanvas({
        x: -margin,
        y: -margin
      });
      var bottomRight = this.canvas.DOMtoCanvas({
        x: this.canvas.frame.canvas.clientWidth + margin,
        y: this.canvas.frame.canvas.clientHeight + margin
      });
      var viewableArea = {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x
      };
      var _drawExternalLabels = []; // draw unselected nodes;

      for (var _i = 0; _i < nodeIndices.length; _i++) {
        node = nodes[nodeIndices[_i]]; // set selected and hovered nodes aside

        if (node.hover) {
          hovered.push(nodeIndices[_i]);
        } else if (node.isSelected()) {
          selected.push(nodeIndices[_i]);
        } else {
          if (alwaysShow === true) {
            var drawLater = node.draw(ctx);

            if (drawLater.drawExternalLabel != null) {
              _drawExternalLabels.push(drawLater.drawExternalLabel);
            }
          } else if (node.isBoundingBoxOverlappingWith(viewableArea) === true) {
            var _drawLater = node.draw(ctx);

            if (_drawLater.drawExternalLabel != null) {
              _drawExternalLabels.push(_drawLater.drawExternalLabel);
            }
          } else {
            node.updateBoundingBox(ctx, node.selected);
          }
        }
      }

      var i;
      var selectedLength = selected.length;
      var hoveredLength = hovered.length; // draw the selected nodes on top

      for (i = 0; i < selectedLength; i++) {
        node = nodes[selected[i]];

        var _drawLater2 = node.draw(ctx);

        if (_drawLater2.drawExternalLabel != null) {
          _drawExternalLabels.push(_drawLater2.drawExternalLabel);
        }
      } // draw hovered nodes above everything else: fixes https://github.com/visjs/vis-network/issues/226


      for (i = 0; i < hoveredLength; i++) {
        node = nodes[hovered[i]];

        var _drawLater3 = node.draw(ctx);

        if (_drawLater3.drawExternalLabel != null) {
          _drawExternalLabels.push(_drawLater3.drawExternalLabel);
        }
      }

      return {
        drawExternalLabels: function drawExternalLabels() {
          var _iterator = _createForOfIteratorHelper$2(_drawExternalLabels),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var draw = _step.value;
              draw();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      };
    }
    /**
     * Redraw all edges
     * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
     * @private
     */

  }, {
    key: "_drawEdges",
    value: function _drawEdges(ctx) {
      var edges = this.body.edges;
      var edgeIndices = this.body.edgeIndices;

      for (var i = 0; i < edgeIndices.length; i++) {
        var edge = edges[edgeIndices[i]];

        if (edge.connected === true) {
          edge.draw(ctx);
        }
      }
    }
    /**
     * Redraw all arrows
     * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
     * @private
     */

  }, {
    key: "_drawArrows",
    value: function _drawArrows(ctx) {
      var edges = this.body.edges;
      var edgeIndices = this.body.edgeIndices;

      for (var i = 0; i < edgeIndices.length; i++) {
        var edge = edges[edgeIndices[i]];

        if (edge.connected === true) {
          edge.drawArrows(ctx);
        }
      }
    }
    /**
     * Determine if the browser requires a setTimeout or a requestAnimationFrame. This was required because
     * some implementations (safari and IE9) did not support requestAnimationFrame
     * @private
     */

  }, {
    key: "_determineBrowserMethod",
    value: function _determineBrowserMethod() {
      if (typeof window !== 'undefined') {
        var browserType = navigator.userAgent.toLowerCase();
        this.requiresTimeout = false;

        if (indexOf$3(browserType).call(browserType, 'msie 9.0') != -1) {
          // IE 9
          this.requiresTimeout = true;
        } else if (indexOf$3(browserType).call(browserType, 'safari') != -1) {
          // safari
          if (indexOf$3(browserType).call(browserType, 'chrome') <= -1) {
            this.requiresTimeout = true;
          }
        }
      } else {
        this.requiresTimeout = true;
      }
    }
    /**
    * Redraw selection box
    * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
    * @private
    */

  }, {
    key: "_drawSelectionBox",
    value: function _drawSelectionBox(ctx) {
      if (this.body.selectionBox.show) {
        ctx.beginPath();
        var width = this.body.selectionBox.position.end.x - this.body.selectionBox.position.start.x;
        var height = this.body.selectionBox.position.end.y - this.body.selectionBox.position.start.y;
        ctx.rect(this.body.selectionBox.position.start.x, this.body.selectionBox.position.start.y, width, height);
        ctx.fillStyle = "rgba(151, 194, 252, 0.2)";
        ctx.fillRect(this.body.selectionBox.position.start.x, this.body.selectionBox.position.start.y, width, height);
        ctx.strokeStyle = "rgba(151, 194, 252, 1)";
        ctx.stroke();
      } else {
        ctx.closePath();
      }
    }
  }]);

  return CanvasRenderer;
}();

var setInterval = path.setInterval;

var setInterval$1 = setInterval;

/**
 * Register a touch event, taking place before a gesture
 * @param {Hammer} hammer       A hammer instance
 * @param {function} callback   Callback, called as callback(event)
 */
function onTouch(hammer, callback) {
  callback.inputHandler = function (event) {
    if (event.isFirst) {
      callback(event);
    }
  };

  hammer.on('hammer.input', callback.inputHandler);
}
/**
 * Register a release event, taking place after a gesture
 * @param {Hammer} hammer       A hammer instance
 * @param {function} callback   Callback, called as callback(event)
 * @returns {*}
 */

function onRelease(hammer, callback) {
  callback.inputHandler = function (event) {
    if (event.isFinal) {
      callback(event);
    }
  };

  return hammer.on('hammer.input', callback.inputHandler);
}

/**
 * Create the main frame for the Network.
 * This function is executed once when a Network object is created. The frame
 * contains a canvas, and this canvas contains all objects like the axis and
 * nodes.
 */

var Canvas = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   */
  function Canvas(body) {
    var _context;

    classCallCheck(this, Canvas);

    this.body = body;
    this.pixelRatio = 1;
    this.resizeTimer = undefined;
    this.resizeFunction = bind$2(_context = this._onResize).call(_context, this);
    this.cameraState = {};
    this.initialized = false;
    this.canvasViewCenter = {};
    this.options = {};
    this.defaultOptions = {
      autoResize: true,
      height: '100%',
      width: '100%'
    };

    assign$2(this.options, this.defaultOptions);

    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(Canvas, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this = this,
          _context2;

      // bind the events
      this.body.emitter.once("resize", function (obj) {
        if (obj.width !== 0) {
          _this.body.view.translation.x = obj.width * 0.5;
        }

        if (obj.height !== 0) {
          _this.body.view.translation.y = obj.height * 0.5;
        }
      });
      this.body.emitter.on("setSize", bind$2(_context2 = this.setSize).call(_context2, this));
      this.body.emitter.on("destroy", function () {
        _this.hammerFrame.destroy();

        _this.hammer.destroy();

        _this._cleanUp();
      });
    }
    /**
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this2 = this;

      if (options !== undefined) {
        var fields = ['width', 'height', 'autoResize'];
        selectiveDeepExtend(fields, this.options, options);
      }

      if (this.options.autoResize === true) {
        var _context3;

        // automatically adapt to a changing size of the browser.
        this._cleanUp();

        this.resizeTimer = setInterval$1(function () {
          var changed = _this2.setSize();

          if (changed === true) {
            _this2.body.emitter.emit("_requestRedraw");
          }
        }, 1000);
        this.resizeFunction = bind$2(_context3 = this._onResize).call(_context3, this);
        addEventListener(window, 'resize', this.resizeFunction);
      }
    }
    /**
     * @private
     */

  }, {
    key: "_cleanUp",
    value: function _cleanUp() {
      // automatically adapt to a changing size of the browser.
      if (this.resizeTimer !== undefined) {
        clearInterval(this.resizeTimer);
      }

      removeEventListener(window, 'resize', this.resizeFunction);
      this.resizeFunction = undefined;
    }
    /**
     * @private
     */

  }, {
    key: "_onResize",
    value: function _onResize() {
      this.setSize();
      this.body.emitter.emit("_redraw");
    }
    /**
     * Get and store the cameraState
     *
     * @param {number} [pixelRatio=this.pixelRatio]
     * @private
     */

  }, {
    key: "_getCameraState",
    value: function _getCameraState() {
      var pixelRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pixelRatio;

      if (this.initialized === true) {
        this.cameraState.previousWidth = this.frame.canvas.width / pixelRatio;
        this.cameraState.previousHeight = this.frame.canvas.height / pixelRatio;
        this.cameraState.scale = this.body.view.scale;
        this.cameraState.position = this.DOMtoCanvas({
          x: 0.5 * this.frame.canvas.width / pixelRatio,
          y: 0.5 * this.frame.canvas.height / pixelRatio
        });
      }
    }
    /**
     * Set the cameraState
     * @private
     */

  }, {
    key: "_setCameraState",
    value: function _setCameraState() {
      if (this.cameraState.scale !== undefined && this.frame.canvas.clientWidth !== 0 && this.frame.canvas.clientHeight !== 0 && this.pixelRatio !== 0 && this.cameraState.previousWidth > 0 && this.cameraState.previousHeight > 0) {
        var widthRatio = this.frame.canvas.width / this.pixelRatio / this.cameraState.previousWidth;
        var heightRatio = this.frame.canvas.height / this.pixelRatio / this.cameraState.previousHeight;
        var newScale = this.cameraState.scale;

        if (widthRatio != 1 && heightRatio != 1) {
          newScale = this.cameraState.scale * 0.5 * (widthRatio + heightRatio);
        } else if (widthRatio != 1) {
          newScale = this.cameraState.scale * widthRatio;
        } else if (heightRatio != 1) {
          newScale = this.cameraState.scale * heightRatio;
        }

        this.body.view.scale = newScale; // this comes from the view module.

        var currentViewCenter = this.DOMtoCanvas({
          x: 0.5 * this.frame.canvas.clientWidth,
          y: 0.5 * this.frame.canvas.clientHeight
        });
        var distanceFromCenter = {
          // offset from view, distance view has to change by these x and y to center the node
          x: currentViewCenter.x - this.cameraState.position.x,
          y: currentViewCenter.y - this.cameraState.position.y
        };
        this.body.view.translation.x += distanceFromCenter.x * this.body.view.scale;
        this.body.view.translation.y += distanceFromCenter.y * this.body.view.scale;
      }
    }
    /**
     *
     * @param {number|string} value
     * @returns {string}
     * @private
     */

  }, {
    key: "_prepareValue",
    value: function _prepareValue(value) {
      if (typeof value === 'number') {
        return value + 'px';
      } else if (typeof value === 'string') {
        if (indexOf$3(value).call(value, '%') !== -1 || indexOf$3(value).call(value, 'px') !== -1) {
          return value;
        } else if (indexOf$3(value).call(value, '%') === -1) {
          return value + 'px';
        }
      }

      throw new Error('Could not use the value supplied for width or height:' + value);
    }
    /**
     * Create the HTML
     */

  }, {
    key: "_create",
    value: function _create() {
      // remove all elements from the container element.
      while (this.body.container.hasChildNodes()) {
        this.body.container.removeChild(this.body.container.firstChild);
      }

      this.frame = document.createElement('div');
      this.frame.className = 'vis-network';
      this.frame.style.position = 'relative';
      this.frame.style.overflow = 'hidden';
      this.frame.tabIndex = 900; // tab index is required for keycharm to bind keystrokes to the div instead of the window
      //////////////////////////////////////////////////////////////////

      this.frame.canvas = document.createElement("canvas");
      this.frame.canvas.style.position = 'relative';
      this.frame.appendChild(this.frame.canvas);

      if (!this.frame.canvas.getContext) {
        var noCanvas = document.createElement('DIV');
        noCanvas.style.color = 'red';
        noCanvas.style.fontWeight = 'bold';
        noCanvas.style.padding = '10px';
        noCanvas.innerHTML = 'Error: your browser does not support HTML canvas';
        this.frame.canvas.appendChild(noCanvas);
      } else {
        this._setPixelRatio();

        this.setTransform();
      } // add the frame to the container element


      this.body.container.appendChild(this.frame);
      this.body.view.scale = 1;
      this.body.view.translation = {
        x: 0.5 * this.frame.canvas.clientWidth,
        y: 0.5 * this.frame.canvas.clientHeight
      };

      this._bindHammer();
    }
    /**
     * This function binds hammer, it can be repeated over and over due to the uniqueness check.
     * @private
     */

  }, {
    key: "_bindHammer",
    value: function _bindHammer() {
      var _this3 = this;

      if (this.hammer !== undefined) {
        this.hammer.destroy();
      }

      this.drag = {};
      this.pinch = {}; // init hammer

      this.hammer = new hammer(this.frame.canvas);
      this.hammer.get('pinch').set({
        enable: true
      }); // enable to get better response, todo: test on mobile.

      this.hammer.get('pan').set({
        threshold: 5,
        direction: hammer.DIRECTION_ALL
      });
      onTouch(this.hammer, function (event) {
        _this3.body.eventListeners.onTouch(event);
      });
      this.hammer.on('tap', function (event) {
        _this3.body.eventListeners.onTap(event);
      });
      this.hammer.on('doubletap', function (event) {
        _this3.body.eventListeners.onDoubleTap(event);
      });
      this.hammer.on('press', function (event) {
        _this3.body.eventListeners.onHold(event);
      });
      this.hammer.on('panstart', function (event) {
        _this3.body.eventListeners.onDragStart(event);
      });
      this.hammer.on('panmove', function (event) {
        _this3.body.eventListeners.onDrag(event);
      });
      this.hammer.on('panend', function (event) {
        _this3.body.eventListeners.onDragEnd(event);
      });
      this.hammer.on('pinch', function (event) {
        _this3.body.eventListeners.onPinch(event);
      }); // TODO: neatly cleanup these handlers when re-creating the Canvas, IF these are done with hammer, event.stopPropagation will not work?

      this.frame.canvas.addEventListener('wheel', function (event) {
        _this3.body.eventListeners.onMouseWheel(event);
      });
      this.frame.canvas.addEventListener('mousemove', function (event) {
        _this3.body.eventListeners.onMouseMove(event);
      });
      this.frame.canvas.addEventListener('contextmenu', function (event) {
        _this3.body.eventListeners.onContext(event);
      });
      this.hammerFrame = new hammer(this.frame);
      onRelease(this.hammerFrame, function (event) {
        _this3.body.eventListeners.onRelease(event);
      });
    }
    /**
     * Set a new size for the network
     * @param {string} width   Width in pixels or percentage (for example '800px'
     *                         or '50%')
     * @param {string} height  Height in pixels or percentage  (for example '400px'
     *                         or '30%')
     * @returns {boolean}
     */

  }, {
    key: "setSize",
    value: function setSize() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.width;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.height;
      width = this._prepareValue(width);
      height = this._prepareValue(height);
      var emitEvent = false;
      var oldWidth = this.frame.canvas.width;
      var oldHeight = this.frame.canvas.height; // update the pixel ratio
      //
      // NOTE: Comment in following is rather inconsistent; this is the ONLY place in the code
      //       where it is assumed that the pixel ratio could change at runtime.
      //       The only way I can think of this happening is a rotating screen or tablet; but then
      //       there should be a mechanism for reloading the data (TODO: check if this is present).
      //
      //       If the assumption is true (i.e. pixel ratio can change at runtime), then *all* usage
      //       of pixel ratio must be overhauled for this.
      //
      //       For the time being, I will humor the assumption here, and in the rest of the code assume it is
      //       constant.

      var previousRatio = this.pixelRatio; // we cache this because the camera state storage needs the old value

      this._setPixelRatio();

      if (width != this.options.width || height != this.options.height || this.frame.style.width != width || this.frame.style.height != height) {
        this._getCameraState(previousRatio);

        this.frame.style.width = width;
        this.frame.style.height = height;
        this.frame.canvas.style.width = '100%';
        this.frame.canvas.style.height = '100%';
        this.frame.canvas.width = Math.round(this.frame.canvas.clientWidth * this.pixelRatio);
        this.frame.canvas.height = Math.round(this.frame.canvas.clientHeight * this.pixelRatio);
        this.options.width = width;
        this.options.height = height;
        this.canvasViewCenter = {
          x: 0.5 * this.frame.clientWidth,
          y: 0.5 * this.frame.clientHeight
        };
        emitEvent = true;
      } else {
        // this would adapt the width of the canvas to the width from 100% if and only if
        // there is a change.
        var newWidth = Math.round(this.frame.canvas.clientWidth * this.pixelRatio);
        var newHeight = Math.round(this.frame.canvas.clientHeight * this.pixelRatio); // store the camera if there is a change in size.

        if (this.frame.canvas.width !== newWidth || this.frame.canvas.height !== newHeight) {
          this._getCameraState(previousRatio);
        }

        if (this.frame.canvas.width !== newWidth) {
          this.frame.canvas.width = newWidth;
          emitEvent = true;
        }

        if (this.frame.canvas.height !== newHeight) {
          this.frame.canvas.height = newHeight;
          emitEvent = true;
        }
      }

      if (emitEvent === true) {
        this.body.emitter.emit('resize', {
          width: Math.round(this.frame.canvas.width / this.pixelRatio),
          height: Math.round(this.frame.canvas.height / this.pixelRatio),
          oldWidth: Math.round(oldWidth / this.pixelRatio),
          oldHeight: Math.round(oldHeight / this.pixelRatio)
        }); // restore the camera on change.

        this._setCameraState();
      } // set initialized so the get and set camera will work from now on.


      this.initialized = true;
      return emitEvent;
    }
    /**
     *
     * @returns {CanvasRenderingContext2D}
     */

  }, {
    key: "getContext",
    value: function getContext() {
      return this.frame.canvas.getContext("2d");
    }
    /**
     * Determine the pixel ratio for various browsers.
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_determinePixelRatio",
    value: function _determinePixelRatio() {
      var ctx = this.getContext();

      if (ctx === undefined) {
        throw new Error("Could not get canvax context");
      }

      var numerator = 1;

      if (typeof window !== 'undefined') {
        // (window !== undefined) doesn't work here!
        // Protection during unit tests, where 'window' can be missing
        numerator = window.devicePixelRatio || 1;
      }

      var denominator = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
      return numerator / denominator;
    }
    /**
     * Lazy determination of pixel ratio.
     *
     * @private
     */

  }, {
    key: "_setPixelRatio",
    value: function _setPixelRatio() {
      this.pixelRatio = this._determinePixelRatio();
    }
    /**
     * Set the transform in the contained context, based on its pixelRatio
     */

  }, {
    key: "setTransform",
    value: function setTransform() {
      var ctx = this.getContext();

      if (ctx === undefined) {
        throw new Error("Could not get canvax context");
      }

      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    }
    /**
     * Convert the X coordinate in DOM-space (coordinate point in browser relative to the container div) to
     * the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
     * @param {number} x
     * @returns {number}
     * @private
     */

  }, {
    key: "_XconvertDOMtoCanvas",
    value: function _XconvertDOMtoCanvas(x) {
      return (x - this.body.view.translation.x) / this.body.view.scale;
    }
    /**
     * Convert the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
     * the X coordinate in DOM-space (coordinate point in browser relative to the container div)
     * @param {number} x
     * @returns {number}
     * @private
     */

  }, {
    key: "_XconvertCanvasToDOM",
    value: function _XconvertCanvasToDOM(x) {
      return x * this.body.view.scale + this.body.view.translation.x;
    }
    /**
     * Convert the Y coordinate in DOM-space (coordinate point in browser relative to the container div) to
     * the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
     * @param {number} y
     * @returns {number}
     * @private
     */

  }, {
    key: "_YconvertDOMtoCanvas",
    value: function _YconvertDOMtoCanvas(y) {
      return (y - this.body.view.translation.y) / this.body.view.scale;
    }
    /**
     * Convert the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
     * the Y coordinate in DOM-space (coordinate point in browser relative to the container div)
     * @param {number} y
     * @returns {number}
     * @private
     */

  }, {
    key: "_YconvertCanvasToDOM",
    value: function _YconvertCanvasToDOM(y) {
      return y * this.body.view.scale + this.body.view.translation.y;
    }
    /**
     * @param {point} pos
     * @returns {point}
     */

  }, {
    key: "canvasToDOM",
    value: function canvasToDOM(pos) {
      return {
        x: this._XconvertCanvasToDOM(pos.x),
        y: this._YconvertCanvasToDOM(pos.y)
      };
    }
    /**
     *
     * @param {point} pos
     * @returns {point}
     */

  }, {
    key: "DOMtoCanvas",
    value: function DOMtoCanvas(pos) {
      return {
        x: this._XconvertDOMtoCanvas(pos.x),
        y: this._YconvertDOMtoCanvas(pos.y)
      };
    }
  }]);

  return Canvas;
}();

/**
 * The view
 */

var View = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   */
  function View(body, canvas) {
    var _context,
        _this = this,
        _context2;

    classCallCheck(this, View);

    this.body = body;
    this.canvas = canvas;
    this.animationSpeed = 1 / this.renderRefreshRate;
    this.animationEasingFunction = "easeInOutQuint";
    this.easingTime = 0;
    this.sourceScale = 0;
    this.targetScale = 0;
    this.sourceTranslation = 0;
    this.targetTranslation = 0;
    this.lockedOnNodeId = undefined;
    this.lockedOnNodeOffset = undefined;
    this.touchTime = 0;
    this.viewFunction = undefined;
    this.body.emitter.on("fit", bind$2(_context = this.fit).call(_context, this));
    this.body.emitter.on("animationFinished", function () {
      _this.body.emitter.emit("_stopRendering");
    });
    this.body.emitter.on("unlockNode", bind$2(_context2 = this.releaseNode).call(_context2, this));
  }
  /**
   *
   * @param {Object} [options={}]
   */


  createClass(View, [{
    key: "setOptions",
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = options;
    }
    /**
     * This function zooms out to fit all data on screen based on amount of nodes
     * @param {Object} [options={{nodes=Array}}]
     * @param {boolean} [initialZoom=false]  | zoom based on fitted formula or range, true = fitted, default = false;
     */

  }, {
    key: "fit",
    value: function fit() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        nodes: []
      };
      var initialZoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var range;
      var zoomLevel;
      options = assign$2({}, options);

      if (options.nodes === undefined || options.nodes.length === 0) {
        options.nodes = this.body.nodeIndices;
      }

      var canvasWidth = this.canvas.frame.canvas.clientWidth;
      var canvasHeight = this.canvas.frame.canvas.clientHeight;

      if (canvasWidth === 0 || canvasHeight === 0) {
        // There's no point in trying to fit into zero sized canvas. This could
        // potentially even result in invalid values being computed. For example
        // for network without nodes and zero sized canvas the zoom level would
        // end up being computed as 0/0 which results in NaN. In any other case
        // this would be 0/something which is again pointless to compute.
        zoomLevel = 1;
        range = NetworkUtil.getRange(this.body.nodes, options.nodes);
      } else if (initialZoom === true) {
        // check if more than half of the nodes have a predefined position. If so, we use the range, not the approximation.
        var positionDefined = 0;

        for (var nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            var node = this.body.nodes[nodeId];

            if (node.predefinedPosition === true) {
              positionDefined += 1;
            }
          }
        }

        if (positionDefined > 0.5 * this.body.nodeIndices.length) {
          this.fit(options, false);
          return;
        }

        range = NetworkUtil.getRange(this.body.nodes, options.nodes);
        var numberOfNodes = this.body.nodeIndices.length;
        zoomLevel = 12.662 / (numberOfNodes + 7.4147) + 0.0964822; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.
        // correct for larger canvasses.

        var factor = Math.min(canvasWidth / 600, canvasHeight / 600);
        zoomLevel *= factor;
      } else {
        this.body.emitter.emit("_resizeNodes");
        range = NetworkUtil.getRange(this.body.nodes, options.nodes);
        var xDistance = Math.abs(range.maxX - range.minX) * 1.1;
        var yDistance = Math.abs(range.maxY - range.minY) * 1.1;
        var xZoomLevel = canvasWidth / xDistance;
        var yZoomLevel = canvasHeight / yDistance;
        zoomLevel = xZoomLevel <= yZoomLevel ? xZoomLevel : yZoomLevel;
      }

      if (zoomLevel > 1.0) {
        zoomLevel = 1.0;
      } else if (zoomLevel === 0) {
        zoomLevel = 1.0;
      }

      var center = NetworkUtil.findCenter(range);
      var animationOptions = {
        position: center,
        scale: zoomLevel,
        animation: options.animation
      };
      this.moveTo(animationOptions);
    } // animation

    /**
     * Center a node in view.
     *
     * @param {number} nodeId
     * @param {number} [options]
     */

  }, {
    key: "focus",
    value: function focus(nodeId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.body.nodes[nodeId] !== undefined) {
        var nodePosition = {
          x: this.body.nodes[nodeId].x,
          y: this.body.nodes[nodeId].y
        };
        options.position = nodePosition;
        options.lockedOnNode = nodeId;
        this.moveTo(options);
      } else {
        console.log("Node: " + nodeId + " cannot be found.");
      }
    }
    /**
     *
     * @param {Object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
     *                          |  options.scale    = number                 // scale to move to
     *                          |  options.position = {x:number, y:number}   // position to move to
     *                          |  options.animation = {duration:number, easingFunction:String} || Boolean   // position to move to
     */

  }, {
    key: "moveTo",
    value: function moveTo(options) {
      if (options === undefined) {
        options = {};
        return;
      }

      if (options.offset != null) {
        if (options.offset.x != null) {
          // Coerce and verify that x is valid.
          options.offset.x = +options.offset.x;

          if (!_isFinite$2(options.offset.x)) {
            throw new TypeError('The option "offset.x" has to be a finite number.');
          }
        } else {
          options.offset.x = 0;
        }

        if (options.offset.y != null) {
          // Coerce and verify that y is valid.
          options.offset.y = +options.offset.y;

          if (!_isFinite$2(options.offset.y)) {
            throw new TypeError('The option "offset.y" has to be a finite number.');
          }
        } else {
          options.offset.x = 0;
        }
      } else {
        options.offset = {
          x: 0,
          y: 0
        };
      }

      if (options.position != null) {
        if (options.position.x != null) {
          // Coerce and verify that x is valid.
          options.position.x = +options.position.x;

          if (!_isFinite$2(options.position.x)) {
            throw new TypeError('The option "position.x" has to be a finite number.');
          }
        } else {
          options.position.x = 0;
        }

        if (options.position.y != null) {
          // Coerce and verify that y is valid.
          options.position.y = +options.position.y;

          if (!_isFinite$2(options.position.y)) {
            throw new TypeError('The option "position.y" has to be a finite number.');
          }
        } else {
          options.position.x = 0;
        }
      } else {
        options.position = this.getViewPosition();
      }

      if (options.scale != null) {
        // Coerce and verify that the scale is valid.
        options.scale = +options.scale;

        if (!(options.scale > 0)) {
          throw new TypeError('The option "scale" has to be a number greater than zero.');
        }
      } else {
        options.scale = this.body.view.scale;
      }

      if (options.animation === undefined) {
        options.animation = {
          duration: 0
        };
      }

      if (options.animation === false) {
        options.animation = {
          duration: 0
        };
      }

      if (options.animation === true) {
        options.animation = {};
      }

      if (options.animation.duration === undefined) {
        options.animation.duration = 1000;
      } // default duration


      if (options.animation.easingFunction === undefined) {
        options.animation.easingFunction = "easeInOutQuad";
      } // default easing function


      this.animateView(options);
    }
    /**
     *
     * @param {Object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
     *                          |  options.time     = number                 // animation time in milliseconds
     *                          |  options.scale    = number                 // scale to animate to
     *                          |  options.position = {x:number, y:number}   // position to animate to
     *                          |  options.easingFunction = String           // linear, easeInQuad, easeOutQuad, easeInOutQuad,
     *                                                                       // easeInCubic, easeOutCubic, easeInOutCubic,
     *                                                                       // easeInQuart, easeOutQuart, easeInOutQuart,
     *                                                                       // easeInQuint, easeOutQuint, easeInOutQuint
     */

  }, {
    key: "animateView",
    value: function animateView(options) {
      if (options === undefined) {
        return;
      }

      this.animationEasingFunction = options.animation.easingFunction; // release if something focussed on the node

      this.releaseNode();

      if (options.locked === true) {
        this.lockedOnNodeId = options.lockedOnNode;
        this.lockedOnNodeOffset = options.offset;
      } // forcefully complete the old animation if it was still running


      if (this.easingTime != 0) {
        this._transitionRedraw(true); // by setting easingtime to 1, we finish the animation.

      }

      this.sourceScale = this.body.view.scale;
      this.sourceTranslation = this.body.view.translation;
      this.targetScale = options.scale; // set the scale so the viewCenter is based on the correct zoom level. This is overridden in the transitionRedraw
      // but at least then we'll have the target transition

      this.body.view.scale = this.targetScale;
      var viewCenter = this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
      var distanceFromCenter = {
        // offset from view, distance view has to change by these x and y to center the node
        x: viewCenter.x - options.position.x,
        y: viewCenter.y - options.position.y
      };
      this.targetTranslation = {
        x: this.sourceTranslation.x + distanceFromCenter.x * this.targetScale + options.offset.x,
        y: this.sourceTranslation.y + distanceFromCenter.y * this.targetScale + options.offset.y
      }; // if the time is set to 0, don't do an animation

      if (options.animation.duration === 0) {
        if (this.lockedOnNodeId != undefined) {
          var _context3;

          this.viewFunction = bind$2(_context3 = this._lockedRedraw).call(_context3, this);
          this.body.emitter.on("initRedraw", this.viewFunction);
        } else {
          this.body.view.scale = this.targetScale;
          this.body.view.translation = this.targetTranslation;
          this.body.emitter.emit("_requestRedraw");
        }
      } else {
        var _context4;

        this.animationSpeed = 1 / (60 * options.animation.duration * 0.001) || 1 / 60; // 60 for 60 seconds, 0.001 for milli's

        this.animationEasingFunction = options.animation.easingFunction;
        this.viewFunction = bind$2(_context4 = this._transitionRedraw).call(_context4, this);
        this.body.emitter.on("initRedraw", this.viewFunction);
        this.body.emitter.emit("_startRendering");
      }
    }
    /**
     * used to animate smoothly by hijacking the redraw function.
     * @private
     */

  }, {
    key: "_lockedRedraw",
    value: function _lockedRedraw() {
      var nodePosition = {
        x: this.body.nodes[this.lockedOnNodeId].x,
        y: this.body.nodes[this.lockedOnNodeId].y
      };
      var viewCenter = this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
      var distanceFromCenter = {
        // offset from view, distance view has to change by these x and y to center the node
        x: viewCenter.x - nodePosition.x,
        y: viewCenter.y - nodePosition.y
      };
      var sourceTranslation = this.body.view.translation;
      var targetTranslation = {
        x: sourceTranslation.x + distanceFromCenter.x * this.body.view.scale + this.lockedOnNodeOffset.x,
        y: sourceTranslation.y + distanceFromCenter.y * this.body.view.scale + this.lockedOnNodeOffset.y
      };
      this.body.view.translation = targetTranslation;
    }
    /**
     * Resets state of a locked on Node
     */

  }, {
    key: "releaseNode",
    value: function releaseNode() {
      if (this.lockedOnNodeId !== undefined && this.viewFunction !== undefined) {
        this.body.emitter.off("initRedraw", this.viewFunction);
        this.lockedOnNodeId = undefined;
        this.lockedOnNodeOffset = undefined;
      }
    }
    /**
     * @param {boolean} [finished=false]
     * @private
     */

  }, {
    key: "_transitionRedraw",
    value: function _transitionRedraw() {
      var finished = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.easingTime += this.animationSpeed;
      this.easingTime = finished === true ? 1.0 : this.easingTime;
      var progress = easingFunctions[this.animationEasingFunction](this.easingTime);
      this.body.view.scale = this.sourceScale + (this.targetScale - this.sourceScale) * progress;
      this.body.view.translation = {
        x: this.sourceTranslation.x + (this.targetTranslation.x - this.sourceTranslation.x) * progress,
        y: this.sourceTranslation.y + (this.targetTranslation.y - this.sourceTranslation.y) * progress
      }; // cleanup

      if (this.easingTime >= 1.0) {
        this.body.emitter.off("initRedraw", this.viewFunction);
        this.easingTime = 0;

        if (this.lockedOnNodeId != undefined) {
          var _context5;

          this.viewFunction = bind$2(_context5 = this._lockedRedraw).call(_context5, this);
          this.body.emitter.on("initRedraw", this.viewFunction);
        }

        this.body.emitter.emit("animationFinished");
      }
    }
    /**
     *
     * @returns {number}
     */

  }, {
    key: "getScale",
    value: function getScale() {
      return this.body.view.scale;
    }
    /**
     *
     * @returns {{x: number, y: number}}
     */

  }, {
    key: "getViewPosition",
    value: function getViewPosition() {
      return this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
    }
  }]);

  return View;
}();

/**
 * Navigation Handler
 */

var NavigationHandler = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   */
  function NavigationHandler(body, canvas) {
    var _this = this;

    classCallCheck(this, NavigationHandler);

    this.body = body;
    this.canvas = canvas;
    this.iconsCreated = false;
    this.navigationHammers = [];
    this.boundFunctions = {};
    this.touchTime = 0;
    this.activated = false;
    this.body.emitter.on("activate", function () {
      _this.activated = true;

      _this.configureKeyboardBindings();
    });
    this.body.emitter.on("deactivate", function () {
      _this.activated = false;

      _this.configureKeyboardBindings();
    });
    this.body.emitter.on("destroy", function () {
      if (_this.keycharm !== undefined) {
        _this.keycharm.destroy();
      }
    });
    this.options = {};
  }
  /**
   *
   * @param {Object} options
   */


  createClass(NavigationHandler, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        this.options = options;
        this.create();
      }
    }
    /**
     * Creates or refreshes navigation and sets key bindings
     */

  }, {
    key: "create",
    value: function create() {
      if (this.options.navigationButtons === true) {
        if (this.iconsCreated === false) {
          this.loadNavigationElements();
        }
      } else if (this.iconsCreated === true) {
        this.cleanNavigation();
      }

      this.configureKeyboardBindings();
    }
    /**
     * Cleans up previous navigation items
     */

  }, {
    key: "cleanNavigation",
    value: function cleanNavigation() {
      // clean hammer bindings
      if (this.navigationHammers.length != 0) {
        for (var i = 0; i < this.navigationHammers.length; i++) {
          this.navigationHammers[i].destroy();
        }

        this.navigationHammers = [];
      } // clean up previous navigation items


      if (this.navigationDOM && this.navigationDOM['wrapper'] && this.navigationDOM['wrapper'].parentNode) {
        this.navigationDOM['wrapper'].parentNode.removeChild(this.navigationDOM['wrapper']);
      }

      this.iconsCreated = false;
    }
    /**
     * Creation of the navigation controls nodes. They are drawn over the rest of the nodes and are not affected by scale and translation
     * they have a triggerFunction which is called on click. If the position of the navigation controls is dependent
     * on this.frame.canvas.clientWidth or this.frame.canvas.clientHeight, we flag horizontalAlignLeft and verticalAlignTop false.
     * This means that the location will be corrected by the _relocateNavigation function on a size change of the canvas.
     *
     * @private
     */

  }, {
    key: "loadNavigationElements",
    value: function loadNavigationElements() {
      var _this2 = this;

      this.cleanNavigation();
      this.navigationDOM = {};
      var navigationDivs = ['up', 'down', 'left', 'right', 'zoomIn', 'zoomOut', 'zoomExtends'];
      var navigationDivActions = ['_moveUp', '_moveDown', '_moveLeft', '_moveRight', '_zoomIn', '_zoomOut', '_fit'];
      this.navigationDOM['wrapper'] = document.createElement('div');
      this.navigationDOM['wrapper'].className = 'vis-navigation';
      this.canvas.frame.appendChild(this.navigationDOM['wrapper']);

      for (var i = 0; i < navigationDivs.length; i++) {
        this.navigationDOM[navigationDivs[i]] = document.createElement('div');
        this.navigationDOM[navigationDivs[i]].className = 'vis-button vis-' + navigationDivs[i];
        this.navigationDOM['wrapper'].appendChild(this.navigationDOM[navigationDivs[i]]);
        var hammer$1 = new hammer(this.navigationDOM[navigationDivs[i]]);

        if (navigationDivActions[i] === "_fit") {
          var _context;

          onTouch(hammer$1, bind$2(_context = this._fit).call(_context, this));
        } else {
          var _context2;

          onTouch(hammer$1, bind$2(_context2 = this.bindToRedraw).call(_context2, this, navigationDivActions[i]));
        }

        this.navigationHammers.push(hammer$1);
      } // use a hammer for the release so we do not require the one used in the rest of the network
      // the one the rest uses can be overloaded by the manipulation system.


      var hammerFrame = new hammer(this.canvas.frame);
      onRelease(hammerFrame, function () {
        _this2._stopMovement();
      });
      this.navigationHammers.push(hammerFrame);
      this.iconsCreated = true;
    }
    /**
     *
     * @param {string} action
     */

  }, {
    key: "bindToRedraw",
    value: function bindToRedraw(action) {
      if (this.boundFunctions[action] === undefined) {
        var _context3;

        this.boundFunctions[action] = bind$2(_context3 = this[action]).call(_context3, this);
        this.body.emitter.on("initRedraw", this.boundFunctions[action]);
        this.body.emitter.emit("_startRendering");
      }
    }
    /**
     *
     * @param {string} action
     */

  }, {
    key: "unbindFromRedraw",
    value: function unbindFromRedraw(action) {
      if (this.boundFunctions[action] !== undefined) {
        this.body.emitter.off("initRedraw", this.boundFunctions[action]);
        this.body.emitter.emit("_stopRendering");
        delete this.boundFunctions[action];
      }
    }
    /**
     * this stops all movement induced by the navigation buttons
     *
     * @private
     */

  }, {
    key: "_fit",
    value: function _fit() {
      if (new Date().valueOf() - this.touchTime > 700) {
        // TODO: fix ugly hack to avoid hammer's double fireing of event (because we use release?)
        this.body.emitter.emit("fit", {
          duration: 700
        });
        this.touchTime = new Date().valueOf();
      }
    }
    /**
     * this stops all movement induced by the navigation buttons
     *
     * @private
     */

  }, {
    key: "_stopMovement",
    value: function _stopMovement() {
      for (var boundAction in this.boundFunctions) {
        if (Object.prototype.hasOwnProperty.call(this.boundFunctions, boundAction)) {
          this.body.emitter.off("initRedraw", this.boundFunctions[boundAction]);
          this.body.emitter.emit("_stopRendering");
        }
      }

      this.boundFunctions = {};
    }
    /**
     *
     * @private
     */

  }, {
    key: "_moveUp",
    value: function _moveUp() {
      this.body.view.translation.y += this.options.keyboard.speed.y;
    }
    /**
     *
     * @private
     */

  }, {
    key: "_moveDown",
    value: function _moveDown() {
      this.body.view.translation.y -= this.options.keyboard.speed.y;
    }
    /**
     *
     * @private
     */

  }, {
    key: "_moveLeft",
    value: function _moveLeft() {
      this.body.view.translation.x += this.options.keyboard.speed.x;
    }
    /**
     *
     * @private
     */

  }, {
    key: "_moveRight",
    value: function _moveRight() {
      this.body.view.translation.x -= this.options.keyboard.speed.x;
    }
    /**
     *
     * @private
     */

  }, {
    key: "_zoomIn",
    value: function _zoomIn() {
      var scaleOld = this.body.view.scale;
      var scale = this.body.view.scale * (1 + this.options.keyboard.speed.zoom);
      var translation = this.body.view.translation;
      var scaleFrac = scale / scaleOld;
      var tx = (1 - scaleFrac) * this.canvas.canvasViewCenter.x + translation.x * scaleFrac;
      var ty = (1 - scaleFrac) * this.canvas.canvasViewCenter.y + translation.y * scaleFrac;
      this.body.view.scale = scale;
      this.body.view.translation = {
        x: tx,
        y: ty
      };
      this.body.emitter.emit('zoom', {
        direction: '+',
        scale: this.body.view.scale,
        pointer: null
      });
    }
    /**
     *
     * @private
     */

  }, {
    key: "_zoomOut",
    value: function _zoomOut() {
      var scaleOld = this.body.view.scale;
      var scale = this.body.view.scale / (1 + this.options.keyboard.speed.zoom);
      var translation = this.body.view.translation;
      var scaleFrac = scale / scaleOld;
      var tx = (1 - scaleFrac) * this.canvas.canvasViewCenter.x + translation.x * scaleFrac;
      var ty = (1 - scaleFrac) * this.canvas.canvasViewCenter.y + translation.y * scaleFrac;
      this.body.view.scale = scale;
      this.body.view.translation = {
        x: tx,
        y: ty
      };
      this.body.emitter.emit('zoom', {
        direction: '-',
        scale: this.body.view.scale,
        pointer: null
      });
    }
    /**
     * bind all keys using keycharm.
     */

  }, {
    key: "configureKeyboardBindings",
    value: function configureKeyboardBindings() {
      var _this3 = this;

      if (this.keycharm !== undefined) {
        this.keycharm.destroy();
      }

      if (this.options.keyboard.enabled === true) {
        if (this.options.keyboard.bindToWindow === true) {
          this.keycharm = keycharm({
            container: window,
            preventDefault: true
          });
        } else {
          this.keycharm = keycharm({
            container: this.canvas.frame,
            preventDefault: true
          });
        }

        this.keycharm.reset();

        if (this.activated === true) {
          var _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19, _context20, _context21, _context22, _context23, _context24, _context25, _context26, _context27;

          bind$2(_context4 = this.keycharm).call(_context4, "up", function () {
            _this3.bindToRedraw("_moveUp");
          }, "keydown");

          bind$2(_context5 = this.keycharm).call(_context5, "down", function () {
            _this3.bindToRedraw("_moveDown");
          }, "keydown");

          bind$2(_context6 = this.keycharm).call(_context6, "left", function () {
            _this3.bindToRedraw("_moveLeft");
          }, "keydown");

          bind$2(_context7 = this.keycharm).call(_context7, "right", function () {
            _this3.bindToRedraw("_moveRight");
          }, "keydown");

          bind$2(_context8 = this.keycharm).call(_context8, "=", function () {
            _this3.bindToRedraw("_zoomIn");
          }, "keydown");

          bind$2(_context9 = this.keycharm).call(_context9, "num+", function () {
            _this3.bindToRedraw("_zoomIn");
          }, "keydown");

          bind$2(_context10 = this.keycharm).call(_context10, "num-", function () {
            _this3.bindToRedraw("_zoomOut");
          }, "keydown");

          bind$2(_context11 = this.keycharm).call(_context11, "-", function () {
            _this3.bindToRedraw("_zoomOut");
          }, "keydown");

          bind$2(_context12 = this.keycharm).call(_context12, "[", function () {
            _this3.bindToRedraw("_zoomOut");
          }, "keydown");

          bind$2(_context13 = this.keycharm).call(_context13, "]", function () {
            _this3.bindToRedraw("_zoomIn");
          }, "keydown");

          bind$2(_context14 = this.keycharm).call(_context14, "pageup", function () {
            _this3.bindToRedraw("_zoomIn");
          }, "keydown");

          bind$2(_context15 = this.keycharm).call(_context15, "pagedown", function () {
            _this3.bindToRedraw("_zoomOut");
          }, "keydown");

          bind$2(_context16 = this.keycharm).call(_context16, "up", function () {
            _this3.unbindFromRedraw("_moveUp");
          }, "keyup");

          bind$2(_context17 = this.keycharm).call(_context17, "down", function () {
            _this3.unbindFromRedraw("_moveDown");
          }, "keyup");

          bind$2(_context18 = this.keycharm).call(_context18, "left", function () {
            _this3.unbindFromRedraw("_moveLeft");
          }, "keyup");

          bind$2(_context19 = this.keycharm).call(_context19, "right", function () {
            _this3.unbindFromRedraw("_moveRight");
          }, "keyup");

          bind$2(_context20 = this.keycharm).call(_context20, "=", function () {
            _this3.unbindFromRedraw("_zoomIn");
          }, "keyup");

          bind$2(_context21 = this.keycharm).call(_context21, "num+", function () {
            _this3.unbindFromRedraw("_zoomIn");
          }, "keyup");

          bind$2(_context22 = this.keycharm).call(_context22, "num-", function () {
            _this3.unbindFromRedraw("_zoomOut");
          }, "keyup");

          bind$2(_context23 = this.keycharm).call(_context23, "-", function () {
            _this3.unbindFromRedraw("_zoomOut");
          }, "keyup");

          bind$2(_context24 = this.keycharm).call(_context24, "[", function () {
            _this3.unbindFromRedraw("_zoomOut");
          }, "keyup");

          bind$2(_context25 = this.keycharm).call(_context25, "]", function () {
            _this3.unbindFromRedraw("_zoomIn");
          }, "keyup");

          bind$2(_context26 = this.keycharm).call(_context26, "pageup", function () {
            _this3.unbindFromRedraw("_zoomIn");
          }, "keyup");

          bind$2(_context27 = this.keycharm).call(_context27, "pagedown", function () {
            _this3.unbindFromRedraw("_zoomOut");
          }, "keyup");
        }
      }
    }
  }]);

  return NavigationHandler;
}();

/**
 * Popup is a class to create a popup window with some text
 */

var Popup = /*#__PURE__*/function () {
  /**
   * @param {Element} container       The container object.
   * @param {string}  overflowMethod  How the popup should act to overflowing ('flip' or 'cap')
   */
  function Popup(container, overflowMethod) {
    classCallCheck(this, Popup);

    this.container = container;
    this.overflowMethod = overflowMethod || 'cap';
    this.x = 0;
    this.y = 0;
    this.padding = 5;
    this.hidden = false; // create the frame

    this.frame = document.createElement('div');
    this.frame.className = 'vis-tooltip';
    this.container.appendChild(this.frame);
  }
  /**
   * @param {number} x   Horizontal position of the popup window
   * @param {number} y   Vertical position of the popup window
   */


  createClass(Popup, [{
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = _parseInt$2(x);
      this.y = _parseInt$2(y);
    }
    /**
     * Set the content for the popup window. This can be HTML code or text.
     * @param {string | Element} content
     */

  }, {
    key: "setText",
    value: function setText(content) {
      if (content instanceof Element) {
        this.frame.innerHTML = '';
        this.frame.appendChild(content);
      } else {
        this.frame.innerHTML = content; // string containing text or HTML
      }
    }
    /**
     * Show the popup window
     * @param {boolean} [doShow]    Show or hide the window
     */

  }, {
    key: "show",
    value: function show(doShow) {
      if (doShow === undefined) {
        doShow = true;
      }

      if (doShow === true) {
        var height = this.frame.clientHeight;
        var width = this.frame.clientWidth;
        var maxHeight = this.frame.parentNode.clientHeight;
        var maxWidth = this.frame.parentNode.clientWidth;
        var left = 0,
            top = 0;

        if (this.overflowMethod == 'flip') {
          var isLeft = false,
              isTop = true; // Where around the position it's located

          if (this.y - height < this.padding) {
            isTop = false;
          }

          if (this.x + width > maxWidth - this.padding) {
            isLeft = true;
          }

          if (isLeft) {
            left = this.x - width;
          } else {
            left = this.x;
          }

          if (isTop) {
            top = this.y - height;
          } else {
            top = this.y;
          }
        } else {
          top = this.y - height;

          if (top + height + this.padding > maxHeight) {
            top = maxHeight - height - this.padding;
          }

          if (top < this.padding) {
            top = this.padding;
          }

          left = this.x;

          if (left + width + this.padding > maxWidth) {
            left = maxWidth - width - this.padding;
          }

          if (left < this.padding) {
            left = this.padding;
          }
        }

        this.frame.style.left = left + "px";
        this.frame.style.top = top + "px";
        this.frame.style.visibility = "visible";
        this.hidden = false;
      } else {
        this.hide();
      }
    }
    /**
     * Hide the popup window
     */

  }, {
    key: "hide",
    value: function hide() {
      this.hidden = true;
      this.frame.style.left = "0";
      this.frame.style.top = "0";
      this.frame.style.visibility = "hidden";
    }
    /**
     * Remove the popup window
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.frame.parentNode.removeChild(this.frame); // Remove element from DOM
    }
  }]);

  return Popup;
}();

/**
 * Handler for interactions
 */

var InteractionHandler = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   * @param {SelectionHandler} selectionHandler
   */
  function InteractionHandler(body, canvas, selectionHandler) {
    var _context, _context2, _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13;

    classCallCheck(this, InteractionHandler);

    this.body = body;
    this.canvas = canvas;
    this.selectionHandler = selectionHandler;
    this.navigationHandler = new NavigationHandler(body, canvas); // bind the events from hammer to functions in this object

    this.body.eventListeners.onTap = bind$2(_context = this.onTap).call(_context, this);
    this.body.eventListeners.onTouch = bind$2(_context2 = this.onTouch).call(_context2, this);
    this.body.eventListeners.onDoubleTap = bind$2(_context3 = this.onDoubleTap).call(_context3, this);
    this.body.eventListeners.onHold = bind$2(_context4 = this.onHold).call(_context4, this);
    this.body.eventListeners.onDragStart = bind$2(_context5 = this.onDragStart).call(_context5, this);
    this.body.eventListeners.onDrag = bind$2(_context6 = this.onDrag).call(_context6, this);
    this.body.eventListeners.onDragEnd = bind$2(_context7 = this.onDragEnd).call(_context7, this);
    this.body.eventListeners.onMouseWheel = bind$2(_context8 = this.onMouseWheel).call(_context8, this);
    this.body.eventListeners.onPinch = bind$2(_context9 = this.onPinch).call(_context9, this);
    this.body.eventListeners.onMouseMove = bind$2(_context10 = this.onMouseMove).call(_context10, this);
    this.body.eventListeners.onRelease = bind$2(_context11 = this.onRelease).call(_context11, this);
    this.body.eventListeners.onContext = bind$2(_context12 = this.onContext).call(_context12, this);
    this.touchTime = 0;
    this.drag = {};
    this.pinch = {};
    this.popup = undefined;
    this.popupObj = undefined;
    this.popupTimer = undefined;
    this.body.functions.getPointer = bind$2(_context13 = this.getPointer).call(_context13, this);
    this.options = {};
    this.defaultOptions = {
      dragNodes: true,
      dragView: true,
      hover: false,
      keyboard: {
        enabled: false,
        speed: {
          x: 10,
          y: 10,
          zoom: 0.02
        },
        bindToWindow: true
      },
      navigationButtons: false,
      tooltipDelay: 300,
      zoomView: true,
      zoomSpeed: 1
    };

    assign$2(this.options, this.defaultOptions);

    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(InteractionHandler, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this = this;

      this.body.emitter.on('destroy', function () {
        clearTimeout(_this.popupTimer);
        delete _this.body.functions.getPointer;
      });
    }
    /**
     *
     * @param {Object} options
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        // extend all but the values in fields
        var fields = ['hideEdgesOnDrag', 'hideEdgesOnZoom', 'hideNodesOnDrag', 'keyboard', 'multiselect', 'selectable', 'selectConnectedEdges'];
        selectiveNotDeepExtend(fields, this.options, options); // merge the keyboard options in.

        mergeOptions(this.options, options, 'keyboard');

        if (options.tooltip) {
          assign$2(this.options.tooltip, options.tooltip);

          if (options.tooltip.color) {
            this.options.tooltip.color = parseColor(options.tooltip.color);
          }
        }
      }

      this.navigationHandler.setOptions(this.options);
    }
    /**
     * Get the pointer location from a touch location
     * @param {{x: number, y: number}} touch
     * @return {{x: number, y: number}} pointer
     * @private
     */

  }, {
    key: "getPointer",
    value: function getPointer(touch) {
      return {
        x: touch.x - getAbsoluteLeft(this.canvas.frame.canvas),
        y: touch.y - getAbsoluteTop(this.canvas.frame.canvas)
      };
    }
    /**
     * On start of a touch gesture, store the pointer
     * @param {Event}  event   The event
     * @private
     */

  }, {
    key: "onTouch",
    value: function onTouch(event) {
      if (new Date().valueOf() - this.touchTime > 50) {
        this.drag.pointer = this.getPointer(event.center);
        this.drag.pinched = false;
        this.pinch.scale = this.body.view.scale; // to avoid double fireing of this event because we have two hammer instances. (on canvas and on frame)

        this.touchTime = new Date().valueOf();
      }
    }
    /**
     * handle tap/click event: select/unselect a node
     * @param {Event} event
     * @private
     */

  }, {
    key: "onTap",
    value: function onTap(event) {
      var pointer = this.getPointer(event.center);
      var multiselect = this.selectionHandler.options.multiselect && (event.changedPointers[0].ctrlKey || event.changedPointers[0].metaKey);
      this.checkSelectionChanges(pointer, event, multiselect);

      this.selectionHandler._generateClickEvent('click', event, pointer);
    }
    /**
     * handle doubletap event
     * @param {Event} event
     * @private
     */

  }, {
    key: "onDoubleTap",
    value: function onDoubleTap(event) {
      var pointer = this.getPointer(event.center);

      this.selectionHandler._generateClickEvent('doubleClick', event, pointer);
    }
    /**
     * handle long tap event: multi select nodes
     * @param {Event} event
     * @private
     */

  }, {
    key: "onHold",
    value: function onHold(event) {
      var pointer = this.getPointer(event.center);
      var multiselect = this.selectionHandler.options.multiselect;
      this.checkSelectionChanges(pointer, event, multiselect);

      this.selectionHandler._generateClickEvent('click', event, pointer);

      this.selectionHandler._generateClickEvent('hold', event, pointer);
    }
    /**
     * handle the release of the screen
     *
     * @param {Event} event
     * @private
     */

  }, {
    key: "onRelease",
    value: function onRelease(event) {
      if (new Date().valueOf() - this.touchTime > 10) {
        var pointer = this.getPointer(event.center);

        this.selectionHandler._generateClickEvent('release', event, pointer); // to avoid double fireing of this event because we have two hammer instances. (on canvas and on frame)


        this.touchTime = new Date().valueOf();
      }
    }
    /**
     *
     * @param {Event} event
     */

  }, {
    key: "onContext",
    value: function onContext(event) {
      var pointer = this.getPointer({
        x: event.clientX,
        y: event.clientY
      });

      this.selectionHandler._generateClickEvent('oncontext', event, pointer);
    }
    /**
     * Select and deselect nodes depending current selection change.
     *
     * For changing nodes, select/deselect events are fired.
     *
     * NOTE: For a given edge, if one connecting node is deselected and with the same
     *       click the other node is selected, no events for the edge will fire.
     *       It was selected and it will remain selected.
     *
     * TODO: This is all SelectionHandler calls; the method should be moved to there.
     *
     * @param {{x: number, y: number}} pointer
     * @param {Event} event
     * @param {boolean} [add=false]
     */

  }, {
    key: "checkSelectionChanges",
    value: function checkSelectionChanges(pointer, event) {
      var add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var previousSelection = this.selectionHandler.getSelection();
      var selected = false;

      if (add === true) {
        selected = this.selectionHandler.selectAdditionalOnPoint(pointer);
      } else {
        selected = this.selectionHandler.selectOnPoint(pointer);
      }

      var currentSelection = this.selectionHandler.getSelection(); // See NOTE in method comment for the reason to do it like this

      var deselectedItems = this._determineDifference(previousSelection, currentSelection);

      var selectedItems = this._determineDifference(currentSelection, previousSelection);

      if (deselectedItems.edges.length > 0) {
        this.selectionHandler._generateClickEvent('deselectEdge', event, pointer, previousSelection);

        selected = true;
      }

      if (deselectedItems.nodes.length > 0) {
        this.selectionHandler._generateClickEvent('deselectNode', event, pointer, previousSelection);

        selected = true;
      }

      if (selectedItems.nodes.length > 0) {
        this.selectionHandler._generateClickEvent('selectNode', event, pointer);

        selected = true;
      }

      if (selectedItems.edges.length > 0) {
        this.selectionHandler._generateClickEvent('selectEdge', event, pointer);

        selected = true;
      } // fire the select event if anything has been selected or deselected


      if (selected === true) {
        // select or unselect
        this.selectionHandler._generateClickEvent('select', event, pointer);
      }
    }
    /**
     * Remove all node and edge id's from the first set that are present in the second one.
     *
     * @param {{nodes: Array.<Node>, edges: Array.<vis.Edge>}} firstSet
     * @param {{nodes: Array.<Node>, edges: Array.<vis.Edge>}} secondSet
     * @returns {{nodes: Array.<Node>, edges: Array.<vis.Edge>}}
     * @private
     */

  }, {
    key: "_determineDifference",
    value: function _determineDifference(firstSet, secondSet) {
      var arrayDiff = function arrayDiff(firstArr, secondArr) {
        var result = [];

        for (var i = 0; i < firstArr.length; i++) {
          var value = firstArr[i];

          if (indexOf$3(secondArr).call(secondArr, value) === -1) {
            result.push(value);
          }
        }

        return result;
      };

      return {
        nodes: arrayDiff(firstSet.nodes, secondSet.nodes),
        edges: arrayDiff(firstSet.edges, secondSet.edges)
      };
    }
    /**
     * This function is called by onDragStart.
     * It is separated out because we can then overload it for the datamanipulation system.
     *
     * @param {Event} event
     * @private
     */

  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      // if already dragging, do not start
      // this can happen on touch screens with multiple fingers
      if (this.drag.dragging) {
        return;
      } //in case the touch event was triggered on an external div, do the initial touch now.


      if (this.drag.pointer === undefined) {
        this.onTouch(event);
      } // note: drag.pointer is set in onTouch to get the initial touch location


      var node = this.selectionHandler.getNodeAt(this.drag.pointer);
      this.drag.dragging = true;
      this.drag.selection = [];
      this.drag.translation = assign$2({}, this.body.view.translation); // copy the object

      this.drag.nodeId = undefined;

      if (event.srcEvent.shiftKey) {
        this.body.selectionBox.show = true;
        var pointer = this.getPointer(event.center);
        this.body.selectionBox.position.start = {
          x: this.canvas._XconvertDOMtoCanvas(pointer.x),
          y: this.canvas._YconvertDOMtoCanvas(pointer.y)
        };
        this.body.selectionBox.position.end = {
          x: this.canvas._XconvertDOMtoCanvas(pointer.x),
          y: this.canvas._YconvertDOMtoCanvas(pointer.y)
        };
      }

      if (node !== undefined && this.options.dragNodes === true) {
        this.drag.nodeId = node.id; // select the clicked node if not yet selected

        if (node.isSelected() === false) {
          this.selectionHandler.unselectAll();
          this.selectionHandler.selectObject(node);
        } // after select to contain the node


        this.selectionHandler._generateClickEvent('dragStart', event, this.drag.pointer);

        var selection = this.selectionHandler.selectionObj.nodes; // create an array with the selected nodes and their original location and status

        for (var nodeId in selection) {
          if (Object.prototype.hasOwnProperty.call(selection, nodeId)) {
            var object = selection[nodeId];
            var s = {
              id: object.id,
              node: object,
              // store original x, y, xFixed and yFixed, make the node temporarily Fixed
              x: object.x,
              y: object.y,
              xFixed: object.options.fixed.x,
              yFixed: object.options.fixed.y
            };
            object.options.fixed.x = true;
            object.options.fixed.y = true;
            this.drag.selection.push(s);
          }
        }
      } else {
        // fallback if no node is selected and thus the view is dragged.
        this.selectionHandler._generateClickEvent('dragStart', event, this.drag.pointer, undefined, true);
      }
    }
    /**
     * handle drag event
     * @param {Event} event
     * @private
     */

  }, {
    key: "onDrag",
    value: function onDrag(event) {
      var _this2 = this;

      if (this.drag.pinched === true) {
        return;
      } // remove the focus on node if it is focussed on by the focusOnNode


      this.body.emitter.emit('unlockNode');
      var pointer = this.getPointer(event.center);
      var selection = this.drag.selection;

      if (selection && selection.length && this.options.dragNodes === true) {
        this.selectionHandler._generateClickEvent('dragging', event, pointer); // calculate delta's and new location


        var deltaX = pointer.x - this.drag.pointer.x;
        var deltaY = pointer.y - this.drag.pointer.y; // update position of all selected nodes

        forEach$2(selection).call(selection, function (selection) {
          var node = selection.node; // only move the node if it was not fixed initially

          if (selection.xFixed === false) {
            node.x = _this2.canvas._XconvertDOMtoCanvas(_this2.canvas._XconvertCanvasToDOM(selection.x) + deltaX);
          } // only move the node if it was not fixed initially


          if (selection.yFixed === false) {
            node.y = _this2.canvas._YconvertDOMtoCanvas(_this2.canvas._YconvertCanvasToDOM(selection.y) + deltaY);
          }
        }); // start the simulation of the physics


        this.body.emitter.emit('startSimulation');
      } else {
        // create selection box
        if (event.srcEvent.shiftKey) {
          this.selectionHandler._generateClickEvent('dragging', event, pointer, undefined, true); // if the drag was not started properly because the click started outside the network div, start it now.


          if (this.drag.pointer === undefined) {
            this.onDragStart(event);
            return;
          }

          this.body.selectionBox.position.end = {
            x: this.canvas._XconvertDOMtoCanvas(pointer.x),
            y: this.canvas._YconvertDOMtoCanvas(pointer.y)
          };
          this.body.emitter.emit('_requestRedraw');
        } // move the network


        if (this.options.dragView === true && !event.srcEvent.shiftKey) {
          this.selectionHandler._generateClickEvent('dragging', event, pointer, undefined, true); // if the drag was not started properly because the click started outside the network div, start it now.


          if (this.drag.pointer === undefined) {
            this.onDragStart(event);
            return;
          }

          var diffX = pointer.x - this.drag.pointer.x;
          var diffY = pointer.y - this.drag.pointer.y;
          this.body.view.translation = {
            x: this.drag.translation.x + diffX,
            y: this.drag.translation.y + diffY
          };
          this.body.emitter.emit('_requestRedraw');
        }
      }
    }
    /**
     * handle drag start event
     * @param {Event} event
     * @private
     */

  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      var _this3 = this;

      this.drag.dragging = false;

      if (this.body.selectionBox.show) {
        var _context14;

        this.body.selectionBox.show = false;
        var selectionBoxPosition = this.body.selectionBox.position;
        var selectionBoxPositionMinMax = {
          minX: Math.min(selectionBoxPosition.start.x, selectionBoxPosition.end.x),
          minY: Math.min(selectionBoxPosition.start.y, selectionBoxPosition.end.y),
          maxX: Math.max(selectionBoxPosition.start.x, selectionBoxPosition.end.x),
          maxY: Math.max(selectionBoxPosition.start.y, selectionBoxPosition.end.y)
        };

        var toBeSelectedNodes = filter$2(_context14 = this.body.nodeIndices).call(_context14, function (nodeId) {
          var node = _this3.body.nodes[nodeId];
          return node.x >= selectionBoxPositionMinMax.minX && node.x <= selectionBoxPositionMinMax.maxX && node.y >= selectionBoxPositionMinMax.minY && node.y <= selectionBoxPositionMinMax.maxY;
        });

        forEach$2(toBeSelectedNodes).call(toBeSelectedNodes, function (nodeId) {
          return _this3.selectionHandler.selectObject(_this3.body.nodes[nodeId]);
        });

        this.selectionHandler._generateClickEvent('dragEnd', event, this.getPointer(event.center), undefined, true);

        this.body.emitter.emit('_requestRedraw');
      } else {
        var selection = this.drag.selection;

        if (selection && selection.length) {
          forEach$2(selection).call(selection, function (s) {
            // restore original xFixed and yFixed
            s.node.options.fixed.x = s.xFixed;
            s.node.options.fixed.y = s.yFixed;
          });

          this.selectionHandler._generateClickEvent('dragEnd', event, this.getPointer(event.center));

          this.body.emitter.emit('startSimulation');
        } else {
          this.selectionHandler._generateClickEvent('dragEnd', event, this.getPointer(event.center), undefined, true);

          this.body.emitter.emit('_requestRedraw');
        }
      }
    }
    /**
     * Handle pinch event
     * @param {Event}  event   The event
     * @private
     */

  }, {
    key: "onPinch",
    value: function onPinch(event) {
      var pointer = this.getPointer(event.center);
      this.drag.pinched = true;

      if (this.pinch['scale'] === undefined) {
        this.pinch.scale = 1;
      } // TODO: enabled moving while pinching?


      var scale = this.pinch.scale * event.scale;
      this.zoom(scale, pointer);
    }
    /**
     * Zoom the network in or out
     * @param {number} scale a number around 1, and between 0.01 and 10
     * @param {{x: number, y: number}} pointer    Position on screen
     * @private
     */

  }, {
    key: "zoom",
    value: function zoom(scale, pointer) {
      if (this.options.zoomView === true) {
        var scaleOld = this.body.view.scale;

        if (scale < 0.00001) {
          scale = 0.00001;
        }

        if (scale > 10) {
          scale = 10;
        }

        var preScaleDragPointer = undefined;

        if (this.drag !== undefined) {
          if (this.drag.dragging === true) {
            preScaleDragPointer = this.canvas.DOMtoCanvas(this.drag.pointer);
          }
        } // + this.canvas.frame.canvas.clientHeight / 2


        var translation = this.body.view.translation;
        var scaleFrac = scale / scaleOld;
        var tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
        var ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;
        this.body.view.scale = scale;
        this.body.view.translation = {
          x: tx,
          y: ty
        };

        if (preScaleDragPointer != undefined) {
          var postScaleDragPointer = this.canvas.canvasToDOM(preScaleDragPointer);
          this.drag.pointer.x = postScaleDragPointer.x;
          this.drag.pointer.y = postScaleDragPointer.y;
        }

        this.body.emitter.emit('_requestRedraw');

        if (scaleOld < scale) {
          this.body.emitter.emit('zoom', {
            direction: '+',
            scale: this.body.view.scale,
            pointer: pointer
          });
        } else {
          this.body.emitter.emit('zoom', {
            direction: '-',
            scale: this.body.view.scale,
            pointer: pointer
          });
        }
      }
    }
    /**
     * Event handler for mouse wheel event, used to zoom the timeline
     * See http://adomas.org/javascript-mouse-wheel/
     *     https://github.com/EightMedia/hammer.js/issues/256
     * @param {MouseEvent}  event
     * @private
     */

  }, {
    key: "onMouseWheel",
    value: function onMouseWheel(event) {
      if (this.options.zoomView === true) {
        // If delta is nonzero, handle it.
        // Basically, delta is now positive if wheel was scrolled up,
        // and negative, if wheel was scrolled down.
        if (event.deltaY !== 0) {
          // calculate the new scale
          var scale = this.body.view.scale;
          scale *= 1 + (event.deltaY < 0 ? 1 : -1) * (this.options.zoomSpeed * 0.1); // calculate the pointer location

          var pointer = this.getPointer({
            x: event.clientX,
            y: event.clientY
          }); // apply the new scale

          this.zoom(scale, pointer);
        } // Prevent default actions caused by mouse wheel.


        event.preventDefault();
      }
    }
    /**
     * Mouse move handler for checking whether the title moves over a node with a title.
     * @param  {Event} event
     * @private
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this4 = this;

      var pointer = this.getPointer({
        x: event.clientX,
        y: event.clientY
      });
      var popupVisible = false; // check if the previously selected node is still selected

      if (this.popup !== undefined) {
        if (this.popup.hidden === false) {
          this._checkHidePopup(pointer);
        } // if the popup was not hidden above


        if (this.popup.hidden === false) {
          popupVisible = true;
          this.popup.setPosition(pointer.x + 3, pointer.y - 5);
          this.popup.show();
        }
      } // if we bind the keyboard to the div, we have to highlight it to use it. This highlights it on mouse over.


      if (this.options.keyboard.bindToWindow === false && this.options.keyboard.enabled === true) {
        this.canvas.frame.focus();
      } // start a timeout that will check if the mouse is positioned above an element


      if (popupVisible === false) {
        if (this.popupTimer !== undefined) {
          clearInterval(this.popupTimer); // stop any running calculationTimer

          this.popupTimer = undefined;
        }

        if (!this.drag.dragging) {
          this.popupTimer = setTimeout$2(function () {
            return _this4._checkShowPopup(pointer);
          }, this.options.tooltipDelay);
        }
      } // adding hover highlights


      if (this.options.hover === true) {
        this.selectionHandler.hoverObject(event, pointer);
      }
    }
    /**
     * Check if there is an element on the given position in the network
     * (a node or edge). If so, and if this element has a title,
     * show a popup window with its title.
     *
     * @param {{x:number, y:number}} pointer
     * @private
     */

  }, {
    key: "_checkShowPopup",
    value: function _checkShowPopup(pointer) {
      var x = this.canvas._XconvertDOMtoCanvas(pointer.x);

      var y = this.canvas._YconvertDOMtoCanvas(pointer.y);

      var pointerObj = {
        left: x,
        top: y,
        right: x,
        bottom: y
      };
      var previousPopupObjId = this.popupObj === undefined ? undefined : this.popupObj.id;
      var nodeUnderCursor = false;
      var popupType = 'node'; // check if a node is under the cursor.

      if (this.popupObj === undefined) {
        // search the nodes for overlap, select the top one in case of multiple nodes
        var nodeIndices = this.body.nodeIndices;
        var nodes = this.body.nodes;
        var node;
        var overlappingNodes = [];

        for (var i = 0; i < nodeIndices.length; i++) {
          node = nodes[nodeIndices[i]];

          if (node.isOverlappingWith(pointerObj) === true) {
            nodeUnderCursor = true;

            if (node.getTitle() !== undefined) {
              overlappingNodes.push(nodeIndices[i]);
            }
          }
        }

        if (overlappingNodes.length > 0) {
          // if there are overlapping nodes, select the last one, this is the one which is drawn on top of the others
          this.popupObj = nodes[overlappingNodes[overlappingNodes.length - 1]]; // if you hover over a node, the title of the edge is not supposed to be shown.

          nodeUnderCursor = true;
        }
      }

      if (this.popupObj === undefined && nodeUnderCursor === false) {
        // search the edges for overlap
        var edgeIndices = this.body.edgeIndices;
        var edges = this.body.edges;
        var edge;
        var overlappingEdges = [];

        for (var _i = 0; _i < edgeIndices.length; _i++) {
          edge = edges[edgeIndices[_i]];

          if (edge.isOverlappingWith(pointerObj) === true) {
            if (edge.connected === true && edge.getTitle() !== undefined) {
              overlappingEdges.push(edgeIndices[_i]);
            }
          }
        }

        if (overlappingEdges.length > 0) {
          this.popupObj = edges[overlappingEdges[overlappingEdges.length - 1]];
          popupType = 'edge';
        }
      }

      if (this.popupObj !== undefined) {
        // show popup message window
        if (this.popupObj.id !== previousPopupObjId) {
          if (this.popup === undefined) {
            this.popup = new Popup(this.canvas.frame);
          }

          this.popup.popupTargetType = popupType;
          this.popup.popupTargetId = this.popupObj.id; // adjust a small offset such that the mouse cursor is located in the
          // bottom left location of the popup, and you can easily move over the
          // popup area

          this.popup.setPosition(pointer.x + 3, pointer.y - 5);
          this.popup.setText(this.popupObj.getTitle());
          this.popup.show();
          this.body.emitter.emit('showPopup', this.popupObj.id);
        }
      } else {
        if (this.popup !== undefined) {
          this.popup.hide();
          this.body.emitter.emit('hidePopup');
        }
      }
    }
    /**
     * Check if the popup must be hidden, which is the case when the mouse is no
     * longer hovering on the object
     * @param {{x:number, y:number}} pointer
     * @private
     */

  }, {
    key: "_checkHidePopup",
    value: function _checkHidePopup(pointer) {
      var pointerObj = this.selectionHandler._pointerToPositionObject(pointer);

      var stillOnObj = false;

      if (this.popup.popupTargetType === 'node') {
        if (this.body.nodes[this.popup.popupTargetId] !== undefined) {
          stillOnObj = this.body.nodes[this.popup.popupTargetId].isOverlappingWith(pointerObj); // if the mouse is still one the node, we have to check if it is not also on one that is drawn on top of it.
          // we initially only check stillOnObj because this is much faster.

          if (stillOnObj === true) {
            var overNode = this.selectionHandler.getNodeAt(pointer);
            stillOnObj = overNode === undefined ? false : overNode.id === this.popup.popupTargetId;
          }
        }
      } else {
        if (this.selectionHandler.getNodeAt(pointer) === undefined) {
          if (this.body.edges[this.popup.popupTargetId] !== undefined) {
            stillOnObj = this.body.edges[this.popup.popupTargetId].isOverlappingWith(pointerObj);
          }
        }
      }

      if (stillOnObj === false) {
        this.popupObj = undefined;
        this.popup.hide();
        this.body.emitter.emit('hidePopup');
      }
    }
  }]);

  return InteractionHandler;
}();

/**
 * The handler for selections
 */

var SelectionHandler = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   */
  function SelectionHandler(body, canvas) {
    var _this = this;

    classCallCheck(this, SelectionHandler);

    this.body = body;
    this.canvas = canvas;
    this.selectionObj = {
      nodes: [],
      edges: []
    };
    this.hoverObj = {
      nodes: {},
      edges: {}
    };
    this.options = {};
    this.defaultOptions = {
      multiselect: false,
      selectable: true,
      selectConnectedEdges: true,
      hoverConnectedEdges: true
    };

    assign$2(this.options, this.defaultOptions);

    this.body.emitter.on("_dataChanged", function () {
      _this.updateSelection();
    });
  }
  /**
   *
   * @param {Object} [options]
   */


  createClass(SelectionHandler, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (options !== undefined) {
        var fields = ['multiselect', 'hoverConnectedEdges', 'selectable', 'selectConnectedEdges'];
        selectiveDeepExtend(fields, this.options, options);
      }
    }
    /**
     * handles the selection part of the tap;
     *
     * @param {{x: number, y: number}} pointer
     * @returns {boolean}
     */

  }, {
    key: "selectOnPoint",
    value: function selectOnPoint(pointer) {
      var selected = false;

      if (this.options.selectable === true) {
        var obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer); // unselect after getting the objects in order to restore width and height.

        this.unselectAll();

        if (obj !== undefined) {
          selected = this.selectObject(obj);
        }

        this.body.emitter.emit("_requestRedraw");
      }

      return selected;
    }
    /**
     *
     * @param {{x: number, y: number}} pointer
     * @returns {boolean}
     */

  }, {
    key: "selectAdditionalOnPoint",
    value: function selectAdditionalOnPoint(pointer) {
      var selectionChanged = false;

      if (this.options.selectable === true) {
        var obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer);

        if (obj !== undefined) {
          selectionChanged = true;

          if (obj.isSelected() === true) {
            this.deselectObject(obj);
          } else {
            this.selectObject(obj);
          }

          this.body.emitter.emit("_requestRedraw");
        }
      }

      return selectionChanged;
    }
    /**
     * Create an object containing the standard fields for an event.
     *
     * @param {Event} event
     * @param {{x: number, y: number}} pointer Object with the x and y screen coordinates of the mouse
     * @returns {{}}
     * @private
     */

  }, {
    key: "_initBaseEvent",
    value: function _initBaseEvent(event, pointer) {
      var properties = {};
      properties['pointer'] = {
        DOM: {
          x: pointer.x,
          y: pointer.y
        },
        canvas: this.canvas.DOMtoCanvas(pointer)
      };
      properties['event'] = event;
      return properties;
    }
    /**
     * Generate an event which the user can catch.
     *
     * This adds some extra data to the event with respect to cursor position and
     * selected nodes and edges.
     *
     * @param {string} eventType                          Name of event to send
     * @param {Event}  event
     * @param {{x: number, y: number}} pointer            Object with the x and y screen coordinates of the mouse
     * @param {Object|undefined} oldSelection             If present, selection state before event occured
     * @param {boolean|undefined} [emptySelection=false]  Indicate if selection data should be passed
     */

  }, {
    key: "_generateClickEvent",
    value: function _generateClickEvent(eventType, event, pointer, oldSelection) {
      var emptySelection = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var properties = this._initBaseEvent(event, pointer);

      if (emptySelection === true) {
        properties.nodes = [];
        properties.edges = [];
      } else {
        var tmp = this.getSelection();
        properties.nodes = tmp.nodes;
        properties.edges = tmp.edges;
      }

      if (oldSelection !== undefined) {
        properties['previousSelection'] = oldSelection;
      }

      if (eventType == 'click') {
        // For the time being, restrict this functionality to
        // just the click event.
        properties.items = this.getClickedItems(pointer);
      }

      if (event.controlEdge !== undefined) {
        properties.controlEdge = event.controlEdge;
      }

      this.body.emitter.emit(eventType, properties);
    }
    /**
     *
     * @param {Object} obj
     * @param {boolean} [highlightEdges=this.options.selectConnectedEdges]
     * @returns {boolean}
     */

  }, {
    key: "selectObject",
    value: function selectObject(obj) {
      var highlightEdges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.selectConnectedEdges;

      if (obj !== undefined) {
        if (obj instanceof Node) {
          if (highlightEdges === true) {
            this._selectConnectedEdges(obj);
          }
        }

        obj.select();

        this._addToSelection(obj);

        return true;
      }

      return false;
    }
    /**
     *
     * @param {Object} obj
     */

  }, {
    key: "deselectObject",
    value: function deselectObject(obj) {
      if (obj.isSelected() === true) {
        obj.selected = false;

        this._removeFromSelection(obj);
      }
    }
    /**
     * retrieve all nodes overlapping with given object
     * @param {Object} object  An object with parameters left, top, right, bottom
     * @return {number[]}   An array with id's of the overlapping nodes
     * @private
     */

  }, {
    key: "_getAllNodesOverlappingWith",
    value: function _getAllNodesOverlappingWith(object) {
      var overlappingNodes = [];
      var nodes = this.body.nodes;

      for (var i = 0; i < this.body.nodeIndices.length; i++) {
        var nodeId = this.body.nodeIndices[i];

        if (nodes[nodeId].isOverlappingWith(object)) {
          overlappingNodes.push(nodeId);
        }
      }

      return overlappingNodes;
    }
    /**
     * Return a position object in canvasspace from a single point in screenspace
     *
     * @param {{x: number, y: number}} pointer
     * @returns {{left: number, top: number, right: number, bottom: number}}
     * @private
     */

  }, {
    key: "_pointerToPositionObject",
    value: function _pointerToPositionObject(pointer) {
      var canvasPos = this.canvas.DOMtoCanvas(pointer);
      return {
        left: canvasPos.x - 1,
        top: canvasPos.y + 1,
        right: canvasPos.x + 1,
        bottom: canvasPos.y - 1
      };
    }
    /**
     * Get the top node at the passed point (like a click)
     *
     * @param {{x: number, y: number}} pointer
     * @param {boolean} [returnNode=true]
     * @return {Node | undefined} node
     */

  }, {
    key: "getNodeAt",
    value: function getNodeAt(pointer) {
      var returnNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // we first check if this is an navigation controls element
      var positionObject = this._pointerToPositionObject(pointer);

      var overlappingNodes = this._getAllNodesOverlappingWith(positionObject); // if there are overlapping nodes, select the last one, this is the
      // one which is drawn on top of the others


      if (overlappingNodes.length > 0) {
        if (returnNode === true) {
          return this.body.nodes[overlappingNodes[overlappingNodes.length - 1]];
        } else {
          return overlappingNodes[overlappingNodes.length - 1];
        }
      } else {
        return undefined;
      }
    }
    /**
     * retrieve all edges overlapping with given object, selector is around center
     * @param {Object} object  An object with parameters left, top, right, bottom
     * @param {number[]} overlappingEdges An array with id's of the overlapping nodes
     * @private
     */

  }, {
    key: "_getEdgesOverlappingWith",
    value: function _getEdgesOverlappingWith(object, overlappingEdges) {
      var edges = this.body.edges;

      for (var i = 0; i < this.body.edgeIndices.length; i++) {
        var edgeId = this.body.edgeIndices[i];

        if (edges[edgeId].isOverlappingWith(object)) {
          overlappingEdges.push(edgeId);
        }
      }
    }
    /**
     * retrieve all nodes overlapping with given object
     * @param {Object} object  An object with parameters left, top, right, bottom
     * @return {number[]}   An array with id's of the overlapping nodes
     * @private
     */

  }, {
    key: "_getAllEdgesOverlappingWith",
    value: function _getAllEdgesOverlappingWith(object) {
      var overlappingEdges = [];

      this._getEdgesOverlappingWith(object, overlappingEdges);

      return overlappingEdges;
    }
    /**
     * Get the edges nearest to the passed point (like a click)
     *
     * @param {{x: number, y: number}} pointer
     * @param {boolean} [returnEdge=true]
     * @return {Edge | undefined} node
     */

  }, {
    key: "getEdgeAt",
    value: function getEdgeAt(pointer) {
      var returnEdge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // Iterate over edges, pick closest within 10
      var canvasPos = this.canvas.DOMtoCanvas(pointer);
      var mindist = 10;
      var overlappingEdge = null;
      var edges = this.body.edges;

      for (var i = 0; i < this.body.edgeIndices.length; i++) {
        var edgeId = this.body.edgeIndices[i];
        var edge = edges[edgeId];

        if (edge.connected) {
          var xFrom = edge.from.x;
          var yFrom = edge.from.y;
          var xTo = edge.to.x;
          var yTo = edge.to.y;
          var dist = edge.edgeType.getDistanceToEdge(xFrom, yFrom, xTo, yTo, canvasPos.x, canvasPos.y);

          if (dist < mindist) {
            overlappingEdge = edgeId;
            mindist = dist;
          }
        }
      }

      if (overlappingEdge !== null) {
        if (returnEdge === true) {
          return this.body.edges[overlappingEdge];
        } else {
          return overlappingEdge;
        }
      } else {
        return undefined;
      }
    }
    /**
     * Add object to the selection array.
     *
     * @param {Object} obj
     * @private
     */

  }, {
    key: "_addToSelection",
    value: function _addToSelection(obj) {
      if (obj instanceof Node) {
        this.selectionObj.nodes[obj.id] = obj;
      } else {
        this.selectionObj.edges[obj.id] = obj;
      }
    }
    /**
     * Add object to the selection array.
     *
     * @param {Object} obj
     * @private
     */

  }, {
    key: "_addToHover",
    value: function _addToHover(obj) {
      if (obj instanceof Node) {
        this.hoverObj.nodes[obj.id] = obj;
      } else {
        this.hoverObj.edges[obj.id] = obj;
      }
    }
    /**
     * Remove a single option from selection.
     *
     * @param {Object} obj
     * @private
     */

  }, {
    key: "_removeFromSelection",
    value: function _removeFromSelection(obj) {
      if (obj instanceof Node) {
        delete this.selectionObj.nodes[obj.id];

        this._unselectConnectedEdges(obj);
      } else {
        delete this.selectionObj.edges[obj.id];
      }
    }
    /**
     * Unselect all. The selectionObj is useful for this.
     */

  }, {
    key: "unselectAll",
    value: function unselectAll() {
      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          this.selectionObj.nodes[nodeId].unselect();
        }
      }

      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          this.selectionObj.edges[edgeId].unselect();
        }
      }

      this.selectionObj = {
        nodes: {},
        edges: {}
      };
    }
    /**
     * return the number of selected nodes
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getSelectedNodeCount",
    value: function _getSelectedNodeCount() {
      var count = 0;

      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          count += 1;
        }
      }

      return count;
    }
    /**
     * return the selected node
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getSelectedNode",
    value: function _getSelectedNode() {
      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          return this.selectionObj.nodes[nodeId];
        }
      }

      return undefined;
    }
    /**
     * return the selected edge
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getSelectedEdge",
    value: function _getSelectedEdge() {
      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          return this.selectionObj.edges[edgeId];
        }
      }

      return undefined;
    }
    /**
     * return the number of selected edges
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getSelectedEdgeCount",
    value: function _getSelectedEdgeCount() {
      var count = 0;

      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          count += 1;
        }
      }

      return count;
    }
    /**
     * return the number of selected objects.
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getSelectedObjectCount",
    value: function _getSelectedObjectCount() {
      var count = 0;

      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          count += 1;
        }
      }

      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          count += 1;
        }
      }

      return count;
    }
    /**
     * Check if anything is selected
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_selectionIsEmpty",
    value: function _selectionIsEmpty() {
      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          return false;
        }
      }

      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          return false;
        }
      }

      return true;
    }
    /**
     * check if one of the selected nodes is a cluster.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_clusterInSelection",
    value: function _clusterInSelection() {
      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          if (this.selectionObj.nodes[nodeId].clusterSize > 1) {
            return true;
          }
        }
      }

      return false;
    }
    /**
     * select the edges connected to the node that is being selected
     *
     * @param {Node} node
     * @private
     */

  }, {
    key: "_selectConnectedEdges",
    value: function _selectConnectedEdges(node) {
      for (var i = 0; i < node.edges.length; i++) {
        var edge = node.edges[i];
        edge.select();

        this._addToSelection(edge);
      }
    }
    /**
     * select the edges connected to the node that is being selected
     *
     * @param {Node} node
     * @private
     */

  }, {
    key: "_hoverConnectedEdges",
    value: function _hoverConnectedEdges(node) {
      for (var i = 0; i < node.edges.length; i++) {
        var edge = node.edges[i];
        edge.hover = true;

        this._addToHover(edge);
      }
    }
    /**
     * unselect the edges connected to the node that is being selected
     *
     * @param {Node} node
     * @private
     */

  }, {
    key: "_unselectConnectedEdges",
    value: function _unselectConnectedEdges(node) {
      for (var i = 0; i < node.edges.length; i++) {
        var edge = node.edges[i];
        edge.unselect();

        this._removeFromSelection(edge);
      }
    }
    /**
     * Remove the highlight from a node or edge, in response to mouse movement
     *
     * @param {Event}  event
     * @param {{x: number, y: number}} pointer object with the x and y screen coordinates of the mouse
     * @param {Node|vis.Edge} object
     * @private
     */

  }, {
    key: "emitBlurEvent",
    value: function emitBlurEvent(event, pointer, object) {
      var properties = this._initBaseEvent(event, pointer);

      if (object.hover === true) {
        object.hover = false;

        if (object instanceof Node) {
          properties.node = object.id;
          this.body.emitter.emit("blurNode", properties);
        } else {
          properties.edge = object.id;
          this.body.emitter.emit("blurEdge", properties);
        }
      }
    }
    /**
     * Create the highlight for a node or edge, in response to mouse movement
     *
     * @param {Event}  event
     * @param {{x: number, y: number}} pointer object with the x and y screen coordinates of the mouse
     * @param {Node|vis.Edge} object
     * @returns {boolean} hoverChanged
     * @private
     */

  }, {
    key: "emitHoverEvent",
    value: function emitHoverEvent(event, pointer, object) {
      var properties = this._initBaseEvent(event, pointer);

      var hoverChanged = false;

      if (object.hover === false) {
        object.hover = true;

        this._addToHover(object);

        hoverChanged = true;

        if (object instanceof Node) {
          properties.node = object.id;
          this.body.emitter.emit("hoverNode", properties);
        } else {
          properties.edge = object.id;
          this.body.emitter.emit("hoverEdge", properties);
        }
      }

      return hoverChanged;
    }
    /**
     * Perform actions in response to a mouse movement.
     *
     * @param {Event}  event
     * @param {{x: number, y: number}} pointer | object with the x and y screen coordinates of the mouse
     */

  }, {
    key: "hoverObject",
    value: function hoverObject(event, pointer) {
      var object = this.getNodeAt(pointer);

      if (object === undefined) {
        object = this.getEdgeAt(pointer);
      }

      var hoverChanged = false; // remove all node hover highlights

      for (var nodeId in this.hoverObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.hoverObj.nodes, nodeId)) {
          if (object === undefined || object instanceof Node && object.id != nodeId || object instanceof Edge) {
            this.emitBlurEvent(event, pointer, this.hoverObj.nodes[nodeId]);
            delete this.hoverObj.nodes[nodeId];
            hoverChanged = true;
          }
        }
      } // removing all edge hover highlights


      for (var edgeId in this.hoverObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.hoverObj.edges, edgeId)) {
          // if the hover has been changed here it means that the node has been hovered over or off
          // we then do not use the emitBlurEvent method here.
          if (hoverChanged === true) {
            this.hoverObj.edges[edgeId].hover = false;
            delete this.hoverObj.edges[edgeId];
          } // if the blur remains the same and the object is undefined (mouse off) or another
          // edge has been hovered, or another node has been hovered we blur the edge.
          else if (object === undefined || object instanceof Edge && object.id != edgeId || object instanceof Node && !object.hover) {
              this.emitBlurEvent(event, pointer, this.hoverObj.edges[edgeId]);
              delete this.hoverObj.edges[edgeId];
              hoverChanged = true;
            }
        }
      }

      if (object !== undefined) {
        var hoveredEdgesCount = keys$3(this.hoverObj.edges).length;

        var hoveredNodesCount = keys$3(this.hoverObj.nodes).length;

        var newOnlyHoveredEdge = object instanceof Edge && hoveredEdgesCount === 0 && hoveredNodesCount === 0;
        var newOnlyHoveredNode = object instanceof Node && hoveredEdgesCount === 0 && hoveredNodesCount === 0;

        if (hoverChanged || newOnlyHoveredEdge || newOnlyHoveredNode) {
          hoverChanged = this.emitHoverEvent(event, pointer, object);
        }

        if (object instanceof Node && this.options.hoverConnectedEdges === true) {
          this._hoverConnectedEdges(object);
        }
      }

      if (hoverChanged === true) {
        this.body.emitter.emit('_requestRedraw');
      }
    }
    /**
     *
     * retrieve the currently selected objects
     * @return {{nodes: Array.<string>, edges: Array.<string>}} selection
     */

  }, {
    key: "getSelection",
    value: function getSelection() {
      var nodeIds = this.getSelectedNodes();
      var edgeIds = this.getSelectedEdges();
      return {
        nodes: nodeIds,
        edges: edgeIds
      };
    }
    /**
     *
     * retrieve the currently selected nodes
     * @return {string[]} selection    An array with the ids of the
     *                                            selected nodes.
     */

  }, {
    key: "getSelectedNodes",
    value: function getSelectedNodes() {
      var idArray = [];

      if (this.options.selectable === true) {
        for (var nodeId in this.selectionObj.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
            idArray.push(this.selectionObj.nodes[nodeId].id);
          }
        }
      }

      return idArray;
    }
    /**
     *
     * retrieve the currently selected edges
     * @return {Array} selection    An array with the ids of the
     *                                            selected nodes.
     */

  }, {
    key: "getSelectedEdges",
    value: function getSelectedEdges() {
      var idArray = [];

      if (this.options.selectable === true) {
        for (var edgeId in this.selectionObj.edges) {
          if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
            idArray.push(this.selectionObj.edges[edgeId].id);
          }
        }
      }

      return idArray;
    }
    /**
     * Updates the current selection
     * @param {{nodes: Array.<string>, edges: Array.<string>}} selection
     * @param {Object} options                                 Options
     */

  }, {
    key: "setSelection",
    value: function setSelection(selection) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i, id;
      if (!selection || !selection.nodes && !selection.edges) throw 'Selection must be an object with nodes and/or edges properties'; // first unselect any selected node, if option is true or undefined

      if (options.unselectAll || options.unselectAll === undefined) {
        this.unselectAll();
      }

      if (selection.nodes) {
        for (i = 0; i < selection.nodes.length; i++) {
          id = selection.nodes[i];
          var node = this.body.nodes[id];

          if (!node) {
            throw new RangeError('Node with id "' + id + '" not found');
          } // don't select edges with it


          this.selectObject(node, options.highlightEdges);
        }
      }

      if (selection.edges) {
        for (i = 0; i < selection.edges.length; i++) {
          id = selection.edges[i];
          var edge = this.body.edges[id];

          if (!edge) {
            throw new RangeError('Edge with id "' + id + '" not found');
          }

          this.selectObject(edge);
        }
      }

      this.body.emitter.emit('_requestRedraw');
    }
    /**
     * select zero or more nodes with the option to highlight edges
     * @param {number[] | string[]} selection     An array with the ids of the
     *                                            selected nodes.
     * @param {boolean} [highlightEdges]
     */

  }, {
    key: "selectNodes",
    value: function selectNodes(selection) {
      var highlightEdges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!selection || selection.length === undefined) throw 'Selection must be an array with ids';
      this.setSelection({
        nodes: selection
      }, {
        highlightEdges: highlightEdges
      });
    }
    /**
     * select zero or more edges
     * @param {number[] | string[]} selection     An array with the ids of the
     *                                            selected nodes.
     */

  }, {
    key: "selectEdges",
    value: function selectEdges(selection) {
      if (!selection || selection.length === undefined) throw 'Selection must be an array with ids';
      this.setSelection({
        edges: selection
      });
    }
    /**
     * Validate the selection: remove ids of nodes which no longer exist
     * @private
     */

  }, {
    key: "updateSelection",
    value: function updateSelection() {
      for (var nodeId in this.selectionObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.nodes, nodeId)) {
          if (!Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            delete this.selectionObj.nodes[nodeId];
          }
        }
      }

      for (var edgeId in this.selectionObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.selectionObj.edges, edgeId)) {
          if (!Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
            delete this.selectionObj.edges[edgeId];
          }
        }
      }
    }
    /**
     * Determine all the visual elements clicked which are on the given point.
     *
     * All elements are returned; this includes nodes, edges and their labels.
     * The order returned is from highest to lowest, i.e. element 0 of the return
     * value is the topmost item clicked on.
     *
     * The return value consists of an array of the following possible elements:
     *
     * - `{nodeId:number}`             - node with given id clicked on
     * - `{nodeId:number, labelId:0}`  - label of node with given id clicked on
     * - `{edgeId:number}`             - edge with given id clicked on
     * - `{edge:number, labelId:0}`    - label of edge with given id clicked on
     *
     * ## NOTES
     *
     * - Currently, there is only one label associated with a node or an edge,
     *   but this is expected to change somewhere in the future.
     * - Since there is no z-indexing yet, it is not really possible to set the nodes and
     *   edges in the correct order. For the time being, nodes come first.
     *
     * @param {point} pointer  mouse position in screen coordinates
     * @returns {Array.<nodeClickItem|nodeLabelClickItem|edgeClickItem|edgeLabelClickItem>}
     * @private
     */

  }, {
    key: "getClickedItems",
    value: function getClickedItems(pointer) {
      var point = this.canvas.DOMtoCanvas(pointer);
      var items = []; // Note reverse order; we want the topmost clicked items to be first in the array
      // Also note that selected nodes are disregarded here; these normally display on top

      var nodeIndices = this.body.nodeIndices;
      var nodes = this.body.nodes;

      for (var i = nodeIndices.length - 1; i >= 0; i--) {
        var node = nodes[nodeIndices[i]];
        var ret = node.getItemsOnPoint(point);
        items.push.apply(items, ret); // Append the return value to the running list.
      }

      var edgeIndices = this.body.edgeIndices;
      var edges = this.body.edges;

      for (var _i = edgeIndices.length - 1; _i >= 0; _i--) {
        var edge = edges[edgeIndices[_i]];

        var _ret = edge.getItemsOnPoint(point);

        items.push.apply(items, _ret); // Append the return value to the running list.
      }

      return items;
    }
  }]);

  return SelectionHandler;
}();

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
});

var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var defineProperty$9 = objectDefineProperty.f;
var forEach$4 = arrayIteration.forEach;
var setInternalState$3 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!descriptors || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  }))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate_1(iterable, target[ADDER], target, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
    forEach$4(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';

      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });
    IS_WEAK || defineProperty$9(Constructor.prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({
    global: true,
    forced: true
  }, exported);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var redefineAll = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
  }

  return target;
};

var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var defineProperty$a = objectDefineProperty.f;
var fastKey = internalMetadata.fastKey;
var setInternalState$4 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$4(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index; // change existing entry

      if (entry) {
        entry.value = value; // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;else that.size++; // add to index

        if (index !== 'F') state.index[index] = entry;
      }

      return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that); // fast case

      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index]; // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;

        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }

        state.first = state.last = undefined;
        if (descriptors) state.size = 0;else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;else that.size--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$a(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$4(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last; // revert to the last existing entry

      while (entry && entry.removed) entry = entry.previous; // get next entry


      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return {
          value: undefined,
          done: true
        };
      } // return step by kind


      if (kind == 'keys') return {
        value: entry.key,
        done: false
      };
      if (kind == 'values') return {
        value: entry.value,
        done: false
      };
      return {
        value: [entry.key, entry.value],
        done: false
      };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(CONSTRUCTOR_NAME);
  }
};

// https://tc39.github.io/ecma262/#sec-map-objects


var es_map = collection('Map', function (init) {
  return function Map() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong);

var map$3 = path.Map;

var map$4 = map$3;

var map$5 = map$4;

var createMethod$5 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$5(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$5(true)
};

var $reduce = arrayReduce.left;
var STRICT_METHOD$3 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$8 = arrayMethodUsesToLength('reduce', {
  1: 0
}); // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$8
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce = entryVirtual('Array').reduce;

var ArrayPrototype$d = Array.prototype;

var reduce_1 = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype$d || it instanceof Array && own === ArrayPrototype$d.reduce ? reduce : own;
};

var reduce$1 = reduce_1;

var reduce$2 = reduce$1;

var test$2 = [];
var nativeSort = test$2.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test$2.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test$2.sort(null);
}); // Old WebKit

var STRICT_METHOD$4 = arrayMethodIsStrict('sort');
var FORCED$6 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$6
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

var sort = entryVirtual('Array').sort;

var ArrayPrototype$e = Array.prototype;

var sort_1 = function (it) {
  var own = it.sort;
  return it === ArrayPrototype$e || it instanceof Array && own === ArrayPrototype$e.sort ? sort : own;
};

var sort$1 = sort_1;

var sort$2 = sort$1;

var timsort = createCommonjsModule(function (module, exports) {
  /****
   * The MIT License
   *
   * Copyright (c) 2015 Marco Ziccardi
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *
   ****/
  (function (global, factory) {
    {
      factory(exports);
    }
  })(commonjsGlobal, function (exports) {

    exports.__esModule = true;
    exports.sort = sort;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    var DEFAULT_MIN_MERGE = 32;
    var DEFAULT_MIN_GALLOPING = 7;
    var DEFAULT_TMP_STORAGE_LENGTH = 256;
    var POWERS_OF_TEN = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9];

    function log10(x) {
      if (x < 1e5) {
        if (x < 1e2) {
          return x < 1e1 ? 0 : 1;
        }

        if (x < 1e4) {
          return x < 1e3 ? 2 : 3;
        }

        return 4;
      }

      if (x < 1e7) {
        return x < 1e6 ? 5 : 6;
      }

      if (x < 1e9) {
        return x < 1e8 ? 7 : 8;
      }

      return 9;
    }

    function alphabeticalCompare(a, b) {
      if (a === b) {
        return 0;
      }

      if (~~a === a && ~~b === b) {
        if (a === 0 || b === 0) {
          return a < b ? -1 : 1;
        }

        if (a < 0 || b < 0) {
          if (b >= 0) {
            return -1;
          }

          if (a >= 0) {
            return 1;
          }

          a = -a;
          b = -b;
        }

        var al = log10(a);
        var bl = log10(b);
        var t = 0;

        if (al < bl) {
          a *= POWERS_OF_TEN[bl - al - 1];
          b /= 10;
          t = -1;
        } else if (al > bl) {
          b *= POWERS_OF_TEN[al - bl - 1];
          a /= 10;
          t = 1;
        }

        if (a === b) {
          return t;
        }

        return a < b ? -1 : 1;
      }

      var aStr = String(a);
      var bStr = String(b);

      if (aStr === bStr) {
        return 0;
      }

      return aStr < bStr ? -1 : 1;
    }

    function minRunLength(n) {
      var r = 0;

      while (n >= DEFAULT_MIN_MERGE) {
        r |= n & 1;
        n >>= 1;
      }

      return n + r;
    }

    function makeAscendingRun(array, lo, hi, compare) {
      var runHi = lo + 1;

      if (runHi === hi) {
        return 1;
      }

      if (compare(array[runHi++], array[lo]) < 0) {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) < 0) {
          runHi++;
        }

        reverseRun(array, lo, runHi);
      } else {
        while (runHi < hi && compare(array[runHi], array[runHi - 1]) >= 0) {
          runHi++;
        }
      }

      return runHi - lo;
    }

    function reverseRun(array, lo, hi) {
      hi--;

      while (lo < hi) {
        var t = array[lo];
        array[lo++] = array[hi];
        array[hi--] = t;
      }
    }

    function binaryInsertionSort(array, lo, hi, start, compare) {
      if (start === lo) {
        start++;
      }

      for (; start < hi; start++) {
        var pivot = array[start];
        var left = lo;
        var right = start;

        while (left < right) {
          var mid = left + right >>> 1;

          if (compare(pivot, array[mid]) < 0) {
            right = mid;
          } else {
            left = mid + 1;
          }
        }

        var n = start - left;

        switch (n) {
          case 3:
            array[left + 3] = array[left + 2];

          case 2:
            array[left + 2] = array[left + 1];

          case 1:
            array[left + 1] = array[left];
            break;

          default:
            while (n > 0) {
              array[left + n] = array[left + n - 1];
              n--;
            }

        }

        array[left] = pivot;
      }
    }

    function gallopLeft(value, array, start, length, hint, compare) {
      var lastOffset = 0;
      var maxOffset = 0;
      var offset = 1;

      if (compare(value, array[start + hint]) > 0) {
        maxOffset = length - hint;

        while (offset < maxOffset && compare(value, array[start + hint + offset]) > 0) {
          lastOffset = offset;
          offset = (offset << 1) + 1;

          if (offset <= 0) {
            offset = maxOffset;
          }
        }

        if (offset > maxOffset) {
          offset = maxOffset;
        }

        lastOffset += hint;
        offset += hint;
      } else {
        maxOffset = hint + 1;

        while (offset < maxOffset && compare(value, array[start + hint - offset]) <= 0) {
          lastOffset = offset;
          offset = (offset << 1) + 1;

          if (offset <= 0) {
            offset = maxOffset;
          }
        }

        if (offset > maxOffset) {
          offset = maxOffset;
        }

        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
      }

      lastOffset++;

      while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);

        if (compare(value, array[start + m]) > 0) {
          lastOffset = m + 1;
        } else {
          offset = m;
        }
      }

      return offset;
    }

    function gallopRight(value, array, start, length, hint, compare) {
      var lastOffset = 0;
      var maxOffset = 0;
      var offset = 1;

      if (compare(value, array[start + hint]) < 0) {
        maxOffset = hint + 1;

        while (offset < maxOffset && compare(value, array[start + hint - offset]) < 0) {
          lastOffset = offset;
          offset = (offset << 1) + 1;

          if (offset <= 0) {
            offset = maxOffset;
          }
        }

        if (offset > maxOffset) {
          offset = maxOffset;
        }

        var tmp = lastOffset;
        lastOffset = hint - offset;
        offset = hint - tmp;
      } else {
        maxOffset = length - hint;

        while (offset < maxOffset && compare(value, array[start + hint + offset]) >= 0) {
          lastOffset = offset;
          offset = (offset << 1) + 1;

          if (offset <= 0) {
            offset = maxOffset;
          }
        }

        if (offset > maxOffset) {
          offset = maxOffset;
        }

        lastOffset += hint;
        offset += hint;
      }

      lastOffset++;

      while (lastOffset < offset) {
        var m = lastOffset + (offset - lastOffset >>> 1);

        if (compare(value, array[start + m]) < 0) {
          offset = m;
        } else {
          lastOffset = m + 1;
        }
      }

      return offset;
    }

    var TimSort = function () {
      function TimSort(array, compare) {
        _classCallCheck(this, TimSort);

        this.array = null;
        this.compare = null;
        this.minGallop = DEFAULT_MIN_GALLOPING;
        this.length = 0;
        this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH;
        this.stackLength = 0;
        this.runStart = null;
        this.runLength = null;
        this.stackSize = 0;
        this.array = array;
        this.compare = compare;
        this.length = array.length;

        if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
          this.tmpStorageLength = this.length >>> 1;
        }

        this.tmp = new Array(this.tmpStorageLength);
        this.stackLength = this.length < 120 ? 5 : this.length < 1542 ? 10 : this.length < 119151 ? 19 : 40;
        this.runStart = new Array(this.stackLength);
        this.runLength = new Array(this.stackLength);
      }

      TimSort.prototype.pushRun = function pushRun(runStart, runLength) {
        this.runStart[this.stackSize] = runStart;
        this.runLength[this.stackSize] = runLength;
        this.stackSize += 1;
      };

      TimSort.prototype.mergeRuns = function mergeRuns() {
        while (this.stackSize > 1) {
          var n = this.stackSize - 2;

          if (n >= 1 && this.runLength[n - 1] <= this.runLength[n] + this.runLength[n + 1] || n >= 2 && this.runLength[n - 2] <= this.runLength[n] + this.runLength[n - 1]) {
            if (this.runLength[n - 1] < this.runLength[n + 1]) {
              n--;
            }
          } else if (this.runLength[n] > this.runLength[n + 1]) {
            break;
          }

          this.mergeAt(n);
        }
      };

      TimSort.prototype.forceMergeRuns = function forceMergeRuns() {
        while (this.stackSize > 1) {
          var n = this.stackSize - 2;

          if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
            n--;
          }

          this.mergeAt(n);
        }
      };

      TimSort.prototype.mergeAt = function mergeAt(i) {
        var compare = this.compare;
        var array = this.array;
        var start1 = this.runStart[i];
        var length1 = this.runLength[i];
        var start2 = this.runStart[i + 1];
        var length2 = this.runLength[i + 1];
        this.runLength[i] = length1 + length2;

        if (i === this.stackSize - 3) {
          this.runStart[i + 1] = this.runStart[i + 2];
          this.runLength[i + 1] = this.runLength[i + 2];
        }

        this.stackSize--;
        var k = gallopRight(array[start2], array, start1, length1, 0, compare);
        start1 += k;
        length1 -= k;

        if (length1 === 0) {
          return;
        }

        length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare);

        if (length2 === 0) {
          return;
        }

        if (length1 <= length2) {
          this.mergeLow(start1, length1, start2, length2);
        } else {
          this.mergeHigh(start1, length1, start2, length2);
        }
      };

      TimSort.prototype.mergeLow = function mergeLow(start1, length1, start2, length2) {
        var compare = this.compare;
        var array = this.array;
        var tmp = this.tmp;
        var i = 0;

        for (i = 0; i < length1; i++) {
          tmp[i] = array[start1 + i];
        }

        var cursor1 = 0;
        var cursor2 = start2;
        var dest = start1;
        array[dest++] = array[cursor2++];

        if (--length2 === 0) {
          for (i = 0; i < length1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }

          return;
        }

        if (length1 === 1) {
          for (i = 0; i < length2; i++) {
            array[dest + i] = array[cursor2 + i];
          }

          array[dest + length2] = tmp[cursor1];
          return;
        }

        var minGallop = this.minGallop;

        while (true) {
          var count1 = 0;
          var count2 = 0;
          var exit = false;

          do {
            if (compare(array[cursor2], tmp[cursor1]) < 0) {
              array[dest++] = array[cursor2++];
              count2++;
              count1 = 0;

              if (--length2 === 0) {
                exit = true;
                break;
              }
            } else {
              array[dest++] = tmp[cursor1++];
              count1++;
              count2 = 0;

              if (--length1 === 1) {
                exit = true;
                break;
              }
            }
          } while ((count1 | count2) < minGallop);

          if (exit) {
            break;
          }

          do {
            count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare);

            if (count1 !== 0) {
              for (i = 0; i < count1; i++) {
                array[dest + i] = tmp[cursor1 + i];
              }

              dest += count1;
              cursor1 += count1;
              length1 -= count1;

              if (length1 <= 1) {
                exit = true;
                break;
              }
            }

            array[dest++] = array[cursor2++];

            if (--length2 === 0) {
              exit = true;
              break;
            }

            count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare);

            if (count2 !== 0) {
              for (i = 0; i < count2; i++) {
                array[dest + i] = array[cursor2 + i];
              }

              dest += count2;
              cursor2 += count2;
              length2 -= count2;

              if (length2 === 0) {
                exit = true;
                break;
              }
            }

            array[dest++] = tmp[cursor1++];

            if (--length1 === 1) {
              exit = true;
              break;
            }

            minGallop--;
          } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

          if (exit) {
            break;
          }

          if (minGallop < 0) {
            minGallop = 0;
          }

          minGallop += 2;
        }

        this.minGallop = minGallop;

        if (minGallop < 1) {
          this.minGallop = 1;
        }

        if (length1 === 1) {
          for (i = 0; i < length2; i++) {
            array[dest + i] = array[cursor2 + i];
          }

          array[dest + length2] = tmp[cursor1];
        } else if (length1 === 0) {
          throw new Error('mergeLow preconditions were not respected');
        } else {
          for (i = 0; i < length1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }
        }
      };

      TimSort.prototype.mergeHigh = function mergeHigh(start1, length1, start2, length2) {
        var compare = this.compare;
        var array = this.array;
        var tmp = this.tmp;
        var i = 0;

        for (i = 0; i < length2; i++) {
          tmp[i] = array[start2 + i];
        }

        var cursor1 = start1 + length1 - 1;
        var cursor2 = length2 - 1;
        var dest = start2 + length2 - 1;
        var customCursor = 0;
        var customDest = 0;
        array[dest--] = array[cursor1--];

        if (--length1 === 0) {
          customCursor = dest - (length2 - 1);

          for (i = 0; i < length2; i++) {
            array[customCursor + i] = tmp[i];
          }

          return;
        }

        if (length2 === 1) {
          dest -= length1;
          cursor1 -= length1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = length1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }

          array[dest] = tmp[cursor2];
          return;
        }

        var minGallop = this.minGallop;

        while (true) {
          var count1 = 0;
          var count2 = 0;
          var exit = false;

          do {
            if (compare(tmp[cursor2], array[cursor1]) < 0) {
              array[dest--] = array[cursor1--];
              count1++;
              count2 = 0;

              if (--length1 === 0) {
                exit = true;
                break;
              }
            } else {
              array[dest--] = tmp[cursor2--];
              count2++;
              count1 = 0;

              if (--length2 === 1) {
                exit = true;
                break;
              }
            }
          } while ((count1 | count2) < minGallop);

          if (exit) {
            break;
          }

          do {
            count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare);

            if (count1 !== 0) {
              dest -= count1;
              cursor1 -= count1;
              length1 -= count1;
              customDest = dest + 1;
              customCursor = cursor1 + 1;

              for (i = count1 - 1; i >= 0; i--) {
                array[customDest + i] = array[customCursor + i];
              }

              if (length1 === 0) {
                exit = true;
                break;
              }
            }

            array[dest--] = tmp[cursor2--];

            if (--length2 === 1) {
              exit = true;
              break;
            }

            count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare);

            if (count2 !== 0) {
              dest -= count2;
              cursor2 -= count2;
              length2 -= count2;
              customDest = dest + 1;
              customCursor = cursor2 + 1;

              for (i = 0; i < count2; i++) {
                array[customDest + i] = tmp[customCursor + i];
              }

              if (length2 <= 1) {
                exit = true;
                break;
              }
            }

            array[dest--] = array[cursor1--];

            if (--length1 === 0) {
              exit = true;
              break;
            }

            minGallop--;
          } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);

          if (exit) {
            break;
          }

          if (minGallop < 0) {
            minGallop = 0;
          }

          minGallop += 2;
        }

        this.minGallop = minGallop;

        if (minGallop < 1) {
          this.minGallop = 1;
        }

        if (length2 === 1) {
          dest -= length1;
          cursor1 -= length1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;

          for (i = length1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }

          array[dest] = tmp[cursor2];
        } else if (length2 === 0) {
          throw new Error('mergeHigh preconditions were not respected');
        } else {
          customCursor = dest - (length2 - 1);

          for (i = 0; i < length2; i++) {
            array[customCursor + i] = tmp[i];
          }
        }
      };

      return TimSort;
    }();

    function sort(array, compare, lo, hi) {
      if (!Array.isArray(array)) {
        throw new TypeError('Can only sort arrays');
      }

      if (!compare) {
        compare = alphabeticalCompare;
      } else if (typeof compare !== 'function') {
        hi = lo;
        lo = compare;
        compare = alphabeticalCompare;
      }

      if (!lo) {
        lo = 0;
      }

      if (!hi) {
        hi = array.length;
      }

      var remaining = hi - lo;

      if (remaining < 2) {
        return;
      }

      var runLength = 0;

      if (remaining < DEFAULT_MIN_MERGE) {
        runLength = makeAscendingRun(array, lo, hi, compare);
        binaryInsertionSort(array, lo, hi, lo + runLength, compare);
        return;
      }

      var ts = new TimSort(array, compare);
      var minRun = minRunLength(remaining);

      do {
        runLength = makeAscendingRun(array, lo, hi, compare);

        if (runLength < minRun) {
          var force = remaining;

          if (force > minRun) {
            force = minRun;
          }

          binaryInsertionSort(array, lo, lo + force, lo + runLength, compare);
          runLength = force;
        }

        ts.pushRun(lo, runLength);
        ts.mergeRuns();
        remaining -= runLength;
        lo += runLength;
      } while (remaining !== 0);

      ts.forceMergeRuns();
    }
  });
});

var timsort$1 = timsort;

function _createSuper$s(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$s(); return function _createSuperInternal() { var Super = getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf$5(this).constructor; result = construct$3(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$s() { if (typeof Reflect === "undefined" || !construct$3) return false; if (construct$3.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(construct$3(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * Interface definition for direction strategy classes.
 *
 * This class describes the interface for the Strategy
 * pattern classes used to differentiate horizontal and vertical
 * direction of hierarchical results.
 *
 * For a given direction, one coordinate will be 'fixed', meaning that it is
 * determined by level.
 * The other coordinate is 'unfixed', meaning that the nodes on a given level
 * can still move along that coordinate. So:
 *
 * - `vertical` layout: `x` unfixed, `y` fixed per level
 * - `horizontal` layout: `x` fixed per level, `y` unfixed
 *
 * The local methods are stubs and should be regarded as abstract.
 * Derived classes **must** implement all the methods themselves.
 *
 * @private
 */

var DirectionInterface = /*#__PURE__*/function () {
  function DirectionInterface() {
    classCallCheck(this, DirectionInterface);
  }

  createClass(DirectionInterface, [{
    key: "abstract",

    /** @ignore **/
    value: function abstract() {
      throw new Error("Can't instantiate abstract class!");
    }
    /**
     * This is a dummy call which is used to suppress the jsdoc errors of type:
     *
     *   "'param' is assigned a value but never used"
     *
     * @ignore
     **/

  }, {
    key: "fake_use",
    value: function fake_use() {// Do nothing special
    }
    /**
     * Type to use to translate dynamic curves to, in the case of hierarchical layout.
     * Dynamic curves do not work for these.
     *
     * The value should be perpendicular to the actual direction of the layout.
     *
     * @return {string} Direction, either 'vertical' or 'horizontal'
     */

  }, {
    key: "curveType",
    value: function curveType() {
      return this.abstract();
    }
    /**
     * Return the value of the coordinate that is not fixed for this direction.
     *
     * @param {Node} node The node to read
     * @return {number} Value of the unfixed coordinate
     */

  }, {
    key: "getPosition",
    value: function getPosition(node) {
      this.fake_use(node);
      return this.abstract();
    }
    /**
     * Set the value of the coordinate that is not fixed for this direction.
     *
     * @param {Node} node The node to adjust
     * @param {number} position
     * @param {number} [level] if specified, the hierarchy level that this node should be fixed to
     */

  }, {
    key: "setPosition",
    value: function setPosition(node, position) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      this.fake_use(node, position, level);
      this.abstract();
    }
    /**
     * Get the width of a tree.
     *
     * A `tree` here is a subset of nodes within the network which are not connected to other nodes,
     * only among themselves. In essence, it is a sub-network.
     *
     * @param {number} index The index number of a tree
     * @return {number} the width of a tree in the view coordinates
     */

  }, {
    key: "getTreeSize",
    value: function getTreeSize(index) {
      this.fake_use(index);
      return this.abstract();
    }
    /**
     * Sort array of nodes on the unfixed coordinates.
     *
     * **Note:** chrome has non-stable sorting implementation, which
     * has a tendency to change the order of the array items,
     * even if the custom sort function returns 0.
     *
     * For this reason, an external sort implementation is used,
     * which has the added benefit of being faster than the standard
     * platforms implementation. This has been verified on `node.js`,
     * `firefox` and `chrome` (all linux).
     *
     * @param {Array.<Node>} nodeArray array of nodes to sort
     */

  }, {
    key: "sort",
    value: function sort(nodeArray) {
      this.fake_use(nodeArray);
      this.abstract();
    }
    /**
     * Assign the fixed coordinate of the node to the given level
     *
     * @param {Node} node The node to adjust
     * @param {number} level The level to fix to
     */

  }, {
    key: "fix",
    value: function fix(node, level) {
      this.fake_use(node, level);
      this.abstract();
    }
    /**
     * Add an offset to the unfixed coordinate of the given node.
     *
     * @param {NodeId} nodeId Id of the node to adjust
     * @param {number} diff Offset to add to the unfixed coordinate
     */

  }, {
    key: "shift",
    value: function shift(nodeId, diff) {
      this.fake_use(nodeId, diff);
      this.abstract();
    }
  }]);

  return DirectionInterface;
}();
/**
 * Vertical Strategy
 *
 * Coordinate `y` is fixed on levels, coordinate `x` is unfixed.
 *
 * @extends DirectionInterface
 * @private
 */


var VerticalStrategy = /*#__PURE__*/function (_DirectionInterface) {
  inherits(VerticalStrategy, _DirectionInterface);

  var _super = _createSuper$s(VerticalStrategy);

  /**
   * Constructor
   *
   * @param {Object} layout reference to the parent LayoutEngine instance.
   */
  function VerticalStrategy(layout) {
    var _this;

    classCallCheck(this, VerticalStrategy);

    _this = _super.call(this);
    _this.layout = layout;
    return _this;
  }
  /** @inheritdoc */


  createClass(VerticalStrategy, [{
    key: "curveType",
    value: function curveType() {
      return 'horizontal';
    }
    /** @inheritdoc */

  }, {
    key: "getPosition",
    value: function getPosition(node) {
      return node.x;
    }
    /** @inheritdoc */

  }, {
    key: "setPosition",
    value: function setPosition(node, position) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      if (level !== undefined) {
        this.layout.hierarchical.addToOrdering(node, level);
      }

      node.x = position;
    }
    /** @inheritdoc */

  }, {
    key: "getTreeSize",
    value: function getTreeSize(index) {
      var res = this.layout.hierarchical.getTreeSize(this.layout.body.nodes, index);
      return {
        min: res.min_x,
        max: res.max_x
      };
    }
    /** @inheritdoc */

  }, {
    key: "sort",
    value: function sort$1(nodeArray) {
      timsort$1.sort(nodeArray, function (a, b) {
        return a.x - b.x;
      });
    }
    /** @inheritdoc */

  }, {
    key: "fix",
    value: function fix(node, level) {
      node.y = this.layout.options.hierarchical.levelSeparation * level;
      node.options.fixed.y = true;
    }
    /** @inheritdoc */

  }, {
    key: "shift",
    value: function shift(nodeId, diff) {
      this.layout.body.nodes[nodeId].x += diff;
    }
  }]);

  return VerticalStrategy;
}(DirectionInterface);
/**
 * Horizontal Strategy
 *
 * Coordinate `x` is fixed on levels, coordinate `y` is unfixed.
 *
 * @extends DirectionInterface
 * @private
 */


var HorizontalStrategy = /*#__PURE__*/function (_DirectionInterface2) {
  inherits(HorizontalStrategy, _DirectionInterface2);

  var _super2 = _createSuper$s(HorizontalStrategy);

  /**
   * Constructor
   *
   * @param {Object} layout reference to the parent LayoutEngine instance.
   */
  function HorizontalStrategy(layout) {
    var _this2;

    classCallCheck(this, HorizontalStrategy);

    _this2 = _super2.call(this);
    _this2.layout = layout;
    return _this2;
  }
  /** @inheritdoc */


  createClass(HorizontalStrategy, [{
    key: "curveType",
    value: function curveType() {
      return 'vertical';
    }
    /** @inheritdoc */

  }, {
    key: "getPosition",
    value: function getPosition(node) {
      return node.y;
    }
    /** @inheritdoc */

  }, {
    key: "setPosition",
    value: function setPosition(node, position) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      if (level !== undefined) {
        this.layout.hierarchical.addToOrdering(node, level);
      }

      node.y = position;
    }
    /** @inheritdoc */

  }, {
    key: "getTreeSize",
    value: function getTreeSize(index) {
      var res = this.layout.hierarchical.getTreeSize(this.layout.body.nodes, index);
      return {
        min: res.min_y,
        max: res.max_y
      };
    }
    /** @inheritdoc */

  }, {
    key: "sort",
    value: function sort$1(nodeArray) {
      timsort$1.sort(nodeArray, function (a, b) {
        return a.y - b.y;
      });
    }
    /** @inheritdoc */

  }, {
    key: "fix",
    value: function fix(node, level) {
      node.x = this.layout.options.hierarchical.levelSeparation * level;
      node.options.fixed.x = true;
    }
    /** @inheritdoc */

  }, {
    key: "shift",
    value: function shift(nodeId, diff) {
      this.layout.body.nodes[nodeId].y += diff;
    }
  }]);

  return HorizontalStrategy;
}(DirectionInterface);

var $every = arrayIteration.every;
var STRICT_METHOD$5 = arrayMethodIsStrict('every');
var USES_TO_LENGTH$9 = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every

_export({
  target: 'Array',
  proto: true,
  forced: !STRICT_METHOD$5 || !USES_TO_LENGTH$9
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var every = entryVirtual('Array').every;

var ArrayPrototype$f = Array.prototype;

var every_1 = function (it) {
  var own = it.every;
  return it === ArrayPrototype$f || it instanceof Array && own === ArrayPrototype$f.every ? every : own;
};

var every$1 = every_1;

var every$2 = every$1;

// https://tc39.github.io/ecma262/#sec-set-objects


var es_set = collection('Set', function (init) {
  return function Set() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong);

var set$1 = path.Set;

var set$2 = set$1;

var set$3 = set$2;

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof symbol$4 === "undefined" || getIteratorMethod$1(o) == null) { if (isArray$5(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = getIterator$1(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { var _context8; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = slice$5(_context8 = Object.prototype.toString.call(o)).call(_context8, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$2(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Try to assign levels to nodes according to their positions in the cyclic “hierarchy”.
 *
 * @param nodes - Visible nodes of the graph.
 * @param levels - If present levels will be added to it, if not a new object will be created.
 *
 * @returns Populated node levels.
 */
function fillLevelsByDirectionCyclic(nodes, levels) {
  var edges = new set$3();

  forEach$2(nodes).call(nodes, function (node) {
    var _context;

    forEach$2(_context = node.edges).call(_context, function (edge) {
      if (edge.connected) {
        edges.add(edge);
      }
    });
  });

  forEach$2(edges).call(edges, function (edge) {
    var fromId = edge.from.id;
    var toId = edge.to.id;

    if (levels[fromId] == null) {
      levels[fromId] = 0;
    }

    if (levels[toId] == null || levels[fromId] >= levels[toId]) {
      levels[toId] = levels[fromId] + 1;
    }
  });

  return levels;
}
/**
 * Assign levels to nodes according to their positions in the hierarchy. Leaves will be lined up at the bottom and all other nodes as close to their children as possible.
 *
 * @param nodes - Visible nodes of the graph.
 * @param levels - If present levels will be added to it, if not a new object will be created.
 *
 * @returns Populated node levels.
 */


function fillLevelsByDirectionLeaves(nodes) {
  var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : create$2(null);
  return fillLevelsByDirection( // Pick only leaves (nodes without children).
  function (node) {
    var _context2, _context3;

    return every$2(_context2 = filter$2(_context3 = node.edges // Take only visible nodes into account.
    ).call(_context3, function (edge) {
      return nodes.has(edge.toId);
    }) // Check that all edges lead to this node (leaf).
    ).call(_context2, function (edge) {
      return edge.to === node;
    });
  }, // Use the lowest level.
  function (newLevel, oldLevel) {
    return oldLevel > newLevel;
  }, // Go against the direction of the edges.
  "from", nodes, levels);
}
/**
 * Assign levels to nodes according to their positions in the hierarchy. Roots will be lined up at the top and all nodes as close to their parents as possible.
 *
 * @param nodes - Visible nodes of the graph.
 * @param levels - If present levels will be added to it, if not a new object will be created.
 *
 * @returns Populated node levels.
 */

function fillLevelsByDirectionRoots(nodes) {
  var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : create$2(null);
  return fillLevelsByDirection( // Pick only roots (nodes without parents).
  function (node) {
    var _context4, _context5;

    return every$2(_context4 = filter$2(_context5 = node.edges // Take only visible nodes into account.
    ).call(_context5, function (edge) {
      return nodes.has(edge.toId);
    }) // Check that all edges lead from this node (root).
    ).call(_context4, function (edge) {
      return edge.from === node;
    });
  }, // Use the highest level.
  function (newLevel, oldLevel) {
    return oldLevel < newLevel;
  }, // Go in the direction of the edges.
  "to", nodes, levels);
}
/**
 * Assign levels to nodes according to their positions in the hierarchy.
 *
 * @param isEntryNode - Checks and return true if the graph should be traversed from this node.
 * @param shouldLevelBeReplaced - Checks and returns true if the level of given node should be updated to the new value.
 * @param direction - Wheter the graph should be traversed in the direction of the edges `"to"` or in the other way `"from"`.
 * @param nodes - Visible nodes of the graph.
 * @param levels - If present levels will be added to it, if not a new object will be created.
 *
 * @returns Populated node levels.
 */

function fillLevelsByDirection(isEntryNode, shouldLevelBeReplaced, direction, nodes, levels) {
  var limit = nodes.size;
  var edgeIdProp = direction + "Id";
  var newLevelDiff = direction === "to" ? 1 : -1;

  var _iterator = _createForOfIteratorHelper$3(nodes),
      _step;

  try {
    var _loop = function _loop() {
      var _step$value = slicedToArray(_step.value, 2),
          entryNodeId = _step$value[0],
          entryNode = _step$value[1];

      if ( // Skip if the node is not visible.
      !nodes.has(entryNodeId) || // Skip if the node is not an entry node.
      !isEntryNode(entryNode)) {
        return "continue";
      } // Line up all the entry nodes on level 0.


      levels[entryNodeId] = 0;
      var stack = [entryNode];
      var done = 0;
      var node = void 0;

      var _loop2 = function _loop2() {
        var _context6, _context7;

        if (!nodes.has(entryNodeId)) {
          // Skip if the node is not visible.
          return "continue";
        }

        var newLevel = levels[node.id] + newLevelDiff;

        forEach$2(_context6 = filter$2(_context7 = node.edges).call(_context7, function (edge) {
          return (// Ignore disconnected edges.
            edge.connected && // Ignore circular edges.
            edge.to !== edge.from && // Ignore edges leading to the node that's currently being processed.
            edge[direction] !== node && // Ignore edges connecting to an invisible node.
            nodes.has(edge.toId) && // Ignore edges connecting from an invisible node.
            nodes.has(edge.fromId)
          );
        })).call(_context6, function (edge) {
          var targetNodeId = edge[edgeIdProp];
          var oldLevel = levels[targetNodeId];

          if (oldLevel == null || shouldLevelBeReplaced(newLevel, oldLevel)) {
            levels[targetNodeId] = newLevel;
            stack.push(edge[direction]);
          }
        });

        if (done > limit) {
          // This would run forever on a cyclic graph.
          return {
            v: {
              v: fillLevelsByDirectionCyclic(nodes, levels)
            }
          };
        } else {
          ++done;
        }
      };

      while (node = stack.pop()) {
        var _ret2 = _loop2();

        if (_ret2 === "continue") continue;
        if (_typeof_1(_ret2) === "object") return _ret2.v;
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
      if (_typeof_1(_ret) === "object") return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return levels;
}

/**
 * There's a mix-up with terms in the code. Following are the formal definitions:
 *
 *   tree   - a strict hierarchical network, i.e. every node has at most one parent
 *   forest - a collection of trees. These distinct trees are thus not connected.
 *
 * So:
 * - in a network that is not a tree, there exist nodes with multiple parents.
 * - a network consisting of unconnected sub-networks, of which at least one
 *   is not a tree, is not a forest.
 *
 * In the code, the definitions are:
 *
 *   tree   - any disconnected sub-network, strict hierarchical or not.
 *   forest - a bunch of these sub-networks
 *
 * The difference between tree and not-tree is important in the code, notably within
 * to the block-shifting algorithm. The algorithm assumes formal trees and fails
 * for not-trees, often in a spectacular manner (search for 'exploding network' in the issues).
 *
 * In order to distinguish the definitions in the following code, the adjective 'formal' is
 * used. If 'formal' is absent, you must assume the non-formal definition.
 *
 * ----------------------------------------------------------------------------------
 * NOTES
 * =====
 *
 * A hierarchical layout is a different thing from a hierarchical network.
 * The layout is a way to arrange the nodes in the view; this can be done
 * on non-hierarchical networks as well. The converse is also possible.
 */
/**
 * Container for derived data on current network, relating to hierarchy.
 *
 * @private
 */

var HierarchicalStatus = /*#__PURE__*/function () {
  /**
   * @ignore
   */
  function HierarchicalStatus() {
    classCallCheck(this, HierarchicalStatus);

    this.childrenReference = {}; // child id's per node id

    this.parentReference = {}; // parent id's per node id

    this.trees = {}; // tree id per node id; i.e. to which tree does given node id belong

    this.distributionOrdering = {}; // The nodes per level, in the display order

    this.levels = {}; // hierarchy level per node id

    this.distributionIndex = {}; // The position of the node in the level sorting order, per node id.

    this.isTree = false; // True if current network is a formal tree

    this.treeIndex = -1; // Highest tree id in current network.
  }
  /**
   * Add the relation between given nodes to the current state.
   *
   * @param {Node.id} parentNodeId
   * @param {Node.id} childNodeId
   */


  createClass(HierarchicalStatus, [{
    key: "addRelation",
    value: function addRelation(parentNodeId, childNodeId) {
      if (this.childrenReference[parentNodeId] === undefined) {
        this.childrenReference[parentNodeId] = [];
      }

      this.childrenReference[parentNodeId].push(childNodeId);

      if (this.parentReference[childNodeId] === undefined) {
        this.parentReference[childNodeId] = [];
      }

      this.parentReference[childNodeId].push(parentNodeId);
    }
    /**
     * Check if the current state is for a formal tree or formal forest.
     *
     * This is the case if every node has at most one parent.
     *
     * Pre: parentReference init'ed properly for current network
     */

  }, {
    key: "checkIfTree",
    value: function checkIfTree() {
      for (var i in this.parentReference) {
        if (this.parentReference[i].length > 1) {
          this.isTree = false;
          return;
        }
      }

      this.isTree = true;
    }
    /**
     * Return the number of separate trees in the current network.
     * @returns {number}
     */

  }, {
    key: "numTrees",
    value: function numTrees() {
      return this.treeIndex + 1; // This assumes the indexes are assigned consecitively
    }
    /**
     * Assign a tree id to a node
     * @param {Node} node
     * @param {string|number} treeId
     */

  }, {
    key: "setTreeIndex",
    value: function setTreeIndex(node, treeId) {
      if (treeId === undefined) return; // Don't bother

      if (this.trees[node.id] === undefined) {
        this.trees[node.id] = treeId;
        this.treeIndex = Math.max(treeId, this.treeIndex);
      }
    }
    /**
     * Ensure level for given id is defined.
     *
     * Sets level to zero for given node id if not already present
     *
     * @param {Node.id} nodeId
     */

  }, {
    key: "ensureLevel",
    value: function ensureLevel(nodeId) {
      if (this.levels[nodeId] === undefined) {
        this.levels[nodeId] = 0;
      }
    }
    /**
     * get the maximum level of a branch.
     *
     * TODO: Never entered; find a test case to test this!
     * @param {Node.id} nodeId
     * @returns {number}
     */

  }, {
    key: "getMaxLevel",
    value: function getMaxLevel(nodeId) {
      var _this = this;

      var accumulator = {};

      var _getMaxLevel = function _getMaxLevel(nodeId) {
        if (accumulator[nodeId] !== undefined) {
          return accumulator[nodeId];
        }

        var level = _this.levels[nodeId];

        if (_this.childrenReference[nodeId]) {
          var children = _this.childrenReference[nodeId];

          if (children.length > 0) {
            for (var i = 0; i < children.length; i++) {
              level = Math.max(level, _getMaxLevel(children[i]));
            }
          }
        }

        accumulator[nodeId] = level;
        return level;
      };

      return _getMaxLevel(nodeId);
    }
    /**
     *
     * @param {Node} nodeA
     * @param {Node} nodeB
     */

  }, {
    key: "levelDownstream",
    value: function levelDownstream(nodeA, nodeB) {
      if (this.levels[nodeB.id] === undefined) {
        // set initial level
        if (this.levels[nodeA.id] === undefined) {
          this.levels[nodeA.id] = 0;
        } // set level


        this.levels[nodeB.id] = this.levels[nodeA.id] + 1;
      }
    }
    /**
     * Small util method to set the minimum levels of the nodes to zero.
     *
     * @param {Array.<Node>} nodes
     */

  }, {
    key: "setMinLevelToZero",
    value: function setMinLevelToZero(nodes) {
      var minLevel = 1e9; // get the minimum level

      for (var nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          if (this.levels[nodeId] !== undefined) {
            minLevel = Math.min(this.levels[nodeId], minLevel);
          }
        }
      } // subtract the minimum from the set so we have a range starting from 0


      for (var _nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, _nodeId)) {
          if (this.levels[_nodeId] !== undefined) {
            this.levels[_nodeId] -= minLevel;
          }
        }
      }
    }
    /**
     * Get the min and max xy-coordinates of a given tree
     *
     * @param {Array.<Node>} nodes
     * @param {number} index
     * @returns {{min_x: number, max_x: number, min_y: number, max_y: number}}
     */

  }, {
    key: "getTreeSize",
    value: function getTreeSize(nodes, index) {
      var min_x = 1e9;
      var max_x = -1e9;
      var min_y = 1e9;
      var max_y = -1e9;

      for (var nodeId in this.trees) {
        if (Object.prototype.hasOwnProperty.call(this.trees, nodeId)) {
          if (this.trees[nodeId] === index) {
            var node = nodes[nodeId];
            min_x = Math.min(node.x, min_x);
            max_x = Math.max(node.x, max_x);
            min_y = Math.min(node.y, min_y);
            max_y = Math.max(node.y, max_y);
          }
        }
      }

      return {
        min_x: min_x,
        max_x: max_x,
        min_y: min_y,
        max_y: max_y
      };
    }
    /**
     * Check if two nodes have the same parent(s)
     *
     * @param {Node} node1
     * @param {Node} node2
     * @return {boolean} true if the two nodes have a same ancestor node, false otherwise
     */

  }, {
    key: "hasSameParent",
    value: function hasSameParent(node1, node2) {
      var parents1 = this.parentReference[node1.id];
      var parents2 = this.parentReference[node2.id];

      if (parents1 === undefined || parents2 === undefined) {
        return false;
      }

      for (var i = 0; i < parents1.length; i++) {
        for (var j = 0; j < parents2.length; j++) {
          if (parents1[i] == parents2[j]) {
            return true;
          }
        }
      }

      return false;
    }
    /**
     * Check if two nodes are in the same tree.
     *
     * @param {Node} node1
     * @param {Node} node2
     * @return {Boolean} true if this is so, false otherwise
     */

  }, {
    key: "inSameSubNetwork",
    value: function inSameSubNetwork(node1, node2) {
      return this.trees[node1.id] === this.trees[node2.id];
    }
    /**
     * Get a list of the distinct levels in the current network
     *
     * @returns {Array}
     */

  }, {
    key: "getLevels",
    value: function getLevels() {
      return keys$3(this.distributionOrdering);
    }
    /**
     * Add a node to the ordering per level
     *
     * @param {Node} node
     * @param {number} level
     */

  }, {
    key: "addToOrdering",
    value: function addToOrdering(node, level) {
      if (this.distributionOrdering[level] === undefined) {
        this.distributionOrdering[level] = [];
      }

      var isPresent = false;
      var curLevel = this.distributionOrdering[level];

      for (var n in curLevel) {
        //if (curLevel[n].id === node.id) {
        if (curLevel[n] === node) {
          isPresent = true;
          break;
        }
      }

      if (!isPresent) {
        this.distributionOrdering[level].push(node);
        this.distributionIndex[node.id] = this.distributionOrdering[level].length - 1;
      }
    }
  }]);

  return HierarchicalStatus;
}();
/**
 * The Layout Engine
 */


var LayoutEngine = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   */
  function LayoutEngine(body) {
    classCallCheck(this, LayoutEngine);

    this.body = body; // Make sure there always is some RNG because the setOptions method won't
    // set it unless there's a seed for it.

    this._resetRNG(Math.random() + ":" + now$2());

    this.setPhysics = false;
    this.options = {};
    this.optionsBackup = {
      physics: {}
    };
    this.defaultOptions = {
      randomSeed: undefined,
      improvedLayout: true,
      clusterThreshold: 150,
      hierarchical: {
        enabled: false,
        levelSeparation: 150,
        nodeSpacing: 100,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: 'UD',
        // UD, DU, LR, RL
        sortMethod: 'hubsize' // hubsize, directed

      }
    };

    assign$2(this.options, this.defaultOptions);

    this.bindEventListeners();
  }
  /**
   * Binds event listeners
   */


  createClass(LayoutEngine, [{
    key: "bindEventListeners",
    value: function bindEventListeners() {
      var _this2 = this;

      this.body.emitter.on('_dataChanged', function () {
        _this2.setupHierarchicalLayout();
      });
      this.body.emitter.on('_dataLoaded', function () {
        _this2.layoutNetwork();
      });
      this.body.emitter.on('_resetHierarchicalLayout', function () {
        _this2.setupHierarchicalLayout();
      });
      this.body.emitter.on('_adjustEdgesForHierarchicalLayout', function () {
        if (_this2.options.hierarchical.enabled !== true) {
          return;
        } // get the type of static smooth curve in case it is required


        var type = _this2.direction.curveType(); // force all edges into static smooth curves.


        _this2.body.emitter.emit('_forceDisableDynamicCurves', type, false);
      });
    }
    /**
     *
     * @param {Object} options
     * @param {Object} allOptions
     * @returns {Object}
     */

  }, {
    key: "setOptions",
    value: function setOptions(options, allOptions) {
      if (options !== undefined) {
        var hierarchical = this.options.hierarchical;
        var prevHierarchicalState = hierarchical.enabled;
        selectiveDeepExtend(["randomSeed", "improvedLayout", "clusterThreshold"], this.options, options);
        mergeOptions(this.options, options, 'hierarchical');

        if (options.randomSeed !== undefined) {
          this._resetRNG(options.randomSeed);
        }

        if (hierarchical.enabled === true) {
          if (prevHierarchicalState === true) {
            // refresh the overridden options for nodes and edges.
            this.body.emitter.emit('refresh', true);
          } // make sure the level separation is the right way up


          if (hierarchical.direction === 'RL' || hierarchical.direction === 'DU') {
            if (hierarchical.levelSeparation > 0) {
              hierarchical.levelSeparation *= -1;
            }
          } else {
            if (hierarchical.levelSeparation < 0) {
              hierarchical.levelSeparation *= -1;
            }
          }

          this.setDirectionStrategy();
          this.body.emitter.emit('_resetHierarchicalLayout'); // because the hierarchical system needs it's own physics and smooth curve settings,
          // we adapt the other options if needed.

          return this.adaptAllOptionsForHierarchicalLayout(allOptions);
        } else {
          if (prevHierarchicalState === true) {
            // refresh the overridden options for nodes and edges.
            this.body.emitter.emit('refresh');
            return deepExtend(allOptions, this.optionsBackup);
          }
        }
      }

      return allOptions;
    }
    /**
     * Reset the random number generator with given seed.
     *
     * @param {any} seed - The seed that will be forwarded the the RNG.
     */

  }, {
    key: "_resetRNG",
    value: function _resetRNG(seed) {
      this.initialRandomSeed = seed;
      this._rng = Alea(this.initialRandomSeed);
    }
    /**
     *
     * @param {Object} allOptions
     * @returns {Object}
     */

  }, {
    key: "adaptAllOptionsForHierarchicalLayout",
    value: function adaptAllOptionsForHierarchicalLayout(allOptions) {
      if (this.options.hierarchical.enabled === true) {
        var backupPhysics = this.optionsBackup.physics; // set the physics

        if (allOptions.physics === undefined || allOptions.physics === true) {
          allOptions.physics = {
            enabled: backupPhysics.enabled === undefined ? true : backupPhysics.enabled,
            solver: 'hierarchicalRepulsion'
          };
          backupPhysics.enabled = backupPhysics.enabled === undefined ? true : backupPhysics.enabled;
          backupPhysics.solver = backupPhysics.solver || 'barnesHut';
        } else if (_typeof_1(allOptions.physics) === 'object') {
          backupPhysics.enabled = allOptions.physics.enabled === undefined ? true : allOptions.physics.enabled;
          backupPhysics.solver = allOptions.physics.solver || 'barnesHut';
          allOptions.physics.solver = 'hierarchicalRepulsion';
        } else if (allOptions.physics !== false) {
          backupPhysics.solver = 'barnesHut';
          allOptions.physics = {
            solver: 'hierarchicalRepulsion'
          };
        } // get the type of static smooth curve in case it is required


        var type = this.direction.curveType(); // disable smooth curves if nothing is defined. If smooth curves have been turned on,
        // turn them into static smooth curves.

        if (allOptions.edges === undefined) {
          this.optionsBackup.edges = {
            smooth: {
              enabled: true,
              type: 'dynamic'
            }
          };
          allOptions.edges = {
            smooth: false
          };
        } else if (allOptions.edges.smooth === undefined) {
          this.optionsBackup.edges = {
            smooth: {
              enabled: true,
              type: 'dynamic'
            }
          };
          allOptions.edges.smooth = false;
        } else {
          if (typeof allOptions.edges.smooth === 'boolean') {
            this.optionsBackup.edges = {
              smooth: allOptions.edges.smooth
            };
            allOptions.edges.smooth = {
              enabled: allOptions.edges.smooth,
              type: type
            };
          } else {
            var smooth = allOptions.edges.smooth; // allow custom types except for dynamic

            if (smooth.type !== undefined && smooth.type !== 'dynamic') {
              type = smooth.type;
            } // TODO: this is options merging; see if the standard routines can be used here.


            this.optionsBackup.edges = {
              smooth: {
                enabled: smooth.enabled === undefined ? true : smooth.enabled,
                type: smooth.type === undefined ? 'dynamic' : smooth.type,
                roundness: smooth.roundness === undefined ? 0.5 : smooth.roundness,
                forceDirection: smooth.forceDirection === undefined ? false : smooth.forceDirection
              }
            }; // NOTE: Copying an object to self; this is basically setting defaults for undefined variables

            allOptions.edges.smooth = {
              enabled: smooth.enabled === undefined ? true : smooth.enabled,
              type: type,
              roundness: smooth.roundness === undefined ? 0.5 : smooth.roundness,
              forceDirection: smooth.forceDirection === undefined ? false : smooth.forceDirection
            };
          }
        } // Force all edges into static smooth curves.
        // Only applies to edges that do not use the global options for smooth.


        this.body.emitter.emit('_forceDisableDynamicCurves', type);
      }

      return allOptions;
    }
    /**
     *
     * @param {Array.<Node>} nodesArray
     */

  }, {
    key: "positionInitially",
    value: function positionInitially(nodesArray) {
      if (this.options.hierarchical.enabled !== true) {
        this._resetRNG(this.initialRandomSeed);

        var radius = nodesArray.length + 50;

        for (var i = 0; i < nodesArray.length; i++) {
          var node = nodesArray[i];

          var angle = 2 * Math.PI * this._rng();

          if (node.x === undefined) {
            node.x = radius * Math.cos(angle);
          }

          if (node.y === undefined) {
            node.y = radius * Math.sin(angle);
          }
        }
      }
    }
    /**
     * Use Kamada Kawai to position nodes. This is quite a heavy algorithm so if there are a lot of nodes we
     * cluster them first to reduce the amount.
     */

  }, {
    key: "layoutNetwork",
    value: function layoutNetwork() {
      if (this.options.hierarchical.enabled !== true && this.options.improvedLayout === true) {
        var indices = this.body.nodeIndices; // first check if we should Kamada Kawai to layout. The threshold is if less than half of the visible
        // nodes have predefined positions we use this.

        var positionDefined = 0;

        for (var i = 0; i < indices.length; i++) {
          var node = this.body.nodes[indices[i]];

          if (node.predefinedPosition === true) {
            positionDefined += 1;
          }
        } // if less than half of the nodes have a predefined position we continue


        if (positionDefined < 0.5 * indices.length) {
          var MAX_LEVELS = 10;
          var level = 0;
          var clusterThreshold = this.options.clusterThreshold; //
          // Define the options for the hidden cluster nodes
          // These options don't propagate outside the clustering phase.
          //
          // Some options are explicitly disabled, because they may be set in group or default node options.
          // The clusters are never displayed, so most explicit settings here serve as performance optimizations.
          //
          // The explicit setting of 'shape' is to avoid `shape: 'image'`; images are not passed to the hidden
          // cluster nodes, leading to an exception on creation.
          //
          // All settings here are performance related, except when noted otherwise.
          //

          var clusterOptions = {
            clusterNodeProperties: {
              shape: 'ellipse',
              // Bugfix: avoid type 'image', no images supplied
              label: '',
              // avoid label handling
              group: '',
              // avoid group handling
              font: {
                multi: false
              } // avoid font propagation

            },
            clusterEdgeProperties: {
              label: '',
              // avoid label handling
              font: {
                multi: false
              },
              // avoid font propagation
              smooth: {
                enabled: false // avoid drawing penalty for complex edges

              }
            }
          }; // if there are a lot of nodes, we cluster before we run the algorithm.
          // NOTE: this part fails to find clusters for large scale-free networks, which should
          //       be easily clusterable.
          // TODO: examine why this is so

          if (indices.length > clusterThreshold) {
            var startLength = indices.length;

            while (indices.length > clusterThreshold && level <= MAX_LEVELS) {
              //console.time("clustering")
              level += 1;
              var before = indices.length; // if there are many nodes we do a hubsize cluster

              if (level % 3 === 0) {
                this.body.modules.clustering.clusterBridges(clusterOptions);
              } else {
                this.body.modules.clustering.clusterOutliers(clusterOptions);
              }

              var after = indices.length;

              if (before == after && level % 3 !== 0) {
                this._declusterAll();

                this.body.emitter.emit("_layoutFailed");
                console.info("This network could not be positioned by this version of the improved layout algorithm." + " Please disable improvedLayout for better performance.");
                return;
              } //console.timeEnd("clustering")
              //console.log(before,level,after);

            } // increase the size of the edges


            this.body.modules.kamadaKawai.setOptions({
              springLength: Math.max(150, 2 * startLength)
            });
          }

          if (level > MAX_LEVELS) {
            console.info("The clustering didn't succeed within the amount of interations allowed," + " progressing with partial result.");
          } // position the system for these nodes and edges


          this.body.modules.kamadaKawai.solve(indices, this.body.edgeIndices, true); // shift to center point

          this._shiftToCenter(); // perturb the nodes a little bit to force the physics to kick in


          var offset = 70;

          for (var _i = 0; _i < indices.length; _i++) {
            // Only perturb the nodes that aren't fixed
            var _node = this.body.nodes[indices[_i]];

            if (_node.predefinedPosition === false) {
              _node.x += (0.5 - this._rng()) * offset;
              _node.y += (0.5 - this._rng()) * offset;
            }
          } // uncluster all clusters


          this._declusterAll(); // reposition all bezier nodes.


          this.body.emitter.emit("_repositionBezierNodes");
        }
      }
    }
    /**
     * Move all the nodes towards to the center so gravitational pull wil not move the nodes away from view
     * @private
     */

  }, {
    key: "_shiftToCenter",
    value: function _shiftToCenter() {
      var range = NetworkUtil.getRangeCore(this.body.nodes, this.body.nodeIndices);
      var center = NetworkUtil.findCenter(range);

      for (var i = 0; i < this.body.nodeIndices.length; i++) {
        var node = this.body.nodes[this.body.nodeIndices[i]];
        node.x -= center.x;
        node.y -= center.y;
      }
    }
    /**
     * Expands all clusters
     * @private
     */

  }, {
    key: "_declusterAll",
    value: function _declusterAll() {
      var clustersPresent = true;

      while (clustersPresent === true) {
        clustersPresent = false;

        for (var i = 0; i < this.body.nodeIndices.length; i++) {
          if (this.body.nodes[this.body.nodeIndices[i]].isCluster === true) {
            clustersPresent = true;
            this.body.modules.clustering.openCluster(this.body.nodeIndices[i], {}, false);
          }
        }

        if (clustersPresent === true) {
          this.body.emitter.emit('_dataChanged');
        }
      }
    }
    /**
     *
     * @returns {number|*}
     */

  }, {
    key: "getSeed",
    value: function getSeed() {
      return this.initialRandomSeed;
    }
    /**
     * This is the main function to layout the nodes in a hierarchical way.
     * It checks if the node details are supplied correctly
     *
     * @private
     */

  }, {
    key: "setupHierarchicalLayout",
    value: function setupHierarchicalLayout() {
      if (this.options.hierarchical.enabled === true && this.body.nodeIndices.length > 0) {
        // get the size of the largest hubs and check if the user has defined a level for a node.
        var node, nodeId;
        var definedLevel = false;
        var undefinedLevel = false;
        this.lastNodeOnLevel = {};
        this.hierarchical = new HierarchicalStatus();

        for (nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            node = this.body.nodes[nodeId];

            if (node.options.level !== undefined) {
              definedLevel = true;
              this.hierarchical.levels[nodeId] = node.options.level;
            } else {
              undefinedLevel = true;
            }
          }
        } // if the user defined some levels but not all, alert and run without hierarchical layout


        if (undefinedLevel === true && definedLevel === true) {
          throw new Error('To use the hierarchical layout, nodes require either no predefined levels' + ' or levels have to be defined for all nodes.');
        } else {
          // define levels if undefined by the users. Based on hubsize.
          if (undefinedLevel === true) {
            var sortMethod = this.options.hierarchical.sortMethod;

            if (sortMethod === 'hubsize') {
              this._determineLevelsByHubsize();
            } else if (sortMethod === 'directed') {
              this._determineLevelsDirected();
            } else if (sortMethod === 'custom') {
              this._determineLevelsCustomCallback();
            }
          } // fallback for cases where there are nodes but no edges


          for (var _nodeId2 in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, _nodeId2)) {
              this.hierarchical.ensureLevel(_nodeId2);
            }
          } // check the distribution of the nodes per level.


          var distribution = this._getDistribution(); // get the parent children relations.


          this._generateMap(); // place the nodes on the canvas.


          this._placeNodesByHierarchy(distribution); // condense the whitespace.


          this._condenseHierarchy(); // shift to center so gravity does not have to do much


          this._shiftToCenter();
        }
      }
    }
    /**
     * @private
     */

  }, {
    key: "_condenseHierarchy",
    value: function _condenseHierarchy() {
      var _this3 = this;

      // Global var in this scope to define when the movement has stopped.
      var stillShifting = false;
      var branches = {}; // first we have some methods to help shifting trees around.
      // the main method to shift the trees

      var shiftTrees = function shiftTrees() {
        var treeSizes = getTreeSizes();
        var shiftBy = 0;

        for (var i = 0; i < treeSizes.length - 1; i++) {
          var diff = treeSizes[i].max - treeSizes[i + 1].min;
          shiftBy += diff + _this3.options.hierarchical.treeSpacing;
          shiftTree(i + 1, shiftBy);
        }
      }; // shift a single tree by an offset


      var shiftTree = function shiftTree(index, offset) {
        var trees = _this3.hierarchical.trees;

        for (var nodeId in trees) {
          if (Object.prototype.hasOwnProperty.call(trees, nodeId)) {
            if (trees[nodeId] === index) {
              _this3.direction.shift(nodeId, offset);
            }
          }
        }
      }; // get the width of all trees


      var getTreeSizes = function getTreeSizes() {
        var treeWidths = [];

        for (var i = 0; i < _this3.hierarchical.numTrees(); i++) {
          treeWidths.push(_this3.direction.getTreeSize(i));
        }

        return treeWidths;
      }; // get a map of all nodes in this branch


      var getBranchNodes = function getBranchNodes(source, map) {
        if (map[source.id]) {
          return;
        }

        map[source.id] = true;

        if (_this3.hierarchical.childrenReference[source.id]) {
          var children = _this3.hierarchical.childrenReference[source.id];

          if (children.length > 0) {
            for (var i = 0; i < children.length; i++) {
              getBranchNodes(_this3.body.nodes[children[i]], map);
            }
          }
        }
      }; // get a min max width as well as the maximum movement space it has on either sides
      // we use min max terminology because width and height can interchange depending on the direction of the layout


      var getBranchBoundary = function getBranchBoundary(branchMap) {
        var maxLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e9;
        var minSpace = 1e9;
        var maxSpace = 1e9;
        var min = 1e9;
        var max = -1e9;

        for (var branchNode in branchMap) {
          if (Object.prototype.hasOwnProperty.call(branchMap, branchNode)) {
            var node = _this3.body.nodes[branchNode];
            var level = _this3.hierarchical.levels[node.id];

            var position = _this3.direction.getPosition(node); // get the space around the node.


            var _this3$_getSpaceAroun = _this3._getSpaceAroundNode(node, branchMap),
                _this3$_getSpaceAroun2 = slicedToArray(_this3$_getSpaceAroun, 2),
                minSpaceNode = _this3$_getSpaceAroun2[0],
                maxSpaceNode = _this3$_getSpaceAroun2[1];

            minSpace = Math.min(minSpaceNode, minSpace);
            maxSpace = Math.min(maxSpaceNode, maxSpace); // the width is only relevant for the levels two nodes have in common. This is why we filter on this.

            if (level <= maxLevel) {
              min = Math.min(position, min);
              max = Math.max(position, max);
            }
          }
        }

        return [min, max, minSpace, maxSpace];
      }; // check what the maximum level is these nodes have in common.


      var getCollisionLevel = function getCollisionLevel(node1, node2) {
        var maxLevel1 = _this3.hierarchical.getMaxLevel(node1.id);

        var maxLevel2 = _this3.hierarchical.getMaxLevel(node2.id);

        return Math.min(maxLevel1, maxLevel2);
      };
      /**
       * Condense elements. These can be nodes or branches depending on the callback.
       *
       * @param {function} callback
       * @param {Array.<number>} levels
       * @param {*} centerParents
       */


      var shiftElementsCloser = function shiftElementsCloser(callback, levels, centerParents) {
        var hier = _this3.hierarchical;

        for (var i = 0; i < levels.length; i++) {
          var level = levels[i];
          var levelNodes = hier.distributionOrdering[level];

          if (levelNodes.length > 1) {
            for (var j = 0; j < levelNodes.length - 1; j++) {
              var node1 = levelNodes[j];
              var node2 = levelNodes[j + 1]; // NOTE: logic maintained as it was; if nodes have same ancestor,
              //       then of course they are in the same sub-network.

              if (hier.hasSameParent(node1, node2) && hier.inSameSubNetwork(node1, node2)) {
                callback(node1, node2, centerParents);
              }
            }
          }
        }
      }; // callback for shifting branches


      var branchShiftCallback = function branchShiftCallback(node1, node2) {
        var centerParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        //window.CALLBACKS.push(() => {
        var pos1 = _this3.direction.getPosition(node1);

        var pos2 = _this3.direction.getPosition(node2);

        var diffAbs = Math.abs(pos2 - pos1);
        var nodeSpacing = _this3.options.hierarchical.nodeSpacing; //console.log("NOW CHECKING:", node1.id, node2.id, diffAbs);

        if (diffAbs > nodeSpacing) {
          var branchNodes1 = {};
          var branchNodes2 = {};
          getBranchNodes(node1, branchNodes1);
          getBranchNodes(node2, branchNodes2); // check the largest distance between the branches

          var maxLevel = getCollisionLevel(node1, node2);
          var branchNodeBoundary1 = getBranchBoundary(branchNodes1, maxLevel);
          var branchNodeBoundary2 = getBranchBoundary(branchNodes2, maxLevel);
          var max1 = branchNodeBoundary1[1];
          var min2 = branchNodeBoundary2[0];
          var minSpace2 = branchNodeBoundary2[2]; //console.log(node1.id, getBranchBoundary(branchNodes1, maxLevel), node2.id,
          //            getBranchBoundary(branchNodes2, maxLevel), maxLevel);

          var diffBranch = Math.abs(max1 - min2);

          if (diffBranch > nodeSpacing) {
            var offset = max1 - min2 + nodeSpacing;

            if (offset < -minSpace2 + nodeSpacing) {
              offset = -minSpace2 + nodeSpacing; //console.log("RESETTING OFFSET", max1 - min2 + this.options.hierarchical.nodeSpacing, -minSpace2, offset);
            }

            if (offset < 0) {
              //console.log("SHIFTING", node2.id, offset);
              _this3._shiftBlock(node2.id, offset);

              stillShifting = true;
              if (centerParent === true) _this3._centerParent(node2);
            }
          }
        } //this.body.emitter.emit("_redraw");})

      };

      var minimizeEdgeLength = function minimizeEdgeLength(iterations, node) {
        //window.CALLBACKS.push(() => {
        //  console.log("ts",node.id);
        var nodeId = node.id;
        var allEdges = node.edges;
        var nodeLevel = _this3.hierarchical.levels[node.id]; // gather constants

        var C2 = _this3.options.hierarchical.levelSeparation * _this3.options.hierarchical.levelSeparation;
        var referenceNodes = {};
        var aboveEdges = [];

        for (var i = 0; i < allEdges.length; i++) {
          var edge = allEdges[i];

          if (edge.toId != edge.fromId) {
            var otherNode = edge.toId == nodeId ? edge.from : edge.to;
            referenceNodes[allEdges[i].id] = otherNode;

            if (_this3.hierarchical.levels[otherNode.id] < nodeLevel) {
              aboveEdges.push(edge);
            }
          }
        } // differentiated sum of lengths based on only moving one node over one axis


        var getFx = function getFx(point, edges) {
          var sum = 0;

          for (var _i2 = 0; _i2 < edges.length; _i2++) {
            if (referenceNodes[edges[_i2].id] !== undefined) {
              var a = _this3.direction.getPosition(referenceNodes[edges[_i2].id]) - point;
              sum += a / Math.sqrt(a * a + C2);
            }
          }

          return sum;
        }; // doubly differentiated sum of lengths based on only moving one node over one axis


        var getDFx = function getDFx(point, edges) {
          var sum = 0;

          for (var _i3 = 0; _i3 < edges.length; _i3++) {
            if (referenceNodes[edges[_i3].id] !== undefined) {
              var a = _this3.direction.getPosition(referenceNodes[edges[_i3].id]) - point;
              sum -= C2 * Math.pow(a * a + C2, -1.5);
            }
          }

          return sum;
        };

        var getGuess = function getGuess(iterations, edges) {
          var guess = _this3.direction.getPosition(node); // Newton's method for optimization


          var guessMap = {};

          for (var _i4 = 0; _i4 < iterations; _i4++) {
            var fx = getFx(guess, edges);
            var dfx = getDFx(guess, edges); // we limit the movement to avoid instability.

            var limit = 40;
            var ratio = Math.max(-limit, Math.min(limit, Math.round(fx / dfx)));
            guess = guess - ratio; // reduce duplicates

            if (guessMap[guess] !== undefined) {
              break;
            }

            guessMap[guess] = _i4;
          }

          return guess;
        };

        var moveBranch = function moveBranch(guess) {
          // position node if there is space
          var nodePosition = _this3.direction.getPosition(node); // check movable area of the branch


          if (branches[node.id] === undefined) {
            var branchNodes = {};
            getBranchNodes(node, branchNodes);
            branches[node.id] = branchNodes;
          }

          var branchBoundary = getBranchBoundary(branches[node.id]);
          var minSpaceBranch = branchBoundary[2];
          var maxSpaceBranch = branchBoundary[3];
          var diff = guess - nodePosition; // check if we are allowed to move the node:

          var branchOffset = 0;

          if (diff > 0) {
            branchOffset = Math.min(diff, maxSpaceBranch - _this3.options.hierarchical.nodeSpacing);
          } else if (diff < 0) {
            branchOffset = -Math.min(-diff, minSpaceBranch - _this3.options.hierarchical.nodeSpacing);
          }

          if (branchOffset != 0) {
            //console.log("moving branch:",branchOffset, maxSpaceBranch, minSpaceBranch)
            _this3._shiftBlock(node.id, branchOffset); //this.body.emitter.emit("_redraw");


            stillShifting = true;
          }
        };

        var moveNode = function moveNode(guess) {
          var nodePosition = _this3.direction.getPosition(node); // position node if there is space


          var _this3$_getSpaceAroun3 = _this3._getSpaceAroundNode(node),
              _this3$_getSpaceAroun4 = slicedToArray(_this3$_getSpaceAroun3, 2),
              minSpace = _this3$_getSpaceAroun4[0],
              maxSpace = _this3$_getSpaceAroun4[1];

          var diff = guess - nodePosition; // check if we are allowed to move the node:

          var newPosition = nodePosition;

          if (diff > 0) {
            newPosition = Math.min(nodePosition + (maxSpace - _this3.options.hierarchical.nodeSpacing), guess);
          } else if (diff < 0) {
            newPosition = Math.max(nodePosition - (minSpace - _this3.options.hierarchical.nodeSpacing), guess);
          }

          if (newPosition !== nodePosition) {
            //console.log("moving Node:",diff, minSpace, maxSpace);
            _this3.direction.setPosition(node, newPosition); //this.body.emitter.emit("_redraw");


            stillShifting = true;
          }
        };

        var guess = getGuess(iterations, aboveEdges);
        moveBranch(guess);
        guess = getGuess(iterations, allEdges);
        moveNode(guess); //})
      }; // method to remove whitespace between branches. Because we do bottom up, we can center the parents.


      var minimizeEdgeLengthBottomUp = function minimizeEdgeLengthBottomUp(iterations) {
        var levels = _this3.hierarchical.getLevels();

        levels = reverse$2(levels).call(levels);

        for (var i = 0; i < iterations; i++) {
          stillShifting = false;

          for (var j = 0; j < levels.length; j++) {
            var level = levels[j];
            var levelNodes = _this3.hierarchical.distributionOrdering[level];

            for (var k = 0; k < levelNodes.length; k++) {
              minimizeEdgeLength(1000, levelNodes[k]);
            }
          }

          if (stillShifting !== true) {
            //console.log("FINISHED minimizeEdgeLengthBottomUp IN " + i);
            break;
          }
        }
      }; // method to remove whitespace between branches. Because we do bottom up, we can center the parents.


      var shiftBranchesCloserBottomUp = function shiftBranchesCloserBottomUp(iterations) {
        var levels = _this3.hierarchical.getLevels();

        levels = reverse$2(levels).call(levels);

        for (var i = 0; i < iterations; i++) {
          stillShifting = false;
          shiftElementsCloser(branchShiftCallback, levels, true);

          if (stillShifting !== true) {
            //console.log("FINISHED shiftBranchesCloserBottomUp IN " + (i+1));
            break;
          }
        }
      }; // center all parents


      var centerAllParents = function centerAllParents() {
        for (var nodeId in _this3.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(_this3.body.nodes, nodeId)) _this3._centerParent(_this3.body.nodes[nodeId]);
        }
      }; // center all parents


      var centerAllParentsBottomUp = function centerAllParentsBottomUp() {
        var levels = _this3.hierarchical.getLevels();

        levels = reverse$2(levels).call(levels);

        for (var i = 0; i < levels.length; i++) {
          var level = levels[i];
          var levelNodes = _this3.hierarchical.distributionOrdering[level];

          for (var j = 0; j < levelNodes.length; j++) {
            _this3._centerParent(levelNodes[j]);
          }
        }
      }; // the actual work is done here.


      if (this.options.hierarchical.blockShifting === true) {
        shiftBranchesCloserBottomUp(5);
        centerAllParents();
      } // minimize edge length


      if (this.options.hierarchical.edgeMinimization === true) {
        minimizeEdgeLengthBottomUp(20);
      }

      if (this.options.hierarchical.parentCentralization === true) {
        centerAllParentsBottomUp();
      }

      shiftTrees();
    }
    /**
     * This gives the space around the node. IF a map is supplied, it will only check against nodes NOT in the map.
     * This is used to only get the distances to nodes outside of a branch.
     * @param {Node} node
     * @param {{Node.id: vis.Node}} map
     * @returns {number[]}
     * @private
     */

  }, {
    key: "_getSpaceAroundNode",
    value: function _getSpaceAroundNode(node, map) {
      var useMap = true;

      if (map === undefined) {
        useMap = false;
      }

      var level = this.hierarchical.levels[node.id];

      if (level !== undefined) {
        var index = this.hierarchical.distributionIndex[node.id];
        var position = this.direction.getPosition(node);
        var ordering = this.hierarchical.distributionOrdering[level];
        var minSpace = 1e9;
        var maxSpace = 1e9;

        if (index !== 0) {
          var prevNode = ordering[index - 1];

          if (useMap === true && map[prevNode.id] === undefined || useMap === false) {
            var prevPos = this.direction.getPosition(prevNode);
            minSpace = position - prevPos;
          }
        }

        if (index != ordering.length - 1) {
          var nextNode = ordering[index + 1];

          if (useMap === true && map[nextNode.id] === undefined || useMap === false) {
            var nextPos = this.direction.getPosition(nextNode);
            maxSpace = Math.min(maxSpace, nextPos - position);
          }
        }

        return [minSpace, maxSpace];
      } else {
        return [0, 0];
      }
    }
    /**
     * We use this method to center a parent node and check if it does not cross other nodes when it does.
     * @param {Node} node
     * @private
     */

  }, {
    key: "_centerParent",
    value: function _centerParent(node) {
      if (this.hierarchical.parentReference[node.id]) {
        var parents = this.hierarchical.parentReference[node.id];

        for (var i = 0; i < parents.length; i++) {
          var parentId = parents[i];
          var parentNode = this.body.nodes[parentId];
          var children = this.hierarchical.childrenReference[parentId];

          if (children !== undefined) {
            // get the range of the children
            var newPosition = this._getCenterPosition(children);

            var position = this.direction.getPosition(parentNode);

            var _this$_getSpaceAround = this._getSpaceAroundNode(parentNode),
                _this$_getSpaceAround2 = slicedToArray(_this$_getSpaceAround, 2),
                minSpace = _this$_getSpaceAround2[0],
                maxSpace = _this$_getSpaceAround2[1];

            var diff = position - newPosition;

            if (diff < 0 && Math.abs(diff) < maxSpace - this.options.hierarchical.nodeSpacing || diff > 0 && Math.abs(diff) < minSpace - this.options.hierarchical.nodeSpacing) {
              this.direction.setPosition(parentNode, newPosition);
            }
          }
        }
      }
    }
    /**
     * This function places the nodes on the canvas based on the hierarchial distribution.
     *
     * @param {Object} distribution | obtained by the function this._getDistribution()
     * @private
     */

  }, {
    key: "_placeNodesByHierarchy",
    value: function _placeNodesByHierarchy(distribution) {
      this.positionedNodes = {}; // start placing all the level 0 nodes first. Then recursively position their branches.

      for (var level in distribution) {
        if (Object.prototype.hasOwnProperty.call(distribution, level)) {
          var _context;

          // sort nodes in level by position:
          var nodeArray = keys$3(distribution[level]);

          nodeArray = this._indexArrayToNodes(nodeArray);

          sort$2(_context = this.direction).call(_context, nodeArray);

          var handledNodeCount = 0;

          for (var i = 0; i < nodeArray.length; i++) {
            var node = nodeArray[i];

            if (this.positionedNodes[node.id] === undefined) {
              var spacing = this.options.hierarchical.nodeSpacing;
              var pos = spacing * handledNodeCount; // We get the X or Y values we need and store them in pos and previousPos.
              // The get and set make sure we get X or Y

              if (handledNodeCount > 0) {
                pos = this.direction.getPosition(nodeArray[i - 1]) + spacing;
              }

              this.direction.setPosition(node, pos, level);

              this._validatePositionAndContinue(node, level, pos);

              handledNodeCount++;
            }
          }
        }
      }
    }
    /**
     * This is a recursively called function to enumerate the branches from the largest hubs and place the nodes
     * on a X position that ensures there will be no overlap.
     *
     * @param {Node.id} parentId
     * @param {number} parentLevel
     * @private
     */

  }, {
    key: "_placeBranchNodes",
    value: function _placeBranchNodes(parentId, parentLevel) {
      var _context2;

      var childRef = this.hierarchical.childrenReference[parentId]; // if this is not a parent, cancel the placing. This can happen with multiple parents to one child.

      if (childRef === undefined) {
        return;
      } // get a list of childNodes


      var childNodes = [];

      for (var i = 0; i < childRef.length; i++) {
        childNodes.push(this.body.nodes[childRef[i]]);
      } // use the positions to order the nodes.


      sort$2(_context2 = this.direction).call(_context2, childNodes); // position the childNodes


      for (var _i5 = 0; _i5 < childNodes.length; _i5++) {
        var childNode = childNodes[_i5];
        var childNodeLevel = this.hierarchical.levels[childNode.id]; // check if the child node is below the parent node and if it has already been positioned.

        if (childNodeLevel > parentLevel && this.positionedNodes[childNode.id] === undefined) {
          // get the amount of space required for this node. If parent the width is based on the amount of children.
          var spacing = this.options.hierarchical.nodeSpacing;
          var pos = void 0; // we get the X or Y values we need and store them in pos and previousPos.
          // The get and set make sure we get X or Y

          if (_i5 === 0) {
            pos = this.direction.getPosition(this.body.nodes[parentId]);
          } else {
            pos = this.direction.getPosition(childNodes[_i5 - 1]) + spacing;
          }

          this.direction.setPosition(childNode, pos, childNodeLevel);

          this._validatePositionAndContinue(childNode, childNodeLevel, pos);
        } else {
          return;
        }
      } // center the parent nodes.


      var center = this._getCenterPosition(childNodes);

      this.direction.setPosition(this.body.nodes[parentId], center, parentLevel);
    }
    /**
     * This method checks for overlap and if required shifts the branch. It also keeps records of positioned nodes.
     * Finally it will call _placeBranchNodes to place the branch nodes.
     * @param {Node} node
     * @param {number} level
     * @param {number} pos
     * @private
     */

  }, {
    key: "_validatePositionAndContinue",
    value: function _validatePositionAndContinue(node, level, pos) {
      // This method only works for formal trees and formal forests
      // Early exit if this is not the case
      if (!this.hierarchical.isTree) return; // if overlap has been detected, we shift the branch

      if (this.lastNodeOnLevel[level] !== undefined) {
        var previousPos = this.direction.getPosition(this.body.nodes[this.lastNodeOnLevel[level]]);

        if (pos - previousPos < this.options.hierarchical.nodeSpacing) {
          var diff = previousPos + this.options.hierarchical.nodeSpacing - pos;

          var sharedParent = this._findCommonParent(this.lastNodeOnLevel[level], node.id);

          this._shiftBlock(sharedParent.withChild, diff);
        }
      }

      this.lastNodeOnLevel[level] = node.id; // store change in position.

      this.positionedNodes[node.id] = true;

      this._placeBranchNodes(node.id, level);
    }
    /**
     * Receives an array with node indices and returns an array with the actual node references.
     * Used for sorting based on node properties.
     * @param {Array.<Node.id>} idArray
     * @returns {Array.<Node>}
     */

  }, {
    key: "_indexArrayToNodes",
    value: function _indexArrayToNodes(idArray) {
      var array = [];

      for (var i = 0; i < idArray.length; i++) {
        array.push(this.body.nodes[idArray[i]]);
      }

      return array;
    }
    /**
     * This function get the distribution of levels based on hubsize
     *
     * @returns {Object}
     * @private
     */

  }, {
    key: "_getDistribution",
    value: function _getDistribution() {
      var distribution = {};
      var nodeId, node; // we fix Y because the hierarchy is vertical,
      // we fix X so we do not give a node an x position for a second time.
      // the fix of X is removed after the x value has been set.

      for (nodeId in this.body.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
          node = this.body.nodes[nodeId];
          var level = this.hierarchical.levels[nodeId] === undefined ? 0 : this.hierarchical.levels[nodeId];
          this.direction.fix(node, level);

          if (distribution[level] === undefined) {
            distribution[level] = {};
          }

          distribution[level][nodeId] = node;
        }
      }

      return distribution;
    }
    /**
     * Return the active (i.e. visible) edges for this node
     *
     * @param {Node} node
     * @returns {Array.<vis.Edge>} Array of edge instances
     * @private
     */

  }, {
    key: "_getActiveEdges",
    value: function _getActiveEdges(node) {
      var _this4 = this;

      var result = [];
      forEach$3(node.edges, function (edge) {
        var _context3;

        if (indexOf$3(_context3 = _this4.body.edgeIndices).call(_context3, edge.id) !== -1) {
          result.push(edge);
        }
      });
      return result;
    }
    /**
     * Get the hubsizes for all active nodes.
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getHubSizes",
    value: function _getHubSizes() {
      var _this5 = this;

      var hubSizes = {};
      var nodeIds = this.body.nodeIndices;
      forEach$3(nodeIds, function (nodeId) {
        var node = _this5.body.nodes[nodeId];

        var hubSize = _this5._getActiveEdges(node).length;

        hubSizes[hubSize] = true;
      }); // Make an array of the size sorted descending

      var result = [];
      forEach$3(hubSizes, function (size) {
        result.push(Number(size));
      });

      sort$2(timsort$1).call(timsort$1, result, function (a, b) {
        return b - a;
      });

      return result;
    }
    /**
     * this function allocates nodes in levels based on the recursive branching from the largest hubs.
     *
     * @private
     */

  }, {
    key: "_determineLevelsByHubsize",
    value: function _determineLevelsByHubsize() {
      var _this6 = this;

      var levelDownstream = function levelDownstream(nodeA, nodeB) {
        _this6.hierarchical.levelDownstream(nodeA, nodeB);
      };

      var hubSizes = this._getHubSizes();

      var _loop = function _loop(i) {
        var hubSize = hubSizes[i];
        if (hubSize === 0) return "break";
        forEach$3(_this6.body.nodeIndices, function (nodeId) {
          var node = _this6.body.nodes[nodeId];

          if (hubSize === _this6._getActiveEdges(node).length) {
            _this6._crawlNetwork(levelDownstream, nodeId);
          }
        });
      };

      for (var i = 0; i < hubSizes.length; ++i) {
        var _ret = _loop(i);

        if (_ret === "break") break;
      }
    }
    /**
     * TODO: release feature
     * TODO: Determine if this feature is needed at all
     *
     * @private
     */

  }, {
    key: "_determineLevelsCustomCallback",
    value: function _determineLevelsCustomCallback() {
      var _this7 = this;

      var minLevel = 100000; // TODO: this should come from options.

      var customCallback = function customCallback(nodeA, nodeB, edge) {// eslint-disable-line no-unused-vars
      }; // TODO: perhaps move to HierarchicalStatus.
      //       But I currently don't see the point, this method is not used.


      var levelByDirection = function levelByDirection(nodeA, nodeB, edge) {
        var levelA = _this7.hierarchical.levels[nodeA.id]; // set initial level

        if (levelA === undefined) {
          levelA = _this7.hierarchical.levels[nodeA.id] = minLevel;
        }

        var diff = customCallback(NetworkUtil.cloneOptions(nodeA, 'node'), NetworkUtil.cloneOptions(nodeB, 'node'), NetworkUtil.cloneOptions(edge, 'edge'));
        _this7.hierarchical.levels[nodeB.id] = levelA + diff;
      };

      this._crawlNetwork(levelByDirection);

      this.hierarchical.setMinLevelToZero(this.body.nodes);
    }
    /**
     * Allocate nodes in levels based on the direction of the edges.
     *
     * @private
     */

  }, {
    key: "_determineLevelsDirected",
    value: function _determineLevelsDirected() {
      var _context4,
          _this8 = this;

      var nodes = reduce$2(_context4 = this.body.nodeIndices).call(_context4, function (acc, id) {
        acc.set(id, _this8.body.nodes[id]);
        return acc;
      }, new map$5());

      var levels = this.hierarchical.levels;

      if (this.options.hierarchical.shakeTowards === "roots") {
        this.hierarchical.levels = fillLevelsByDirectionRoots(nodes, levels);
      } else {
        this.hierarchical.levels = fillLevelsByDirectionLeaves(nodes, levels);
      }

      this.hierarchical.setMinLevelToZero(this.body.nodes);
    }
    /**
     * Update the bookkeeping of parent and child.
     * @private
     */

  }, {
    key: "_generateMap",
    value: function _generateMap() {
      var _this9 = this;

      var fillInRelations = function fillInRelations(parentNode, childNode) {
        if (_this9.hierarchical.levels[childNode.id] > _this9.hierarchical.levels[parentNode.id]) {
          _this9.hierarchical.addRelation(parentNode.id, childNode.id);
        }
      };

      this._crawlNetwork(fillInRelations);

      this.hierarchical.checkIfTree();
    }
    /**
     * Crawl over the entire network and use a callback on each node couple that is connected to each other.
     * @param {function} [callback=function(){}]          | will receive nodeA, nodeB and the connecting edge. A and B are distinct.
     * @param {Node.id} startingNodeId
     * @private
     */

  }, {
    key: "_crawlNetwork",
    value: function _crawlNetwork() {
      var _this10 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var startingNodeId = arguments.length > 1 ? arguments[1] : undefined;
      var progress = {};

      var crawler = function crawler(node, tree) {
        if (progress[node.id] === undefined) {
          _this10.hierarchical.setTreeIndex(node, tree);

          progress[node.id] = true;
          var childNode;

          var edges = _this10._getActiveEdges(node);

          for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];

            if (edge.connected === true) {
              if (edge.toId == node.id) {
                // Not '===' because id's can be string and numeric
                childNode = edge.from;
              } else {
                childNode = edge.to;
              }

              if (node.id != childNode.id) {
                // Not '!==' because id's can be string and numeric
                callback(node, childNode, edge);
                crawler(childNode, tree);
              }
            }
          }
        }
      };

      if (startingNodeId === undefined) {
        // Crawl over all nodes
        var treeIndex = 0; // Serves to pass a unique id for the current distinct tree

        for (var i = 0; i < this.body.nodeIndices.length; i++) {
          var nodeId = this.body.nodeIndices[i];

          if (progress[nodeId] === undefined) {
            var node = this.body.nodes[nodeId];
            crawler(node, treeIndex);
            treeIndex += 1;
          }
        }
      } else {
        // Crawl from the given starting node
        var _node2 = this.body.nodes[startingNodeId];

        if (_node2 === undefined) {
          console.error("Node not found:", startingNodeId);
          return;
        }

        crawler(_node2);
      }
    }
    /**
     * Shift a branch a certain distance
     * @param {Node.id} parentId
     * @param {number} diff
     * @private
     */

  }, {
    key: "_shiftBlock",
    value: function _shiftBlock(parentId, diff) {
      var _this11 = this;

      var progress = {};

      var shifter = function shifter(parentId) {
        if (progress[parentId]) {
          return;
        }

        progress[parentId] = true;

        _this11.direction.shift(parentId, diff);

        var childRef = _this11.hierarchical.childrenReference[parentId];

        if (childRef !== undefined) {
          for (var i = 0; i < childRef.length; i++) {
            shifter(childRef[i]);
          }
        }
      };

      shifter(parentId);
    }
    /**
     * Find a common parent between branches.
     * @param {Node.id} childA
     * @param {Node.id} childB
     * @returns {{foundParent, withChild}}
     * @private
     */

  }, {
    key: "_findCommonParent",
    value: function _findCommonParent(childA, childB) {
      var _this12 = this;

      var parents = {};

      var iterateParents = function iterateParents(parents, child) {
        var parentRef = _this12.hierarchical.parentReference[child];

        if (parentRef !== undefined) {
          for (var i = 0; i < parentRef.length; i++) {
            var parent = parentRef[i];
            parents[parent] = true;
            iterateParents(parents, parent);
          }
        }
      };

      var findParent = function findParent(parents, child) {
        var parentRef = _this12.hierarchical.parentReference[child];

        if (parentRef !== undefined) {
          for (var i = 0; i < parentRef.length; i++) {
            var parent = parentRef[i];

            if (parents[parent] !== undefined) {
              return {
                foundParent: parent,
                withChild: child
              };
            }

            var branch = findParent(parents, parent);

            if (branch.foundParent !== null) {
              return branch;
            }
          }
        }

        return {
          foundParent: null,
          withChild: child
        };
      };

      iterateParents(parents, childA);
      return findParent(parents, childB);
    }
    /**
     * Set the strategy pattern for handling the coordinates given the current direction.
     *
     * The individual instances contain all the operations and data specific to a layout direction.
     *
     * @param {Node} node
     * @param {{x: number, y: number}} position
     * @param {number} level
     * @param {boolean} [doNotUpdate=false]
     * @private
     */

  }, {
    key: "setDirectionStrategy",
    value: function setDirectionStrategy() {
      var isVertical = this.options.hierarchical.direction === 'UD' || this.options.hierarchical.direction === 'DU';

      if (isVertical) {
        this.direction = new VerticalStrategy(this);
      } else {
        this.direction = new HorizontalStrategy(this);
      }
    }
    /**
     * Determine the center position of a branch from the passed list of child nodes
     *
     * This takes into account the positions of all the child nodes.
     * @param {Array.<Node|vis.Node.id>} childNodes  Array of either child nodes or node id's
     * @return {number}
     * @private
     */

  }, {
    key: "_getCenterPosition",
    value: function _getCenterPosition(childNodes) {
      var minPos = 1e9;
      var maxPos = -1e9;

      for (var i = 0; i < childNodes.length; i++) {
        var childNode = void 0;

        if (childNodes[i].id !== undefined) {
          childNode = childNodes[i];
        } else {
          var childNodeId = childNodes[i];
          childNode = this.body.nodes[childNodeId];
        }

        var position = this.direction.getPosition(childNode);
        minPos = Math.min(minPos, position);
        maxPos = Math.max(maxPos, position);
      }

      return 0.5 * (minPos + maxPos);
    }
  }]);

  return LayoutEngine;
}();

/**
 * Clears the toolbar div element of children
 *
 * @private
 */

var ManipulationSystem = /*#__PURE__*/function () {
  /**
   * @param {Object} body
   * @param {Canvas} canvas
   * @param {SelectionHandler} selectionHandler
   * @param {InteractionHandler} interactionHandler
   */
  function ManipulationSystem(body, canvas, selectionHandler, interactionHandler) {
    var _this = this,
        _context,
        _context2;

    classCallCheck(this, ManipulationSystem);

    this.body = body;
    this.canvas = canvas;
    this.selectionHandler = selectionHandler;
    this.interactionHandler = interactionHandler;
    this.editMode = false;
    this.manipulationDiv = undefined;
    this.editModeDiv = undefined;
    this.closeDiv = undefined;
    this.manipulationHammers = [];
    this.temporaryUIFunctions = {};
    this.temporaryEventFunctions = [];
    this.touchTime = 0;
    this.temporaryIds = {
      nodes: [],
      edges: []
    };
    this.guiEnabled = false;
    this.inMode = false;
    this.selectedControlNode = undefined;
    this.options = {};
    this.defaultOptions = {
      enabled: false,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editNode: undefined,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
      controlNodeStyle: {
        shape: 'dot',
        size: 6,
        color: {
          background: '#ff0000',
          border: '#3c3c3c',
          highlight: {
            background: '#07f968',
            border: '#3c3c3c'
          }
        },
        borderWidth: 2,
        borderWidthSelected: 2
      }
    };

    assign$2(this.options, this.defaultOptions);

    this.body.emitter.on('destroy', function () {
      _this._clean();
    });
    this.body.emitter.on('_dataChanged', bind$2(_context = this._restore).call(_context, this));
    this.body.emitter.on('_resetData', bind$2(_context2 = thi