import { JoinEvent } from './../../models/joinEvent';
import { EventJoinService } from 'src/app/services/event-join.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvitationService } from 'src/app/services/invitation.service';
import { Component, OnInit } from '@angular/core';
import { InvitationInfoDto } from 'src/app/models/invitationInfoDto';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(private invitationService:InvitationService,private toastr:ToastrService,private activatedRoute:ActivatedRoute,private eventJoinService:EventJoinService) { }
  InvitationInfos:InvitationInfoDto[];
  JoinedUsers:JoinEvent[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getInvitationInfos(params["eventId"]);
      this.getEventJoins(params["eventId"]);
    })
  }
  getInvitationInfos(eventId:number){
    this.invitationService.getInvitationInfosByEventId(eventId).subscribe(
      (response)=>{
        this.InvitationInfos = response.data;
        console.log(this.InvitationInfos);
      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }
  getEventJoins(eventId:number){
    this.eventJoinService.getEventJoinsByEventId(eventId).subscribe(
      (response)=>{
        this.JoinedUsers = response.data;
        this.JoinedUsers.forEach(element => {
          element.joinDate = new Date(element.joinDate);
          element.joinDate = new Date(element.joinDate.getTime()-element.joinDate.getTimezoneOffset() * 60000);
        });
      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }


}
