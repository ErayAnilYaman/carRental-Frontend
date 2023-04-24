import { CarDetail } from './../models/carDetail';
import { ToastrModule } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor() { }

  listCart():CartItem[]{
    return CartItems;
  }
  addToCart(carDetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId === carDetail.carId)
    if (item) {
      item.quantity +=1
    }
    else{
      let cartItem = new CartItem()
      cartItem.carDetail = carDetail
      cartItem.quantity = 1
      CartItems.push(cartItem);
    }
  }
  deleteToCart(carDetail:CarDetail){
    let itemToDelete = CartItems.find(c=>c.carDetail.carId === carDetail.carId)
    if (itemToDelete) {
      CartItems.splice(CartItems.indexOf(itemToDelete),1)
    }
  }
  reduceFromCart(carDetail:CarDetail){
    let itemToReduce = CartItems.find(c=>c.carDetail.carId === carDetail.carId);
    if(itemToReduce.quantity === 1){
      CartItems.splice(CartItems.indexOf(itemToReduce),1);
    }
    else{
      itemToReduce.quantity -= 1;
    }
  }
}
