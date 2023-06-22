import { Customer } from './../../../models/customer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
})
export class CustomerAddComponent implements OnInit {
  userId:number = parseInt(localStorage.getItem("User"))
  dataLoaded = false;
  customerAddForm:FormGroup;
  selectedUser:User;
  customer:Customer;
  constructor(
    private toastr:ToastrService,
    private router:Router,
    private userService:UserService,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if (params["userId"]) {
        
        this.checkDataAccess(this.userId);
        this.listByUserId(this.userId);
        this.createCustomerAddForm();
        this.getUserById(this.userId);
        this.dataLoaded = true;
      }
      else{
        this.dataLoaded = false;
      }
    })
  }
  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      userId:["",Validators.required],
      companyName:["",Validators.required],
      companyMail:["",Validators.required],
      address:["",Validators.required],
    })

  }
  add(){
    this.customerAddForm.controls["userId"].setValue(this.userId)
    if (this.customerAddForm.valid) {
      let customerAddModel = Object.assign({},this.customerAddForm.value);
      this.customerService.add(customerAddModel).subscribe({next:(response)=>{
        console.log(response);
        this.toastr.success("Islem Basarili",this.customerAddForm.controls["companyName"].value +" Eklendi!");
        window.location.reload();
      },error:(responseError)=>{
        this.toastr.error(responseError.error);
      }})
    }
    else{
      this.toastr.warning("Tum Formlari Doldurunuz!");
    }
  }
  
  listByUserId(id:number){
    this.customerService.getCustomerByUserId(id).subscribe((response)=>{
      this.customer = response.data;
      this.dataLoaded = true;
    })
  }
  getUserById(id:number){
    this.userService.getUserById(id).subscribe((response)=>{
      console.log(response);
      this.selectedUser = response.data;
      this.dataLoaded = true;
    })
  }
  checkDataAccess(id:number){
    if (id == parseInt(localStorage.getItem("User"))) {
      return;
    }
    this.toastr.error("Anasayfaya yonlendiriliyosunuz ...","Kullanici Eslesemedi");
    this.router.navigate([""]);
  }
  directUpdateMenu(customer:Customer){
    this.router.navigate(["/customers/update/"+ customer.customerId.toString()]);
  }
  refreshItems(){
    this.listByUserId(this.userId);
  }
}
