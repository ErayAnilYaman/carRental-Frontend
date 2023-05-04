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

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  dataLoaded = false;
  rentals:Rental[] = [];
  carsDetail:CarDetail[] = []
  price : number
  car:CarDetail
  currentRental:Rental;
  currentUser:User[] = [];
  picksUpDate: string;
  returnsDate: string;
  pickUpDate:Date;
  returnDate:Date;
  
  baseUrl = "https://localhost:44318/Uploads/Images/"



  constructor(private rentalService:RentalService,private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,private carService:CarService,private router:Router,
    private carItemService:CartItemService,private userService:UserService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["carId"]) {
        this.getRentalsByCarId(params["carId"])
        this.getCarDetailsByCarId(params["carId"])
        this.getUserByCarId(params["carId"])
      }
      else{
        this.getRentals();
      }
    }
    )
  }
  
  getRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentals = response.data
      this.dataLoaded = true
    })
  }
  getRentalsByCarId(carId:number){
    this.rentalService.getRentalByCarId(carId).subscribe((response)=>{
      this.rentals = response.data
      this.dataLoaded = true;
    })
  }
  getCarDetailsByCarId(id:number){
    this.carService.getCarDetailsById(id).subscribe((response)=>{
      this.carsDetail = response.data
      this.dataLoaded = true;

    })
  }
  getUserByCarId(carId:number){
    this.userService.getUserByCarId(carId).subscribe((response)=>{
      this.currentUser = response.data
      this.dataLoaded = true;
    })
  }
  checkValuesAndGetPay(carId:number) {
    this.rentalService.getRentalByCarId(carId).subscribe((response)=>{
        this.rentals = response.data;
    
      if (this.rentals.length == 0){
        this.router.navigateByUrl('/payment/' + carId);
      }
      else{
        this.getCheckRental(carId);
      }
    })
    
  }
  checkReturnDate() {
    let diffInDays: number = this.calculateDayDiffrence(this.returnsDate, this.picksUpDate)
    if (diffInDays < 0) {
      this.returnDate = this.pickUpDate;
      this.toastrService.error("Teslim tarihi kiralama tarihinden önce olamaz", "HATA")
      diffInDays = 1
    }
    if (diffInDays == 0) {
      diffInDays++;
    }
    this.priceCalculate(diffInDays)
  }
  
  getCheckRental(carId: number)  {
    this.rentals.map(value => {
        const diff = this.calculateDayDiffrence(value.returnDate.toString().substring(0, value.returnDate.toString().length - 9),this.picksUpDate)
        if (value.returnDate == null || diff > 0) {
          this.toastrService.error("Bu araç şuan kiralamada", "HATA")
          this.router.navigateByUrl('/rental/' + carId);
          return ;
        } else {
          this.router.navigateByUrl('/payment/' + carId);
          
        }
      }
    )
    

  }
  calculateDayDiffrence(dateForReturn: string, dateForPickUp: string) {
    const dateForReturnMS = this.convertToMs(dateForReturn)
    const dateForPickUpMS = this.convertToMs(dateForPickUp)
    const diffInMilliseconds = dateForReturnMS - dateForPickUpMS;
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
  }
  priceCalculate(dayCount: number) {
    this.carsDetail.map(t => this.price = dayCount * t.dailyPrice)
  }
  
  convertToMs(date: string): number {
    const data = date.split("-")
    const year = parseInt(data[0]);
    const month = parseInt(data[1]);
    const day = parseInt(data[2]);
    return new Date(year, month, day).getTime()
  }
  // postRental(rental:Rental){
  //   if (this.pickUpDate && this.returnDate) {
  //     rental.brandName = this.carsDetail.find(c=>c.brandName).brandName
  //     rental.userName = this.currentUser.find(c=>c.userName).userName;
  //     rental.carId = this.carsDetail.find(c=>c.carId).carId
  //     rental.rentDate = this.pickUpDate;
  //     rental.returnDate = this.returnDate;
  //     this.rentalService.addRental(rental);
  //     this.toastrService.success("Islem basarili")
  //   }
  //   else{
  //     this.toastrService.error("Hata!!")
  //   }
    

  // }
  
}
