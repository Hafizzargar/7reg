import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TableComponent } from "../../table/table.component";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ClientformComponent } from './clientform/clientform/clientform.component';
// import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-client',
  imports: [CommonModule, ReactiveFormsModule, TableComponent, MatButtonModule, MatDialogModule, MatButtonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  iduser:any='';
  clientdata:any=[]
  headclient:any=["name","address","phoneno","product","gender"];
  ngOnInit(){
    this.iduser=localStorage.getItem('iduser');
    console.log(this.iduser);
    this.getclientdata();
  }
  constructor(
    private http: HttpClient,
    private route: Router,
   

  ) {}
  getclientdata(){
    this.http.get('http://localhost:3000/client')
    .subscribe((res:any)=>{
      console.log(res);
      this.clientdata=res.filter((e:any)=>{
        return e.objid===this.iduser;
      })
      console.log(this.clientdata);
      
    })
  }
  del_item(id:any){
    console.log(id);
    this.http.delete(`http://localhost:3000/client/${id}`)
    .subscribe((res:any)=>{
      console.log(res);
      this.getclientdata();
      
    }
    )
  }
  editfxn(id:any){
    console.log("in client");
    console.log(id);
    this.http.get("http://localhost:3000/client/"+id)
    .subscribe((res:any)=>{
      console.log(res);
      const dialogref=this.dialog.open(ClientformComponent, {
        data:{datas:res,edit:true,id:id}
      });
      dialogref.afterClosed().subscribe((res:any) => {
        this.received_data = res.data; // received data from confirm-component
        this.doneeditfxn(this.received_data);
      });
    }
    )
  }
  doneeditfxn(newdata:any){
    if(!newdata){
      return
    }
    const {datas,id}:any=newdata;
    console.log(datas);
    console.log(id);
    this.http.patch('http://localhost:3000/client/'+id, datas)
    .subscribe((res:any)=>{
      console.log(res);
      this.getclientdata();
    })
    
    


  }
  dialog = inject(MatDialog);
  received_data:any;
  openDialog() {
    const dialogref=this.dialog.open(ClientformComponent, {
      data:"hi"
    });
    dialogref.afterClosed().subscribe((res:any) => {
      this.received_data = res.data; // received data from confirm-component
      console.log("check recived data");
      
      console.log(this.received_data );
      this.adddata(this.received_data);
      
    });
  
  }
  adddata(data:any){
    if(!data){
      return ;
    }
    let idobj=this.iduser;
    // console.log("add data");
    let obj={...data,objid:idobj};
  
    this.http.post('http://localhost:3000/client',obj)
    .subscribe((res:any)=>{
      console.log(res);
      this.getclientdata();   
  })

  }



 
 
}
