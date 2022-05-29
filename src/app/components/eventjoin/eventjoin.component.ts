import { AuthService } from './../../services/auth.service';
import { JoinEvent } from './../../models/joinEvent';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventJoinService } from 'src/app/services/event-join.service';

@Component({
  selector: 'app-eventjoin',
  templateUrl: './eventjoin.component.html',
  styleUrls: ['./eventjoin.component.css']
})
export class EventjoinComponent implements OnInit {
  joinEventForm:FormGroup;
  eventid:number;
  isLogged:boolean = false;
  constructor(private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private toastr:ToastrService,private eventJoinService:EventJoinService,private authService:AuthService) { }

  ngOnInit(): void {
    this.createJoinEventForm();
    this.activatedRoute.params.subscribe(params=>{
      this.eventid = params["eventId"];
      this.joinEventForm.controls["eventId"].setValue(this.eventid);
    });
    this.isLogged = this.authService.isLogged();

  }
  createJoinEventForm(){
    this.joinEventForm = this.formBuilder.group({
      eventId:["",Validators.required],
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      email:["",Validators.required],
      code:"",
      joinDate:new Date(),
    })
  }
  joinEvent(){
    if(this.joinEventForm.valid){
      this.joinEventForm.controls["eventId"].setValue(parseInt(this.joinEventForm.controls["eventId"].value));
      let joinEventValues:JoinEvent = Object.assign({},this.joinEventForm.value);
      console.log(joinEventValues);
      this.eventJoinService.joinEvent(joinEventValues).subscribe(response=>{
        console.log(response);
        if(response.success){
          response.message != null ? this.toastr.success(response.message) : this.toastr.success("Etkinliğe başarılı bir şekilde katıldınız");
        }else{
          response.message != null ? this.toastr.error(response.message) : this.toastr.error("Etkinliğe katılma isteğiniz başarısız oldu");
        }
      },error=>{
        console.log(error);
        this.toastr.error("Hata oluştu");
      });
    }else{
      this.toastr.error("Form bilgilerini kontrol edin");
    }

  }
  useAccountInfo(){
    this.joinEventForm.controls["firstname"].setValue(localStorage.getItem("firstname"));
    this.joinEventForm.controls["lastname"].setValue(localStorage.getItem("lastname"));
    this.joinEventForm.controls["email"].setValue(localStorage.getItem("email"));
  }

}
