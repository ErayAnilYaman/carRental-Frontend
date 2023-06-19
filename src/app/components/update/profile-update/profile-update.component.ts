import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  updateForm : FormGroup;
  dataLoaded:boolean = false;
  userToUpdate : User;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["userId"]) {
        this.createUpdateForm();
        this.getUserById(params["userId"]);
        
      }
      else{
        this.directMenu();
      }
    })
  }
  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      id:[""],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
    })
    
  }
  update(){
    this.updateForm.controls["id"].setValue(parseInt(localStorage.getItem("User")));
    if (this.updateForm.valid) {
      let updateModel = Object.assign({},this.updateForm.value);
      this.userService.update(updateModel).subscribe({next:(res)=>{
        
        this.toastr.success("Kullanici basariyla guncellendi!");
        this.router.navigateByUrl("/profile/" + localStorage.getItem("User"));
      },error:(err)=>{
        
        this.toastr.error(err.error.message)
      }});
    }
    else{
      this.toastr.warning("Tum formlari doldurunuz!");
    }
  }
  getUserById(id:number){
    this.userService.getUserById(id).subscribe((res)=>{
      this.dataLoaded = true;
      this.userToUpdate = res.data;
    },(err)=>{
      console.log(err);
    })
  }
  directMenu(){
    this.toastr.warning("Aradiginiz sayfa bulunamadi!");
    this.router.navigateByUrl("");
  }
}
