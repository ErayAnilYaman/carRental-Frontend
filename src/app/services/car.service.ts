import { Car } from './../models/car';
import { ListResponseModel } from './../models/listResponseModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import ResponseModel from '../models/responseModel';
import { CarAddComponent } from '../components/add/car-add/car-add.component';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:7101/api/cars"
  
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let getCarsLink = this.apiUrl + "/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(getCarsLink);
  }
  getCarsByColorId(id:number):Observable<ListResponseModel<CarDetail>>{
    let getCarByColorId = this.apiUrl + "/getcarsdetailbycolorid?id=" + id
    return this.httpClient.get<ListResponseModel<CarDetail>>(getCarByColorId)
  }
  getCarsByBrandId(id:number):Observable<ListResponseModel<CarDetail>>{
    let getCarByBrandId = this.apiUrl + "/getcarsdetailbybrandid?id=" + id
    return this.httpClient.get<ListResponseModel<CarDetail>>(getCarByBrandId);
  }
  getCarDetailsById(id:number):Observable<ListResponseModel<CarDetail>>{
    let getCarDetail = this.apiUrl + "/getcardetailbyid?id="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(getCarDetail)
  }
  getCarsByCarId(id:number):Observable<SingleResponseModel<Car>>{
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl + "/getcarbyid?id=" + id)
  }
  getCars():Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "/getall" )
  }

  add(car:Car):Observable<ResponseModel>{
    let addPath = this.apiUrl + "/add"
    return this.httpClient.post<ResponseModel>(addPath,car);
  }
  update(car:Car): Observable<ResponseModel> {
    // Send an HTTP PUT request to update the car record in the database
    let updatePath = this.apiUrl + "/update"
    return this.httpClient.post<ResponseModel>(updatePath,car);
  }
  delete(car:Car):Observable<ResponseModel>{
    let deletePath = this.apiUrl + "/delete"
    return this.httpClient.post<ResponseModel>(deletePath,car);

  }
  deleteById(id:number):Observable<ResponseModel>{
    let deletePath = this.apiUrl + "/deletebyid?id=" + id;
    return this.httpClient.post<ResponseModel>(deletePath,id);
  }
    
}
