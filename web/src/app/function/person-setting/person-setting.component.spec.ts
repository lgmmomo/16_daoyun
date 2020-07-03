import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSettingComponent } from './person-setting.component';

describe('PersonSettingComponent', () => {
  let component: PersonSettingComponent;
  let fixture: ComponentFixture<PersonSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
