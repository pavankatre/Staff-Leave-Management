import { NgModule } from '@angular/core';  
import {InputTextModule} from 'primeng/inputtext'
import { UserAuthRoutingModule } from './user-auth-routing.module';
import {ButtonModule} from 'primeng/button'

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserAuthService } from './shared/services/user-auth.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LeaveService } from '../dashbord/leave.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,

  ],
  providers :[
UserAuthService,
LeaveService
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
   MatButtonModule ,
   MatFormFieldModule,
   MatInputModule
  ]
})
export class UserAuthModule { }
