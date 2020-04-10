import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginInPage } from './login-in.page';

describe('LoginInPage', () => {
  let component: LoginInPage;
  let fixture: ComponentFixture<LoginInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
