import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }
  verified:boolean;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      let code = params["code"];
      if(code != null && code != undefined){
        this.userService.verify(code).subscribe(
          (response)=>{
            response.success ? this.verified=true : this.verified=false;
          },(error)=>{
            this.verified=false;
            this.toastrService.error("Hesap doğrulanamadı");
          }
        )
      }
    })
  }

}
