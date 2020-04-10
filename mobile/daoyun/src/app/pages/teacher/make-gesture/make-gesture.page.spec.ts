import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakeGesturePage } from './make-gesture.page';

describe('MakeGesturePage', () => {
  let component: MakeGesturePage;
  let fixture: ComponentFixture<MakeGesturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGesturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakeGesturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
