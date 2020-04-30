---
title: '[译文] Angular中的组件通信'
date: '2020-04-27'
---

> 在这篇文章中，我将要分享一些在Angular中的组件通信，并且分别介绍最适合它们的使用场景。

[原文在此，原文在此，原文在此，重要的事说三遍](https://alligator.io/angular/component-communication/)

### 1. 在URL中传输数据

想象一下我们从一个即将被销毁页面导航到另一个落地页面，如果没有很多数据要传输(比如要传输某个对象的id)，那么我们可以使用URL来传输数据。

在Angular中有两种方法可以在URL中传输数据

1. Router Parameters
2. Query Params

#### Router Parameters(路由参数)

Router Parameters需要参数，如果组件的参数是强制性的，那么我们必须使用路由器参数。我们首先要在router module中注册URLd的参数：

```js
// app-router.module.ts
cosnt routes: Routes = [
	{ path: 'list/:id', component: AppListComponent }
];
```

其中 **list**是路由的url，:id是路由的参数，当路由匹配到这个url并挂载**AppListComponent**时，这个路由参数是必传的。

* 通过routerLink指令来传输路由参数

```js
<button type="button" [routerLink]="['/list', id]">Show List</button>
```

其中**id**在组件中声明并初始化， **/list**是我们想导航至的路由。

* 通过路由的Service文件来传输

```js
class AppComponent {
	id = 28;
	constructor (private: router: Router) {}
	route() {
		this.router.navigate(['/list', this.id]);
	}
}
```

* 获取路由参数

如何在导航至的组件中获取路由参数：

```js
class AppListComponent {
	constructor(private activatedroute: ActivatedRoute) {
		this.activatedrouter.params.subscribe(data => {
			console.log(data);
		})
	}
}
```


#### 查询参数

查询参数是可选的,所以注册URL时不需要注册查询参数。

```js
// app-rouer.module.ts
const routes: Routes = [
	{ path: 'list', component: AppListComponent },
]
```

其中**list**是该路由的url，**AppListComponent**是该路由匹配的组件。

* 通过routerLink传输查询参数

```js
<button type="button" [routerLink]="['/list']" queryParams="{id: '24'}"></button>
```

其中**id**是键，24是固定的值，你也可以声明一个异步的值并传输过去。

* 通过Route Service来传输查询参数

```js
// app.component.ts
class AppComponent {
	id = 28;
	constructor(private router: Router){}
	
	route() {
		this.router.navigate(['/list'], { queryParams: { id: this.id } });
	}
}
```

* 获取查询参数

```js
// app-list.component.ts
class AppListComponent {
 constructor(private activatedroute: ActivatedRoute){
 	this.activatedroute.queryParams.subscribe(data => {
 		console.log(data);
 	})
 }
}
```

> TIPS: [获取有关Angular的router params的更多细节](https://alligator.io/angular/query-parameters/)


### 通过@Input和@Output来传输数据

如果我们想在父子组件中通信，那么我们可以使用@Input和@Output。

```js
app-parent.component.html
<app-child [jsonData]="data" (outputData)="data = $event;"></app-child>
```

其中**data**是一个在component文件中初始化的变量。

```js
// app-child.compoent.ts
import { Component. Input, OnInit } from '@angular/core';
@Component({
	selector: 'app-child',
	template: ''
})
export class AppChild implements OnInit {
	@Input() 
	jsonData;
	@Output()
	outputData = new EventEmitter();
	constructor() {}
	
	ngOnInit() {
		console.log(this.jsonData);
	}
	
	emitData(data) {
		this.outputData(data);
	}
}
```

通过这种方式我们可以实现父子组件之间的相互通信。

> TIPS: [获取有关@Input和@Output的更多细节](https://alligator.io/angular/outputs-angular/)

###  通过在Service中使用Observables来传输数据

如果两个组件是兄弟组件或者两个组件的层级相差太远，那么最好在Service使用Observable来传输数据。

在这里我将使用[RxJS subject](https://alligator.io/rxjs/subjects/) 来创造一个observable。

```js
//app.component.ts
import { Inhectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AppService {
	observer = new Subject();
	public subscriber$ = this.observer.asOBservable();
	
	emitData(data) {
		this.observer.next(data);
	}
}
```

为了发射数据你可以调用这个service中的emitData方法，以及接收数据的话你必须订阅`subsciber$`,比如：

```js
class AppComponent {
	constructor(private appService: AppService) {}
	ngOnInit() {
		this.appService.subscriber$.subscribe(data => {
			console.log(data);
		})
	}
}
```

综上，在你的组件中使用这三种方法来来回传输数据。现在赶紧去编写一些牛逼的组件吧。





































