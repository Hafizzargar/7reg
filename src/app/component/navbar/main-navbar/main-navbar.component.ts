import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink,MatIconModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {
 
  name:any='';
  colorbutton:any='';
constructor(private route:Router){}
  // @Input() name:string=''
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('iduse')
    this.route.navigateByUrl('');    
  }
  showmenu:any=true;
  hidemenu(){
    this.showmenu=!this.showmenu;
  }

 ngOnInit(){
  // console.log("FULL URL:", this.route.url); 
  if(!localStorage.getItem('token')){
    this.route.navigate(['']);
    localStorage.setItem('logout-event', Date.now().toString());

  }
  window.addEventListener('storage', (event) => {
    if (event.key === 'logout-event') {
      localStorage.removeItem('authToken');
      this.route.navigate(['']);
    }
  });
 
  this.name=localStorage.getItem('Name');
  
 }

}
