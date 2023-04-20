import { Color } from 'src/app/models/color';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  currentColor : Color
  dataLoaded = false;
  colors:Color[] = []
  constructor(private colorService:ColorService){

  }
  ngOnInit(): void {
    this.getColors()
    
  }
  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data
      this.dataLoaded = true
    })
  }
  getAllCars(){

  }
  setCurrentColor(color:Color){
    this.currentColor = color
  }
  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active"
    }
    return "list-group-item"
  }
}
