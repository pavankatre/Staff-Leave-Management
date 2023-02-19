import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path : 'dashbord', loadChildren:()=>import('./dashbord/dashbord.module').then(mod=>mod.DashbordModule
  // )},
  // {
  //   path :'userAuth', loadChildren:()=>import('./user-auth/user-auth.module').then(mod=>mod.UserAuthModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
