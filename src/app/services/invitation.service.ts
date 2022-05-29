import { EventInvitation } from './../models/eventInvitation';
import { Invitation } from './../models/invitation';
import { SingleResponseModel } from './../models/singleResponseModel';
import { environment } from './../../environments/environment.prod';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { ListResponseModel } from '../models/listResponseModel';
import { InvitationInfoDto } from '../models/invitationInfoDto';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private httpClient:HttpClient) { }
  acceptInvitation(code:string,message:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.apiUrl+"invitations/accept?code="+code+"&message="+message);
  }
  rejectInvitation(code:string,message:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.apiUrl+"invitations/reject?code="+code+"&message="+message);
  }
  getEventByInvitationId(code:string):Observable<SingleResponseModel<Event>>{
    return this.httpClient.get<SingleResponseModel<Event>>(environment.apiUrl+"events/geteventbyinvitationid?code="+code);
  }
  getInvitationInfosByEventId(eventId:number):Observable<ListResponseModel<InvitationInfoDto>>{
    return this.httpClient.get<ListResponseModel<InvitationInfoDto>>(environment.apiUrl+"invitations/getinvitationinfos?eventid="+eventId);
  }
  inviteUser(invitation:Invitation):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"events/invite",invitation);
  }
  getMyInvitations():Observable<ListResponseModel<EventInvitation>>{
    return this.httpClient.get<ListResponseModel<EventInvitation>>(environment.apiUrl+"invitations/getmyinvitations");
  }

}
