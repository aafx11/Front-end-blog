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

3. 具体的执行顺序如下：
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
2. 