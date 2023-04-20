import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44318/api/cars"
  
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let getCarsLink = this.apiUrl + "/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(getCarsLink);
  }
  getCarsByColorId(id:number):Observable<ListResponseModel<Car>>{
    let getCarByColorId = this.apiUrl + "/getcarsdetailbycolorid?id=" + id
    return this.httpClient.get<ListResponseModel<Car>>(getCarByColorId)
  }
  getCarsByBrandId(id:number):Observable<ListResponseModel<Car>>{
    let getCarByBrandId = this.apiUrl + "/getcarsdetailbybrandid?id=" + id
    return this.httpClient.get<ListResponseModel<Car>>(getCarByBrandId);
  }
  getCarDetailsById(id:number):Observable<ListResponseModel<CarDetail>>{
    let getCarDetail = this.apiUrl + "/getcardetailbycarid?id="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(getCarDetail)
  }
  
}
