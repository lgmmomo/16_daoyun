import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewClassPage } from './new-class.page';

describe('NewClassPage', () => {
  let component: NewClassPage;
  let fixture: ComponentFixture<NewClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
