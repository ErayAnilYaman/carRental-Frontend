import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseModule } from '../models/carResponseModule';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44318/api/cars/getcardetails"
  
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<CarResponseModule>{
    return this.httpClient.get<CarResponseModule>(this.apiUrl);
  }

}
