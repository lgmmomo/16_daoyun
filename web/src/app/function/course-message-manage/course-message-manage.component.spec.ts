import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMessageManageComponent } from './course-message-manage.component';

describe('CourseMessageManageComponent', () => {
  let component: CourseMessageManageComponent;
  let fixture: ComponentFixture<CourseMessageManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMessageManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMessageManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
