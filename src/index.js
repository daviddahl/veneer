// Veneer helper object

var veneer = {
  checkEnv: function () {
    if (!('content' in document.createElement('template'))) {
      console.error('<template> tag not supported in this browser!');
    }
  },

  makeNode:
  function (templateId, data, parent, clear=false, attachmentPoint='append') {
    // Use Typo to handle arg validation
    var qid = '#' + templateId;
    var tmpl = document.querySelector(qid);
    var klasses = Object.keys(data);
    for (let prop in data) {
      // TODO: will have to identify the type of DOM node
      // this data is being used with as not all have textContent property
      if (typeof prop == 'string') {
        let klass = `.${prop}`;
        let node = tmpl.content.querySelector(klass);
        // TODO: switch on nodetype
        node.textContent = data[prop];
      } else {
        console.error('Unsupported node type');
      }
    }
    var clone = document.importNode(tmpl.content, true);
    if (clear) {
      this.clearNode(parent);
    }
    // TODO: Check if parent is a function or DOM node
    this.attachNode(parent, clone, attachmentPoint);
    return clone;
  },

  attachNode: function (parent, child, attachmentPoint) {
    switch (attachmentPoint) {
      case 'append':
        parent.appendChild(child);
        break;
      case 'prepend':
        this.prepend(parent, child);
        break;
      default:
        return;
    }
  },

  prepend: function (parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  clearNode: function (node) {
    // remove all existing child nodes
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  },

};

export { veneer as default };

