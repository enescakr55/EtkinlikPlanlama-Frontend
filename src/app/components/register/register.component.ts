import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private userService:UserService,private toastr:ToastrService,private router:Router) { }
  loading:boolean = false;
  registerForm:FormGroup;
  ngOnInit(): void {
    this.createRegisterForm();

  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstname:["",Validators.required],
      lastname:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
  }
  register(){
    if(this.registerForm.valid){
      this.loading=true;
      let registerModel = Object.assign({},this.registerForm.value);
      this.userService.register(registerModel).subscribe(response=>{
        if(response.success){
          this.toastr.success(response.message);
          this.toastr.success("Giriş sayfasına yönlendiriliyorsunuz");
          this.registerForm.reset();
          setTimeout(()=>{
            this.router.navigate(["/login"]);
          },1000);
        }
        else{
          if(response.message != null){
            this.toastr.error(response.message);
          }else{
            this.toastr.error("Bir hata oluştu");
          }

        }
        this.loading=false;
      },error=>{
        console.log(error);
        if(error.error.data != null){
          error.error.data.forEach(element => {
            this.toastr.info(element);
          });
        }else{
          this.toastr.info(error.error.message);
        }

        this.loading=false;
      })
    }
  }

}
