import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl = "https://localhost:44318/api/carimages"
  constructor(private httpClient:HttpClient) { }

  getCarImagesById(id:number):Observable<ListResponseModel<CarImage>>{
    let carImages = this.apiUrl + "/getbyid?id=" + id
    return this.httpClient.get<ListResponseModel<CarImage>>(carImages)
  }

}