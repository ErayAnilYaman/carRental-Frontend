import { CarUpdateComponent } from './../car-update/car-update.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
  cardUpdateForm:FormGroup;
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder
  ){
  
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params[":paymentId"]) {
        this.createCardUpdateForm();
      }
    })
  }
  createCardUpdateForm(){
    this.cardUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      userId:["",Validators.required],
      cardNumber:["",Validators.required],
      exDate:["",Validators.required],
      username:["",Validators.required],
      cvc:["",Validators.required],
    })
  }
  update(){
    // devam edecek
  }

}
