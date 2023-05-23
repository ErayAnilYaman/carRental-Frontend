import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router:Router,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute){

  }
  dataLoaded = false;
  colorList:Color[];
  colorToUpdate:Color;
  colorUpdateForm:FormGroup

  ngOnInit(): void {
    this.list();
    this.createColorUpdateForm();
  }
  list(){
    this.colorService.getColors().subscribe((response)=>{
      this.colorList = response.data;
      this.dataLoaded = true;
    })
  }
  delete(color:Color){
    this.setColorAndDirectUpdatePath(color);
    if (color.colorId.valueOf()) {
      this.colorService.deleteById(color.colorId).subscribe((response)=>{
        this.toastr.success("Renk Silindi!!",color.colorName+ " Rengi Silindi!!");
        console.log(response);
        this.refreshItems();
      },(error)=>{
        console.log(error);
        this.toastr.error("Renk Silinemedi",color.colorName + " Rengi Silinemedi!!");
      })
    }
    else{
      this.toastr.warning("Lutfen bir renk seciniz!!");
    }
    
  }
  setColorAndDirectUpdatePath(color:Color){
    this.colorToUpdate = color;
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required],
    })
  }
  getColorById(id:number){
    this.colorService.getColorById(id).subscribe((response)=>{
      this.colorToUpdate = response.data
    })
  }
  update(){
    
    this.colorUpdateForm.controls['colorId'].setValue(this.colorToUpdate.colorId);
   
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response)=>{
        this.toastr.success("Renk Guncellendi",colorModel);
        this.refreshItems();
      },(error)=>{  
        console.log(error);
      })

    }
    else{
      this.toastr.warning("Bir degisiklik yapilmadi",this.colorToUpdate.colorName);
      window.location.reload();
    }
    
  }
  refreshItems(){
    this.list();
  }


  
}
