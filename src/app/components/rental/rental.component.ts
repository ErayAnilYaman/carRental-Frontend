import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  dataLoaded = false;
  rentals:Rental[] = [];

  constructor(private rentalService:RentalService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    
  }
  getRentals(){
    this.rentalService.getRentals().subscribe((response)=>{
      this.rentals = response.data
      this.dataLoaded = true
    })
  }
}
