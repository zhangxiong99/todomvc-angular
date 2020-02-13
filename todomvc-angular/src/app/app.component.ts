import { Component } from '@angular/core';
import {Router,NavigationStart,NavigationEnd} from '@angular/router';
const todos = [{
  id:1,
  title:"吃饭",
  done:true
},
{
  id:2,
  title:"睡觉",
  done:false
}]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private router:Router){}
  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        const hash=window.location.hash.substr(1);
        switch(hash){
          case '/':
            this.visibility='all';
            break;
          case '/active':
            this.visibility='active';
            break;
          case '/completed':
            this.visibility='completed'
            break;
        }
      }
    })
  }
  title = 'todomvc-angular';
  //声明一个todos变量
  public todos:{
    id:number,
    title:string,
    done:boolean
  }[]=todos

  //声明currentEditing用来便是当前正在编辑的对象
  public currentEditing:{
    id:number,
    title:string,
    done:boolean
  }=null

  //添加一个属性用于控制任务列表的切换
  public visibility:string='all'

  //添加任务
  addTodo(event){
    //获取到用户输入的任务名字
    var taskName=event.target.value;
    //获取到最后一个任务
    var lastTask=this.todos[this.todos.length-1];
    //包装一个新任务，并添加到任务列表
    var newTask={
      id:lastTask?lastTask.id+1:1,
      title:taskName,
      done:false
    }
    this.todos.push(newTask);
    //清空输入框
    event.target.value=""
  }

  //所有任务都完成的情况
  get toggleAll(){ 
    return this.todos.every(item=>item.done)   //当所有任务都完成后全选按钮会亮
  }

  //点击按钮进行切换
  set toggleAll(value){
    this.todos.forEach(item=>item.done=value);  //全选按钮可以跟随下面按钮的变化改变，
  }

  //点击删除
  removeTodo(index){
    this.todos.splice(index,1)
  }

   //键盘谈起的时候判断是否按了回车键
   handleEditKeyUp(event){
     //获取用户按下的按键键盘码和target信息
     const {keyCode,target}=event;

     //当用户按下esc键的时候
     if(keyCode===27){
       //target.value=当前正在编辑的todo的title
       target.value=this.currentEditing.title;
       //清除编辑样式
       this.currentEditing=null;
     }
   }

   //回车和失去焦点的时候保存用户编辑的信息
   saveEdit(todo,event){
     var inputValue=event.target.value;
     todo.title=inputValue;
     //清除编辑样式
     this.currentEditing=null;
   }

   //获取剩余未完成任务的数量
   get remaningCount(){
     return this.todos.filter(item=>!item.done).length;
   }

   get filterTodos(){
     if(this.visibility==='all'){
       return this.todos;
     }else if(this.visibility==='active'){
       return this.todos.filter(item=>!item.done)
     }else{
       return this.todos.filter(item=>item.done)
     }
   }
}
