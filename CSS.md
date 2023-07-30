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
   
   
