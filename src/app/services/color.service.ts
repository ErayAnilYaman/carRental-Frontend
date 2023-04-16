import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColorResponseModule } from '../models/colorResponseModule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44318/api/colors/getall"
  constructor(private httpClient:HttpClient) { }


  getColors():Observable<ColorResponseModule>{
    return this.httpClient.get<ColorResponseModule>(this.apiUrl);
  }
}
