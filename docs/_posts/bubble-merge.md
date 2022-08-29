---
title: js 冒泡排序
date: 2022-08-29
tags:
  - js
  - 算法
author: BingBing
location: ShangHai
---

## 什么是冒泡排序？

冒泡排序（Bubble Sort），这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端特别像水泡从水底冒到水面。

## 解析

给定一个 N 个元素的数组，冒泡法排序将：

1. 比较一对相邻元素（a，b），
2. 如果两项的大小关系不正确，交换这两个数（在本例中为a > b），
3. 重复步骤1和2，直到我们到达数组的末尾（最后一对是第 N-2 和 N-1 项，因为我们的数组从零开始）
4. 到目前为止，最大项将在最后的位置。 然后我们将 N 减少1，并重复步骤1，直到 N = 1


## 代码实现
```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 一轮排序下来最后一个放置的是最大值,下一轮不需要对最后一位进行排序
    // debugger
    for (let j = 0; j < arr.length -i - 1; j++) {
      // 前后位置交换
      if(arr[j] > arr[j+1]){
        // var tem = arr[j];
        // arr[j] = arr[j+1];
        // arr[j+1] = tem;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
}

export default bubbleSort
```
## 过程解析

假设有一个需要排序的数组 arr: [29, 23, 100, 9, 7, 49, 36, 57]
设外层循环索引为**i**,内层循环索引为**j**,相邻元素分别为**a**和**b**
- 第一轮排序:
  i: 0
  1. 内循环第1轮排序:
      j: 0
      a: 29
      b: 23    
      a > b: true 交换两个位置的值
      arr: [23, 29, 100, 9, 7, 49, 36, 57]
  2. 内循环第2轮排序:
      j: 1
      a: 29
      b: 100    
      a < b 不交换进入下一循环
      arr: [23, 29, 100, 9, 7, 49, 36, 57]
  3. 内循环第3轮排序:
      j: 2
      a: 100
      b: 9  
      a > b: true 交换两个位置的值 
      arr: [23, 29, 9, 100, 7, 49, 36, 57]
  4. 内循环第4轮排序:
      j: 3
      a: 100
      b: 7  
      a > b: true 交换两个位置的值 
      arr: [23, 29, 9, 7, 100, 49, 36, 57]    
  5. 内循环第5轮排序:
      j: 4
      a: 100
      b: 49  
      a > b: true 交换两个位置的值 
      arr: [23, 29, 9, 7, 49, 100, 36, 57] 
  6. 内循环第6轮排序:
      j: 5
      a: 100
      b: 36  
      a > b: true 交换两个位置的值 
      arr: [23, 29, 9, 7, 49, 36, 100, 57] 
  7. 内循环第7轮排序:
      j: 6
      a: 100
      b: 57  
      a > b: true 交换两个位置的值 
      arr: [23, 29, 9, 7, 49, 36, 57, 100] 

一轮排序下来最后一个放置的是最大值,下一轮不需要对最后一位进行排序
后面的循环其实都是重复执行之前的步骤内层循环的详细排列我就给省略了直接给出外层循环的结果

- 第二轮排序: arr :[ 23,9,7,29,36,49,57,100 ]
- 第三轮排序: arr: [ 9,7,23,29,36,49,57,100 ]
- 第四轮排序: arr: [ 7,9,23,29,36,49,57,100 ]
- ....
- 第八轮排序: arr: [ 7,9,23,29,36,49,57,100 ]

值得一提的是第四轮排序完成后其实整个数组已经是个**有序**的状态了,但是无论是外层循环还是内层循环都依然继续执行了，是因为程序不知道当前数组已经是个有序的状态了，所以冒泡排序还可以进行优化。


## 优化

因时间复杂度为 O(N2)，冒泡排序实际上是低效的。 想象一下，我们有 N = 106 个数字。 即使我们的计算机速度快到可以在1秒内计算108次操作，冒泡排序仍需要大约100秒才能完成。
但是，它可以提前结束，改进的思路很简单：如果某次内部循环完全不交换，这意味着数组已经有序，我们可以在这个点上停止冒泡排序。

冒泡排序优化:

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 一轮排序下来最后一个放置的是最大值,下一轮不需要对最后一位进行排序
    // debugger
    let flag = true // flag：若一次排序未发现数据交换，则说明数据已经有序，可以结束排序过程
    for (let j = 0; j < arr.length -i - 1; j++) {
      // 前后位置交换
      if(arr[j] > arr[j+1]){
        // var tem = arr[j];
        // arr[j] = arr[j+1];
        // arr[j+1] = tem;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        flag = false // 如果发生过排序则当说明前并非有序数组，循环继续
      }
    }
    if(flag){
      break
    }
  }
}

export default bubbleSort
```