import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizstandingsComponent } from './quizstandings.component';

describe('QuizstandingsComponent', () => {
  let component: QuizstandingsComponent;
  let fixture: ComponentFixture<QuizstandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizstandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizstandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
