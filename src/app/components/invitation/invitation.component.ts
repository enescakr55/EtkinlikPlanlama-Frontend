import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InvitationService } from 'src/app/services/invitation.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private invitationService:InvitationService) { }
  type:string;
  code:string;
  isAccepted:boolean;
  event:Event;
  messageForm:FormGroup;
  address:string;
  ngOnInit(): void {
    this.createMessageForm();
    this.activatedRoute.params.subscribe(params=>{
      console.log(params)
      this.type = params["type"];
      this.code = params["code"];
      if(params["type"] == "accept"){
        this.isAccepted=true;
        this.invitationService.acceptInvitation(this.code,"").subscribe(
          (response)=>{
            response.success ? this.toastrService.success(response.message) : this.toastrService.error(response.message);

          },
          (error)=>{
            this.toastrService.error(error.error.message);
          }
        )

      }else if(params["type"] == "reject"){
        this.isAccepted=false;
        this.invitationService.rejectInvitation(this.code,"").subscribe(
          (response)=>{
            response.success ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
          },
          (error)=>{
            this.toastrService.error(error.error.message);
          }
        )
      }
      this.invitationService.getEventByInvitationId(this.code).subscribe(
        (response)=>{
          this.event = response.data;
          this.event.date = new Date(this.event.date);
          this.event.date = new Date(this.event.date.getTime()-this.event.date.getTimezoneOffset() * 60000)
          console.log(this.event);
        },
        (error)=>{
          this.toastrService.error(error.error.message);
        }
      )
    });
  }
  createMessageForm(){
    this.messageForm = this.formBuilder.group({
      message:[""]
    })
  }
  updateInvitationStatus(){
    this.activatedRoute.params.subscribe(params=>{
      if(params["type"] == "accept"){
        this.invitationService.acceptInvitation(this.code,this.messageForm.value.message).subscribe(
          (response)=>{
            response.success ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
          },
          (error)=>{
            this.toastrService.error(error.error.message);
          }
        )
      }else if(params["type"] == "reject"){
        this.invitationService.rejectInvitation(this.code,this.messageForm.value.message).subscribe(
          (response)=>{
            response.success ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
          },
          (error)=>{
            this.toastrService.error(error.error.message);
          }
        )
      }
    })
  }
  getAddress(event:Event){
    this.address = event.eventAddress;
  }
}

