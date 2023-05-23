import { Rental } from './../../models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { ToastrService } from 'ngx-toastr';
import { identifierName } from '@angular/compiler';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Pay } from 'src/app/models/pay';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
 
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastrService: ToastrService,
    private router: Router,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  dataLoaded = false;
  cardAddForm: FormGroup;
  userId: number;
  cardList: Pay[];
  selectedUser:User;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(localStorage.getItem("User"));
      if (params['carId']) {
        
        this.createCardAddForm();
        this.listCardsByUserId(this.userId);
        
      } else {
        this.listCardsByUserId(this.userId);
      }
    });
  }
  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      userId:['',Validators.required],
      userName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      Cvc: ['', Validators.required],
      exDate: ['', Validators.required],
    });
  }
  add(){
    
    this.cardAddForm.controls["userId"].setValue(this.userId);
    if (this.cardAddForm.valid) {
      let cardModel = Object.assign({},this.cardAddForm.value);
      this.paymentService.add(cardModel).subscribe((response)=>{
        console.log(response);

      },(responseError)=>{
        console.log(responseError);
      })
    }
    else{
      this.toastrService.warning("Formu doldurunuz!");
    }
  }
  listCardsByUserId(userId: number) {
    this.paymentService.listByUserId(userId).subscribe((response) => {
      this.cardList = response.data;
      console.log(response);
    },(error)=>{
      console.log(error);
    });
  }
  getUserById(){
    this.userService.getUserById(this.userId).subscribe((response)=>{
      this.selectedUser = response.data
    })
  }
  
  
}
