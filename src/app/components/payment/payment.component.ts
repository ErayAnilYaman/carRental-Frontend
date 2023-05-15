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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentalList:Rental[]
  dataLoaded = false;
  rental:Rental;
  currentRental:Rental;
  carDetail : CarDetail;
  dailyPrice:number;
  Car:CarDetail[]
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  cardOwnerName:string;
  cardExpiration:string;
  cardCvc:string;
  constructor(private rentalService:RentalService,private activatedRoute:ActivatedRoute,
    private carService:CarService, private toastrService : ToastrService,
    private router:Router,private paymentService:PaymentService
    ){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["/payment/:carId"]){
        this.rental.carId = params["carId"]
        this.listRentalsByCarId(params["carId"])
      }
    })
    
  }
  listRentalsByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe((response)=>{
      this.rentalList = response.data
      this.dataLoaded = true
    });
  }
  
  setPrice(carId:number){
    this.carService.getCarDetailsById(carId).subscribe((response)=>{
      this.dailyPrice = response.data.find(d=>d.carId === carId).dailyPrice;
      this.dataLoaded = true;
    })

  }
  submit() {

    this.paymentService.makePay(this.cardNumber, this.cardOwnerName, this.cardCvc, this.cardExpiration)
    this.rentalService.add(this.rental)
    this.toastrService.success("Kiralama başarılı", "BASARILI")
    this.router.navigateByUrl("")
  }
}
