import veneer from '../src/index.js';

let app = {
  main: function main () {
    // show the default View
    let headerConfig = {
      templateId: 'header',
      parent: '#app',
      assignedData: {
        headline: 'My App'
      },
      id: 'app-header'
    };

    veneer.place(headerConfig);

    let navItems = [
      {
        data: 'Home',
        event: function (event) {
          app.nav.home();
        }
      },
      {
        data: 'About',
        event: function (event) {
          app.nav.about();
        }
      }
    ];

    for (let i = 0; i < navItems.length; i++) {
      veneer.place({
        templateId: 'nav-item',
        parent: '.nav-items',
        assignedData: {
          item: navItems[i].data
        },
        eventHandlers: {
          click: navItems[i].event
        }
      });
    }

    let viewConfig = {
      templateId: 'view-generic',
      parent: '#app',
      id: 'view-home',
      assignedData: {
        headline: 'Home',
        content: 'This is a home page'
      }
    };

    veneer.place(viewConfig);
    document.querySelector('.view').style.display = 'inline';
  },

  nav: {
    home: function () { console.log('HOME'); },
    about: function () { console.log('ABOUT'); }
  }
};

window.addEventListener('DOMContentLoaded', function () { app.main(); });
