---
author: devlinduldulao
pubDatetime: 2023-08-01T00:00:00Z
title: Essential JavaScript Design Patterns - Building Blocks of Web Applications
slug: essential-javascript-design-patterns-building-blocks-of-web-applications
featured: false
draft: false
tags:
  - javascript
  - typescript
description: JavaScript, the lingua franca of the web, has long shed its reputation as a rudimentary scripting language. Today, it's ubiquitous across web, mobile, and server-side development, powering some of th…
---

## Introduction

JavaScript, the lingua franca of the web, has long shed its reputation as a rudimentary scripting language. Today, it's ubiquitous across web, mobile, and server-side development, powering some of the most complex applications. One of the critical aspects of JavaScript development is the implementation of design patterns, which are reusable solutions to common software design problems. Let's explore some of these essential design patterns that can help you craft efficient and maintainable JavaScript applications.

### 1. Module pattern

One of the most commonly used design patterns in JavaScript is the Module pattern. It provides a way of encapsulating private variables and functions, allowing developers to create public methods that interact with them. This pattern is useful for avoiding global scope pollution and maintaining a clean, well-structured codebase.

```javascript
const myModule = (() => {
  let privateVar = "Private";
  const publicVar = "Public";
  function privateFunction() {
    console.log("Executed from the scope of the private function.");
  }

  return {
    publicFunction: () => {
      privateFunction();
      console.log("Accessed from the public method.");
    },
    publicVar: publicVar,
  };
})();

myModule.publicFunction(); // Access public method and variable.
```

### 2. Revealing module pattern

The Revealing Module pattern is a spin-off of the Module pattern, providing a clearer syntax and a more consistent and readable structure. The main idea is to return an object literal at the end of a module that reveals private functions and variables that should be accessible from outside the module.

```javascript
const myRevealingModule = (() => {
  let privateVar = "Private";
  const publicVar = "Public";
  function privateFunction() {
    console.log(privateVar);
  }

  function publicFunction() {
    privateFunction();
  }

  return {
    start: publicFunction,
    fav: publicVar,
  };
})();

myRevealingModule.start(); // Executes private function via public method.
```

### 3. Singleton pattern

The Singleton pattern restricts a class from instantiating multiple objects. This pattern is often used where a single shared resource, like a database connection or a logging service, is required across the application.

```javascript
let Singleton = (() => {
  let instance;
  function createInstance() {
    const object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // returns true, both instances are the same.
```

### 4. Observer pattern

The Observer pattern offers a subscription model where objects (known as observers) can subscribe to an event and get notified when this event occurs. This pattern is widely used in modern web development, particularly in event handling and in libraries and frameworks.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observerToRemove) {
    this.observers = this.observers.filter(
      observer => observer !== observerToRemove
    );
  }

  fire() {
    this.observers.forEach(observer => {
      observer.call();
    });
  }
}

const subject = new Subject();

function observer1() {
  console.log("Observer 1 Firing!");
}

function observer2() {
  console.log("Observer 2 Firing!");
}

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.fire(); // Logs "Observer 1 Firing!" and "Observer 2 Firing!"
```

### 5. Factory pattern

The Factory pattern is used to create objects without exposing the object creation logic to the client and refer to the newly created object using a common interface. It's beneficial when the object setup is complex or when we want to keep track of the number of objects created.

```javascript
class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.color = options.color || "white";
  }
}
class CarFactory {
  createCar(options) {
    return new Car(options);
  }
}

const carFactory = new CarFactory();
const car = carFactory.createCar({ doors: 2, color: "red" });
// Creates a Car with 2 doors and red color.
```

These are just a few examples of the JavaScript design patterns you'll encounter. Others include the Prototype, Decorator, and Command patterns, among others. These patterns don't represent ready-to-use code but serve as templates that guide you towards cleaner and more efficient JavaScript code. They may seem daunting at first, but they can become second nature and prove indispensable in your coding toolkit with practice.
