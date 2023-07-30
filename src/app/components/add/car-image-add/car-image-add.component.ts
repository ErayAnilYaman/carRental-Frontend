import { HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CarImageService } from 'src/app/services/car-image.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterConfigOptions } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  carDetails : CarDetail[]
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  dataLoaded = false;
  carImageGroup: FormGroup;
  carId: number;
  baseUrl = 'https://localhost:44318/uploads/images/';

  // Inject service
  constructor(
    private carImageService: CarImageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private carServive:CarService,
      ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params['carId']) {
          this.carId = params['carId'];
          this.getCarDetailsByCarId(params["carId"]);
          this.createFileForm();
          this.dataLoaded = true;
        }
        else{
          this.toastr.warning("Araca erisilemedi");
        }
      },
      (err) => {
        this.toastr.error('Sayfa Bulunamadi');
        this.router.navigate(['']);
      }
    );
  }
  getCarDetailsByCarId(carId:number){
    this.carServive.getCarDetailsById(carId).subscribe((res)=>{
      console.log(res);
      this.carDetails = res.data;

    },(err)=>{
      console.log(err);
    })
  }
  
  createFileForm() {
    this.carImageGroup = this.formBuilder.group({
      imagePath: ['', Validators.required],
      carId: ['', Validators.required],
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.carImageGroup.controls['imagePath'].setValue(this.file.name);
    this.carImageGroup.controls['carId'].setValue(this.carId);
    if (this.carImageGroup.valid) {
      var carImageModel = Object.assign({},this.carImageGroup.value);
      this.loading = !this.loading;
      console.log(this.file);
      this.carImageService.upload(this.file,carImageModel).subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.shortLink = event.link;
          this.loading = false; // Flag variable

        }
        console.log(event);
      },(err)=>{
        this.toastr.error(err.error.Message);
        console.log(err);
      });
    } else {
    
      this.toastr.error('hata');
    }
  }
  turnBackPage(){
    this.router.navigate([""]);
  }
}
