import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/interfaces/courses';
import { Teacher } from 'src/app/interfaces/teachers';
import { selectIsLoading } from '../../store/courses.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.scss'],
})
export class TableCoursesComponent {
  @Input() dataSource!: Course[];

  @Input() teachers: Teacher[] = [];

  @Input() isAdmin!: boolean;

  isLoading$: Observable<boolean>;

  columns: string[] = ['id', 'name', 'date', 'hour', 'teacher', 'actions'];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  constructor(
    private store: Store,
  ) {
    this.isLoading$ = this.store.select(selectIsLoading)
  }
  ngOnInit(): void {}
}
