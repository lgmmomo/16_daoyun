import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrtestPage } from './qrtest.page';

describe('QrtestPage', () => {
  let component: QrtestPage;
  let fixture: ComponentFixture<QrtestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrtestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrtestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
