import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInformationPage } from './edit-information.page';

describe('EditInformationPage', () => {
  let component: EditInformationPage;
  let fixture: ComponentFixture<EditInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
