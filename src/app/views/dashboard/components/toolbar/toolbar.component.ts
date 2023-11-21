import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UserActive } from 'src/app/interfaces/users';
import { selectNameUserActive } from 'src/app/store/login/login.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string = '';
  @Input() drawer?: MatDrawer;
  
  user$: Observable<UserActive | null> = this.userServices.getUser$();
  user: string = '';

  constructor(
    private userServices: UsersService,
  ) {
    this.user$.subscribe({
      next: (user) => {
        if(user){
          this.user = user.name;
        }
      }
    })
  }

  ngOnInit(): void {
    this.userServices.getUserActive()
  }

  logOut(){
    this.userServices.logOut();
  }
}
