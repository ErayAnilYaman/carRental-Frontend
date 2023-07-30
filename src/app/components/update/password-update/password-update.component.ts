import { CarUpdateComponent } from './../car-update/car-update.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css'],
})
export class PasswordUpdateComponent implements OnInit {
  passwordUpdateGroup: FormGroup;
  dataLoaded :boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService:UserService,
  ) {}
  ngOnInit(): void {
    this.createPasswordUpdateForm();
  }
  createPasswordUpdateForm() {
    this.passwordUpdateGroup = this.formBuilder.group({
      id: ['', Validators.required],
      passwordToChange: ['', Validators.required],
      password: ['', Validators.required],
    })

    
  }
  update() {
    this.passwordUpdateGroup.controls["id"].setValue(parseInt(localStorage.getItem("User")));

    if (this.passwordUpdateGroup.valid) {
      var passwordUpdateModel = Object.assign({},this.passwordUpdateGroup.value);
      this.userService.updatePassword(passwordUpdateModel).subscribe((res)=>{
        console.log(res);
        this.dataLoaded = true;
        this.toastr.success(res.message);

      },(err)=>{
        console.log(err);
        this.dataLoaded = false;
        this.toastr.error(err.error);

      })
    }
    else{
      this.toastr.warning("Lutfen Formlari doldurunuz");
    }
    
  }
}
