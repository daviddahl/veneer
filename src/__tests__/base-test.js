import veneer from '../index.js';

describe('veneer', () => {

  beforeEach(function(){
    this.result = fixture.load('index.html');
  });

  afterEach(function(){
    fixture.cleanup()
  });

  it('should be an object', () => {
    console.log('typeof veneer', typeof veneer);
    expect(veneer).toBeDefined();
    expect(veneer.place).toBeDefined();
    console.log('fixture: ', fixture.el.firstChild);
    expect(fixture.el.firstChild).toBeDefined();
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
