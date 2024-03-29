import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {


  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
  ) {}
  brands:Brand[];
  colors:Color[];
  carAddForm: FormGroup;
  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response=>{
      this.brands = response.data;
    }))
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }
  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      description: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    });
  }
  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (data) => {
          this.toastrService.success("data.message");
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
    else{
      this.toastrService.error("Tum alanlari doldurunuz!!");
    }
  }
}
