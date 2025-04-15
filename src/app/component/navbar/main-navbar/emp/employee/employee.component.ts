import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '../../table/table.component';
import { EmpformComponent } from './empform/empform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, CommonModule, TableComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  headclient: any = [
    'name',
    'address',
    'phoneno',
    'product',
    'gender',
    'gender',
    'state',
    'city',
  ];
  c_data: any = [];

  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit() {
    const iduser = localStorage.getItem('iduser');
    this.userid = iduser;
    this.getstateapi();
    this.getdataemployeedata();
  }
  dialog = inject(MatDialog);
  received_data: any;

  openDialog() {
    const dialogref = this.dialog.open(EmpformComponent, {
      data: 'hi',
    });
    dialogref.afterClosed().subscribe((res: any) => {
      this.received_data = res.data; // received data from confirm-component
      // console.log('recived data');
      // console.log(this.received_data);
      this.adddata(this.received_data);
    });
  }
  adddata(data: any) {
    console.log(data);
    if (!data) {
      return;
    }
    let idobj = this.userid;
    let obj = { ...data, objid: idobj };
    this.http.post('http://localhost:3000/emp', obj).subscribe((res: any) => {
      // console.log(res);
      this.getdataemployeedata();
    });
  }
  emp_data: any = [];
  empdata12: any = [];
  getdataemployeedata() {
    this.http.get('http://localhost:3000/emp').subscribe((res: any) => {
      this.emp_data = res;
      const data = res;
      this.empdata12 = data.filter((e: any) => {
        return e.objid === this.userid;
      });
      // console.log('98');
      // console.log(this.empdata12);
    });
  }
  editshow = false;
  userid: any = '';
  del_item(id: any) {
    console.log(id);
    this.http
      .delete(`http://localhost:3000/emp/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.getdataemployeedata();
      });
  }
  getdata: any = {};
  editfxn(id: any) {
    this.http.get('http://localhost:3000/emp/' + id).subscribe((res: any) => {
      console.log('95');
       const dialogref=this.dialog.open(EmpformComponent, {
              data:{datas:res,edit:true,id:id}
            });
            dialogref.afterClosed().subscribe((res:any) => {
              this.received_data = res.data; 
              // console.log("check recived data 65");
              // console.log(this.received_data );
              this.doneeditfxn(this.received_data);
            });
            // console.log(res);
    });
  }
  doneeditfxn(newdata:any){
    if(!newdata){
      return
    }
    const {datas,id}:any=newdata;
    // console.log(datas);
    // console.log(id);
    this.http.patch('http://localhost:3000/emp/'+id, datas)
    .subscribe((res:any)=>{
      // console.log(res);
      this.getdataemployeedata();
    })
  }
  idemp: any = '';
  stateone: any = '';
  getstates: any = [];
  getstate(id: any) {
    for (let i of this.getstates) {
      if (i.id == id) {
        return i.state;
      }
    }
    return 'NA';
  }
  getstateapi() {
    this.http.get('http://localhost:3000/state/').subscribe((res: any) => {
      this.getstates = res;
      // console.log('getstates');
      // console.log(this.getstates);
    });
  }

}
