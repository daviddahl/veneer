// veneer tests
import veneer from '../src/index.js';

function testHeader() {
  var data = { header: 'THIS IS MY HTML PAGE' };
  var parent = document.querySelector('#app');
  var node = veneer.makeNode('header', data, parent);
  console.info('node created: ', node);
}

function testMakeNode() {
  var userData = {
    username: 'deeznuts',
    bio: 'Born in a log cabin, world traveller, whisky nut'
  }

  var parent = document.querySelector('#app');
  var node = veneer.makeNode('user-data', userData, parent);
  console.info('node created: ', node);
}

function testMakeList() {
  var myList = ['passport', 'whisky bottle', 'backpack', 'mint gum'];
  var parent = document.querySelector('.my-list');
  for (let idx in myList) {
    veneer.makeNode('my-list-items', {'list-item': myList[idx]}, parent);
  }
}

function testPlaceUIElement() {
  let selectNode = veneer.placeUIElement({
    templateId: 'select',
    parent: '#app',
    id: 'my-select',
    eventHandlers: { change: function (event) { console.log(event.target); } }
  });

  var myList = [
    'passport', 'whisky bottle',
    'backpack', 'mint gum',
    'pistola', 'sleeping bag',
    'map of Amazonia',
    'whip'
  ];

  for (let idx in myList) {
    console.info(myList[idx]);
    var newNode = veneer.placeUIElement({
      templateId: 'option',
      assignedData: {'select-item': myList[idx]},
      parent: '.select',
      classes: 'foo bar'
    });
    console.log(newNode);
  }

  veneer.placeUIElement({
    templateId: 'button',
    parent: '#app',
    assignedData: {'button': 'Pushhhhh Iiiit'},
    id: 'pushme-button',
    eventHandlers: {
      click: function () { alert('oooohhh Baby Baby!'); }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  veneer.checkEnv();
  testHeader();
  testMakeNode();
  testMakeList();
  testPlaceUIElement();
  console.info('tests finished!');
});
