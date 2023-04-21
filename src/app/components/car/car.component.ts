import { CarDetail } from './../../models/carDetail';
import { CarImageService } from './../../services/car-image.service';
import { Component, OnInit,NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  dataLoaded = false;
  cars:Car[] = []
  carImages:CarImage[]=[]
  carDetails:CarDetail[] = []
  carDetailById:CarDetail[]=[]
  currentCar : Car
  currentCarDetail:CarDetail
  imageOfPath : string
  baseUrl ="https://localhost:44318/api/Uploads/Images"
  
  constructor(private carService:CarService,
    private carImageService:CarImageService,
     private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else if (params["brandId"]) {
          this.getCarsByBrandId(params["brandId"])
      }
      else if(params["id"]){
        this.getCarsById(params["id"])
      }
      else{
        this.getCars()
      }
    })
  }
  
  
  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.carDetails = response.data
      this.dataLoaded = true
    })
  }
  getCarsByColorId(id:number){
    this.carService.getCarsByColorId(id).subscribe((response)=>{
      this.carDetails = response.data
      this.dataLoaded = true
    })
  }
  getCarsByBrandId(id:number){
    this.carService.getCarsByBrandId(id).subscribe((response)=>{
      this.carDetails = response.data
      this.dataLoaded =true;
    })
  }
  getCarImagesById(id:number){
    this.carImageService.getCarImagesById(id).subscribe((response)=>{
      const imagePath = response.data[2].imagePath;
      this.imageOfPath = this.baseUrl + imagePath

    })
    return this.imageOfPath
  }
  getCarsById(id:number){
    this.carService.getCarsById(id).subscribe((response=>{
      this.carDetailById = response.data
      this.dataLoaded =true;
    }))
  }
  setCurrentCar(carDetail:CarDetail){
    this.currentCarDetail = carDetail

  }

}
