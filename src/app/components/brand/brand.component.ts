import { Router } from '@angular/router';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{
  filterText = ""
  dataLoaded = false
  brands:Brand[] = []
  currentBrand:Brand | null = null;
  constructor(private brandService:BrandService,private router:Router,private toastr:ToastrService){}
  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
      this.dataLoaded=true;
    })
  }
  
  
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand
  }
  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
    return "list-group-item active"
    }
    return "list-group-item"
  }
  

}
