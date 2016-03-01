/**
 *
 * Veneer: A compact UI creation API (and anti-framework)
 * @author David Dahl, ddahl@nulltxt.se
 * @license MIT
 * @copyright David Dahl, 2016
 *
 */
var veneer = {
  /**
   * Checks to see if the browser supports the template HTMLElement
   */
  checkEnv: function () {
    if (!('content' in document.createElement('template'))) {
      console.error('<template> tag not supported in this browser!');
    }
  },
  /**
   * Create a UI element and place it into the DOM
   * @param {object} options - a configuration object that describes the
   * @description element we are creating, where to insert it,
   * eventListeners to add, ID, classes, etc
   * Note: we do assume that each template has a wrapper node
   *       with 0 or more childNodes inside
   ```
     veneer.place({
     templateId: 'button', // <-- a template's DOM ID
     parent: '#app', // <-- The parent node to append this new UI node to
     assignedData: {'button': 'Pushhhhh Iiiit'}, // <-- textContent for each node found inside this template node with class
     id: 'pushme-button', // <-- new node's ID
     eventHandlers: { // <-- eventHandlers for the outer node
     click: function () { alert('hi'); }
     };
   ```
   */
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
  /**
   *
   * Internal API to generate the new node
   * @param {string} templateId The ID of the template expected in the current window.document
   * @param {object} data The textContent of each childNode (className: textContent)
   * @param {string} parent The querySelector-style querystring to find the parent node, OR, the node itself
   * @param {boolean} clear Optionally remove all childNodes from the parentNode before appending/prepending the new nodes
   * @param {string} attachmentPoint 'append' or 'prepend' new node to parentNode
   * @param {string} id The id to assign to the new node
   * @param {string} classes Space-delimited string of classes to assign to the new node
     @param {object} events eventType: function object of eventHandlers to set to the outernode
   *
  */
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
            continue;
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
      try { // TODO: remove this try/catch
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

  /**
   * Attach the new node to parent at attachment point
   * @param {object} parent parentNode
   * @param {object} child childNode
   * @param {string} attachmentPoint Either 'append' or 'prepend'
   */
  attachNode: function (parent, child, attachmentPoint) {
    switch (attachmentPoint) {
      case 'append':
        parent.appendChild(child);
        break;
      case 'prepend':
        this.prepend(parent, child);
        break;
      default:
        console.error('attachmentPoint argument must be \'append\' or \'prepend\'');
        return;
    }
  },

  prepend: function (parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },

  /**
   * clears out all childNodes from parent node
   * @param {object} node The parent node to clear
   */
  clearNode: function (node) {
    // remove all existing child nodes
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

};

export { veneer as default };
