import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ClientComponent } from '../../client.component';

@Component({
  selector: 'app-clientform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './clientform.component.html',
  styleUrl: './clientform.component.css',
})
export class ClientformComponent {
  readonly dialogRef = inject(MatDialogRef<ClientComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  editdata: any;
  datas:any={};
  editid:any={};
  ngOnInit() {
    // console.log(this.data);
    const { datas, edit ,id}: any = this.data;
    this.editid=id;
    this.editdata=edit;
    this.datas=datas;
    if(this.editdata===true){
      this.editform(this.datas);
    }
  }
  clientform: FormGroup = new FormGroup({
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
  });
  addemp() {
    let clientobj = {
      ...this.clientform.value,
    };
    console.log(clientobj);
    this.dialogRef.close({ data: clientobj });
    this.clientform.reset();
  }
  closeit() {
    this.clientform.reset();
    this.dialogRef.close(false);
  }
  editform(data:any) {
    console.log("check");
    console.log(data.name);
    this.clientform.setValue({
      name:data.name,
      address:data.address,
      phoneno:data.phoneno,
      gender:data.gender,
      product:data.product
    })
  }
  editclient(){
    console.log("hello");
    console.log(this.clientform.value);
    console.log(this.editid);
    const payload={datas:this.clientform.value,id:this.editid};
    console.log("payload");
    console.log(payload);
    this.dialogRef.close({ data: payload});
    this.clientform.reset();
  }
}
