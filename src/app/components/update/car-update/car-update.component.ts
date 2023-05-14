import { Car } from '../../../models/car';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

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
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService,
    private window:Window
  ) {}
  carList: Car[] = [];
  carUpdateForm: FormGroup;
  selectedCar: Car;
  colors : Color[] = [];
  brands : Brand[] = [];
  ngOnInit(): void {
    this.listCars();
    this.getBrands();
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  listCars() {
    this.carService.getCars().subscribe((response) => {
      this.carList = response.data;
    });
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }
  deleteById(car:Car){
    this.carService.deleteById(car.id).subscribe((response)=>{
      this.toastrService.error("Arac Silindi!!",car.description)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }

  updateCreateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.selectedCar.id, Validators.required],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      modelYear: [this.selectedCar.modelYear, Validators.required],
      description: [this.selectedCar.description],
    });
  }

  setSelectedCarToUpdate(car: Car) {
    this.selectedCar = car;
    this.updateCreateForm();
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          console.log(responseError);
          }
        
      );
    } else {
      this.toastrService.warning(
        'Renk ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
}