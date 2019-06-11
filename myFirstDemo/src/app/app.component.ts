import { Component } from '@angular/core';

/***
 * 装饰器：是一个语法糖，相当于 export class AppComponent extends Component
 * 
 * 可以对其下方的代码进行输出
 * 
 */
@Component({
  selector: 'app-root',  //当前组件名
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFirstDemo';
  students: string[] = ['张三', '李四', '王五'];
  isIf: boolean = true;
  v1: string = '我是v1';
  v2: string = '我是v2';
  change(){
    this.isIf = !this.isIf;
  }
}
