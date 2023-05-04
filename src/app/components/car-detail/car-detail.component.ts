import { CartItemService } from 'src/app/services/cart-item.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetailList :CarDetail[] = []
  rentalList : Rental[] = [];
  rentDateElement : Date
  returnDateElement :Date
  baseUrl = "https://localhost:44318/Uploads/Images/"

  dataLoaded = false;
  imageOfPath :string

  constructor(private carService:CarService,private carImageService:CarImageService, private rentalService:RentalService,
    private activatedRoute:ActivatedRoute , private toastrService:ToastrService,private cartItemService:CartItemService,
    private router:Router){
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["id"]) {
        this.getCarDetailsById(params["id"])
      }
    })
  }
  
  getCarDetailsById(id:number){
    this.carService.getCarDetailsById(id).subscribe((response)=>{
      this.carDetailList = response.data;
      this.dataLoaded = true;
    })
  }
  addToCart(carDetail:CarDetail){
    this.cartItemService.addToCart(carDetail);
    this.toastrService.success("Urun Eklendi",carDetail.description + " Eklendi!!");
  }
  addRental(rental:Rental){

    this.rentalService.addRental(rental)
    this.toastrService.success("Siparis Tarihi Belirlendi");

  }
  listRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentalList = response.data
    });
    this.toastrService.success("Kiralanan urunler listelendi")
  }
  updatePath(){
    this.router.navigateByUrl("cars/update");
  }

  
}
