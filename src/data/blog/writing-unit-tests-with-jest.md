---
author: devlinduldulao
pubDatetime: 2023-05-01T00:00:00Z
title: Writing Unit Tests with Jest
slug: writing-unit-tests-with-jest
featured: false
draft: false
tags:
  - javascript
description: In the realm of software development, unit tests are indispensable tools that enable developers to verify the correctness of individual components within a system. Among a multitude of testing framew…
---

## Introduction

In the realm of software development, unit tests are indispensable tools that enable developers to verify the correctness of individual components within a system. Among a multitude of testing frameworks, Jest has garnered much popularity for its simplicity and comprehensive functionality. Developed by Facebook, Jest is a delightful JavaScript testing framework focusing on simplicity.

In this blog post, we'll delve into how to write robust unit tests using Jest.

## 1. Setting up Jest

Before we can start writing tests, we need to set up Jest. Jest is a Node-based runner, meaning it runs tests in a Node environment rather than a real browser. To install Jest, you will need to have Node.js installed on your machine. Once you have Node.js installed, navigate to your project directory and run:

```bash
npm install --save-dev jest
```

This installs Jest as a devDependency, which means it will only be used in a development environment.

## 2. Writing your first Jest test

The most basic test in Jest is an equality check, which is performed with the expect function. A basic test might look something like this:

```javascript
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
```

In this example, expect(1 + 2).toBe(3); is the test assertion, and the string 'adds 1 + 2 to equal 3' is the test name.

## 3. Using matchers

Jest comes with an extensive library of "matchers" that let you validate different things. In the example above, we used toBe, which checks exact equality. Here are a few more examples:

```txt
toBe: checks exact equality
toEqual: checks deep equality
not.toBe: checks non-equality
toBeTruthy: checks if something is truthy
toBeFalsy: checks if something is falsy
```

```javascript
test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

## 4. Testing asynchronous code

Jest provides several ways to handle testing asynchronous code. One of the most common ways is to use async/await:

```javascript
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});
```

## 5. Organizing tests

To keep your test suite organized, Jest provides the describe function to group-related tests:

```javascript
describe("my beverage", () => {
  test("is delicious", () => {
    expect(myBeverage.delicious).toBeTruthy();
  });
  test("is not sour", () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```

## 6. Setup and teardown

In some cases, we need to perform setup steps before tests run or cleanup steps afterwards. Jest provides several helper functions to handle this:

```txt
beforeEach and afterEach: run before and after each test in a describe block
beforeAll and afterAll: run before and after all tests
```

```javascript
describe("connecting to the database", () => {
  beforeEach(() => {
    return initializeDatabase();
  });
  afterEach(() => {
    return clearDatabase();
  });

  test("query data", () => {
    const data = queryDatabase("SELECT * FROM table");
    expect(data).toHaveProperty("length");
  });
});
```

## 7. Mocking

Jest also provides a powerful mocking system that allows you to mock everything from simple functions to entire modules. This is an essential part of unit testing, as it allows you to isolate the code you're testing.

```javascript
jest.mock("../request");

test("calls request with the right args and returns data", () => {
  // Set up our mock functions
  const request = require("../request");
  const fetchData = require("../fetchData");

  // When request.get is called with '/data', it will return 'peanut butter'
  request.get.mockResolvedValue("peanut butter");

  // Now we can run our tests
  return fetchData().then(data => expect(data).toBe("peanut butter"));
});
```

Jest's flexible nature and out-of-the-box capabilities make it a preferred choice for JavaScript developers. With Jest, the daunting task of writing tests becomes much more manageable and efficient, enabling you to deliver reliable, high-quality code. As with any tool, mastering Jest requires practice and hands-on experience, so don't be discouraged if it feels overwhelming initially. Happy testing!
