---
title: 项目中遇到的问题以及解决方案
date: 2021-02-03
show: false
tags:
  - CSS
author: BingBing
location: ShangHai
---

## 移动端 1px border
移动端一个1px在 DPR 为 2 的 设备上显示为 2px 的物理像素
```
@border-color-base : #EBEDF0;
// 伪元素的位置控制
.scale-hairline-common(@color, @top, @right, @bottom, @left) {
  content: '';
  position: absolute;
  background-color: @color;
  display: block;
  z-index: 1;
  top: @top;
  right: @right;
  bottom: @bottom;
  left: @left;
}

//上边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'top') {
  border-top: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-top: none;

      &::before {
        .scale-hairline-common(@color, 0, auto, auto, 0);
        width: 100%;
        height: 1PX;
        transform-origin: 50% 50%;
        transform: scaleY(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleY(0.33);
        }
      }
    }
}

// 右边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'right') {
  border-right: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-right: none;

      &::after {
        .scale-hairline-common(@color, 0, 0, auto, auto);
        width: 1PX;
        height: 100%;
        background: @color;
        transform-origin: 100% 50%;
        transform: scaleX(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleX(0.33);
        }
      }
    }
}

// 下边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'bottom') {
  border-bottom: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-bottom: none;
      &::after {
        .scale-hairline-common(@color, auto, auto, 0, 0);
        width: 100%;
        height: 1PX;
        transform-origin: 50% 100%;
        transform: scaleY(0.5);
        @media (min-resolution: 3dppx) {
          transform: scaleY(0.33);
        }
      }
    }
}

// 左边框
.hairline(@direction, @color: @border-color-base) when (@direction = 'left') {
  border-left: 1PX solid @color;

    @media (min-resolution: 2dppx) {
      border-left: none;

      &::before {
        .scale-hairline-common(@color, 0, auto, auto, 0);
        width: 1PX;
        height: 100%;
        transform-origin: 100% 50%;
        transform: scaleX(0.5);

        @media (min-resolution: 3dppx) {
          transform: scaleX(0.33);
        }
      }
    }
}

// 全边框
.hairline(@direction, @color: @border-color-base, @radius: 0) when (@direction = 'all') {
  border: 1PX solid @color;
  border-radius: @radius;

    @media (min-resolution: 2dppx) {
      position: relative;
      border: none;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1PX solid @color;
        border-radius: @radius * 2;
        transform-origin: 0 0;
        transform: scale(0.5);
        box-sizing: border-box;
        pointer-events: none;
      }
    }
}

```

使用：

```
.div1{
    .hairline('top',#eeeeee)
    .hairline('right')
    .hairline('left',#cccccc)
}
.div2{
    .hairline('all',#bbbbbb,3px)
}

```
## css实现的锯齿状优惠券样式 

用背景渐变做优惠券锯齿样式
[链接](https://codepen.io/huabingtao/pen/gOLbqbE)

## css 实现单行多行文本溢出隐藏
因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端

单行文本溢出隐藏
``` css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```
多行文本溢出隐藏
1. -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
2. display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
3. -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
``` css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
当我们设置white-space:nowrap，项目控件由于不能计算多余的空间导致无法收缩了。此时我们设置固定尺寸就可以收缩了
```
.g-list .item-content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 +  min-width: 0;
 +  overflow: hidden;
}
```
给文字.item-title的父级设置宽度，通过 min-width、max-width、width属性都可以设置，但因为文字的长度不定设置width或者max-width都有可能遮住有效区域，所以建议使用min-width: 0比较符合；除此之外通过overflow: hidden使得父元素变为BFC也能达到同样的效果,[参考文章](https://segmentfault.com/a/1190000020012748)




