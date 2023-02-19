import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../leave.service';
import { FormBuilder } from "@angular/forms"
import { map, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaveForm: FormGroup | any;
  staffData: any;
  user: any;
  getHOD = false;
  getStaff = false;
  staffFullDAta: any;
  allDataForHod: any;
  flag: any;
  flagForButton = false;
  idForButton: any;
  dataForStaff: any=[];
  approvedLeave: any = 0;
  rejectLeave: any = 0;
  totleLeave: any;
  constructor(private leaveServ: LeaveService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required),
      resion: this.fb.control('', Validators.required),
      numOfDay: this.fb.control('1'),
      leaveStatus: this.fb.control('Pending'),
      flag: this.fb.control(true)
    })
    console.log(this.leaveServ.forwordUserToComponent())
//for calculet leaves day
setTimeout(()=>{
  this.leavesDay()
},5000)

    // cheack user HOD or Staff
    this.user = this.leaveServ.forwordUserToComponent()
    if (this.user == 'HOD') {
      this.getHOD = !this.getHOD
    } else {
      this.staffData = this.user
      setTimeout(() => {

        this.getStaff = true
      }, 3000)
      // console.log(this.user.userEmail)


    }

    //data get for sttaf 
    this.dataGetForStaff()


    //get data for hod 

    this.dataGetFroHOD()


  }

  //data get for HOD from DB
  dataGetFroHOD() {
    this.leaveServ.getAllLeaveDataFromDb().pipe(map((data: any) => {
      console.log(data)
      const stdArr = [];
      for (let std in data) {
        stdArr.push({ ...data[std], id: std })
      }
      console.log(stdArr)
      return stdArr
    })).subscribe((dataForHOD: any) => {
      console.log(dataForHOD)
      this.allDataForHod = dataForHOD
    })
  }
  //data get for staff from DB
  dataGetForStaff() {
    this.leaveServ.getAllDataForSttaf().pipe(map((data: any) => {
      const stdArr = [];
      for (let std in data) {
        stdArr.push({ ...data[std], id: std })
      }
      console.log(stdArr)
      return stdArr
    })).subscribe((staffDataCard: any) => {
      console.log(staffDataCard)

      for (let card of staffDataCard) {
        console.log(staffDataCard)
        console.log(card)
        if (this.staffData.userEmail == card.userEmail) {
          console.log(card)
          // this.dataForStaff=[...card]
          this.dataForStaff.push(card)
          console.log(this.dataForStaff)
          
        }
      }
    })

  }
//for calculet leaves day
leavesDay(){
  console.log("this is card",this.dataForStaff)
  for(let card of this.dataForStaff){
    console.log("this is card",card)
    
    if (card.leaveStatus == 'reject') {
          console.log('reject', card.numOfDay)
        
          this.rejectLeave += card.numOfDay
  
        } else if (card.leaveStatus == 'approve') {
          console.log('approve', card.numOfDay)
  
          this.approvedLeave += card.numOfDay
        }
  }
}
  //staff Apply or leave 
  applyForLeave() {
    console.log(this.leaveForm.value)
    console.log(this.leaveForm.value.from)
    console.log(this.leaveForm.value.to)
    console.log(this.staffData)
    const from = Number(this.leaveForm.value.from.slice(8))
    const to = Number(this.leaveForm.value.to.slice(8))
    const day = this.leaveForm.value.to.slice(8) - this.leaveForm.value.from.slice(8)
    Number(day)
    console.log(day)
    console.log(Number(this.leaveForm.value.numOfDay) + day)
    this.leaveForm.value.numOfDay = Number(this.leaveForm.value.numOfDay) + day
    this.staffFullDAta = {
      ...this.leaveForm.value,
      ...this.staffData
    }
    console.log(this.staffFullDAta)
    this.dataForStaff.push(this.staffFullDAta)
    this.leaveServ.sendDataFromDb(this.staffFullDAta).subscribe((data: any) => {
      console.log(data)
    })
    // this.dataGetForStaff()
  }
  //Hod Leave reject od appro
  statuForLeave(card: any, status: any) {
    const id = card.id
    const val = {
      leaveStatus: status
    }
    this.leaveServ.updateStatusFromHOD(id, val).subscribe((val: any) => {
      console.log(val)
    })
    console.log(card)
    setTimeout(()=>{
      this.dataGetFroHOD()
    },2000)
    if (status == 'approve') {
      this.flag = 'approve'
      this.flagForButton = true
      card.flag = false
      card.leaveStatus = 'Approve'
    } else {
      this.flag = 'reject'
      this.flagForButton = true
      card.flag = false
      card.leaveStatus = 'Reject'
    }
    
  }

}
