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
  templateId: 'button',
  parent: '#app',
  assignedData: {'button': 'Pushhhhh Iiiit'},
  id: 'pushme-button',
  eventHandlers: {
    click: function () { alert('clicked!'); }
  }
});

```

Getting started: `npm install`

Run the tests: `npm run test`