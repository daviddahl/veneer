// veneer tests
import veneer from '../src/index.js';

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

document.addEventListener('DOMContentLoaded', function () {
  veneer.checkEnv();
  testMakeNode();
  testMakeList();
  console.info('tests finished!');
});

