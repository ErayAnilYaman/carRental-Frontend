import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[]=[];
  carImages: CarImage[]=[];
  imageOfPath:string;
  baseUrl="https://localhost:44387/Uploads/Images/"

  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"])
      {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.carDetails=response.data
    })
  };
  getCarsByColor(ColorId:number){
    this.carService.getCarsByColorId(ColorId).subscribe(response=>{
      this.carDetails=response.data
    })
  };
  getCarImageByCarId(id:number){
    this.carImageService.getCarImagesById(id).subscribe(response=>{
      const imagePath=response.data[2].imagePath;
      this.imageOfPath = this.baseUrl+imagePath;
    })
    return this.imageOfPath;
  }
}