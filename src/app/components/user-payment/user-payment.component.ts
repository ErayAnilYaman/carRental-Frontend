import { AppModule } from './../../app.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pay } from 'src/app/models/pay';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css'],
})
export class UserPaymentComponent implements OnInit {
  constructor(
    private activateedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  payments: Pay[];
  paymentToDelete: Pay;
  dataLoaded: boolean = false;
  userId: number;
  paymentToUpdate: Pay;
  ngOnInit(): void {
    this.activateedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.userId = parseInt(localStorage.getItem('User'));
        this.checkUserSecurity(params['userId']);
        this.list();
      }
    });
  }
  list() {
    this.paymentService.listByUserId(this.userId).subscribe(
      (res) => {
        this.payments = res.data;
        this.dataLoaded = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteById(id: number) {
    this.paymentService.delete(id).subscribe(
      (res) => {
        console.log(res.message);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  update(id: number) {
    this.router.navigateByUrl("/payments/update/" + id);
  }
  checkUserSecurity(id: number) {
    if (id != this.userId) {
      this.toastr.error('Hesap eslenmesi yapilamadi');
      this.router.navigate(['']);
    }
  }
  directToUpdatePage(id:number){
    this.router.navigateByUrl("/payment/update/" + id);
  }
}
