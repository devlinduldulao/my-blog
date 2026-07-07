---
author: devlinduldulao
pubDatetime: 2024-01-01T00:00:00Z
title: How HTML, CSS, and JavaScript Journey Through the Network and Get Rendered in the Browser
slug: how-html-css-and-javascript-journey-through-the-network-and-get-rendered-in-the-browser
featured: false
draft: false
tags:
  - javascript
  - web-development
description: What actually happens between typing a URL and seeing a page. How HTML, CSS, and JavaScript travel over the network and get parsed, laid out, and painted by the browser.
---

## Introduction

Every website you visit is built on HTML, CSS, and JavaScript. Most of us write these files daily without thinking much about what happens between saving them on a server and seeing a rendered page on screen. In this blog post, we'll walk through that process, from network transmission to the final rendering in the browser.

## Transmission Across the Network

1. **HTML, CSS, and JavaScript Files:**  
   These are the core elements of any website. HTML (HyperText Markup Language) provides the basic structure, CSS (Cascading Style Sheets) is responsible for layout and style, and JavaScript enables interactive features. When a user requests a web page, these files are sent across the network from the web server to the user's browser.

2. **Data Transfer:**  
   The transfer process commences once a user types a url into the browser's address bar. The browser sends a request to the server that hosts the website. HTTP (HyperText Transfer Protocol) or its secure version, HTTPS, usually facilitates this communication. The server responds by sending the requested files back to the browser. These files are sent as a series of packets, which the browser reassembles.

## Rendering in the Browser

1. **Parsing HTML:**  
   When the browser receives the HTML file, it begins parsing it into a DOM (Document Object Model) tree. The DOM is an in-memory representation of the web page structure. Each element, including tags, text, and comments, becomes a node in the tree. It's important to note that the parsing process can be blocked when the browser encounters a script tag that points to an external JavaScript file, as the file must be downloaded and executed before parsing can continue.

2. **Fetching and Parsing CSS and JavaScript:**  
   While HTML parsing is underway, the browser also fetches CSS and JavaScript files. CSS is parsed into a CSSOM (CSS Object Model) tree, similar to the DOM. Conversely, JavaScript is executed immediately once it's fetched, which can modify the HTML DOM. As JavaScript execution can change the structure and appearance of the web page, it's often recommended to place scripts just before the closing body tag to prevent unnecessary rendering block.

3. **Render Tree Construction:**  
   The browser constructs the render tree once the DOM and CSSOM trees are ready. The render tree visually represents the web page, incorporating both the DOM's structure and the CSSOM's style information. It omits non-visual elements like the head, script, and meta tags.

4. **Layout and Painting:**  
   After the render tree construction, the browser calculates the layout, determining each element's exact position and size on the screen. The painting process begins once the layout is ready, which involves filling in pixels. This stage includes rendering text, colors, images, borders, and more. The browser does this in layers and can optimize the process by only repainting parts of the page that need changes.

5. **Compositing:**  
   The final step is compositing, where the browser draws the layers onto the screen in the correct order to create the final webpage.

## User Interaction

After the rendering process, users can interact with the page. User interactions, like clicking a button or scrolling the page, can trigger JavaScript code execution. This code may change the web page's content, leading to the browser's re-rendering process to display the new content.

# Conclusion

The browser does a remarkable amount of work to turn three text files into an interactive page: parsing, script execution, layout, painting, and compositing. Knowing where each step happens helps you understand why a render-blocking script slows down first paint, or why changing an element's size is more expensive than changing its color. That knowledge translates directly into faster-loading, smoother-running websites.
