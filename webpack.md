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
  css-minimizer-webpack-plugin