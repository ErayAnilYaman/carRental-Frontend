import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerResponseModule } from '../models/customerResponseModule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  
  apiUrl = "https://localhost:44318/api/customers/getall"
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<CustomerResponseModule>{
    return this.httpClient.get<CustomerResponseModule>(this.apiUrl);
  }


}
