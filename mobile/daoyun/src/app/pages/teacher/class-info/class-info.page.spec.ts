import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassInfoPage } from './class-info.page';

describe('ClassInfoPage', () => {
  let component: ClassInfoPage;
  let fixture: ComponentFixture<ClassInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
