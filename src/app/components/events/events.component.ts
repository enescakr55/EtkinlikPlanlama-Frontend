import { LocalStorageService } from './../../services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EventFilterPipe } from 'src/app/pipes/event-filter.pipe';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  isLogged:boolean;
  pageTitle:string = "";
  eventList:Event[];
  isMyEvents:boolean = false;
  address:string;
  me:number;
  isOnlineFilter:boolean|null = null;
  constructor(private eventService:EventService,private toastr:ToastrService,private activatedRoute:ActivatedRoute,private authService:AuthService,private localStorageService:LocalStorageService) { }

  isloggedIn(){
    this.isLogged = this.authService.isLogged();
  }
  getEventsForOneWeek(){
    this.eventList = undefined;
    this.isMyEvents = false;
    this.pageTitle = "Yakında Gerçekleşecek Etkinlikler";
    this.eventService.getEventsForThisWeek().subscribe((response)=>{
      response.data.forEach(element => {
        element.date = new Date(element.date);
        element.date = new Date(element.date.getTime()-element.date.getTimezoneOffset() * 60000);
      });
      this.eventList = response.data;
    },error=>{
      error.error.message != null ? this.toastr.error(error.error.message) : this.toastr.error("Bir hata oluştu");
    });
  }
  getEventsForOneMonth(){
    this.eventList = undefined;
    this.isMyEvents = false;
    this.pageTitle = "30 Gün İçinde Gerçekleşecek Etkinlikler";
    this.eventService.getEventsForThisMonth().subscribe((response)=>{
      response.data.forEach(element => {
        element.date = new Date(element.date);
        element.date = new Date(element.date.getTime()-element.date.getTimezoneOffset() * 60000);
      });
      this.eventList = response.data;
    },error=>{
      error.error.message != null ? this.toastr.error(error.error.message) : this.toastr.error("Bir hata oluştu");
    }
      );
  }
  getPublicEvents(){
    this.eventList = undefined;
    this.isMyEvents = false;
    this.pageTitle = "Herkese Açık Etkinlikler";
    this.eventService.getPublicEvents().subscribe(
      (events)=>{
         events.data.forEach(element => {
          element.date = new Date(element.date);
          element.date = new Date(element.date.getTime()-element.date.getTimezoneOffset() * 60000)
          if(element.endDate != null){
            element.endDate = new Date(element.endDate);
            element.endDate = new Date(element.endDate.getTime()-element.endDate.getTimezoneOffset() * 60000);
          }
          console.log(element.date.getTimezoneOffset())
        })
        this.eventList = events.data;
      },
      (error)=>{
        error.error.message != null ? this.toastr.error(error.error.message) : this.toastr.error("Bir hata oluştu");
      }
    )
  }
  myEvents(){
    this.isMyEvents = true;
    this.pageTitle = "Etkinliklerim";
    this.eventService.myEvents().subscribe(
      (events)=>{
        events.data.forEach(element => {
          element.date = new Date(element.date);
        })
        this.eventList = events.data;
      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }
  ngOnInit(): void {
    if(this.localStorageService.getItem("userId") != null){
      this.me = parseInt(this.localStorageService.getItem("userId"));
    }else{
      this.me = null;
    }
    this.activatedRoute.params.subscribe(params=>{
      if(params["type"] == "public"){
        this.getPublicEvents();
      }else if(params["type"] == "myevents"){
        this.myEvents();
      }else{
        this.getPublicEvents();
      }
    })
    this.isloggedIn();
  }
  getAddress(event:Event){
    this.address = event.eventAddress;
  }
  deleteEvent(eventId:number){
    this.eventService.deleteEvent(eventId).subscribe(
      (response)=>{
        response.success ? this.toastr.success(response.message) : this.toastr.error(response.message);
        this.activatedRoute.params.subscribe(params=>{
          params["type"] == "myevents" ? this.myEvents() : this.getPublicEvents();
        })
      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }
  setOnlineFilter(type:boolean|null){
    this.isOnlineFilter = type;
  }

}
