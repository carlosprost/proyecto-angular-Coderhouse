import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { usersFeature } from './store/users.reducer';
import { StoreModule } from '@ngrx/store';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserTableComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersModule { }