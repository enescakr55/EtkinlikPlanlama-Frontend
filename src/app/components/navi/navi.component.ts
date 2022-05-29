import { AuthService } from './../../services/auth.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private localStorageService:LocalStorageService,private authService:AuthService,private router:Router) { }
  date:Date;
  renewSystem:any;
  isLogged:boolean;
  userFullname:string;
  ngOnInit(): void {
    setInterval(()=>this.isLoggedUpdate(),1000);
    this.date = new Date(this.localStorageService.getItem("expiration"));
    console.log(this.date.getHours());
    this.renewSystem = setInterval(()=>{

    });
    this.router.events.subscribe((event:NavigationEnd)=>{
      if(event instanceof NavigationEnd){
      let urlList:string[] = event.url.split("/");
      console.log(urlList[1]);
      }
    });
  }
  isLoggedUpdate(){
    this.isLogged = this.authService.isLogged();
    if(this.isLogged){
      this.userFullname = this.localStorageService.getItem("firstname") + " " + this.localStorageService.getItem("lastname");
    }
  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
