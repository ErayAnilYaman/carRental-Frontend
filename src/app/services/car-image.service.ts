import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl = "https://localhost:44318/api/carimages"
  constructor(private httpClient:HttpClient) { }

  getCarImagesByCarId(id:number):Observable<ListResponseModel<CarImage>>{
    let carImagesByCarId = this.apiUrl + "/getimagesbycarid?id=" + id
    return this.httpClient.get<ListResponseModel<CarImage>>(carImagesByCarId);
  }
  getCarImagesById(id:number):Observable<ListResponseModel<CarImage>>{
    let carImages = this.apiUrl + "/getbyid?id=" + id
    return this.httpClient.get<ListResponseModel<CarImage>>(carImages)
  }
  add(carImage:CarImage):Observable<SingleResponseModel<CarImage>>{
    let addImage = this.apiUrl + "/add";
    return this.httpClient.post<SingleResponseModel<CarImage>>(addImage,carImage);
  }

}
