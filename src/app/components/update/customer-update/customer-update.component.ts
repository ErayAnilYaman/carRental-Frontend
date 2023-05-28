import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  dataLoaded: boolean = false;
  customerUpdateForm: FormGroup;
  selectedCustomer: Customer;
  selectedUser:User;
  userId:number = parseInt(localStorage.getItem("User"));
  customerId:number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.customerId = params['customerId']
        this.getCustomersByCustomerId(params['customerId']);
        this.getUserById(this.userId);
        this.createCustomerUpdateForm();
        this.checkTheDataAccess(this.selectedCustomer);
        
      } else {
        this.toastr.error(
          '404',
          'Sayfa Bulunamadi Anasayfaya Yonlendiriliyosunuz...'
        );
        this.router.navigateByUrl('');
      }
    });
  }
  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      userId:['',Validators.required],
      customerId:['',Validators.required],
      companyName: ['', Validators.required],
      companyMail: ['', Validators.required],
    });
  }
  getUserById(id:number){
    this.userService.getUserById(id).subscribe((response)=>{
      this.selectedUser = response.data;
      this.dataLoaded = true;
    },(error)=>{
      console.log(error);
    })
  }
  getCustomersByCustomerId(id: number) {
    this.customerService.getCustomersById(id).subscribe(
      (response) => {
        this.selectedCustomer = response.data;
        this.dataLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  update() {
    this.customerUpdateForm.controls['userId'].setValue(this.selectedCustomer.userId);
    this.customerUpdateForm.controls['customerId'].setValue(this.selectedCustomer.customerId);
    if (this.customerUpdateForm.valid) {
      let customerUpdateModel = Object.assign(
        {},
        this.customerUpdateForm.value
      );
      this.customerService.update(customerUpdateModel).subscribe(
        (response) => {
          this.toastr.success(
            'Sirket Bilgileri Guncellendi!',
            'Sirket :' + this.customerUpdateForm.controls['companyName'].value
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastr.warning('Tum formlari doldurunuz!!');
    }
  }
  checkTheDataAccess(customer:Customer) {
    
    if (customer.userId == this.userId) {
      
      return;
    }
    this.toastr.error('Kulllanici eslesmesi basarisiz oldu!');
    this.router.navigate(['']);
  }
  refreshItems() {
    window.location.reload();
  }
}
