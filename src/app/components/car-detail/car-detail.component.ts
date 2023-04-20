import { CarDetail } from 'src/app/models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  dataLoaded = false;
  carDetails:CarDetail[] = []
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute ){
    
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["id"]) {
        this.getCarDetail(params["id"])
      } 
      
    })
  }

  getCarDetail(id:number){
    this.carService.getCarDetailsById(id).subscribe((response)=>{
      this.carDetails = response.data
    })
  }
}
