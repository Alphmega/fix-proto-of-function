这个js是为了解决IE10以下不支持function的proto使用的

This js is used to solve the problem that IE10 does not support ```function.__proto__```


方案是覆盖setPrototypeOf方法，使用setter和getter来模拟原型链的效果

The solution is to override the setPrototypeOf method and use setters and getters to simulate prototype chain



