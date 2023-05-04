import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Pay } from '../models/pay';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  {
  apiUrl = "https://localhost:44318/api/pay/"
  constructor(private httpClient:HttpClient) { }
  makePay(cardNumber:string,cardOwner:string,cardCvc:string,cardExp:string)
  :Observable<ListResponseModel<Pay>>
  {
    const payDetails: Pay = {cardNumber: cardNumber, cardOwner: cardOwner, cardCvc: cardCvc, cardExpiration: cardExp};
    return this.httpClient.post<ListResponseModel<Pay>>(this.apiUrl, payDetails);
    
  }
}
