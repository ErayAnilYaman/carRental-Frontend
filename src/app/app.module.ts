import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import {FormsModule} from '@angular/forms';
import { FilterCarSearchPipe } from './pipes/filter-car-search.pipe';
import { FilterBrandSearchPipe } from './pipes/filter-brand-search.pipe';
import { FilterColorSearchPipe } from './pipes/filter-color-search.pipe'
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaymentComponent } from './components/payment/payment.component'
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
      timeOut : 3000
    }),
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
