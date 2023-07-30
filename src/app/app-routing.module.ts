import { ComponentFixture } from '@angular/core/testing';
import { Car } from './models/car';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { BrandAddComponent } from './components/add/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/update/brand-update/brand-update.component';
import { CarImageAddComponent } from './components/add/car-image-add/car-image-add.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ColorUpdateComponent } from './components/update/color-update/color-update.component';
import { ColorAddComponent } from './components/add/color-add/color-add.component';
import { CustomerAddComponent } from './components/add/customer-add/customer-add.component';
import { CustomerUpdateComponent } from './components/update/customer-update/customer-update.component';
import { ProfileUpdateComponent } from './components/update/profile-update/profile-update.component';
import { UserPaymentComponent } from './components/user-payment/user-payment.component';
import { PaymentUpdateComponent } from './components/update/payment-update/payment-update.component';
import { CustomerGuard } from './guards/customer.guard';
import { PasswordUpdateComponent } from './components/update/password-update/password-update.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent },
  {path:"cars",component:CarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
  {path:"colors",component:ColorComponent},
  {path:"brands",component:BrandComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cardetails/:id",component:CarDetailComponent},
  {path:"cardetails",component:CarDetailComponent},
  {path:"rentals/:carId",component:RentalComponent,canActivate:[CustomerGuard,LoginGuard]},
  {path:"payment/:carId",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"payments/:userId",component:UserPaymentComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"customers/add/:userId",component:CustomerAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/update",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/update",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"customers/update/:customerId",component:CustomerUpdateComponent,canActivate:[LoginGuard]},
  {path:"payments/update/:paymentId",component:PaymentUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"carimages/add/:carId",component:CarImageAddComponent,canActivate:[LoginGuard]},
  {path:"profile/:userId",component:ProfileComponent,canActivate:[LoginGuard]},
  {path:"profile/update/:userId",component:ProfileUpdateComponent,canActivate:[LoginGuard]},
  {path:"profile/update-password/:userId",component:PasswordUpdateComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
