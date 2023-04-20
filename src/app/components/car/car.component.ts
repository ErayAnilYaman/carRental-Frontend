import { Component, OnInit,NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  dataLoaded = false;
  cars:Car[] = []
  carDetail:CarDetail[]=[]
  currentCar : Car
  currentCarDetail :CarDetail
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else if (params["brandId"]) {
          this.getCarsByBrandId(params["brandId"])
      }
      else{
        this.getCars()
      }
    })
  }
  
  
  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }
  getCarsByColorId(id:number){
    this.carService.getCarsByColorId(id).subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }
  getCarsByBrandId(id:number){
    this.carService.getCarsByBrandId(id).subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded =true;
    })
  }
  setCurrentCarDetail(car:Car){
    this.currentCar = car
    return this.currentCar.id
  }
  

}
