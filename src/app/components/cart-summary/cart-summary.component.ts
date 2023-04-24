import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CartItems } from 'src/app/models/cartItems';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  constructor(private cartItemService:CartItemService,
    private toastrService:ToastrService){
  }
  ngOnInit(): void {
    this.listCart()
  }
  cartItems:CartItem[]=[]

  listCart(){
    this.cartItems =  this.cartItemService.listCart();
  }
  removeFromCart(carDetail:CarDetail){
  this.cartItemService.deleteToCart(carDetail);
  this.toastrService.error("Araba Sepetten Kaldirildi",carDetail.description + " Sepetten Kaldirildi")
  }
  reduceFromCart(carDetail:CarDetail){
    this.cartItemService.reduceFromCart(carDetail);
    this.toastrService.error("Urun sayisi 1 azaltildi",carDetail.description + " Urunun sayisi azaltildi")
  }

}
