// Veneer helper object

var veneer = {
  checkEnv: function () {
    if (!('content' in document.createElement('template'))) {
      console.error('<template> tag not supported in this browser!');
    }
  },

  place: function (options) {
    return this.placeUIElement(options);
  },

  placeUIElement: function (options) {
    if (!options) {
      console.error('options argument required');
      return;
    }
    if (!options.templateId) {
      console.error('options.templateId property required');
      return;
    }
    if (!options.assignedData) {
      console.info('options.assignedData property not used');
    }
    if (!options.parent) {
      console.error('options.parent property required');
      return;
    }
    let parentNode;
    if (typeof options.parent == 'string') {
      parentNode = document.querySelector(options.parent);
    } else if (typeof options.parent == 'object') {
      parentNode = options.parent;
    }
    if (!parentNode) {
      console.error('parentNode ciold not be created from parent ID or is not a DOMNode');
      return;
    }

    // Optional properties:
    //   * 'clear' boolean ([false is default]remove all exisitng child nodes)
    //   * 'attatchmentPoint' string (append [default], prepend)
    let clear = options.clear || undefined;
    let attach = options.attachmentPoint || undefined;
    let id = options.id || undefined;
    let classes = options.classes || undefined;
    let events = options.eventHandlers || undefined;
    console.info('eventHandlers', options.eventHandlers);

    let node = this.makeNode(options.templateId,
                             options.assignedData || null,
                             parentNode,
                             clear,
                             attach,
                             id,
                             classes,
                             events);
    return node;
  },

  makeNode: function (templateId, data, parent, clear=false, attachmentPoint='append', id=null, classes=null, events=null) {
    // Use Typo to handle arg validation
    var qid = '#' + templateId;
    var tmpl = document.querySelector(qid);
    let klasses = [];
    if (data) {
      klasses = Object.keys(data);
      for (let prop in data) {
        // TODO: will have to identify the type of DOM node
        // this data is being used with as not all have textContent property
        if (typeof prop == 'string') {
          let klass = `.${prop}`;
          let node = tmpl.content.querySelector(klass);
          if (!node) {
            console.error('There is no node with class: ' + klass);
          }
          // TODO: switch on nodetype
          if ((node.nodeType == 1) && (typeof node.value == 'string')) {
            node.setAttribute('value', data[prop]);
          }
          // XXX TODO: For now we do this anyway...
          node.textContent = data[prop];
        } else {
          console.warn('No textContent for node');
        }
      }
    }

    var clone = document.importNode(tmpl.content, true);

    if (id) {
      try {
        clone.firstElementChild.id = id;
      } catch (ex) {
        console.warn(ex);
      }
    }
    // XXX TODO: check the cild count before making too many assumptions via 'childElementCount'
    if (events) {
      for (let prop in events) {
        console.log(prop, events[prop]);
        // TODO verify eventName as valid
        if (events.hasOwnProperty(prop)) {
          if (typeof events[prop] == 'function') {
            console.info('adding event listener...');
            clone.firstElementChild.addEventListener(prop, events[prop]);
          }
        }
      }
    }

    if (typeof classes == 'string') {
      let classList = classes.split(' ');
      for (let i = 0; i < classList.length; i++) {
        clone.firstElementChild.classList.add(classList[i]); // BROKEN
      }
    }

    if (clear) {
      this.clearNode(parent);
    }
    // TODO: Check if parent is a function or DOM node
    this.attachNode(parent, clone, attachmentPoint);
    console.info('clone', clone.firstElementChild);

    return clone.firstElementChild;
  },

  attachNode: function (parent, child, attachmentPoint) {
    console.log('attachNode....');
    console.log(arguments);
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

  getTitle: function () {
    console.log(document.title);
  }
};

export { veneer as default };
