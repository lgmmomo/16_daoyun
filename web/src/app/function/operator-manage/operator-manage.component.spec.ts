import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorManageComponent } from './operator-manage.component';

describe('OperatorManageComponent', () => {
  let component: OperatorManageComponent;
  let fixture: ComponentFixture<OperatorManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
