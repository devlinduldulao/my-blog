---
author: devlinduldulao
pubDatetime: 2023-06-08T00:00:00Z
title: Unveiling Global State Management in Angular using Signals with LocalStorage
slug: unveiling-global-state-management-in-angular-with-signals-with-localstorage
featured: false
draft: false
tags:
  - angular
description: Are you looking at how to do state management using angular signals? You came to the right place. State management is an indispensable aspect of any web application. Proper state management ensures…
---

## Introduction

Are you exploring state management using Angular Signals? You're in the right place.

State management is an indispensable aspect of any web application. Proper state management ensures a seamless user experience and robust application functionality. Two powerful tools at your disposal for this purpose in Angular are Signals and LocalStorage. This blog post will dive deeply into these utilities, focusing specifically on the structure and function of a 'store' directory, typically used in Angular applications, to manage global states.

Github repository [link : ](https://github.com/devlinduldulao/modern-angular-course-2023) This github sample repo shows how to do state management in Angular using signals with localstorage implementation.

## A brief introduction to Angular Signals

Angular Signals is a tracking system that monitors your application's state usage and optimizes rendering updates accordingly. It essentially wraps around a value and signals all the interested parts of your application whenever there's a change in that value.

Signals can track and update complex data structures, as shown below:

## LocalStorage: Persistent State Management

LocalStorage is a web storage object that allows you to store key-value pairs in a web browser. This makes it perfect for persisting non-sensitive data like user preferences or tokens across different browsing sessions.

For instance, an axios request interceptor can be used to attach a token stored in LocalStorage to every outgoing HTTP request, ensuring user-specific states are maintained:

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

## The store folder: organizing global state

The 'store' folder is typically used in Angular applications to manage global state. It usually contains the global state of the application and houses state management related entities like actions, getters, and effects for various modules in the application.

### actions.ts

The 'actions.ts' file defines actions representing how we could change our state. Actions describe what happened but don't specify how the application's state changes in response. They are payloads of information that send data from your application to your store.

```typescript
import { effect, inject, Injectable } from "@angular/core";
import { Post, Todo } from "../models";
import { HttpService } from "../services/http.service";
import { LocalStorageService } from "../utilities/local-storage.service";
import { State } from "./state";

@Injectable({
  providedIn: "root",
})
export class Actions {
  private key = "store";
  private _httpService = inject(HttpService);
  private _localStorageService = inject(LocalStorageService);
  private _stateService = inject(State);

  constructor() {
    effect(() => {
      console.log(this._stateService.store());
      this._localStorageService.setItem(this.key, this._stateService.store());
    });
  }

  // with side effect because this is with asynchronous call
  async fetchTodos() {
    this.enableLoading();
    try {
      const { data } = await this._httpService.get<Todo[]>("todos");
      this._stateService.store.update(state => {
        state.todos = data;
        return { ...state };
      });
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  async fetchPosts() {
    this.enableLoading();
    try {
      const { data } = await this._httpService.get<Post[]>("posts");
      this._stateService.store.update(state => {
        state.posts = data;
        return { ...state };
      });
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  // with no side effect because this has no asynchronous call
  removeTodoById(index: number) {
    this._stateService.store.update(state => {
      state.todos.splice(index, 1);
      return { ...state };
    });
  }

  async createPost(value: Post) {
    this.enableLoading();
    try {
      const { data } = await this._httpService.post<Post>("posts", value);
      this._stateService.store.update(state => {
        state.posts.push(data);
        return { ...state };
      });
    } catch (e: any) {
      this.setError(e.message);
    }
    this.disableLoading();
  }

  private enableLoading() {
    this._stateService.store.update(state => {
      state.loading = true;
      state.error = "";
      return { ...state };
    });
  }

  private disableLoading() {
    this._stateService.store.update(state => {
      state.loading = false;
      return { ...state };
    });
  }

  private setError(message: string) {
    this._stateService.store.update(state => {
      state.error = message;
      return { ...state };
    });
  }
}
```

### getters.ts

The 'getters.ts' file contains functions that allow you to compute the derived state based on the store state and expose it to components. It's similar to computed properties in Vue, enabling you to create functions that return some state data to components.

```typescript
import { computed, inject, Injectable } from "@angular/core";
import { State } from "./state";

@Injectable({
  providedIn: "root",
})
export class Getters {
  private _stateService = inject(State);

  totalObjects = computed(
    () =>
      this._stateService.store().todos.length +
      this._stateService.store().posts.length
  );
}
```

### state.ts

The 'state.ts' file holds the application's or module's initial state. This state is updated by the actions described in 'actions.ts' using the methods described in 'getters.ts'.

```typescript
import { inject, Injectable, signal } from "@angular/core";
import { Post, Todo } from "../models";
import { LocalStorageService } from "../utilities/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class State {
  private key = "store";
  private _localStorageService = inject(LocalStorageService);

  store = signal<StoreType>(initialStoreState);

  constructor() {
    const localStore = this._localStorageService.getItem<StoreType>(this.key);
    if (localStore) this.store.set(localStore);
  }
}

export interface StoreType {
  loading: boolean;
  error: string;
  todos: Todo[];
  posts: Post[];
}

const initialStoreState: StoreType = {
  loading: false,
  error: "",
  todos: [],
  posts: [],
};
```

### index.ts

The 'index.ts' file typically acts as a centralized public API for the store directory, exporting all the necessary actions, getters, and state properties that the components in your Angular application will use.

```typescript
export * from "./state";
export * from "./actions";
export * from "./getters";
```

## Final thoughts

In conclusion, combining Angular Signals and LocalStorage creates a robust and efficient global state management system. The 'store' folder plays a crucial role in this setup, housing all the relevant files that handle actions, mutations, getters, and the state itself. This structure helps isolate and manage the state of individual features of the application, making it easier to test and understand the state at any time. It's a testament to the flexibility and power that Angular provides to front-end developers, making it easier than ever to build complex, state-driven applications.
