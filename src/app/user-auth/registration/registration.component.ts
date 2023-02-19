import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder} from "@angular/forms"
import { Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../shared/services/user-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
public registerUserForm :FormGroup | any;
  constructor( private fb : FormBuilder, private authServ : UserAuthService, private roter: Router , private activRouter : ActivatedRoute) { }

  ngOnInit(): void {
this.registerUserForm=this.fb.group({
  userH0odOrStaff : this.fb.control('',Validators.required),
  userFirstName : this.fb.control('',Validators.required),
  userLastName : this.fb.control('',Validators.required),
  userEmail : this.fb.control('',[Validators.required, Validators.email]),
  userContact : this.fb.control('',Validators.required),
  userDep : this.fb.control('',Validators.required),
  userName : this.fb.control('',Validators.required),
  uPsw : this.fb.control('',Validators.required),
})
  }
  registerUser(){
console.log(this.registerUserForm.value)
this.authServ.userSignUpRequest(this.registerUserForm.value).subscribe((data : any)=>{
  console.log(data)
  
})
this.registerUserForm.reset()
  }
  navigatToLoginn(){
this.roter.navigate(['userAuth/login'])
  }
}
