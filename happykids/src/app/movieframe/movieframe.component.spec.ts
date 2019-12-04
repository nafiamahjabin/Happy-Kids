import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieframeComponent } from './movieframe.component';

describe('MovieframeComponent', () => {
  let component: MovieframeComponent;
  let fixture: ComponentFixture<MovieframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
