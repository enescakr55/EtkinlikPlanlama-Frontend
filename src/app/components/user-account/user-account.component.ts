import { ToastrService } from 'ngx-toastr';
import { UserModel } from './../../models/userModel';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor(private userService:UserService,private toastr:ToastrService) { }
  user:UserModel;
  emailHash:string;
  sending:boolean = false;
  ngOnInit(): void {
    this.getMe();
  }
  getMe(){
    this.userService.getMe().subscribe(
      (response)=>{
        this.user = response.data;
        this.emailHash = Md5.hashStr(this.user.email.toLocaleLowerCase());
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  resendMail(){
    this.sending = true;
    this.userService.resendMail().subscribe(
      (response)=>{
        this.toastr.success("Doğrulama maili başarıyla gönderildi");
        this.sending = false;
      },
      (error)=>{
        this.toastr.error(error.error.message);
        this.sending = false;
      }
    )
  }

}
