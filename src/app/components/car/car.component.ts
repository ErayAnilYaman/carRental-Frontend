import { Component, OnInit,NgModule } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  dataLoaded = false;
  cars:Car[] = []
  constructor(private carService:CarService){

  }
  ngOnInit(): void {
    this.getCars();
  }
  

  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }
}
