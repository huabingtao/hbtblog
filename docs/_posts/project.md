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

## Git 常用命令
