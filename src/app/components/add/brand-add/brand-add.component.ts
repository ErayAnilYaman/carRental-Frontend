import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastr:ToastrService){

  }
  brandAddForm :FormGroup;
  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:['',Validators.required],
    })
  }
  add(){
    if (this.brandAddForm.valid) {
      let brandAddModel = Object.assign({},this.brandAddForm.value);
      this.brandService.add(brandAddModel).subscribe((response)=>{
        this.toastr.success(response.message);
      },responseErrorData=>{
        console.log(responseErrorData)
        this.toastr.error(responseErrorData.error);
      })
    }
    else{
      this.toastr.warning("Bos Alanlarin Hepsini Doldurunuz!");
    }
  }

  
}
