---
author: devlinduldulao
pubDatetime: 2023-09-01T00:00:00Z
title: Understanding Closure in JavaScript and Its Importance
slug: understanding-closure-in-javascript-and-its-importance
featured: false
draft: false
tags:
  - javascript
  - typescript
description: What closures are in JavaScript, how they work under the hood with scope and lexical scope, and why they matter for data privacy, function factories, and callbacks.
---

## Introduction

Closures are one of the most important features of JavaScript, and one of the most puzzling for beginners. Once you get a grasp of them, you'll see them everywhere: in event handlers, in callbacks, in module patterns. Let's work through what they are and why they matter.

## What is a closure?

In simple terms, a closure is a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In JavaScript, a closure gives you access to an outer function’s scope from an inner function.

To understand closures, we need two fundamental concepts in JavaScript: scope and lexical scope.

- Scope: It refers to the accessibility or visibility of variables, functions, and objects in some particular part of your code during runtime. In other words, it defines the portion of the code where a variable or a function can be accessed.
- Lexical Scope: It means that in a nested group of functions, the inner functions have access to the variables and other resources of their parent scope. This concept is central to the concept of closures.

## How does a closure work?

Let's see this in action with a basic example:

```javascript
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log("outerVariable:", outerVariable);
    console.log("innerVariable:", innerVariable);
  };
}
const newFunction = outerFunction("outside");
newFunction("inside"); // Logs: outerVariable: outside, innerVariable: inside
```

In this example, innerFunction has access to variables in its own scope (innerVariable), the outer function's scope (outerVariable), and the global scope. Even after outerFunction has finished execution, newFunction still has access to outerVariable. This is the core of what a closure is.

## Why are closures important?

1. Data privacy: Closures are commonly used to give objects data privacy. Data privacy is an essential aspect of coding where you can shield certain data from the rest of the program.

2. Function factories: A closure can be used to create multiple functions using the same function body but holding different state information. This is fundamental in creating functions in a loop.

3. event handlers and callbacks: Closures are widely used in event handlers and callback functions where you might want a function to have access to variables set at the time of creation of the function.

4. Function currying: Function currying in JavaScript is a technique of evaluating a function with multiple arguments, into a sequence of functions with single argument. In essence, when a function, instead of taking all arguments at one time, takes the first one and return a new function that takes the second one and returns a new function which takes the third one, and so forth, until all arguments have been fulfilled.

## Closures in practice

Here's a practical example of how closures can be used to create private variables:

```javascript
function Counter() {
  let count = 0;

  this.increaseCount = function () {
    count++;
    console.log(count);
  };
}

const counter = new Counter();
counter.increaseCount(); // Logs: 1
counter.increaseCount(); // Logs: 2
```

In this example, count is private - it can't be accessed directly from outside the Counter function or overridden. We can only increment it using the increaseCount method. This is achieved using a closure, which allows the increaseCount function to access count from its parent scope.

## Conclusion

Closures might seem tricky at first, but they give JavaScript much of its flexibility. They let functions maintain state and keep data private, which you'll use constantly once you recognize the pattern.

Understanding closures requires a solid understanding of scopes and how functions are executed in JavaScript. The more you code, the more natural they'll feel. Happy coding!
