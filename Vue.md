## MVVM模式
1. MVVM指的是数据驱动，它由 Model 模型层，负责业务逻辑和服务端进行交互，View 视图层，负责将数据模型转化成UI展示出来，
   以及 ViewModel 视图模型层，负责监听 Model 层中数据的改变并且控制视图的更新，以及处理用户在View 层的交互，是Model层和View之间的一个通信桥梁
2. 这种模式的优点就是 Model层 和 ViewModel层 之间是存在双向数据绑定的联系的，开发者可以专注于对数据的维护操作，而不需要自己操作dom节点，并且可以降低代码的耦合度，可以单独修改
   Model模型层 或者 View视图层
3. 缺点就是在调试bug的时候，当界面出现异常，可能是 View层 出现问题， 也可能是 Model层，难以对bug的原始位置进行定位

## MVC模式
1. MVC模式的思想是用 Controller控制器 负责将 Model层 的数据在 View层 里展示出来。
2. 是不存在双向数据绑定的关系的
## 组件化
1. 组件化就是视图和逻辑抽象成一个统一的概念，就是组件，在Vue开发中，每一个.vue文件都可以视为一个组件
2. 组件化降低了整个系统的耦合度，在保持接口不变的情况下，我们可以通过替换不同组件快速完成需求，
   比如输入框替换成日历，选项框等组件
3. 并且组件化更方便调试，由于整个系统是通过组件结合起来的，出了问题的时候，可以快速定位到报错的组件
4. 组件化也有利于提高项目的可维护性，每个组件的职责单一，并且组件能够在系统中被复用
   
## 指令系统
指令就是带有v-特殊前缀的属性，带有特定的作用，当表达式发生改变，就会响应式的作用于DOM节点上
常用的指令包括：
条件渲染v-if、v-show，列表渲染v-for，属性绑定v-bind，事件绑定v-on，双向绑定v-model
在没有指令之前，需要先获取dom在进行操作

## computed 和 watch 派生，缓存，表达式，监听，异步，选项，watchEffect
1. computed计算属性能够从组件数据中派生出新数据，最常见的用法就是设置一个函数，返回计算之后的结果，
   computed和methods的差异是它具备缓存性，如果依赖的数据不发生变化，就不会重新计算
   计算属性的使用场景通常是用来简化template模板中复杂的表达式，比如去计算一个动态的class类，去计算动态style
2. watch可以监听响应式数据的变化，并执行回调函数，watch没有返回值，但是可以执行异步操作等复杂逻辑，
   watch还可以设置deep，immediate等选项
   watch的使用场景是监听状态发生变化之后，进行一些dom操作或者异步操作
3. 在Vue3中出现了新的watchEffect，watchEffect并不需要指定某个具体的变量作为监听对象，而是自动收集回调函数中
   响应式变量的依赖，当依赖发生变化，重新执行回调函数（首次会自动执行）

## Vue2 和 Vue3的区别
1. 选项式api和组合式api
2. mixins 和 Hook
3. 还有性能上的提升
   （1）diff算法中增加了静态标记，被标记的静态节点，在diff过程中就不会参与比较，进一步提高性能
   （2）Vue3 中会对不参与更新的静态节点做静态提升，这个元素只会被创建一次，渲染的时候直接复用，  
   （3）打包体积的减小，Vue3的api是引入式的，只有被引入的api才会被打包（tree-shaking）
   （4）响应式系统的升级
4. 还有一些新的特性，Vue2的template只允许有一个根节点，Vue3是允许有多个根节点的，
   (当有多个根节点的时候，Vue3就会在最外层添加一个Fragment标签，包裹起来)
5. 还有像 Suspense 定义一个异步组件，自带两个 slot 分别为 default、fallback，
   当需要展示的组件还没加载完，Suspense就会展示 fallback 状态，当组件加载完就展示
   default状态，配合 defineAsyncComponent 加载异步组件
6. 提供了 teleport 组件，能够将包裹的组件渲染到指定的dom节点下，比如我们将模态框渲染到body标签下
   <Teleport to="body">
7. （TS）

## v-if 和 v-show 的区别
1. 控制手段不同
v-show隐藏则是为该元素添加css--display:none，dom元素依旧还在。 v-if显示隐藏是将dom元素整个添加或删除

2. 编译过程不同
v-if切换有一个局部编译/卸载的过程,切换过程中是会挂载或者销毁组件，是会触发生命周期的钩子函数的
v-show 只是基于css的视图切换

3. v-if是惰性的，当渲染条件为false时，是不会有任何操作被触发的
总的来说，v-if的性能消耗更大，他是直接操作dom节点的增加和删除
如果需要频繁切换，就用v-show，如果运行时，渲染条件很少改变就用v-if

## 权限管理 （角色，token，菜单，视图，接口）
1. 权限管理是通过角色和token来实现的，一个用户关联多个角色，一个角色关联多个菜单权限，按钮权限来实现的
2. 第一种是菜单权限，前端通过从接口获取到这个用户的菜单，在全局前置路由守卫 beforeEach 里，通过vue-router 的 addRoutes 方法将菜单动态的添加路由里面
3. 第二种是按钮权限或者说是通过不同的权限去展示不同的视图，我会封装一个全局自定义指令，在指令里完成鉴权，如果用户没有权限，
   就通过 removeChild 来移出指令绑定的dom节点(调用绑定指令的dom元素的父节点的removeChild方法， el.parentNode.removeChild(el))
4. 最后一种是接口权限，在用户登录之后，后端会返回一个token，前端就将token存储在 cookie 里，没次请求就自动带上，后端就能够通过 token 去校验
   用户的身份

## vue-router 的路由守卫 （全局，独享，组件内）
1. 全局前置守卫，brforeEach ，每次路由切换前执行
2. 全局后置守卫，afterEach，每次路由切换后执行
3. 独享守卫，beforeEnter，它是只针对某个特定路由菜单的
4. 组件内的守卫，包括 beforeRouteEnter，beforeRouteLeave，进入组件和离开组件时调用
参数：
to: Route: 即将要进入的目标（路由对象）
from: Route: 当前导航正要离开的路由
next: Function:  调用该方法来控制接下来的行为


## vue-router的两种模式以及区别 （前端路由，onhashchange）
hash和history模式
首先前端路由就是，匹配不同的url路径来加载不同的组件，然后动态渲染出html内容，（页面跳转是无刷新的）

第一，hash模式（哈希）
（1）hash模式是基于window（对象）.onhashchange事件来实现的，hash变化的时候，通过onhashchange监听，来实现更新页面部分内容的操作
（1）第一种是 hash 模式，是通过监听 window 对象的 onhashchange 事件，当 hash 值发生变化，
<!-- （2）通过hashHistory.push（将新路由添加到路由器访问历史的栈顶）和HashHistory.replace(替换掉栈顶的路由)来将页面的状态和url关联起来，从而实现页面前进后退 -->
（2）通过改变hash值可以对页面进行操作，比如实现页内导航目录，通过监听hash值的变化，来改变页面锚点定位

第二，history模式
（1）history模式，是通过history的 pushState 和 replaceState 方法实现路由的前进和后退的，修改历史状态，改变url，且不会发送请求
history.pushState(stateObject, title, URL)
history.replaceState(stateObject, title, URL)

第三，两者的区别
（1）hash值虽然出现在路由中，但是不会包含在http请求中，对后端没有影响，改变hash不会重新加载页面，不会向服务器发起请求
<!-- （2）hashchange只是改变了#后的hash，而pushState设置的新URL可以是与当前URL同源的任意URL。 -->
（3）history模式下刷新页面或者修改url就会向服务器发送请求，所以必须要由服务器的支持，如果刷新的时候，服务器没有相应的资源就会404

## Vue-Router 的懒加载如何实现
（1）使用箭头函数+import动态加载。import是es6为js模块化提出的新的语法，import和export结合使用
（2）使用箭头函数+require动态加载。require是一个数据对象的拷贝，而import是对对象的引用
（3）require是运行时加载，import是编译时输出接口
（4）webpack的require.ensure

## Router和route的区别
（1）route是路由信息对象，每个路由都会有一个route对象，相当于一个局部对象，可以查看路由path，路由params参数，路由hash，路由name名称等路由信息
（2）router是路由实例，相当于一个全局对象，包括路由跳转，钩子函数（离开路由，进入路由），可以创建路由守卫等
router.push本质就是向历史栈里添加一个路由

## SPA 和 MPA
1. SPA就是通过修改url，加载相应的组件，实现局部刷新，多个路由共有的组件就可以实现复用，比如一些导航栏、菜单
   （不利于搜索引擎的抓取，首次渲染速度相对较慢）
2. MPA 是整页刷新，即使不同路由有相同组件也无法复用