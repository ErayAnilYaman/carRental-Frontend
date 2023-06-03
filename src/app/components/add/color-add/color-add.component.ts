import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  constructor(private colorService:ColorService,private toastr:ToastrService,private router:Router,
    private formBuilder:FormBuilder){

  }
  colorAddForm:FormGroup;
  colorList:Color[];
  dataLoaded:boolean = false;
  ngOnInit(): void {
    this.list();
    this.createColorForm();
  }
  createColorForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required],
    })
  }
  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe((response)=>{
        this.toastr.success(response.message);
      },(responseErrorData)=>{
        this.toastr.error(responseErrorData.error.message)
      })  
    }
    else{
      this.toastr.warning("Tum Alanlari Doldurunuz!");
    }
    
  }
  refreshItems() {
    this.list();
    
  }
  
  list(){
    this.colorService.getColors().subscribe((response)=>{
      this.colorList = response.data;
      this.dataLoaded = true;
    })
  }
  
}
