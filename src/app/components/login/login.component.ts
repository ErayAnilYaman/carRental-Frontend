import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.createLoginFormModel();
  }

  loginFormModel: FormGroup;

  createLoginFormModel() {
    this.loginFormModel = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginFormModel.valid) {
      let loginModel = Object.assign({}, this.loginFormModel.value);
      this.authService.login(loginModel).subscribe({next:
        (response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('User', response.data.user);
          this.toastr.success('Hosgeldiniz');
          this.router.navigate(["cars"]);
          
        },error:
        (responseErrorData) => {
          console.log(responseErrorData.error);
          this.toastr.error("Ariza");
        }}
      );
      
      
    } else {
      this.toastr.warning('Formu bos birakmayiniz!!');
    }
  }
  directRegister() {
    this.router.navigate(['register']);
  }

  directMainPage(){
    
    this.router.navigateByUrl("");
    
  }
}
