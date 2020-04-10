import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindClassPage } from './find-class.page';

describe('FindClassPage', () => {
  let component: FindClassPage;
  let fixture: ComponentFixture<FindClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
