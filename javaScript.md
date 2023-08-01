## 本地缓存
1. 有cookie，localStorage，sessionStorage，indexedDB 四种
2. cookie，它是大小只有4KB的字符串数据，可以设置有效期，每次请求都会自动带上cookie，使用场景通常是保存一些
   身份信息，比如token，来实现保持登录状态，方便请求接口的时候，服务端对用户进行身份验证,
   （使用Expires或者Max-Age来设置有效期，Max-Age优先级更高）
   document.cookie = '名字=值';Expires=;Max-Age=604800;

3. localStorage 的大小通常是5M，是一种持久化本地存储，除非主动删除数据，不然永远不会过期，
   并且只能存入字符串，不能直接存对象，
   localStorage 有一些常用的方法，比如
   localStorage.setItem，getItem，key(0) //获取第一个键名
   removeItem，clear()，
   使用场景一般是用来存储用户信息，或者做网站切换主题的功能

4. sessionStorage 的大小通常也是5M，但是页面关闭之后，数据就会被清除，
   一般用来存储视频的进度条，文章的观看状态，这种短期信息

5. 最后一种 indexedDB ，支持持久化存储大量的结构化数据，并且能够存储文件，indexedDB 所有的操作都是异步的，
   一些常用的api，比如 open(dbName, version)方法打开数据库，通过 createObjectStore 来创建存储库，用add(data)方法，插入数据
   用get(key)方法通过主键获取数据，通过put(data)方法来更新数据，delete 删除数据，
   由于 indexedDB 的容量比较大，可以用存储本地聊天记录，存储在线文档的编辑历史，也可以用来存储即将要上传的文件

## web worker （单线程，缺点，消耗性能，创建，信息，加载）
1. js本身是单线程的，但是 web worker 能够创建一个多线程环境，但是在web worker里是没有window和document对象的，所以是无法操作dom节点的，
   通常会将一些比较消耗性能的任务交由web worker去执行，
   比如说，复杂的计算以及大文件的上传（excel大文件导出，主线程将需要导出的数据传给 worker，在worker 中生成 blob 文件，再传回给主线程进行下载就可以了）
   
2. 使用 new Worker(path, options)来创建一个 worker，主线程与 worker 线程都是通过 postMessage 来发送信息，以及监听 message 事件来接收信息，
   worker线程 还能通过 importScripts 方法来加载js文件，
   主线程通过 terminate 方法来关闭 worker， worker通过 close 方法关闭worker，
   （关闭线程不是立即关闭的，worker线程当前的事件循环还是会执行的，如果在主线程关闭worker，worker当前的事件循环继续调用 postMessage 方法，主线程也不会接收到信息，如果在worker线程关闭worker，在当前事件循环中调用 postMessage，主线程依旧能监听到 message事件）

## canvas 压缩图片 (核心是用到 canvas 的drawImage 方法将图片写入canvas，再用 toDataURL 去控制输出图片的质量，通过降低质量来达到压缩的效果)
1. 第一步是先创建一个 fileReader 对象，fileReader 对象是可以异步读取 File 或者 Blob 对象的，用这个对象的 readAsDataUrl 方法读取图片，
2. 第二步是用 canvas 的 drawImage 方法，将图片写入 canvas，再用 toDataURL("image/jpeg", quality)，指定输出图片的质量，输出的图片是 base64 格式的，
   先将 base64 转成 Blob 数据类型，再将 Blob 数据转换成 File 类型（new File()）就完成压缩了

## 数组常用方法
1. 增 push，unshift，splice，concat，concat 不会改变原数组
2. 删 pop，shift，splice，slice，slice 不影响原数组
3. 查 indexOf，findIndex，find，includes 
4. 排序 sort，reverse
5. 转换 join
6. 遍历 map，forEach，filter，some，every

## 事件循环，异步执行 (同步执行栈-》任务队列-》异步任务)
1. 所有同步任务都会在主线程上执行，形成一个执行栈
2. 主线程以外还有一个任务队列，当异步任务有了运行结果，就在任务队列中放置一个事件
3. 当所有的同步任务执行完之后，系统就会读取任务队列，看看任务队列里还有哪些事件，
4. 于是异步任务就结束等待状态，进入执行栈，开始执行
5. 主线程不断重复这个循环过程，就是事件循环

## 宏任务与微任务
1. 异步任务还可以细分为宏任务和微任务，宏任务和微任务会影响在执行顺序
```js
console.log(1)
setTimeout(()=>{
    console.log(2)
}, 0)
new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})
console.log(3)
```
实际结果 1 ，'new Promise'，3，'then'，2
例子中的setTimeout回调事件是先进入队列中的，按理说应该先于 .then 中的执行，但是由于宏任务和微任务，所以是.then先执行

2. 宏任务有：
整体的 script 代码 (可以理解为外层同步代码)
setTimeout/setInterval
UI的交互事件
postMessage、MessageChannel
setImmediate、I/O（Node.js）

微任务有：
Promise.then
MutaionObserver
Object.observe（已废弃；Proxy 对象替代）
process.nextTick（Node.js）

3. 具体的执行顺序如下： （同步-》微-》更新-》一个宏）
1.当前执行栈中的同步任务执行完毕。
2.检查微任务队列，依次执行所有微任务。直到微任务队列为空。
3.更新渲染。
4.执行一个宏任务。
回到第2步，重复执行，直到所有的任务（包括微任务和宏任务）都执行完毕。
简而言之，每次执行一个宏任务后，会依次执行所有的微任务，然后再执行下一个宏任务。

## async与await
1. async是用来声明一个异步方法的，await 是用来等待异步方法执行的
2. await会造成阻塞，代码执行到await的时候，会停下来，等async函数外的同步任务全部执行完，
   再执行await后面的代码

## Promise
1. Promise有三种状态，初始化是，pending等待中状态，调用resolve方法，就会变成 fulfilled 成功状态，
   调用reject方法，就会变成 rejected 失败状态，Promise 的状态变化是不可逆的


## 深浅拷贝 (两种类型，浅拷贝，深拷贝，实现)
1. 基本数据类型存储在栈中（Number，String,Boolean,Undefined,null,Symbol）
   首先呢，像对象、数组这样的引用数据类型是在栈中存储一个指针指向堆内存中的一个实际对象
2. 浅拷贝
   （1）对于基本数据类型，就是拷贝基本数据类型的值
   （2）对于引用数据类型，就是拷贝内存地址，两个变量会指向同一个内存地址
   深拷贝
   （1）深拷贝就是开辟一个新的栈内存，拷贝前后两个对象的属性完全相同，但是堆内存地址不同
   （2）JSON拷贝，会丢失函数，时间对象会变成字符串，正则会变成空对象
   （3）也能用递归循环的方式进行拷贝

## 闭包
1. 有权限访问其他函数作用域中的变量的函数就是闭包，比如函数嵌套函数
2. 用途：
封装私有变量和方法
创建模块和命名空间
做防抖和节流
实现单例模式
1. 原理：
（1）内部函数引用着外部函数的变量，外部函数中的变量就不会被回收
（2）还用到了作用域链的特性，当前作用域下找不到相应的变量，就会去上层作用域找
1. 缺点：变量会被一直引用，用占用内存，影响性能

## 什么是作用域
1. 作用域有全局作用域，函数作用域（就是函数内定义的变量只能在函数内访问），块级作用域，es6引入了let和const关键字
   在大括号内用let或者const定义的变量，在大括号外是访问不了的
2. 作用域链就是函数执行的时候，如果在当前作用域内找不到需要的变量，就会向上级作用域找，一直找到全局作用域
   闭包就是运用了作用域链

## 原型链 （是什么，原型对象上寻找，应用场景store，继承）
1. 每个对象都会有一个__proto__原型指针，指向对象的构造函数的 prototype 原型对象，这个原型对象里面就存放着属性和方法。
2. 当访问对象的属性的时候，不仅仅会在该对象上寻找这个属性，如果找不到，就会去这个对象的原型对象上继续寻找，依次层层向上寻找，
   直到找到Object的原型（再向上为null），这个就是原型链
3. 像在Vue里，通常会将一些公共的方法，挂载到Vue构造函数的原型上，这样就能在全局调用，比如说Vuex就是将 store 对象挂载到Vue构造函数的原型上，
   这样就能在全局通过this.store 获取到Vuex里的数据
4. 还有js的继承也是可以通过原型链实现的，将子类的构造函数的 prototype 原型指向父对象，就能完成继承
<!-- （1）原型链就是以一个对象为基准，以__proto__（原型指针）为链接，prototype（原型对象）就是链上的节点，原型对象里面存放（属性和方法）信息，
    这条链条，一直到Object.prototype为止，
    当访问一个对象的属性时，如果这个属性不在对象的内部，就会去对象的prototype原型对象里面找，原型对象又会去自己的proto原型里面找
（2）原型链继承就是，以对象为基准，沿着__proto__向上寻找，原型属性
（3）一个对象的constructor属性就是这个对象的构造函数的实例化
（4）构造函数的prototype（原型）属性，它是一个对象，
    对象obj的一个属性__proto__（原型链，链接点）
    每一个对象__proto__保存着该对象的构造函数的__prototype__
（5）const test = new Test()
    test.__proto === Test.prototype
    原型链顶部是Object.prototype
（6）obj.hasOwnProperty(key)判断属性是否属于该对象的原型链 -->

## js继承 （具有，重写，es6，原型链，构造函数，Object.create）
1. 继承可以让子类具有父类的各种属性和方法，不需要再次编写相同的代码，子类也能通过重写父类原有的属性和方法，获得和父类不一样的功能
第一种方法是通过es6的class语法糖和extends实现继承
```js
// extends 继承
class Car{
    constructor(color,speed){
        this.color = color
        this.speed = speed
    }
}

class Truck extends Car{
    constructor(color,speed){
        super(color,speed)
        this.Container = true
    }
}
```

2. 第二种是通过原型链实现继承，将子类的构造函数的 prototype 原型指向父对象，就能完成继承
3. 第三种是通过构造函数结合函数的call方法实现继承，在子类的构造函数中用call执行父类的构造函数，
   但是只能继承父类的实例属性和方法，不能继承原型属性或者方法
4. 第四种是通过Object的create方法实现继承

## 执行上下文（抽象，类型，周期）
1. 执行上下文是对js代码执行环境的抽象概念
2. 执行上下文有分为3种类型
   （1）第一种是全局执行上下文，只有一个，在浏览器中就是window全局对象
   （2）第二种是函数执行上下文，有无数个只有在函数被调用的时候才会被创建，包含函数内定义的变量和方法，每次调用函数都会创建一个新的上下文执行环境
   （3）第三种是Eval函数执行上下文，指的是运行在Eval函数中的代码
   （Eval函数可以将字符串当作js代码执行，打包的时候，就是将代码打包成字符串更节省体积，然后用Eval函数来执行）
3. 执行上下文是有生命周期的，包括创建阶段，执行阶段和回收阶段
   （1）在创建阶段会确定this的指向，创建变量环境
   （2）执行阶段，会执行变量的赋值，执行代码
   （3）回收阶段就是执行上下文出栈，等待回收

## js事件派发
1. 是先捕获后冒泡，（默认添加事件监听只有冒泡阶段）
2. 捕获阶段，就是事件从目标元素的最外层父元素向目标元素传播（从window对象开始）
3. 目标阶段，事件到达目标元素
4. 冒泡阶段，事件从目标元素向最外层父元素传播（传播到window对象就结束）
5. 使用 event.stopPropagation() 来停止冒泡
6. 应用场景就是事件委托（代理），比如有一个列表，我们希望点击列表的每一项触发一个事件，就不需要每一项都绑定一个事件，
   只需要把事件绑定到列表最外层元素上，当点击列表项，就会通过事件冒泡，就事件传播给父元素

## 判断数据类型 （typeof，instanceof，constructor，Object的toString，isArray）
1. 第一种方法是typeof，能够准确判断基本数据类型，但是对于引用数据类型，比如数组，对象，就会统一返回object作为结果
2. 第二种方法是instanceof，这个方法只能用来判断引用数据类型，不能判断基本数据类型
   （原理是检查被判断的对象是否在目标对象的原型链上）
3. 第三种方法用constructor属性来判断，通过构造函数来判断，除了unidefined和null都能判断，但是constructor属性是能被人为修改的
4. 第四种方法是用 Object.prototype.toString.call,返回一个字符串（[object type]）,这种方法是最准确的
5. 如果是判断是否是数组，我还会用到数组的isArray方法

## Js中new做了什么操作?（空对象，原型对象，call，挂载）
(1) 先创建一个空对象
(2) 创建出来的空对象的原型指针指向构造函数的prototype原型对象
将空对象原型的内存地址__proto__指向构造函数的prototype原型对象，prototype存放着构造函数的属性和方法
(3) 利用构造函数的call方法改变this指向，将this绑定到obj（空对象）上面，在空对象上挂载属性或方法
(4) 返回对象。
```js
    function myNew(Fn,...args){
        let obj = {}
        obj.__proto__ = Fn.prototype
        let result = Fn.call(obj,...args)
        return result instanceof Object ? result : obj
    }
```

## AJAX(原理，open建立，send数据，onreadystatechange事件)
1. AJAX 其实就是通过 XMLHttpRequest 对象来向服务器发起异步请求，从服务器获取数据，然后通过js操作dom节点来更新页面
2. 原理是通过 XMLHttpRequest 对象的 open 方法与服务器建立连接，再通过 send 方法，将客户端数据发送给服务器，
   第三步是绑定 onreadystatechange 事件，这个事件是用来监听服务器端的通信状态的，（XMLHttpRequest.readyState === 4 ，为 DONE 完成请求）
   等到 readyState 状态为4的时候，表示完成请求，可以接收服务器的响应数据了

## apply，call，bind
1. apply,call,bind都是用改变函数执行时的上下文，也就是改变函数运行时的this指向
2. apply接收的参数是新的this的指向和一个数组作为函数调用的参数，改变this指向后立即执行
3. call接收的参数也是新的this的指向和参数列表，改变this后立即指向函数   
4. bind的参数是新的this的指向和参数列表，但是改变this后不会立即执行函数，而是返回一个永久改变this的新函数

## 常见的 dom 操作
1. 创建节点
   (1)createElement创建新元素 , createTextNode创建文本节点 , createAttribute创建属性节点
   (2)createDocumentFragment 空白的文档片段 , 文档片段并不在 dom 树中，而是在内存中，向文档片段插入元素，并不会引起回流，
      可以将多个需要插入的元素插入到文档片段中，再统一插入到dom树，减少页面的回流
    回流：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
2. 添加节点
   （1）可以通过修改元素的innerHTML属性来添加节点
   （2）appendChild 把dom节点添加到一个父节点的最后一个子节点后
   （3）setAttribute 设置节点的属性
   （4）setAttributeNode 指定的节点添加属性节点
3. 删除节点
   （1） removeChild （删除父节点的一个指定子节点）删除一个节点，首先要获得该节点本身以及它的父节点，调用父节点的removeChild把自己删掉
   （2）el.remove() dom节点也可以调用remove方法，删除节点本身  
4. 更新节点
   （1）innerHTML 不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树
   （2）innerText 修改文本节点
5. 获取节点
    document.getElementById('id属性值');返回拥有指定id的对象的引用
    document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
    document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
    document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
    document/element.querySelector('CSS选择器'); 仅返回第一个匹配的元素
    document/element.querySelectorAll('CSS选择器'); 返回所有匹配的元素
    document.documentElement; 获取页面中的HTML标签
    document.body; 获取页面中的BODY标签
    document.all['']; 获取页面中的所有元素节点的对象集合型
    parentNode、childNodes、firstChild、lastChild、
    （nextSibling、 返回下一个兄弟节点
    previousSibling 返回前一个兄弟节点）