import { CarImageAddComponent } from './../add/car-image-add/car-image-add.component';
import { CarImageService } from './../../services/car-image.service';
import { CarDetail } from './../../models/carDetail';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { CarService } from 'src/app/services/car.service';
import { CartItemService } from 'src/app/services/cart-item.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CarImage } from 'src/app/models/carImage';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VatAddedPipe } from 'src/app/pipes/vat-added.pipe';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { __values } from 'tslib';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('User'));
  selectedCustomer: Customer;
  rentDate: Date;
  exYear: string;
  exMonth: string;
  rentalForm: FormGroup;
  paymentForm: FormGroup;
  dataLoaded = false;
  rentals: Rental[];
  selectedRental:Rental;
  carsDetail: CarDetail[];
  price: number;
  car: CarDetail;
  currentRental: Rental;
  currentUser: User[];
  picksUpDate: string;
  returnsDate: string;
  pickUpDate: Date;
  returnDate: Date;
  itemLoaded: boolean = false;
  imageList: CarImage[];
  selectedCarImage: CarImage;
  baseUrl = 'https://localhost:44318/Uploads/Images/';
  carId: number;
  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private carService: CarService,
    private router: Router,
    private carItemService: CartItemService,
    private userService: UserService,
    private carImageService: CarImageService,
    private paymentServive: PaymentService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.itemLoaded = true;
        this.getRentalsByCarId(params['carId']);
        this.getCarDetailsByCarId(params['carId']);
        this.createRentalForm();
        this.createPaymentForm();
        this.getCustomerByUserId(this.userId);
      } else {
        this.itemLoaded = true;
        this.getRentals();
      }
    });
  }
  consoleWrite() {
    console.log('Retn Date');
    console.log(this.rentDate);
    console.log('yazdirldi');
  }

  createRentalForm() {
    this.rentalForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: [''],
    });
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvc: ['', Validators.required],
      exDate: ['', Validators.required],
      status: [false, Validators.required],
    });
  }
  getRentals() {
    this.rentalService.getAll().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  getRentalsByCarId(carId: number) {
    this.rentalService.getRentalByCarId(carId).subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByCarId(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.carsDetail = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomerByUserId(id: number) {
    this.customerService.getCustomerByUserId(id).subscribe(
      (res) => {
        this.selectedCustomer = res.data;
        this.dataLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  post() {
    let exDate = this.exMonth + '/' + this.exYear;
    this.paymentForm.controls['userId'].setValue(
      parseInt(localStorage.getItem('User'))
    );
    console.log(exDate);
    this.paymentForm.controls['exDate'].setValue(exDate);
    this.rentalForm.controls['carId'].setValue(this.carId);
    this.rentalForm.controls['customerId'].setValue(
      this.selectedCustomer.customerId
    );
    console.log(this.rentalForm.controls['rentDate'].value);
    console.log(this.rentalForm.controls['returnDate'].value);

    if (this.rentalForm.valid && this.paymentForm.valid) {
      
      this.postRental();
    } else {
      this.toastrService.warning('Tum formlari doldurunuz!!');
    }
  }
  checkStatusAndPostPayment() {
    if (this.paymentForm.controls['status'].value === true) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      this.paymentServive.add(paymentModel).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.toastrService.error(err.message);
          console.log(err);
        }
      );
      
    } else {
      console.log('Kart kaydedilmeden islem yapiliyor...');
      this.toastrService.success('Isleminiz yapiliyor....');
      this.directMenu();
    }
  }
  postRental() {
    let rentalObject = Object.assign({}, this.rentalForm.value);
    this.rentalService.add(rentalObject).subscribe(
      (res) => {
        console.log(res);
        this.directMenu();
        this.toastrService.success('Isleminiz basarili.');
        this.toastrService.success('Kartiniz Kaydedildi.');
        this.checkStatusAndPostPayment();
      },
      (err) => {
        console.log(err);
        this.toastrService.error(err.error.message)
      }
    );
  }
  
  directMenu() {
    this.router.navigateByUrl('/');
  }
}
