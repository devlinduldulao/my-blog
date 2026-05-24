---
author: devlinduldulao
pubDatetime: 2023-10-01T00:00:00Z
title: Symbol Keyword in JavaScript
slug: symbol-keyword-in-javascript
featured: false
draft: false
tags:
  - javascript
  - web-development
description: JavaScript, as a programming language, continues to evolve over time with various updates, introducing features aimed to tackle the challenges that developers often face. One such feature is the intr…
---

## Introduction

JavaScript, as a programming language, continues to evolve over time with various updates, introducing features aimed to tackle the challenges that developers often face. One such feature is the introduction of the Symbol keyword, a new primitive type that was added in ECMAScript 6 (ES6) in 2015. Although this addition can be seen as a simple effort towards improving the language's robustness, it introduces a level of complexity that might be hard to comprehend without a proper breakdown. So let's dive deep into the world of Symbols.

## What is a Symbol?

In the simplest of terms, a Symbol is a unique and immutable data type introduced in JavaScript with the ES6 update. Symbols are created by invoking the Symbol() function. When you create a Symbol, you can give it a description (a string), which is solely for debugging purposes and does not affect the Symbol's uniqueness.

```javascript
let mySymbol = Symbol("mySymbol");
console.log(mySymbol); // Output: Symbol(mySymbol)
```

You cannot create a new Symbol using the new keyword; doing so will result in a TypeError. Symbols are primitive values, not objects.

## Uniqueness: The Core Characteristics of Symbols

The primary characteristic of a Symbol is its uniqueness. No two Symbols can be the same, which makes them perfect for creating unique property keys for objects. Even if we create two Symbols with the same description, they will be unique and not equal to each other.

```javascript
let symbol1 = Symbol("symbol");
let symbol2 = Symbol("symbol");
console.log(symbol1 === symbol2); // Output: false
```

## Symbols as a object properties

The unique nature of Symbols makes them a perfect fit for unique identifiers. For example, you can use a Symbol as a property key in an object to avoid conflicts with other properties.

```javascript
let symbolKey = Symbol("key");
let obj = {
  [symbolKey]: "value",
};
console.log(obj[symbolKey]); // Output: 'value'
```

Properties that use Symbol keys are not enumerable and won't show up if you try to iterate through the object's properties with methods like Object.keys() or in a for...in loop. However, you can access these properties directly if you have the Symbol they are associated with, or you can use the Object.getOwnPropertySymbols() method.

```javascript
console.log(Object.keys(obj)); // Output: []
console.log(Object.getOwnPropertySymbols(obj)); // Output: [ Symbol(key) ]
```

## SYMBOL.FOR AND SYMBOL.KEYFOR

## Symbol.for(key) and Symbol.keyFor(sym)

The Symbol.for(key) method searches for existing Symbols in a runtime-wide symbol registry with the given key and returns it if found. If not, it will create a new Symbol and store it in the registry with the given key.

```javascript
let symbol1 = Symbol.for("symbol");
let symbol2 = Symbol.for("symbol");
console.log(symbol1 === symbol2); // Output: true
```

```javascript
Symbol.keyFor(sym);
```

Above code returns a shared symbol key from the global symbol registry for the given symbol. It's a reverse operation for Symbol.for.

```javascript
let globalSymbol = Symbol.for("globalSymbol");
let key = Symbol.keyFor(globalSymbol);
console.log(key); // Output: 'globalSymbol'
```

## When and where to use symbols?

Now that we've understood what a Symbol is and its capabilities let's look at its practical uses.

### 1. Unique Object Keys

As discussed above, Symbols serve as unique keys for objects, ensuring there's no key collision, which might otherwise lead to unexpected behaviour in your code.

### 2. Constants representing concepts

You can use Symbols to represent specific concepts in your code. Because each Symbol is unique, you can be sure that they won't be accidentally overwritten.

```javascript
const COLOR_RED = Symbol("Red");
const COLOR_ORANGE = Symbol("Orange");
const COLOR_YELLOW = Symbol("Yellow");
function getFruits(color) {
  switch (color) {
    case COLOR_RED:
      return ["apple", "strawberry"];
    case COLOR_ORANGE:
      return ["orange", "tangerine"];
    case COLOR_YELLOW:
      return ["banana", "pineapple"];
    default:
      throw new Error("Unknown color");
  }
}
```

### 3. Well-known Symbols

JavaScript has some built-in, predefined Symbols known as well-known symbols, such as Symbol.iterator, Symbol.asyncIterator, Symbol.toStringTag, and so forth. These are used to adjust default language behaviours.

For example, by using Symbol.iterator, we can make any object iterable and allow it to use the for...of loop.

```javascript
let iterableObject = {
  [Symbol.iterator]() {
    let step = 0;
    let iterator = {
      next() {
        step++;
        if (step <= 5) {
          return { value: step, done: false };
        } else {
          return { value: step, done: true };
        }
      },
    };
    return iterator;
  },
};
for (let i of iterableObject) {
  console.log(i); // Output: 1 2 3 4 5
}
```

## Conclusion

In conclusion, the Symbol keyword in JavaScript provides us with a powerful way to create unique and immutable identifiers, which can be instrumental in managing object properties and tweaking default JavaScript behaviours. Learning to wield the power of Symbols can be a significant step forward in mastering JavaScript.
