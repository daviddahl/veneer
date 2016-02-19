// veneer tests

import veneer from '../src/index.js';

function testMakeNode() {
  var userData = {
    username: 'deeznuts',
    bio: 'Born in a log cabin, world traveller, whisky nut'
  }
  var parent = document.querySelector('#app');
  veneer.makeNode('user-data', userData, parent);
}

document.addEventListener('DOMContentLoaded', function () {
  testMakeNode();
  alert('tests finished!');
});
