import { NumberInput } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule,MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() table_name:string="";
  @Input() data:any=[];
  @Input() who:any="";
  @Input() head:any=[];
  @Output() del_id:any=new EventEmitter<Number>();
  @Output()  edit_id:any=new EventEmitter<Number>();
  ngOnInit(){
    // console.log(this.data);
    // console.log(this.head); 
  }
  getkeys(i:any){
    return Object.keys(i);

  }
  delete(id:any){
    // console.log(id);
    this.del_id.emit(id)
  }
 
  edit(id:any){
    // console.log(id);
    this.edit_id.emit(id);

  }

}
