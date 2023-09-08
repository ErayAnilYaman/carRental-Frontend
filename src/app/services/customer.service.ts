import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import ResponseModel from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  selectedCustomer: Customer;
  apiUrl = "https://localhost:7101/api/customers/"
  constructor(private httpClient:HttpClient) { }
  list():Observable<ListResponseModel<Customer>>{
    let path = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }
  getCustomersById(id:number):Observable<SingleResponseModel<Customer>>{
    let path = this.apiUrl + "getcustomerbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Customer>>(path)
  }
  getCustomerByUserId(id:number):Observable<SingleResponseModel<Customer>>{
    let path = this.apiUrl + "getcustomersbyuserid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Customer>>(path);
  }
  
  add(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(path,customer);
  }
  update(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(path,customer);
  }
  delete(customer:Customer):Observable<ResponseModel>{
    let path = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(path,customer);
  }
  isCustomer():boolean{
    let userId = parseInt(localStorage.getItem("User"));
    this.getCustomerByUserId(userId).subscribe((res)=>{
      this.selectedCustomer = res.data
      console.log(this.selectedCustomer);
      console.log(res);
    },(err)=>{
      console.error(err);
    })
    if (this.selectedCustomer !== null) {
      return true;
    }
    return false;

  }


}
