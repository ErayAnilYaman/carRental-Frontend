import { AuthInterceptor } from './../../interceptors/auth.interceptor';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHandler, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router:Router,
    private authInterceptor:AuthInterceptor,
  ) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }
  registerForm: FormGroup;
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          let request :HttpRequest<any>;
          let handler :HttpHandler
          this.authInterceptor.intercept(request,handler)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('User',response.data.user);
          this.toastr.success('Basariyla kayit olundu!');
          this.router.navigate([""]);
        },
        (responseErrorData) => {
          console.log(responseErrorData);
          this.toastr.error(responseErrorData);
        }
      );
    } else {
      this.toastr.error('Tum formlari doldurunuz!!!');
    }
  }
}
