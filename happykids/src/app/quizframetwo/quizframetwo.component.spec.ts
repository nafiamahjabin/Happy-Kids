import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizframetwoComponent } from './quizframetwo.component';

describe('QuizframetwoComponent', () => {
  let component: QuizframetwoComponent;
  let fixture: ComponentFixture<QuizframetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizframetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizframetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
