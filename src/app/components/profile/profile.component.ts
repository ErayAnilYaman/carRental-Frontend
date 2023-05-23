import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService:UserService,private toastr:ToastrService,private router:Router,
    private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      
      if (params["userId"]) {
        this.verifyUserById(params["userId"]);
        this.getNameAndEmail(params["userId"]);
        this.userId = params["userId"];
        
        console.log(this.verifiedProfile);
      }
      else{
        this.list();
        console.log(this.users);
      }
      
    })
    
  }
  userId:number;
  extendedUser :boolean = false;
  dataLoaded = false;
  status:boolean;
  companyName:string;
  users:User[];
  verifiedProfile:Profile[];
  verifiedUser:User;

  verifyUserById(id:number){

    this.userService.getUserDetailsById(id).subscribe({next:(response)=>{
      this.verifiedProfile = response.data;
      this.companyName = this.verifiedProfile[0].companyName;
      if (this.companyName !== null) {
        this.extendedUser = true;
      }
      this.status = true;
      this.dataLoaded = true;
    }})
  }
  getNameAndEmail(id:number){
    this.userService.getUserById(id).subscribe((response)=>{
      this.verifiedUser = response.data;
      
    })
  }
  createCompanyAccount(id:number){
    this.router.navigate(["/customers/add/" + id])
  }
  list(){
    this.userService.listUsers().subscribe({next:(response)=>{
      this.users = response.data;
      this.dataLoaded = true;
    }})
  }


}
