import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-logincomp',
  imports: [ReactiveFormsModule,CommonModule,MatInputModule,MatButtonModule,MatProgressSpinnerModule,MatProgressBarModule],
  templateUrl: './logincomp.component.html',
  styleUrl: './logincomp.component.css'
})
export class LogincompComponent {
  user:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(65)]),
  })
  constructor(private http:HttpClient,private route:Router){
  }
  showresult:any='';
  objuser:any={}
  userexistemail:any={};
  showlogin:boolean=true;
  senddata(){
    this.showlogin=false;
    
    setTimeout(()=>{
      this.userexistemail= this.getusers.find((e:any)=>{
     
        return e.email===this.user.value.email
     })
     console.log(this.userexistemail);
     
       if(!this.userexistemail){
         return alert("Enter valid user email this email is invalid")
       }
       if(!(this.user.value.password===this.userexistemail.password)){
         return alert("Invalid password.PLEASE ENTER CORRECT PASSWORD")
       }
       console.log("user id");
       
       console.log(this.userexistemail.id);
       
       localStorage.setItem('token',"hello jii token")
       localStorage.setItem('Name',this.userexistemail.name);
       localStorage.setItem('iduser',this.userexistemail.id);
       this.route.navigate(['/home'],
       {
         queryParams:{
           id:this.userexistemail.id,
           name:this.userexistemail.name,
           }
       }
       );
       return this.user.reset();
     
    },2000)
   
      
  }
  getusers:any=[];

  getuserdata(){
    this.http.get('http://localhost:3000/user')
    .subscribe((res:any)=>{
      this.getusers=res;
      console.log(this.getusers);
    })
  }
  gotoregister(){
    this.route.navigateByUrl("register")
  }
  ngOnInit(){
    this.getuserdata()
  }
}
