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

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent },
  {path:"cars",component:CarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
  {path:"colors",component:ColorComponent},
  {path:"brands",component:BrandComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/carDetails/:id",component:CarDetailComponent},
  {path:"cars/carDetails",component:CarDetailComponent},
  {path:"rentals/:carId",component:RentalComponent},
  {path:"payment/:carId",component:PaymentComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/update",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"carimages/add",component:CarImageAddComponent,canActivate:[LoginGuard]},
  {path:"profile/:userId",component:ProfileComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
