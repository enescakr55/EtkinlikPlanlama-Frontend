import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { EventRepeat } from '../models/eventRepeat';

@Injectable({
  providedIn: 'root'
})
export class EventRepeatService {

  constructor(private httpClient:HttpClient) { }
  getEventRepeatsByEventId(eventId:number):Observable<ListResponseModel<EventRepeat>>{
    return this.httpClient.get<ListResponseModel<EventRepeat>>("/api/eventrepeats/getbyeventid?eventId="+eventId);
  }
}
