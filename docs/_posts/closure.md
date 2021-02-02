---
title: 朴实无华的JavaScript闭包
date: 2020-07-21
tags:
  - js
author: BingBing
location: ShangHai
---

## 什么是闭包?

我想每一位前端开发都应该听说过闭包，每当面试官问谈谈你对闭包的理解:通常我都是回复**当函数 A 内部嵌套了函数 B，那么我们可以把 B 函数称为 A 函数的闭包**。当然这么说并没有错，这是闭包的表现我们是否有想过闭包的本质是什么？闭包的场景是什么？

带着以上的几个问题我们来对闭包一探究竟。
![](https://user-gold-cdn.xitu.io/2020/7/19/173662b69445eb6b?w=1298&h=717&f=png&s=34310)

## 一切得从词法作用域开始说起

### 词法作用域

> 词法（lexical）一词指的是，词法作用域根据源代码中声明变量的位置来确定该变量在何处可用。

### 作用域链

当在函数中进行变量查找的时候，如果这个属性不存在，那么 js 解释器就会在父作用域中查找这个属性，如果父辈中也没有继续往祖辈中查找。像这样一层层在父作用域中查找的过程我们称之为作用域链。

```!
当查找的属性在整个作用域链中不存在的话，那么在浏览器环境下一般会产生一个错误 `Uncaught ReferenceError: xxx is not defined`
```

来看一个 MDN 上的例子:

```
function init() {
    var name = "Mozilla"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
```

我们分析下函数运行时作用域是如何调起的:

1. 当运行`init()`的时候,在函数内部定义了一个局部变量`name`，声明了一个函数`displayName`。这时候 js 会调起一个`init()`函数的作用域。
2. 当运行`displayName()`的时候，js 会调起`displayName`的作用域，当执行到`alert(name)`由于当前函数作用域中并没有找到变量`name`于是作用域环境就向外部执行环境函数`init`中查找,这种查找过程就形成了**作用域链**，找到`name`后停止查找执行`alert`。

根据以上的例子我们知道了函数运行时会调起当前作用域试想一下如果在`displayName`的内部定义了变量`name`那么`alert`的到底是哪个**name**，这里应该能猜到当然是内部的`name`。因为在作用域中查找是需要时间的，能在当前作用域中找到就会屏蔽掉外部作用域中的同名变量这也符合一般规律。

![](https://user-gold-cdn.xitu.io/2020/7/23/1737aaba0ade70e1?w=1153&h=932&f=png&s=50207)

## 不得不提的 JavaScript 内存管理

理解了作用域的概念之后我们还要了解**JavaScript**中内存的管理。
这里有两个概念一个是**分配内存**另一个就是**回收内存**。

### 内存分配

> 为了不让程序员费心分配内存，`JavaScript` 在定义变量时就完成了内存分配。

### 内存回收

> `JavaScript` 同样嵌入了“垃圾回收器”，它的主要工作是跟踪内存的分配和使用，以便当分配的内存不再使用时，自动释放它。这只能是一个近似的过程，因为要知道是否仍然需要某块内存是无法判定的（无法通过某种算法解决）。

那么**闭包**和**内存回收**之间有什么联系呢?
废话不多说直接开始看代码:

```
function a(){
    var n = 0
    var add = function(){
        return n += 1
    }
    return add
}
var c = a()
c() // n = 1
c() // n = 2
c() // n = 3
.....
```

可以看到函数 `a` 返回一个名为 `add`的函数 并在 `add` 的内部引用了函数 `a` 中定义的变量 `n`，当我们把 `a` 函数的运行结果保存在变量 `c` 中第一次运行`c()`返回 **1** 第二次运行`c()`返回 **2** 以此累加。
函数每次返回的 `n` 都是在上次运算的基础上进行。

![](https://user-gold-cdn.xitu.io/2020/7/21/173708f06ae1baaa?w=643&h=602&f=png&s=65657)
当程序执行到代码`var c = a()`的时候：

1. 调用`a()` 返回 `add` 函数的引用。
2. 在全局作用域中定义了变量`c`保存了`add`函数的引用。

当程序执行到代码`c()`的时候:

1. `add` 函数被执行，`n += 1`在当前函数的中试着寻找变量`n`,显然是没有的，于是执行环境只能向父作用域中查找。
2. 然后`js`就沿着**作用域链**在`a`函数中继续查找变量`n`。
3. 终于在`a`函数中发现定义了变量`n = 0`找到变量`n`并对其进行 `+1` 计算并返回 `n += 1` 的结果。

总结:
变量`c`引用了`add`函数而`add`函数引用了变量`n`，那么变量`c`间接地通过了`add`函数完成了对变量`n`引用。所以就导致了 js 引擎一直没有对变量`n`进行**内存回收**，因此我们每次运行`c()`都会基与内存中变量`n`的值，故而产生了**闭包这种现象**，看到这里是不是有种恍然大悟的感觉。

这么看来闭包确实挺朴实无华的，学习编程往往都是由一个简单的示例到复杂的案例，看了闭包的外形，且掌握了闭包的本质，那么接下来我想用几个实际开发中碰到的问题用闭包的方式去解决。

## 闭包的应用

### 购物车商品计数器

需求:

1. 可以对商品数量进行增加、减少、访问。
2. 一个页面下可以存在多个计数器。
3. 多个计数器分别只对当前商品起作用，即多个计数器之间状态互不干扰。
4. 除了计数器本身提供的方法之外，无法通过别的手段访问和修改计数器中的状态。

```
function counter() {
  var num = 0;
  let obj = {
    add: function add() {
      return (num += 1);
    },
    reduce: function add() {
      return (num -= 1);
    },
    get: function() {
      return num
    }
  };
  return obj;
}
let c1 = counter()
c1.add()
let c2 = counter()
```

### 用闭包实现防抖(debounce)

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```
function debounce(fn,wait){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },wait)
    }
}

function a(a){
    console.log('a:',a)
}

var b = debounce(a,1000) // 在一秒钟之内只能触发一次，如果再次触发则重新计时

window.addEventListener('scroll',function(){b('hello')})
```

#### 防抖的应用场景

- 输入框联想查询
- 阻止按钮在规定时间内被多次点击
- 浏览器窗口大小调整

### 用闭包实现节流(throttling)

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```
function throttling(fn,wait){
    let oldTime = 0
    return function (){
        let nowTime = Date.now()
        if(nowTime-oldTime > wait){
            oldTime = Date.now()
            fn.apply(this,arguments)
        }
    }
}

function a(a){
    console.log('a:', a)
}

var b = throttling(a,1000)

window.addEventListener('resize',function(){
    b('hello')

},false)
```

#### 节流的应用场景

- 限制接口调用的频率
- 对滚动到底部或者下拉刷新事件的次数做限制
- 高频率的按钮点击等

## 后话

我们用了两个例子了解了**JavaScript**词法**作用域**和**内存管理**。在从闭包外表，了解到闭包本质就是**内部的作用域**被外部引用导致了**内存得不到释放**于是产生了**闭包**。最后用闭包的方式完成了**节流防抖**函数。

以上就是我所理解的闭包，其中可能因为本人学艺不精导致内容不可避免地出现一些错误，希望大佬能帮忙指正。

如果这篇文章对您理解闭包有所帮助的话别忘了点 👍 哦，别下次一定了就这次吧!

最后，感谢您阅读这篇文章，有任何问题或反馈请给我留言。