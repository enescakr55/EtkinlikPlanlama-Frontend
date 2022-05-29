import { LocalStorageService } from './local-storage.service';
import { LoginDto } from './../models/loginDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responseModel';
import { ShowLogin } from '../models/showLogin';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }
  login(logininfo:LoginDto):Observable<SingleResponseModel<ShowLogin>>{
    return this.httpClient.post<SingleResponseModel<ShowLogin>>(environment.apiUrl+'auth/login',logininfo);
  }
  renewToken():Observable<SingleResponseModel<ShowLogin>>{
    return this.httpClient.get<SingleResponseModel<ShowLogin>>(environment.apiUrl+'auth/renewToken');
  }
  isLogged(){
    if(this.localStorageService.getItem("expiration")!=null){
      var expiration:Date = new Date(this.localStorageService.getItem("expiration"));
      var date:Date = new Date();
      if(date.getTime() < expiration.getTime()){
        return true;
      }
    }
    this.logout();
    return false;
  }
  logout(){
    this.localStorageService.removeItem("expiration");
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("firstname");
    this.localStorageService.removeItem("lastname");
    this.localStorageService.removeItem("email");
    this.localStorageService.removeItem("userId");
  }
}
