import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import ResponseModel from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44318/api/rentals/"
  
  constructor(private httpClient:HttpClient) { }
  
  getAll():Observable<ListResponseModel<Rental>>{
    let path = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Rental>>(path);
  }
  getRentalDtos():Observable<ListResponseModel<Rental>>{
    let getRentalsPath = this.apiUrl + "getrentaldto"
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }
  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let getRentalByCarIdPath = this.apiUrl + "getrentaldtobycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(getRentalByCarIdPath);
  }
  add(rental:Rental):Observable<ResponseModel>{
    let addRentalPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(addRentalPath,rental);
  }
  getRentalById(id:number):Observable<SingleResponseModel<Rental>>{
    let path = this.apiUrl + "getbyid?id=" + id;
    return  this.httpClient.get<SingleResponseModel<Rental>>(path);
  }
}
