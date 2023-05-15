import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private authService:AuthService,private toastr:ToastrService,private formBuilder:FormBuilder){

  }
  ngOnInit(): void {
    
  }
  registerForm:FormGroup
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],

    })
  }
  register(){
    if (this.registerForm.valid) {
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe((response)=>{
        localStorage.setItem("token",response.data.token);
        console.log(response);
        console.log(registerModel);

      },responseErrorData=>{
        console.log(responseErrorData);
        this.toastr.error(responseErrorData);
      })
    }
    else{
      this.toastr.error("Tum formlari doldurunuz!!!");
    }
  }

}
