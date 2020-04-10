import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamSignInPage } from './exam-sign-in.page';

describe('ExamSignInPage', () => {
  let component: ExamSignInPage;
  let fixture: ComponentFixture<ExamSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
