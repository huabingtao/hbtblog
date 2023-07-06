# 面试学习计划

## Vue源码
### init 函数

```
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    /* 省略无关代码... */
    //对生命周期做初始化操作
    initLifecycle(vm)
    //事件初始化
    initEvents(vm)
    initRender(vm)
    //调用beforeCreate生命周期函数
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    //初始化处理data/props/computed/watch等
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    //调用created生命周期函数
    callHook(vm, 'created')
    /* 省略无关代码... */
  }
}
```

### Vue响应式原理

```
const Observer = function(data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get');
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    }
  });
}

const observe = function(data) {
  return new Observer(data);
}

const Vue = function(options) {
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function() {
    new Watcher(self, self.render);
  }
  // 渲染函数
  this.render = function() {
    with(self) {
      _data.text;
    }
  }
  // 监听this._data
  observe(this._data);  
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  // 更新方法，用于触发vm._render
  this.update = function() {
    console.log('in watcher update');
    fn();
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
}

const Dep = function() {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    }; 
  }
})

vue.mount(); // in get
vue._data.text = '123'; // in watcher update /n in get

```


### Computed和Watch区别是什么?
计算属性和watch实际上都有监听属性变化的能力。只不过计算属性可以当做Vue实例上的响应式数据使用(通过Object.defineProperty定义了同名属性)，会自动监听计算属性函数调用到的响应式数据的变更，并且会返回计算属性函数的返回值；watcher是显式的为要监听的数据创建一个Watcher监听数据变更，不能作为vue实例上的响应式数据值使用。

计算属性 computed
1. 支持缓存，只有依赖数据发生改变，才会重新进行计算；
2. 不支持异步，当 computed 内有异步操作时无效，无法监听数据的变化；
3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的。也就是基于 data 中声明过或者父组件传递的 props 中的数据通过计算得到的值；
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性 是一个多对一或者一对一，一般用computed；
5. 如果 computed 属性值是函数，那么默认会走 get 方法，函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个 set 方法，当数据变化时，调用 set 方法；

侦听属性 watch：
1. 不支持缓存，数据变化，直接会触发相应的操作；
2. watch 支持异步操作；
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作，一对多；
5. 监听数据必须是 data 中声明过或者父组件传递过来的 props 中的数据。当数据变化时触发其他操作，函数有两个参数：
immediate：组件加载立即触发回调函数执行；
deep: 深度监听；为了发现对象内部值的变化，复杂类型的数据时使用，例如：数组中的对象内容的改变，注意：监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到；

总结：在 computed 和 watch 方面，一个是计算，一个是观察，在语义上是有区别的。
当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的，这是和 computed 最大的区别。

### Vue diff算法
diff的过程就是调用patch函数，就像打补丁一样修改真实dom

```
// body下的 <div id="v" class="classA"><div> 对应的 oldVnode 就是

{
  el:  div  //对真实的节点的引用，本例中就是document.querySelector('#id.classA')
  tagName: 'DIV',   //节点的标签
  sel: 'div#v.classA'  //节点的选择器
  data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
  children: [], //存储子节点的数组，每个子节点也是vnode结构
  text: null,    //如果是文本节点，对应文本节点的textContent，否则为null
}
```

1. sameVnode函数就是看这两个节点是否值得比较，代码相当简单：
```
function sameVnode(oldVnode, vnode){
	return vnode.key === oldVnode.key && vnode.sel === oldVnode.sel
}
```
当节点不值得比较，进入else中:
取得oldvnode.el的父节点，parentEle是真实dom
createEle(vnode)会为vnode创建它的真实dom，令vnode.el =真实dom
parentEle将新的dom插入，移除旧的dom
当不值得比较时，新节点直接把老节点整个替换了

2. 两个节点值得比较时，会调用patchVnode函数


首先，我们拿到新旧节点的数组，然后初始化四个指针，分别指向新旧节点的开始位置和结束位置，进行两两对比，若是 新的开始节点和旧开始节点相同，则都向后面移动，若是结尾节点相匹配，则都前移指针。若是新开始节点和旧结尾节点匹配上了，则会将旧的结束节点移动到旧的开始节点前。若是旧开始节点和新的结束节点相匹配，则会将旧开始节点移动到旧结束节点的后面。若是上述节点都没配有匹配上，则会进行一个兜底逻辑的判断，判断开始节点是否在旧节点中，若是存在则复用，若是不存在则创建。最终跳出循环，进行裁剪或者新增，若是旧的开始节点小于旧的结束节点，则会删除之间的节点，反之则是新增新的开始节点到新的结束节点。


## js

### 数组扁平化

```
let arr = [1, [2, [3, 4, 5]]];
function flatten(arr) {
  let result = [];

  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```

### 手写深拷贝
```
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new Map()) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }

  // 返回结果
  return result;
}
```

### 闭包
在一个函数中返回一个函数就形成了闭包
执行环境

### call apply bind的实现

call
```
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断 context 是否传入，如果没有传就设置为 window
  context = context || window;
  // 将被调用的方法设置为 context 的属性
  // this 即为我们要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  result = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 将执行结果返回
  return result;
};
```

apply

```
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行要被调用的方法
  if (arguments[1]) {
    result = context[fnSymbol](...arguments[1]);
  } else {
    result = context[fnSymbol]();
  }
  delete context[fnSymbol];
  return result;
};
```

bind
```
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 获取参数
  const args = [...arguments].slice(1),
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
};
```

### new 实现

首先创一个新的空对象。
根据原型链，设置空对象的 __proto__ 为构造函数的 prototype 。
构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。

```
function myNew(context) {
  const obj = new Object();
  obj.__proto__ = context.prototype;
  const res = context.apply(obj, [...arguments].slice(1));
  return typeof res === "object" ? res : obj;
}
```

## vue相关面试题

### vue3为什么要添加新的组合API，它可以解决哪些问题
在 Vue2.0 中，随着功能的增加，组件越来越复杂，维护起来也越来越难，而难以维护的根本原因是 Vue 的 API 设计迫使开发者使用监视、计算、方法 Option 组织代码，而不是实际的业务逻辑。

另外 Vue2.0 缺乏一个简单而低成本的机制来完成逻辑重用，虽然你可以 minxis 完全重用逻辑，但是当 mixin 更多的时候，就使得很难找到相应的数据，计算出来也许是从中 mixin 的方法，使得类型推断变得困难。

因此组合API外观，主要是解决选项API带来的问题，首先是代码组织，组合API开发者可以根据业务逻辑组织自己的代码，让代码更具可读性和可扩展性，也就是说，当下一个开发者接触到这段不是自己写的代码， 他可以更好地利用代码的组织来反转实际的业务逻辑，或者根据业务逻辑更好地理解代码。

二是实现代码的逻辑提取和重用，当然mixin逻辑提取和重用也可以实现，但就像我之前说的，多个mixin在作用于同一个组件时，很难看出mixin的属性，来源不明确，另外，多个mixin的属性存在变量命名冲突的风险。而 Composition API 恰恰解决了这两个问题。
