import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QriousTestPage } from './qrious-test.page';

describe('QriousTestPage', () => {
  let component: QriousTestPage;
  let fixture: ComponentFixture<QriousTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QriousTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QriousTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
