import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.userId = params['userId'];

        this.verifyCustomerByUserId(this.userId);
        this.verifyUserById(this.userId);
        this.listCustomers();
        console.log(this.selectedUser);
        console.log(this.selectedCustomer);
      } else {
        this.listUsers();
        this.listCustomers();
        console.log(this.users);
      }
    });
  }
  userToDelete:User;
  selectedCustomer: Customer;
  selectedUser: User;
  userId: number;
  extendedUser: boolean = false;
  dataLoaded = false;
  status: boolean;
  companyName: string;
  users: User[];
  customers: Customer[];
  verifiedProfile: Profile[];
  verifiedUser: User;

  delete(){

  }
  verifyUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        this.selectedUser = response.data;
        console.log(this.selectedUser);
        this.status = true;
        this.dataLoaded = true;
      },
    });
  }
  verifyCustomerByUserId(id: number) {
    this.customerService.getCustomerByUserId(id).subscribe(
      (response) => {
        this.selectedCustomer = response.data;

        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteUser() {
    let userId = parseInt(localStorage.getItem('User'));

    if (userId != null) {
      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          console.log(res);
          this.userToDelete = res.data;
          console.log('Silincek Kullanici Bulundu!');
        },
        error: (err) => {
          console.log(err);
          console.log('Silinecek Kullanici Bulunamadi!');
        },
      });

      this.userService.delete(this.userToDelete).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Kullanici basariyla silindi!');
          localStorage.removeItem("token");
          localStorage.removeItem("User");
        },
        (err) => {
          console.log(err);
          this.toastr.error('Kullanici sistemsel ariza nedeniyle silinemedi!');
        }
      );
    } else {
      this.toastr.warning('Kullanici bulunamadi!');
    }
  }

  listUsers() {
    this.userService.listUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.dataLoaded = true;
      },
    });
  }
  listCustomers() {
    this.customerService.list().subscribe({
      next: (response) => {
        this.customers = response.data;
        this.dataLoaded = true;
      },
    });
  }
  deleteCustomerByUserId(customer: Customer) {
    this.customerService.delete(customer).subscribe(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  directUpdateUserRoute() {
    this.router.navigateByUrl(
      '/profile/update/' + parseInt(localStorage.getItem('User')),
    );
  }
  createCompanyAccount(id: number) {
    this.router.navigate(['/customers/add/' + id]);
  }
}
