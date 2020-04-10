import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetUpPage } from './set-up.page';

describe('SetUpPage', () => {
  let component: SetUpPage;
  let fixture: ComponentFixture<SetUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
