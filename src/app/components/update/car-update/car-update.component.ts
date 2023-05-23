import { Time } from '@angular/common';
import { Car } from '../../../models/car';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { timeout, timer } from 'rxjs';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    
  ) {}
  carList: Car[];
  carUpdateForm: FormGroup;
  selectedCar: Car;
  selectedCarDetails:CarDetail[];
  selectedCarDetailBrand:Brand;
  selectedCarDetailColor:Color;
  colors: Color[] = [];
  brands: Brand[] = [];
  ngOnInit(): void {
    this.listCars();
    this.getBrands();
    this.getColors();
    this.updateCreateForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  listCars() {
    this.carService.getCars().subscribe((response) => {
      this.carList = response.data;
    });
  }

  delete(car: Car) {
    this.setSelectedCarToUpdate(car);
    this.carService.deleteById(this.selectedCar.id).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.refreshItems();
      },
      (Error) => {
        console.log(Error);
      }
    );
  }

  updateCreateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [''],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  setSelectedCarToUpdate(car: Car) {
    this.selectedCar = car;
  }

  update() {
    this.carUpdateForm.controls['id'].setValue(this.selectedCar.id);
    this.carUpdateForm.controls['colorId'].setValue(this.selectedCar.colorId);
    this.carUpdateForm.controls['brandId'].setValue(this.selectedCar.brandId);

    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe({
        next: (response) => {
          console.log(response);
          this.toastrService.success('Islem tamamlandi!');
          window.location.reload();
        },
        error: (error) => {
          console.log(carModel);
          console.log(error);
          this.toastrService.error(error);
        },
      });
    } else {
      console.log(this.carUpdateForm);
      this.toastrService.warning('Formu doldurunuz', 'Güncelleme Başarısız');
    }
  }
  refreshItems() {
    this.listCars();
  }
  refreshPage(){
    window.location.reload();
  }
  chooseBrandId(brand: Brand) {
    this.selectedCar.brandId = brand.brandId;
    this.selectedCarDetailBrand = this.selectedCarDetails.find(s=>s.brandId === brand.brandId)
  }
  chooseColorId(color: Color) {
    this.selectedCar.colorId = color.colorId;
    this.selectedCarDetailColor = this.selectedCarDetails.find(c=>c.colorId === color.colorId)

  }
  defaultValueForBrandName(brand:Brand){
    this.selectedCarDetailBrand = this.selectedCarDetails.find(s=>s.brandId === brand.brandId)

  }
  defaultValueForColorName(color:Color){
    this.selectedCarDetailColor = this.selectedCarDetails.find(c=>c.colorId === color.colorId)
  }
}
