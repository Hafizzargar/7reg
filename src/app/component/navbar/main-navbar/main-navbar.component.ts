import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  imports: [],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {
  constructor(private route:Router){}
  @Input() name:any='k'
  logout(){
    localStorage.removeItem('token');
    console.log(localStorage.removeItem('token'));
    this.route.navigateByUrl('');    
  }
  showdisplay=true;
  hide(){
    this.showdisplay=!this.showdisplay; 
  }
}
