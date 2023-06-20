import { CarUpdateComponent } from './../car-update/car-update.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
  cardUpdateForm:FormGroup;
  exYear:string
  exMonth:string;
  userId:number;
  paymentId:number;
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private paymentService:PaymentService,
    private router:Router
  ){
  
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["paymentId"]) {
        this.paymentId = params["paymentId"];
        this.userId = parseInt(localStorage.getItem("User"));
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
      status:["",Validators.required],
    })
  }
  update(){
    let exDate = this.exMonth + "/" + this.exYear;
    this.cardUpdateForm.controls['status'].setValue(true);
    this.cardUpdateForm.controls['exDate'].setValue(exDate);
    this.cardUpdateForm.controls['userId'].setValue(this.userId);
    this.cardUpdateForm.controls['id'].setValue(this.paymentId);
    if (this.cardUpdateForm.valid && exDate !== "" ) {
      let cardModel = Object.assign({},this.cardUpdateForm.value);
      this.paymentService.update(cardModel).subscribe((res)=>{
        this.toastrService.success(res.message);
        this.router.navigateByUrl("/payments/" + this.userId);
      },(err)=>{
        console.log(err);
      })
    }
    else{
      this.toastrService.warning("Formlari doldurunuz!");
    }
  }

}
