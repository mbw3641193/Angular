# Angular


## Angular 1.x

#### 根元素(相当于vue的el)
```
ng-app=''

//ng-app作用：1、范围；2、引入组件
```


#### 数据初始化
```
1. ng-init=''
2. 

```

#### 数据双向绑定
```
ng-model
```

#### 属性

与vue区别：
```
//vue:
v-bind:title="title"
:title="title"

//angular:
title="{{title}}"
```

#### ng-bind
向页面中渲染数据
```
//渲染数据的两种方式
//1 (常用的方式)
<div>{{content}}</div>

//2 (不常用)
<div ng-bind="content"></div>
```

#### ng-repeat （相当于v-for）
```
<body ng-init="arr=['1','2','3','4']">

    <li ng-repeat="a in arr track by $index">{{$index}},{{a}}</li>

    //尽量不要使用$index作为key ，这在任何框架中都是最愚蠢的做法

</body>
```


#### 事件
```
ng-click="fn"
```

#### ng-controller (相当于vue的vm，其中也有data与methods)

```
//vue:
let vm = new Vue({
    data:{},
    methods:{},

})

//angular
//1.声明组件
let mod = angular.module('mod1',[]);

//2.给组件添加controller
mod.controller('ctrl1',function($scope){
    $scope.a=12  //使用这种方式就可以不使用ng-init
    $scope.fn=function(){
        alert('123');
    }
})
//3.页面内使用组件
<body ng-app="mod1">

    <div ng-controller="ctrl1">
        {{a}}
        <button ng-click="fn()">按钮</button>  //与vue不同，ng-click中的方法必须带括号
    </div>

</body>
```

#### Angular 与  Vue 的数据检查

<h3>Angular --- 脏检查（循环所有的数据进行对比）所以性能较低，需要尽可能少的检查数据</h3>
<h5>所以Angular只在两个地方检查数据:
<br>
1.  函数执行完成时
<br>
2.  主动要求Angular进行检查 $scope.$apply();
<br>
Angular对异步不友好，因为无法检查数据：
<br>
请求数据使用：$http
<br>
定时器： $interval  $timeout
</h5>
<h3>Vue --- observe模式（dom-diff）</h3>


### MVVM

1. 双向绑定：
```
v-model  ng-model
```

2. 依赖注入:
> 由函数(模块)决定要哪些参数

```
<!---------模块---------->
mod.controller('ctrl1',function($scope,$interval,$http){
    
    console.log(arguments);   //3个对象
    //也叫做依赖翻转：实参不是由调用者决定的，而是由定义者决定

    $scope.arr=[{
        name:'a',
        birth:'121231414',
        mobile:'13344223311'
    },{
        name:'b',
        birth:'131512144',
        mobile:'13344223312'
    },{
        name:'c',
        birth:'142654742',
        mobile:'13344223313'
    }]

});

mod.filter('phone',function(){   //filter自定义模块,相当于是vue中的filter
    return function(input,arg){
        return input.substring(0,3)+'****'+input.substring(7);
    }
});

<!---------调用---------->
<body ng-app="mod1">

    <div ng-controller="ctrl1">
        <ul>
            <li ng-repeat="item in arr">

                {{item.birth | date:'yyyy-MM-dd'}}   //fliter用法1(非自定义)
                {{item.mobile}}   //fliter用法2(自定义filter模块)
            
            </li>   
        </ul>
    </div>

</body>
```


## Angular 4 && AngularIO

Angular 4 特点：
###### 1.强依赖于TypeScript
###### 2.强调组件



