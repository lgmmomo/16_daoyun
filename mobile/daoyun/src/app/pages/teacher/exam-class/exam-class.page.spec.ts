import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamClassPage } from './exam-class.page';

describe('ExamClassPage', () => {
  let component: ExamClassPage;
  let fixture: ComponentFixture<ExamClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
