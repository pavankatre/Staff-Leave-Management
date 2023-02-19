import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from 'src/app/dashbord/leave.service';
import { UserAuthService } from '../shared/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;
  userLog: any;
  constructor(private fb: FormBuilder, private authServ: UserAuthService, private leaveServ: LeaveService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: this.fb.control(null, Validators.required),
      uPsw: this.fb.control('', Validators.required)
    })
  }

  logginUser() {
    console.log(this.loginForm.value)
    console.log('1')

    console.log(this.loginForm.value)
    this.authServ.userLoggin().subscribe((data: any) => {
      console.log(data)
      for (const element of data) {
        console.log(element);
       
        if ((element.userName ==this.loginForm.value.userName) && (element.uPsw== this.loginForm.value.uPsw)) {
          console.log(element.userEmail);
          console.log(element.userH0odOrStaff);
          if (element.userH0odOrStaff == "HOD") {
            this.userLog = element.userH0odOrStaff
            this.authServ.userChecked(element.userH0odOrStaff)
            // this.leaveServ.userChecked(element.userH0odOrStaff)
            console.log(element.userH0odOrStaff)
            this.router.navigate(['leave'], )
            // this.router.navigate(['dashbord/leave'], )
            
          } else if(element.userH0odOrStaff == "Staff") {
            this.userLog = element
            this.authServ.userChecked(element)
            // this.leaveServ.userChecked(element)
            this.router.navigate(['leave'])
            // this.router.navigate(['dashbord/leave'])
          }

        } else {
          
          console.log('your are not register user')
        }
      }
    })
  }
  //   loginForm = this.fb.group({
  //     userName: ['', [Validators.required,]],
  //     password: ['', Validators.required],
  //   });

  //   constructor(
  //     // private authService: AuthService,
  //     // private toast: HotToastService,
  //     private router: Router,
  //     private fb: NonNullableFormBuilder,
  //     private authServ :UserAuthService
  //   ) { }

  //   ngOnInit(): void { }

  //   get userName() {
  //     return this.loginForm.get('userName');
  //   }

  //   get password() {
  //     return this.loginForm.get('password');
  //   }

  //   submit() {
  //     const { userName, password } = this.loginForm.value;
  // console.log(this.loginForm.value)
  // this.authServ.userLoggin().subscribe((data : any)=>{
  // console.log(data)
  // for (const element of data){
  //   console.log(element);

  //   if(this.loginForm.value.userName==element.userName && this.loginForm.value.password==element.uPsw){
  //     console.log(element.userEmail);
  //     console.log(element.userH0odOrStaff);
  //   }else{

  //   }
  // }
  // })

  //     if (!this.loginForm.valid || !userName || !password) {
  //       console.log(this.loginForm.value)
  //       return;
  //     }


  // this.authService
  //   .login(email, password)
  //   .pipe(
  //     this.toast.observe({
  //       success: 'Logged in successfully',
  //       loading: 'Logging in...',
  //       error: ({ message }) => `There was an error: ${message} `,
  //     })
  //   )
  //   .subscribe(() => {
  //     this.router.navigate(['/home']);
  //   });
  // }

}
