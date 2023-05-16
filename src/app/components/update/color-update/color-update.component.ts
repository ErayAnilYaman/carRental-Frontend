import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  constructor(private colorService:ColorService,private toastr:ToastrService,
    private router:Router,private formBuilder:FormBuilder){

  }
  colorUpdateForm:FormGroup
  
  dataLoaded = false;
  colorList:Color[];
  selectedColor:Color;
  ngOnInit(): void {
    this.list()
    
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required],
    })
  }
  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response)=>{
        console.log(colorModel);
        console.log(response);
        this.toastr.success("Guncellendi",colorModel);
      },
      (error)=>{
        console.log(error);
        this.toastr.error("Hata",error);
      })
    }
    else{
      this.toastr.warning("Bos alan birakmayiniz!");
    }
  }
  delete(color:Color){
    
    this.colorService.deleteById(color.colorId).subscribe((response)=>{
      this.toastr.success("Renk Silindi!",color.colorName);
      console.log(response);
      this.refreshPage();
    },(responseErrorData)=>{
      this.toastr.error(responseErrorData);
      console.log(responseErrorData);
    })
  }
  setSelectedColor(color:Color){
    this.selectedColor = color;
    this.toastr.show("Renk Secildi!");
    console.log(this.selectedColor);
  }
  list(){
    this.colorService.getColors().subscribe((response)=>{
      this.colorList = response.data;
      this.dataLoaded = true;
    })
  }
  refreshPage(){
    this.router.navigate(["/colors/update"])
  }
}
