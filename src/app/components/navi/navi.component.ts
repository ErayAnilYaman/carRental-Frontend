import { Component } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {
  title:string = "RentACar"
  brand:string = "TouchRent"
  filterText = ""
}
