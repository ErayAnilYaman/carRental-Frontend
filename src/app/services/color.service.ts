import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import ResponseModel from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44318/api/colors/"
  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getall");
  }
  update(color:Color):Observable<ResponseModel>{
    let path = this.apiUrl +"update";
    return this.httpClient.post<ResponseModel>(path,color);
  }
  add(color:Color):Observable<ResponseModel>{
    let path = this.apiUrl +"add";
    return this.httpClient.post<ResponseModel>(path,color);
  }
  delete(color:Color):Observable<ResponseModel>{
    let path = this.apiUrl +"delete";
    return this.httpClient.post<ResponseModel>(path,color);
  }
  deleteById(id:number):Observable<ResponseModel>{
    let path = this.apiUrl +"deletebyid?id=" + id;
    return this.httpClient.post<ResponseModel>(path,id);
  }

}


