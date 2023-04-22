import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetailList :CarDetail[] = []
  carImage : CarImage[]=[];
  dataLoaded = false;
  baseUrl ="https://localhost:44318/api/Uploads/Images"
  constructor(private carService:CarService,private carImageService:CarImageService,private activatedRoute:ActivatedRoute){
      

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["id"]) {
        this.getCarDetailsById(params["id"])
        this.getImageById(params["id"])
      }
      else{
        this.getCars()
      }
    })
  }
  getImageById(id:number){
      this.carImageService.getCarImagesById(id).subscribe((response)=>{
          this.carImage = response.data;
          this.dataLoaded=true
      })
  }
  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.carDetailList = response.data
      this.dataLoaded = true;
    })
  }
  getCarDetailsById(id:number){
    this.carService.getCarsById(id).subscribe((response)=>{
      this.carDetailList = response.data;
      this.dataLoaded = true;
    })
  }

}
