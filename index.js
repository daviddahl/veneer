// Veneer helper object

var veneer = {
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
    parent.appendChild(clone);
  }
};

if (!('content' in document.createElement('template'))) {
  console.error('<template> tag not supported in this browser!');
}

// Tests

function testMakeNode() {
  var userData = {
    username: 'deeznuts',
    bio: 'Born in a log cabin, world traveller, whisky nut'
  }
  var parent = document.querySelector('#app');
  veneer.makeNode('user-data', userData, parent);
}
