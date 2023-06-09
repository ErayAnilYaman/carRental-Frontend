import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import ResponseModel from '../models/responseModel';
import { map } from  'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl = "https://localhost:44318/api/carimages/"
  constructor(private httpClient:HttpClient) { }

  getCarImagesByCarId(id:number):Observable<ListResponseModel<CarImage>>{
    let carImagesByCarId = this.apiUrl + "getimagesbycarid?id=" + id
    return this.httpClient.get<ListResponseModel<CarImage>>(carImagesByCarId);
  }
  getCarImagesById(id:number):Observable<ListResponseModel<CarImage>>{
    let carImages = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<ListResponseModel<CarImage>>(carImages)
  }
  add(formData:any):Observable<ResponseModel>{
    let path = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(path,formData,{
      reportProgress : true,
    });
  }
  list():Observable<ListResponseModel<CarImage>>{
    let path = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(path);
  }

}
