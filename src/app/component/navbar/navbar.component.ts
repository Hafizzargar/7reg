import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TableComponent } from "./main-navbar/table/table.component";
// import { ClientComponent } from "./main-navbar/client/client/client.component";

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, CommonModule, MainNavbarComponent, RouterOutlet, TableComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
 
  name:any='';
  iduser12="";
  constructor(private activateroute: ActivatedRoute) {} 
  ngOnInit(){
    // this.activateroute.queryParams.subscribe((params:any) => {
    //   this.name = params['name'];
    //   this.iduser12 = params['id'];
    //   console.log(params);
   
    // });
  }
 
}
