import veneer from '../index.js';

describe('veneer', () => {
  it('should be an object', () => {
    expect(typeof veneer).toBe('object');
  });

  it('should method called place', () => {
    expect(typeof veneer.place).toBe('function');
  });

  it('should have an app div', () => {
    veneer.getTitle();
    let div = document.querySelector('#app');
    console.log(window.document.title);
    expect(div == null).toBe(false);
  });
  
  it('should have template nodes', () => {
    let tmpls = document.querySelectorAll('template');
    console.log(tmpls);
    expect(tmpls.length).toBe(6);
  });
});
