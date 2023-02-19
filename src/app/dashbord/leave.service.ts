import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth/shared/services/user-auth.service';

@Injectable()
export class LeaveService {
  firebasedDbLinkForLeave: any = "https://staff-leave-management-22179-default-rtdb.firebaseio.com/leave.json"
emitData = new EventEmitter()
userData : any;
  constructor( private http : HttpClient,private authServ :UserAuthService) { }

//   userChecked(user : any){
//     console.log(user)
// this.userData=user
//   }
forwordUserToComponent(){
  console.log(this.userData)
  return this.authServ.getDataToChekdUser()
  // return this.userData
}
sendDataFromDb(data : any){
  return this.http.post(this.firebasedDbLinkForLeave,data)
}
getAllLeaveDataFromDb(){
  return this.http.get(this.firebasedDbLinkForLeave)
}
getAllDataForSttaf(){
  return this.http.get(this.firebasedDbLinkForLeave)
}
updateStatusFromHOD(id: any, value: any){
return this.http.patch(`https://staff-leave-management-22179-default-rtdb.firebaseio.com/leave/`+id+`.json`,value)
}

}
