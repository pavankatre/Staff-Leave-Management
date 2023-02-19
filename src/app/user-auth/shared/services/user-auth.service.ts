import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable(
  //   {
  //   providedIn: 'root'
  // } 
)
export class UserAuthService {
  chekedUser: any;
  firebasedDbLink: any = "https://staff-leave-management-22179-default-rtdb.firebaseio.com/user.json"
  // firebasedDbLinkForStaff: any = "https://staff-leave-management-22179-default-rtdb.firebaseio.com/Staff.json"
  constructor(private http: HttpClient) { }

  // userSignUpRequestForValdation(userData: any) {
  //   const userPayload = {
  //     email: userData.userEmail,
  //     password: userData.uPsw,
  //     returnSecureToken: true
  //   }
  //   return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTF-tQwBDjFRWyI1HfjOr3cWinQUxRz8c', userPayload)
  // }
  userSignUpRequest(data: any) {
    console.log(data)
    return this.http.post(this.firebasedDbLink, data)
  }
  //   userSignUpRequestForStaff(data : any){
  //     return this.http.post(this.firebasedDbLinkForStaff, data).pipe(map((formData : any)=>{
  // console.log(formData)
  //     }))
  //   }
  // userSignUpRequest(userData: any) {
  //   if (userData.userH0odOrStaff === 'HOD') {
  //     this.userSignUpRequestForHOD(userData)
  //   } else if (userData.userH0odOrStaff === 'Staff') {
  //    this.firebasedDbLinkForStaff(userData)
  //   }

  // }

  userLoggin() {
    return this.http.get(this.firebasedDbLink).pipe(map((logData: any) => {
      console.log(logData)
      const stdArr = [];
      for (let std in logData) {
        stdArr.push({ ...logData[std], id: std })
      }
      console.log(stdArr)
      return stdArr
      

    }))
  }
  userChecked(data:any){
    this.chekedUser=data
    console.log(data)
  }
  getDataToChekdUser(){
    console.log(this.chekedUser)
    return this.chekedUser
  }
}
