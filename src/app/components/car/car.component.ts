import { ListResponseModel } from './../../models/listResponseModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  filterText = '';
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  imageOfPath: string;
  baseUrl = 'https://localhost:44318/uploads/images/';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
        this.getCarImages();
      }
    });
  }

  getCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getCarImages() {
    this.carImageService.list().subscribe(
      (res) => {
        this.carImages = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
      let filteredCar = this.carDetails.find(
        (c) => c.brandId === brandId
      ).brandName;
      this.toastrService.success(
        'Arac filtrelendirilmesi yapildi!!',
        'Filtrelenen arac markasi :' + filteredCar
      );
    });
  }
  getCarsByColor(ColorId: number) {
    this.carService.getCarsByColorId(ColorId).subscribe((response) => {
      this.carDetails = response.data;
      let filteredCar = this.carDetails.find(
        (c) => c.colorId === ColorId
      ).colorName;
      this.toastrService.success(
        'Arac filtrelendirilmesi yapildi!!',
        'Filtrelenen arac rengi :' + filteredCar
      );
    });
  }
  directCarDetail(id: number) {
    this.router.navigateByUrl("/cardetails/" + id);
    this.toastrService.info("Araca Yonlendiriliyosunuz!");
  }
  directImageAdd(id:number){
    this.router.navigateByUrl("/carimages/add/" + id);
    this.toastrService.info("Resim Yukleme Kismina yonlendiriliyosunuz!");

  } 
}
