# Day 1-2

# 1. What is DOM

<aside>
💡 DOM (Document Object Model) is the data representation of the objects that programs can change the document structure, style, and content.
When a web page is loaded, the browser creates a Document Object Model of the page.

</aside>

The HTML DOM is a standard **object** model and **programming interface** for HTML. It defines:

- The HTML elements as **objects**
- The **properties** of all HTML elements
- The **methods** to access all HTML elements
- The **events** for all HTML elements

## 1.1 DOM Tree

<aside>
💡 A DOM tree is a tree structure whose nodes represent an HTML or XML document's contents. Each HTML or XML document has a DOM tree representation
Each elements in DOM Tree  is a node, each elements contains child nodes, which represents for attribute and text

</aside>

**Example :**

```html
<html lang="en">
  <head>
    <title>My title</title>
  </head>
  <body>
    <a href="">My link</a>
    <h1>My header</h1>
  </body>
</html>
```

**It has a DOM tree that looks like this:**

![https://www.w3schools.com/js/pic_htmltree.gif](https://www.w3schools.com/js/pic_htmltree.gif)

# 2. DOM API

<aside>
💡 The Document API, also sometimes called the DOM API, allows you to modify a DOM tree in *any way you want*. It enables you to create any HTML or XML document from scratch or to change any contents of a given HTML or XML document.
Web page authors can edit the DOM of a document using JavaScript to access the **document** property of the global object

</aside>

## 2.1 Methods

<aside>
💡 We can selector elements by id, class, tag name, CSS selector, HTML collection

</aside>

### 2.1.1 getElementById(id)

- **Parameters** :
    - id: The **id** of the element to locate. The **id** is a case-sensitive string which is unique within the document; only one element should have any given **id**.
- **Return value**: an Element object describing the DOM element object matching the specified **id**, or **null** if no matching element was found in the document.

### 2.1.2 getElementsByClassName(class)

- **Parameters** :
    - class: A string representing the **class** name(s) to match; multiple **class** names are separated by whitespace.
- **Return value**: a live [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) of found elements.

### 2.1.3 getElementsByName(name)

- **Parameters** :
    - name: The value of the **name** attribute of the element(s) we are looking for.
- **Return value**: A live [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) collection, meaning it automatically updates as new elements with the same **name** are added to, or removed from, the document.

### 2.1.4 getElementsByTagName(tag)

- **Parameters** :
    - tag: a string representing the tag name of the elements. The special string * represents all elements..
- **Return value**: a live [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) of found elements in the order they appear in the tree.

### 2.1.5 querySelector(selectors)

- **Parameters** :
    - selectors: a group of [selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors) to match the descendant elements of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) baseElement against; this must be valid CSS syntax, or a **SyntaxError** exception will occur. The first element found which matches this group of selectors is returned.
- **Return value**: The first descendant element of **baseElement** which matches the specified group of **selectors**. The entire hierarchy of elements is considered when matching, including those outside the set of elements including **baseElement** and its descendants; in other words, **selectors** is first applied to the whole document, not the **baseElement**, to generate an initial list of potential elements.

### 2.1.6 querySelectorAll(selectors)

- **Parameters** :
    - selectors: A string containing one or more selectors to match against. This string must be a valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) string; if it's not, a **SyntaxError** exception is thrown.
- **Return value**: A non-live [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) containing one [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) object for each descendant node that matches at least one of the specified selectors.

<aside>
💡 The Difference Between a HTMLCollection and a NodeList
- NodeList can use forEach method, HTMLCollection can’t
- When manipulate DOM, relevant changes are updated to HTMLCollection (live), For NodeList these changes will not be updated (static)

</aside>

## 2.2 Attribute node - Text node

### 2.2.1 DOM Attribute

The **Element.attributes** property returns a live collection of all attribute nodes registered to the specified node. It is a [NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap), not an Array, so it has no Array methods and the Attr nodes' indexes may differ among browsers. To be more specific, **attributes** is a key/value pair of strings that represents any information regarding that attribute.

You can enumerate through an element's attributes using [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of). The following example runs through the attribute nodes for the element in the document with id "paragraph", and prints each attribute's value.

**Basic examples**

```jsx
// Get the first <p> element in the document
const paragraph = document.querySelector("p");
const attributes = paragraph.attributes;
for (const attr of attributes) {
   console.log(`${attr.name} -> ${attr.value}`);
}
```

**Using getter and setter**

```jsx
paragraph.attributes.id;
paragraph.attributes.class;

paragraph.attributes.id = "main-content";
paragraph.attributes.class = "content";
```

**Using getAttribute() and setAttribute()**

```jsx
main_title.getAttribute("title"); // title of the main content

main_title.setAttribute("title", "new title");
main_title.attributes.title.value; // new-title
```

<aside>
💡 With setAttribute() u can set an attribute is not specified in an element, as for setter u can’t

</aside>

```jsx
// using setAttribute() for set an attribute not specified in h1
main_title.setAttribute("href", "new title"); 
console.log(main_title); // <h1 id="main-title" href="new title">This is main</h1>

// using setter for set an attribute not specified in h1
main_title.attributes.src = "src";
console.log(main_title); // <h1 id="main-title" href="new title">This is main</h1>
```

**removeAttribute() and hasAttribute()**

```jsx
// removeAttribute() 
main_title.removeAttribute("href");
console.log(main_title); // <h1 id="main-title" class="title" title="new title">This is main</h1>

// hasAttribute();
console.log(main_title.hasAttribute("href")); // false
```

**matches() :**  method of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) interface tests whether the element would be selected by the specified [CSS selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors).

```jsx
let listBlog = document.querySelectorAll(".blog");
console.log(listBlog); // NodeList(3) [div.blog.red, div.blog.green, div.blog.blue]

listBlog.forEach((e) => {
    if(e.matches(".red")) {
        console.log(e);
    }
})

// div.blog.red
```

**insertAdjacentText()**:  method of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) interface, given a relative position and a string, inserts a new text node at the given position relative to the element it is called from.

```jsx
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

**insertAdjacentElement()**:  method of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) interface inserts a given element node at a given position relative to the element it is invoked upon.

**insertAdjacentElement()**:  method of the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) interface parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.

### 2.2.2 innerText - TextContent

**innerText:**

- The **innerText** property of the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface represents the rendered text content of a node and its descendants.
- Returns the **visible** text contained in a node

**textContent:**

- The **textContent** property of the [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) interface represents the text content of the node and its descendants.
- returns the **full** text

```jsx
// with <span id="sologan">Hello <span style="display: none">World</span></span>
let sologan = document.getElementById("sologan");
console.log(sologan.innerText); // Hello
console.log(sologan.textContent); // Hello World

sologan.innerText = ` 
Welcome

            To Me
`;
    //  <span id="sologan"> 
    //      <br>    
    //      Welcome
    //      <br>
    //      <br>
    //     To Me
    //  </span>

sologan.textContent = ` 
Welcome

            To Me
`;
//  <span id="sologan"> 
//      Welcome
//
//      To Me
//  </span>
```

## 2.3 C**reate an Element in DOM**

**Using createElement() and appendChild()**

```jsx
let newFooter = document.createElement("h1");
newFooter.setAttribute("address", "TPHCM");
newFooter.setAttribute("id", "footer");
newFooter.innerText = "This is footer";
document.body.appendChild(newFooter);
console.log(document.getElementById("footer")); // <h1 address="TPHCM" id="footer">This is footer</h1>
```

### 2.3.1 innerHTML - outerHTML

**innerHTML**:  is a property of the Element that allows you to get or set the HTML markup contained within the element

**outerHTML**: can also be set to replace the element with nodes parsed from the given string.

```jsx
// <div class="blog red">
//		<h2 class="blog-title">Blog 1</h2>                
// </div>
// with innerHTML
let blogRed = document.querySelector(".blog.red");
blogRed.innerHTML = "<p>Hello World</p>";
console,log(blogRed);
// <div class="blog red">
//		<p>Hello World</p>               
// </div>

// with outerHTML
blogRed.innerHTML = "<h1>Welcome!</h1>";
console,log(blogRed);
// <h1>Welcome!</h1>
```

## 2.4 Node properties - methods

- attributes
- chilElementCount
- childNodes
- children
- classList
- firstChild
- firstElementChild
- lastChild
- lastElementChild
- nextElementSibling
- nextSibling
- previousElementSibling
- previousSibling
- parentElement
- parentNode
- nodeType

### 2.4.1 classList

The **Element.classList** is a read-only property that returns a live [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) collection of the class attributes of the element. This can then be used to manipulate the class list.

Using **classList** is a convenient alternative to accessing an element's list of classes as a space-delimited string via [element.className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className).

```jsx
console.log(main_title.classList); // DOMTokenList ['title', value: 'title']
```

**add():** add an class 

```jsx
main_title.classList.add("is-active");
console.log(main_title.classList); // DOMTokenList(2) ['title', 'is-active', value: 'title is-active']

main_title.classList.add("red","green");
console.log(main_title.classList); // DOMTokenList(4) ['title', 'is-active', 'red', 'green', value: 'title is-active red green']
```

**remove()**: remove an class

```jsx
main_title.classList.remove("is-active");
console.log(main_title.classList); // DOMTokenList ['title', value: 'title']
```

**contains()**: check an class name contains in class attributes

```jsx
console.log(main_title.classList.contains("title")); // true
console.log(main_title.classList.contains("active")); // false
```

**toggle()** : if class attributes contain class nam then remove this, else add this

```jsx
main_title.classList.toggle("active");
console.log(main_title.classList); // DOMTokenList(2) ['title', 'active', value: 'title active']
main_title.classList.toggle("active");
console.log(main_title.classList);  // DOMTokenList ['title', value: 'title']
```

## 2.5 Traversing DOM

### 2.5.1 parentNode - parentElement

- **parentNode**: returns the parent node object if present or else it will return *“null”*.
- **parentElement**: returns an element object representing parent element if present or else it will return null.

### 2.5.2 remove() - removeChild()

- **remove():** method removes the element from the DOM.
- **removeChild():** removes a child node from the DOM and returns the removed node.

### 2.5.3 nextElementSibling - previousElementSibling

- **nextElementSibling:**  return the element immediately following the specified one in its parent's children list, or **null** if the specified element is the last one in the list.
- **previousElementSibling**: returns the [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) immediately prior to the specified one in its parent's children list, or **null** if the specified element is the first one in the list.

### 2.5.4 childNodes - children

- **childNodes:**   returns a live [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) of child [nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node) of the given element where the first child node is assigned index **0**. Child nodes include elements, text and comments.
- **children:** returns a live [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) which contains all of the child [elements](https://developer.mozilla.org/en-US/docs/Web/API/Element) of the element upon which it was called,  includes only element nodes.

### 2.5.5 firstChild - firstElementChild

- **firstChild:**   returns the node's first child in the tree, or **null** if the node has no children.
- **firstElementChild:** returns an element's first child [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), or **null** if there are no child elements,  includes only element nodes.

### 2.5.6 lastChild - lastElementChild

- **firstChild:**  returns the last child of the node, or **null** if there are no child nodes.
- **firstElementChild:** returns an element's last child [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), or **null** if there are no child elements,  includes only element nodes.

### 2.5.7 nextSibling - previousSibling

- **nextSibling:** returns the node immediately following the specified one in their parent's [childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes), or returns **null** if the specified node is the last child in the parent element.
- **previousSibling:** returns the node immediately preceding the specified one in its parent's [childNodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) list, or null if the specified node is the first in that list.

# 3. DOM Events

<aside>
💡 HTML DOM events allow JavaScript to register different event handlers on elements in an HTML document.

</aside>

Can used 2 ways to implement DOM Event:

- Attribute events
- Assign event using the element node

```jsx
// attribute event
<button id="btn-hello" onclick="alert(`Xin chào`)">Click Me</button>

// assign event
btn_hello.onclick = () => {
    alert("Xin chào");
};
```

## 3.1 Events

- **click:**  An element is clicked on
- **change:** The content of a form element has changed
- **keyup:** A key is released
- **keydown:** A key is down
- **mouseup:** A user releases a mouse button over an element
- **mousedown:** The mouse button is pressed over an element
- **mousemove:** The pointer is moved over an element
- **mouseout:** The pointer is moved out of an element
- **mouseover:** The pointer is moved onto an element
- **scroll:** An scrollbar is being scrolled
- **unload:** A page has unloaded

## 3.2 Event propertise

- **target:** Returns the element that triggered the event
- **key:** returns the key value of the key represented by the event
- **keyCode:** Use the [key property](https://www.w3schools.com/jsref/event_key_key.asp) instead
- **which:** Use the [key property](https://www.w3schools.com/jsref/event_key_key.asp) or [button property](https://www.w3schools.com/jsref/event_button.asp) instead
- **clientX:** Returns the horizontal coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered
- **clientY:** Returns the vertical coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered
- **offsetX:** Returns the horizontal coordinate of the mouse pointer relative to the position of the edge of the target element
- **offsetY:** Returns the vertical coordinate of the mouse pointer relative to the position of the edge of the target element
- **pageX:** Returns the horizontal coordinate of the mouse pointer, relative to the document, when the mouse event was triggered
- **pageY:** Returns the vertical coordinate of the mouse pointer, relative to the document, when the mouse event was triggered

### 3.3 Event methods

- **stopPropagation():** Prevents further propagation of an event during event flow
- **preventDefault():** Cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
- **stopImmediatePropagation():** prevents other listeners of the same event from being called.

<aside>
💡 addEventListener(): sets up a function that will be called whenever the specified event is delivered to the target.

</aside>

### 3.4 debounce and throttle

- **Debouncing** delays the execution of your code until the user stops performing a certain action for a specified amount of time.
- **Throttling** limits the execution of your code to once in every specified time interval.