import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewClassPage } from './view-class.page';

describe('ViewClassPage', () => {
  let component: ViewClassPage;
  let fixture: ComponentFixture<ViewClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
