import { CarDetail } from './../../models/carDetail';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { Car } from 'src/app/models/car';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetailList: CarDetail[];
  rentalList: Rental[];
  baseUrl = 'https://localhost:44318/uploads/images/';
  carDetail: CarDetail;
  dataLoaded = false;
  itemLoaded :boolean;
  imageOfPath: string;
  imageList: CarImage[];

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartItemService: CartItemService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.dataLoaded = true;
        this.getCarDetailsById(params['id']);
        this.checkIfCarExists();
      } else {
        this.toastrService.warning('Sayfa Bulunamadi', '404');
        this.router.navigate(['']);
      }
    });
  }

  getCarDetailsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe(
      (response) => {
        
        console.log(response);
        this.carDetailList = response.data;
        this.itemLoaded = true;
      },
      (error) => {
        this.itemLoaded = false;
        console.log(error);
        this.router.navigate(['']);
        this.toastrService.error('Arac Bulunamadi');
        this.checkIfCarExists();
      }
    );
  }

  checkIfCarExists(): boolean {
    console.log(this.dataLoaded);

    if (this.itemLoaded === false) {
      this.toastrService.warning('Arac Bulunamadi');
      this.router.navigate(['']);
      return false;
    }
    else{
      this.toastrService.success('Arac Bulundu');
      return true;
    }
    
  }

  addToCart(carDetail: CarDetail) {
    this.cartItemService.addToCart(carDetail);
    this.toastrService.success(
      'Urun Eklendi',
      carDetail.description + ' Eklendi!!'
    );
  }

  listRentals() {
    this.rentalService.getAll().subscribe((response) => {
      this.rentalList = response.data;
    });
    this.toastrService.success('Kiralanan urunler listelendi');
  }

  updatePath() {
    this.router.navigate(['/cars/update']);
  }

  rentPath(car: CarDetail) {
    this.router.navigate(['/rentals/' + car.carId]);
  }

  turnBackPage() {
    this.router.navigate(['cars']);
  }
}
