import { Router } from '@angular/router';
import { ListResponseModel } from './../../../models/listResponseModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastr: ToastrService,
    private router:Router
  ) {}
  brandAddForm: FormGroup;
  dataLoaded: boolean = false;
  brandList: Brand[] = [];
  ngOnInit(): void {
    this.createBrandAddForm();
    this.list();
  }
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  add() {
    if (this.brandAddForm.valid) {
      let brandAddModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandAddModel).subscribe(
        (response) => {
          this.toastr.success('Urun Eklendi', response.message);
          console.log(response);
          this.refreshItems();
        },
        (responseErrorData) => {
          console.log(responseErrorData);
          this.toastr.error(responseErrorData.error);
        }
      );
    } else {
      this.toastr.warning('Bos Alanlarin Hepsini Doldurunuz!');
    }
  }
  list() {
    this.brandService.getBrands().subscribe((res) => {
      this.brandList = res.data;
      this.dataLoaded = true;
    });
  }
  refreshItems() {
    this.list();
  }
  directUpdatePath() {
    this.router.navigate(["/brands/update"]);
  }
}
