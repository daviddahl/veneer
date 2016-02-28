# veneer
JS anti-framework leveraging browser APIs & DOM template element 

[![Build Status](https://travis-ci.org/daviddahl/veneer.svg?branch=master)](https://travis-ci.org/daviddahl/veneer)

Examples:

First, we need a template:

```html
<template id="button">
  <button class="my-button"></button>
</template>
```

```javascript
// Place a UI element based on the button template
import veneer from '../index.js';

veneer.place({
  templateId: 'button', // get the template by ID
  parent: '#app', // Get parent node by ID or pass in parent element
  assignedData: {'my-button': 'Pushhhhh Iiiit'}, // the element in the template with the 'my-button' class has its textContent set to 'Pushhhhhh Iiiit'
  id: 'pushme-button', // Set the node's ID attribute
  eventHandlers: { // set event handlers for this element
    click: function () { alert('clicked!'); }
  }
});

```

Getting started: `npm install`

Run the tests: `npm run test`