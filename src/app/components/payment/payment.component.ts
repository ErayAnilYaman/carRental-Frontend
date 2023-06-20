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
import { timeout, timer } from 'rxjs';

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
  exYear : string;
  exMonth : string;
  creditDate : string;
  carId: number;
  dataLoaded = false;
  payToDelete: Pay;
  creditCardForm: FormGroup;
  cardUpdateForm: FormGroup;
  userId: number;
  cardList: Pay[];
  selectedUser: User;
  selectedPayment: Pay;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(localStorage.getItem('User'));
      if (params['carId']) {
        this.carId = params['carId'];
        this.createCreditCardForm();
        this.listCardsByUserId(this.userId);
      } else {
        this.listCardsByUserId(this.userId);
      }
    });
  }
  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvc: ['', Validators.required],
      status:['',Validators.required],
      exDate:['',Validators.required],
    });
  }
  
  
  add() {
    this.creditDate = this.exMonth + "/" + this.exYear;
    console.log(this.creditDate);
    this.creditCardForm.controls['exDate'].setValue(this.creditDate);
    this.creditCardForm.controls['userId'].setValue(this.userId);
    this.checkStatus();
    console.log(this.creditCardForm.controls['status'].value);
    
    if (this.creditCardForm.valid) {
      let cardModel = Object.assign({}, this.creditCardForm.value);
      this.paymentService.add(cardModel).subscribe(
        (response) => {
          this.toastrService.success('Arac kiralandi');
          this.toastrService.success(response.message);
          this.router.navigate([""]);
        },
        (responseError) => {
          // for (let i = 0; i < responseError.error.Errors.length; i++) {
          //   const element = responseError.error.Errors[i].ErrorMessage;
          //   this.toastrService.warning(element);
          // }
          console.log(responseError.error);
          this.toastrService.error(responseError.error)
        }
      );
    } else {
      this.toastrService.warning('Formu doldurunuz!');
    }
  }
  checkStatus(){
    let status = this.creditCardForm.controls['status'];
    if (!status.value) {
      status.setValue(false);
      console.log(status.value)
    } 
  }
  deleteById(id: number) {
    this.paymentService.getPayById(id).subscribe(
      (res) => {
        this.payToDelete = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    if (this.payToDelete == null) {
      this.paymentService.delete(id).subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error, 'Kredi karti silinemedi!');
        },
      });
    } else {
      this.toastrService.warning('Gecersiz Kredi Karti!');
    }
  }
 
  listCardsByUserId(userId: number) {
    this.paymentService.listByUserId(userId).subscribe(
      (response) => {
        this.cardList = response.data;
      },
      (error) => {
        console.log(error);

      }
    );
  }
  payCard(id:number){
    // this.paymentService.getPayById(id).subscribe((res)=>{
    //   this.selectedPayment = res.data;
    // },(err)=>{
    //   this.toastrService.error(err.message)
    //   console.log(err);
    // });
    
    this.selectedPayment = this.cardList.find(c=>c.id === id);

    this.toastrService.success("Odeme Alindi","Odeme alinan kart numarasi :" +this.selectedPayment.cardNumber )
    this.router.navigate([""]);
  }
  getUserById() {
    this.userService.getUserById(this.userId).subscribe((response) => {
      this.selectedUser = response.data;
    },(err)=>{
      this.toastrService.error(err.message);
      console.log(err);
    });
  }
}
