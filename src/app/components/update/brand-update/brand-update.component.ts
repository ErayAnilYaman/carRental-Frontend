import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private toastr:ToastrService,
    private brandService:BrandService){

  }
  ngOnInit(): void {
    this.list();

  }
  selectedBrand:Brand;
  brandList:Brand[]=[];
  dataLoaded = false;
  brandUpdateForm:FormGroup;
  createUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:['',Validators.required],
      brandName:['',Validators.required],
    })
  }
  list(){
    this.brandService.getBrands().subscribe(response=>{
      this.brandList = response.data;
      this.dataLoaded = true; 
    },responseDataError=>{
      this.toastr.error("Markalar listelenemedi!");
    })
  }
  update(){
    if(this.brandUpdateForm.valid){
      let brandUpdateModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.update(brandUpdateModel).subscribe((response)=>{
        this.toastr.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      },(responseErrorData)=>{
        console.log(responseErrorData);
        this.toastr.error(responseErrorData);
      })
    }
    else{
      this.toastr.error("Formu Doldurunuz!");
      console.log();
    }
  }
  setSelectedBrand(brand:Brand){
    this.selectedBrand = brand;
    this.createUpdateForm();
  }
  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastr.success(response.message, 'Başarılı');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }
}
