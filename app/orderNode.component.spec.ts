/* tslint:disable:no-unused-variable */
import { OrderNode } from './orderNode.component';
import { VariableReference, HierarchyNode, Variables } from './variableStorageService';
import { async, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';


describe('OrderNode', function () {
  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [OrderNode] });
    TestBed.compileComponents();
  }));

  it('should render a variable', () => {
    let fixture = TestBed.createComponent(OrderNode);
    let orderNode = fixture.componentInstance;
    orderNode.node = new VariableReference('vid');
    orderNode.variables = new Variables({
      index: {
        vid: {
          name: 'Variable Name'
        }
      }
    });
    fixture.detectChanges();
    let p = fixture.debugElement.query(By.css('p.list-group-item-text')).nativeElement;
    expect(p.innerText).toBe('Variable Name');
  });

   it('should flag invalid a variables', () => {
    let fixture = TestBed.createComponent(OrderNode);
    let orderNode = fixture.componentInstance;
    orderNode.node = new VariableReference('vid');
    orderNode.variables = new Variables({
      index: {
        vid: {
        }
      }
    });
    fixture.detectChanges();
    let p = fixture.debugElement.query(By.css('.alert-warning')).nativeElement;
    expect(p.innerText).toBe('Invalid');
  });

  it('should render an empty order hierachy', () => {
    let fixture = TestBed.createComponent(OrderNode);
    let orderNode = fixture.componentInstance;
    orderNode.node = new HierarchyNode({
      'Hierarchy Name': []
    });

    fixture.detectChanges();
    let name = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(name.innerText).toMatch(/Hierarchy Name/i);
  });

  it('should render an order hierachy with variables as children', () => {
    let fixture = TestBed.createComponent(OrderNode);
    let orderNode = fixture.componentInstance;
    orderNode.node = new HierarchyNode({
      'Hierarchy Name': ['vid1', 'vid2']
    });
    orderNode.variables = new Variables({
      index: {
        vid1: {
          name: 'V1 Name'
        },
        vid2: {
          name: 'V2 Name'
        }
      }
    });
    fixture.detectChanges();
    let name = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(name.innerText).toMatch(/Hierarchy Name/i);

    let childrenText = fixture.debugElement.queryAll(By.css('li ul li p'));
    expect(childrenText.length).toBe(2);
    expect(childrenText[0].nativeElement.innerText).toBe('V1 Name');
    expect(childrenText[1].nativeElement.innerText).toBe('V2 Name');
  });


});
