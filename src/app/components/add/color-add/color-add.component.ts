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

  ngOnInit(): void {
    this.createColorForm();
  }
  createColorForm(){
    this.colorAddForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required],
    })
  }
  add(color:Color){
    
    
  }


}
