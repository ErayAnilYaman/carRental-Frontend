import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { parseHostBindings } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  dataLoaded: boolean = false;
  result: boolean;
  title: string = 'RentACar';
  brand: string = 'TouchRent';
  userName: string;
  userid: string;
  currentUser: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.IsAuthentic();
    if (localStorage.getItem("User") !== null) {
      this.userid = localStorage.getItem('User');
      let userId = parseInt(this.userid);
      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          console.log(response);
          this.currentUser = response.data;
          console.log(this.currentUser.firstName);
          this.dataLoaded = true;
        },
        error: (responseError) => {
          console.log(responseError);
          this.toastrService.error('Kullanici bulunamadi!');
        },
      });
    } else {
      this.dataLoaded = false;
    }
    
  }
  IsAuthentic() {
    if (this.authService.isAuthentic()) {
      this.result = true;
    }
    else{
      this.result = false;
    }
  }
  directLogin() {
    this.router.navigateByUrl('/login');
  }
  directRegister() {
    this.router.navigateByUrl('/register');
  }
  logOut() {
    this.authService.logOut();
  }
  goToProfile(id: string) {
    this.router.navigate(['/profile/' + id]);
  }
}
