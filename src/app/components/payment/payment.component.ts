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
        this.createcreditCardForm();
        this.listCardsByUserId(this.userId);
      } else {
        this.listCardsByUserId(this.userId);
      }
    });
  }
  createcreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvc: ['', Validators.required],
      status:['',Validators.required],
      exDate:['',Validators.required],
    });
  }
  
  CheckIfPayWillAdd() {
    if (this.creditCardForm.controls['status'].value === true) {
      this.add();
    }
    else{
      this.controlCreditCard();
    }
    
  }
  add() {
    this.creditCardForm.controls['userId'].setValue(this.userId);

    if (this.creditCardForm.valid) {
      let cardModel = Object.assign({}, this.creditCardForm.value);
      this.paymentService.add(cardModel).subscribe(
        (response) => {
          this.toastrService.success('Arac kiralandi');
          this.toastrService.success(response.message);
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
 controlCreditCard(){
  this.creditCardForm.controls['status'].setValue(false);
  this.creditCardForm.controls['userId'].setValue(this.userId);
  if (this.creditCardForm.valid) {
    let input_date = this.creditCardForm.controls['exDate'].value
    this.checkExDate(input_date);
    this.toastrService.success("Islem Basarili");
  }
  else{
    this.toastrService.warning("Lutfen Formu Doldurunuz!");
  }
 }
 checkExDate(date:Date){
  let now_date =  new Date();
  console.log(now_date);
  let splitted_str_input_date = date.toString().split("T");
  console.log(splitted_str_input_date[0]);

  if (date < now_date) {
    this.toastrService.error("Kart son kullanma tarihi su andan sonra olmalidir!");
    window.location.reload();
  }
  else{

    setTimeout(function() {
      console.log("Kart BIlgileri kontrol edildi");
      }, 2000);
    
    console.log("Kart Bilgileri kontorl ediliyor..")
    
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

  getUserById() {
    this.userService.getUserById(this.userId).subscribe((response) => {
      this.selectedUser = response.data;
    });
  }
}
