import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StuClassInfoPage } from './stu-class-info.page';

describe('StuClassInfoPage', () => {
  let component: StuClassInfoPage;
  let fixture: ComponentFixture<StuClassInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuClassInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StuClassInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
