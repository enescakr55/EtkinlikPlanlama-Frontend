import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpcomingEventService {

  constructor(private httpClient:HttpClient) { }
  getEventsForTomorrow(){
    return this.httpClient.get(environment.apiUrl+"upcomingevents/GetEventsForTomorrow");
  }
}
