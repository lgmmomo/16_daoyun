import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageManageComponent } from './user-message-manage.component';

describe('UserMessageManageComponent', () => {
  let component: UserMessageManageComponent;
  let fixture: ComponentFixture<UserMessageManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMessageManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessageManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
