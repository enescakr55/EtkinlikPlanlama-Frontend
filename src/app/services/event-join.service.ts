import { ListResponseModel } from './../models/listResponseModel';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JoinEvent } from '../models/joinEvent';

@Injectable({
  providedIn: 'root'
})
export class EventJoinService {

  constructor(private httpClient:HttpClient) { }
  joinEvent(joinEventValues:JoinEvent):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+'eventjoin/add',joinEventValues);
  }
  getEventJoinsByEventId(eventId:number):Observable<ListResponseModel<JoinEvent>>{
    return this.httpClient.get<ListResponseModel<JoinEvent>>(environment.apiUrl+'eventjoin/geteventjoinsbyeventid?eventid='+eventId);
  }
}
