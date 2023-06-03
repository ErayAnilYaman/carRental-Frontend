
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BrandAddComponent } from '../components/add/brand-add/brand-add.component';
import ResponseModel from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44318/api/brands/"

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl + "getall");
  }
  getBrandById(id:number):Observable<SingleResponseModel<Brand>>{
    let path = this.apiUrl + "getbrandbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(path);
  }
  add(brand:Brand):Observable<ResponseModel>{
    let addPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(addPath,brand);
  }
  update(brand:Brand):Observable<ResponseModel>{
    let updatePath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(updatePath,brand);
  }
  delete(brand:Brand):Observable<ResponseModel>{
    let deletePath = this.apiUrl + "delete";
    return this.httpClient.post<ResponseModel>(deletePath,brand);
  }
  
}
