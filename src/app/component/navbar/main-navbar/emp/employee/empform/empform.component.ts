import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeComponent } from '../employee.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-empform',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './empform.component.html',
  styleUrl: './empform.component.css'
})
export class EmpformComponent {
  readonly dialogRef = inject(MatDialogRef<EmployeeComponent>);

  constructor(private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: string){};

  addempform: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    phoneno: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
    gender: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });
  addemp(){
    // this.editbutshow=false;
    let empobj=this.addempform.value;
    this.dialogRef.close({ data: empobj });
  }
  closeit(){
    this.dialogRef.close(false);
  }

  editid:any="";
  editdata:any=false;
  ngOnInit(){
    
    const { datas, edit ,id}: any = this.data;
    // console.log("ng");
    // console.log(datas);
    this.editid=id;
    this.editdata=edit;
    // console.log(edit);
    this.getstateapi();
    if(this.editdata===true){
      this.editform(datas);
    }
  }
  editform(data:any) {
    this.addempform.setValue({
      name:data.name,
      address:data.address,
      phoneno:data.phoneno,
      gender:data.gender,
      product:data.product,
      state:data.state,
      city:this.var,
    }) 
  }
  editclient(){
    // console.log("hello");
    // console.log(this.addempform.value);
    // console.log(this.editid);
    const payload={datas:this.addempform.value,id:this.editid};
    // console.log("payload");
    // console.log(payload);
    this.dialogRef.close({ data: payload});
    this.addempform.reset();
  }
  getstates: any = [];
  getstateapi() {
    this.http.get('http://localhost:3000/state/').subscribe((res: any) => {
      this.getstates = res;
    });
  }
  getcities:any=[];
  var:any='';
  getcitiesfxn(event: any) {
    this.getcities = [];
    const cities = this.getstates.find((e: any) => {
      if (e.id == event) {
        this.var = e.state;
      }
    });
    // console.log(cities);
    this.http.get('http://localhost:3000/city/').subscribe((res: any) => {
      this.getcities = res.find((e: any) => {
        return e.stateId === event;
      })?.cities;
      // console.log( this.getcities );
      
    });
    return cities
  }
}
