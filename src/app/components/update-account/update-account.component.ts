import { LocalStorageService } from './../../services/local-storage.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from './../../models/userModel';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private userService:UserService,private toastr:ToastrService,private authService:AuthService,private localStorageService:LocalStorageService) { }
  userForm:FormGroup;
  user:UserModel;
  emailHash:string;
  ngOnInit(): void {
    this.getMe();
    this.createUserForm();
  }
  renewToken(){
    this.authService.renewToken().subscribe(
      (response)=>{
        //this.toastr.success("Token başarıyla yenilendi");
        if(response.data.token != null){
          this.authService.logout();
          console.log(response);
          this.localStorageService.setItem("email",response.data.email);
          this.localStorageService.setItem("lastname",response.data.lastname);
          this.localStorageService.setItem("firstname",response.data.firstname);
          this.localStorageService.setItem("token",response.data.token);
          this.localStorageService.setItem("expiration",response.data.tokenExpiration.toString());
          this.localStorageService.setItem("userId",response.data.userId.toString());
        }

      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }
  createUserForm(){
    this.userForm = this.formBuilder.group({
      firstname : ["",Validators.required],
      lastname : ["",Validators.required],
      email : ["",[Validators.required,Validators.email]],
      password:"00000000"
    })
  }
  updateAccount(){
    if(this.userForm.valid){
      this.user = Object.assign({},this.userForm.value);
      this.userService.updateAccount(this.user).subscribe(response=>{
        response.success ? this.toastr.success(response.message) : this.toastr.error(response.message);
        this.renewToken();
        this.getMe();
      },error=>{
        this.toastr.error(error.error.message);
        this.getMe();
      })
    }

  }
  getMe(){
    this.userService.getMe().subscribe(
      (response)=>{
        this.user = response.data;
        this.userForm.controls.firstname.setValue(this.user.firstname);
        this.userForm.controls.lastname.setValue(this.user.lastname);
        this.userForm.controls.email.setValue(this.user.email);
        this.emailHash = Md5.hashStr(this.user.email.toLocaleLowerCase());
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  resendMail(){
    this.userService.resendMail().subscribe(
      (response)=>{
        this.toastr.success("Doğrulama maili başarıyla gönderildi");
      },
      (error)=>{
        this.toastr.error(error.error.message);
      }
    )
  }

}
