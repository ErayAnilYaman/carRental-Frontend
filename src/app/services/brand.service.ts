
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BrandAddComponent } from '../components/add/brand-add/brand-add.component';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44318/api/brands/"

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }
  add(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let addPath = this.apiUrl + "add"
    return this.httpClient.post<SingleResponseModel<Brand>>(addPath,brand);
  }
  update(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let updatePath = this.apiUrl + "update";
    return this.httpClient.put<SingleResponseModel<Brand>>(updatePath,brand);
  }
  delete(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let deletePath = this.apiUrl + "delete";
    return this.httpClient.post<SingleResponseModel<Brand>>(deletePath,brand);
  }
}
