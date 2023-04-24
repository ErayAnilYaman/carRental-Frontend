import { RentalService } from 'src/app/services/rental.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentalList:Rental[]
  dataLoaded = false;
  rental:Rental;

  constructor(private rentalService:RentalService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["/payment/:carId"]){
        this.listRentals();
      }
    })
    
  }
  listRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentalList = response.data
      this.dataLoaded = true
    });
  }
  postRental(rental:Rental){
    this.rentalService.addRental(rental);
  }
}
