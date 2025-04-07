import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logincomp',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './logincomp.component.html',
  styleUrl: './logincomp.component.css'
})
export class LogincompComponent {
  user:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  })
  constructor(private http:HttpClient,private route:Router,){
  }
 
  objuser:any={}
  userexistemail:any={};
  senddata(){
    console.log(this.user.value);
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
      localStorage.setItem('token',"hello jii token")

      this.route.navigate(['/home'],
      {
        queryParams:{
          id:this.userexistemail.id,
          name:this.userexistemail.name,
          }
      }
      
      );
      // this.sl=false;
      return this.user.reset();
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
