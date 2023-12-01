import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  @Input() drawer?: MatDrawer;
  isAdmin$: Observable<boolean>;


  constructor(private usersService: UsersService){
    this.isAdmin$ = this.usersService.isAdministrator()
  }

}
