import { Toast, ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private customerService:CustomerService,private toastrService:ToastrService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.customerService.isCustomer() === true) {
      
      return true;  
    }
    this.toastrService.warning("Bu menuye gelebilmek icin sirket hesabi acmaniz gerekmektedir.");
    this.router.navigateByUrl("profile/" + localStorage.getItem("User"));
    return false;
  }
  
}
