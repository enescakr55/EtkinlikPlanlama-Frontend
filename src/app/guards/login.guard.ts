import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,private toastr:ToastrService,private router:Router){}
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLogged()){
      return true;
    }else{
      this.router.navigate(['/login']);
      this.toastr.error("Bu sayfayı görmek için giriş yapmalısınız.");
      return false;
    }

  }

}
