import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseTableComponent } from './student-course-table.component';

describe('StudentCourseTableComponent', () => {
  let component: StudentCourseTableComponent;
  let fixture: ComponentFixture<StudentCourseTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCourseTableComponent]
    });
    fixture = TestBed.createComponent(StudentCourseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
