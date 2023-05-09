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
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService,private imageService:CarImageService){

  }
  ngOnInit(): void {
    
  }
  imageForm:FormGroup
  createImageForm(){
    this.imageForm = this.formBuilder.group({
      carId:['',Validators.required],
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
  }


}
