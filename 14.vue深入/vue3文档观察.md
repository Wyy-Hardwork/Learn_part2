# Vue3值得注意的新特性
## 组合式API
> https://v3-migration.vuejs.org/zh/

### 什么是组合式API?
组合式API(Compsition API)是一系列API集合,让我们可以使用函数而不是声明选项的方式写Vue组件.涵盖了以下方面的API:  
1. 响应式API: **ref()**,和 **reactive()**,使我们可以直接创建响应式状态、计算属性、侦听器。
2. 生命周期钩子：例如 **onMounted（）** , **onUnmounted()**
3. 依赖注入：例如**provide()** 和 **inject()**  
***
Vue2.7之前可以使用@vue/composition-api插件实现组合式API.  
在组合式API中,基本上都会配合**script setup**标签在单文件组件中使用。虽然这套API是基于函数的组合，但**组合式API并不是函数式编程**。  
***  
### 为什么要有组合式API?  
1. 最基本的优势就是通过**组合函数**来实现简洁高效的逻辑复用，而组合式API解决了mixins的所有缺陷。
2. 各功能代码，各自集中在各自的部分，组合式API好看一些。
3. 搭配**script setup**使用组合式API比等价情况使用选项式API更加高效，对代码压缩也更友好。另外setup形式书写的组件模板被编译为了**内联函数**，不需要像选项式API依赖this上下文对象访问属性，更不许要从实例中代理。  
***  
***
## \<script setup>
在单文件组件SFC中使用组合式API的编译时语法糖。同时使用以上两个，改语法是默认推荐，相比普通\<script>语法，它具有更多优点。  
- 不用写setup()
- 可以使纯Ts声明props和自定义事件
- 更好的运行时性能，这是由于模板会被编译成同作用域内的渲染函数，避免了渲染上下文代理对象。  
### 基本语法
```js
<script setup>
console.log('hello script setup')
</script>
```  
里面的代码会被编译成组件setup()的内容,不同于普通的\<script>标签只在组件首次引入时候执行一次,\<script setup>会在**每次组件实例被创建时候执行**(我觉得很像生命周期钩子)  
***
### 顶层的绑定会被暴露给模板
```js
<script setup>
// 变量
const msg = 'Hello!'
// 函数
function log() {
  console.log(msg)
}
</script>
<template>
  <button @click="log">{{ msg }}</button>
</template>
//模板直接拿去用
```
import导入的内容也会以同样的方式暴露。这意味着可以在模板表达式直接使用导入的函数，而不需要methods选项来暴露它：
```js
<script setup>
import { capitalize } from './helpers'
</script>
<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```
***
### 响应式
需要用**响应式API**来创建。ref在模板中使用会**自动解包**，不需要写value
```js
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <button @click="count++">{{ count }}</button>
</template>
```
***
### 使用组件
\<script setup> 范围里的值也能被直接作为自定义组件的标签名使用：
```js
<script setup>
import MyComponent from './MyComponent.vue'
</script>
<template>
  <MyComponent />
</template>
```
***
### 动态组件
```js
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
//用了三元表达式使用component动态组件，三元表达式就是判断后赋值
```
***
### 递归组件
单文件组件可以通过它的文件名被自己引用，例如名为 FooBar.vue 的组件可以在其模板中用 \<FooBar/> 引用它自己。  
这种引用相比于导入组件优先级更低，如果有冲突的话可以为导入组件添加别名。
```js
import { FooBar as FooBarChild } from './components'
```
***
### 命名空间组件
可以使用带 **.** 的组件标签，例如\<Foo.Bar>来引用嵌套在对象属性中的组件


 
