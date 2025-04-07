import { Routes } from '@angular/router';
import { LogincompComponent } from './component/logincomp/logincomp.component';
import { RegistercompComponent } from './component/registercomp/registercomp.component';
// import { EmpComponent } from './component/emp/emp.component';
// import { ClientsComponent } from './component/clients/clients.component';
// import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path:'',
        component:LogincompComponent
    }

    ,{
        path:"home",
        component:NavbarComponent
    }
    ,{
        path:"register",
        component:RegistercompComponent
    },
    {
        path:"**",
        component:PagenotfoundComponent
    }
]