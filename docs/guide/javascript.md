# 目录
[[toc]]



## 虚拟dom和真实dom

[https://www.cnblogs.com/wind-lanyan/p/9061684.html](https://www.cnblogs.com/wind-lanyan/p/9061684.html ) 



## BFC（Block Formatting Context）

触发 BFC （块级格式化上下文）的方式有以下几种：

1. 默认情况下，根元素（html）会创建 BFC
2. 浮动元素（float 不为 none）
3. 绝对定位元素（position 为 absolute 或 fixed）
4. display 为 inline-block, table-cell, table-caption，flex，inline-flex,grid,inline-grid,flow-root
5. overflow 不为 visible

BFC 的作用主要有两个：

1. 阻止元素间的布局重叠，保证块级元素的正确显示
2. 规定了内部的元素如何布局，以及与外部元素的关系，例如文字环绕效果。



## 轮询

轮询是指在固定的时间间隔内不断发送请求的一种技术，实现轮询的方法有两种：

1. setInterval：使用setInterval函数可以每隔一定的时间执行一次请求，代码如下：

```js
javascriptCopy code
var timer = setInterval(function() {
    // 发送请求
}, 5000);
```

1. setTimeout：使用setTimeout函数可以每隔一定的时间执行一次请求，代码如下：

```js
scssCopy code
function request() {
    // 发送请求
    setTimeout(request, 5000);
}
request();
```

两种方法都可以实现轮询，但是setTimeout比setInterval更可靠，因为setTimeout不会被浏览器阻止，而setInterval在页面失去焦点时会停止。



请求成功不再轮询，失败继续轮询

代码如下：

```js
//例子
var isSuccess = false;

function request() {
  $.ajax({
    url: '请求地址',
    type: '请求方式',
    data: '请求数据',
    success: function (data) {
      isSuccess = true;
    },
    error: function (error) {
      console.error(error);
    }
  });
}

function poll() {
  if (!isSuccess) {
    request();
    setTimeout(poll, 1000);
  }
}

poll();
//例子
inquireData() {
      const reload = () => {
        clearTimeout(this.timer); // 清除定时器
        console.log("200ms一次, 轮询中");
        this.timer = setTimeout(() => {
          this.inquireData(); // 调用轮询
        }, 200);
      };
      let policyUID = getStorageSyncTime("SAVE_POLICY_INFO").tranNo;
      $api
        .signImageCommitResult({
          tranNo: policyUID,
        })
        .then(function (res1) {
          console.log("请求有结果");
          if (res1.status === "1") {
            toast("成功");
          } else {
            // toast("提交失败，请稍后重试");
            reload();
          }
        })
        .catch((err) => {
          // 请求错误,也继续轮询
          reload();
        });
    },
```



## 跨域

浏览器安全策略，它防止一个网站访问另一个网站的内容，同源策略（协议、域名、端口）

如果你想在网站上使用跨域资源，你可以使用跨域资源共享 (CORS) 技术。这是一种机制，允许网站在浏览器中发起跨域 HTTP 请求，从而允许访问跨域资源。



发送请求的方式：

```js
1.xhr
var xhr =  new XMLHttpRequest();
xhr.open();
xhr.send();
2.jQuery 核心主要封装Dom操作，vue用于减少Dom操作，请求数据引入jQuery不太合适
3.axios
4.fetch（与xhr同级）问题1.包裹两层promise需要两次then才能拿到数据2.兼容器问题，ie浏览器不能用
```

解决跨域的方式

```js
1.跨域资源共享 (CORS)  服务器端必须允许跨域访问，才能使用 CORS。如果服务器端没有设置响应头，浏览器会拒绝跨域请求。
2.使用 JSONP 的方式，是利用 script 标签的特性来实现跨域访问的技术(src访问外部资源不受同源策略的影响)。这种方式只能用于 GET 请求，并且无法发送自定义的 HTTP 头。
3.代理
```

## 原型和原型链

任何函数他都会有一个属性prototype，我们称之为这个函数的原型，原型也有原型属性，指向它的原型对象，以此类型就形成了一个原型链，



## Promise方法

​	相同点这四种方法的参数都是包含Promise实例的数组。https://juejin.cn/post/7042190759730085918

看下不同点：

作用：

- Promise.all() 全成功我成功 失败一个我失败(Promise.all如果是不全成功，它会返回第一个reject状态的Promise实例)

  ```js
  let p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(1)
      }, 1000)
  })
  let p2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(2)
      }, 2000)
  })
  let p3 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(3)
      }, 3000)
  })
  Promise.all([p3, p1, p2]).then(res => {
      console.log(res) 
  }).catch(err=>{
     console.log(err) // 2
  })
  ```

- Promise.race() 谁第一个改变状态就是谁的，无论成功或失败

  ```js
  let p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(1)
      }, 1000)
  })
  let p2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject("error")/resolve("succeed")
      }, 300)
  })
  let p3 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(3)
      }, 3000)
  })
  Promise.race([p3, p1, p2]).then(res => {
      console.log(res) //succeed
  }).catch(err=>{
     console.log(err) //error
  })
  ```

- Promise.allSettled() 管你成功或失败，全部都得运行完

  ```js
  
  let p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(1)
      }, 1000)
  })
  let p2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          resolve(2)
      }, 300)
  })
  let p3 = new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(3)
      }, 3000)
  })
  Promise.all([p3, p1, p2]).then(res => {
      console.log(res) //[{"status": "rejected","reason": 3},{"status": "fulfilled", "value": 1},{"status": "fulfilled", "value": 2}]
  }).catch(err=>{
     console.log(err) 
  })
  
  ```

- Promise.any() 一个成功我成功，全部失败我失败

状态成功时返回值：

- Promise.all() 返回状态成功时的数组
- Promise.race() 第一个成功的
- Promise.allSettled() 无所谓成功或失败，返回值都是一个包含状态对象的数组
- Promise.any() 返回第一个成功的

状态失败时返回值：

- Promise.all() 第一个失败的
- Promise.race() 第一个失败的
- Promise.allSettled() 无所谓成功或失败，返回值都是一个包含状态对象的数组
- Promise.any() AggregateError: All promises were rejected

是否将参数数组内部的Promise实例全部执行完，才调用

- Promise.all() 成功是是，失败是否
- Promise.race() 不是
- Promise.allSettled() 是
- Promise.any() 成功是否，失败是是

## Html元素和Node 节点

Html 元素和 Node 节点都是构成 HTML 文档的基本组成部分，但它们在概念上略有不同：

1. **Html 元素**：
   - HTML 元素是 HTML 文档的结构性组件，由开始标签、结束标签、属性和内容组成。
   - 每个 HTML 元素代表着页面上的一个特定的内容或结构单元，如段落、标题、图像等。
   - HTML 元素具有特定的语义含义和功能，如 `<p>` 表示段落、`<a>` 表示超链接等。
2. **Node 节点**：
   - Node 是 DOM（文档对象模型）中的一个概念，表示 DOM 树中的一个单个节点。
   - Node 是一个抽象的概念，可以是元素节点、文本节点、注释节点等。
   - HTML 元素是 DOM 中的一种特殊类型的节点，称为元素节点（Element Node）。
   - 除了元素节点外，还有文本节点（Text Node）、注释节点（Comment Node）、文档节点（Document Node）等。

因此，HTML 元素是 Node 节点的一种特殊类型，它们在 DOM 树中以节点的形式存在，同时具有特定的 HTML 结构和语义。

![img](https://ask.qcloudimg.com/http-save/yehe-2790081/6u7ou3xu27.png)<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0444ab68e8a44c85bc3870aa52625ac9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?" alt="image.png" style="zoom:50%;" />

## new 关键字

在 JavaScript 中，使用 `new` 关键字调用构造函数和不使用 `new` 关键字的区别是，使用 `new` 关键字调用构造函数会创建一个新的对象，并将其作为函数的 `this` 指向，而不使用 `new` 关键字调用构造函数则会将函数的 `this` 指向全局对象。

```js
function User(name) {
  this.name = name;
}

//使用new
const user = new User('John');
console.log(user.name); // John

//不使用new
const user = User('John');
console.log(user.name); // undefined
console.log(name); // John
```

当你使用 `new` 关键字调用构造函数时，JavaScript 引擎会执行以下步骤：

1. 创建一个空的简单 JavaScript 对象（即 **`{}`**）；
2. 为步骤 1 新创建的对象添加属性 **`__proto__`**，将该属性链接至构造函数的原型对象；
3. 将步骤 1 新创建的对象作为 **`this`** 的上下文；
4. 如果该函数没有返回对象，则返回 **`this`**



## 防抖和节流

### 一、防抖

函数防抖（debounce），其概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生出来的，基本思路就是把多个信号合并为一个信号。

定义：在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

应用场景：
 (1) 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询请求，这样可以有效减少请求次数，节约请求资源；
 (2) window的resize、scroll事件，不断地调整浏览器的窗口大小或者滚动时会触发对应事件，防抖让其只触发一次；

实现：

```json
// 截流函数：调用户在限时内执行1次，限时内再次调用，判断时间，所以它在每个时间段内执行1次
function throttle(fn, delay) {
    let prev = Date.now();
    return function() {
        const context = this, args = arguments;
        let now = Date.now();
        console.log(now, prev)
        if (now - prev >= delay) {
            fn.call(context, args);
            prev = now;
        }
    }
}

function throttle2(fn, delay) {
    let timer = null;
    return function() {
        const context = this, args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.call(context, args);
                timer = null;
            }, delay || 0)
        }
    }
}
```



### 二、截流

定义：n秒内如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

应用场景：
 (1)如resize, touchmove, mousemove, scroll... 这些连续不断地触发某事件，在单位时间内只触发一次；
 (2)在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次请求，而不是在用户停下滚动页面操作时才去请求数据；
 (3)监听滚动事件，比如是否滑到底部自动加载更多，用throttle [ˈθrɒtl] 来判断；

实现：

```javascript
// 防抖函数：调用后在一定时间内函数不执行，过了时间限时执行，在限时内再次调用会重新开启定时器
function debounce(fn, delay = 1000) {
    let timer = null;
    return function () {
        const args = arguments;
        const context = this;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.call(context, args)
        }, delay)
    }

/**
 * 监听窗口滚动
 * @param callback
 */
const monitorWinScroll = function (callback) {
  // 函数节流 （解决滚动性能问题）
  function throttle (action) {
    // requestAnimationFrame 兼容处理（使滚动更平滑）
    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60)
          }
    })()

    let isRunning = false
    return function () {
      if (isRunning) return
      isRunning = true
      window.requestAnimFrame(() => {
        action()
        isRunning = false
      })
    }
  }

  if (document.addEventListener) {
    document.addEventListener('scroll', throttle(() => {
      if (callback) callback(true)
    }), false)
  } else {
    $(window).scroll(throttle(() => {
      if (callback) callback(true)
    }))
  }
}

// 用法
$(window).on('scroll', throttle(function () {
    // 判断是否滚动到底部的逻辑
    const pageHeight = $('body').height();
    const scrollTop = $(window).scrollTop();
    const winHeight = $(window).height();
    const thresold = pageHeight - scrollTop - winHeight;

    if (thresold > -100 && thresold <= 20) {
        console.log('end');
    }
}));
```

下面的例子返回效果等同：

```scss
+new Date()          // -> 1626919955618
new Date().getTime() // -> 1626919955618
new Date().valueOf() // -> 1626919955618
new Date()*1         // -> 1626919955618
复制代码
```

### 防抖和节流的区别：

**防抖和截流效果：**

函数防抖是某一段时间内只执行一次；而函数节流是间隔单位时间执行，不管事件触发有多频繁，都会保证在规定时间内一定执行一次。

**防抖和截流原理：**

防抖是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，都会清除当前的 deferTimer 然后重新设置超时调用，重新计时。这样只有最后一次操作能被触发。

节流是通过判断是否到达一定时间来触发函数，若没到规定时间则使用计时器延后，而下一次事件则会重新设定计时器。



## Sybmol

思考？

```js
function primitiveMutator(val) {
  val = val + 1;
}
let x = 1;
primitiveMutator(x);
console.log(x); 为什么还是1？
function objectMutator(val) {
  val.prop = val.prop + 1;
}
let obj = { prop: 1 };
objectMutator(obj);
console.log(obj.prop);为什么变成2了
```

​	当你传递原始类型的值（例如数字）给函数时，它是按值传递的，意味着只有该值的副本被传递给函数。在这种情况下，在 primitiveMutator 函数中将 val 加一，并不影响原始的 x 值。

但是，当你传递对象类型的值（例如对象）给函数时，它是按引用传递的，意味着该对象本身被传递给函数。在这种情况下，在 objectMutator 函数中将对象的 prop 属性加一，对 obj.prop 的值产生了直接影响，因此输出为 2。

   Sybmol

```js
let b = {
    [Symbol("b")] :123
};
let symbol = Symbol("b");
console.log(b[symbol]); // 123

```



## typeof  instanceof  Object.prototype.toString.call()

三种都可用于判断数据类型

1. typeof 判断 null 时会返回Object

2. instanceof 是 JavaScript 中的一个操作符，用于判断一个变量是否是某个对象的实例，需要注意：instanceof 操作符只能用于判断对象的类型，不能用于判断原始数据类型（如 number、string、boolean 等，）instanceof 还有一个限制，就是它只能用于在同一个窗口（或同一个 iframe）内的对象之间进行判断。如果你想在不同的窗口（或 iframe）之间进行判断，就不能使用 instanceof。

   ```js
   let x = [1, 2, 3];
   console.log(x instanceof Array); // 输出 true
   console.log(x instanceof Object); // 输出 true
   ```

3. Object.prototype.toString 返回一个字符串，表示对象的类型

   

## bind apply call 用法

- bind：bind 方法用来改变 this 指向，并且返回一个新的函数。这个新的函数可以被调用，但是 this 指向已经改变。

语法：

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

示例：

```js
let obj = {
  name: 'obj'
}
let func = function () {
  console.log(this.name)
}
let newFunc = func.bind(obj)
newFunc() // 输出 obj
```

- apply：apply 方法用来改变 this 指向，并且立即调用该函数。

语法：

```js
function.apply(thisArg, [argsArray])
```

示例：

```js
let obj = {
  name: 'obj'
}
let func = function (arg1, arg2) {
  console.log(this.name)
  console.log(arg1)
  console.log(arg2)
}
func.apply(obj, [1, 2])
// 输出 obj
// 输出 1
// 输出 2
```

- call：call 方法用来改变 this 指向，并且立即调用该函数。

语法：

```js

function.call(thisArg[, arg1[, arg2[, ...]]])
```

示例：

```js

let obj = {
  name: 'obj'
}
let func = function (arg1, arg2) {
  console.log(this.name)
  console.log(arg1)
  console.log(arg2)
}
func.call(obj, 1, 2)
// 输出 obj
// 输出 1
// 输出 2
```

总结：bind、apply、call 的作用都是改变 this 指向，但是用法不同，使用场景也不同。bind 返回一个新函数，apply、call 立即调用该函数。



## 深拷贝浅拷贝

浅拷贝是在复制对象时，仅复制对象的引用，而不复制对象本身。这意味着，如果你修改浅拷贝的对象，它会影响到原始对象。

例如，你可以使用赋值运算符（`=`）来进行浅拷贝：

```js
const original = { a: 1, b: 2 };
const copy = original;
copy.a = 3;
console.log(original.a); // 3
```

在上面的代码中，`copy` 和 `original` 都指向同一个对象。因此，修改 `copy.a` 的值也会影响到 `original.a` 的值。



深拷贝是在复制对象时，复制对象本身以及对象的所有属性。这意味着，如果你修改深拷贝的对象，它不会影响到原始对象。

你可以使用 `JSON.parse(JSON.stringify(obj))` 来进行深拷贝：

```js
const original = { a: 1, b: 2 };
const copy = JSON.parse(JSON.stringify(original));
copy.a = 3;
console.log(original.a); // 1
```

你也可以使用递归来实现深拷贝：

```js
function deepCopy(obj) {
  if (typeof obj !== 'object') return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

const original = { a: 1, b: 2 };
const copy = deepCopy(original);
copy.a = 3;
console.log(original.a); // 1

```

注意，递归深拷贝的效率较低，因为它需要遍历整个对象的属性。

另外，在某些情况下，递归深拷贝可能会出现无限递归的情况，例如当对象中存在循环引用时。因此，你需要注意这种情况的处理。



JSON.stringify 在进行深拷贝时，有一些缺点需要注意：

1. 不能序列化函数。使用 JSON.stringify 时，如果对象的属性值是函数，将会被忽略。
2. 不能序列化原型。使用 JSON.stringify 时，如果对象的属性值是另一个对象的实例，则该对象的原型会丢失。
3. 不能序列化循环引用。使用 JSON.stringify 时，如果对象存在循环引用，将抛出 TypeError。
4. 性能较差。使用 JSON.stringify 进行深拷贝相比其他方法，性能较差。

在进行深拷贝时，需要根据实际情况选择合适的方法。如果需要序列化函数、原型或解决循环引用问题，可以使用其他方法，比如递归或使用类似 lodash 的工具库中的深拷贝函数。



## 闭包

在 JavaScript 中，闭包是指有权访问另一个函数作用域中的变量的函数（闭包是一个函数与其相关变量的组合，它可以访问函数作用域之外的变量。）。创建闭包的常见方式，是在一个函数内部创建另一个函数。
例如：

```js
function outerFunction(param) {
  var outerVariable = 'I am an outer variable';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}
var returnedFunction = outerFunction();
returnedFunction();  // "I am an outer variable"
```

在这个例子中，`innerFunction` 就是一个闭包。它可以访问 `outerFunction` 中的变量 `outerVariable`。

当我们调用 `outerFunction` 时，它不会执行 `innerFunction`。相反，它会返回一个引用了内部函数的新函数



### 闭包的作用

​     闭包有很多用途。其中一个常见的用途是让函数的局部变量在函数调用结束之后仍然有效。

​     例如，我们可以使用闭包来创建计数器：

```js
function createCounter() {
  var count = 0;

  return function() {
    count += 1;
    return count;
  }
}

var counter = createCounter();

console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

在这个例子中，我们使用了闭包来保存计数器变量 `count`。当我们调用计数器函数时，它会将变量 `count` 加 1 并返回新的值。这个变量在计数器函数调用结束之后仍然有效。



另一个常见的用途是在回调函数中访问局部变量。例如：

```js
function outerFunction(callback) {
  var outerVariable = 'I am an outer variable';

  callback();
}

outerFunction(function() {
  console.log(outerVariable);  // "I am an outer variable"
});
```

在这个例子中，我们将匿名函数作为回调函数传递给 `outerFunction`。这个匿名函数创建了一个闭包，可以访问 `outerFunction` 中的变量 `outerVariable`。

闭包还可以用于封装代码和数据，使得它们不能被外部访问。这种模式被称为 "模块模式"，可以用来实现私有成员和公共成员。

总的来说，闭包是 JavaScript 中一个非常强大的特性，可以用来实现很多不同的功能。



### 闭包如何封装代码和数据

​	闭包可以用来封装代码和数据。这种模式被称为 "模块模式"。

在模块模式中，我们可以使用闭包来创建私有成员和公共成员。私有成员只能在模块内部访问，而公共成员可以在模块外部访问。

例如，我们可以使用闭包来创建一个简单的计数器模块：

```js
function createCounter() {
  var count = 0;

  return {
    increment: function() {
      count += 1;
    },
    getCount: function() {
      return count;
    }
  };
}

var counter = createCounter();

counter.increment();
counter.increment();

console.log(counter.getCount());  // 2

```

在这个例子中，我们创建了一个名为 `createCounter` 的函数，它返回了一个对象。这个对象有两个公共方法：`increment` 和 `getCount`。

公共方法 `increment` 可以调用私有变量 `count`，并将它加 1。公共方法 `getCount` 可以访问私有变量 `count` 并返回它的值。

这样，我们就可以在模块外部调用 `increment` 和 `getCount` 方法，但是无法直接访问 `count` 变量。这样就可以将代码和数据封装在模块内部，避免外部的污染和破坏。



### 闭包的缺点

闭包是 JavaScript 中一个非常强大的特性，但是也有一些缺点。

1.其中一个缺点是，过多的嵌套闭包会使得函数的作用域链变得更长。这意味着，当你调用一个函数时，它会搜索更多的变量，这会导致运行速度变慢。

2.另一个缺点是，闭包会使得内存使用量增加。因为闭包会保留对它所引用的变量的引用，所以这些变量不会在函数调用结束后被垃圾回收。如果你不小心使用了闭包，可能会导致内存泄漏。

总的来说，闭包是一个非常强大的工具，但是也要谨慎使用。在使用闭包时，要注意避免上述缺点。



### 闭包都会导致内存泄漏吗

并不是所有闭包都会导致内存泄漏。内存泄漏只会在特定情况下出现，例如：

- 当闭包引用了一个 DOM 元素，而这个元素在页面中已经被删除，但是闭包仍然保留了对这个元素的引用。
- 当闭包引用了一个循环变量，而这个变量在循环结束后依然有效。

例如，下面的代码会导致内存泄漏

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

```

```js
function createButton(label) {
  var btn = document.createElement('button');
  btn.innerHTML = label;
  btn.onclick = function() {
    console.log('Button clicked: ' + label);
  }
  document.body.appendChild(btn);
}

createButton('Button 1');
createButton('Button 2');

// 改变按钮的标签
document.getElementsByTagName('button')[0].innerHTML = 'New Label';

```

在这个代码中，我们使用了闭包来创建一个按钮。每个按钮都有一个点击事件，在点击时会输出按钮的标签。

这里的闭包保留了对按钮标签的引用，所以可以在点击事件中使用标签。

但是，如果我们没有使用闭包，代码可能会这样写：

```js
function createButton(label) {
  var btn = document.createElement('button');
  btn.innerHTML = label;
  btn.onclick = function() {
    console.log('Button clicked: ' + btn.innerHTML);
  }
  document.body.appendChild(btn);
}

createButton('Button 1');
createButton('Button 2');

// 改变按钮的标签
document.getElementsByTagName('button')[0].innerHTML = 'New Label';

```

### 如何避免内存泄漏

下面是一些避免内存泄漏的建议：

1. 在不再使用闭包时将其设为 `null`。这样，垃圾回收器就可以回收这些闭包，避免内存泄漏。
2. 使用弱引用（Weak Reference）。弱引用是指不会增加对象的引用计数，因此当对象的引用计数为 0 时，它就会被垃圾回收。在 JavaScript 中，可以使用 `WeakMap` 来实现弱引用。
3. 避免在循环中使用闭包。在循环中使用闭包时，每次循环都会创建一个新的闭包，导致内存使用量增加。可以使用其他方法来避免这种情况。
4. 尽量避免在全局作用域中使用闭包。在全局作用域中使用闭包会导致这些闭包一直存在，无法被垃圾回收。应该将闭包限制在尽可能小的作用域中。

### 垃圾回收机制和内存泄漏

垃圾回收（Garbage Collection）是指由计算机运行时环境自动执行的一种机制，用于回收不再使用的内存。

在大多数编程语言中，当你创建一个变量并使用完毕后，就可以将这个变量的内存回收。这样，计算机就可以再次利用这些内存。

但是，有时候你的代码中会有某些变量仍然被引用着，导致它们不会被垃圾回收。这就会导致内存泄漏（Memory Leak）。

内存泄漏是指程序中已经不再使用的内存仍然被占用，无法被垃圾回收器回收。如果内存泄漏持续进行，会导致内存使用量逐渐增加，直到程序崩溃为止。

所以，我们在编写代码时要注意避免内存泄漏。可以使用闭包来封装代码和数据，但也要注意不要使用不当，以免导致内存泄漏。



## Vue优化性能

1. 使用Object.freeze()，冻结对象，会失去响应性连接在 Vue 中，还有一些方法可以优化组件渲染性能，例如：

2. 使用计算属性代替方法：在组件中，如果有一个属性的值是通过计算得到的，可以使用计算属性代替方法。计算属性只有在其依赖的值发生改变时才会重新计算，而方法则是每次都会执行，效率较低。

3. 使用 `v-bind` 代替 `:`：在绑定属性值时，使用 `v-bind` 代替 `:` 可以让 Vue 跳过解析模板的步骤，提高渲染性能。

4. 使用常量代替变量：如果一个变量的值不会改变，可以使用常量代替变量。这样做可以让 Vue 在编译阶段直接将常量的值写入模板，避免在运行时计算变量的值。

5. 使用静态节点：如果一个节点的内容不会改变，可以使用静态节点。这样做可以让 Vue 在编译阶段直接将节点的内容写入模板，避免在运行时计算节点的内容。

6. 使用缓存：如果一个值是昂贵计算得到的，可以使用缓存避免每次都进行计算。

   

## HTTP和HTTPS

​	HTTP（超文本传输协议）是一种用于在互联网上传输数据的标准协议。它可以用来在浏览器和网站服务器之间传输数据，如文本、图像、视频等。

HTTPS（安全超文本传输协议）是在HTTP基础上增加了安全性的协议。它使用SSL/TLS加密来保护数据在传输过程中不被窃取。这样，用户在登录网站或在网站上输入敏感信息时，就可以更加安全地保护自己的信息。

简单来说，HTTPS是在HTTP的基础上增加了数据传输安全性的协议。

## 加密数据长什么样子？请求和返回数据都会加密吗？

加密数据：

假设我们有一个API接口，返回的数据是用户的个人信息，包括姓名、电话号码、邮箱等敏感信息。如果我们使用HTTPS协议，返回的数据将会是经过加密的，如下所示：

```js
{
    "name": "sfdlkjfdsaflkjfdsaf",
    "phone": "dsaflkjfdsaflkjfds",
    "email": "sfdlkjfdsaflkjfdsaf"
}

```

这些数据是看不懂的，需要解密才能读懂。这样，即使在网络中被窃取，也无法读懂这些数据。

不加密数据：

如果我们使用HTTP协议，返回的数据将不会经过加密，如下所示：

```js
{
    "name": "John Doe",
    "phone": "555-555-5555",
    "email": "johndoe@example.com"
}

```

这些数据是明文的，直接就能读懂。如果在网络中被窃取，就可以直接读懂这些数据。

从上面的例子中可以看出，返回的加密数据和不加密数据主要体现在数据的可读性上。加密数据不能直接读懂，而不加密数据可以直接读懂。



请求参数也是可以加密的。

​		当我们使用HTTPS协议发起请求时，请求参数也会被加密。在请求发送到服务器之前，会经过SSL/TLS加密，保证在网络中传输的安全性。这样，即使有人截获了请求，他也无法读懂请求参数中的数据。

如果我们使用HTTP协议发起请求，请求参数不会被加密。这意味着，如果有人截获了请求，他就可以直接读懂请求参数中的数据。

所以，在安全性要求较高的场景中，建议使用HTTPS协议发起请求，以保证请求参数的安全性。



前端和后端都可以设置使用HTTPS协议。

​		前端设置：在前端代码中，我们可以通过使用HTTPS协议的网址前缀“https://”来设置使用HTTPS协议。例如，在Vue中发起请求的代码：

```js
axios.get('https://api.example.com/data')
这里使用的是HTTPS协议，请求的数据会被加密。
```

​	

​		后端设置：在后端，我们可以通过配置服务器来设置使用HTTPS协议。例如，在使用Apache服务器时，我们可以在配置文件中添加如下代码：

```java
<VirtualHost *:443>
    ServerName example.com
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    SSLCACertificateFile /path/to/ca.crt
    ...
</VirtualHost>
这里通过配置服务器，使得所有通过443端口发出的请求都使用HTTPS协议。
```



​	综上所述，前端和后端都可以设置使用HTTPS协议，前端通过在代码中使用HTTPS协议的网址前缀来设置，后端通过配置服务器来设置。



##  设置https要钱吗？

设置HTTPS通常需要购买证书。

HTTPS协议需要使用SSL/TLS证书来进行加密。证书是由第三方证书颁发机构（CA）颁发的，它需要支付费用购买。证书的价格不同，也有免费证书，也有需要付费的证书。

免费证书：

- Let's Encrypt，是一个免费的、自动化的、开放的证书颁发机构，可以免费颁发SSL/TLS证书。
- Cloudflare 也提供了免费证书的服务。

付费证书：

- DigiCert，是一个大型的证书颁发机构，提供各种级别的证书，价格从几美元到数百美元不等。
- Comodo，也是一个大型的证书颁发机构，提供各种级别的证书，价格也不等。

总的来说，设置HTTPS通常需要购买证书，但也有免费证书可供选择。

需要注意的是，购买证书时需要确认域名是否是自己的,购买证书需要验证域名所有权，验证过程较为复杂。



## 事件循环和浏览器渲染原理

### 事件循环

### 浏览器的进程模型

### 何为进程？

程序运行需要有它自己专属的内存空间，可以把这块内存空间简单的理解为进程
每个应用至少有一个进程，进程之间相互独立，即使要通信，也需要双方同意



### 何为线程？

有了进程后，就可以运行程序的代码了，运行代码的「人」称之为「线程」。

一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，改线程称之为**主线程**，如果程序需要**同时**执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。



### 浏览器有哪些进程和线程？

**浏览器是一个多进程多线程的应用程序**

浏览器内部工作极其复杂。

为了避免相互影响，为了减少连环崩溃的几率，当启动浏览器后，它会自动启动多个进程「浏览器进程、网络进程、渲染进程等」，我们可以在浏览器的任务管理器中查看当前的所有进程

其中，最主要的进程有：

1. 浏览器进程

   主要负责界面的显示、用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务

2. 网络进程

   负责加载网络资源。网络进程内部会启动多个线程来处理不同的网络任务。

3. 渲染进程

​		渲染进程启动后，会开启一个**渲染主线程**，主线程负责执行HTML、CSS、JS代码。
​        默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间互不影响。

> 将来该默认模式可能会有所改变，可参见chrom官方说明文档

### 渲染主线程是如何工作的？

渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：

- 解析HTML
- 解析CSS
- 计算样式
- 布局
- 处理图层
- 每秒把页面画60次
- 执行全局js代码
- 执行事件处理函数
- 执行计时器的回调函数
- . . . . . .

要处理这么多的任务，主线程遇到了一个前所未有的难题：如何调度任务？

比如：

- 我正在执行一个JS函数，执行到一半的时候用户点击了按钮，我该立即去执行点击事件的处理函数吗？
- 我正在执行一个JS函数，执行到一半的时候某个计时器到达了时间，我该立即去执行它的回调吗？
- 浏览器进程通知我“用户点击了按钮”，与此同时，某个计时器也到达了时间，我应该处理哪一个呢？
-  . . . . . .

渲染主进程想出了一个绝妙的主意来处理这个问题：排队

| 渲染主线程 | 任务（正在执行的任务）                           |
| ---------- | ------------------------------------------------ |
| 消息队列   | 任务1 任务 2  任务3（其他线程）任务4（其他线程） |

1. 在最开始的时候，渲染主线程会进入一个无限的循环
2. 每一次循环会检查消息队列中是否有任务存在，如果有，就取出第一个任务执行，执行完一个后进入下一次循环；如果没有，则进入休眠状态。
3. 其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务

这样一来，就可以让每个任务有条不紊的、持续的进行下去



### JS异步

JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。
如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。
所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。



### 阐述一下JS的事件循环

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在Chrome的源码中，它开启一个不会结束的for循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。
过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。
根据W3C官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的
队列，不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务但浏览器
必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。