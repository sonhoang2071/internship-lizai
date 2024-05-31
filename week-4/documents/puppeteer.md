# Puppeteer

# 1. Introduction

## 1.1 What is Puppeteer ?

<aside>
💡 Puppeteer is a Node.js library which provides a high-level API to control Chrome/Chromium over the [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). Puppeteer runs in [headless](https://developer.chrome.com/docs/chromium/new-headless/) mode by default, but can be configured to run in full ("headful") Chrome/Chromium.

</aside>

## 1.2 Features

Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

- Automate form submission, UI testing, keyboard input, etc.
- Create an automated testing environment using the latest JavaScript and browser features.
- Capture a [timeline trace](https://developer.chrome.com/docs/devtools/performance/reference) of your site to help diagnose performance issues.
- [Test Chrome Extensions](https://pptr.dev/guides/chrome-extensions).
- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).

## 1.3 Installation

To use Puppeteer in your project, run:

```powershell
npm i puppeteer
```

When using **puppeteer-core**, remember to change the import:

```jsx
const puppeteer = require('puppeteer');
```

## 1.4 System requirements

- Node 18+. Puppeteer follows the latest [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of Node
- TypeScript 4.7.4+ (If used with TypeScript)
- Operating systems:
    - Windows, x64 architecture
    - MacOS, x64 and arm64 architectures
    - Debian/Ubuntu Linux, with x64 architecture
        - Required system packages [https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json](https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/linux/debian/dist_package_versions.json)

## 1.5 Getting started

Puppeteer will be familiar to people using other browser testing frameworks. You [launch](https://pptr.dev/api/puppeteer.puppeteernode.launch)/[connect](https://pptr.dev/api/puppeteer.puppeteernode.connect) a [browser](https://pptr.dev/api/puppeteer.browser), [create](https://pptr.dev/api/puppeteer.browser.newpage) some [pages](https://pptr.dev/api/puppeteer.page), and then manipulate them with [Puppeteer's API](https://pptr.dev/api).

```jsx
const puppeteer = require("puppeteer");

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.youtube.com/");
    await page.setViewport({ width: 1080, height: 1024 });
    await page.screenshot({ path: "ytb.png" });
    await browser.close();
})();
```

# 2. Core concepts

## 2.1 Browser management

<aside>
💡 Usually, you start working with Puppeteer by either launching [launching](https://pptr.dev/api/puppeteer.puppeteernode.launch) or [connecting](https://pptr.dev/api/puppeteer.puppeteernode.connect) to a browser.

</aside>

### 2.1.1 **Launching a browser**

```jsx
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();

const page = await browser.newPage();

// ...
```

### 2.1.2 **Closing a browser**

To gracefully close the browser, you the [browser.close()](https://pptr.dev/api/puppeteer.browser.close) method: ****

```jsx
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();

const page = await browser.newPage();

await browser.close();
```

### 2.1.3 **Browser contexts**

If you need to isolate your automation taks, use [BrowserContexts](https://pptr.dev/api/puppeteer.browser.createbrowsercontext/). Cookies and local storage are not shared between browser contexts. Also, you can close all pages in the context by closing the context.

```jsx
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();

const context = await browser.createBrowserContext();

const page1 = await context.newPage();
const page2 = await context.newPage();

await context.close();
```

### 2.1.4 **Permissions**

```jsx
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const context = browser.defaultBrowserContext();

await context.overridePermissions('https://html5demos.com', ['geolocation']);
```

### 2.1.5 **Connecting to a running browser**

```jsx
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222/...',
});

const page = await browser.newPage();

browser.disconnect();
```

## 2.2 **Page interactions**

<aside>
💡 Puppeteer allows you interact with the pages in various ways.

</aside>

### 2.2.1 **Locators**

Locators is a new, experimental API that combines the functionalities of waiting and actions. With additional precondition checks, it enables automatic retries for failed actions, resulting in more reliable and less flaky automation scripts.

- **Waiting for an element**

```jsx
await page.locator('button').wait();
```

The following preconditions are automatically checked:

- **Waiting for a function**

```jsx
await page
  .locator(() => {
    let resolve!: (node: HTMLCanvasElement) => void;
    const promise = new Promise(res => {
      return (resolve = res);
    });
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.target instanceof HTMLCanvasElement) {
          resolve(record.target);
        }
      }
    });
    observer.observe(document);
    return promise;
  })
  .wait();
```

- **Clicking an element**

```jsx
await page.locator('button').click();
```

The following preconditions are automatically checked:

- Ensures the element is in the viewport.
- Waits for the element to become [visible](https://pptr.dev/api/puppeteer.elementhandle.isvisible/) or hidden.
- Waits for the element to become enabled.
- Waits for the element to have a stable bounding box over two consecutive animation frames.
- **Clicking an element matching a criteria**

```jsx
await page
  .locator('button')
  .filter(button => !button.disabled)
  .click();
```

- **Filling out an input**

```jsx
await page.locator('input').fill('value');
```

- **Hover over an element**

```jsx
await page.locator('div').hover();
```

- **Scroll an element**

```jsx
await page.locator('div').scroll({
  scrollLeft: 10,
  scrollTop: 20,
});
```

### 2.2.2 **Configuring locators**

Locators can be configured to tune configure the preconditions and other other options:

```jsx
await page
  .locator('button')
  .setEnsureElementIsInTheViewport(false)
  .setTimeout(0)
  .setVisibility(null)
  .setWaitForEnabled(false)
  .setWaitForStableBoundingBox(false)
  .click();
```

### 2.2.3 **Getting locator events**

Currently, locators support a single event that notifies you when the locator is about to perform the action:

```jsx
let willClick = false;
await page
  .locator('button')
  .on(LocatorEvent.Action, () => {
    willClick = true;
  })
  .click();
```

This event can be used for logging/debugging or other purposes. The event might fire multiple times if the locator retries the action.

### **2.2.4 Query Selectors**

Queries are the primary mechanism for interacting with the DOM on your site. For example, a typical workflow goes like:

```jsx
// Import puppeteer
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('YOUR_SITE');

  // Query for an element handle.
  const element = await page.waitForSelector('div > .class-name');

  // Do something with element...
  await element.click(); // Just an example.

  // Dispose of handle
  await element.dispose();

  // Close browser.
  await browser.close();
})();
```

- **P** Selectors
    
    Puppeteer uses a superset of the CSS selector syntax for querying. We call this syntax *P selectors* and it's supercharged with extra capabilities such as deep combinators and text selection.
    
- **>>>** and **>>>>** combinators
    
    The **>>>** and **>>>>** are called *deep descendent* and *deep* combinators respectively. Both combinators have the effect of going into shadow hosts with **>>>** going into every shadow host under a node and **>>>>** going into the immediate one (if the node is a shadow host; otherwise, it's a no-op).
    
- **XPath** selectors
    
    XPath selectors will use the browser's native [Document.evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate) to query for elements
    
- **Web Components**
    
    Web Components create their own tag so you can query them by the tag name:
    
    ```jsx
    const element = await page.$('my-web-component');
    
    ```
    

## 2.3 **JavaScript execution**

<aside>
💡 Puppeteer allows evaluating JavaScript functions in the context of the page driven by Puppeteer:

</aside>

```jsx
// Import puppeteer
const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('YOUR_SITE');

  // Evaluate JavaScript
  const three = await page.evaluate(() => {
    return 1 + 2;
  });

  console.log(three);

  // Close browser.
  await browser.close();
})();
```

### 2.3.1 Return types

The functions you evaluate can return values. If the returned value is of a primitive type, it gets automatically converted by Puppeteer to a primitive type in the script context like in the previous example.

If the script returns an object, Puppeteer serializes it to a JSON and reconstructs it on the script side. This process might not always yield correct results, for example, when you return a DOM node:

```jsx
const body = await page.evaluate(() => {
  return document.body;
});
console.log(body); // {}, unexpected!
```

To work with the returned objects, Puppeteer offers a way to return objects by reference:

```jsx
const body = await page.evaluateHandle(() => {
  return document.body;
});
console.log(body instanceof ElementHandle); // true
```

### 2.3.2 **Passing arguments to the evaluate function**

You can provide arguments to your function

## 2.4 **Network logging**

<aside>
💡 By default, Puppeteer listens for all network requests and responses and emits network events on the page.

</aside>

```jsx
const page = await browser.newPage();
page.on('request', request => {
  console.log(request.url());
});

page.on('response', response => {
  console.log(response.url());
});
```

# 3. Guides

## 3.1 Configuration

<aside>
💡 By default, Puppeteer downloads and uses a specific version of Chrome so its API is guaranteed to work out of the box. To use Puppeteer with a different version of Chrome or Chromium, pass in the executable's path when creating a **Browser** instance:

</aside>

```jsx
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```

You can also use Puppeteer with Firefox. See [status of cross-browser support](https://pptr.dev/faq#q-what-is-the-status-of-cross-browser-support) for more information.

All defaults in Puppeteer can be customized in two ways:

- [Configuration files](https://pptr.dev/guides/configuration#configuration-files) (**recommended**)
- [Environment variables](https://pptr.dev/guides/configuration#environment-variables)

### 3.1.1 **Configuration files**

Configuration files are the **recommended** choice for configuring Puppeteer. Puppeteer will look up the file tree for any of the following formats:

- .puppeteerrc.cjs,
- .puppeteerrc.js,
- .puppeteerrc (YAML/JSON),
- .puppeteerrc.json,
- .puppeteerrc.yaml,
- puppeteer.config.js, and
- puppeteer.config.cjs

See the [Configuration](https://pptr.dev/api/puppeteer.configuration) interface for possible options.

### 3.1.2 **Environment variables**

Along with configuration files, Puppeteer looks for certain [environment variables](https://en.wikipedia.org/wiki/Environment_variable) for customizing behavior. Environment variables will always override configuration file options when applicable.

The following options are *environment-only* options

- HTTP_PROXY, HTTPS_PROXY, NO_PROXY - defines HTTP proxy settings that are used to download and run the browser.

## 3.2 **Debugging**

<aside>
💡 Debugging with Puppeteer can be an arduous task. There is no *single* method for debugging all possible issues since Puppeteer touches many distinct components of a browser such as network requests and Web APIs. On a high note, Puppeteer provides *several* methods for debugging which hopefully does cover all possible issues.

</aside>

### 3.2.1 **Debugging methods for all situations**

<aside>
💡 These methods can be used to debug any situation. These should be used as a quick sanity check before diving into more complex methods.

</aside>

- **Turn off** [headless](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions)

Sometimes it's useful to see what the browser is displaying. Instead of launching in [headless](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) mode, launch a full version of the browser with [headless](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) set to false:

```jsx
const browser = await puppeteer.launch({headless: false});
```

- **Puppeteer "slow-mo"**

The [slowMo](https://pptr.dev/api/puppeteer.browserconnectoptions) option slows down Puppeteer operations by a specified amount of milliseconds. It's another way to help see what's going on.

```jsx
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250, // slow down by 250ms
});
```

### 3.2.2 **Debugging methods for client code**

- **Use the debugger in the browser**
    - Set [devtools](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) to true when launching Puppeteer:
    
    ```jsx
    const browser = await puppeteer.launch({devtools: true});
    ```
    
    - Add debugger inside any client code you want debugged. For example,
    
    ```jsx
    await page.evaluate(() => {
      debugger;
    });
    ```
    

### 3.2.3 **Debugging methods for server code**

- **Use the debugger in Node.js (Chrome/Chromium-only)**

Since server code intermingles with client code, this method of debugging is closely tied with the browser. For example, you can step over await page.click() in the server script and see the click happen in the browser.

Note that you won't be able to run await page.click() in DevTools console due to this [Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=833928), so if you want to try something out, you have to add it to your test file.

1. Set [headless](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) to false.
2. Add **debugger** to any server code you want debugged. For example,
    
    ```jsx
    debugger;
    await page.click('a[target=_blank]');
    
    ```
    
3. Run your server code with -inspect-brk. For example,
    
    ```bash
    node --inspect-brk path/to/script.js
    
    ```
    
4. In the opened Chrome/Chromium browser, open **chrome://inspect/#devices** and click **inspect**.
5. In the newly opened test browser, press **F8** to resume test execution.
6. Now your **debugger** statement will be hit and you can debug in the test browser.

## 3.3 **Headless mode**

<aside>
💡 By default Puppeteer launches the browser in [the Headless mode](https://developer.chrome.com/docs/chromium/new-headless/).

</aside>

```jsx
const browser = await puppeteer.launch();
// Equivalent to
const browser = await puppeteer.launch({headless: true});
```

Before v22, Puppeteer launched the [old Headless mode](https://developer.chrome.com/docs/chromium/new-headless/) by default. The old headless mode is now known as [chrome-headless-shell](https://developer.chrome.com/blog/chrome-headless-shell) and ships as a separate binary. **chrome-headless-shell** does not match the behavior of the regular Chrome completely but it is currently more performant for automation tasks where the complete Chrome feature set is not needed. If the performance is more important for your use case, switch to **chrome-headless-shell** as following:

```jsx
const browser = await puppeteer.launch({headless: 'shell'});
```

To launch a "headful" version of Chrome, set the [headless](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions) to **false** option when launching a browser:

```jsx
const browser = await puppeteer.launch({headless: false});
```

## 3.4 **Screenshots**

<aside>
💡 For capturing screenshots use [Page.screenshot()](https://pptr.dev/api/puppeteer.page.screenshot).

</aside>

```jsx
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://news.ycombinator.com', {
  waitUntil: 'networkidle2',
});
await page.screenshot({
  path: 'hn.png',
});

await browser.close();
```

By default, [ElementHandle.screenshot()](https://pptr.dev/api/puppeteer.elementhandle.screenshot) tries to scroll the element into view if it is hidden.

## 3.4 **PDF generation**

<aside>
💡 For printing PDFs use [Page.pdf()](https://pptr.dev/api/puppeteer.page.pdf).

</aside>

```jsx
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("https://www.youtube.com/");
// Saves the PDF to ytb.pdf.
await page.pdf({
  path: 'ytb.pdf',
});

await browser.close();
```

By default, the [Page.pdf()](https://pptr.dev/api/puppeteer.page.pdf) waits for fonts to be loaded.

## 3.5 **Chrome Extensions**

<aside>
💡 Puppeteer can be used for testing Chrome Extensions.

</aside>

See [https://developer.chrome.com/docs/extensions/how-to/test/end-to-end-testing](https://developer.chrome.com/docs/extensions/how-to/test/end-to-end-testing) for more details.
The following is code for getting a handle to the [background page](https://developer.chrome.com/extensions/background_pages) of an extension whose source is located in **./my-extension**:

```jsx
const puppeteer = require('puppeteer');
const path = require('path');

const pathToExtension = path.join(process.cwd(), 'my-extension');
const browser = await puppeteer.launch({
  args: [
    `--disable-extensions-except=${pathToExtension}`,
    `--load-extension=${pathToExtension}`,
  ],
});
const backgroundPageTarget = await browser.waitForTarget(
  target => target.type() === 'background_page'
);
const backgroundPage = await backgroundPageTarget.page();
// Test the background page as you would any other page.
await browser.close();
```

## 3.6 **Cookies**

<aside>
💡 Puppeteer allows modifying cookies for a page ahead of time by using [Page.setCookie()](https://pptr.dev/api/puppeteer.page.setcookie/). You can also read the cookies set for a page using [Page.cookies()](https://pptr.dev/api/puppeteer.page.cookies/).

</aside>

## 3.7 **Files**

<aside>
💡 Currently, Puppeteer does not offer a way to handle file downloads in a programmtic way. For uploading files, you need to locate a file input element and call [ElementHandle.uploadFile](https://pptr.dev/api/puppeteer.elementhandle.uploadfile/).

</aside>

```jsx
const fileElement = await page.waitForSelector('input[type=file]');
await fileElement.uploadFile(['./path-to-local-file']);
```

# 4. APIs

## 4.1 **Puppeteer Module**

### 4.1.1 **puppeteer.launch([options])**

<aside>
💡 Launches a browser instance with given arguments and options when specified.

</aside>

```jsx
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ headless: true });
```

## 4.2 **Browser Object**

### 4.2.1 browser.newPage()

<aside>
💡 Creates a new [page](https://pptr.dev/api/puppeteer.page) in the [default browser context](https://pptr.dev/api/puppeteer.browser.defaultbrowsercontext).

</aside>

```jsx
const page = await browser.newPage();
```

### 4.2.2 b**rowser.close()**

<aside>
💡 Closes this [browser](https://pptr.dev/api/puppeteer.browser) and all associated [pages](https://pptr.dev/api/puppeteer.page).

</aside>

```jsx
await browser.close();
```

### 4.2.3 b**rowser.pages()**

<aside>
💡 Gets a list of all open [pages](https://pptr.dev/api/puppeteer.page) inside this [Browser](https://pptr.dev/api/puppeteer.browser).

If there ar multiple [browser contexts](https://pptr.dev/api/puppeteer.browsercontext), this returns all [pages](https://pptr.dev/api/puppeteer.page) in all [browser contexts](https://pptr.dev/api/puppeteer.browsercontext).

</aside>

```jsx
const pages = await browser.pages();
```

### 4.2.4 b**rowser.browserContexts()**

<aside>
💡 Gets a list of open [browser contexts](https://pptr.dev/api/puppeteer.browsercontext).

</aside>

```jsx
const browserContexts = await browser.browserContexts**()**;
```

### 4.2.5 b**rowser.createBrowserContext()**

<aside>
💡 Creates a new [browser context](https://pptr.dev/api/puppeteer.browsercontext).

This won't share cookies/cache with other [browser contexts](https://pptr.dev/api/puppeteer.browsercontext).

</aside>

```jsx
const context= await browser.createBrowserContext();
```

### 4.2.6 b**rowser.disconnect()**

<aside>
💡 Disconnects Puppeteer from this [browser](https://pptr.dev/api/puppeteer.browser), but leaves the process running.

</aside>

```jsx
await browser.disconnet();
```

### 4.2.7 b**rowser.isConnected()**

<aside>
💡 Whether Puppeteer is connected to this [browser](https://pptr.dev/api/puppeteer.browser).

</aside>

```jsx
const check = browser.isConnected();
```

## 4.3 BrowserContext

### 4.3.1 b**rowserContext.newPage()**

<aside>
💡 Creates a new [page](https://pptr.dev/api/puppeteer.page) in this [browser context](https://pptr.dev/api/puppeteer.browsercontext).

</aside>

```jsx
const context = await browser.createBrowserContext();
const page = await context.newPage();
```

### 4.3.2 b**rowserContext.close()**

<aside>
💡 Closes this [browser context](https://pptr.dev/api/puppeteer.browsercontext) and all associated [pages](https://pptr.dev/api/puppeteer.page).

</aside>

```jsx
await context.close();
```

## 4.4 Page Object

### 4.4.1 page.goto(url)

<aside>
💡 Navigates the page to the given url.

</aside>

```jsx
await page.goto('https://youtube.com');
```

### 4.4.2 page.click(selector)

<aside>
💡 This method fetches an element with **selector**, scrolls it into view if needed, and then uses [Page.mouse](https://pptr.dev/api/puppeteer.page#mouse) to click in the center of the element. If there's no element matching **selector**, the method throws an error.

</aside>

```jsx
await page.click('#search-btn');
```

### 4.4.3 page.type(selector, text, [options])

<aside>
💡 Sends a **keydown**, **keypress/input**, and **keyup** event for each character in the text.

To press a special key, like **Control** or **ArrowDown**, use [Keyboard.press()](https://pptr.dev/api/puppeteer.keyboard.press).

</aside>

```jsx
await page.type('#input', 'Son Tung MTP');
```

### 4.4.4 **page.screenshot([options])**

<aside>
💡 Captures a screenshot of this [page](https://pptr.dev/api/puppeteer.page).

</aside>

```jsx
const ytb= await page.screenshot({ path: 'ytb.png' });
```

### 4.4.5 **page.evaluate(pageFunction, ...args)**

<aside>
💡 Evaluates a function in the page's context and returns the result.

If the function passed to `page.evaluate` returns a Promise, the function will wait for the promise to resolve and return its value.

</aside>

```jsx
const result = await page.evaluate(() => {
  return Promise.resolve(8 * 7);
});
console.log(result); // prints "56"
```

### 4.4.6 **page.setViewport(viewport)**

<aside>
💡 will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport before navigating to the page.

In the case of multiple pages in a single browser, each page can have its own viewport size.

</aside>

```jsx
await page.setViewport({
  width: 640,
  height: 480,
  deviceScaleFactor: 1,
});
```

### 4.4.7 **page.waitForSelector(selector, [options])**

<aside>
💡 Wait for the **selector** to appear in page. If at the moment of calling the method the **selector** already exists, the method will return immediately. If the **selector** doesn't appear after the **timeout** milliseconds of waiting, the function will throw.

</aside>

```jsx
page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
```

### 4.4.8 **page.pdf([options])**

<aside>
💡 Generates a PDF of the page with the **print** CSS media type.

</aside>

```jsx
await page.pdf({
  path: 'ytb.pdf',
});
```

### 4.4.9 p**age.hover(selector)**

<aside>
💡 This method fetches an element with **selector**, scrolls it into view if needed, and then uses [Page.mouse](https://pptr.dev/api/puppeteer.page#mouse) to hover over the center of the element. If there's no element matching **selector**, the method throws an error.

</aside>

```jsx
await page.hover("#tool-tip");
```

### 4.4.10 p**age.frames()**

<aside>
💡 Return an array of all frames attached to the page.

</aside>

```jsx
const frames = await page.frames();
```

### 4.4.11 p**age.cookies(...urls: string[])**

<aside>
💡 If no URLs are specified, this method returns cookies for the current page URL. If URLs are specified, only cookies for those URLs are returned.

</aside>

```jsx
const cookies = await page.cookies();
```

### 4.4.12 page.setCookie(...cookies: CookieParam[])

<aside>
💡 Using to set cookie

</aside>

```jsx
await page.setCookie({
    name: 'myCookie',
    value: 'myValue',
    domain: 'example.com',
    path: '/',
    expires: Date.now() / 1000 + 3600, // Cookie hết hạn sau 1 giờ
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
```

### 4.4.13 page.deleteCookie(...cookies: DeleteCookiesRequest[])

<aside>
💡 Using to delete specified cookie

</aside>

```jsx
await page.deleteCookie({ name: 'myCookie')
```

### 4.4.14 p**age.content()**

<aside>
💡 The full HTML contents of the page, including the DOCTYPE.

</aside>

```jsx
const html = await page.content();
```

### 4.4.15 page.title()

<aside>
💡 The page's title

</aside>

```jsx
const title = await page.title()
```

### 4.4.16 goBack() - goForward

<aside>
💡 This method navigate to the previous or next page in history.

</aside>

```jsx
await page.goBack();
await page.goForward();
```

### 4.4.17 page.focus(selector)

<aside>
💡 This method fetches an element with **selector** and focuses it. If there's no element matching **selector**, the method throws an error.

</aside>

```jsx
await page.focus("#cart");
```

### 4.4.18 **page.waitForRequest(urlOrPredicate, [options])**

```jsx
await page.waitForRequest(request => request.url().includes('example.com'));
```

### 4.4.19 **page.waitForResponse(urlOrPredicate, [options])**

```jsx
await page
.waitForResponse(response => response.url().includes('example.com') && response.status() === 200);
```

### 4.4.20 **page.waitForNavigation([options])**

<aside>
💡 Waits for the page to navigate to a new URL or to reload. It is useful when you run code that will indirectly cause the page to navigate.

</aside>

```jsx
await page.click('a#myLink');
await page.waitForNavigation({ waitUntil: 'load' });
```

### 4.4.21 p**age.$()**

<aside>
💡 Runs **document.querySelector** within the page. If no element matches the selector, the return value resolves to **null**.

</aside>

```jsx
const searchBtn = page.$("#search-btn");
```

### 4.4.22 p**age.$$()**

<aside>
💡 The method runs **document.querySelectorAll** within the page. If no elements match the selector, the return value resolves to **[]**.

</aside>

```jsx
const links = page.$$("a[href]");
```

### 4.4.23 p**age.$eval()**

<aside>
💡 This method runs **document.querySelector** within the page and passes the result as the first argument to the **pageFunction**.

</aside>

```jsx
const searchValue = await page.$eval('#search', e => e.value);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

### 4.4.24 p**age.$$eval()**

<aside>
💡 This method runs **Array.from(document.querySelectorAll(selector))** within the page and passes the result as the first argument to the **pageFunction**.

</aside>

```jsx
await page.$$eval('input', elements => {
  return elements.map(e => e.value);
});
```

## 4.5 **ElementHandle**

### 4.5.1 **ElementHandle.$()**

<aside>
💡 Queries the current element for an element matching the given selector.

</aside>

```jsx
const user = await header.$("#user-info");
```

### 4.5.2 **ElementHandle.$$()**

<aside>
💡 Queries the current element for all elements matching the given selector.

</aside>

```jsx
const titles= await header.$$(".header-title");
```

### 4.5.3 **ElementHandle.type()**

<aside>
💡 Focuses the element, and then sends a **keydown**, **keypress**/**input**, and **keyup** event for each character in the text.

To press a special key, like **Control** or **ArrowDown**, use [ElementHandle.press()](https://pptr.dev/api/puppeteer.elementhandle.press).

</aside>

```jsx
await elementHandle.type('Hello'); // Types instantly
await elementHandle.type('World', {delay: 100}); // Types slower, like a user
```

### 4.5.4 **ElementHandle.click()**

<aside>
💡 This method scrolls element into view if needed, and then uses [Page.mouse](https://pptr.dev/api/puppeteer.page#mouse) to click in the center of the element. If the element is detached from DOM, the method throws an error.

</aside>

```jsx
const searchBtn= await header.$("#search-btn");
await searchBtn.click();
```

### 4.5.5 E**lementHandle.boundingBox()**

<aside>
💡 This method returns the bounding box of the element (relative to the main frame), or **null** if the element is [not part of the layout](https://drafts.csswg.org/css-display-4/#box-generation) (example: display: none).

</aside>

## 4.6 Frame Object

<aside>
💡 Represents a DOM frame.

To understand frames, you can think of frames as **<iframe>** elements. Just like iframes, frames can be nested, and when JavaScript is executed in a frame, the JavaScript does not effect frames inside the ambient frame the JavaScript executes in.

</aside>

## 4.7 HTTP Request Object

<aside>
💡 Represents an HTTP request sent by a page.

</aside>

```jsx
page.on('request', request => {
  console.log('Request:', request.url());
});
```

### 4.7.1 r**equest.url()**

<aside>
💡 The URL of the request

</aside>

```jsx
const url = request.url();
```

### 4.7.2 request.method()

<aside>
💡 The method used (**GET**, **POST**, etc.)

</aside>

```jsx
const method = request.method();
```

### 4.7.3 request.postData()

<aside>
💡 The request's post body, if any.

</aside>

```jsx
const postData = request.postData();
```

### 4.7.4 **request.headers()**

<aside>
💡 An object with HTTP headers associated with the request. All header names are lower-case.

</aside>

```jsx
const headers = request.headers();
```

### 4.7.5 request.response()

<aside>
💡 A matching **HTTPResponse** object, or null if the response has not been received yet.

</aside>

```jsx
const response = await request.response();
```

### 4.7.6 **request.isNavigationRequest()**

<aside>
💡 True if the request is the driver of the current frame's navigation.

</aside>

```jsx
const isNavigation = request.isNavigationRequest();
```

### 4.7.7 **request.abort([errorCode])**

<aside>
💡 Aborts a request.

</aside>

```jsx
await request.abort('blockedbyclient');
```

## 4.8 HTTP Response Object

<aside>
💡 The HTTPResponse class represents responses which are received by the [Page](https://pptr.dev/api/puppeteer.page) class.

</aside>

```jsx
page.on('response', response => {
  console.log('Response:', response.url());
});
```

### 4.8.1 **response.url()**

<aside>
💡 The URL of the response.

</aside>

```jsx
const url = response.url();
```

### 4.8.2 **response.status()**

<aside>
💡 The status code of the response (e.g., 200 for a success).

</aside>

```jsx
const status = response.status();
```

### 4.8.3 response.statusText()

<aside>
💡 The status text of the response (e.g. usually an "OK" for a success).

</aside>

```jsx
const statusText = response.statusText();
```

### 4.8.4 response.headers()

<aside>
💡 An object with HTTP headers associated with the response. All header names are lower-case.

</aside>

```jsx
const headers = response.headers();
```

### 4.8.5 **response.ok()**

 ****

<aside>
💡 True if the response was successful (status in the range 200-299).

</aside>

```jsx
const isOk = response.ok();
```

### 4.8.6 response.text()

<aside>
💡 Promise which resolves to a text (utf8) representation of response body.

</aside>

```jsx
const text = await response.text();
```

### 4.8.7 response.json()

<aside>
💡 Promise which resolves to a JSON representation of response body.

</aside>

```jsx
const json = await response.json();
```

### 4.8.8 response.buffer()

<aside>
💡 Promise which resolves to a buffer with response body.

</aside>

```jsx
const buffer = await response.buffer();
```

### 4.8.9 **response.request()**

<aside>
💡 A matching [HTTPRequest](https://pptr.dev/api/puppeteer.httprequest) object.

</aside>

```jsx
const request = response.request();
```

## 4.9 Dialog

<aside>
💡 Dialog instances are dispatched by the [Page](https://pptr.dev/api/puppeteer.page) via the **dialog** event.

</aside>

```jsx
page.on('dialog', async dialog => {
    console.log(dialog.message());
});
```

### 4.9.1 dialog.accept()

<aside>
💡 A promise that resolves when the dialog has been accepted.

</aside>

```jsx
await dialog.accept();
```

### 4.9.2 dialog.message()

<aside>
💡 The message displayed in the dialog.

</aside>

```jsx
const mess = dialog.message();
```

### 4.9.3 dialog.dismiss()

<aside>
💡 A promise which will resolve once the dialog has been dismissed

</aside>

```jsx
await dialog.dismiss();
```

## 4.10 JS Handle

<aside>
💡 Represents a reference to a JavaScript object. Instances can be created using [Page.evaluateHandle()](https://pptr.dev/api/puppeteer.page.evaluatehandle).

Handles prevent the referenced JavaScript object from being garbage-collected unless the handle is purposely [disposed](https://pptr.dev/api/puppeteer.jshandle.dispose). JSHandles are auto-disposed when their associated frame is navigated away or the parent context gets destroyed.

Handles can be used as arguments for any evaluation function such as [Page.$eval()](https://pptr.dev/api/puppeteer.page._eval), [Page.evaluate()](https://pptr.dev/api/puppeteer.page.evaluate), and [Page.evaluateHandle()](https://pptr.dev/api/puppeteer.page.evaluatehandle). They are resolved to their referenced object.

</aside>

### 4.10.1 **JSHandle.asElement()**

<aside>
💡 Either **null** or the handle itself if the handle is an instance of [ElementHandle](https://pptr.dev/api/puppeteer.elementhandle).

</aside>

```jsx
btn = btn.asElement();
```

### 4.10.2 **JSHandle.getProperties()**

<aside>
💡 Gets a map of handles representing the properties of the current handle.

</aside>

```jsx
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
  const element = property.asElement();
  if (element) {
    children.push(element);
  }
}
children; // holds elementHandles to all children of document.body
```

### 4.10.3 **JSHandle.getProperty()**

<aside>
💡 Fetches a single property from the referenced object.

</aside>

```jsx
await objHandle.getProperty('foo');
```

### 4.10.4 **JSHandle.jsonValue()**

<aside>
💡 A vanilla object representing the serializable portions of the referenced object.

</aside>

```jsx
await keyHandle.jsonValue();
```