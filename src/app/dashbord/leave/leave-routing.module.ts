import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeaveComponent } from "./leave.component";

const route : Routes =[
    {path : "leave" , component : LeaveComponent}
]

@NgModule({
    imports :[RouterModule.forChild(route)],
    exports:[RouterModule]
})
export class LeaveRoutingModule{}



