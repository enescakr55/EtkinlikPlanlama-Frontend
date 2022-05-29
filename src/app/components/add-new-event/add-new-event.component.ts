import { ToastrService } from 'ngx-toastr';
import { EventService } from './../../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private eventService:EventService,private toastrService:ToastrService) { }
  addNewEventForm:FormGroup;
  creating:boolean = false;
  eventCreated:boolean = false;
  ngOnInit(): void {
    this.createAddNewEventForm();
  }
  createAddNewEventForm(){
    this.addNewEventForm = this.formBuilder.group({
      eventName:["",Validators.required],
      eventDescription:["",Validators.required],
      eventdate:["",Validators.required],
      eventtime:["",Validators.required],
      endtime:[""],
      isPrivate:false,
      isOnline:false,
      eventAddress:["",Validators.required],
    })
  }
  addNewEvent(){
    if(this.addNewEventForm.valid){
      this.creating = true;
      let eventFormModel:any = Object.assign({},this.addNewEventForm.value);
      var date:Date = new Date(eventFormModel.eventdate);
      var time = eventFormModel.eventtime.split(":");
      var endtime = eventFormModel.endtime.split(":");
      console.log(time);
      console.log(endtime)
      var datetime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),time[0],time[1]);
      var endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),endtime[0],endtime[1]);
      var eventModel:Event = {
        eventId:0,
        eventOwner:0,
        eventName:eventFormModel.eventName,
        eventDescription:eventFormModel.eventDescription,
        date:datetime,
        endDate:endDate,
        isPrivate:eventFormModel.isPrivate,
        isOnline:eventFormModel.isOnline,
        eventAddress:eventFormModel.eventAddress,
      };
      this.eventService.addNewEvent(eventModel).subscribe(
        (data)=>{
          if(data.success){
            this.clearForm();
            this.toastrService.success(data.message);
            this.eventCreated = true;

          }else{
            this.toastrService.error(data.message);
          }
          this.creating = false;

        },error=>{
          this.toastrService.error("Hata oluştu");
          this.clearForm();
          this.creating = false;
        });
    }else{
      this.creating = false;
      this.toastrService.error("Form bilgilerini kontrol edin")
    }
  }
  clearForm(){
    this.addNewEventForm.reset();
  }
  createNewEvent(){
    this.eventCreated = false;
  }
}
