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


### TypeScript

```
// 变量定义:

let name:string = "bob";
let num:number = 6;
let list:number[] = [1,2,3];
let arr:any[] = [1,2,'3',true];

------------------------------------------------------------------------------------------------------------

//枚举:
//每周只有3天，以外的数据不需要

enum Week{ One, Two, Three=3 }      //默认是从0开始，与索引类似。也可以自己设定索引值


let w:Week ;                        //使用枚举类型


w = Week.Three;                     //赋值 //3

------------------------------------------------------------------------------------------------------------

//返回值return：

function getNum(n:number):number{   n的类型是number,返回值是number
    return n+1
}

let result : number;
result = getNum(4);
console.log(result);                //5

//void:

function show(str:string):void{   n的类型是string,没有返回值
    console.log(str);
    return 1;           //error
    return null;        //通过
    return undefined    //通过
}

show('123');   //123


------------------------------------------------------------------------------------------------------------

//类型断言：

//1
let myStr:string = <string>abcd;  //声明一个string类型，并断言abcd是string

//2
let myStr:string = abcd as string; //声明一个string类型，并断言abcd是string


------------------------------------------------------------------------------------------------------------

//类：

class Person {
    name:string;
    constructor(message:string){
        this.name = message;
    }
    getName(){
        return this.name;
    }
}

let person = new Person("Ethan");  


------------------------------------------------------------------------------------------------------------

//修饰符：
//访问修饰符与继承无关，只要符合继承规则都能通过实例对象访问；

//private 只能在 自己的class中 访问，class外不能访问

//protected 可以在 自己的class中 和 子类的class中 访问，class外不能访问

//public 可以在任意代码范围访问 包括 class外 和 其他继承的class

//readonly 只读


class Person {

    public name:string = 'Ethan';   //pubilc 能够被外部访问，能够被继承

    private age:number = 18;        //private 不能够被外部访问(只能在Person里面被访问)，能够被继承

    protected sex:string = 'male';  

    public getName():void{
        console.log('my name is:' + this.name + ',my age is:' + this.age);
    }
}

let person = new Person();  
person.name = 'mbw';
person.age = 20;            //error => 属性只能在class中被访问

person.getName();           // 'my name is mbw,my age is 18';


------------------------------------------------------------------------------------------------------------

// set/get存储器：(相当于defineProperty 的 get和 set)


class Person {
    private _age:number = 18;       

    //提供公共的访问方式
    
    get age():number {              //返回number类型
        return this._age;
    }

    set age(newAge:number) {
        this._age = newAge;
    }
}

------------------------------------------------------------------------------------------------------------

// 静态属性:

class Test {

    age:number = 12;
    static myName:string='123';
    
    static show(){
        console.log(this.age);
    }

    //实例可以访问静态
    myShow(){
        console.log(Test.myName);
    }
}

console.log(Test.myName);    // '123'

Test.show(); //模板早于实例的创建，不能访问实例属性 => 静态不能访问实例属性

let test = new Test();
test.myShow()  //"123" => 实例可以访问静态



------------------------------------------------------------------------------------------------------------

// 抽象类:(只定义，不实现)

abstract class Animal {

    abstract makeSound(): void;

    move():void {
        console.log('走路中......');
    }
}

// 只有抽象类可以包含抽象方法
class Cat extends Animal {
    makeSound(){
        console.log('喵......');
    }
}

class Dog extends Animal {
    makeSound(){
        console.log('汪......');
    }
}


let cat = new Cat();
cat.makeSound();   // '喵......'

let dog = new Dog();
dog.makeSound();   // '汪......'


------------------------------------------------------------------------------------------------------------

// 接口

//一个类只能继承一个类；但是一个类可以实现多个接口

interface Gun {
    fire(str:string); //定义一个方法
}

interface GunName extends Gun {
    name:string;
}

class BlackCat implements GunName{
    color:string = 'red';

    fire(str:string){
        console.log('黑猫警长开火了',str,this.color);
    }
}

let blackcat = new BlackCat;
blackcat.fire('子弹')


------------------------------------------------------------------------------------------------------------

// 泛型

//any:任意的数据类型，代表 这个函数或者类中 使用的变量类型永远是 任意类型
//泛型：代表留空，使用的时候填入什么类型，这个类或者函数就永远是什么类型

//函数由外部传递泛型

function Test<T>(arg :T):T {  //由于未来需要对类型进行处理或者判断，所以需要规定一个类型T
    return arg;
}

let answer = Test<string>('myString');   //此处相当于 把string类型 赋给了 T


//类由外部传递泛型

class Test<T,S> {
    public a : T;

    add(b :S):S {
        return b;
    }
}

let test = new Test<number,string>();
test.a = 123;
text.add('hello world');



```

### 脚手架 @angular/cli  ：
```
npm install -g @angular/cli   //全局安装脚手架

ng new xxx  //创建一个项目

|-- e2e                     测试
|
|-- src                     源文件
|
|-- .editorconfig           编辑器默认配置:空格、首行缩进2格、等等
|
|-- angular.json            工程配置文件(*)
|
|-- karma.conf.js           测试用引擎
|
|-- tsconfig.json 
|
|-- tslint.json
|

```

#### app.component.ts
```
import { Component } from '@angular/core';

@Component({                                //组件声明
  selector: 'app-root',                     //标签名
  templateUrl: './app.component.html',      //引入html
  styleUrls: ['./app.component.scss']       //引入scss
})
export class AppComponent {                 //导出整个组件
  title = 'myFirstDemo';
}

```



