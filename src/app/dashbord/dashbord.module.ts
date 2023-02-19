import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './leave/leave.component';
import { LeaveService } from './leave.service';
import { LeaveRoutingModule } from './leave/leave-routing.module';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button'
import { UserAuthService } from '../user-auth/shared/services/user-auth.service';

@NgModule({
  declarations: [
    LeaveComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CardModule,
    ButtonModule
  ],
  providers :[
    // UserAuthService,
LeaveService
  ],
  
})
export class DashbordModule { }
