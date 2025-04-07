import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MainNavbarComponent } from "./main-navbar/main-navbar.component";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule, CommonModule, MainNavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  name:any="";
  item: any;
  showclientdatas=true;
  showempdatas1=false;
  c_data:any=[];
  checktokenpresent(){
    console.log(localStorage.getItem('token'));
    if(!localStorage.getItem('token')){
      this.route.navigateByUrl('');
      return 
    }
  }
  checkname(){
    
    console.log(this.searchform.value);
     if(!this.searchform.value.namesearch.trim() || this.searchform.value.namesearch===null){
      console.log("no such");
      this.clientdata=this.clientdata1
      return
    }
    const namesea=this.searchform.value.namesearch;
    this.clientdata=this.clientdata1.filter((e:any)=>{
    
      
      
      return e.name.toLowerCase().includes(namesea.toLowerCase())
    })
   console.log(this.clientdata);
   
  }
  showclientdatas1(){
    console.log("hi");
    
    this.showclientdatas=true;
    this.showempdatas1=false;
  }
  showempdatas12(){
    this.showclientdatas=false;
    this.showempdatas1=true;
  }
 
  constructor(private http:HttpClient,private route:Router,private activateroute:ActivatedRoute){ 
    
  }
 
  searchform:FormGroup=new FormGroup({
    namesearch:new FormControl('')
  })
 
  addclientdata:FormGroup=new FormGroup({
    name:new FormControl(''),
    address:new FormControl(''),
    phoneno:new FormControl(''),
    gender:new FormControl(''),
    product:new FormControl(''),
  })
  addempform:FormGroup=new FormGroup({
    name:new FormControl(''),
    address:new FormControl(''),
    phoneno:new FormControl(''),
    gender:new FormControl(''),
    product:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),

  })
  showclientform=false;
  showempform=false;

  showclient(){
    this.searchform.reset();
    this.showclientform= !this.showclientform;
    this.addclientdata.reset();
    this.showempedit=false;
    this.showempform=false;
    this.getdataclientdata();

    this.checkname();
    
  }
  showeemp(){

    this.showempform=!this.showempform;
    this.addempform.reset();
 
  }

  //client add and emp add
  clientdata:any=[];
  objclient:any={};

  iduser:any='';
  //addclient
  addclient(){
    const objid=this.iduser;
    this.objclient={...this.addclientdata.value,objid};
    this.http.post("http://localhost:3000/client",{...this.objclient})
    .subscribe((res:any)=>{
      this.getdataclientdata();
    });

    this.addclientdata.reset();
    this.showclient();
    this.searchform.reset();
    this.iduser="";
  }
  //addemployee
  addemp(){
    const objid=this.iduser;
    console.log(this.addempform.value);
    const obj=this.addempform.value;
   
    
    this.http.post("http://localhost:3000/emp",{...this.addempform.value,objid})
    .subscribe((res:any)=>{console.log(res);
      this.getdataemployeedata();
    }
    )
    this.addempform.reset();
    this.showempform=false;
  

  }
  clientdata1:any=[]
  getdataclientdata(){
    this.http.get("http://localhost:3000/client")
    .subscribe((res:any)=>{
      console.log("getting user data");
      console.log(res);
      this.clientdata=res.filter((e:any)=>{
        e.objid==this.iduser;
      })

      this.clientdata=res;//create two variable one for operation then other fo stored
      this.clientdata1=res;

    })
    console.log(this.clientdata);

  }
  emp_data:any=[];
  getdataemployeedata(){
    this.http.get('http://localhost:3000/emp')
    .subscribe((res:any)=>{
      this.emp_data=res;
      console.log(res);
      

    })
  }
  editshow=false;




  ngOnInit(){
    this.getdataclientdata();
    
    this.getdataemployeedata();
    this.checktokenpresent();
    this.activateroute.queryParams.subscribe((params)=>{
      console.log(params);
     this.name=params['name'];
     this.iduser=params['id'];
      console.log(this.name);
      
    })
    
  
  }
  deleteclient(id:any){
    console.log(id);
    this.clientdata=this.clientdata.filter((e:any)=>id!== e.id);
    this.http.delete('http://localhost:3000/client/'+id)
    .subscribe((res:any)=>console.log(res)
    )
  }
  deleteemp(id:any){
    console.log(id);
    this.emp_data=this.emp_data.filter((e:any)=>e.id!==id)
    this.http.delete(`http://localhost:3000/emp/${id}`)
    .subscribe((res:any)=>console.log(res)
    )
    

  }
  idclient:any='';
  editclient(id:any){
    console.log(id);
    this.editshow=true;
    this.idclient=id;
    const getclientedit=this.clientdata.find((e:any)=>e.id===id);
    console.log(getclientedit);
    this.addclientdata.setValue({
      name:getclientedit.name,
      address:getclientedit.address,
      phoneno:getclientedit.phoneno,
      gender:getclientedit.gender,
      product:getclientedit.product
    })
    this.showclientform=true;
   
  }
  editclientdone(){
    let valueedit=confirm("Are you want to edit");
    console.log(valueedit);
    if(!valueedit){
         this.addclientdata.reset();
        this.idclient=null;
         this.showclientform=false;
         this.editshow=false;
         return

    }
    
    let id=this.idclient;
    this.http.patch('http://localhost:3000/client/'+id,this.addclientdata.value)
    .subscribe((res:any)=>{console.log(res);
      this.getdataclientdata()
     });
     this.addclientdata.reset();
    this.idclient=null;
    this.showclientform=false;
    this.editshow=false;
  }
  showempedit=false;


  idemp:any=''
  editempdata(id:any){
    console.log(id);
    this.idemp=id;
    this.showempform=true;
    this.showempedit=true;
    const empdata=this.emp_data.find((e:any)=>{
     return  e.id===id;

    })
    console.log(empdata);
    this.addempform.setValue({
      name:empdata.name,
      address:empdata.address,
      phoneno:empdata.phoneno,
      gender:empdata.gender,
      product:empdata.product,
      state:empdata.state,
      city:empdata.city
    })

  }
  edittempdata(){
    console.log(this.idemp);
    this.http.patch('http://localhost:3000/emp/'+this.idemp, this.addempform.value)
    .subscribe((res:any)=>{console.log(res);
      this.getdataemployeedata();
    }
    )
    this.idemp='';
    this.addempform.reset();
    this.showempedit=false;
    this.showempform=false;

    

  }

}
