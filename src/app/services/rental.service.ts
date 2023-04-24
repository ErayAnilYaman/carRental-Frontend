import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44318/api/rentals/"
  
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    let getRentalsPath = this.apiUrl + "getrentaldto"
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }
  addRental(rental:Rental):Observable<ListResponseModel<Rental>>{
    let addRentalPath = this.apiUrl + "add"
    return this.httpClient.post<ListResponseModel<Rental>>(addRentalPath,rental);
  }
  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let getRentalByCarIdPath = this.apiUrl + "getrentaldtobycarid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(getRentalByCarIdPath);
  }
}
