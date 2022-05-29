import { ActivatedRoute } from '@angular/router';
import { Invitation } from './../../models/invitation';
import { ToastrService } from 'ngx-toastr';
import { InvitationService } from './../../services/invitation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {

  constructor(private invitationService:InvitationService,private toastrService:ToastrService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) { }
  addInvitationForm:FormGroup;
  invitating:boolean=false;
  ngOnInit(): void {
    this.createInvitationForm();
    this.activatedRoute.params.subscribe(params=>{
      this.addInvitationForm.controls.eventId.setValue(params["eventId"]);
    })

  }
  createInvitationForm(){
    this.addInvitationForm = this.formBuilder.group({
      eventId:[0,Validators.required],
      email:["",Validators.required],
      firstname:["",Validators.required],
      lastname:["",Validators.required],
    })
  }
  sendInvitation(){
    if(this.addInvitationForm.valid){
      this.invitating = true;
    let invitationModel:Invitation = Object.assign({},this.addInvitationForm.value);
    invitationModel.eventId = parseInt(invitationModel.eventId.toString());
    this.invitationService.inviteUser(invitationModel).subscribe(
      (response)=>{
        response.success ? this.toastrService.success(response.message) : this.toastrService.error(response.message);
        this.invitating = false;
        this.addInvitationForm.controls.email.setValue("");
        this.addInvitationForm.controls.firstname.setValue("");
        this.addInvitationForm.controls.lastname.setValue("");
      },
      (error)=>{
        console.log(error)
        this.toastrService.error(error.error.message);
        this.invitating = false;
      }

    )
  }else{
    this.toastrService.error("Form bilgilerini kontrol edin")
    this.invitating = false;
  }
}

}
