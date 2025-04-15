import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import jwt from 'jsonwebtoken';

@Component({
  selector: 'app-registercomp',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registercomp.component.html',
  styleUrl: './registercomp.component.css'
})
export class RegistercompComponent {
  newuser:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    name:new FormControl('',[Validators.minLength(4),Validators.required]),
    password:new FormControl('',[Validators.minLength(4),Validators.required]),
    username:new FormControl('',[Validators.minLength(6),Validators.required]),
  })
  constructor(private http:HttpClient,private route:Router){}
  getuserregiterdata=[];
  objnew={};
  registerdata(){ 
    this.objnew=this.newuser.value;
    // if(!this.newuser.value.email.trim()){
    //   return alert("email is empty");
    // }
    // if(!this.newuser.value.name.trim()){
    //   return alert("name is empty");
    // }
    // if(!this.newuser.value.password.trim()){
    //   return alert("password is empty");
    // }
    // if(!this.newuser.value.username.trim()){
    //   return alert("username is empty");
    // }
    // console.log(this.objnew);
   const userexistemail= this.getuserregiterdata.find((e:any)=>{
    // console.log(e.email);
    
     return e.email===this.newuser.value.email
  })
    // console.log(userexistemail);
    if(userexistemail){
      return alert("user exist with this email in db")
    }
    
    this.http.post('http://localhost:3000/user',this.objnew)
    .subscribe((res:any)=>{
      this.getuserdata();
    })
    this.newuser.reset();
    this.route.navigateByUrl('');
    
  }
  //get user data
  getuserdata(){
    this.http.get('http://localhost:3000/user')
    .subscribe((res:any)=>{
      this.getuserregiterdata=res;
      // console.log(this.getuserregiterdata);
      

    })

  }
  ngOnInit(){
    this.getuserdata();

  }
  sl=true;

  gotologin(){
    this.route.navigateByUrl("/")
  }


}
