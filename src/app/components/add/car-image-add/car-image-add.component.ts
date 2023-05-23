import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private imageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId(params['carId']);
        this.carId = params['carId'];
      } else {
        this.router.navigate(['cars']);
        this.toastr.error('404 not found');
      }
    });
  }
  imagePathText: string;
  carId: number;
  car: Car;
  selectedCar: CarDetail[];
  imageForm: FormGroup;
  createCarImageUploadForm() {
    this.imageForm = this.formBuilder.group({
      carId: this.carId,
      imagePath: ['', Validators.required],
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarsByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.imageForm.get('profile').value);

    this.imageService.add(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
