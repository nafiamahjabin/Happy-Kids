import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoonframeComponent } from './cartoonframe.component';

describe('CartoonframeComponent', () => {
  let component: CartoonframeComponent;
  let fixture: ComponentFixture<CartoonframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartoonframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartoonframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
