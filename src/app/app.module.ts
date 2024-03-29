import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { from } from 'rxjs';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCarSearchPipe } from './pipes/filter-car-search.pipe';
import { FilterBrandSearchPipe } from './pipes/filter-brand-search.pipe';
import { FilterColorSearchPipe } from './pipes/filter-color-search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
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
import { PasswordUpdateComponent } from './components/update/password-update/password-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    VatAddedPipe,
    CartSummaryComponent,
    FilterCarSearchPipe,
    FilterBrandSearchPipe,
    FilterColorSearchPipe,
    PaymentComponent,
    CarAddComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    CarImageAddComponent,
    ProfileComponent,
    ColorUpdateComponent,
    ColorAddComponent,
    CustomerAddComponent,
    CustomerUpdateComponent,
    ProfileUpdateComponent,
    UserPaymentComponent,
    PaymentUpdateComponent,
    PasswordUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
    }),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
