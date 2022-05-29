import { ResponseModel } from './../models/responseModel';
import { ListResponseModel } from './../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient:HttpClient) { }
  getPublicEvents():Observable<ListResponseModel<Event>>{
    return this.httpClient.get<ListResponseModel<Event>>(environment.apiUrl+'events/public');
  }
  myEvents():Observable<ListResponseModel<Event>>{
    return this.httpClient.get<ListResponseModel<Event>>(environment.apiUrl+'events/myevents');
  }
  addNewEvent(event:Event):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+'events/addevent',event);
  }
  deleteEvent(eventId:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.apiUrl+'events/delete?eventId='+eventId);
  }
  getEventsForThisWeek():Observable<ListResponseModel<Event>>{
    return this.httpClient.get<ListResponseModel<Event>>(environment.apiUrl+'upcomingevents/GetPublicEventsForThisWeek');
  }
  getEventsForThisMonth():Observable<ListResponseModel<Event>>{
    return this.httpClient.get<ListResponseModel<Event>>(environment.apiUrl+'upcomingevents/GetPublicEventsForThisMonth');
  }
}
