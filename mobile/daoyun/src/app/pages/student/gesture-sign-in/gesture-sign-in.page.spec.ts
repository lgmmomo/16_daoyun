import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestureSignInPage } from './gesture-sign-in.page';

describe('GestureSignInPage', () => {
  let component: GestureSignInPage;
  let fixture: ComponentFixture<GestureSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestureSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestureSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
