import veneer from '../index.js';

describe('veneer', () => {

  beforeEach(function(){
    this.result = fixture.load('index.html');
  });

  afterEach(function(){
    fixture.cleanup()
  });

  it('should be an object', () => {
    expect(veneer).toBeDefined();
    expect(veneer.place).toBeDefined();
    expect(fixture.el.firstChild).toBeDefined();
  });

  it('should method called place', () => {
    expect(typeof veneer.place).toBe('function');
  });

  it('should have an app div', () => {
    let div = document.querySelector('#app');
    expect(div == null).toBe(false);
  });
  
  it('should have template nodes', () => {
    let tmpls = document.querySelectorAll('template');
    expect(tmpls.length).toBe(6);
  });

  it('should have a header in the fixtures', () => {
    var data = { header: 'THIS IS MY HTML PAGE' };
    var parent = document.querySelector('#app');
    veneer.makeNode('header', data, parent);
    expect(document.querySelector('header')).toBeDefined();
    expect(document.querySelector('header').textContent).toBe('THIS IS MY HTML PAGE');
  });

  it('should  make a node', () => {
    var userData = {
      username: 'deeznuts',
      bio: 'Born in a log cabin, world traveller, whisky nut'
    }

    var parent = document.querySelector('#app');
    veneer.makeNode('user-data', userData, parent);
    
    expect(document.querySelector('.username').textContent).toBe('deeznuts');
    expect(document.querySelector('.bio').textContent).toBe('Born in a log cabin, world traveller, whisky nut');
  });

  it('should make a list', () => {

    var userData = {
      username: 'deeznuts',
      bio: 'Born in a log cabin, world traveller, whisky nut'
    }

    var parent = document.querySelector('#app');
    veneer.makeNode('user-data', userData, parent);

    var myList = ['passport', 'whisky bottle', 'backpack', 'mint gum'];
    var parent = document.querySelector('.my-list');
    expect(parent).toBeDefined();
    for (let idx in myList) {
      veneer.makeNode('my-list-items', {'list-item': myList[idx]}, parent);
    }
    
    expect(document.querySelector('.my-list').childNodes.length).toBeGreaterThan(0);
  });

  it('should place UI elements', () => {

    var testChangeVal = null;
    var testClickVal = null;
    
    let selectNode = veneer.placeUIElement({
      templateId: 'select',
      parent: '#app',
      id: 'my-select',
      eventHandlers: { change: function (event) { testChangeVal = 1; } }
    });

    var myList = [
      'passport', 'whisky bottle',
      'backpack', 'mint gum',
      'pistola', 'sleeping bag',
      'map of Amazonia',
      'whip'
    ];

    for (let idx in myList) {
      var newNode = veneer.placeUIElement({
        templateId: 'option',
        assignedData: {'select-item': myList[idx]},
        parent: '.select',
        classes: 'foo bar'
      });
    }

    veneer.placeUIElement({
      templateId: 'button',
      parent: '#app',
      assignedData: {'button': 'Pushhhhh Iiiit'},
      id: 'pushme-button',
      eventHandlers: {
        click: function () { testClickVal = 1; }
      }
    });
    // Click the button
    var btn = document.querySelector('#pushme-button');
    console.log(btn);
    btn.click();
    expect(testClickVal).toBe(1);

    // Change the option
    var sel = document.querySelector('select');
    if ("createEvent" in document) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", false, true);
      sel.dispatchEvent(evt);
    } else {
      sel.fireEvent("onchange");
    }

    expect(testChangeVal).toBe(1);
  });
  
});
