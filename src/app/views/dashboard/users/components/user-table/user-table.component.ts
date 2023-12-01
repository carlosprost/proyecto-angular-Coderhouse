import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/users';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUsersIsLoading } from '../../store/users.selectors';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  @Input() dataSource!: User[];

  isLoading$: Observable<boolean>;

  columns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  @Output() editElement: EventEmitter<number> = new EventEmitter();
  @Output() deleteElement: EventEmitter<number> = new EventEmitter();

  constructor(
    private store: Store,
  ) {
    this.isLoading$ = this.store.select(selectUsersIsLoading)
  }

}
