import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import ResponseModel from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:7101/api/colors/"
  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getall");
  }
  getColorById(id:number):Observable<SingleResponseModel<Color>>{
    let path = this.apiUrl +"getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Color>>(path);
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


