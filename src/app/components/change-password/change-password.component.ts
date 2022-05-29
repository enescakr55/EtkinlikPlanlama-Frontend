import { ChangePasswordDto } from './../../models/changePasswordDto';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  changePasswordForm: FormGroup;
  ngOnInit(): void {
    this.createChangePasswordForm();
  }
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  changePassword() {
    if (
      this.changePasswordForm.controls.newPassword.value ==
      this.changePasswordForm.controls.confirmPassword.value
    ) {
      if (this.changePasswordForm.valid) {
        let changePassword: ChangePasswordDto = Object.assign(
          {},
          this.changePasswordForm.value
        );
        this.userService.changePassword(changePassword).subscribe(
          (response) => {
            response.success
              ? this.toastr.success(response.message)
              : this.toastr.error(response.message);
              this.changePasswordForm.reset();
            },
          (error) => {

                    if(error.error.data != null){
          error.error.data.forEach(element => {
            this.toastr.info(element);
          });
        }else{
          this.toastr.info(error.error.message);
        }
          }
        );
      }
    }else{
      this.toastr.error("Lütfen yeni şifre ve yeni şifre tekrar kısımlarını kontrol ediniz");
    }
  }
}
