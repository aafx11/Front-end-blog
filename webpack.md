## 打包构建优化
打包优化一般有两个优化方向，第一个是减少打包体积，第二个减少打包时间。
### 1. 减少打包体积
（1）首先是分析打包后的文件结构，会用到 bundle-analyzer 这款插件，将打包后的文件结构进行可视化查看，能够更直观的找到体积过大的原因。
  （可直观分析打包文件的模块组成部分、模块体积占比、模块包括关系、模块依赖关系、文件是否重复、压缩体积对比等可视化数据）
（2）第一种方法，是用 splitChunks 抽离公共代码，在开发的时候，业务代码会经常变动，但是第三方插件一般不怎么会变动，所以可以将node_modules单独打包，
```js
optimization: {
		runtimeChunk: { name: "manifest" }, // 抽离WebpackRuntime函数
		splitChunks: {
			cacheGroups: {
				common: {
					minChunks: 2, // 代码块出现最少次数
					name: "common", // 代码块名称
					priority: 5, // 优先级别
					reuseExistingChunk: true, // 重用已存在代码块
					test: AbsPath("src")
				},
				vendor: {
					chunks: "initial", // 代码分割类型
					name: "vendor",
					priority: 10,
					test: /node_modules/
				}
			}, // 缓存组
			chunks: "all" // 代码分割类型：all全部模块，async异步模块，initial入口模块
		} // 代码块分割
	}
```
（3）第二种方法，是组件库要按需引入，一个组件库有几十个组件，可能开发的时候只会用到其中的一部分，不需要全量引入
（4）第三种方法，是压缩资源，包括js，css代码，图片，字体文件都是可以进行压缩的，
  css用css-minimizer-webpack-plugin插件压缩，js用terser-webpack-plugin压缩，压缩可以将代码的空行、空格去掉，
	将一些比较长的变量名缩短，达到压缩代码的目的
	对于图片资源能够用image-webpack-loader插件，对图片进行压缩，像现在AI技术比较发达，有些AI模型能够无损压缩图片
（5）第三种方法就是将一些第三方插件换成体积更小的插件，比如moment.js换成day.js

### 2. 然后是减少打包时间
（1）打包其实就是loader对文件进行转化的过程，首先是分析各个loader打包消耗的时间，我会用speed-measure-webpack-plugin这款插件，
  能够测量每个loader所消耗的时间，能够有针对性的对一些耗时比较久的loader进行优化
（2）第一种方式就是，缩小范围，配置include/exclude缩小Loader对文件的搜索范围，通常node_modules里面的插件已经是打包过后的，
	不需要再经过loader的转化，就用 exclude 将 node_modules 排除出去
（3）第二种方式就是，配置Loader的cache缓存，再次编译只需要编译变动过的文件，
（4）第三种方式就是，将Loader单进程转换为多进程，配置thread-loader,能够让webpack同一时刻处理多个任务，发挥多核CPU电脑的能力，提升构建速度

## 首屏优化
1. 一般来说首屏加载速度慢的原因就是入口文件体积太大了
2. 首屏加载速度优化一般有两个方向，一个是资源加载优化，一个页面渲染优化
3. 资源加载优化：
	 （1）第一是，比如说减少入口文件体积，常用的方法就是路由懒加载，把不同路由对应的组件分割成不同的代码块，就避免了在首页加载全部组件文件。
	 		component: () => import('./components/ShowBlogs.vue')
			箭头函数 + import的方式
	 （2）第二是，浏览器缓存，一般来说引入的第三方插件是不会变动的，将第三方库单独打包（splitChunks），浏览器就能将这些插件缓存到本地，下次再
	 		加载页面的时候，就能直接从本地加载缓存，就不用发送请求去下载文件，当第三方库发生变化，打包后的hash值就会改变，缓存就失效
	 （3）第三是，UI组件按需引入，一个组件库有几十个组件，可能实际开发只会用到其中十几个组件
	 （4）第四是，对代码、图片、字体这些资源进行压缩，js用terser-webpack-plugin压缩，用image-webpack-loader插件，对图片进行压缩，像现在AI技术比较发达，有些AI模型能够无损压缩图片，（图片懒加载）
	 （5）第五是，动态加载模块，比如首页有多个弹窗，等到需要展示弹窗的时候，再用import().then()的方式的去动态加载，这样就不用一进首页就加载这些弹窗资源

4. 第二个方向是页面渲染的优化
   （1）像是用web worker开始多线程环境，将一些复杂的运算交给另外一个线程，减少运算时间
	 （2）减少页面的重排，重绘
	 （3）降低css选择器的复杂度
	 （4）如果首页有动画效果，可以使用requestAnimationFrame来优化动画效果
		