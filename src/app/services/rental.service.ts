import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentalResponseModule } from '../models/rentalResponseModule';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44318/api/rentals/getrentaldto"
  
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<RentalResponseModule>{
    return this.httpClient.get<RentalResponseModule>(this.apiUrl);
  }
}
