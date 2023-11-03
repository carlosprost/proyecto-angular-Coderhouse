import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() title: string = '';
  @Input() drawer?: MatDrawer;

  user: User = window.sessionStorage.getItem('userActive') ? JSON.parse(window.sessionStorage.getItem('userActive') || '{}') : {};

  logOut(){
    window.sessionStorage.removeItem('userActive');
    window.location.href = '/login';
  }
}
