import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  title: string = 'Dashboard';

  /* SessionStorage */
  sessionStorage: Storage = window.sessionStorage;

  constructor(){
    /* if(this.sessionStorage.getItem('userActive') === null || this.sessionStorage.getItem('user') === undefined || this.sessionStorage.getItem('user') === ''){
      window.location.href = '/login';
    } */
  }
}
