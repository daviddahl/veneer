// Veneer helper object

var veneer = {
  checkEnv: function () {
    if (!('content' in document.createElement('template'))) {
      console.error('<template> tag not supported in this browser!');
    }
  },

  makeNode: function (templateId, data, parent) {
    // Use Typo to handle arg validation
    var qid = '#' + templateId;
    var tmpl = document.querySelector(qid);
    var klasses = Object.keys(data);
    for (var prop in data) {
      var klass = '.' + prop;
      var node = tmpl.content.querySelector(klass);
      // TODO: switch on nodetype
      node.textContent = data[prop];
    }
    var clone = document.importNode(tmpl.content, true);
    // TODO: Check if parent is a function or DOM node
    this.attachNode(parent, clone);
    return clone;
  },

  attachNode: function (parent, child, attachmentFn) {
    parent.appendChild(child);
  },
  
};

export { veneer as default };

