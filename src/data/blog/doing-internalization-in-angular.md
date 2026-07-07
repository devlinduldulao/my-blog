---
author: devlinduldulao
pubDatetime: 2023-08-01T00:00:00Z
title: Doing Internalization in Angular
slug: doing-internalization-in-angular
featured: false
draft: false
tags:
  - angular
description: A step-by-step guide to internationalization (i18n) in Angular - installing @angular/localize, marking content for translation, extracting messages, and building per-locale bundles.
---

## Introduction

If your application needs to serve users in more than one language, you need internationalization, or i18n: the practice of designing software so it can be adapted to different languages and regions without engineering changes. In this post, we will go through how to do it in Angular.

Angular ships with good i18n support out of the box, with tools for marking, extracting, and serving translations for different locales.

Here are the steps to internationalize your Angular application:

## Step 1: Install Angular's i18n Library

Firstly, you need to add the i18n library to your Angular project. Navigate to the root directory of your Angular project via the command line and run the following command:

```bash
ng add @angular/localize
```

This command will install the necessary packages required for internalization.

## Step 2: Mark Content for translations

Next, you will need to mark the content in your application that needs to be translated. Angular provides a special i18n attribute for this purpose. Here is an example of marking a simple greeting message for translation:

```html
<h1 i18n>Hello, world!</h1>
```

You can also add descriptions and custom ids to your translations to provide more context:

```html
<h1 i18n="site main greeting|An introduction header for the site">
  Hello, world!
</h1>
```

## Step 3: Extract i18n messages

Once you've marked all the content for translation, you'll need to extract it into a translation source file. Angular CLI provides a command to perform this operation:

```bash
ng xi18n --output-path locale
```

This command will generate a messages.xlf file in a new locale folder. This file contains all the text in your application that has been marked for translation.

## Step 4: Translate the text

Now, it's time to translate the extracted messages. Open the messages.xlf file and add a <target> element under each <source> element with the translated text. Here's an example for translating English text to Spanish:

```html
<trans-unit id="site main greeting" datatype="html">
<source>Hello, world!</source>
<target>¡Hola, mundo!</target>
</trans-unit>
```

For multiple languages, you should duplicate the messages.xlf file and rename each one to include the locale identifier (e.g., messages.es.xlf for Spanish).

## Step 5: Configure Angular to use translations

Once your translations are ready, you need to instruct Angular to use them. This can be achieved by adjusting the Angular compiler's configuration.

You can serve your application in a specific locale by using the --configuration option followed by the locale identifier:

```bash
ng serve --configuration=es
```

For production builds, you need to add configurations for each locale in the "production" section of your angular.json file:

```json
{
  "configurations": {
    "es": {
      "aot": true,
      "outputPath": "dist/my-project/es/",
      "i18nFile": "src/locale/messages.es.xlf",
      "i18nFormat": "xlf",
      "i18nLocale": "es",
      "i18nMissingTranslation": "error"
    }
  }
}
```

Then, you can build your app using:

```bash
ng build --configuration=production,es
```

## Step 6: Serve your translated app

With your application built for the desired locale, you can now serve it to your users. Remember that you have separate builds for different languages, so you must serve the right one based on the user's locale.

And that's it! By following these steps, you can successfully internationalize your Angular application. It's a modest amount of setup work for a real payoff: users get content in their own language, and you get a much broader potential audience. Happy coding!
