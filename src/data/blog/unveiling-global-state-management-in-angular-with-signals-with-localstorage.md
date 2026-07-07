---
author: devlinduldulao
pubDatetime: 2023-06-08T00:00:00Z
title: Unveiling Global State Management in Angular using Signals with LocalStorage
slug: unveiling-global-state-management-in-angular-with-signals-with-localstorage
featured: false
draft: false
tags:
  - angular
description: How to build global state management in Angular using Signals with LocalStorage persistence, organized in a store directory with state, actions, and getters.
---

## Introduction

Are you exploring state management using Angular Signals? You're in the right place.

State management is an indispensable part of any web application, and getting it right makes the difference between a codebase that's pleasant to work in and one that fights you. In Angular, two useful tools for the job are Signals and LocalStorage. This blog post digs into both, focusing on the structure and function of a 'store' directory for managing global state.

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

Combining Angular Signals and LocalStorage gives you a simple, efficient global state management setup without pulling in an external library. The 'store' folder keeps actions, getters, and state in predictable places, which makes each feature's state easy to test and easy to reason about. For a lot of applications, this is all the state management you need.
