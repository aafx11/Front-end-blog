## CSS3新特性 边框，背景，文本，颜色，过渡，转换，动画，布局，媒体查询  
1. 新增了3个边框属性：
  border-radius：创建圆角边框
  border-image：使用图片来绘制边框
  box-shadow：为元素添加阴影
2. 还增加了几个背景相关的属性，包括background-clip、background-origin、background-size
  （1） background-clip 控制背景覆盖的范围（content-box只覆盖内容，padding-box覆盖到内边框，border-box覆盖到边框）
  （2）background-origin 控制背景的原点相对的区域（背景是以左上角对齐的，是以内容的左上角还是以内边距的左上角对齐，就是用这个属性来设置的）
    border-box、padding-box、content-box
  （3）background-size 调整背景图片的大小，contain; 缩小图片以适合元素，cover; 扩展元素以填补元素
      也可以设置百分比或者固定像素的宽高
3. 还新增了一些文本相关的属性，像是overflow-wrap，text-overflow，text-shadow
   overflow-wrap 控制字符串的换行，normal正常浏览器的换行，break-word允许在单词内换行
   text-overflow 对文本溢出的处理，可以是clip截断文本，可以是 ellipsis 展示省略号，
   也可以是自定义一个文本截断时展示的字符串
   text-shadow 文本阴影，（水平阴影，垂直阴影，模糊距离，阴影颜色）

4. CSS3还增加了新的颜色表示方式，比如rgba，rgb表示颜色值，a表示透明度
5. CSS3还加入渐变色，包括 linear-gradient：线性渐变 ，radial-gradient：径向渐变
6. transition 过渡，是过渡属性，过渡时间，效果曲线，延迟时间的简写
7. transform 转换
   （1）translate 位移
   （2）scale 缩放
   （3）rotate 旋转
   （4）skew 倾斜
8. animation 动画
   animation 动画的属性有动画名称，动画持续时间，动画曲线，动画延迟时间，动画的执行次数，动画执行方向
9. 新增了布局方式，包括flex弹性布局，grid栅格布局
10. （媒体查询）
   
   
## 回流和重绘
1. 回流就是dom元素的尺寸，布局，隐藏等属性发生变化，就会引起回流
2. 重绘就是dom元素的外观样式发生变化，需要重新渲染就是重绘，比如背景颜色，字体颜色的修改
3. 减少对dom节点的操作，当我们希望修改一个dom节点的样式时，不要逐个逐个的对style进行修改，而是直接赋值一个新的class类
4. 当我们需要对dom节点插入多个节点的时候，可以先通过 createDocumentFragment，创建一个空白的文档片段，这个文档片段是存在于
   内存中的，可以将需要插入的多个dom节点先插入到文档片段中，再将文档片段统一插入dom数中，减少对dom的操作，减少回流
5. 使用 css3 的硬件加速，可以用transform，opacity这些属性，是不会引起回流重绘的，而修改background-color是会引起重绘的