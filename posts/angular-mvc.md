---
title: '[译文] Angular MVC模式入门'
date: '2020-04-27'
---

[原文在此，原文在此，原文在此，重要的事说三遍](https://alligator.io/angular/angular-mvc-primer/)

> 当使用用户界面设计应用时，设计便于扩展和维护的代码结构非常重要。随着时间流逝，已经有一些方法(设计模式)可以分解应用中的不同组件担任的不同职责。虽然有许多的文章介绍相关的设计模式，但对于初学者来说仍然非常难以理解不同模式的局限性以及它们之间的不同点。

在这篇教程中，我想要讲讲两个主要的实现方法：Model-View-Controller(MVC)模式和Model-View-ViewModel(MVVC)模式。在MVVM模式中，Controller被ViewModel替代了。这两者主要的区别在于View和Controller或ViewModel之间的依赖(数据流动)方向。

我将使用TypeScript和Angular编写一个web应用来支撑我的观点以及解释这两个设计模式。TypeScript是添加了类型定义的JavaScript的扩展。这个应用将模仿在MacOS/iOS上流行的Notes应用。
Angular使用MVVM模式，让我们看看MVC模式和MVVM模式的不同点吧。

### 用Angular CLI搭建你的应用

在开始之前你需要先安装Angular CLI。首先确认你的电脑环境安装了Node和`npm`.如果你没有安装，请访问[node.js.org](https://nodejs.org/en/)然后跟着说明下载并安装Node，安装好后，在你的电脑中打开终端并运行下面的`npm`命令来安装Angular CLI。(tips: 这篇文章应该是写在Angular7的时候，所有所有的依赖都是Angular7的版本，现在已经到Angular9了，你可以直接安装最新的版本来写这个demo，而不一定是Angular7的版本。)

```js
npm install -g @angular/cli/@7.2.1
```

根据你的系统设置，你可能需要使用`sudo`命令来作为系统管理员运行这一命令。这将在你的系统中全局安装`ng`命令。`ng`用于创建、操作、测试和打包Angular应用。你可以在你选择的文件夹目录下运行`ng new`来创建新的Angular应用。

```js
ng new AngularNotes
```

这将启动一个向导，该向导将引导你解决有关新应用的几个问题，然后会创建一些文件目录和一些基础代码。第一个问题是询问是否需要创建路由模块。路由可以通过改变浏览器的路径让你导航到应用的不同组件。在这个问题中你需要回答yes。第二个问题是选择你想要使用的CSS预处理语言。因为我只需要编写一些非常简单的CSS样式，所以选用CSS就足够了。当你完成这些问题后，就会开始下载并安装所有必要的依赖。

你可以使用Material Design和它的组件让应用更好看。它们可以通过在应用目录下运行`npm`命令来安装。刚刚运行的`ng new`命令应该已经创建好了`AngularNotes`目录。在这个目录下运行下面的命令：

```js
npm install --save @angular/material@7.2.1 @angular/cdk@7.2.1 @angular/animations@7.2.0 @angular/flex-layout@7.0.0-beta.23
```

`src`目录下是应用的核心代码。`src/index.html`文件是浏览器的主入口。用你喜欢的ide打开这个文件并黏贴下面的代码在`<head>`标签内。这是用来加载Material Icons所需的字体。


```css
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```


`src/style.css`下的样式是全局样式。黏贴下面的代码到这个文件中：

```css
@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";

body {
  margin: 0;
  font-family: sans-serif;
}

h1, h2 {
  text-align: center;
}
```

接下来打开`src/app.app.module.ts`,这个文件包含了所有你想全局声明的模块的引入。用下面的代码替代这个文件的内容：

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatToolbarModule,
         MatMenuModule,
         MatIconModule,
         MatInputModule,
         MatFormFieldModule,
         MatButtonModule,
         MatListModule,
         MatDividerModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

这时我可以向你展示如何在`src/app/app.component.html`创建这个应用的布局。但这让我陷入了对应用程序体系结构的讨论，但现在我想先引导你思考如何实现model。我将在下一节讨论View视图以及它和ViewModel的关系。

### Model(模型)
在应用中model包含了业务端。对于简单的CRUD(创建，读取，更新以及删除)应用，model通常是一个简单的数据模型。对于更复杂的应用，model自然也变得更复杂。在我们的这个应用中，model是一个关于文字笔记的数组。每一个笔记都包含了**id**,**title**和**text**。在Angular中，model就是所谓的`service`。下面的ng命令可以创建一个新的service。

```js
ng generate service Notes 
```

这会创建两个文件:`src/app/notes.service.ts`和`src/app/notes.service.spec.ts`。在这个教程中你可以像忽略其他以`spec.ts`结尾的文件一样忽略第二个文件。这些文件是用来单元测试的。当你想发布一个应用到生产环境中，你可以用这些文件来编写测试。用下面的代码替换`src/app/notes.service.ts`中的内容：

```js

ng generate service Notes
This will create two new files, src/app/notes.service.ts and src/app/notes.service.spec.ts. You can ignore the second of these files in this tutorial, just as the other .spec.ts files. These files are used for unit testing the code. In an application that you want to release for production, you would write your tests there. Open src/app/notes.service.ts and replace its contents with the following code.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';

export class NoteInfo {
  id: number;
  title: string;
}

export class Note {
  id: number;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[];
  private nextId = 0;
  private notesSubject = new BehaviorSubject<NoteInfo[]>([]);

  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    for (const note of this.notes) {
      if (note.id >= this.nextId) this.nextId = note.id+1;
    }
    this.update();
  }

  subscribe(observer: Observer<NoteInfo[]>) {
    this.notesSubject.subscribe(observer);
  }

  addNote(title: string, text: string): Note {
    const note = {id: this.nextId++, title, text};
    this.notes.push(note);
    this.update();
    return note;
  }

  getNote(id: number): Note {
    const index = this.findIndex(id);
    return this.notes[index];
  }

  updateNote(id: number, title: string, text: string) {
    const index = this.findIndex(id);
    this.notes[index] = {id, title, text};
    this.update();
  }

  deleteNote(id: number) {
    const index = this.findIndex(id);
    this.notes.splice(index, 1);
    this.update();
  }

  private update() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesSubject.next(this.notes.map(
      note => ({id: note.id, title: note.title})
    ));
  }

  private findIndex(id: number): number {
    for (let i=0; i<this.notes.length; i++) {
      if (this.notes[i].id === id) return i;
    }
    throw new Error(`Note with id ${id} was not found!`);
  }
}
```

在文件顶部附近你可以看到两个类的定义:`NoteInfo`和`Note`, `Note`类包含了一篇笔记的所有信息，而`NoteInfo`类只包含了`id`和`title`.这是因为`NoteInfo`类更加简洁明了和可以用在列表中展示所有的笔记标题。`Note`和`NoteInfo`类都是只包含了简单数据而没有业务逻辑的类，业务逻辑包含在了`NoteService`类中，这个类在这个应用中扮演了Model的角色，它包含了一系列的属性。`notes`属性是一个元素为Note的数组。这个数据充当这个模型的真实的数据来源。`addNote`,`getNode`,`updateNote`和`deleteNote`方法定义了这个模型的CRUD操作。它们直接操作notes数组：创建，读取，更新，删除元素。`nextId`属性作为笔记被引用的唯一id。


你也许注意到了，当`notes`数组被修改的时候，私有方法`update`就会被调用。这个方法做了两件事：第一，它将notes保存在localStorage中，只要浏览器中的localStorage不被删除，该数据就会一直存在。这允许用户在关闭并再次打开应用时仍然可以读取他们的笔记。在实际的应用中，CRUD操作将访问其他服务器上的REST API，而不是在本地保存数据。

第二件事是`update`方法会发送一个新值到`notesSubject`属性中。`notesSubject`是来自Rxjs的`BehaviorSubject`类型，其中包含`NoteInfo`对象的数组。`BehaviorSubject`作为一个可观察的对象，任何观察者都可以订阅它。通过`subscribe`方法可以订阅`NotesService`.每次调用`update`时，都会通知已订阅的任何观察者。

从模型的实现中获得的主要好处是模型是一个独立的service并且和View或Controller没有任何的关联。这在MVC或者MVVM模式中都非常重要。模型必须对其他组件没有任何的依赖。

### View(视图)

接下来吗，我希望你的注意力转移到View中来。在Angular应用中，View即是`.html`模板和`.css`样式。我已经在`src/app/app.component.html`中提及过这些模板中的其中一个，打开这个文件并黏贴下面的代码：

```html
<mat-toolbar color="primary" class="expanded-toolbar">
    <span>
      <button mat-button routerLink="/">{{title}}</button>
      <button mat-button routerLink="/"><mat-icon>home</mat-icon></button>
    </span>
    <button mat-button routerLink="/notes"><mat-icon>note</mat-icon></button>
</mat-toolbar>
<router-outlet></router-outlet>
```

不如加入一些样式进去？打开`src/app/app/component.css`并添加下面的样式：

```css
.expanded-toolbar {
  justify-content: space-between;
  align-items: center;
}
```

`app.component`包含了整体的布局，但没有任何有意义的内容，你必须加入一些组件来渲染你想要的内容。再次使用`ng generate`:

```js
ng generate component Home
ng generate component Notes
```

这会生成两个组件，每个组件由`.html`,`.css`,`.ts`三个文件组成。现在不需要关心`.ts`文件。我将在下一节讲解它。(记住这里也会生成我在整个教程中会完全忽略的`.spect.ts`文件)。

打开`src/app/home/home.component.html`并用下面的代码覆盖：

```html
<h1>Angular Notes</h1>
<h2>A simple app showcasing the MVVM pattern.</h2>
```

接下来，用下面的代码替换`src/app/notes/notes.component.html`中的内容。

```html
<h1>Angular Notes</h1>
<h2>A simple app showcasing the MVVM pattern.</h2>
Next, open src/app/notes/notes.component.html and replace the content with the code below.

<div fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center" class="notes">
  <mat-list fxFlex="100%" fxFlex.gt-sm="20%">
    <mat-list-item *ngFor='let note of notes'>
      <a>
        {{note.title}}
      </a>
    </mat-list-item>
  </mat-list>
  <mat-divider fxShow="false" fxShow.gt-sm [vertical]="true"></mat-divider>
  <mat-divider fxShow="true" fxShow.gt-sm="false" [vertical]="false"></mat-divider>
  <div fxFlex="100%" fxFlex.gt-sm="70%" *ngIf="!editNote" class="note-container">
    <h3>{{currentNote.title}}</h3>
    <p>
      {{currentNote.text}}
    </p>
    <div fxLayout="row" fxLayoutAlign="space-between center" >
      <button mat-raised-button color="primary">Edit</button>
      <button mat-raised-button color="warn">Delete</button>
      <button mat-raised-button color="primary">New Note</button>
    </div>
  </div>
  <div fxFlex="100%" fxFlex.gt-sm="70%" *ngIf="editNote" class="form-container">
    <form [formGroup]="editNoteForm">
      <mat-form-field class="full-width">
        <input matInput placeholder="Title" formControlName="title">
      </mat-form-field>

      <mat-form-field class="full-width">
        <textarea matInput placeholder="Note text" formControlName="text"></textarea>
      </mat-form-field>
      <button mat-raised-button color="primary">Update</button>
    </form>
  </div>
</div>
```

与之匹配的`src/app/notes/notes.component.css`改成下面这样:

```css
.notes {
  padding: 1rem;
}

.notes a {
  cursor: pointer;
}

.form-container, .note-container {
  padding-left: 2rem;
  padding-right: 2rem;
}

.full-width {
  width: 80%;
  display: block;
}
```

目前为止，一切都还好！

现在看一下代表应用主页面的`src/app/notes/notes.component.html`文件，你会看到类似于`{{note.title}}`的似乎可以填充数据的占位符，但是到目前为止，这个视图貌似没有引用应用中的任何代码。

如果你遵循MVC模式，视图将会定义可以插入值的插槽，它也会注册当按钮点击时触发的构造函数。就这个方面而言，视图对于controller是完全无感的。controller会提供插值和注册回调函数，只有controller可以控制View层和Model层并连接这两者。

正如你接下来所看到，Angular采用了不同的实现，就是MVVM模式。在这个模式中Controller被ViewModel替代了。这会是下一节的内容。

### ViewModel

在Angular中ViewModel就是组件的`.ts`文件。打开`src/app/notes/notes.component`并用下面的代码覆盖。

```js
he topic of the next section.

The ViewModel
The ViewModel lives in the .ts files of the components. Open src/app/notes/notes.component.ts and fill it with the code below.

import { Component, OnInit } from '@angular/core';
import { Note, NoteInfo, NotesService } from '../notes.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes = new BehaviorSubject<NoteInfo[]>([]);
  currentNote: Note = {id:-1, title: '', text:''};
  createNote = false;
  editNote = false;
  editNoteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private notesModel: NotesService) { }

  ngOnInit() {
    this.notesModel.subscribe(this.notes);
    this.editNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  onSelectNote(id: number) {
    this.currentNote = this.notesModel.getNote(id);
  }

  noteSelected(): boolean {
    return this.currentNote.id >= 0;
  }

  onNewNote() {
    this.editNoteForm.reset();
    this.createNote = true;
    this.editNote = true;
  }

  onEditNote() {
    if (this.currentNote.id < 0) return;
    this.editNoteForm.get('title').setValue(this.currentNote.title);
    this.editNoteForm.get('text').setValue(this.currentNote.text);
    this.createNote = false;
    this.editNote = true;
  }

  onDeleteNote() {
    if (this.currentNote.id < 0) return;
    this.notesModel.deleteNote(this.currentNote.id);
    this.currentNote = {id:-1, title: '', text:''};
    this.editNote = false;
  }

  updateNote() {
    if (!this.editNoteForm.valid) return;
    const title = this.editNoteForm.get('title').value;
    const text = this.editNoteForm.get('text').value;
    if (this.createNote) {
      this.currentNote = this.notesModel.addNote(title, text);
    } else {
      const id = this.currentNote.id;
      this.notesModel.updateNote(id, title, text);
      this.currentNote = {id, title, text};
    }
    this.editNote = false;
  }
}
```

在这个类的`@Component`装饰器中，你可以看到`.html`和`.css`的引用，另一方面,在类的其他部分中,均未引用View层。相反，包含在`NotesComponent`类中的ViewModel提供了可由View层访问的属性和方法。这意味着，与MVC模式相比，依赖性是相反的。ViewModel不了解View,但提供了可由View使用的API。如果看回`src/app/notes/ntes.component.html`你会发现模板插值，比如{{cuttentNote.text}}就是读取的`NoteComponent`类的属性。

完成你的应用的最后一步是设置路由，打开`src/app/app-routing.module.ts`并用下面的代码覆盖。

```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

这设置了`HomeComponent`为默认路由以及`NotesComponent`为`notes`路由。

> tips：接下来的部分是有关用户验证的，故省略。有兴趣的可以直接去看[原文](https://alligator.io/angular/angular-mvc-primer/)


### 完成View层

在了解了依赖的方向之后，你可以更新你的View层以使用ViewModel的，再次打开`src/app/notes/notes.component.html`并用下面的代码覆盖

```html
<div fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center" class="notes">
  <mat-list fxFlex="100%" fxFlex.gt-sm="20%">
    <mat-list-item *ngFor='let note of notes | async'>
      <a (click)="onSelectNote(note.id)">
        {{note.title}}
      </a>
    </mat-list-item>
  </mat-list>
  <mat-divider fxShow="false" fxShow.gt-sm [vertical]="true"></mat-divider>
  <mat-divider fxShow="true" fxShow.gt-sm="false" [vertical]="false"></mat-divider>
  <div fxFlex="100%" fxFlex.gt-sm="70%" *ngIf="!editNote" class="note-container">
    <h3>{{currentNote.title}}</h3>
    <p>
      {{currentNote.text}}
    </p>
    <div fxLayout="row" fxLayoutAlign="space-between center" >
      <button mat-raised-button color="primary" (click)="onEditNote()" *ngIf="noteSelected()">Edit</button>
      <button mat-raised-button color="warn" (click)="onDeleteNote()" *ngIf="noteSelected()">Delete</button>
      <button mat-raised-button color="primary" (click)="onNewNote()">New Note</button>
    </div>
  </div>
  <div fxFlex="100%" fxFlex.gt-sm="70%" *ngIf="editNote" class="form-container">
    <form [formGroup]="editNoteForm" (ngSubmit)="updateNote()">
      <mat-form-field class="full-width">
        <input matInput placeholder="Title" formControlName="title">
      </mat-form-field>

      <mat-form-field class="full-width">
        <textarea matInput placeholder="Note text" formControlName="text"></textarea>
      </mat-form-field>
      <button mat-raised-button color="primary">Update</button>
    </form>
  </div>
</div>
```

你可以看到`(click)`句柄直接使用的是`NotesComponent`类的方法。这意味着View层需要知道ViewModel层和它的方法。反转他们的依赖关系的原因是可以减少模板代码的数量。View层和ViewModel之间是数据流动是双向绑定的。所有View层和ViewModel层的数据永远是同步的。

> 结尾：原文下面还有关于用户认证的教程，但这篇文章主要是关于Angular的MVC和MVVM模式的，所以没有继续往下翻译了(其实是自己注册Okta账号失败了。。。)。有兴趣的可以自己去看原文。原文是没有源码的，我一步步照着教程写了[demo](https://yan7.github.io/Angular-MVVM/)，需要源码的可以[点击这里](https://github.com/YAN7/Angular-MVVM).




























