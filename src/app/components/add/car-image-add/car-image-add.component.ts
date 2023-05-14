import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService,private imageService:CarImageService,
    private activatedRoute:ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["carId"]) {
        this.createImageForm(params["carId"]);
      }
      else{
        this.router.navigate(["cars"])
        this.toastr.error("404 not found")
      }
    })
    
  }
  carId:number;
  imageForm:FormGroup
  createImageForm(id:number){
    this.imageForm = this.formBuilder.group({
      carId: id,
      imagePath:['',Validators.required],
    })
  }
  addImage(){
    if (this.imageForm.valid) {
      let imageModel = Object.assign({},this.imageForm.value)
      this.imageService.add(imageModel).subscribe((response)=>{
        this.toastr.success(response.data.date.toString());
      },(responseError)=>{
        console.log(responseError);
      })
    }
    else{
      this.toastr.error("Lutfen resmi yukleyiniz!!");
    }
  }



}
