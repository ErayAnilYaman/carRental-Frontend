import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService:AuthService,private formBuilder:FormBuilder
    ,private toastr:ToastrService,private router:Router){

  }
  ngOnInit(): void {
    this.createLoginFormModel();
  }
  
  loginFormModel:FormGroup;

  createLoginFormModel(){
    this.loginFormModel = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){

    if (this.loginFormModel.valid) {
      let loginModel = Object.assign({},this.loginFormModel.value);
      this.authService.login(loginModel).subscribe((response)=>{
        this.toastr.success("Giris yapildi",loginModel.firstName + loginModel.lastName);
        this.router.navigateByUrl("cars");
        localStorage.setItem("token",response.data.token);

      },responseErrorData=>{

        console.log(responseErrorData.error);
        this.toastr.error(responseErrorData.error);
      })
    }
    else{
      this.toastr.warning("Formu bos birakmayiniz!!");
    }
  }

}
