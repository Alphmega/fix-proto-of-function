if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = function(a, b) {
    a.__proto__ = b;
    return b
  }
}
if (!(function() {
  function a() {}
  a.b = 111;
  function b() {}
  Object.setPrototypeOf(b, a);
  return !!b.b;
})()) {
  var oldSetPrototypeOf = Object.setPrototypeOf;
  function e() {}
  function getAllFunctionDescriptors(b) {
    return Object.getOwnPropertyNames(b).filter(function(i) {
      return !e.hasOwnProperty(i) && i !== '__proto__';
    }).map(function(i){
      var desc = Object.getOwnPropertyDescriptor(b, i);
      return {
        key: i,
        value: desc.value,
        writable: desc.writable || true,
        get: desc.get,
        set: desc.set,
        configurable: desc.configurable || true,
        enumerable: desc.enumerable || true
      };
    })
  }
  function own(a, key) {
    return {}.hasOwnProperty.call(a, key);
  }
  Object.setPrototypeOf = function(a, b) {
    if (typeof a === 'function') {
      a.__proto__ = b;
      getAllFunctionDescriptors(b).forEach(function(descriptor) {
        if (!own(a, descriptor.key)) {
          var ownKey = '__own_' + descriptor.key;
          descriptor = {
            key: descriptor.key,
            get: descriptor.get || function() {
              if (own(this, ownKey)) {
                return this[ownKey];
              } else {
                return this.__proto__[descriptor.key];
              }
            },
            set: descriptor.set || function(s) {
              this[ownKey] = s;
            }
          };
          Object.defineProperty(a, descriptor.key, descriptor);
        }
      });
      return a;
    } else {
      return oldSetPrototypeOf(a, b)
    }
  }
}
