import { ToastrService } from 'ngx-toastr';
import { EventInvitation } from './../../models/eventInvitation';
import { InvitationService } from 'src/app/services/invitation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myinvitations',
  templateUrl: './myinvitations.component.html',
  styleUrls: ['./myinvitations.component.css']
})
export class MyinvitationsComponent implements OnInit {

  constructor(private invitationService:InvitationService,private toastrService:ToastrService) { }
  myInvitations:EventInvitation[];
  ngOnInit(): void {
    this.getMyInvitations();
  }
  getMyInvitations(){
    this.invitationService.getMyInvitations().subscribe(
      (response)=>{
        if(response.success){
          this.myInvitations = response.data;
          if(response.data != null){
            this.myInvitations.forEach(element => {
              element.eventDate = new Date(element.eventDate);
              element.eventDate = new Date(element.eventDate.getTime() - element.eventDate.getTimezoneOffset() * 60000);
            })
          }
        }else{
          response.message != null ? this.toastrService.error(response.message) : this.toastrService.error("Davetler Getirilemedi");
        }

      },error=>{
        this.toastrService.error(error.error.message);
      }
    );
  }
  accept(code:string){
    this.invitationService.acceptInvitation(code,"").subscribe(
      (response)=>{
        response.success ? this.toastrService.success("Davet Kabul Edildi") : this.toastrService.error("Davet Kabul Edilemedi");
      },error=>{
        this.toastrService.error(error.error.message);
      }
    );
  }
  reject(code:string){
    this.invitationService.rejectInvitation(code,"").subscribe(
      (response)=>{
        response.success ? this.toastrService.success("Davet Reddedildi") : this.toastrService.error("İşlem başarısız");
      },error=>{
        this.toastrService.error(error.error.message);
      }
    );
  }

}
