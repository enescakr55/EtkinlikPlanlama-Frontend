import { ChangePasswordDto } from './../models/changePasswordDto';
import { ResponseModel } from './../models/responseModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { UserModel } from './../models/userModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  register(userModel:UserModel):Observable<SingleResponseModel<UserModel>>{
    return this.httpClient.post<SingleResponseModel<UserModel>>(environment.apiUrl+"users/register",userModel);
  }
  verify(code:string):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.apiUrl+"users/verify?code="+code);
  }
  getMe():Observable<SingleResponseModel<UserModel>>{
    return this.httpClient.get<SingleResponseModel<UserModel>>(environment.apiUrl+"users/getme");
  }
  resendMail():Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(environment.apiUrl+"users/resendmail");
  }
  updateAccount(user:UserModel){
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"users/updateaccount",user);
  }
  changePassword(changePasswordDto:ChangePasswordDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"users/changepassword",changePasswordDto);
  }
}
