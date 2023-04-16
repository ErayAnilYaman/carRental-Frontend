
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponseModule } from '../models/brandResponeModule';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44318/api/brands/getall"

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<BrandResponseModule>{
    return this.httpClient.get<BrandResponseModule>(this.apiUrl);
  }
}
