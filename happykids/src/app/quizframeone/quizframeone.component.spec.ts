import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizframeoneComponent } from './quizframeone.component';

describe('QuizframeoneComponent', () => {
  let component: QuizframeoneComponent;
  let fixture: ComponentFixture<QuizframeoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizframeoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizframeoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
