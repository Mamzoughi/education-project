import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  connnectedUser:any;
  constructor(private router:Router){}
  canActivate(
   route: ActivatedRouteSnapshot, 
   state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
    if(this.isLoged){
     this.connnectedUser=JSON.parse(localStorage.getItem("connectedUser"));
     alert(this.connnectedUser.role)
        if (this.connnectedUser.role =="Student"){
       return true; 
         }
        else {alert ("You Are not authorized to access")};
    }
    else{
     this.router.navigate(['/login']);
     return false;
    }
   }
     
   
   isLoged(){
     this.connnectedUser=JSON.parse(localStorage.getItem("connectedUser"));
      if (this.connnectedUser){ return true}
      else return false;
   }
}
