import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetInformationPage } from './set-information.page';

describe('SetInformationPage', () => {
  let component: SetInformationPage;
  let fixture: ComponentFixture<SetInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
