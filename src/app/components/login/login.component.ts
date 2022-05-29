import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading:boolean = false;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private localStorageService:LocalStorageService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();

  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    });

  }
  login(){

    console.log("Tıklandı");
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      this.loading = true;
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        console.log(response);
        if(response.success){
          this.toastrService.success(response.message);
          this.toastrService.success("Anasayfaya yönlendiriliyorsunuz");
          this.localStorageService.setItem("email",response.data.email);
          this.localStorageService.setItem("lastname",response.data.lastname);
          this.localStorageService.setItem("firstname",response.data.firstname);
          this.localStorageService.setItem("token",response.data.token);
          this.localStorageService.setItem("expiration",response.data.tokenExpiration.toString());
          this.localStorageService.setItem("userId",response.data.userId.toString());
          setTimeout(()=>{
            this.router.navigate(["/"]);

          },1000);


        }
        else{
          this.toastrService.error(response.message);
        }
        this.loading = false;
      },error=>{
        this.toastrService.info("Hata oluştu");
        this.loading = false;
      })
    }else{
      this.toastrService.error("Lütfen formu doldurunuz");
    }
  }
}
